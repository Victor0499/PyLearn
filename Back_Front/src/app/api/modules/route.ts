import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('api_module')
    .select(`
      id, name, description, order, level_id,
      lessons:api_lesson (
        id, title, theory_markdown, resources, order,
        exercises:api_exercise (
          id, title, instructions, exercise_type, initial_code, order
        )
      )
    `)
    .order('order');

  if (error) {
    return NextResponse.json({ error: 'Error al obtener los módulos.' }, { status: 500 });
  }

  return NextResponse.json(data);
}
