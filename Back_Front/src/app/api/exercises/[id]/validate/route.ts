import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const exerciseId = parseInt(resolvedParams.id);

  const { data: exercise, error } = await supabaseAdmin
    .from('exercises')
    .select('id, title, test_code')
    .eq('id', exerciseId)
    .single();

  if (error || !exercise) {
    return NextResponse.json({ error: 'Ejercicio no encontrado.' }, { status: 404 });
  }

  return NextResponse.json({
    status: 'success',
    test_code: exercise.test_code || '',
  });
}
