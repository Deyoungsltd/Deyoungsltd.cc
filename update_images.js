import { db } from "./src/db/index.ts";
import { products } from "./src/db/schema.ts";
import { eq, and } from "drizzle-orm";

async function main() {
  console.log("Updating product images to premium assets...");

  const electronicsUpdates = [
    { slug: "standing-fan-18inch", image: "/products/fan.png" },
    { slug: "avr-stabilizer-2kva", image: "/products/stabilizer.png" },
  ];

  const boleUpdates = [
    { slug: "classic-bole-fish", image: "/products/bole_main.png" },
    { slug: "roasted-yam-special", image: "/products/bole_side.png" },
  ];

  for (const update of [...electronicsUpdates, ...boleUpdates]) {
    await db.update(products)
      .set({ image: update.image })
      .where(eq(products.slug, update.slug));
    console.log(`✓ Updated image for ${update.slug}`);
  }

  console.log("Database update complete.");
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
