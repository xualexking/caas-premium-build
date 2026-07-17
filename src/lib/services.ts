"use server";

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { sql, ensureSchema } from "./db";
import { getAdminSession } from "./admin-auth";

export type ServiceCover = {
  slug: string;
  cover_url: string;
  updated_at: string;
};

// All 10 services with their slugs
export const SERVICE_LIST = [
  { slug: "vehicle-towing",            title: "Vehicle Towing" },
  { slug: "heavy-equipment-transport", title: "Heavy Equipment Transport" },
  { slug: "container-hauling",         title: "Container Hauling" },
  { slug: "generator-hauling",         title: "Generator Hauling" },
  { slug: "freight-services",          title: "Freight Services" },
  { slug: "vehicle-recovery",          title: "Vehicle Recovery" },
  { slug: "flood-recovery",            title: "Flood Recovery" },
  { slug: "roadside-assistance",       title: "Roadside Assistance" },
  { slug: "commercial-fleet-support",  title: "Commercial Fleet Support" },
  { slug: "winch-out-off-road",        title: "Winch-Out & Off-Road Recovery" },
] as const;

const MAX_IMAGE_LEN = 10_000_000; // ~7MB source

// ---- Public: get all service covers ----------------------------------------
export const getServiceCovers = createServerFn({ method: "GET" }).handler(async () => {
  await ensureSchema();
  const rows = await sql<ServiceCover[]>`
    SELECT slug, cover_url, updated_at FROM service_covers
  `;
  // Return as a map for easy lookup
  const map: Record<string, string> = {};
  for (const row of rows) map[row.slug] = row.cover_url;
  return map;
});

// ---- Admin: upsert a service cover -----------------------------------------
export const upsertServiceCover = createServerFn({ method: "POST" })
  .validator((data: unknown) =>
    z.object({
      slug: z.string().min(2).max(120),
      cover_url: z.string().min(10).max(MAX_IMAGE_LEN),
    }).parse(data),
  )
  .handler(async ({ data }) => {
    const authed = await getAdminSession();
    if (!authed) throw new Error("Unauthorized");
    await ensureSchema();
    await sql`
      INSERT INTO service_covers (slug, cover_url, updated_at)
      VALUES (${data.slug}, ${data.cover_url}, NOW())
      ON CONFLICT (slug) DO UPDATE
        SET cover_url = EXCLUDED.cover_url,
            updated_at = NOW()
    `;
    return { ok: true };
  });

// ---- Admin: delete a service cover -----------------------------------------
export const deleteServiceCover = createServerFn({ method: "POST" })
  .validator((data: unknown) => z.object({ slug: z.string() }).parse(data))
  .handler(async ({ data }) => {
    const authed = await getAdminSession();
    if (!authed) throw new Error("Unauthorized");
    await sql`DELETE FROM service_covers WHERE slug = ${data.slug}`;
    return { ok: true };
  });
