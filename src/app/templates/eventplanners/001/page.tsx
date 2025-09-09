'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// =====================================================
// Icons (thin-line, minimal)
// =====================================================
const CameraIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19V8a2 2 0 0 0-2-2h-3l-2-3H8L6 6H3a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2Z"/><circle cx="12" cy="13" r="4"/></svg>
);
const CalendarIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
);
const StarIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2"><path d="M12 2 15.09 8.26 22 9.27 17 14.14l1.18 6.88L12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2Z"/></svg>
);
const QuoteIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 11h5V5H5a4 4 0 0 0-4 4v6h6v-4H5Z"/><path d="M19 11h5V5h-5a4 4 0 0 0-4 4v6h6v-4h-2Z"/></svg>
);
const PhoneIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M2.5 5.5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 1.7l.3 1.8a2 2 0 0 1-.5 1.7l-1.1 1.1a14 14 0 0 0 6 6l1.1-1.1a2 2 0 0 1 1.7-.5l1.8.3a2 2 0 0 1 1.7 2v2a2 2 0 0 1-2 2h-.5A18.5 18.5 0 0 1 2.5 6v-.5Z"/></svg>
);
const MailIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="m3 6 9 7 9-7"/></svg>
);

// =====================================================
// Types & Mock Data
// =====================================================

type Category = 'weddings'|'corporate'|'portraits'|'lifestyle';

type Shot = { id: string; title: string; src: string; w: number; h: number; category: Category };

type Testimonial = { q: string; a: string };

const SHOTS: Shot[] = [
  { id:'s1', title:'Golden hour vows', src:'https://placehold.co/1200x1600/a21caf/ffffff.jpg?text=Wedding+1', w:1200, h:1600, category:'weddings' },
  { id:'s2', title:'Minimal studio set', src:'https://placehold.co/1600x1200/7e22ce/ffffff.jpg?text=Portrait+1', w:1600, h:1200, category:'portraits' },
  { id:'s3', title:'Modern gala', src:'https://placehold.co/1600x1200/6d28d9/ffffff.jpg?text=Corporate+1', w:1600, h:1200, category:'corporate' },
  { id:'s4', title:'Rain‑kissed bouquet', src:'https://placehold.co/1200x1600/4c1d95/ffffff.jpg?text=Wedding+2', w:1200, h:1600, category:'weddings' },
  { id:'s5', title:'Brand launch', src:'https://placehold.co/1600x1000/3b0764/ffffff.jpg?text=Corporate+2', w:1600, h:1000, category:'corporate' },
  { id:'s6', title:'Candid downtown', src:'https://placehold.co/1200x1600/581c87/ffffff.jpg?text=Lifestyle+1', w:1200, h:1600, category:'lifestyle' },
  { id:'s7', title:'Studio black‑on‑black', src:'https://placehold.co/1600x1200/5b21b6/ffffff.jpg?text=Portrait+2', w:1600, h:1200, category:'portraits' },
  { id:'s8', title:'First dance', src:'https://placehold.co/1600x1000/7c3aed/ffffff.jpg?text=Wedding+3', w:1600, h:1000, category:'weddings' },
  { id:'s9', title:'Creative team', src:'https://placehold.co/1200x1600/6d28d9/ffffff.jpg?text=Corporate+3', w:1200, h:1600, category:'corporate' },
  { id:'s10', title:'Sunlit brunch', src:'https://placehold.co/1600x1200/a21caf/ffffff.jpg?text=Lifestyle+2', w:1600, h:1200, category:'lifestyle' },
];

const TESTIMONIALS: Testimonial[] = [
  { q: 'They captured the mood of our wedding perfectly — cinematic and intimate.', a: 'Sienna & Mark' },
  { q: 'Our brand launch felt like an art show. Every detail was cohesive.', a: 'Lumen Studio' },
  { q: 'Booking was easy and the preview gallery blew us away.', a: 'Jordan P.' },
];

const PACKAGES = [
  { key:'day', name:'Full‑Day Coverage', price: 3200, includes: ['8 hours','2 shooters','Online gallery','48‑hour preview'] },
  { key:'half', name:'Half‑Day', price: 1900, includes: ['4 hours','Lead shooter','Online gallery','Week‑of delivery'] },
  { key:'brand', name:'Brand Story', price: 2400, includes: ['Creative brief','Studio + location','Retouched selects','Usage rights'] },
];

