import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getAuthUser } from '@/lib/auth';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authUser = getAuthUser(req);
  if (!authUser || authUser.role !== 'estudiante') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const { id } = await params;
  const invitationId = parseInt(id, 10);
  if (isNaN(invitationId)) {
    return NextResponse.json({ error: 'ID de invitación inválido' }, { status: 400 });
  }

  try {
    const { action } = await req.json();
    if (action !== 'accept' && action !== 'reject') {
      return NextResponse.json({ error: 'Acción inválida' }, { status: 400 });
    }

    // 1. Verificar la invitación
    const { data: invitation, error: inviteError } = await supabaseAdmin
      .from('api_classroom_invitation')
      .select('id, classroom_id, status, student_id')
      .eq('id', invitationId)
      .single();

    if (inviteError || !invitation) {
      return NextResponse.json({ error: 'Invitación no encontrada' }, { status: 404 });
    }

    if (invitation.student_id !== authUser.userId) {
      return NextResponse.json({ error: 'Esta invitación no es para ti' }, { status: 403 });
    }

    if (invitation.status !== 'pending') {
      return NextResponse.json({ error: 'Esta invitación ya fue respondida' }, { status: 400 });
    }

    if (action === 'accept') {
      // 2. Verificar si ya es miembro (por si acaso)
      const { data: existingMember } = await supabaseAdmin
        .from('api_classroom_member')
        .select('id')
        .eq('classroom_id', invitation.classroom_id)
        .eq('student_id', authUser.userId)
        .single();

      if (!existingMember) {
        // 3. Agregar a la clase
        const { error: memberError } = await supabaseAdmin
          .from('api_classroom_member')
          .insert({
            classroom_id: invitation.classroom_id,
            student_id: authUser.userId
          });

        if (memberError) {
          return NextResponse.json({ error: 'Error al unirte a la clase' }, { status: 500 });
        }
      }
    }

    // 4. Actualizar el estado de la invitación
    const { error: updateError } = await supabaseAdmin
      .from('api_classroom_invitation')
      .update({ status: action === 'accept' ? 'accepted' : 'rejected' })
      .eq('id', invitationId);

    if (updateError) {
      return NextResponse.json({ error: 'Error al actualizar la invitación' }, { status: 500 });
    }

    return NextResponse.json({ success: true, status: action === 'accept' ? 'accepted' : 'rejected' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}
