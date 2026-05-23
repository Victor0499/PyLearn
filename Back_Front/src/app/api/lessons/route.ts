import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('api_lesson')
    .select(`
      id, title, theory_markdown, resources, order, module_id,
      exercises:api_exercise (
        id, title, instructions, exercise_type, initial_code, order
      )
    `)
    .order('order');

  if (error) {
    return NextResponse.json({ error: 'Error al obtener las lecciones.' }, { status: 500 });
  }

  return NextResponse.json(data);
}
