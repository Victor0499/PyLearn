import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getAuthUser } from '@/lib/auth';

// GET — Progreso de todos los estudiantes en una clase (solo para el profesor)
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const authUser = getAuthUser(req);
  if (!authUser || authUser.role !== 'profesor') {
    return NextResponse.json({ error: 'No autorizado.' }, { status: 401 });
  }

  const classroomId = parseInt(id, 10);
  if (isNaN(classroomId)) {
    return NextResponse.json({ error: 'ID de clase inválido.' }, { status: 400 });
  }

  // Verificar que la clase pertenece al profesor
  const { data: classroom, error: classError } = await supabaseAdmin
    .from('api_classroom')
    .select('id, name, code')
    .eq('id', classroomId)
    .eq('teacher_id', authUser.userId)
    .single();

  if (classError || !classroom) {
    return NextResponse.json({ error: 'Clase no encontrada o no tienes permiso.' }, { status: 404 });
  }

  // Obtener todos los miembros (estudiantes) de la clase
  const { data: members, error: membersError } = await supabaseAdmin
    .from('api_classroom_member')
    .select('student_id, joined_at')
    .eq('classroom_id', classroomId);

  if (membersError || !members || members.length === 0) {
    return NextResponse.json({
      classroom,
      students: [],
    });
  }

  const studentIds = members.map((m) => m.student_id);

  // Obtener usernames de los estudiantes
  const { data: users } = await supabaseAdmin
    .from('auth_user')
    .select('id, username, email')
    .in('id', studentIds);

  // Obtener todo el progreso de estos estudiantes
  const { data: progressData } = await supabaseAdmin
    .from('api_userprogress')
    .select('user_id, lesson_id, exercise_id, completed, completed_at')
    .in('user_id', studentIds)
    .eq('completed', true);

  // Construir el resultado agregado por estudiante
  const usersMap = new Map((users || []).map((u) => [u.id, u]));

  const students = members.map((member) => {
    const user = usersMap.get(member.student_id);
    const studentProgress = (progressData || []).filter(
      (p) => p.user_id === member.student_id
    );

    // Agrupar por lección
    const lessonMap: Record<number, { lesson_id: number; exercises_done: number; last_activity: string | null }> = {};
    for (const p of studentProgress) {
      if (!lessonMap[p.lesson_id]) {
        lessonMap[p.lesson_id] = {
          lesson_id: p.lesson_id,
          exercises_done: 0,
          last_activity: null,
        };
      }
      lessonMap[p.lesson_id].exercises_done++;
      if (!lessonMap[p.lesson_id].last_activity || p.completed_at > lessonMap[p.lesson_id].last_activity!) {
        lessonMap[p.lesson_id].last_activity = p.completed_at;
      }
    }

    const totalCompleted = studentProgress.length;
    const lastActivity =
      studentProgress.length > 0
        ? studentProgress.reduce((latest, p) =>
            !latest || p.completed_at > latest ? p.completed_at : latest,
            ''
          )
        : null;

    return {
      student_id: member.student_id,
      username: user?.username ?? `Usuario #${member.student_id}`,
      email: user?.email ?? '',
      joined_at: member.joined_at,
      total_exercises_completed: totalCompleted,
      last_activity: lastActivity,
      lessons: Object.values(lessonMap).sort((a, b) => a.lesson_id - b.lesson_id),
    };
  });

  return NextResponse.json({ classroom, students });
}
