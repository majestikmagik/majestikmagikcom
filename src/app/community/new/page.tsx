"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import React, { ChangeEvent } from "react";
interface FormData {
  name: string;
  description: string;
  websiteUrl: string;
  logoUrl: string;
  category: string;
  city: string;
  state: string;
  plan: "FREE" | "PRO";
}

export default function NewBiz() {
  const r = useRouter();
  const [loading, setLoading] = useState(false);
  const [f, setF] = useState<FormData>({
    name: "", description: "", websiteUrl: "", logoUrl: "",
    category: "", city: "", state: "", plan: "FREE"
  });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/businesses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(f),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) return alert(data.error || "Failed");
    r.push(`/community/${data.slug}`);
  }

  const set = (k: string) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF((s) => ({ ...s, [k]: e.target.value }));

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add Your Business</h1>
      <form onSubmit={submit} className="space-y-4">
        {[
          ["name","Business Name*"], ["websiteUrl","Website URL"], ["logoUrl","Logo URL"],
          ["category","Category*"], ["city","City"], ["state","State"],
        ].map(([k, label]) => (
          <div key={k}>
            <label className="block text-sm mb-2">{label}</label>
            <input className="w-full rounded-xl bg-slate-900/60 border border-slate-700 px-3 py-2"
              value={f[k as keyof Omit<FormData, 'description' | 'plan'>]} onChange={set(k)} required={["name","category"].includes(k)} />
          </div>
        ))}
        <div>
          <label className="block text-sm mb-2">Short Description*</label>
          <textarea rows={4} className="w-full rounded-xl bg-slate-900/60 border border-slate-700 px-3 py-2"
            value={f.description} onChange={set("description")} required />
        </div>

        <div className="flex gap-3">
          {(["FREE","PRO"] as const).map(p => (
            <button key={p} type="button"
              onClick={() => setF(s => ({...s, plan: p}))}
              className={`px-3 py-2 rounded-xl border ${f.plan===p?"border-violet-500":"border-slate-700"}`}>
              {p}
            </button>
          ))}
        </div>

        <button disabled={loading} className="w-full rounded-xl bg-violet-600 hover:bg-violet-500 py-3 font-semibold">
          {loading ? "Publishing…" : "Publish Listing"}
        </button>
      </form>
    </div>
  );
}
