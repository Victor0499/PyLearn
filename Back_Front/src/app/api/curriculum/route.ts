import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { verifyToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const auth = req.headers.get('Authorization') || '';
  const token = auth.replace('Bearer ', '');
  let isAdmin = false;
  try {
    const payload = verifyToken(token) as any;
    if (payload?.role === 'admin') isAdmin = true;
  } catch { }

  const { searchParams } = new URL(req.url);
  const moduleIdStr = searchParams.get('moduleId');

  if (!moduleIdStr) {
    return NextResponse.json({ error: 'Falta el moduleId' }, { status: 400 });
  }

  const moduleId = parseInt(moduleIdStr, 10);

  // Obtener las lecciones del módulo, incluyendo los ejercicios
  const { data: lessonsData, error: lessonsError } = await supabaseAdmin
    .from('lessons')
    .select('*, exercises(*)')
    .eq('module_id', moduleId)
    .order('order_index', { ascending: true });

  if (lessonsError || !lessonsData) {
    console.error("Error fetching lessons:", lessonsError);
    return NextResponse.json({ error: 'Error al cargar las lecciones' }, { status: 500 });
  }

  // Transformar los datos para que coincidan con la estructura que espera el frontend
  const lessons = lessonsData.map((l: any) => ({
    id: l.id,
    title: l.title,
    theory: l.theory,
    exercises: (l.exercises || [])
      .sort((a: any, b: any) => a.order_index - b.order_index)
      .map((e: any) => ({
        id: e.id,
        title: e.title,
        difficulty: e.difficulty,
        difficultyColor: e.difficulty_color,
        instructions: e.instructions,
        initialCode: e.initial_code,
        outputCheck: e.output_check,
        testCode: e.test_code,
        hint: e.hint,
        ...(isAdmin ? { solutionCode: e.solution_code } : {})
      }))
  }));

  return NextResponse.json(lessons);
}
