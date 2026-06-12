import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { verifyToken } from '@/lib/auth';

function requireAdmin(req: NextRequest) {
  const auth = req.headers.get('Authorization') || '';
  const token = auth.replace('Bearer ', '');
  try {
    const payload = verifyToken(token) as any;
    if (payload?.role !== 'admin') return null;
    return payload;
  } catch { return null; }
}

// GET /api/admin/users - list all users
export async function GET(req: NextRequest) {
  if (!requireAdmin(req)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
  }

  const { data: users, error } = await supabaseAdmin
    .from('auth_user')
    .select('id, username, email, is_active, date_joined, last_login')
    .order('date_joined', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Get roles
  const { data: profiles } = await supabaseAdmin
    .from('api_userprofile')
    .select('user_id, role');

  const profileMap: Record<number, string> = {};
  profiles?.forEach((p: any) => { profileMap[p.user_id] = p.role; });

  const result = users?.map((u: any) => ({
    ...u,
    role: profileMap[u.id] || 'estudiante'
  }));

  return NextResponse.json(result);
}

// PATCH /api/admin/users - ban/unban user
export async function PATCH(req: NextRequest) {
  if (!requireAdmin(req)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
  }

  const { userId, is_active } = await req.json();

  const { error } = await supabaseAdmin
    .from('auth_user')
    .update({ is_active })
    .eq('id', userId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}

// DELETE /api/admin/users - delete user
export async function DELETE(req: NextRequest) {
  if (!requireAdmin(req)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
  }

  const { userId } = await req.json();

  // Cascade delete will handle the profile
  const { error } = await supabaseAdmin
    .from('auth_user')
    .delete()
    .eq('id', userId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
