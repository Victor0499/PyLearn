import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.trim()) {
      return NextResponse.json({ error: 'El correo electrónico es requerido.' }, { status: 400 });
    }

    const trimmedEmail = email.trim().toLowerCase();

    // 1. Buscar el usuario
    const { data: user, error: userError } = await supabaseAdmin
      .from('auth_user')
      .select('id, password, username')
      .eq('email', trimmedEmail)
      .single();

    // Si no existe, devolvemos un mensaje genérico por seguridad (para evitar enumeración de correos)
    if (userError || !user) {
      return NextResponse.json({ success: true, message: 'Si el correo está registrado, recibirás un enlace de recuperación.' });
    }

    // 2. Verificar si es una cuenta de Google
    // Las cuentas de Google tienen una contraseña ficticia: pbkdf2_sha256$...$google$invalid_...
    if (user.password.includes('$google$')) {
      return NextResponse.json({
        isGoogle: true,
        message: 'Tu cuenta está registrada con Google. Inicia sesión directamente con Google.'
      });
    }

    // 3. Generar token de recuperación
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 3600 * 1000); // 1 hora de expiración

    // 4. Guardar token en base de datos
    // Primero, limpiamos tokens anteriores del mismo usuario para evitar acumulación
    await supabaseAdmin
      .from('api_passwordresettoken')
      .delete()
      .eq('user_id', user.id);

    const { error: insertError } = await supabaseAdmin
      .from('api_passwordresettoken')
      .insert([
        {
          user_id: user.id,
          token,
          expires_at: expiresAt.toISOString(),
        }
      ]);

    if (insertError) {
      console.error('Error al insertar token de recuperación:', insertError);
      return NextResponse.json({ error: 'Error interno al procesar la solicitud.' }, { status: 500 });
    }

    // 5. Envío / logueo del enlace
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/reset-password?token=${token}`;
    
    // Imprimir el enlace de recuperación en la consola del servidor (para desarrollo)
    console.log('\n========================================');
    console.log('🔑 ENLACE DE RECUPERACIÓN DE CONTRASEÑA');
    console.log(`Usuario: ${user.username}`);
    console.log(`Enlace: ${resetUrl}`);
    console.log('========================================\n');

    // Aquí se podría integrar Nodemailer o Resend para enviar el correo en producción en el futuro.

    return NextResponse.json({ success: true, message: 'Si el correo está registrado, recibirás un enlace de recuperación.' });
  } catch (error: any) {
    console.error('Error en forgot-password route:', error);
    return NextResponse.json({ error: 'Error interno del servidor.' }, { status: 500 });
  }
}
