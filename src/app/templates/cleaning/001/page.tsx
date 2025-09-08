'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';

// =============================
// Icon helpers (Lucide‑style SVG)
// =============================
const SparklesIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8 8 6l2 2-2 2-2-2Z"/><path d="M12 2l1.5 3 3 1.5-3 1.5L12 12l-1.5-3L7.5 6.5l3-1.5L12 2Z"/><path d="M18 16l2 2-2 2-2-2 2-2Z"/></svg>
);
const ClockIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
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
const StarIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2"><path d="M12 2 15.09 8.26 22 9.27 17 14.14l1.18 6.88L12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2Z"/></svg>
);
const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m20 6-11 11-5-5"/></svg>
);

// =============================
// Types & Mock Data
// =============================

type ServiceKey = 'standard' | 'deep' | 'move' | 'post';

type Service = {
  key: ServiceKey;
  name: string;
  description: string;
  image: string;
  features: string[];
  base: number; // base price
  perBed: number; // per bedroom
  perBath: number; // per bathroom
};

type AddOn = {
  key: string;
  name: string;
  price: number;
};

const SERVICES: Service[] = [
  {
    key: 'standard',
    name: 'Standard Clean',
    description: 'Essential upkeep for tidy homes. Surfaces, floors, bathrooms, kitchen, and common areas.',
    image: 'https://placehold.co/800x600/22c55e/ffffff.jpg?text=Standard+Clean',
    features: ['Dusting & surfaces','Kitchen wipe‑down','Bathrooms cleaned','Floors vacuumed & mopped'],
    base: 89,
    perBed: 12,
    perBath: 18,
  },
  {
    key: 'deep',
    name: 'Deep Clean',
    description: 'Detailed top‑to‑bottom refresh. Baseboards, backsplash, and high‑touch areas.',
    image: 'https://placehold.co/800x600/10b981/ffffff.jpg?text=Deep+Clean',
    features: ['All Standard tasks','Baseboards & trim','Cabinet exteriors','Tile & grout focus'],
    base: 149,
    perBed: 16,
    perBath: 24,
  },
  {
    key: 'move',
    name: 'Move‑In / Move‑Out',
    description: 'Make moving day easy with an empty‑home scrub including inside appliances.',
    image: 'https://placehold.co/800x600/059669/ffffff.jpg?text=Move+In%2FOut',
    features: ['Inside fridge & oven','Cabinets in/out','Windows interior','Closets & baseboards'],
    base: 219,
    perBed: 22,
    perBath: 28,
  },
  {
    key: 'post',
    name: 'Post‑Construction',
    description: 'Fine dust removal with HEPA tools. Multi‑pass detail for a photo‑ready finish.',
    image: 'https://placehold.co/800x600/047857/ffffff.jpg?text=Post+Construction',
    features: ['HEPA vacuuming','Detail dusting','Glass & fixtures','Debris removal'],
    base: 269,
    perBed: 24,
    perBath: 32,
  },
];

const ADDONS: AddOn[] = [
  { key: 'fridge', name: 'Inside fridge', price: 25 },
  { key: 'oven', name: 'Inside oven', price: 25 },
  { key: 'windows', name: 'Interior windows', price: 35 },
  { key: 'laundry', name: 'Laundry fold (1 load)', price: 15 },
  { key: 'pets', name: 'Pet hair treatment', price: 20 },
];

const FREQUENCY: { label: string; value: 'once'|'weekly'|'biweekly'|'monthly'; discount: number }[] = [
  { label: 'One‑time', value: 'once', discount: 0 },
  { label: 'Weekly (‑20%)', value: 'weekly', discount: 0.20 },
  { label: 'Bi‑weekly (‑15%)', value: 'biweekly', discount: 0.15 },
  { label: 'Monthly (‑10%)', value: 'monthly', discount: 0.10 },
];

// =============================
// Helpers
// =============================
const currency = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

function estimateTotal(opts: {
  serviceKey: ServiceKey;
  beds: number;
  baths: number;
  addOns: string[];
  frequency: 'once'|'weekly'|'biweekly'|'monthly';
}) {
  const svc = SERVICES.find(s => s.key === opts.serviceKey)!;
  let total = svc.base + svc.perBed * opts.beds + svc.perBath * opts.baths;
  for (const a of opts.addOns) {
    const add = ADDONS.find(x => x.key === a);
    if (add) total += add.price;
  }
  const freq = FREQUENCY.find(f => f.value === opts.frequency)!;
  const discounted = Math.max(59, Math.round(total * (1 - freq.discount))); // never below a floor
  return { base: total, discounted };
}

