import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET as string;

export function signToken(payload: { id: string; email: string; role: "admin" | "user" }) {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET) as { id: string; email: string; role: "admin" | "user" };
  } catch {
    return null;
  }
}

export function signAdminToken(payload: { id: string; email: string }) {
  return signToken({ ...payload, role: "admin" });
}

export function signUserToken(payload: { id: string; email: string }) {
  return signToken({ ...payload, role: "user" });
}

export function verifyAdminToken(token: string) {
  const decoded = verifyToken(token);
  return decoded?.role === "admin" ? decoded : null;
}
