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

  // Gallery items table
  await sql`
    CREATE TABLE IF NOT EXISTS gallery_items (
      id            SERIAL PRIMARY KEY,
      title         VARCHAR(160) NOT NULL,
      category      VARCHAR(80)  NOT NULL DEFAULT 'Vehicle Towing',
      location      VARCHAR(160),
      layout        VARCHAR(32)  NOT NULL DEFAULT 'aspect-[4/3]',
      media_url     TEXT         NOT NULL,
      on_landing    BOOLEAN      NOT NULL DEFAULT FALSE,
      display_order INTEGER      NOT NULL DEFAULT 0,
      created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW()
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS idx_gallery_landing ON gallery_items(on_landing)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_gallery_order ON gallery_items(display_order)`;

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
