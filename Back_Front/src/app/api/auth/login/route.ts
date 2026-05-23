import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { verifyDjangoPassword, generateToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  if (!username?.trim() || !password) {
    return NextResponse.json({ error: 'Usuario y contraseña son requeridos.' }, { status: 400 });
  }

  // Buscar usuario en la tabla de Django
  const { data: user, error } = await supabaseAdmin
    .from('auth_user')
    .select('id, username, email, password, is_active')
    .eq('username', username.trim())
    .single();

  if (error || !user) {
    return NextResponse.json({ error: 'Credenciales incorrectas. Verifica tu usuario y contraseña.' }, { status: 401 });
  }

  if (!user.is_active) {
    return NextResponse.json({ error: 'Esta cuenta está desactivada.' }, { status: 401 });
  }

  // Verificar contraseña (compatible con el formato PBKDF2 de Django)
  const passwordValid = verifyDjangoPassword(password, user.password);
  if (!passwordValid) {
    return NextResponse.json({ error: 'Credenciales incorrectas. Verifica tu usuario y contraseña.' }, { status: 401 });
  }

  // Obtener el rol del perfil
  const { data: profile } = await supabaseAdmin
    .from('api_userprofile')
    .select('role')
    .eq('user_id', user.id)
    .single();

  const role = profile?.role || 'estudiante';

  // Generar JWT
  const token = generateToken({ userId: user.id, username: user.username, email: user.email, role });

  // Actualizar last_login
  await supabaseAdmin
    .from('auth_user')
    .update({ last_login: new Date().toISOString() })
    .eq('id', user.id);

  return NextResponse.json({
    message: '¡Bienvenido!',
    user: { id: user.id, username: user.username, email: user.email, role },
    access: token,
    refresh: token,
  });
}
