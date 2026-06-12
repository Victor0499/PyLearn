import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getAuthUser } from '@/lib/auth';

// POST — El estudiante se une a una clase usando un código
export async function POST(req: NextRequest) {
  const authUser = getAuthUser(req);
  if (!authUser || authUser.role !== 'estudiante') {
    return NextResponse.json({ error: 'Solo los estudiantes pueden unirse a clases.' }, { status: 403 });
  }

  const { code } = await req.json();
  if (!code?.trim()) {
    return NextResponse.json({ error: 'El código de la clase es requerido.' }, { status: 400 });
  }

  // Buscar la clase por código
  const { data: classroom, error: classError } = await supabaseAdmin
    .from('api_classroom')
    .select('id, name, code, teacher_id')
    .eq('code', code.trim().toUpperCase())
    .single();

  if (classError || !classroom) {
    return NextResponse.json({ error: 'Código inválido. Verifica el código e inténtalo de nuevo.' }, { status: 404 });
  }

  // Verificar que el estudiante no sea el profesor de la clase
  if (classroom.teacher_id === authUser.userId) {
    return NextResponse.json({ error: 'No puedes unirte a tu propia clase.' }, { status: 400 });
  }

  // Verificar si ya está unido
  const { data: existing } = await supabaseAdmin
    .from('api_classroom_member')
    .select('id')
    .eq('classroom_id', classroom.id)
    .eq('student_id', authUser.userId)
    .single();

  if (existing) {
    return NextResponse.json({ error: 'Ya perteneces a esta clase.' }, { status: 409 });
  }

  // Unir al estudiante
  const { error: joinError } = await supabaseAdmin
    .from('api_classroom_member')
    .insert({ classroom_id: classroom.id, student_id: authUser.userId });

  if (joinError) {
    return NextResponse.json({ error: 'Error al unirse a la clase.' }, { status: 500 });
  }

  return NextResponse.json({
    message: `¡Te uniste a la clase "${classroom.name}" exitosamente!`,
    classroom: { id: classroom.id, name: classroom.name, code: classroom.code },
  }, { status: 201 });
}
