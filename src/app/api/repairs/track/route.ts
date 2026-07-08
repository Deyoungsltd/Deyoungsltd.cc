import { NextResponse } from "next/server";
import { db } from "@/db";
import { repairRequests } from "@/db/schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const ticket = url.searchParams.get("ticket")?.trim();
  if (!ticket) return NextResponse.json({ error: "Ticket number is required." }, { status: 400 });

  const [repair] = await db.select().from(repairRequests).where(eq(repairRequests.ticketNumber, ticket)).limit(1);
  if (!repair) return NextResponse.json({ error: "No repair request found with that ticket." }, { status: 404 });
  return NextResponse.json(repair);
}
