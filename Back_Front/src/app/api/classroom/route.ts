import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getAuthUser } from '@/lib/auth';

function generateClassCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // sin O/0/1/I para evitar confusión
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

// GET — Listar las clases del profesor autenticado
export async function GET(req: NextRequest) {
  const authUser = getAuthUser(req);
  if (!authUser || authUser.role !== 'profesor') {
    return NextResponse.json({ error: 'No autorizado.' }, { status: 401 });
  }

  const { data: classes, error } = await supabaseAdmin
    .from('api_classroom')
    .select('id, name, code, created_at')
    .eq('teacher_id', authUser.userId)
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: 'Error al obtener las clases.' }, { status: 500 });
  }

  // Para cada clase, contar los estudiantes
  const classesWithCount = await Promise.all(
    (classes || []).map(async (cls) => {
      const { count } = await supabaseAdmin
        .from('api_classroom_member')
        .select('id', { count: 'exact', head: true })
        .eq('classroom_id', cls.id);
      return { ...cls, student_count: count ?? 0 };
    })
  );

  return NextResponse.json(classesWithCount);
}

// POST — Crear una nueva clase
export async function POST(req: NextRequest) {
  const authUser = getAuthUser(req);
  if (!authUser || authUser.role !== 'profesor') {
    return NextResponse.json({ error: 'No autorizado.' }, { status: 401 });
  }

  const { name } = await req.json();
  if (!name?.trim()) {
    return NextResponse.json({ error: 'El nombre de la clase es requerido.' }, { status: 400 });
  }

  // Generar código único (reintentar si ya existe)
  let code = '';
  let attempts = 0;
  while (attempts < 10) {
    code = generateClassCode();
    const { data: existing } = await supabaseAdmin
      .from('api_classroom')
      .select('id')
      .eq('code', code)
      .single();
    if (!existing) break;
    attempts++;
  }

  const { data, error } = await supabaseAdmin
    .from('api_classroom')
    .insert({ name: name.trim(), code, teacher_id: authUser.userId })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: 'Error al crear la clase.' }, { status: 500 });
  }

  return NextResponse.json({ ...data, student_count: 0 }, { status: 201 });
}
