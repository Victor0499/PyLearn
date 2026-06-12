import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { verifyToken } from '@/lib/auth';

function requireAdmin(req: NextRequest) {
  const auth = req.headers.get('Authorization') || '';
  const token = auth.replace('Bearer ', '');
  try {
    const payload = verifyToken(token) as any;
    if (payload?.role !== 'admin') return null;
    return payload;
  } catch { return null; }
}

// GET /api/admin/curriculum?type=modules|lessons&moduleId=X|lessonId=X
export async function GET(req: NextRequest) {
  if (!requireAdmin(req)) return NextResponse.json({ error: 'No autorizado' }, { status: 403 });

  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');

  if (type === 'modules') {
    const { data, error } = await supabaseAdmin
      .from('modules').select('*').order('id');
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  }

  if (type === 'lessons') {
    const moduleId = searchParams.get('moduleId');
    const query = supabaseAdmin.from('lessons').select('id, title, module_id, order_index').order('order_index');
    if (moduleId) query.eq('module_id', parseInt(moduleId));
    const { data, error } = await query;
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  }

  if (type === 'lesson') {
    const lessonId = searchParams.get('lessonId');
    const { data, error } = await supabaseAdmin
      .from('lessons').select('*, exercises(*)').eq('id', parseInt(lessonId!)).single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  }

  return NextResponse.json({ error: 'Tipo inválido' }, { status: 400 });
}

// PATCH /api/admin/curriculum - update a record
export async function PATCH(req: NextRequest) {
  if (!requireAdmin(req)) return NextResponse.json({ error: 'No autorizado' }, { status: 403 });

  const { table, id, data } = await req.json();
  const allowed = ['modules', 'lessons', 'exercises'];
  if (!allowed.includes(table)) return NextResponse.json({ error: 'Tabla no permitida' }, { status: 400 });

  const { error } = await supabaseAdmin.from(table).update(data).eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}

// POST /api/admin/curriculum - create a record
export async function POST(req: NextRequest) {
  if (!requireAdmin(req)) return NextResponse.json({ error: 'No autorizado' }, { status: 403 });

  const { table, data } = await req.json();
  const allowed = ['modules', 'lessons', 'exercises'];
  if (!allowed.includes(table)) return NextResponse.json({ error: 'Tabla no permitida' }, { status: 400 });

  const { data: created, error } = await supabaseAdmin.from(table).insert(data).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(created);
}

// DELETE /api/admin/curriculum - delete a record
export async function DELETE(req: NextRequest) {
  if (!requireAdmin(req)) return NextResponse.json({ error: 'No autorizado' }, { status: 403 });

  const { table, id } = await req.json();
  const allowed = ['modules', 'lessons', 'exercises'];
  if (!allowed.includes(table)) return NextResponse.json({ error: 'Tabla no permitida' }, { status: 400 });

  const { error } = await supabaseAdmin.from(table).delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
