import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const exerciseId = parseInt(resolvedParams.id);

  const { data: exercise, error } = await supabaseAdmin
    .from('api_exercise')
    .select('id, title')
    .eq('id', exerciseId)
    .single();

  if (error || !exercise) {
    return NextResponse.json({ error: 'Ejercicio no encontrado.' }, { status: 404 });
  }

  
  const { data: testCase } = await supabaseAdmin
    .from('api_exercisetest')
    .select('test_code')
    .eq('exercise_id', exerciseId)
    .single();

  return NextResponse.json({
    status: 'success',
    test_code: testCase?.test_code || '',
  });
}

