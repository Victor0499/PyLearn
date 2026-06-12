import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getAuthUser } from '@/lib/auth';

// GET — Listar las clases a las que pertenece el estudiante
export async function GET(req: NextRequest) {
  const authUser = getAuthUser(req);
  if (!authUser || authUser.role !== 'estudiante') {
    return NextResponse.json({ error: 'No autorizado.' }, { status: 401 });
  }

  const { data: memberships, error } = await supabaseAdmin
    .from('api_classroom_member')
    .select(`
      joined_at,
      api_classroom (
        id,
        name,
        code,
        teacher_id,
        auth_user!api_classroom_teacher_id_fkey (username)
      )
    `)
    .eq('student_id', authUser.userId)
    .order('joined_at', { ascending: false });

  if (error) {
    console.error('Error fetching student classes:', error);
    return NextResponse.json({ error: 'Error al obtener las clases.' }, { status: 500 });
  }

  const result = (memberships || []).map((m: any) => ({
    joined_at: m.joined_at,
    id: m.api_classroom?.id,
    name: m.api_classroom?.name,
    code: m.api_classroom?.code,
    teacher_username: m.api_classroom?.auth_user?.username ?? 'Profesor',
  }));

  return NextResponse.json(result);
}
