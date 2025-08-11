// components/NewsletterPopup.tsx
"use client";

import { useEffect, useState } from "react";

export default function NewsletterPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    const seen = localStorage.getItem("mm_newsletter_seen");
    if (!seen) {
      const t = setTimeout(() => setOpen(true), 2000); // show after 2s
      return () => clearTimeout(t);
    }
  }, []);

  const close = () => {
    setOpen(false);
    localStorage.setItem("mm_newsletter_seen", "1");
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      const r = await fetch(`${process.env.NEXT_PUBLIC_NEWSLETTER_API_URL}/api/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "popup" }),
      });
      const data = await r.json();
      if (data.ok) {
        setMsg("Almost done! Check your email to confirm your subscription.");
        setEmail("");
      } else {
        setMsg(data.error || "Something went wrong.");
      }
    } catch {
      setMsg("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={close} />
      <div className="relative w-full max-w-md rounded-2xl bg-indigo-600 p-6 shadow-xl">
        <button
          onClick={close}
          className="absolute right-3 top-3 rounded-full p-2 cursor-pointer text-gray-500 hover:bg-indigo-800"
          aria-label="Close"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold">Launch Your AI-Powered Website in 30 Days!</h2>
        <p className="mt-1 text-sm text-white-600">
          Join our newsletter for the latest exclusive tech tips and insights from Majestik Magik.
        </p>
        <form onSubmit={onSubmit} className="mt-4 space-y-3">
          <label className="block">
            <span className="sr-only">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-xl border px-3 py-2 cursor-pointer outline-none focus:ring-2"
            />
          </label>
          <button
            disabled={loading}
            className="w-full rounded-xl bg-black px-4 py-2 font-semibold cursor-pointer text-white hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Submitting…" : "Join the newsletter"}
          </button>
        </form>
        {msg && <p className="mt-3 text-sm">{msg}</p>}
        <p className="mt-3 text-xs text-gray-200">
          By subscribing, you agree to our emails. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
}
