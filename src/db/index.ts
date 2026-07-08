import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "DATABASE_URL is not set. Create a .env file with DATABASE_URL pointing to your PostgreSQL instance."
  );
}

// Reuse the pool across hot reloads in development to avoid exhausting connections.
const globalForDb = globalThis as unknown as { __pgPool?: Pool };

const poolConfig: import("pg").PoolConfig = { connectionString, max: 10 };

// Supabase (and most managed Postgres) require an SSL connection.
if (/supabase/i.test(connectionString)) {
  poolConfig.ssl = { rejectUnauthorized: false };
}

export const pool = globalForDb.__pgPool ?? new Pool(poolConfig);

if (process.env.NODE_ENV !== "production") {
  globalForDb.__pgPool = pool;
}

export const db = drizzle(pool, { schema });