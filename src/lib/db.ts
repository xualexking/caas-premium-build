import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

export const sql = neon(process.env.DATABASE_URL);

/**
 * Run once at startup / deploy to ensure tables exist.
 * Safe to call multiple times — uses IF NOT EXISTS.
 */
export async function ensureSchema() {
  await sql`
    CREATE TABLE IF NOT EXISTS reviews (
      id          SERIAL PRIMARY KEY,
      name        VARCHAR(120) NOT NULL,
      role        VARCHAR(120),
      rating      SMALLINT NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
      quote       TEXT NOT NULL,
      status      VARCHAR(20) NOT NULL DEFAULT 'pending'
                    CHECK (status IN ('pending', 'approved', 'rejected')),
      ip_hash     VARCHAR(64),
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      reviewed_at TIMESTAMPTZ
    )
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS idx_reviews_status ON reviews(status)
  `;
}
