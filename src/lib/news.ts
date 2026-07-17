"use server";

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { sql, ensureSchema } from "./db";
import { getAdminSession } from "./admin-auth";

export type NewsPost = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  body: string;
  cover_url: string | null;
  category: string;
  published: boolean;
  created_at: string;
  published_at: string;
};

export const NEWS_CATEGORIES = [
  "News",
  "Company Update",
  "Safety",
  "Roadside Tips",
  "Case Study",
  "Announcement",
] as const;

const MAX_COVER_LEN = 5_000_000; // ~3.5MB source image encoded

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 200);
}

const createSchema = z.object({
  title: z.string().min(3).max(200),
  slug: z.string().max(220).optional(),
  excerpt: z.string().max(400).optional().nullable(),
  body: z.string().min(10),
  cover_url: z.string().max(MAX_COVER_LEN).optional().nullable(),
  category: z.string().max(80).optional().default("News"),
  published: z.boolean().optional().default(true),
});

const updateSchema = createSchema.partial().extend({ id: z.number() });

// ---- Public: list published posts ------------------------------------------
export const listNews = createServerFn({ method: "GET" }).handler(async () => {
  await ensureSchema();
  const rows = await (sql as any)`
    SELECT id, title, slug, excerpt, body, cover_url, category, published, created_at, published_at
    FROM news_posts
    WHERE published = TRUE
    ORDER BY published_at DESC
  `;
  return rows as NewsPost[];
});

// ---- Public: single post by slug -------------------------------------------
export const getNewsBySlug = createServerFn({ method: "GET" })
  .validator((data: unknown) => z.object({ slug: z.string().min(1).max(220) }).parse(data))
  .handler(async ({ data }) => {
    await ensureSchema();
    const rows = await (sql as any)`
      SELECT id, title, slug, excerpt, body, cover_url, category, published, created_at, published_at
      FROM news_posts
      WHERE slug = ${data.slug} AND published = TRUE
      LIMIT 1
    `;
    return (rows[0] ?? null) as NewsPost | null;
  });

// ---- Admin: full list ------------------------------------------------------
export const adminListNews = createServerFn({ method: "GET" }).handler(async () => {
  const authed = await getAdminSession();
  if (!authed) throw new Error("Unauthorized");
  await ensureSchema();
  const rows = await (sql as any)`
    SELECT id, title, slug, excerpt, body, cover_url, category, published, created_at, published_at
    FROM news_posts
    ORDER BY published_at DESC, created_at DESC
  `;
  return rows as NewsPost[];
});

async function ensureUniqueSlug(base: string, ignoreId?: number): Promise<string> {
  let slug = base || "post";
  let n = 1;
  // small loop; fine for admin
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const rows = ignoreId
      ? await (sql as any)`SELECT id FROM news_posts WHERE slug = ${slug} AND id <> ${ignoreId} LIMIT 1`
      : await (sql as any)`SELECT id FROM news_posts WHERE slug = ${slug} LIMIT 1`;
    if (!rows[0]) return slug;
    n += 1;
    slug = `${base}-${n}`;
  }
}

// ---- Admin: create ---------------------------------------------------------
export const createNews = createServerFn({ method: "POST" })
  .validator((data: unknown) => createSchema.parse(data))
  .handler(async ({ data }) => {
    const authed = await getAdminSession();
    if (!authed) throw new Error("Unauthorized");
    await ensureSchema();
    const baseSlug = slugify(data.slug || data.title);
    const slug = await ensureUniqueSlug(baseSlug);
    const rows = await (sql as any)`
      INSERT INTO news_posts (title, slug, excerpt, body, cover_url, category, published)
      VALUES (
        ${data.title},
        ${slug},
        ${data.excerpt ?? null},
        ${data.body},
        ${data.cover_url ?? null},
        ${data.category ?? "News"},
        ${data.published ?? true}
      )
      RETURNING id, slug
    `;
    return { ok: true, id: rows[0]?.id, slug: rows[0]?.slug };
  });

// ---- Admin: update ---------------------------------------------------------
export const updateNews = createServerFn({ method: "POST" })
  .validator((data: unknown) => updateSchema.parse(data))
  .handler(async ({ data }) => {
    const authed = await getAdminSession();
    if (!authed) throw new Error("Unauthorized");
    let nextSlug: string | null = null;
    if (data.slug || data.title) {
      const base = slugify(data.slug || data.title || "");
      if (base) nextSlug = await ensureUniqueSlug(base, data.id);
    }
    await sql`
      UPDATE news_posts SET
        title      = COALESCE(${data.title ?? null}, title),
        slug       = COALESCE(${nextSlug}, slug),
        excerpt    = COALESCE(${data.excerpt ?? null}, excerpt),
        body       = COALESCE(${data.body ?? null}, body),
        cover_url  = COALESCE(${data.cover_url ?? null}, cover_url),
        category   = COALESCE(${data.category ?? null}, category),
        published  = COALESCE(${data.published ?? null}, published)
      WHERE id = ${data.id}
    `;
    return { ok: true };
  });

// ---- Admin: delete ---------------------------------------------------------
export const deleteNews = createServerFn({ method: "POST" })
  .validator((data: unknown) => z.object({ id: z.number() }).parse(data))
  .handler(async ({ data }) => {
    const authed = await getAdminSession();
    if (!authed) throw new Error("Unauthorized");
    await sql`DELETE FROM news_posts WHERE id = ${data.id}`;
    return { ok: true };
  });
