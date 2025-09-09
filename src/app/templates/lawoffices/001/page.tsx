'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';

// =============================
// Icons (clean, legal vibe)
// =============================
const ScalesIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h6"/><path d="M15 12h6"/><path d="M12 3v18"/><path d="M5 12l-3 6h6l-3-6Z"/><path d="M22 18h-6l3-6 3 6Z"/></svg>
);
const GavelIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m14 13 6.5 6.5"/><path d="m11 16 2 2"/><path d="m2 21 3-3"/><path d="m5 18 7-7 3 3-7 7z"/><path d="m14 4 6 6"/><path d="m16 2 6 6"/></svg>
);
const BriefcaseIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M12 12v3"/></svg>
);
const ContractIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 10h8M8 14h5"/></svg>
);
const CalendarIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
);
const PhoneIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M2.5 5.5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 1.7l.3 1.8a2 2 0 0 1-.5 1.7l-1.1 1.1a14 14 0 0 0 6 6l1.1-1.1a2 2 0 0 1 1.7-.5l1.8.3a2 2 0 0 1 1.7 2v2a2 2 0 0 1-2 2h-.5A18.5 18.5 0 0 1 2.5 6v-.5Z"/></svg>
);
const MailIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="m3 6 9 7 9-7"/></svg>
);
const MapPinIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 10A8.84 8.84 0 1 1 4 10c0 6.63 8 12 8 12s8-5.37 8.84-12Z"/><circle cx="12" cy="10" r="3"/></svg>
);

// =============================
// Types & Mock Data
// =============================

type PracticeKey = 'injury'|'family'|'criminal'|'business'|'estate'|'immigration';

type Attorney = {
  id: string; name: string; title: string; bio: string; photo: string; email: string; phone: string; admissions: string[]; areas: PracticeKey[];
};

type Area = { key: PracticeKey; name: string; icon: 'brief'|'gavel'|'contract'; blurb: string; image: string };

const AREAS: Area[] = [
  { key: 'injury', name: 'Personal Injury', icon: 'gavel', blurb: 'Car accidents, premises liability, wrongful death.', image: 'https://placehold.co/1200x800/0f172a/ffffff.jpg?text=Personal+Injury' },
  { key: 'family', name: 'Family Law', icon: 'contract', blurb: 'Divorce, custody, support, protective orders.', image: 'https://placehold.co/1200x800/1f2937/ffffff.jpg?text=Family+Law' },
  { key: 'criminal', name: 'Criminal Defense', icon: 'gavel', blurb: 'Felonies, misdemeanors, DUI, expungements.', image: 'https://placehold.co/1200x800/111827/ffffff.jpg?text=Criminal+Defense' },
  { key: 'business', name: 'Business & Contracts', icon: 'brief', blurb: 'Entity formation, contracts, disputes, compliance.', image: 'https://placehold.co/1200x800/334155/ffffff.jpg?text=Business+Law' },
  { key: 'estate', name: 'Estate Planning', icon: 'contract', blurb: 'Wills, trusts, powers of attorney, probate.', image: 'https://placehold.co/1200x800/0b132b/ffffff.jpg?text=Estate+Planning' },
  { key: 'immigration', name: 'Immigration', icon: 'brief', blurb: 'Family petitions, naturalization, waivers.', image: 'https://placehold.co/1200x800/0f172a/ffffff.jpg?text=Immigration' },
];

const ATTORNEYS: Attorney[] = [
  { id: 'a1', name: 'Alexis Jordan, Esq.', title: 'Managing Partner', bio: 'Trial‑tested litigator with 12+ years in injury and business disputes. Known for meticulous case prep and client communication.', photo: 'https://placehold.co/600x750/0f172a/ffffff.jpg?text=Alexis+Jordan', email: 'ajordan@rivercitylaw.com', phone: '(804) 555‑5101', admissions: ['Virginia','D.C.','4th Cir.'], areas: ['injury','business'] },
  { id: 'a2', name: 'Samuel Ortiz, Esq.', title: 'Senior Counsel', bio: 'Former prosecutor now defending clients in felony and misdemeanor matters, with a focus on second chances and expungements.', photo: 'https://placehold.co/600x750/1e293b/ffffff.jpg?text=Samuel+Ortiz', email: 'sortiz@rivercitylaw.com', phone: '(804) 555‑5102', admissions: ['Virginia'], areas: ['criminal'] },
  { id: 'a3', name: 'Priya Desai, Esq.', title: 'Associate Attorney', bio: 'Guides families through divorce and custody with compassion and clear strategy. Fluent in Spanish and Hindi.', photo: 'https://placehold.co/600x750/111827/ffffff.jpg?text=Priya+Desai', email: 'pdesai@rivercitylaw.com', phone: '(804) 555‑5103', admissions: ['Virginia'], areas: ['family','estate'] },
];

