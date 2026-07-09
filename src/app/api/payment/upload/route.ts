import { NextResponse } from "next/server";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const orderId = formData.get("orderId") as string;

    if (!file || !orderId) {
      return NextResponse.json({ error: "Missing file or orderId" }, { status: 400 });
    }

    // Upload proof of payment to Cloudinary
    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append("file", file);
    cloudinaryFormData.append("upload_preset", "ml_default");

    const cloudinaryRes = await fetch("https://api.cloudinary.com/v1_1/qkevvqno/image/upload", {
      method: "POST",
      body: cloudinaryFormData,
    });

    if (!cloudinaryRes.ok) {
      throw new Error("Payment proof upload failed");
    }

    const uploadData = await cloudinaryRes.json();
    const secure_url = uploadData.secure_url;

    await db.update(orders)
      .set({ 
        paymentProof: secure_url,
        status: "pending", // Keep as pending for admin to verify the screenshot
      })
      .where(eq(orders.id, orderId));

    return NextResponse.json({ message: "Payment proof uploaded successfully", url: secure_url }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
