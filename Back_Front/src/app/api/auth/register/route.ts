import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { hashPassword, generateToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const { username, email, password, role } = await req.json();

  // Validaciones básicas
  if (!username?.trim() || !email?.trim() || !password) {
    return NextResponse.json({ error: 'Todos los campos son requeridos.' }, { status: 400 });
  }
  if (!['estudiante', 'profesor'].includes(role)) {
    return NextResponse.json({ error: 'Rol inválido.' }, { status: 400 });
  }

  // Verificar si el username ya existe
  const { data: existingUser } = await supabaseAdmin
    .from('auth_user')
    .select('id')
    .eq('username', username.trim())
    .single();

  if (existingUser) {
    return NextResponse.json({ error: 'Ese nombre de usuario ya está en uso.' }, { status: 400 });
  }

  // Verificar si el email ya existe
  const { data: existingEmail } = await supabaseAdmin
    .from('auth_user')
    .select('id')
    .eq('email', email.trim())
    .single();

  if (existingEmail) {
    return NextResponse.json({ error: 'Ese correo electrónico ya está registrado.' }, { status: 400 });
  }

  // Crear usuario en auth_user (tabla de Django)
  const hashedPassword = hashPassword(password);
  const now = new Date().toISOString();

  const { data: newUser, error: createError } = await supabaseAdmin
    .from('auth_user')
    .insert({
      username: username.trim(),
      email: email.trim(),
      password: hashedPassword,
      first_name: '',
      last_name: '',
      is_active: true,
      is_staff: false,
      is_superuser: false,
      date_joined: now,
      last_login: now,
    })
    .select('id, username, email')
    .single();

  if (createError || !newUser) {
    console.error('Error creando usuario:', createError);
    return NextResponse.json({ error: 'Error al crear el usuario.' }, { status: 500 });
  }

  // Crear perfil con el rol
  await supabaseAdmin
    .from('api_userprofile')
    .insert({ user_id: newUser.id, role });

  // Generar token JWT
  const token = generateToken({ userId: newUser.id, username: newUser.username, email: newUser.email, role });

  return NextResponse.json({
    message: '¡Registro exitoso!',
    user: { id: newUser.id, username: newUser.username, email: newUser.email, role },
    access: token,
    refresh: token,
  }, { status: 201 });
}
