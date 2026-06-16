import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getAuthUser } from '@/lib/auth';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authUser = getAuthUser(req);
  if (!authUser || authUser.role !== 'profesor') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const { id } = await params;
  const classroomId = parseInt(id, 10);
  if (isNaN(classroomId)) {
    return NextResponse.json({ error: 'ID de clase inválido' }, { status: 400 });
  }

  try {
    const { email } = await req.json();
    if (!email || !email.trim()) {
      return NextResponse.json({ error: 'El correo electrónico es requerido' }, { status: 400 });
    }

    // 1. Verificar que el profesor sea el dueño de la clase
    const { data: classroom, error: classError } = await supabaseAdmin
      .from('api_classroom')
      .select('id, teacher_id')
      .eq('id', classroomId)
      .single();

    if (classError || !classroom) {
      return NextResponse.json({ error: 'Clase no encontrada' }, { status: 404 });
    }

    if (classroom.teacher_id !== authUser.userId) {
      return NextResponse.json({ error: 'No eres el profesor de esta clase' }, { status: 403 });
    }

    // 2. Buscar al estudiante por correo
    const { data: student, error: studentError } = await supabaseAdmin
      .from('auth_user')
      .select('id, role')
      .eq('email', email.trim().toLowerCase())
      .single();

    if (studentError || !student) {
      return NextResponse.json({ error: 'No se encontró ningún usuario con este correo' }, { status: 404 });
    }

    if (student.role !== 'estudiante') {
      return NextResponse.json({ error: 'El usuario con este correo no es un estudiante' }, { status: 400 });
    }

    // 3. Verificar si el estudiante ya es miembro de la clase
    const { data: existingMember } = await supabaseAdmin
      .from('api_classroom_member')
      .select('id')
      .eq('classroom_id', classroomId)
      .eq('student_id', student.id)
      .single();

    if (existingMember) {
      return NextResponse.json({ error: 'El estudiante ya pertenece a esta clase' }, { status: 400 });
    }

    // 4. Crear la invitación
    const { data: invitation, error: inviteError } = await supabaseAdmin
      .from('api_classroom_invitation')
      .insert({
        classroom_id: classroomId,
        student_id: student.id,
        status: 'pending'
      })
      .select()
      .single();

    if (inviteError) {
      // Si viola la restricción única (ya hay una invitación)
      if (inviteError.code === '23505') {
        return NextResponse.json({ error: 'Ya existe una invitación pendiente para este estudiante' }, { status: 400 });
      }
      return NextResponse.json({ error: 'Error al crear la invitación' }, { status: 500 });
    }

    return NextResponse.json({ success: true, invitation }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}