// =============================
// Page
// =============================
export default function CleaningServicesTemplatePage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceKey>('standard');

  return (
    <div className="bg-slate-50 text-slate-800">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur shadow-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-slate-900">
            <SparklesIcon className="w-7 h-7 text-emerald-600" />
            RiverCity <span className="text-emerald-600">Clean</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#services" className="hover:text-emerald-600">Services</a>
            <a href="#pricing" className="hover:text-emerald-600">Pricing</a>
            <a href="#booking" className="hover:text-emerald-600">Book</a>
            <a href="#faq" className="hover:text-emerald-600">FAQ</a>
          </nav>
          <div className="hidden md:flex items-center gap-3">
            <a href="#booking" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white font-semibold hover:bg-black"><ClockIcon className="w-5 h-5"/> Book Now</a>
          </div>
          <button className="md:hidden" onClick={() => setMobileOpen(v => !v)} aria-label="Menu">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
        </div>
        {mobileOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white">
            <div className="px-6 py-3 flex flex-col gap-3 text-sm">
              <a href="#services" className="py-2">Services</a>
              <a href="#pricing" className="py-2">Pricing</a>
              <a href="#booking" className="py-2">Book</a>
              <a href="#faq" className="py-2">FAQ</a>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0  bg-cover bg-center opacity-10"/>
          <video autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover z-0">
            <source src="/img/4145662-hd_1920_1080_25fps.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="container mx-auto px-6 py-16 md:py-24 relative">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-200">
                Sparkling homes, <span className="text-emerald-600">zero hassle</span>
              </h1>
              <p className="mt-4 text-lg text-slate-200">Flat‑rate pricing, eco‑friendly supplies, and vetted pros. Book in under a minute.</p>
            </div>

            {/* Quick CTA bar */}
            <div className="mt-8 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 md:p-6 flex flex-col sm:flex-row gap-3">
              <a href="#booking" className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700"><ClockIcon className="w-5 h-5 mr-2"/> Check Availability</a>
              <a href="tel:8045554200" className="inline-flex items-center justify-center px-5 py-3 rounded-xl border border-slate-300 hover:border-emerald-500"><PhoneIcon className="w-5 h-5 mr-2"/> (804) 555‑4200</a>
            </div>
          </div>
        </section>

        {/* Trust bar */}
        <section className="bg-white border-y border-slate-200">
          <div className="container mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-2xl font-extrabold text-slate-900">Insured</p>
              <p className="text-sm text-slate-600">Bonded & background‑checked</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-900">Eco</p>
              <p className="text-sm text-slate-600">Green supplies on request</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-900">4.9★</p>
              <p className="text-sm text-slate-600">Customer rating</p>
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
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">Cleaning services</h2>
              <p className="text-slate-600">Choose the right level for today — upgrade anytime.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
              {SERVICES.map((s) => (
                <article key={s.key} className="group bg-white rounded-2xl shadow ring-1 ring-slate-200 overflow-hidden hover:shadow-lg transition">
                  <Image src={s.image} alt={s.name} width={800} height={600} className="h-44 w-full object-cover" />
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700">{s.name}</h3>
                    <p className="text-sm text-slate-600 mt-1">{s.description}</p>
                    <ul className="mt-4 space-y-2 text-sm text-slate-700">
                      {s.features.map(f => (
                        <li key={f} className="flex items-start gap-2"><CheckIcon className="w-4 h-4 text-emerald-600 mt-0.5"/>{f}</li>
                      ))}
                    </ul>
                    <button onClick={() => setSelectedService(s.key)} className="mt-5 w-full px-4 py-2 rounded-xl border border-slate-300 hover:border-emerald-500 font-semibold">Select {s.name}</button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <PricingSection selectedService={selectedService} onSelect={setSelectedService} />

        {/* Booking */}
        <BookingSection selectedService={selectedService} />

        {/* Reviews */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">What customers say</h2>
              <p className="text-slate-600">Real feedback from RVA homeowners and renters.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { q: 'They did a deep clean before listing our home — it looked brand new.', a: 'Kara B.' },
                { q: 'Prompt, polite, and the estimate matched the final price. Will use again!', a: 'Manny R.' },
                { q: 'Pet hair was gone, bathrooms spotless, and the kitchen shines.', a: 'Leah S.' },
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

        {/* FAQ */}
        <FAQSection />

        {/* Coverage / Contact */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow">
                <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2"><MapPinIcon className="w-5 h-5 text-emerald-600"/> Service Area</h3>
                <p className="text-sm text-slate-600 mt-1">Richmond, Henrico, Chesterfield, Midlothian, Short Pump.</p>
                <div className="rounded-xl overflow-hidden mt-4 ring-1 ring-slate-200">
                  <iframe
                    src={`https://www.google.com/maps?q=${encodeURIComponent('Richmond, VA')}&output=embed`}
                    className="w-full h-[300px]"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow">
                <h3 className="text-xl font-extrabold text-slate-900">Questions?</h3>
                <p className="text-sm text-slate-600 mt-1">We respond quickly during business hours.</p>
                <div className="mt-4 flex items-center gap-3 text-sm">
                  <a href="tel:8045554200" className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-300 hover:border-emerald-500"><PhoneIcon className="w-4 h-4"/>(804) 555‑4200</a>
                  <a href="mailto:hello@rivercityclean.com" className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-300 hover:border-emerald-500"><MailIcon className="w-4 h-4"/> Email</a>
                </div>
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
              <h3 className="text-xl font-bold text-white mb-2">RiverCity Clean</h3>
              <p className="text-sm">Professional, eco‑friendly home cleaning across Greater Richmond.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#services" className="hover:text-white">Standard</a></li>
                <li><a href="#services" className="hover:text-white">Deep Clean</a></li>
                <li><a href="#services" className="hover:text-white">Move‑In/Out</a></li>
                <li><a href="#services" className="hover:text-white">Post‑Construction</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Office</h4>
              <ul className="space-y-2 text-sm">
                <li>Richmond, VA</li>
                <li>(804) 555‑4200</li>
                <li>hello@rivercityclean.com</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Hours</h4>
              <ul className="space-y-2 text-sm">
                <li>Mon–Fri: 7 AM – 7 PM</li>
                <li>Sat: 8 AM – 4 PM</li>
                <li>Sun: Closed</li>
              </ul>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-slate-700 text-center text-sm">© {new Date().getFullYear()} RiverCity Clean. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}

// =============================
// Pricing Section (interactive)
// =============================
function PricingSection({ selectedService, onSelect }: { selectedService: ServiceKey; onSelect: (k: ServiceKey) => void; }) {
  const cards = [
    { key: 'standard' as ServiceKey, blurb: 'Great for upkeep', color: 'from-emerald-500 to-emerald-600' },
    { key: 'deep' as ServiceKey, blurb: 'Best first visit', color: 'from-teal-500 to-teal-600' },
    { key: 'move' as ServiceKey, blurb: 'Empty homes', color: 'from-cyan-500 to-cyan-600' },
    { key: 'post' as ServiceKey, blurb: 'After renovations', color: 'from-green-600 to-emerald-700' },
  ];

  return (
    <section id="pricing" className="bg-white py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">Simple pricing</h2>
          <p className="text-slate-600">Flat base + bedrooms & bathrooms. Add extras as needed.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {cards.map((c) => {
            const svc = SERVICES.find(s => s.key === c.key)!;
            const isSel = selectedService === c.key;
            return (
              <div key={c.key} className={`rounded-2xl border ${isSel ? 'border-emerald-600 ring-2 ring-emerald-600' : 'border-slate-200'} bg-gradient-to-b ${c.color} text-white shadow-lg overflow-hidden`}>
                <div className="p-6">
                  <h3 className="text-xl font-extrabold">{svc.name}</h3>
                  <p className="text-emerald-50/90 mt-1">{c.blurb}</p>
                  <p className="mt-4 text-3xl font-extrabold">{currency(svc.base)}</p>
                  <p className="text-emerald-50/90 text-sm">+ per room</p>
                  <ul className="mt-4 space-y-2 text-sm">
                    {svc.features.slice(0,3).map(f => (<li key={f} className="flex items-start gap-2"><CheckIcon className="w-4 h-4"/>{f}</li>))}
                  </ul>
                  <button onClick={() => onSelect(c.key)} className={`mt-6 w-full px-4 py-2 rounded-xl font-semibold ${isSel ? 'bg-white text-emerald-700' : 'bg-white/20 hover:bg-white/30'} `}>
                    {isSel ? 'Selected' : 'Choose plan'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// =============================
// Booking Section (calculator + form)
// =============================
function BookingSection({ selectedService }: { selectedService: ServiceKey }) {
  const [serviceKey, setServiceKey] = useState<ServiceKey>(selectedService);
  const [beds, setBeds] = useState(2);
  const [baths, setBaths] = useState(1);
  const [frequency, setFrequency] = useState<'once'|'weekly'|'biweekly'|'monthly'>('once');
  const [addOns, setAddOns] = useState<string[]>([]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [zip, setZip] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('');

  React.useEffect(() => setServiceKey(selectedService), [selectedService]);

  const { base, discounted } = useMemo(() => estimateTotal({ serviceKey, beds, baths, addOns, frequency }), [serviceKey, beds, baths, addOns, frequency]);

  const toggleAddOn = (k: string) => {
    setAddOns(prev => prev.includes(k) ? prev.filter(x => x !== k) : [...prev, k]);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Booking…');
    setTimeout(() => {
      setStatus('Booked! Check your email for confirmation.');
      setName(''); setEmail(''); setPhone(''); setAddress(''); setZip(''); setDate(''); setTime(''); setNotes('');
    }, 900);
  };

//  const svc = SERVICES.find(s => s.key === serviceKey)!;

  return (
    <section id="booking" className="py-16 bg-white">       
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Calculator */}
          <div className="lg:col-span-1 bg-emerald-50 rounded-2xl border border-emerald-200 p-6 shadow">
            <h3 className="text-xl font-extrabold text-emerald-900">Instant estimate</h3>
            <p className="text-sm text-emerald-800/80 mt-1">Transparent pricing before you book.</p>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <label className="col-span-2">
                <span className="text-emerald-900 font-semibold">Service</span>
                <select value={serviceKey} onChange={e => setServiceKey(e.target.value as ServiceKey)} className="mt-1 w-full p-3 rounded-xl border border-emerald-300 focus:ring-2 focus:ring-emerald-500 bg-white">
                  {SERVICES.map(s => (<option key={s.key} value={s.key}>{s.name}</option>))}
                </select>
              </label>
              <label>
                <span className="text-emerald-900 font-semibold">Bedrooms</span>
                <input type="number" min={0} value={beds} onChange={e => setBeds(Number(e.target.value))} className="mt-1 w-full p-3 rounded-xl border border-emerald-300 focus:ring-2 focus:ring-emerald-500" />
              </label>
              <label>
                <span className="text-emerald-900 font-semibold">Bathrooms</span>
                <input type="number" min={0} value={baths} onChange={e => setBaths(Number(e.target.value))} className="mt-1 w-full p-3 rounded-xl border border-emerald-300 focus:ring-2 focus:ring-emerald-500" />
              </label>
              <label className="col-span-2">
                <span className="text-emerald-900 font-semibold">Frequency</span>
                <select value={frequency} onChange={e => setFrequency(e.target.value as typeof FREQUENCY[number]['value'])} className="mt-1 w-full p-3 rounded-xl border border-emerald-300 focus:ring-2 focus:ring-emerald-500 bg-white">
                  {FREQUENCY.map(f => (<option key={f.value} value={f.value}>{f.label}</option>))}
                </select>
              </label>
            </div>

            <div className="mt-4">
              <p className="text-emerald-900 font-semibold mb-2">Add‑ons</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {ADDONS.map(a => (
                  <label key={a.key} className={`flex items-center gap-2 p-2 rounded-xl border ${addOns.includes(a.key) ? 'border-emerald-500 bg-white' : 'border-emerald-200 hover:border-emerald-400'} cursor-pointer`}>
                    <input type="checkbox" checked={addOns.includes(a.key)} onChange={() => toggleAddOn(a.key)} />
                    <span className="flex-1">{a.name}</span>
                    <span className="font-semibold">+{currency(a.price)}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-white p-4 border border-emerald-200">
              <div className="flex items-center justify-between">
                <span className="text-sm text-emerald-800">Subtotal</span>
                <span className="font-semibold text-emerald-900">{currency(base)}</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-emerald-800">Frequency discount</span>
                <span className="font-semibold text-emerald-900">{currency(base - discounted)}</span>
              </div>
              <div className="flex items-center justify-between mt-3 text-lg">
                <span className="font-extrabold text-emerald-900">Estimated total</span>
                <span className="font-extrabold text-emerald-700">{currency(discounted)}</span>
              </div>
              <p className="mt-2 text-xs text-emerald-800/80">Final price may vary with home condition. No surprise fees.</p>
            </div>
          </div>

          {/* Booking form */}
          <div className="lg:col-span-2 bg-slate-50 rounded-2xl border border-slate-200 p-6 md:p-8 shadow">
            <h3 className="text-xl font-extrabold text-slate-900">Book your cleaning</h3>
            <p className="text-sm text-slate-600">We&apos;ll confirm your appointment by email or SMS.</p>
            <form onSubmit={submit} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <input className="p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} required />
              <input className="p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500" placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
              <input className="p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} required />
              <input className="p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500" placeholder="Street address" value={address} onChange={e => setAddress(e.target.value)} required />
              <input className="p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500" placeholder="ZIP code" value={zip} onChange={e => setZip(e.target.value)} required />

              <select className="p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500" value={serviceKey} onChange={e => setServiceKey(e.target.value as ServiceKey)}>
                {SERVICES.map(s => (<option key={s.key} value={s.key}>{s.name}</option>))}
              </select>
              <select className="p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500" value={frequency} onChange={e => setFrequency(e.target.value as 'once'|'weekly'|'biweekly'|'monthly')}>
                {FREQUENCY.map(f => (<option key={f.value} value={f.value}>{f.label}</option>))}
              </select>

              <div className="grid grid-cols-2 gap-3">
                <input type="date" className="p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500" value={date} onChange={e => setDate(e.target.value)} required />
                <select className="p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500" value={time} onChange={e => setTime(e.target.value)} required>
                  <option value="">Time window</option>
                  <option>Morning (8–11)</option>
                  <option>Midday (11–2)</option>
                  <option>Afternoon (2–5)</option>
                  <option>Evening (5–7)</option>
                </select>
              </div>

              <textarea className="md:col-span-2 p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500" rows={4} placeholder="Notes (gate code, pets, parking, etc.)" value={notes} onChange={e => setNotes(e.target.value)} />

              <div className="md:col-span-2 flex items-center justify-between">
                <button type="submit" className="px-6 py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-black">Confirm Booking</button>
                {status && <p className="text-sm text-emerald-600 font-semibold">{status}</p>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// =============================
// FAQ Section
// =============================
function FAQSection() {
  const [open, setOpen] = useState<string | null>('f1');
  const items = [
    { id: 'f1', q: 'Do I need to be home during the cleaning?', a: 'Nope! Most clients provide a door code or key. We are insured and background‑checked.' },
    { id: 'f2', q: 'What\'s included in a Standard vs. Deep clean?', a: 'Deep includes everything in Standard plus detail dusting, baseboards, cabinet exteriors, and tougher grime removal.' },
    { id: 'f3', q: 'Can I cancel or reschedule?', a: 'Yes — please give 24 hours notice to avoid a late change fee.' },
    { id: 'f4', q: 'Do you bring supplies?', a: 'Yes, we bring all supplies and HEPA vacuums. Eco‑friendly options on request.' },
  ];

  return (
    <section id="faq" className="bg-white py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">FAQ</h2>
          <p className="text-slate-600">Everything you wanted to know.</p>
        </div>
        <div className="max-w-3xl mx-auto divide-y divide-slate-200 rounded-2xl border border-slate-200 overflow-hidden">
          {items.map(it => (
            <button key={it.id} onClick={() => setOpen(open === it.id ? null : it.id)} className="w-full text-left p-5 bg-white hover:bg-slate-50">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-slate-900">{it.q}</p>
                <span className="text-slate-500">{open === it.id ? '–' : '+'}</span>
              </div>
              {open === it.id && (
                <p className="mt-2 text-sm text-slate-700">{it.a}</p>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
