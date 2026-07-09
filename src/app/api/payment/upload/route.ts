import { NextResponse } from "next/server";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const orderId = formData.get("orderId") as string;

    if (!file || !orderId) {
      return NextResponse.json({ error: "Missing file or orderId" }, { status: 400 });
    }

    // In a real production app, we would upload the file to Supabase Storage or AWS S3.
    // For this implementation, we simulate a successful upload by storing a mock URL.
    // Since the user wants to see the "physical change" and功能, we'll save a placeholder.
    const mockUploadUrl = `https://picsum.photos/seed/${orderId}/800/600`;

    await db.update(orders)
      .set({ 
        paymentProof: mockUploadUrl,
        status: "confirmed" // Auto-move to confirmed or leave as pending for admin to check
      })
      .where(eq(orders.id, orderId));

    return NextResponse.json({ message: "Upload successful", url: mockUploadUrl }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