// =====================================================
// Page
// =====================================================
export default function EventPhotoArtTemplatePage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState<Category | 'all'>('all');

  const filtered = useMemo(() => active==='all' ? SHOTS : SHOTS.filter(s=>s.category===active), [active]);

  return (
    <div className="bg-gradient-to-b from-fuchsia-50 via-violet-50 to-indigo-50 text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b border-violet-100">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 text-2xl font-black tracking-tight">
            <CameraIcon className="w-7 h-7 text-fuchsia-600"/>
            RiverCity <span className="text-fuchsia-600">Creative</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#portfolio" className="hover:text-fuchsia-700">Portfolio</a>
            <a href="#packages" className="hover:text-fuchsia-700">Packages</a>
            <a href="#booking" className="hover:text-fuchsia-700">Booking</a>
            <a href="#testimonials" className="hover:text-fuchsia-700">Kind Words</a>
          </nav>
          <a href="#booking" className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-900 text-white font-semibold hover:bg-black"><CalendarIcon className="w-5 h-5"/> Check Dates</a>
          <button className="md:hidden" onClick={() => setMobileOpen(v=>!v)} aria-label="Menu">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
        </div>
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-violet-100">
            <div className="px-6 py-3 flex flex-col gap-3 text-sm">
              <a href="#portfolio" className="py-2">Portfolio</a>
              <a href="#packages" className="py-2">Packages</a>
              <a href="#booking" className="py-2">Booking</a>
              <a href="#testimonials" className="py-2">Kind Words</a>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* Hero: layered frames + subtle motion */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-24 -left-24 h-72 w-72 bg-fuchsia-300/30 blur-3xl rounded-full"/>
            <div className="absolute -bottom-24 -right-24 h-96 w-96 bg-indigo-300/30 blur-3xl rounded-full"/>
          </div>
          <div className="container mx-auto px-6 py-14 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.05]">
                Artful events & photography for brands and couples
              </h1>
              <p className="mt-4 text-lg text-slate-700 max-w-xl">We design, plan, and capture moments — from intimate weddings to immersive brand launches.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#portfolio" className="px-5 py-3 rounded-2xl bg-fuchsia-600 text-white font-semibold hover:bg-fuchsia-700">See the Work</a>
                <a href="#booking" className="px-5 py-3 rounded-2xl border border-slate-300 hover:border-fuchsia-600">Book a Date</a>
              </div>
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="p-4 rounded-2xl bg-white/70 border border-violet-100">
                  <p className="text-2xl font-extrabold">4.9★</p>
                  <p className="text-xs text-slate-600">Client rating</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/70 border border-violet-100">
                  <p className="text-2xl font-extrabold">10+ yrs</p>
                  <p className="text-xs text-slate-600">Experience</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/70 border border-violet-100">
                  <p className="text-2xl font-extrabold">48 hr</p>
                  <p className="text-xs text-slate-600">Preview gallery</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/70 border border-violet-100">
                  <p className="text-2xl font-extrabold">Insured</p>
                  <p className="text-xs text-slate-600">Event & gear</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <motion.div initial={{ rotate:-3, y:20, opacity:0 }} animate={{ rotate:-3, y:0, opacity:1 }} transition={{ type:'spring', stiffness:60 }} className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-violet-100">
                <Image src="https://placehold.co/1400x1000/7e22ce/ffffff.jpg?text=Hero+Frame+1" alt="Portfolio preview" width={1400} height={1000} className="object-cover" />
              </motion.div>
              <motion.div initial={{ rotate:4, y:40, opacity:0 }} animate={{ rotate:4, y:0, opacity:1 }} transition={{ delay:0.1, type:'spring', stiffness:60 }} className="absolute -bottom-10 -right-6 hidden md:block rounded-3xl overflow-hidden shadow-xl ring-1 ring-violet-100 w-56">
                <Image src="https://placehold.co/800x1000/a21caf/ffffff.jpg?text=Hero+Frame+2" alt="Portfolio preview" width={800} height={1000} className="object-cover" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Portfolio: filterable + masonry + lightbox */}
        <section id="portfolio" className="py-16">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mr-auto">Portfolio</h2>
              <Chip label="All" active={active==='all'} onClick={()=>setActive('all')} />
              {(['weddings','portraits','corporate','lifestyle'] as const).map(c => (
                <Chip key={c} label={c.charAt(0).toUpperCase()+c.slice(1)} active={active===c} onClick={()=>setActive(c)} />
              ))}
            </div>

            <Masonry shots={filtered} />
          </div>
        </section>

        {/* Packages */}
        <section id="packages" className="bg-white/70 border-y border-violet-100 py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-8">Packages</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {PACKAGES.map(p => (
                <div key={p.key} className="rounded-2xl bg-white shadow-xl ring-1 ring-violet-100">
                  <div className="p-6">
                    <p className="text-xs uppercase tracking-wide text-slate-500">Starting at</p>
                    <p className="text-3xl font-black">{currency(p.price)}</p>
                    <h3 className="text-xl font-bold mt-1">{p.name}</h3>
                    <ul className="mt-4 space-y-2 text-sm text-slate-700">
                      {p.includes.map(i => (<li key={i} className="flex items-start gap-2"><StarIcon className="w-4 h-4 text-amber-400"/>{i}</li>))}
                    </ul>
                    <a href="#booking" className="mt-6 inline-block px-4 py-2 rounded-xl bg-fuchsia-600 text-white font-semibold hover:bg-fuchsia-700">Book this</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Booking calendar */}
        <BookingCalendar />

        {/* Testimonials */}
        <section id="testimonials" className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-8">Kind words</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TESTIMONIALS.map((t,i)=> (
                <div key={i} className="p-6 rounded-2xl bg-white/70 border border-violet-100 shadow">
                  <QuoteIcon className="w-6 h-6 text-fuchsia-600"/>
                  <p className="mt-3 text-slate-800 italic">“{t.q}”</p>
                  <p className="mt-2 text-sm font-semibold">{t.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact / Footer CTA */}
        <section className="py-16 bg-gradient-to-br from-fuchsia-600 to-violet-700 text-white">
          <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-black tracking-tight">Let’s make something beautiful together</h3>
              <p className="mt-3 text-fuchsia-100">Prefer to chat first? We’ll walk you through timelines, mood, and logistics.</p>
              <div className="mt-6 flex flex-wrap gap-3 text-sm">
                <a href="tel:8045555200" className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/10 ring-1 ring-white/30 hover:bg-white/20"><PhoneIcon className="w-4 h-4"/> (804) 555‑5200</a>
                <a href="mailto:hello@rivercitycreative.com" className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/10 ring-1 ring-white/30 hover:bg-white/20"><MailIcon className="w-4 h-4"/> Email</a>
              </div>
            </div>
            <div className="rounded-3xl bg-white/10 ring-1 ring-white/30 p-6">
              <form onSubmit={(e)=>{e.preventDefault(); alert('Thanks! We\'ll get back to you shortly.')}} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input className="p-3 rounded-xl bg-white/90 text-slate-900" placeholder="Full name" required />
                <input className="p-3 rounded-xl bg-white/90 text-slate-900" placeholder="Email" type="email" required />
                <input className="md:col-span-2 p-3 rounded-xl bg-white/90 text-slate-900" placeholder="What are you planning?" />
                <button className="md:col-span-2 mt-1 px-5 py-3 rounded-xl bg-white text-slate-900 font-semibold hover:bg-fuchsia-50">Send inquiry</button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white text-slate-600">
        <div className="container mx-auto px-6 py-8 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm">© {new Date().getFullYear()} RiverCity Creative — Event Planning & Photography in Richmond, VA.</p>
          <div className="text-sm">Images are placeholders. Replace with your own or Pexels.</div>
        </div>
      </footer>
    </div>
  );
}

