import { neon } from "@neondatabase/serverless";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const COUNTER = "visitors";
const SEEN_COOKIE = "seen";
const ONE_YEAR_S = 60 * 60 * 24 * 365;

// Counts each browser once: the first visit increments, later visits only read.
export async function POST() {
  const url = process.env.DATABASE_URL;
  if (!url) return NextResponse.json({ error: "DATABASE_URL is not set" }, { status: 503 });

  const sql = neon(url);
  const jar = await cookies();
  const isNew = !jar.has(SEEN_COOKIE);

  const rows = isNew
    ? await sql`INSERT INTO counters (name, value) VALUES (${COUNTER}, 1)
                ON CONFLICT (name) DO UPDATE SET value = counters.value + 1
                RETURNING value`
    : await sql`SELECT value FROM counters WHERE name = ${COUNTER}`;

  if (isNew) {
    jar.set(SEEN_COOKIE, "1", { maxAge: ONE_YEAR_S, httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production" });
  }

  return NextResponse.json({ count: Number(rows[0]?.value ?? 0) });
}
