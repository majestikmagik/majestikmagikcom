// app/api/subscribe/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { getPgClient } from "../../lib/db";

const EmailSchema = z.object({
  email: z.string().email(),
  source: z.string().optional(),
});

// Reuse one SMTP transport (Hostinger)
const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST!,
  port: Number(process.env.SMTP_PORT || 465),
  secure: process.env.SMTP_SECURE === "true", // 465 -> true, 587 -> false
  auth: {
    user: process.env.SMTP_USER!,
    pass: process.env.SMTP_PASS!,
  },
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = EmailSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
    }

    const email = parsed.data.email;                    // <-- defined here
    const source = parsed.data.source ?? "popup";
    const verifyToken = crypto.randomBytes(24).toString("hex"); // <-- defined here

    const referer = req.headers.get("referer");
    const userAgent = req.headers.get("user-agent");

    const client = await getPgClient();

    // upsert as pending
    await client.query(
      `
      INSERT INTO app.subscribers (email, status, source, referer, user_agent, ip_hash, verify_token)
      VALUES ($1,'pending',$2,$3,$4,NULL,$5)
      ON CONFLICT (email) DO UPDATE SET
        status='pending',
        source = COALESCE(EXCLUDED.source, app.subscribers.source),
        referer = EXCLUDED.referer,
        user_agent = EXCLUDED.user_agent,
        verify_token = EXCLUDED.verify_token,
        updated_at = now()
      `,
      [email, source, referer, userAgent, verifyToken]
    );

    const base = process.env.APP_BASE_URL!;
    const link = `${base}/api/subscribe/verify?token=${verifyToken}`;

    await transport.sendMail({
      to: email,
      from: process.env.EMAIL_FROM!, // e.g., 'Majestik Magik <hello@majestikmagik.com>'
      subject: "Confirm your subscription to Majestik Magik",
      html: `
        <p>Hey! Confirm your subscription by clicking the button below.</p>
        <p><a href="${link}" style="padding:10px 16px;border-radius:8px;background:#111;color:#fff;text-decoration:none;">Confirm subscription</a></p>
        <p>Or open this link:<br>${link}</p>
      `,
    });

    return NextResponse.json({ ok: true, message: "Check your email to confirm." });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
