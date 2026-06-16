import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { generateToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();

    if (!code) {
      return NextResponse.json({ error: 'Código de autorización no proporcionado.' }, { status: 400 });
    }

    const redirectUri = process.env.NEXT_PUBLIC_APP_URL
      ? `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`
      : 'http://localhost:3000/auth/callback';

    // 1. Intercambiar el código de Google por un token de acceso
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    const tokenData = await tokenRes.json();
    if (!tokenRes.ok || !tokenData.access_token) {
      return NextResponse.json({ error: 'Error al obtener token de Google.' }, { status: 401 });
    }

    // 2. Obtener la información del usuario de Google
    const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    const googleUser = await userInfoRes.json();
    if (!userInfoRes.ok || !googleUser.email) {
      return NextResponse.json({ error: 'No se pudo obtener el email de Google.' }, { status: 401 });
    }

    const email = googleUser.email;
    const displayName = googleUser.name || email.split('@')[0];

    // 3. Buscar si el usuario ya existe en nuestra base de datos
    const { data: existingUser } = await supabaseAdmin
      .from('auth_user')
      .select('id, username, email, is_active')
      .eq('email', email)
      .single();

    if (existingUser) {
      // --- USUARIO EXISTENTE: iniciar sesión directamente ---
      if (!existingUser.is_active) {
        return NextResponse.json({ error: 'Esta cuenta está desactivada.' }, { status: 401 });
      }

      const { data: profile } = await supabaseAdmin
        .from('api_userprofile')
        .select('role')
        .eq('user_id', existingUser.id)
        .single();
      const role = profile?.role || 'estudiante';

      await supabaseAdmin.from('auth_user').update({ last_login: new Date().toISOString() }).eq('id', existingUser.id);

      const token = generateToken({ userId: existingUser.id, username: existingUser.username, email, role });
      return NextResponse.json({
        message: '¡Bienvenido de vuelta!',
        isNewUser: false,
        user: { id: existingUser.id, username: existingUser.username, email, role },
        access: token,
        refresh: token,
      });
    } else {
      // --- USUARIO NUEVO: pedir rol antes de crear la cuenta ---
      // Guardamos un token temporal firmado con sus datos de Google
      return NextResponse.json({
        isNewUser: true,
        googleAccessToken: tokenData.access_token,
        email,
        displayName,
      });
    }
  } catch (error) {
    console.error('Error en /api/auth/google:', error);
    return NextResponse.json({ error: 'Error interno del servidor.' }, { status: 500 });
  }
}
