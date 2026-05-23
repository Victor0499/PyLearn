import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  const authUser = getAuthUser(req);

  if (!authUser) {
    return NextResponse.json({ error: 'No autorizado.' }, { status: 401 });
  }

  // Obtener datos frescos del usuario
  const { data: user } = await supabaseAdmin
    .from('auth_user')
    .select('id, username, email')
    .eq('id', authUser.userId)
    .single();

  if (!user) {
    return NextResponse.json({ error: 'Usuario no encontrado.' }, { status: 404 });
  }

  const { data: profile } = await supabaseAdmin
    .from('api_userprofile')
    .select('role')
    .eq('user_id', user.id)
    .single();

  return NextResponse.json({
    id: user.id,
    username: user.username,
    email: user.email,
    role: profile?.role || 'estudiante',
  });
}
