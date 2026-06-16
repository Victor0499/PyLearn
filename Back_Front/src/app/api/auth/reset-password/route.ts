import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { hashPassword } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json();

    if (!token) {
      return NextResponse.json({ error: 'Token es requerido.' }, { status: 400 });
    }

    if (!password || password.length < 6) {
      return NextResponse.json({ error: 'La contraseña debe tener al menos 6 caracteres.' }, { status: 400 });
    }

    // 1. Buscar token en base de datos
    const { data: resetRecord, error: findError } = await supabaseAdmin
      .from('api_passwordresettoken')
      .select('id, user_id, expires_at')
      .eq('token', token)
      .single();

    if (findError || !resetRecord) {
      return NextResponse.json({ error: 'El enlace de recuperación no es válido o ha expirado.' }, { status: 400 });
    }

    // 2. Verificar si el token ya expiró
    const isExpired = new Date() > new Date(resetRecord.expires_at);
    if (isExpired) {
      // Limpiamos el token expirado
      await supabaseAdmin.from('api_passwordresettoken').delete().eq('id', resetRecord.id);
      return NextResponse.json({ error: 'El enlace de recuperación ha expirado.' }, { status: 400 });
    }

    // 3. Generar nueva contraseña hasheada (formato PBKDF2 Django)
    const hashedPassword = hashPassword(password);

    // 4. Actualizar contraseña del usuario en auth_user
    const { error: updateError } = await supabaseAdmin
      .from('auth_user')
      .update({ password: hashedPassword })
      .eq('id', resetRecord.user_id);

    if (updateError) {
      console.error('Error al actualizar la contraseña:', updateError);
      return NextResponse.json({ error: 'Error al actualizar la contraseña.' }, { status: 500 });
    }

    // 5. Eliminar el token usado para evitar reutilización
    await supabaseAdmin.from('api_passwordresettoken').delete().eq('id', resetRecord.id);

    return NextResponse.json({ success: true, message: 'Contraseña restablecida exitosamente.' });
  } catch (error: any) {
    console.error('Error en reset-password route:', error);
    return NextResponse.json({ error: 'Error interno del servidor.' }, { status: 500 });
  }
}
