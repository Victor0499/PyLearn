import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('api_level')
    .select(`
      id, name, description, difficulty, order,
      modules:api_module (
        id, name, description, order,
        lessons:api_lesson (
          id, title, theory_markdown, resources, order,
          exercises:api_exercise (
            id, title, instructions, exercise_type, initial_code, order
          )
        )
      )
    `)
    .order('order');

  if (error) {
    console.error('Error fetching levels:', error);
    return NextResponse.json({ error: 'Error al obtener los niveles.' }, { status: 500 });
  }

  return NextResponse.json(data);
}
