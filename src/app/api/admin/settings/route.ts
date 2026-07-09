import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/requireAdmin';
import { db } from '@/db';
import { settings } from '@/db/schema';

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const all = await db.select().from(settings);
  return NextResponse.json(all);
}

export async function PATCH(req: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  for (const item of body as { key: string; value: string }[]) {
    await db
      .insert(settings)
      .values({ key: item.key, value: item.value })
      .onConflictDoUpdate({ target: settings.key, set: { value: item.value } });
  }
  return NextResponse.json({ ok: true });
}

export async function PUT(req: Request) {
  // a simpler endpoint for general public fetch if needed, 
  // but we'll stick to the GET /api/settings for now.
  return NextResponse.json({ error: "Use PATCH for updates" }, { status: 405 });
}
