import "dotenv/config";
import { db } from "./index";
import {
  admins,
  categories,
  products,
  testimonials,
  settings,
} from "./schema";
import bcrypt from "bcryptjs";

const img = (seed: string) => `https://picsum.photos/seed/${seed}/800/600`;

async function main() {
  console.log("Seeding database...");

  // ---------------- Admin ----------------
  const hashedPassword = await bcrypt.hash("admin123", 10);
  await db.insert(admins).values({
    name: "D'Young's Admin",
    email: "deyoungsltd@gmail.com",
    passwordHash: hashedPassword,
});
  console.log("✓ Admin created (CHANGE PASSWORD AFTER FIRST LOGIN)");

  // ---------------- Categories ----------------
  const [applianceCat] = await db
    .insert(categories)
    .values({ slug: "home-appliances", name: "Home Appliances", business: "electronics" })
    .returning();

  const [accessoryCat] = await db
    .insert(categories)
    .values({ slug: "electrical-accessories", name: "Electrical Accessories", business: "electronics" })
    .returning();

  const [voltageCat] = await db
    .insert(categories)
    .values({ slug: "voltage-protection", name: "Voltage Protection", business: "electronics" })
    .returning();

  const [boleCat] = await db
    .insert(categories)
    .values({ slug: "bole-meals", name: "Bole Meals", business: "bole" })
    .returning();

  const [comboCat] = await db
    .insert(categories)
    .values({ slug: "combo-platters", name: "Combo Platters", business: "bole" })
    .returning();

  console.log("✓ Categories seeded");

  // ---------------- Electronics Products ----------------
  await db.insert(products).values([
    {
      slug: "standing-fan-18inch",
      name: "18-Inch Standing Fan",
      description: "Heavy-duty standing fan with 3-speed control.",
      price: "25000",
      image: img("fan1"),
      categoryId: applianceCat.id,
      business: "electronics",
      stock: 15,
      featured: true,
    },
    {
      slug: "electric-kettle-1-8l",
      name: "1.8L Electric Kettle",
      description: "Fast-boil stainless steel electric kettle.",
      price: "12000",
      image: img("kettle1"),
      categoryId: applianceCat.id,
      business: "electronics",
      stock: 20,
    },
    {
      slug: "extension-socket-4way",
      name: "4-Way Extension Socket",
      description: "Surge-protected extension socket with 2m cable.",
      price: "6500",
      image: img("socket1"),
      categoryId: accessoryCat.id,
      business: "electronics",
      stock: 40,
    },
    {
      slug: "avr-stabilizer-2kva",
      name: "2KVA Automatic Voltage Regulator",
      description: "Protects appliances from voltage fluctuations.",
      price: "45000",
      image: img("avr1"),
      categoryId: voltageCat.id,
      business: "electronics",
      stock: 10,
      featured: true,
    },
  ]);

  // ---------------- Bole Products ----------------
  await db.insert(products).values([
    {
      slug: "classic-bole-fish",
      name: "Classic Bole & Fish",
      description: "Roasted plantain served with grilled fish and pepper sauce.",
      price: "3500",
      image: img("bole1"),
      categoryId: boleCat.id,
      business: "bole",
      stock: 50,
      featured: true,
    },
    {
      slug: "roasted-yam-special",
      name: "Roasted Yam Special",
      description: "Roasted yam with rich palm oil sauce and grilled fish.",
      price: "3000",
      image: img("yam1"),
      categoryId: boleCat.id,
      business: "bole",
      stock: 50,
    },
    {
      slug: "roasted-potato-plate",
      name: "Roasted Potato Plate",
      description: "Roasted sweet potato with pepper sauce.",
      price: "2800",
      image: img("potato1"),
      categoryId: boleCat.id,
      business: "bole",
      stock: 40,
    },
    {
      slug: "grand-combo-platter",
      name: "Grand Combo Platter",
      description: "Bole, roasted yam, roasted potato, and grilled fish combo.",
      price: "6500",
      image: img("combo1"),
      categoryId: comboCat.id,
      business: "bole",
      stock: 25,
      featured: true,
    },
  ]);

  console.
  log("✓ Products seeded");

  // ---------------- Testimonials ----------------
  await db.insert(testimonials).values([
    {
      customerName: "Chinedu O.",
      business: "electronics",
      rating: 5,
      content: "Fast repair service, my fridge works perfectly now.",
      approved: true,
    },
    {
      customerName: "Amaka I.",
      business: "bole",
      rating: 5,
      content: "Best bole in Port Harcourt, always fresh and hot.",
      approved: true,
    },
  ]);

  console.log("✓ Testimonials seeded");

  // ---------------- Settings ----------------
  await db.insert(settings).values([
    { key: "contact_email", value: "deyoungsltd@gmail.com" },
    { key: "contact_phone", value: "09069941929" },
    { key: "location", value: "Port Harcourt, Rivers State, Nigeria" },
    { key: "electronics_tagline", value: "Quality Electronics & Trusted Repairs" },
    { key: "bole_tagline", value: "Authentic Nigerian Bole, Made Fresh" },
  ]);

  console.log("✓ Settings seeded");
  console.log("Seed complete.");
  process.exit(0);
}

main().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});