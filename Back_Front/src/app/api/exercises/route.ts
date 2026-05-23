import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('api_exercise')
    .select('id, title, instructions, exercise_type, initial_code, order, lesson_id')
    .order('order');

  if (error) {
    return NextResponse.json({ error: 'Error al obtener los ejercicios.' }, { status: 500 });
  }

  return NextResponse.json(data);
}
