import { NextResponse } from "next/server";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, name, price, description, imageUrl, categoryId } = body;

    if (id) {
      await db.update(products)
        .set({ 
          name, 
          price: String(price), 
          description, 
          imageUrl, 
          categoryId, 
          updatedAt: new Date() 
        })
        .where(eq(products.id, Number(id)));
    } else {
      await db.insert(products).values({ 
        name, 
        price: String(price), 
        description, 
        imageUrl, 
        categoryId 
      });
    }

    // Clear backend caches instantly so updates show live across the platform
    revalidatePath("/");
    revalidatePath("/products");
    
    return NextResponse.json({ success: true, message: "Records updated successfully" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
