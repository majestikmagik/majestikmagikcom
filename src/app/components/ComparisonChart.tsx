"use client";
import React from "react";


type Row = {
    label: string;
    mm: boolean | string;     // true/false shows check/x; string renders custom text
    wix: boolean | string;
    ss: boolean | string;
    note?: string;            // optional helper text
};

const rows: Row[] = [
    { label: "Managed Hosting", mm: true, wix: true, ss: true },
    { label: "Mobile-Friendly Design (custom)", mm: "Custom + optimized", wix: "Template-based", ss: "Template-based" },
    { label: "Updates Included", mm: "1–Unlimited (by plan)", wix: false, ss: false },
    { label: "Security Monitoring & Core Updates", mm: true, wix: "Limited", ss: "Limited" },
    { label: "Automated Monthly Backups", mm: true, wix: false, ss: false },
    { label: "SEO Optimization", mm: "Basic → Advanced (by plan)", wix: "Basic tools", ss: "Basic tools" },
    { label: "Analytics & Monthly Report", mm: "Standard/Premium", wix: "Limited", ss: "Limited" },
    { label: "Priority Support (human, local, AI chatbot)", mm: true, wix: "Chat/Forum", ss: "Email" },
    { label: "E-commerce Support", mm: "Premium", wix: "Add-on fees", ss: "Add-on fees" },
    { label: "Quarterly Strategy Call", mm: "Premium", wix: false, ss: false },
    { label: "Transparent Pricing", mm: "$25–$100/mo + $99 setup", wix: "Add-ons & upsells", ss: "Add-ons & upsells" },
];

const providers = ["Majestik Magik", "Wix", "Squarespace"];

const Check = () => (
    <svg className="h-5 w-5 text-emerald-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414l2.293 2.293 6.543-6.543a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
);

const Cross = () => (
    <svg className="h-5 w-5 text-rose-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);

function Cell({ val }: { val: boolean | string }) {
    if (typeof val === "boolean") return <div className="flex items-center justify-center">{val ? <Check /> : <Cross />}</div>;
    return <span className="text-slate-300">{val}</span>;
}

const ComparisonChart: React.FC = () => {
    return (
        <section className="bg-slate-900 py-16 md:py-24">
            <div className="container mx-auto px-6">
                <div className="mx-auto mb-10 max-w-4xl text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-100 scroll-animate">Why Choose Majestik Magik</h2>
                    <p className="mt-3 text-slate-400 scroll-animate" style={{ transitionDelay: "0.2s" }}>
                        Compare our managed, growth-focused care plans against DIY site builders.
                    </p>
                </div>

                {/* Mobile: stacked cards */}
                <div className="grid gap-6 md:hidden scroll-animate" style={{ transitionDelay: "0.4s" }}>
                    {rows.map((r) => (
                        <div key={r.label} className="rounded-2xl bg-slate-800/70 p-5 shadow-xl ring-1 ring-slate-700">
                            <div className="mb-2 flex items-start justify-between">
                                <h3 className="text-slate-100 font-semibold">{r.label}</h3>
                            </div>
                            {r.note && <p className="text-xs text-slate-400 mb-2">{r.note}</p>}
                            <div className="mt-3 grid grid-cols-3 gap-3 text-sm">
                                <div>
                                    <div className="text-indigo-300 font-medium mb-1">Majestik</div>
                                    <Cell val={r.mm} />
                                </div>
                                <div>
                                    <div className="text-slate-400 mb-1">Wix</div>
                                    <Cell val={r.wix} />
                                </div>
                                <div>
                                    <div className="text-slate-400 mb-1">Squarespace</div>
                                    <Cell val={r.ss} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Desktop: table */}
                <div className="hidden md:block overflow-hidden rounded-2xl ring-1 ring-slate-700 shadow-2xl scroll-animate" style={{ transitionDelay: "0.5s" }}>
                    <table className="min-w-full divide-y divide-slate-700 bg-slate-800/60">
                        <thead className="bg-slate-800/80">
                            <tr>
                                <th className="py-4 pl-6 pr-3 text-left text-sm font-semibold text-slate-200">Feature / Service</th>
                                {providers.map((p) => (
                                    <th key={p} className="px-6 py-4 text-sm font-semibold text-slate-200 text-center">{p}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700">
                            {rows.map((r, idx) => (
                                <tr key={r.label} className={idx % 2 ? "bg-slate-800/40" : ""}>
                                    <td className="whitespace-pre-wrap py-4 pl-6 pr-3 text-sm text-slate-100">
                                        <div className="font-medium">{r.label}</div>
                                        {r.note && <div className="mt-1 text-xs text-slate-400">{r.note}</div>}
                                    </td>
                                    <td className="px-6 py-4 text-center"><Cell val={r.mm} /></td>
                                    <td className="px-6 py-4 text-center"><Cell val={r.wix} /></td>
                                    <td className="px-6 py-4 text-center"><Cell val={r.ss} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default ComparisonChart;
