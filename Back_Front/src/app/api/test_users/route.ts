import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  const { data, error } = await supabaseAdmin.from('auth_user').select('username, email, role');
  return NextResponse.json({ users: data, error });
}
