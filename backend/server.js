import express from "express";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { z } from "zod";
import { getPgClient } from "./db.js";

const app = express();
app.disable("x-powered-by");
app.set("trust proxy", 1);
app.use(express.json());

// --- CORS ---
const ALLOWED_ORIGINS = [
  "https://majestikmagik.com",
  "https://www.majestikmagik.com",
  "http://localhost:3000"
];
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (!origin || ALLOWED_ORIGINS.includes(origin)) {
    if (origin) res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Max-Age", "86400");
    res.setHeader("Vary", "Origin");
  }
  if (req.method === "OPTIONS") return res.status(204).end();
  next();
});

// --- Required envs ---
const required = ["SITE_ORIGIN","SMTP_HOST","SMTP_USER","SMTP_PASS","EMAIL_FROM","NEWSLETTER_API_PUBLIC_BASE"];
for (const key of required) {
  if (!process.env[key]) console.warn(`[startup] Missing env ${key}`);
}

// --- SMTP transport ---
const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 465),
  secure: String(process.env.SMTP_SECURE ?? "true") === "true",
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
});

// --- Config / utils ---
const EmailSchema = z.object({ email: z.string().email(), source: z.string().optional() });

// Normalize base (no trailing slash)
const API_PUBLIC_BASE = String(process.env.NEWSLETTER_API_PUBLIC_BASE || "").replace(/\/+$/, "");
if (!API_PUBLIC_BASE) {
  console.error("[startup] NEWSLETTER_API_PUBLIC_BASE is required");
  process.exit(1);
}

// Get a stable, non-reversible hash of client IP (optional)
function hashIp(ip) {
  if (!ip) return null;
  return crypto.createHash("sha256").update(ip).digest("hex");
}

// -------------------- Routes --------------------

// POST /api/subscribe
app.post("/api/subscribe", async (req, res) => {
  try {
    const parsed = EmailSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ ok: false, error: "Invalid email" });

    const { email, source } = parsed.data;
    const verifyToken = crypto.randomBytes(24).toString("hex");
    const referer = req.get("referer") || null;
    const userAgent = req.get("user-agent") || null;

    // derive client IP from Cloud Run proxy chain
    const fwd = req.headers["x-forwarded-for"];
    const clientIp = Array.isArray(fwd) ? fwd[0] : (fwd?.split(",")[0]?.trim() || req.socket.remoteAddress || null);
    const ipHash = hashIp(clientIp);

    const db = await getPgClient();
    await db.query(
      `INSERT INTO app.subscribers (email, status, source, referer, user_agent, ip_hash, verify_token)
       VALUES ($1,'pending',$2,$3,$4,$5,$6)
       ON CONFLICT (email) DO UPDATE SET
         status='pending',
         source = COALESCE(EXCLUDED.source, app.subscribers.source),
         referer = EXCLUDED.referer,
         user_agent = EXCLUDED.user_agent,
         ip_hash = COALESCE(app.subscribers.ip_hash, EXCLUDED.ip_hash),
         verify_token = EXCLUDED.verify_token,
         updated_at = now()`,
      [email, source ?? "popup", referer, userAgent, ipHash, verifyToken]
    );

    const verifyUrl = `${API_PUBLIC_BASE}/api/subscribe/verify?token=${verifyToken}`;
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
      `UPDATE app.subscribers
       SET status='subscribed', verified_at=now(), updated_at=now()
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
