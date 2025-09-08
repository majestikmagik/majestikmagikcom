'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';

// =============================
// Icon helpers (Lucide-like SVG)
// =============================
const DumbbellIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 6.5 17 9m-10 6-2.5 2.5M6.5 9.5 9 7m6 10 2.5-2.5M21 12h-3m-12 0H3m5.5 4.5 7-7"/></svg>
);
const ClockIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
);
const UserIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21a8 8 0 1 0-16 0"/><circle cx="12" cy="7" r="4"/></svg>
);
const StarIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2"><path d="M12 2 15.09 8.26 22 9.27 17 14.14l1.18 6.88L12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2Z"/></svg>
);
const PhoneIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M2.5 5.5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 1.7l.3 1.8a2 2 0 0 1-.5 1.7l-1.1 1.1a14 14 0 0 0 6 6l1.1-1.1a2 2 0 0 1 1.7-.5l1.8.3a2 2 0 0 1 1.7 2v2a2 2 0 0 1-2 2h-.5A18.5 18.5 0 0 1 2.5 6v-.5Z"/></svg>
);
const MenuIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
);

// =============================
// Types & Mock Data
// =============================

type Trainer = {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  bio: string;
  phone: string;
  email: string;
  photo: string;
};

type ClassType = 'Strength' | 'HIIT' | 'Yoga' | 'Pilates' | 'Spin' | 'Mobility';

type FitnessClass = {
  id: string;
  name: string;
  type: ClassType;
  trainerId: string;
  day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
  time: string; // e.g. "6:30 AM"
  duration: number; // minutes
  capacity: number;
  image: string;
};

const TRAINERS: Trainer[] = [
  {
    id: 't1',
    name: 'Jordan Blake',
    specialty: 'Strength & Conditioning',
    rating: 4.9,
    bio: 'Certified CPT with 8+ years helping clients build muscle safely and efficiently.',
    phone: '(804) 555-7001',
    email: 'jordan@rivercityfit.com',
    photo: 'https://placehold.co/600x600/0f172a/ffffff.jpg?text=Jordan'
  },
  {
    id: 't2',
    name: 'Maya Chen',
    specialty: 'Yoga & Mobility',
    rating: 5.0,
    bio: 'Breath-focused movement to improve flexibility, reduce stress, and prevent injury.',
    phone: '(804) 555-7002',
    email: 'maya@rivercityfit.com',
    photo: 'https://placehold.co/600x600/1e293b/ffffff.jpg?text=Maya'
  },
  {
    id: 't3',
    name: 'Alex Martinez',
    specialty: 'HIIT & Fat Loss',
    rating: 4.8,
    bio: 'High-energy circuit training, tailored for all levels with smart progressions.',
    phone: '(804) 555-7003',
    email: 'alex@rivercityfit.com',
    photo: 'https://placehold.co/600x600/111827/ffffff.jpg?text=Alex'
  },
];

const CLASSES: FitnessClass[] = [
  { id: 'c1', name: 'Power Hour', type: 'Strength', trainerId: 't1', day: 'Mon', time: '6:00 AM', duration: 60, capacity: 14, image: 'https://placehold.co/800x600/0ea5e9/ffffff.jpg?text=Power+Hour' },
  { id: 'c2', name: 'Lunchtime HIIT', type: 'HIIT', trainerId: 't3', day: 'Mon', time: '12:00 PM', duration: 45, capacity: 18, image: 'https://placehold.co/800x600/f59e0b/ffffff.jpg?text=HIIT' },
  { id: 'c3', name: 'Sunset Flow', type: 'Yoga', trainerId: 't2', day: 'Mon', time: '6:30 PM', duration: 60, capacity: 16, image: 'https://placehold.co/800x600/34d399/0f172a.jpg?text=Yoga' },
  { id: 'c4', name: 'Rise & Ride', type: 'Spin', trainerId: 't3', day: 'Tue', time: '6:00 AM', duration: 45, capacity: 20, image: 'https://placehold.co/800x600/8b5cf6/ffffff.jpg?text=Spin' },
  { id: 'c5', name: 'Mobility Reset', type: 'Mobility', trainerId: 't2', day: 'Tue', time: '5:30 PM', duration: 45, capacity: 12, image: 'https://placehold.co/800x600/22d3ee/0f172a.jpg?text=Mobility' },
  { id: 'c6', name: 'Core & Control', type: 'Pilates', trainerId: 't2', day: 'Wed', time: '7:00 AM', duration: 55, capacity: 12, image: 'https://placehold.co/800x600/f472b6/0f172a.jpg?text=Pilates' },
  { id: 'c7', name: 'After‑Work Strength', type: 'Strength', trainerId: 't1', day: 'Wed', time: '6:00 PM', duration: 60, capacity: 14, image: 'https://placehold.co/800x600/0ea5e9/ffffff.jpg?text=Strength' },
  { id: 'c8', name: 'Weekend Warrior', type: 'HIIT', trainerId: 't3', day: 'Sat', time: '9:00 AM', duration: 50, capacity: 20, image: 'https://placehold.co/800x600/f59e0b/ffffff.jpg?text=Weekend+Warrior' },
];

