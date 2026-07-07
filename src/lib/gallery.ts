"use server";

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { sql, ensureSchema } from "./db";
import { getAdminSession } from "./admin-auth";

export type GalleryItem = {
  id: number;
  title: string;
  category: string;
  location: string | null;
  layout: string;
  media_url: string;
  on_landing: boolean;
  display_order: number;
  created_at: string;
};

export const LAYOUT_OPTIONS = [
  { value: "aspect-[4/3]", label: "Landscape (4:3)" },
  { value: "aspect-[3/4]", label: "Portrait (3:4)" },
  { value: "aspect-square", label: "Square (1:1)" },
  { value: "aspect-[4/5]", label: "Tall (4:5)" },
  { value: "aspect-[16/9]", label: "Wide (16:9)" },
] as const;

export const CATEGORY_OPTIONS = [
  "Vehicle Towing",
  "Recovery",
  "Heavy Equipment",
  "Containers",
  "Freight",
  "Roadside",
  "Other",
] as const;

// ~4MB safety cap on encoded string (roughly 3MB image)
const MAX_MEDIA_LEN = 4_500_000;

const createSchema = z.object({
  title: z.string().min(2).max(160),
  category: z.string().min(2).max(80),
  location: z.string().max(160).optional().nullable(),
  layout: z.string().max(32),
  media_url: z.string().min(20).max(MAX_MEDIA_LEN),
  on_landing: z.boolean().optional().default(false),
});

const updateSchema = createSchema.partial().extend({ id: z.number() });

// ---- Public: list items (optionally only landing) --------------------------
export const listGallery = createServerFn({ method: "GET" })
  .validator((data: unknown) => {
    const d = (data ?? {}) as { landingOnly?: boolean };
    return { landingOnly: !!d.landingOnly };
  })
  .handler(async ({ data }) => {
    await ensureSchema();
    const rows = data.landingOnly
      ? await sql<GalleryItem[]>`
          SELECT id, title, category, location, layout, media_url, on_landing, display_order, created_at
          FROM gallery_items
          WHERE on_landing = TRUE
          ORDER BY display_order ASC, created_at DESC
        `
      : await sql<GalleryItem[]>`
          SELECT id, title, category, location, layout, media_url, on_landing, display_order, created_at
          FROM gallery_items
          ORDER BY display_order ASC, created_at DESC
        `;
    return rows;
  });

// ---- Admin: full list ------------------------------------------------------
export const adminListGallery = createServerFn({ method: "GET" }).handler(
  async () => {
    const authed = await getAdminSession();
    if (!authed) throw new Error("Unauthorized");
    await ensureSchema();
    const rows = await sql<GalleryItem[]>`
      SELECT id, title, category, location, layout, media_url, on_landing, display_order, created_at
      FROM gallery_items
      ORDER BY display_order ASC, created_at DESC
    `;
    return rows;
  },
);

// ---- Admin: create ---------------------------------------------------------
export const createGalleryItem = createServerFn({ method: "POST" })
  .validator((data: unknown) => createSchema.parse(data))
  .handler(async ({ data }) => {
    const authed = await getAdminSession();
    if (!authed) throw new Error("Unauthorized");
    await ensureSchema();
    const rows = await sql<{ id: number }[]>`
      INSERT INTO gallery_items (title, category, location, layout, media_url, on_landing)
      VALUES (${data.title}, ${data.category}, ${data.location ?? null}, ${data.layout}, ${data.media_url}, ${data.on_landing ?? false})
      RETURNING id
    `;
    return { ok: true, id: rows[0]?.id };
  });

// ---- Admin: update ---------------------------------------------------------
export const updateGalleryItem = createServerFn({ method: "POST" })
  .validator((data: unknown) => updateSchema.parse(data))
  .handler(async ({ data }) => {
    const authed = await getAdminSession();
    if (!authed) throw new Error("Unauthorized");
    const { id, title, category, location, layout, media_url, on_landing } = data;
    await sql`
      UPDATE gallery_items SET
        title      = COALESCE(${title ?? null}, title),
        category   = COALESCE(${category ?? null}, category),
        location   = COALESCE(${location ?? null}, location),
        layout     = COALESCE(${layout ?? null}, layout),
        media_url  = COALESCE(${media_url ?? null}, media_url),
        on_landing = COALESCE(${on_landing ?? null}, on_landing)
      WHERE id = ${id}
    `;
    return { ok: true };
  });

// ---- Admin: toggle landing -------------------------------------------------
export const toggleLanding = createServerFn({ method: "POST" })
  .validator((data: unknown) =>
    z.object({ id: z.number(), on_landing: z.boolean() }).parse(data),
  )
  .handler(async ({ data }) => {
    const authed = await getAdminSession();
    if (!authed) throw new Error("Unauthorized");
    await sql`UPDATE gallery_items SET on_landing = ${data.on_landing} WHERE id = ${data.id}`;
    return { ok: true };
  });

// ---- Admin: reorder --------------------------------------------------------
export const reorderGallery = createServerFn({ method: "POST" })
  .validator((data: unknown) =>
    z.object({
      order: z.array(z.object({ id: z.number(), display_order: z.number() })),
    }).parse(data),
  )
  .handler(async ({ data }) => {
    const authed = await getAdminSession();
    if (!authed) throw new Error("Unauthorized");
    for (const item of data.order) {
      await sql`UPDATE gallery_items SET display_order = ${item.display_order} WHERE id = ${item.id}`;
    }
    return { ok: true };
  });

// ---- Admin: delete ---------------------------------------------------------
export const deleteGalleryItem = createServerFn({ method: "POST" })
  .validator((data: unknown) => z.object({ id: z.number() }).parse(data))
  .handler(async ({ data }) => {
    const authed = await getAdminSession();
    if (!authed) throw new Error("Unauthorized");
    await sql`DELETE FROM gallery_items WHERE id = ${data.id}`;
    return { ok: true };
  });
