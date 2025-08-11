import express from "express";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { z } from "zod";
import { getPgClient } from "./db.js";

const app = express();
app.use(express.json());

// CORS for your site
const ORIGIN = process.env.SITE_ORIGIN; // e.g. https://www.majestikmagik.com
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", ORIGIN);
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  if (req.method === "OPTIONS") return res.status(204).end();
  next();
});

// SMTP transport (Hostinger)
const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 465),
  secure: String(process.env.SMTP_SECURE) === "true",
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
});

const EmailSchema = z.object({ email: z.string().email(), source: z.string().optional() });

// POST /api/subscribe
app.post("/api/subscribe", async (req, res) => {
  try {
    const parse = EmailSchema.safeParse(req.body);
    if (!parse.success) return res.status(400).json({ ok: false, error: "Invalid email" });
    const { email, source } = parse.data;

    const verifyToken = crypto.randomBytes(24).toString("hex");
    const referer = req.get("referer") || null;
    const userAgent = req.get("user-agent") || null;

    const db = await getPgClient();
    await db.query(
      `INSERT INTO app.subscribers (email, status, source, referer, user_agent, ip_hash, verify_token)
       VALUES ($1,'pending',$2,$3,$4,NULL,$5)
       ON CONFLICT (email) DO UPDATE SET
         status='pending',
         source = COALESCE(EXCLUDED.source, app.subscribers.source),
         referer = EXCLUDED.referer,
         user_agent = EXCLUDED.user_agent,
         verify_token = EXCLUDED.verify_token,
         updated_at = now()`,
      [email, source ?? "popup", referer, userAgent, verifyToken]
    );

    const verifyUrl = `${process.env.API_BASE_URL}/api/subscribe/verify?token=${verifyToken}`;
    await transport.sendMail({
      to: email,
      from: process.env.EMAIL_FROM,
      subject: "Confirm your subscription to Majestik Magik",
      html: `<p>Click to confirm:</p><p><a href="${verifyUrl}">Confirm subscription</a></p><p>${verifyUrl}</p>`
    });

    res.json({ ok: true, message: "Check your email to confirm." });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: "Server error" });
  }
});

// GET /api/subscribe/verify
app.get("/api/subscribe/verify", async (req, res) => {
  try {
    const token = req.query.token;
    if (!token) return res.redirect(303, `${process.env.SITE_ORIGIN}/?sub=invalid`);
    const db = await getPgClient();
    const { rowCount } = await db.query(
      `UPDATE app.subscribers SET status='subscribed', verified_at=now(), updated_at=now()
       WHERE verify_token=$1 AND status='pending'`,
      [token]
    );
    res.redirect(303, `${process.env.SITE_ORIGIN}/?sub=${rowCount ? "ok" : "invalid"}`);
  } catch (e) {
    console.error(e);
    res.redirect(303, `${process.env.SITE_ORIGIN}/?sub=error`);
  }
});

// Health
app.get("/", (_req, res) => res.send("ok"));
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`listening on ${port}`));
