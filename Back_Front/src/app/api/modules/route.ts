import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  const { data: modules, error } = await supabaseAdmin
    .from('modules')
    .select('*, lessons(id, exercises(id))')
    .order('id', { ascending: true });

  if (error || !modules) {
    return NextResponse.json({ error: 'Error fetching modules' }, { status: 500 });
  }

  // Transform data to include total exercises and lesson ids for progress calculation
  const result = modules.map(m => {
    const lessonIds = m.lessons.map((l: any) => l.id);
    const totalExercises = m.lessons.reduce((acc: number, l: any) => acc + (l.exercises?.length || 0), 0);
    
    return {
      id: m.id,
      title: m.title,
      description: m.description,
      icon_name: m.icon_name,
      color_gradient: m.color_gradient,
      is_locked: m.is_locked,
      lessonIds,
      totalExercises
    };
  });

  return NextResponse.json(result);
}
