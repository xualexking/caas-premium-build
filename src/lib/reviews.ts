"use server";

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { sql, ensureSchema } from "./db";
import { getAdminSession, adminLogin, adminLogout } from "./admin-auth";

export type Review = {
  id: number;
  name: string;
  role: string | null;
  rating: number;
  quote: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
  reviewed_at: string | null;
};

const submitSchema = z.object({
  name: z.string().min(2).max(120),
  role: z.string().max(120).optional(),
  rating: z.number().int().min(1).max(5),
  quote: z.string().min(10).max(1000),
});

// ---- Public: submit a review (goes to pending) ------------------------------
export const submitReview = createServerFn({ method: "POST" })
  .validator((data: unknown) => submitSchema.parse(data))
  .handler(async ({ data }) => {
    await ensureSchema();
    await sql`
      INSERT INTO reviews (name, role, rating, quote, status)
      VALUES (${data.name}, ${data.role ?? null}, ${data.rating}, ${data.quote}, 'pending')
    `;
    return { ok: true };
  });

// ---- Public: get approved reviews for homepage ------------------------------
export const getApprovedReviews = createServerFn({ method: "GET" }).handler(
  async () => {
    await ensureSchema();
    const rows = await (sql as any)`
      SELECT id, name, role, rating, quote, status, created_at, reviewed_at
      FROM reviews
      WHERE status = 'approved'
      ORDER BY reviewed_at DESC
      LIMIT 20
    `;
    return rows as Review[];
  },
);

// ---- Admin: get reviews by status ------------------------------------------
export const getAdminReviews = createServerFn({ method: "GET" })
  .validator((data: unknown) => {
    const d = data as { status?: string };
    return { status: (d?.status as Review["status"]) ?? "pending" };
  })
  .handler(async ({ data }) => {
    const authed = await getAdminSession();
    if (!authed) throw new Error("Unauthorized");
    await ensureSchema();
    const rows = await (sql as any)`
      SELECT id, name, role, rating, quote, status, created_at, reviewed_at
      FROM reviews
      WHERE status = ${data.status}
      ORDER BY created_at DESC
    `;
    return rows as Review[];
  });

// ---- Admin: approve --------------------------------------------------------
export const approveReview = createServerFn({ method: "POST" })
  .validator((data: unknown) => z.object({ id: z.number() }).parse(data))
  .handler(async ({ data }) => {
    const authed = await getAdminSession();
    if (!authed) throw new Error("Unauthorized");
    await sql`UPDATE reviews SET status = 'approved', reviewed_at = NOW() WHERE id = ${data.id}`;
    return { ok: true };
  });

// ---- Admin: reject ----------------------------------------------------------
export const rejectReview = createServerFn({ method: "POST" })
  .validator((data: unknown) => z.object({ id: z.number() }).parse(data))
  .handler(async ({ data }) => {
    const authed = await getAdminSession();
    if (!authed) throw new Error("Unauthorized");
    await sql`UPDATE reviews SET status = 'rejected', reviewed_at = NOW() WHERE id = ${data.id}`;
    return { ok: true };
  });

// ---- Admin: delete ----------------------------------------------------------
export const deleteReview = createServerFn({ method: "POST" })
  .validator((data: unknown) => z.object({ id: z.number() }).parse(data))
  .handler(async ({ data }) => {
    const authed = await getAdminSession();
    if (!authed) throw new Error("Unauthorized");
    await sql`DELETE FROM reviews WHERE id = ${data.id}`;
    return { ok: true };
  });

// ---- Admin: login -----------------------------------------------------------
export const adminLoginFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    const d = data as { username: string; password: string };
    return { username: d.username, password: d.password };
  })
  .handler(async ({ data }) => {
    return adminLogin(data.username, data.password);
  });

// ---- Admin: logout ----------------------------------------------------------
export const adminLogoutFn = createServerFn({ method: "POST" }).handler(async () => {
  await adminLogout();
  return { ok: true };
});

// ---- Admin: check session ---------------------------------------------------
export const checkAdminSession = createServerFn({ method: "GET" }).handler(async () => {
  return { authenticated: await getAdminSession() };
});

// ---- Admin: review counts ---------------------------------------------------
export const getReviewCounts = createServerFn({ method: "GET" }).handler(async () => {
  const authed = await getAdminSession();
  if (!authed) throw new Error("Unauthorized");
  await ensureSchema();
  const rows = await (sql as any)`
    SELECT status, COUNT(*)::text as count FROM reviews GROUP BY status
  `;
  const counts = { pending: 0, approved: 0, rejected: 0 };
  for (const row of rows) {
    counts[row.status as keyof typeof counts] = parseInt(row.count, 10);
  }
  return counts;
});
