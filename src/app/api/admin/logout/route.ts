import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const res = NextResponse.redirect(new URL("/admin/login", req.url));
  res.cookies.set("admin_token", "", { maxAge: 0, path: "/" });
  return res;
}
