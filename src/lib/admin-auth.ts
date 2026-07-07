"use server";

import { getCookie, setCookie, deleteCookie } from "@tanstack/start-server-core";
import { sql, ensureSchema } from "./db";

const SESSION_COOKIE = "caas_sess";
const SESSION_TTL_MS = 8 * 60 * 60 * 1000; // 8 hours
const SESSION_SECRET = process.env.SESSION_SECRET ?? "fallback-secret-change-me";

// ----- Crypto helpers --------------------------------------------------------

async function hmac(message: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(SESSION_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function hashPassword(password: string): Promise<string> {
  const enc = new TextEncoder();
  const buf = await crypto.subtle.digest(
    "SHA-256",
    enc.encode(password + SESSION_SECRET),
  );
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// ----- Session token ---------------------------------------------------------

async function makeToken(username: string): Promise<string> {
  const payload = `admin:${username}:${Date.now()}`;
  const sig = await hmac(payload);
  return btoa(`${payload}:${sig}`);
}

async function verifyToken(token: string): Promise<boolean> {
  try {
    const decoded = atob(token);
    const lastColon = decoded.lastIndexOf(":");
    const sig = decoded.slice(lastColon + 1);
    const payload = decoded.slice(0, lastColon);
    const parts = payload.split(":");
    // payload is "admin:<username>:<timestamp>"
    if (parts.length !== 3 || parts[0] !== "admin") return false;
    const age = Date.now() - parseInt(parts[2], 10);
    if (age > SESSION_TTL_MS) return false;
    const expected = await hmac(payload);
    return sig === expected;
  } catch {
    return false;
  }
}

// ----- Public API ------------------------------------------------------------

export async function adminLogin(
  username: string,
  password: string,
): Promise<{ ok: boolean; error?: string }> {
  await ensureSchema();

  const rows = await (sql as any)`
    SELECT id, password_hash FROM admin_users
    WHERE username = ${username}
    LIMIT 1
  `;

  if (rows.length === 0) {
    return { ok: false, error: "Invalid credentials" };
  }

  const hashed = await hashPassword(password);

  if (hashed !== rows[0].password_hash) {
    return { ok: false, error: "Invalid credentials" };
  }

  // Update last_login
  await sql`
    UPDATE admin_users SET last_login = NOW() WHERE id = ${rows[0].id}
  `;

  const token = await makeToken(username);

  setCookie(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_TTL_MS / 1000,
    path: "/",
  });

  return { ok: true };
}

export async function adminLogout(): Promise<void> {
  deleteCookie(SESSION_COOKIE);
}

export async function getAdminSession(): Promise<boolean> {
  try {
    const token = getCookie(SESSION_COOKIE);
    if (!token) return false;
    return verifyToken(token);
  } catch {
    return false;
  }
}
