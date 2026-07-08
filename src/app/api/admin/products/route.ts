import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/requireAdmin';
import { db } from '@/db';
import { products } from '@/db/schema';

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const all = await db.select().from(products);
  return NextResponse.json(all);
}

export async function POST(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const created = await db.insert(products).values(body).returning();
  return NextResponse.json(created[0]);
}
