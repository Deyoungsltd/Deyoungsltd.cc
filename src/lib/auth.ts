import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET as string;

export function signAdminToken(payload: { id: string; email: string }) {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
}

export function verifyAdminToken(token: string) {
  try {
    return jwt.verify(token, SECRET) as { id: string; email: string };
  } catch {
    return null;
  }
}
