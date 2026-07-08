import { NextResponse } from "next/server";
import { db } from "@/db";
import { categories, products } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const business = url.searchParams.get("business") === "bole" ? "bole" : "electronics";
    const rows = await db
      .select({
        slug: products.slug,
        name: products.name,
        description: products.description,
        price: products.price,
        image: products.image,
        category: categories.name,
        featured: products.featured,
      })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .where(and(eq(products.business, business), eq(products.active, true)));

    return NextResponse.json(rows.map((row) => ({
      slug: row.slug,
      name: row.name,
      description: row.description || "Premium D'Young's product.",
      price: Number(row.price),
      image: row.image || `https://picsum.photos/seed/${row.slug}/900/700`,
      category: row.category || (business === "bole" ? "Menu" : "Products"),
      badge: row.featured ? "Featured" : undefined,
    })));
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Products unavailable." }, { status: 500 });
  }
}