// =============================
// Page Component
// =============================
export default function FitnessStudiosTemplatePage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [filterType, setFilterType] = useState<ClassType | ''>('');
  const [filterDay, setFilterDay] = useState<FitnessClass['day'] | ''>('');
  const [bookingClass, setBookingClass] = useState<FitnessClass | null>(null);

  const visibleClasses = useMemo(() => {
    return CLASSES.filter((c) => (!filterType || c.type === filterType) && (!filterDay || c.day === filterDay));
  }, [filterType, filterDay]);

  return (
    <div className="bg-slate-50 text-slate-800">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur shadow-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-slate-900">
            <DumbbellIcon className="w-7 h-7 text-emerald-600" />
            RiverCity <span className="text-emerald-600">Fit</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#classes" className="hover:text-emerald-600">Classes</a>
            <a href="#trainers" className="hover:text-emerald-600">Trainers</a>
            <a href="#pricing" className="hover:text-emerald-600">Pricing</a>
            <a href="#contact" className="hover:text-emerald-600">Contact</a>
          </nav>
          <div className="hidden md:flex items-center gap-3">
            <a href="#pricing" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white font-semibold hover:bg-black">Join Now</a>
          </div>
          <button className="md:hidden" onClick={() => setMobileOpen(v => !v)} aria-label="Menu">
            <MenuIcon className="w-7 h-7" />
          </button>
        </div>
        {mobileOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white">
            <div className="px-6 py-3 flex flex-col gap-3 text-sm">
              <a href="#classes" className="py-2">Classes</a>
              <a href="#trainers" className="py-2">Trainers</a>
              <a href="#pricing" className="py-2">Pricing</a>
              <a href="#contact" className="py-2">Contact</a>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://placehold.co/1920x900/0f172a/ffffff.jpg?text=Train+Smarter,+Feel+Stronger')] bg-cover bg-center opacity-20"/>
          <div className="container mx-auto px-6 py-16 md:py-24 relative">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900">
                Clean, modern training for <span className="text-emerald-600">real results</span>
              </h1>
              <p className="mt-4 text-lg text-slate-700">Small-group classes, 1:1 coaching, and flexible memberships in Richmond.</p>
            </div>

            {/* Filters */}
            <div className="mt-8 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 md:p-6">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <select value={filterType} onChange={(e) => setFilterType(e.target.value as ClassType | '')} className="p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500">
                  <option value="">All Types</option>
                  <option value="Strength">Strength</option>
                  <option value="HIIT">HIIT</option>
                  <option value="Yoga">Yoga</option>
                  <option value="Pilates">Pilates</option>
                  <option value="Spin">Spin</option>
                  <option value="Mobility">Mobility</option>
                </select>
                <select value={filterDay} onChange={(e) => setFilterDay(e.target.value as FitnessClass['day'] | '')} className="p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500">
                  <option value="">Any Day</option>
                  {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
                <a href="#classes" className="md:col-span-3 inline-flex items-center justify-center px-4 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700">See Schedule</a>
              </div>
              <p className="mt-3 text-xs text-slate-500">* Filters apply to the class list below.</p>
            </div>
          </div>
        </section>

        {/* Stats strip */}
        <section className="bg-white border-y border-slate-200">
          <div className="container mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-2xl font-extrabold text-slate-900">30+</p>
              <p className="text-sm text-slate-600">Weekly classes</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-900">4.9★</p>
              <p className="text-sm text-slate-600">Member rating</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-900">10</p>
              <p className="text-sm text-slate-600">Expert coaches</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-900">15k</p>
              <p className="text-sm text-slate-600">Sessions completed</p>
            </div>
          </div>
        </section>

        {/* Classes */}
        <section id="classes" className="py-16 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="flex items-end justify-between gap-6 mb-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">Upcoming Classes</h2>
                <p className="text-slate-600">Book a spot in your next session.</p>
              </div>
              <a href="#pricing" className="hidden md:inline-block px-4 py-2 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700">View Memberships</a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {visibleClasses.map((c) => {
                const trainer = TRAINERS.find(t => t.id === c.trainerId)!;
                return (
                  <article key={c.id} className="group bg-white rounded-2xl shadow ring-1 ring-slate-200 overflow-hidden hover:shadow-lg transition">
                    <div className="relative">
                      <Image src={c.image} alt={c.name} width={800} height={600} className="h-56 w-full object-cover" />
                      <span className="absolute left-3 top-3 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-600 text-white">{c.type}</span>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700">{c.name}</h3>
                        <span className="text-emerald-700 font-extrabold inline-flex items-center gap-1"><ClockIcon className="w-4 h-4"/>{c.time}</span>
                      </div>
                      <p className="mt-1 text-sm text-slate-600">Duration: {c.duration} min • Capacity: {c.capacity}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Image src={trainer.photo} alt={trainer.name} width={40} height={40} className="rounded-full object-cover"/>
                          <div>
                            <p className="text-sm font-semibold text-slate-900">{trainer.name}</p>
                            <p className="text-xs text-slate-600">{trainer.specialty}</p>
                          </div>
                        </div>
                        <button onClick={() => setBookingClass(c)} className="px-3 py-2 rounded-xl text-sm font-semibold border border-slate-300 hover:border-emerald-500">Book</button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Trainers */}
        <section id="trainers" className="bg-white py-16">
          <div className="container mx-auto px-6">
            <div className="mb-10">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">Meet the Trainers</h2>
              <p className="text-slate-600">Certified pros who keep you safe and motivated.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TRAINERS.map(t => (
                <div key={t.id} className="bg-slate-50 rounded-2xl shadow ring-1 ring-slate-200 overflow-hidden">
                  <Image src={t.photo} alt={t.name} width={600} height={400} className="h-56 w-full object-cover"/>
                  <div className="p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">{t.name}</h3>
                        <p className="text-sm text-slate-600">{t.specialty}</p>
                      </div>
                      <div className="flex items-center gap-1 text-amber-400" title={`${t.rating} out of 5`}>
                        <StarIcon className="w-5 h-5"/>
                        <span className="text-slate-800 font-semibold">{t.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-slate-700">{t.bio}</p>
                    <div className="mt-4 flex items-center gap-3 text-sm">
                      <a href={`tel:${t.phone.replace(/[^0-9]/g, '')}`} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-300 hover:border-emerald-500"><PhoneIcon className="w-4 h-4"/>{t.phone}</a>
                      <a href={`mailto:${t.email}`} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-300 hover:border-emerald-500"><UserIcon className="w-4 h-4"/> Email</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="bg-slate-50 py-16">
          <div className="container mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">Memberships</h2>
              <p className="text-slate-600">Flexible plans for any goal.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl shadow ring-1 ring-slate-200 p-6">
                <h3 className="text-xl font-bold">Starter</h3>
                <p className="text-3xl font-extrabold mt-2">$49<span className="text-base font-medium text-slate-500">/mo</span></p>
                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  <li>• 4 classes / month</li>
                  <li>• Open gym access</li>
                  <li>• 1 free guest pass</li>
                </ul>
                <a href="#contact" className="mt-6 inline-flex px-4 py-2 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700">Choose Starter</a>
              </div>
              <div className="bg-white rounded-2xl shadow-lg ring-2 ring-emerald-600 p-6 scale-105">
                <h3 className="text-xl font-bold">Pro</h3>
                <p className="text-3xl font-extrabold mt-2">$99<span className="text-base font-medium text-slate-500">/mo</span></p>
                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  <li>• Unlimited classes</li>
                  <li>• Open gym + sauna</li>
                  <li>• 2 guest passes</li>
                </ul>
                <a href="#contact" className="mt-6 inline-flex px-4 py-2 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700">Choose Pro</a>
              </div>
              <div className="bg-white rounded-2xl shadow ring-1 ring-slate-200 p-6">
                <h3 className="text-xl font-bold">1:1 Coaching</h3>
                <p className="text-3xl font-extrabold mt-2">$75<span className="text-base font-medium text-slate-500">/session</span></p>
                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  <li>• Personalized programming</li>
                  <li>• Nutrition check-ins</li>
                  <li>• Priority booking</li>
                </ul>
                <a href="#contact" className="mt-6 inline-flex px-4 py-2 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700">Book Coaching</a>
              </div>
            </div>
          </div>
        </section>

        {/* Contact / Booking */}
        <BookingForm bookingClass={bookingClass} onClose={() => setBookingClass(null)} />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">RiverCity Fit</h3>
              <p className="text-sm">Clean, modern studio in the heart of Richmond.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Train</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#classes" className="hover:text-white">Classes</a></li>
                <li><a href="#trainers" className="hover:text-white">Coaches</a></li>
                <li><a href="#pricing" className="hover:text-white">Memberships</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Visit</h4>
              <ul className="space-y-2 text-sm">
                <li>Richmond, VA</li>
                <li>(804) 555-7000</li>
                <li>hello@rivercityfit.com</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Hours</h4>
              <ul className="space-y-2 text-sm">
                <li>Mon–Fri: 5:30 AM – 9 PM</li>
                <li>Sat: 7 AM – 4 PM</li>
                <li>Sun: 8 AM – 2 PM</li>
              </ul>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-slate-700 text-center text-sm">© {new Date().getFullYear()} RiverCity Fit. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}

// =============================
// Booking Form Component (with modal state)
// =============================
function BookingForm({ bookingClass, onClose }: { bookingClass: FitnessClass | null; onClose: () => void; }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Booking…');
    setTimeout(() => {
      setStatus('Booked! Check your email for confirmation.');
      setName(''); setEmail(''); setPhone('');
      setTimeout(() => { onClose(); setStatus(''); }, 1200);
    }, 900);
  };

  return (
    <section id="contact" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-10 shadow-xl">
          <h2 className="text-3xl font-extrabold text-slate-900">Book a Class or Consult</h2>
          <p className="text-slate-600 mt-1">We’ll confirm your spot and send details.</p>

          {bookingClass && (
            <div className="mt-4 p-4 rounded-xl bg-white border border-slate-200">
              <p className="text-sm text-slate-500 mb-1">Booking:</p>
              <div className="flex items-center gap-4">
                <Image src={bookingClass.image} alt={bookingClass.name} width={120} height={90} className="rounded-lg object-cover"/>
                <div>
                  <p className="font-semibold text-slate-900">{bookingClass.name}</p>
                  <p className="text-sm text-slate-600">{bookingClass.day} • {bookingClass.time} • {bookingClass.duration} min</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <input className="p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} required />
            <input className="p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500" placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            <input className="md:col-span-2 p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} required />
            <div className="md:col-span-2 flex items-center justify-between">
              <button type="submit" className="px-6 py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-black">Book Now</button>
              {status && <p className="text-sm text-emerald-600 font-semibold">{status}</p>}
            </div>
          </form>
        </div>
      </div>

      {/* Modal overlay for quick booking */}
      {bookingClass && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={onClose} />
          <div className="relative bg-white w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-extrabold text-slate-900">{bookingClass.name}</h3>
                  <p className="text-slate-600 mt-1">{bookingClass.day} • {bookingClass.time} • {bookingClass.duration} min</p>
                </div>
                <button onClick={onClose} className="px-3 py-1 rounded-lg border border-slate-300 hover:bg-slate-50">Close</button>
              </div>
              <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-4">
                <input className="p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} required />
                <input className="p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500" placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                <input className="p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} required />
                <button type="submit" className="px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700">Confirm Booking</button>
                {status && <p className="text-sm text-emerald-600 font-semibold">{status}</p>}
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
