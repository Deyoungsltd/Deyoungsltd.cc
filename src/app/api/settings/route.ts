import { NextResponse } from "next/server";
import { db } from "@/db";
import { settings } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const res = await db.select().from(settings);
    // Return as a simple object for easier access in client components
    const settingsObj: Record<string, string> = {};
    res.forEach(item => {
      settingsObj[item.key] = item.value || "";
    });
    return NextResponse.json(settingsObj);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
