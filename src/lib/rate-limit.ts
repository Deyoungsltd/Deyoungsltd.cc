import { db } from "@/db";
import { rateLimits } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function checkRateLimit(ip: string, limit: number = 10, windowMinutes: number = 15) {
  const now = new Date();
  const windowStart = new Date(now.getTime() - windowMinutes * 60 * 1000);

  const result = await db.query.rateLimits.findFirst({
    where: eq(rateLimits.ip, ip),
  });

  if (!result) {
    await db.insert(rateLimits).values({
      ip,
      requests: 1,
      lastRequest: now,
    });
    return { allowed: true, remaining: limit - 1 };
  }

  // Reset if window has passed
  if (result.lastRequest < windowStart) {
    await db.update(rateLimits)
      .set({ requests: 1, lastRequest: now })
      .where(eq(rateLimits.ip, ip));
    return { allowed: true, remaining: limit - 1 };
  }

  if (result.requests >= limit) {
    return { allowed: false, remaining: 0 };
  }

  await db.update(rateLimits)
    .set({ requests: result.requests + 1, lastRequest: now })
    .where(eq(rateLimits.ip, ip));

  return { allowed: true, remaining: limit - (result.requests + 1) };
}
