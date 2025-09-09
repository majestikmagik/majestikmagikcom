'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';

// =============================
// Icons (Lucide-style SVG)
// =============================
const CarIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2h4l2 4h4a2 2 0 0 1 2 2v4H2V8a2 2 0 0 1 2-2h4l2-4Z"/><path d="M2 14h20"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>
);
const SparklesIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.7 3.4L17 8.1l-3.3 1.7L12 13l-1.7-3.2L7 8.1l3.3-1.7L12 3Z"/><path d="M5 3l.9 1.8L8 5.7 5.9 6.6 5 8.5l-.9-1.9L2 5.7l2.1-.9L5 3Z"/><path d="M19 14l.9 1.8L22 17.7l-2.1.9L19 20.5l-.9-1.9L16 17.7l2.1-.9L19 14Z"/></svg>
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
const CameraIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19V8a2 2 0 0 0-2-2h-3l-2-3H8L6 6H3a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2Z"/><circle cx="12" cy="13" r="4"/></svg>
);
const StarIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2"><path d="M12 2 15.09 8.26 22 9.27 17 14.14l1.18 6.88L12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2Z"/></svg>
);

// =============================
// Types & Mock Data
// =============================

type PackageKey = 'express' | 'full' | 'ceramic' | 'correction';

type ServicePkg = {
  key: PackageKey;
  name: string;
  description: string;
  image: string;
  features: string[];
  base: number; // base sedan price
  suvAddon: number; // add for SUV/truck
};

type AddOn = { key: string; name: string; price: number };

const PACKAGES: ServicePkg[] = [
  {
    key: 'express',
    name: 'Express Wash',
    description: 'Hand wash, wheels & tires, towel dry — quick shine in 30 minutes.',
    image: 'https://placehold.co/800x600/0ea5e9/ffffff.jpg?text=Express+Wash',
    features: ['Hand wash & dry','Wheels & tires','Windows exterior'],
    base: 39,
    suvAddon: 10,
  },
  {
    key: 'full',
    name: 'Full Detail',
    description: 'Inside & out reset — shampoo, steam, and protective sealant.',
    image: 'https://placehold.co/800x600/0284c7/ffffff.jpg?text=Full+Detail',
    features: ['Foam bath','Clay & sealant','Vacuum & shampoo','Interior steam'],
    base: 199,
    suvAddon: 30,
  },
  {
    key: 'ceramic',
    name: 'Ceramic Coating',
    description: '2–5 year protection, hydrophobic gloss, easier washes.',
    image: 'https://placehold.co/800x600/0369a1/ffffff.jpg?text=Ceramic+Coating',
    features: ['Paint decon','Machine polish','Pro ceramic layer','Cure inspection'],
    base: 799,
    suvAddon: 100,
  },
  {
    key: 'correction',
    name: 'Paint Correction',
    description: 'Cut swirls and haze with multi‑stage machine polishing.',
    image: 'https://placehold.co/800x600/075985/ffffff.jpg?text=Paint+Correction',
    features: ['Paint assess','Cut & polish','Panel wipe','Sealant included'],
    base: 449,
    suvAddon: 50,
  },
];

const ADDONS: AddOn[] = [
  { key: 'engine', name: 'Engine bay detail', price: 45 },
  { key: 'ozone', name: 'Ozone odor treatment', price: 60 },
  { key: 'headlights', name: 'Headlight restoration', price: 70 },
  { key: 'pet', name: 'Pet hair removal', price: 35 },
  { key: 'fabric', name: 'Fabric protectant', price: 30 },
];

// Gallery pairs (before/after)
const GALLERY: { id: string; title: string; before: string; after: string }[] = [
  { id: 'g1', title: 'Interior Shampoo', before: 'https://placehold.co/1200x800/0f172a/ffffff.jpg?text=Before:+Interior', after: 'https://placehold.co/1200x800/22c55e/ffffff.jpg?text=After:+Interior' },
  { id: 'g2', title: 'Paint Correction', before: 'https://placehold.co/1200x800/0f172a/ffffff.jpg?text=Before:+Swirls', after: 'https://placehold.co/1200x800/0ea5e9/ffffff.jpg?text=After:+Gloss' },
  { id: 'g3', title: 'Headlight Restore', before: 'https://placehold.co/1200x800/0f172a/ffffff.jpg?text=Before:+Cloudy', after: 'https://placehold.co/1200x800/f59e0b/0f172a.jpg?text=After:+Clear' },
];

// =============================
// Helpers
// =============================
const currency = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

function estimate(opts: { pkg: PackageKey; isSUV: boolean; addOns: string[] }) {
  const p = PACKAGES.find(x => x.key === opts.pkg)!;
  let total = p.base + (opts.isSUV ? p.suvAddon : 0);
  for (const a of opts.addOns) {
    const ad = ADDONS.find(x => x.key === a); if (ad) total += ad.price;
  }
  return total;
}