// =====================================================
// Currency helper
// =====================================================
const currency = (n: number) => n.toLocaleString('en-US', { style:'currency', currency:'USD', maximumFractionDigits: 0 });

// =====================================================
// Filter Chip
// =====================================================
function Chip({ label, active, onClick }: { label: string; active?: boolean; onClick: ()=>void }) {
  return (
    <button onClick={onClick} className={`px-3 py-1.5 rounded-full text-sm border ${active? 'border-fuchsia-700 bg-fuchsia-50 text-fuchsia-800':'border-slate-300 hover:border-fuchsia-600'}`}>{label}</button>
  );
}

// =====================================================
// Masonry Grid + Lightbox
// =====================================================
function Masonry({ shots }: { shots: Shot[] }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const onOpen = (i: number) => { setIndex(i); setOpen(true); };
  const onPrev = () => setIndex((i) => (i - 1 + shots.length) % shots.length);
  const onNext = () => setIndex((i) => (i + 1) % shots.length);

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
        {shots.map((s, i) => (
          <figure key={s.id} className="mb-5 break-inside-avoid rounded-2xl overflow-hidden bg-white shadow ring-1 ring-violet-100">
            <button onClick={()=>onOpen(i)} className="relative block w-full">
              <Image src={s.src} alt={s.title} width={s.w} height={s.h} className="w-full h-auto object-cover" />
              <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent text-white p-3 text-sm">{s.title}</figcaption>
            </button>
          </figure>
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} className="fixed inset-0 z-[60] bg-black/80 backdrop-blur flex items-center justify-center p-4" onClick={()=>setOpen(false)}>
            <motion.div initial={{ scale:0.98, opacity:0 }} animate={{ scale:1, opacity:1 }} exit={{ scale:0.98, opacity:0 }} transition={{ type:'spring', stiffness:120 }} className="relative max-w-5xl w-full" onClick={(e)=>e.stopPropagation()}>
              <Image src={shots[index].src} alt={shots[index].title} width={shots[index].w} height={shots[index].h} className="w-full h-auto rounded-xl object-contain bg-black" />
              <div className="mt-3 flex items-center justify-between text-white text-sm">
                <span>{shots[index].title}</span>
                <div className="flex items-center gap-2">
                  <button onClick={onPrev} className="px-3 py-1 rounded bg-white/10 ring-1 ring-white/30 hover:bg-white/20">Prev</button>
                  <button onClick={onNext} className="px-3 py-1 rounded bg-white/10 ring-1 ring-white/30 hover:bg-white/20">Next</button>
                  <a href="#booking" className="ml-2 px-3 py-1 rounded bg-fuchsia-600 text-white hover:bg-fuchsia-700">Book this look</a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// =====================================================
// Booking Calendar (simple month grid + slots)
// =====================================================
function BookingCalendar() {
  const [month, setMonth] = useState(() => { const d=new Date(); return new Date(d.getFullYear(), d.getMonth(), 1); });
  const [selected, setSelected] = useState<Date | null>(null);
  const [slot, setSlot] = useState('');
  const [status, setStatus] = useState('');

  const monthName = month.toLocaleString('en-US', { month:'long', year:'numeric' });
  const days = useMemo(() => buildMonthDays(month), [month]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected || !slot) return;
    setStatus('Sending…');
    setTimeout(()=>{
      setStatus('Booked! We\'ll confirm by email.');
      setSelected(null); setSlot('');
    }, 800);
  };

  const slots = ['9:00 AM','11:30 AM','2:00 PM','4:30 PM'];

  return (
    <section id="booking" className="py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-6">Booking calendar</h2>
            <div className="rounded-2xl bg-white/70 border border-violet-100 p-4 md:p-6 shadow">
              <div className="flex items-center justify-between mb-4">
                <button onClick={()=>setMonth(prev=>new Date(prev.getFullYear(), prev.getMonth()-1, 1))} className="px-3 py-1 rounded-xl border border-slate-300 hover:border-fuchsia-600">Prev</button>
                <p className="font-semibold">{monthName}</p>
                <button onClick={()=>setMonth(prev=>new Date(prev.getFullYear(), prev.getMonth()+1, 1))} className="px-3 py-1 rounded-xl border border-slate-300 hover:border-fuchsia-600">Next</button>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center text-xs text-slate-500 mb-1">
                {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d=> <div key={d} className="py-1">{d}</div>)}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {days.map((d,i)=> (
                  <button key={i} disabled={!d.inMonth || d.disabled}
                    onClick={()=> setSelected(d.date)}
                    className={`h-10 rounded-xl text-sm ${selected && isSameDay(selected, d.date) ? 'bg-fuchsia-600 text-white' : d.inMonth ? 'hover:bg-fuchsia-50 border border-transparent' : 'text-slate-400'} ${d.disabled ? 'opacity-30 cursor-not-allowed':''}`}>
                    {d.date.getDate()}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 rounded-2xl bg-white/70 border border-violet-100 p-6 shadow">
            <h3 className="text-xl font-bold">Request a date</h3>
            <form onSubmit={submit} className="mt-4 grid grid-cols-1 gap-3 text-sm">
              <input className="p-3 rounded-xl border border-slate-300" placeholder="Full name" required />
              <input className="p-3 rounded-xl border border-slate-300" placeholder="Email" type="email" required />
              <input className="p-3 rounded-xl border border-slate-300" placeholder="Phone" required />
              <select className="p-3 rounded-xl border border-slate-300" value={slot} onChange={e=>setSlot(e.target.value)} required>
                <option value="">Preferred time</option>
                {slots.map(s=> <option key={s}>{s}</option>)}
              </select>
              <input className="p-3 rounded-xl border border-slate-300" placeholder="Event type (wedding, brand, etc.)" />
              <textarea className="p-3 rounded-xl border border-slate-300" rows={3} placeholder="Notes (venue, vibe, colors)"></textarea>
              <input readOnly className="p-3 rounded-xl border border-slate-300 bg-slate-50" value={selected ? selected.toLocaleDateString() : 'No date selected'} />
              <button type="submit" className="mt-1 px-5 py-3 rounded-xl bg-fuchsia-600 text-white font-semibold hover:bg-fuchsia-700">Request booking</button>
              {status && <p className="text-fuchsia-700 font-semibold">{status}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function buildMonthDays(month: Date) {
  const y = month.getFullYear();
  const m = month.getMonth();
  const first = new Date(y, m, 1);
  const start = new Date(y, m, 1 - first.getDay());
  const days: { date: Date; inMonth: boolean; disabled: boolean }[] = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const inMonth = d.getMonth() === m;
    // Example: disable past dates
    const today = new Date(); today.setHours(0,0,0,0);
    const disabled = d < today;
    days.push({ date: d, inMonth, disabled });
  }
  return days;
}
function isSameDay(a: Date, b: Date) {
  return a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate();
}
