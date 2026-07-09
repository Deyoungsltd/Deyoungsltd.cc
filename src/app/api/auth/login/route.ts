import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import bcrypt from "bcryptjs";
import { signUserToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";
<<<<<<< HEAD

export async function POST(req: Request) {
  try {
=======
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const limit = await checkRateLimit(ip, 5, 15); // 5 attempts every 15 mins
    if (!limit.allowed) {
      return NextResponse.json({ error: "Too many attempts. Please try again in 15 minutes." }, { status: 429 });
    }

>>>>>>> 4d712c424bc1965af0c6f23eb9c8a538c3a4e80e
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
    }

    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const token = signUserToken({ id: user.id, email: user.email });
    
    const cookieStore = await cookies();
    cookieStore.set("user_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return NextResponse.json({ message: "Login successful" }, { status: 200 });
<<<<<<< HEAD
  } catch (e: unknown) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Something went wrong" },
      { status: 500 }
    );
=======
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
>>>>>>> 4d712c424bc1965af0c6f23eb9c8a538c3a4e80e
  }
}
