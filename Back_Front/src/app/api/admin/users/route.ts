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

  try {
    // 1. Delete classroom memberships as student
    await supabaseAdmin.from('api_classroom_member').delete().eq('student_id', userId);

    // 2. Delete classrooms where this user is teacher (and memberships of those classrooms)
    const { data: classrooms } = await supabaseAdmin
      .from('api_classroom')
      .select('id')
      .eq('teacher_id', userId);

    if (classrooms && classrooms.length > 0) {
      const classIds = classrooms.map((c: any) => c.id);
      await supabaseAdmin.from('api_classroom_member').delete().in('classroom_id', classIds);
      await supabaseAdmin.from('api_classroom').delete().eq('teacher_id', userId);
    }

    // 3. Delete user progress
    await supabaseAdmin.from('api_userprogress').delete().eq('user_id', userId);

    // 4. Delete user profile
    await supabaseAdmin.from('api_userprofile').delete().eq('user_id', userId);

    // 5. Delete auth user
    const { error } = await supabaseAdmin
      .from('auth_user')
      .delete()
      .eq('id', userId);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Error deleting user' }, { status: 500 });
  }
}
