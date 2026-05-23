import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getAuthUser } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const authUser = getAuthUser(req);
  if (!authUser) {
    return NextResponse.json({ error: 'No autorizado.' }, { status: 401 });
  }

  const { data, error } = await supabaseAdmin
    .from('api_userprogress')
    .select('id, lesson_id, exercise_id, completed, completed_at, code_snapshot')
    .eq('user_id', authUser.userId);

  if (error) {
    return NextResponse.json({ error: 'Error al obtener el progreso.' }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const authUser = getAuthUser(req);
  if (!authUser) {
    return NextResponse.json({ error: 'No autorizado.' }, { status: 401 });
  }

  const { exercise, lesson_id, code_snapshot } = await req.json();

  if (!exercise || !lesson_id) {
    return NextResponse.json({ error: 'exercise y lesson_id son requeridos.' }, { status: 400 });
  }

  const now = new Date().toISOString();

  // Buscar si ya existe un registro para actualizar (upsert)
  const { data: existing } = await supabaseAdmin
    .from('api_userprogress')
    .select('id')
    .eq('user_id', authUser.userId)
    .eq('lesson_id', lesson_id)
    .eq('exercise_id', exercise)
    .single();

  let result, created;

  if (existing) {
    const { data } = await supabaseAdmin
      .from('api_userprogress')
      .update({ completed: true, completed_at: now, code_snapshot: code_snapshot || '' })
      .eq('id', existing.id)
      .select()
      .single();
    result = data;
    created = false;
  } else {
    const { data } = await supabaseAdmin
      .from('api_userprogress')
      .insert({
        user_id: authUser.userId,
        lesson_id,
        exercise_id: exercise,
        completed: true,
        completed_at: now,
        code_snapshot: code_snapshot || '',
      })
      .select()
      .single();
    result = data;
    created = true;
  }

  return NextResponse.json(result, { status: created ? 201 : 200 });
}