const REVIEWS = [
  { q: 'They explained every step and fought hard — settlement exceeded expectations.', a: 'Marilyn T.' },
  { q: 'Responsive, practical advice. We got our LLC and contracts squared away quickly.', a: 'B. Nguyen' },
  { q: 'Mr. Ortiz believed in me when no one else would. Case dismissed.', a: 'J. Carter' },
];

const RESULTS = [
  { title: 'Auto collision settlement', note: '$450,000 negotiated pre‑trial for injured driver. *Results depend on facts.*' },
  { title: 'Felony reduced & expunged', note: 'Client eligible for record sealing after plea amended to misdemeanor.' },
  { title: 'Business dispute resolved', note: 'Favorable buy‑out and non‑compete drafted to avoid litigation.' },
];

// =============================
// Page (distinctive layout + serif headings + step form)
// =============================
export default function LawOfficesTemplatePage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeArea, setActiveArea] = useState<PracticeKey | 'all'>('all');

  const filteredAttys = useMemo(() => activeArea === 'all' ? ATTORNEYS : ATTORNEYS.filter(a => a.areas.includes(activeArea)), [activeArea]);

  return (
    <div className="bg-stone-50 text-stone-800">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur shadow-sm border-b border-stone-200">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 text-2xl font-extrabold tracking-tight text-stone-900 font-serif">
            <ScalesIcon className="w-7 h-7 text-amber-600" />
            RiverCity <span className="text-amber-600">Law</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#areas" className="hover:text-amber-700">Practice Areas</a>
            <a href="#attorneys" className="hover:text-amber-700">Attorneys</a>
            <a href="#results" className="hover:text-amber-700">Results</a>
            <a href="#consult" className="hover:text-amber-700">Consultation</a>
          </nav>
          <div className="hidden md:flex items-center gap-3">
            <a href="#consult" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-900 text-white font-semibold hover:bg-black"><CalendarIcon className="w-5 h-5"/> Free Consult</a>
          </div>
          <button className="md:hidden" onClick={() => setMobileOpen(v => !v)} aria-label="Menu">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
        </div>
        {mobileOpen && (
          <div className="md:hidden border-t border-stone-200 bg-white">
            <div className="px-6 py-3 flex flex-col gap-3 text-sm">
              <a href="#areas" className="py-2">Practice Areas</a>
              <a href="#attorneys" className="py-2">Attorneys</a>
              <a href="#results" className="py-2">Results</a>
              <a href="#consult" className="py-2">Consultation</a>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* Hero with split layout */}
        <section className="relative bg-white">
          <div className="container mx-auto px-6 py-10 md:py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-stone-900 font-serif">Practical counsel. Relentless advocacy.</h1>
              <p className="mt-4 text-lg text-stone-700">Trial‑ready lawyers serving Richmond and the surrounding counties in injury, family, defense, and business matters.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#consult" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-600 text-white font-semibold hover:bg-amber-700"><CalendarIcon className="w-5 h-5"/> Request a Consultation</a>
                <a href="tel:8045555100" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-stone-300 hover:border-amber-600"><PhoneIcon className="w-5 h-5"/> (804) 555‑5100</a>
              </div>
              {/* trust ribbon */}
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="p-4 rounded-xl border border-stone-200 bg-stone-50">
                  <p className="text-2xl font-extrabold text-stone-900">Top Rated</p>
                  <p className="text-xs text-stone-600">4.9★ client reviews</p>
                </div>
                <div className="p-4 rounded-xl border border-stone-200 bg-stone-50">
                  <p className="text-2xl font-extrabold text-stone-900">Trial‑Ready</p>
                  <p className="text-xs text-stone-600">Litigation & negotiation</p>
                </div>
                <div className="p-4 rounded-xl border border-stone-200 bg-stone-50">
                  <p className="text-2xl font-extrabold text-stone-900">Bilingual</p>
                  <p className="text-xs text-stone-600">Spanish available</p>
                </div>
                <div className="p-4 rounded-xl border border-stone-200 bg-stone-50">
                  <p className="text-2xl font-extrabold text-stone-900">Local</p>
                  <p className="text-xs text-stone-600">Richmond & counties</p>
                </div>
              </div>
            </div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-stone-200">
              <Image src="https://placehold.co/1200x1200/0f172a/ffffff.jpg?text=RiverCity+Law" alt="Law office" width={1200} height={1200} className="object-cover" />
            </div>
          </div>
        </section>

        {/* Practice areas with filter chips */}
        <section id="areas" className="bg-stone-50 py-16">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-stone-900 font-serif mr-auto">Practice Areas</h2>
              <FilterChip label="All" active={activeArea==='all'} onClick={() => setActiveArea('all')} />
              {AREAS.map(a => (
                <FilterChip key={a.key} label={a.name} active={activeArea===a.key} onClick={() => setActiveArea(a.key)} />
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {(activeArea==='all'?AREAS:AREAS.filter(a=>a.key===activeArea)).map(a => (
                <article key={a.key} className="bg-white rounded-2xl overflow-hidden shadow ring-1 ring-stone-200">
                  <Image src={a.image} alt={a.name} width={1200} height={800} className="h-40 w-full object-cover" />
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-amber-700 mb-2">
                      {a.icon==='brief' ? <BriefcaseIcon className="w-5 h-5"/> : a.icon==='gavel' ? <GavelIcon className="w-5 h-5"/> : <ContractIcon className="w-5 h-5"/>}
                      <h3 className="text-lg font-bold text-stone-900">{a.name}</h3>
                    </div>
                    <p className="text-sm text-stone-700">{a.blurb}</p>
                    <a href="#consult" className="mt-4 inline-block text-sm font-semibold text-amber-700 hover:text-amber-800">Request a consult →</a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Attorneys grid with admissions + area tags */}
        <section id="attorneys" className="bg-white py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-stone-900 font-serif mb-8">Your Attorneys</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredAttys.map(a => (
                <div key={a.id} className="rounded-2xl overflow-hidden shadow ring-1 ring-stone-200 bg-stone-50">
                  <Image src={a.photo} alt={a.name} width={600} height={750} className="h-72 w-full object-cover" />
                  <div className="p-5">
                    <p className="text-xs uppercase tracking-wider text-stone-500">{a.title}</p>
                    <h3 className="text-xl font-semibold text-stone-900 mt-1">{a.name}</h3>
                    <p className="text-sm text-stone-700 mt-2">{a.bio}</p>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs">
                      {a.admissions.map(ad => (<span key={ad} className="px-2 py-1 rounded-full bg-white border border-stone-200">{ad}</span>))}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs">
                      {a.areas.map(ad => (<span key={ad} className="px-2 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">{AREAS.find(x=>x.key===ad)?.name}</span>))}
                    </div>
                    <div className="mt-4 flex items-center gap-3 text-sm">
                      <a href={`mailto:${a.email}`} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-stone-300 hover:border-amber-600"><MailIcon className="w-4 h-4"/> Email</a>
                      <a href={`tel:${a.phone.replace(/[^0-9]/g, '')}`} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-stone-300 hover:border-amber-600"><PhoneIcon className="w-4 h-4"/> {a.phone}</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Results / Testimonials with disclaimer */}
        <section id="results" className="bg-stone-50 py-16">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-stone-900 font-serif mb-4">Representative Results</h2>
                <div className="space-y-4">
                  {RESULTS.map((r,i) => (
                    <div key={i} className="p-5 rounded-2xl bg-white border border-stone-200 shadow flex items-start gap-3">
                      <GavelIcon className="w-5 h-5 text-amber-700 mt-1"/>
                      <div>
                        <p className="font-semibold text-stone-900">{r.title}</p>
                        <p className="text-sm text-stone-700">{r.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-stone-500 mt-3">Past results are not a guarantee of future outcomes. Every case is different.</p>
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-stone-900 font-serif mb-4">Client Feedback</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {REVIEWS.map((t,i) => (
                    <div key={i} className="p-5 rounded-2xl bg-white border border-stone-200 shadow">
                      <p className="text-stone-700 italic">“{t.q}”</p>
                      <p className="mt-2 text-sm font-semibold text-stone-900">{t.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Consultation request — 3‑step wizard */}
        <ConsultationWizard />

        {/* Location */}
        <section className="py-16 bg-white" id="contact">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div className="bg-stone-50 rounded-2xl border border-stone-200 p-6 shadow">
                <h3 className="text-xl font-extrabold text-stone-900 flex items-center gap-2"><MapPinIcon className="w-5 h-5 text-amber-700"/> Richmond Office</h3>
                <p className="text-sm text-stone-700 mt-1">200 Main St, Suite 500, Richmond, VA</p>
                <ul className="mt-4 text-sm text-stone-700 space-y-1">
                  <li>Mon–Fri: 8:30 AM – 6 PM</li>
                  <li>Sat: By appointment</li>
                </ul>
                <div className="mt-4 flex items-center gap-3 text-sm">
                  <a href="tel:8045555100" className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-stone-300 hover:border-amber-700"><PhoneIcon className="w-4 h-4"/>(804) 555‑5100</a>
                  <a href="mailto:hello@rivercitylaw.com" className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-stone-300 hover:border-amber-700"><MailIcon className="w-4 h-4"/> Email</a>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden shadow ring-1 ring-stone-200">
                <iframe
                  src={`https://www.google.com/maps?q=${encodeURIComponent('200 Main St, Richmond, VA')}&output=embed`}
                  className="w-full h-[360px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-300">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">RiverCity Law</h3>
              <p className="text-sm">Practical counsel across injury, family, defense, business, estate, and immigration.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Areas</h4>
              <ul className="space-y-2 text-sm">
                {AREAS.map(a => (<li key={a.key}><a href="#areas" className="hover:text-white">{a.name}</a></li>))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li>Richmond, VA</li>
                <li>(804) 555‑5100</li>
                <li>hello@rivercitylaw.com</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Disclaimer</h4>
              <p className="text-xs">This site is advertising material. No attorney‑client relationship is formed by submitting the consultation form. Do not send confidential information until an engagement is signed.</p>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-stone-700 text-center text-sm">© {new Date().getFullYear()} RiverCity Law. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}

// =============================
// Filter chip
// =============================
function FilterChip({ label, active, onClick }: { label: string; active?: boolean; onClick: () => void; }) {
  return (
    <button onClick={onClick} className={`px-3 py-1.5 rounded-full text-sm border ${active ? 'border-amber-700 bg-amber-50 text-amber-800' : 'border-stone-300 hover:border-amber-600'}`}>{label}</button>
  );
}

// =============================
// 3‑Step Consultation Wizard
// =============================
function ConsultationWizard() {
  const [step, setStep] = useState(1);
  const [area, setArea] = useState<PracticeKey>('injury');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [opponent, setOpponent] = useState('');
  const [summary, setSummary] = useState('');
  const [urgency, setUrgency] = useState<'soon'|'weeks'|'unsure'>('soon');
  const [consent, setConsent] = useState(false);
  const [agree, setAgree] = useState(false);
  const [status, setStatus] = useState('');

  const canNext1 = name && email && phone;
  const canNext2 = summary.length >= 20; // encourage a helpful summary

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent || !agree) return; // guard
    setStatus('Submitting…');
    setTimeout(() => {
      setStatus('Thanks! We\'ll run a quick conflict check and reach out.');
      setStep(1); setArea('injury'); setName(''); setEmail(''); setPhone(''); setOpponent(''); setSummary(''); setUrgency('soon'); setConsent(false); setAgree(false);
    }, 900);
  };

  return (
    <section id="consult" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto rounded-3xl border border-stone-200 shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3"><ScalesIcon className="w-6 h-6"/><h2 className="text-xl font-semibold">Free Consultation</h2></div>
            <div className="flex items-center gap-2 text-xs">
              <StepDot n={1} step={step} /> <StepDot n={2} step={step} /> <StepDot n={3} step={step} />
            </div>
          </div>

          {/* Step content */}
          <div className="bg-stone-50 p-6 md:p-8">
            {step === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="md:col-span-2">
                  <span className="font-semibold text-stone-900">Which area fits your matter?</span>
                  <select value={area} onChange={e=>setArea(e.target.value as PracticeKey)} className="mt-1 w-full p-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-600 bg-white">
                    {AREAS.map(a => (<option key={a.key} value={a.key}>{a.name}</option>))}
                  </select>
                </label>
                <input className="p-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-600" placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} required />
                <input className="p-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-600" placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
                <input className="md:col-span-2 p-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-600" placeholder="Phone" value={phone} onChange={e=>setPhone(e.target.value)} required />
                <div className="md:col-span-2 flex items-center justify-between mt-2">
                  <button disabled className="px-5 py-2 rounded-xl border border-stone-300 text-stone-400">Back</button>
                  <button disabled={!canNext1} onClick={()=>setStep(2)} className={`px-5 py-2 rounded-xl ${canNext1? 'bg-stone-900 text-white hover:bg-black':'bg-stone-300 text-stone-500'}`}>Next</button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="grid grid-cols-1 gap-4">
                <textarea className="p-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-600" rows={5} placeholder="Briefly describe your situation (no sensitive details yet)." value={summary} onChange={e=>setSummary(e.target.value)} />
                <input className="p-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-600" placeholder="Opposing party (if any) for conflict check" value={opponent} onChange={e=>setOpponent(e.target.value)} />
                <div className="flex flex-wrap gap-3">
                  {[
                    { v:'soon', label:'Urgent (this week)' },
                    { v:'weeks', label:'Within a few weeks' },
                    { v:'unsure', label:'Not sure' },
                  ].map(o => (
                    <label key={o.v} className={`px-3 py-2 rounded-xl border ${urgency===o.v?'border-amber-700 bg-amber-50 text-amber-800':'border-stone-300 hover:border-amber-600'}`}>
                      <input type="radio" name="urgency" className="mr-2" checked={urgency===o.v} onChange={()=>setUrgency(o.v as 'soon'|'weeks'|'unsure')} />{o.label}
                    </label>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-2">
                  <button onClick={()=>setStep(1)} className="px-5 py-2 rounded-xl border border-stone-300 hover:border-amber-700">Back</button>
                  <button disabled={!canNext2} onClick={()=>setStep(3)} className={`px-5 py-2 rounded-xl ${canNext2? 'bg-stone-900 text-white hover:bg-black':'bg-stone-300 text-stone-500'}`}>Review</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <form onSubmit={submit} className="space-y-4">
                <div className="rounded-xl bg-white p-4 border border-stone-200">
                  <p className="font-semibold text-stone-900">Summary</p>
                  <p className="text-sm text-stone-700 mt-1">Area: {AREAS.find(a=>a.key===area)?.name} · Name: {name} · Email: {email} · Phone: {phone} · Urgency: {urgency}</p>
                  {opponent && <p className="text-sm text-stone-700">Opposing party: {opponent}</p>}
                  <p className="text-sm text-stone-700 mt-1">“{summary}”</p>
                </div>
                <label className="flex items-start gap-2 text-sm">
                  <input type="checkbox" checked={consent} onChange={e=>setConsent(e.target.checked)} />
                  <span>I consent to be contacted by RiverCity Law. Standard rates may apply.</span>
                </label>
                <label className="flex items-start gap-2 text-sm">
                  <input type="checkbox" checked={agree} onChange={e=>setAgree(e.target.checked)} />
                  <span>I understand this request does not create an attorney‑client relationship and I will not send confidential details until an engagement is signed.</span>
                </label>
                <div className="flex items-center justify-between">
                  <button type="button" onClick={()=>setStep(2)} className="px-5 py-2 rounded-xl border border-stone-300 hover:border-amber-700">Back</button>
                  <button type="submit" disabled={!consent || !agree} className={`px-5 py-2 rounded-xl ${consent && agree ? 'bg-amber-600 text-white hover:bg-amber-700':'bg-stone-300 text-stone-500'}`}>Submit</button>
                </div>
                {status && <p className="text-sm text-amber-700 font-semibold">{status}</p>}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function StepDot({ n, step }: { n: number; step: number }) {
  const active = step >= n; return <span className={`inline-block w-2.5 h-2.5 rounded-full ${active ? 'bg-white' : 'bg-white/40'}`} />
}