// =============================
// Page Component
// =============================
export default function AutoDetailingTemplatePage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState<PackageKey>('full');

  return (
    <div className="bg-slate-50 text-slate-800">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur shadow-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-slate-900">
            <CarIcon className="w-7 h-7 text-sky-600" />
            RiverCity <span className="text-sky-600">Detail</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#services" className="hover:text-sky-600">Services</a>
            <a href="#gallery" className="hover:text-sky-600">Before/After</a>
            <a href="#booking" className="hover:text-sky-600">Book</a>
            <a href="#contact" className="hover:text-sky-600">Contact</a>
          </nav>
          <div className="hidden md:flex items-center gap-3">
            <a href="#booking" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white font-semibold hover:bg-black"><CalendarIcon className="w-5 h-5"/> Book Now</a>
          </div>
          <button className="md:hidden" onClick={() => setMobileOpen(v => !v)} aria-label="Menu">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
        </div>
        {mobileOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white">
            <div className="px-6 py-3 flex flex-col gap-3 text-sm">
              <a href="#services" className="py-2">Services</a>
              <a href="#gallery" className="py-2">Before/After</a>
              <a href="#booking" className="py-2">Book</a>
              <a href="#contact" className="py-2">Contact</a>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center opacity-10"/>
          <video autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover z-0">
            <source src="/img/4822922-hd_1920_1080_30fps.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="container mx-auto px-6 py-16 md:py-24 relative">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900">
                Professional detailing for <span className="text-sky-600">daily drivers</span>
              </h1>
              <p className="mt-4 text-lg text-slate-200">Hand washes, full interior resets, paint correction, and ceramic coatings — done right in Richmond.</p>
            </div>

            <div className="mt-8 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 md:p-6 flex flex-col sm:flex-row gap-3">
              <a href="#booking" className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-sky-600 text-white font-semibold hover:bg-sky-700"><CalendarIcon className="w-5 h-5 mr-2"/> Get an Estimate</a>
              <a href="tel:8045554300" className="inline-flex items-center justify-center px-5 py-3 rounded-xl border border-slate-300 hover:border-sky-500"><PhoneIcon className="w-5 h-5 mr-2"/> (804) 555‑4300</a>
            </div>
          </div>
        </section>

        {/* Trust bar */}
        <section className="bg-white border-y border-slate-200">
          <div className="container mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-2xl font-extrabold text-slate-900">4.9★</p>
              <p className="text-sm text-slate-600">Customer rating</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-900">Paint‑Safe</p>
              <p className="text-sm text-slate-600">2‑bucket, microfiber</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-900">Insured</p>
              <p className="text-sm text-slate-600">Shop & techs covered</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-900">Same‑Day</p>
              <p className="text-sm text-slate-600">When available</p>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="py-16 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">Detailing Services</h2>
              <p className="text-slate-600">Pick a package — add extras as needed.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
              {PACKAGES.map((p) => (
                <article key={p.key} className="group bg-white rounded-2xl shadow ring-1 ring-slate-200 overflow-hidden hover:shadow-lg transition">
                  <Image src={p.image} alt={p.name} width={800} height={600} className="h-44 w-full object-cover" />
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-700">{p.name}</h3>
                    <p className="text-sm text-slate-600 mt-1">{p.description}</p>
                    <ul className="mt-4 space-y-2 text-sm text-slate-700">
                      {p.features.map(f => (<li key={f} className="flex items-start gap-2"><SparklesIcon className="w-4 h-4 text-sky-600 mt-0.5"/>{f}</li>))}
                    </ul>
                    <button onClick={() => setSelectedPkg(p.key)} className="mt-5 w-full px-4 py-2 rounded-xl border border-slate-300 hover:border-sky-500 font-semibold">Select {p.name}</button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Before/After Gallery */}
        <section id="gallery" className="bg-white py-16">
          <div className="container mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">Before & After</h2>
              <p className="text-slate-600">Drag the slider to compare results.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {GALLERY.map(g => (
                <BeforeAfter key={g.id} title={g.title} before={g.before} after={g.after} />
              ))}
            </div>
          </div>
        </section>

        {/* Booking */}
        <BookingSection selectedPkg={selectedPkg} />

        {/* Reviews */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">What drivers say</h2>
              <p className="text-slate-600">Real feedback from RVA owners.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { q: 'The full detail made my five‑year‑old SUV look new. Incredible attention to the interior.', a: 'Brianna P.' },
                { q: 'Swirls gone after correction + ceramic. Rain just beads off now.', a: 'Tom S.' },
                { q: 'Easy online booking, fair price, and the wheels are spotless.', a: 'Jamal R.' },
              ].map((t, i) => (
                <div key={i} className="bg-slate-50 p-6 rounded-2xl shadow ring-1 ring-slate-200">
                  <div className="flex mb-3">{Array.from({length:5}).map((_,i)=>(<StarIcon key={i} className="w-5 h-5 text-amber-400"/>))}</div>
                  <p className="text-slate-700 italic">“{t.q}”</p>
                  <p className="mt-3 text-sm font-semibold text-slate-900">{t.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact / Map */}
        <section id="contact" className="py-16 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow">
                <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2"><MapPinIcon className="w-5 h-5 text-sky-600"/> Richmond Shop</h3>
                <p className="text-sm text-slate-600 mt-1">1450 Detail Dr, Richmond, VA</p>
                <ul className="mt-4 text-sm text-slate-700 space-y-1">
                  <li>Mon–Sat: 8 AM – 6 PM</li>
                  <li>Sun: By appointment</li>
                </ul>
                <div className="mt-4 flex items-center gap-3 text-sm">
                  <a href="tel:8045554300" className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-300 hover:border-sky-500"><PhoneIcon className="w-4 h-4"/>(804) 555‑4300</a>
                  <a href="mailto:hello@rivercitydetail.com" className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-300 hover:border-sky-500"><MailIcon className="w-4 h-4"/> Email</a>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden shadow ring-1 ring-slate-200">
                <iframe
                  src={`https://www.google.com/maps?q=${encodeURIComponent('1450 Detail Dr, Richmond, VA')}&output=embed`}
                  className="w-full h-[380px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">RiverCity Detail</h3>
              <p className="text-sm">Hand wash, interior reset, correction, and ceramic in RVA.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#services" className="hover:text-white">Express Wash</a></li>
                <li><a href="#services" className="hover:text-white">Full Detail</a></li>
                <li><a href="#services" className="hover:text-white">Paint Correction</a></li>
                <li><a href="#services" className="hover:text-white">Ceramic Coating</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li>Richmond, VA</li>
                <li>(804) 555‑4300</li>
                <li>hello@rivercitydetail.com</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Hours</h4>
              <ul className="space-y-2 text-sm">
                <li>Mon–Sat: 8 AM – 6 PM</li>
                <li>Sun: By appointment</li>
              </ul>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-slate-700 text-center text-sm">© {new Date().getFullYear()} RiverCity Detail. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}

// =============================
// Before/After component (range slider reveal)
// =============================
function BeforeAfter({ title, before, after }: { title: string; before: string; after: string }) {
  const [v, setV] = useState(50); // percentage reveal
  return (
    <article className="rounded-2xl overflow-hidden shadow ring-1 ring-slate-200 bg-white">
      <div className="relative aspect-[3/2]">
        <Image src={before} alt={`${title} before`} fill className="object-cover" />
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${v}%` }}>
          <Image src={after} alt={`${title} after`} fill className="object-cover" />
        </div>
        <div className="absolute inset-0 flex items-center">
          <div className="relative w-full">
            <input aria-label={`Reveal slider for ${title}`} type="range" min={0} max={100} value={v} onChange={(e) => setV(Number(e.target.value))} className="absolute left-0 right-0 w-full opacity-0 h-1 cursor-col-resize" />
            <div className="absolute left-0" style={{ left: `${v}%`, transform: 'translateX(-50%)' }}>
              <div className="h-[calc(100%+2rem)] w-0.5 bg-white/80 shadow" />
              <div className="-mt-8 flex items-center gap-2 bg-white rounded-full px-3 py-1 shadow border border-slate-200">
                <CameraIcon className="w-4 h-4" />
                <span className="text-xs font-medium text-slate-700">Slide</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 flex items-center justify-between">
        <h3 className="font-semibold text-slate-900">{title}</h3>
        <div className="text-xs text-slate-500 flex items-center gap-2"><span className="inline-block px-2 py-1 rounded bg-slate-100">Before</span><span className="inline-block px-2 py-1 rounded bg-sky-100">After</span></div>
      </div>
    </article>
  );
}

// =============================
// Booking (estimate + form)
// =============================
function BookingSection({ selectedPkg }: { selectedPkg: PackageKey }) {
  const [pkg, setPkg] = useState<PackageKey>(selectedPkg);
  const [isSUV, setIsSUV] = useState(false);
  const [addOns, setAddOns] = useState<string[]>([]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [plate, setPlate] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('');

  React.useEffect(() => setPkg(selectedPkg), [selectedPkg]);

  const total = useMemo(() => estimate({ pkg, isSUV, addOns }), [pkg, isSUV, addOns]);

  const toggleAddOn = (k: string) => setAddOns(prev => prev.includes(k) ? prev.filter(x => x !== k) : [...prev, k]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Submitting…');
    setTimeout(() => {
      setStatus('Request received! We\'ll confirm by email.');
      setName(''); setEmail(''); setPhone(''); setVehicle(''); setPlate(''); setDate(''); setTime(''); setNotes('');
    }, 900);
  };

  const p = PACKAGES.find(x => x.key === pkg)!;

  return (
    <section id="booking" className="py-16 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Estimator */}
          <div className="lg:col-span-1 bg-sky-50 rounded-2xl border border-sky-200 p-6 shadow">
            <h3 className="text-xl font-extrabold text-sky-900">Instant estimate</h3>
            <p className="text-sm text-sky-800/80 mt-1">Transparent pricing before you book.</p>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <label className="col-span-2">
                <span className="text-sky-900 font-semibold">Package</span>
                <select value={pkg} onChange={e => setPkg(e.target.value as PackageKey)} className="mt-1 w-full p-3 rounded-xl border border-sky-300 focus:ring-2 focus:ring-sky-500 bg-white">
                  {PACKAGES.map(s => (<option key={s.key} value={s.key}>{s.name}</option>))}
                </select>
              </label>
              <label className="col-span-2">
                <span className="text-sky-900 font-semibold">Vehicle size</span>
                <div className="mt-2 flex items-center gap-3">
                  <label className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${!isSUV ? 'border-sky-500 bg-white' : 'border-sky-200'}`}>
                    <input type="radio" name="size" checked={!isSUV} onChange={() => setIsSUV(false)} /> Sedan
                  </label>
                  <label className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${isSUV ? 'border-sky-500 bg-white' : 'border-sky-200'}`}>
                    <input type="radio" name="size" checked={isSUV} onChange={() => setIsSUV(true)} /> SUV / Truck
                  </label>
                </div>
              </label>
            </div>

            <div className="mt-4">
              <p className="text-sky-900 font-semibold mb-2">Add‑ons</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {ADDONS.map(a => (
                  <label key={a.key} className={`flex items-center gap-2 p-2 rounded-xl border ${addOns.includes(a.key) ? 'border-sky-500 bg-white' : 'border-sky-200 hover:border-sky-400'} cursor-pointer`}>
                    <input type="checkbox" checked={addOns.includes(a.key)} onChange={() => toggleAddOn(a.key)} />
                    <span className="flex-1">{a.name}</span>
                    <span className="font-semibold">+{currency(a.price)}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-white p-4 border border-sky-200">
              <div className="flex items-center justify-between">
                <span className="text-sm text-sky-800">Package</span>
                <span className="font-semibold text-sky-900">{p.name} {isSUV ? '(SUV/Truck)' : '(Sedan)'}</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-sky-800">Estimated total</span>
                <span className="text-xl font-extrabold text-sky-700">{currency(total)}</span>
              </div>
              <p className="mt-2 text-xs text-sky-800/80">Final price may vary based on condition. We&apos;ll confirm before work begins.</p>
            </div>
          </div>

          {/* Booking form */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow">
            <h3 className="text-xl font-extrabold text-slate-900">Book your appointment</h3>
            <p className="text-sm text-slate-600">We&apos;ll confirm your date/time and send details.</p>
            <form onSubmit={submit} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <input className="p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} required />
              <input className="p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500" placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
              <input className="p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} required />
              <input className="p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500" placeholder="Vehicle (Year Make Model)" value={vehicle} onChange={e => setVehicle(e.target.value)} required />
              <input className="p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500" placeholder="License plate (optional)" value={plate} onChange={e => setPlate(e.target.value)} />

              <select className="p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500" value={pkg} onChange={e => setPkg(e.target.value as PackageKey)}>
                {PACKAGES.map(s => (<option key={s.key} value={s.key}>{s.name}</option>))}
              </select>

              <div className="grid grid-cols-2 gap-3">
                <input type="date" className="p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500" value={date} onChange={e => setDate(e.target.value)} required />
                <select className="p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500" value={time} onChange={e => setTime(e.target.value)} required>
                  <option value="">Time window</option>
                  <option>Morning (8–11)</option>
                  <option>Midday (11–2)</option>
                  <option>Afternoon (2–5)</option>
                </select>
              </div>

              <textarea className="md:col-span-2 p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500" rows={4} placeholder="Notes (swirls, pet hair, stains, etc.)" value={notes} onChange={e => setNotes(e.target.value)} />

              <div className="md:col-span-2 flex items-center justify-between">
                <button type="submit" className="px-6 py-3 rounded-xl bg-sky-600 text-white font-semibold hover:bg-sky-700">Request Booking</button>
                {status && <p className="text-sm text-sky-600 font-semibold">{status}</p>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
