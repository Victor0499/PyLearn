import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { generateToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { googleAccessToken, role, username } = await req.json();

    if (!googleAccessToken || !role || !username?.trim()) {
      return NextResponse.json({ error: 'Faltan datos requeridos.' }, { status: 400 });
    }

    if (!['estudiante', 'profesor'].includes(role)) {
      return NextResponse.json({ error: 'Rol no válido.' }, { status: 400 });
    }

    const trimmedUsername = username.trim();
    if (trimmedUsername.length < 3) {
      return NextResponse.json({ error: 'El nombre de usuario debe tener al menos 3 caracteres.' }, { status: 400 });
    }

    // Verificar nuevamente el token de Google para obtener el email de forma segura
    const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${googleAccessToken}` },
    });

    const googleUser = await userInfoRes.json();
    if (!userInfoRes.ok || !googleUser.email) {
      return NextResponse.json({ error: 'Token de Google inválido o expirado.' }, { status: 401 });
    }

    const email = googleUser.email;
    const displayName = googleUser.name || email.split('@')[0];

    // Verificar que el nombre de usuario no esté en uso
    const { data: existingUsername } = await supabaseAdmin
      .from('auth_user')
      .select('id')
      .eq('username', trimmedUsername)
      .single();

    if (existingUsername) {
      return NextResponse.json({ error: 'Este nombre de usuario ya está en uso. Por favor, elige otro.' }, { status: 400 });
    }

    // Verificar que el usuario todavía no existe por email
    const { data: existingUser } = await supabaseAdmin
      .from('auth_user')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      return NextResponse.json({ error: 'Este correo ya está registrado. Por favor inicia sesión.' }, { status: 409 });
    }

    // Crear el usuario con el rol elegido
    const dummyPassword = 'pbkdf2_sha256$870000$google$invalid_' + Math.random().toString(36);

    const { data: newUser, error: createError } = await supabaseAdmin
      .from('auth_user')
      .insert([{
        username: trimmedUsername,
        email,
        password: dummyPassword,
        first_name: displayName,
        last_name: '',
        is_superuser: false,
        is_staff: false,
        is_active: true,
        date_joined: new Date().toISOString()
      }])
      .select('id, username')
      .single();

    if (createError || !newUser) {
      console.error('Error al crear el usuario:', createError);
      return NextResponse.json({ error: 'Error al crear el usuario.' }, { status: 500 });
    }

    // Crear el perfil con el rol seleccionado
    await supabaseAdmin.from('api_userprofile').insert([{ user_id: newUser.id, role }]);

    const token = generateToken({ userId: newUser.id, username: newUser.username, email, role });

    return NextResponse.json({
      message: '¡Cuenta creada con éxito!',
      user: { id: newUser.id, username: newUser.username, email, role },
      access: token,
      refresh: token,
    });
  } catch (error) {
    console.error('Error en /api/auth/google/complete:', error);
    return NextResponse.json({ error: 'Error interno del servidor.' }, { status: 500 });
  }
}
