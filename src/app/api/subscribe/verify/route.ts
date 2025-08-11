// app/api/subscribe/verify/route.ts
import { NextResponse } from "next/server";
import { getPgClient } from "../../../lib/db";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const base = new URL(req.url);     // base URL for redirects

  const to = (path: string) => NextResponse.redirect(new URL(path, base), 303);

  try {
    const token = new URL(req.url).searchParams.get("token");
    if (!token) return to("/?sub=invalid");

    const client = await getPgClient();

    const { rowCount } = await client.query(
      `UPDATE app.subscribers
       SET status='subscribed', verified_at=now(), updated_at=now()
       WHERE verify_token=$1 AND status='pending'`,
      [token]
    );

    if (rowCount && rowCount > 0) return to("/?sub=ok");
    // already verified or bad token
    return to("/?sub=invalid");
  } catch (e) {
    console.error("verify error:", e);
    return to("/?sub=error");
  }
}
