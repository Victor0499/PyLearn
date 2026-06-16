import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getAuthUser } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const authUser = getAuthUser(req);
  if (!authUser || authUser.role !== 'estudiante') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    // Obtener invitaciones pendientes del estudiante
    const { data: invitations, error } = await supabaseAdmin
      .from('api_classroom_invitation')
      .select(`
        id,
        classroom_id,
        status,
        created_at,
        api_classroom (
          name,
          auth_user!api_classroom_teacher_id_fkey ( username )
        )
      `)
      .eq('student_id', authUser.userId)
      .eq('status', 'pending')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: 'Error al obtener invitaciones' }, { status: 500 });
    }

    // Formatear la respuesta para el frontend
    const formattedInvitations = (invitations || []).map((inv: any) => ({
      id: inv.id,
      classroom_id: inv.classroom_id,
      classroom_name: inv.api_classroom?.name || 'Clase desconocida',
      teacher_username: inv.api_classroom?.auth_user?.username || 'Profesor',
      created_at: inv.created_at
    }));

    return NextResponse.json(formattedInvitations, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}
