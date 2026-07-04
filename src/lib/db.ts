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
  // Admin users table
  await sql`
    CREATE TABLE IF NOT EXISTS admin_users (
      id            SERIAL PRIMARY KEY,
      username      VARCHAR(80) UNIQUE NOT NULL,
      password_hash VARCHAR(128) NOT NULL,
      created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      last_login    TIMESTAMPTZ
    )
  `;

  // Reviews table
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

  // Seed the default admin user if none exists
  // Password: Dispatch@CAAS#2026!  (SHA-256 of password + SESSION_SECRET)
  await sql`
    INSERT INTO admin_users (username, password_hash)
    VALUES (
      'caas_control',
      '1a51eaabb20cffdb2f2f8749a58893131aab19737c29fda7d6d10d5f29a1c489'
    )
    ON CONFLICT (username) DO NOTHING
  `;
}
