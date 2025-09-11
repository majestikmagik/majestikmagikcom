'use client';

import React, { useState } from 'react';
import Image from 'next/image';

// =============================
// Icons (Lucide-like SVG)
// =============================
const StethoscopeIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><title>Stethoscope SVG Icon</title><path fill="currentColor" d="M19.267 14.312v-.007a2.48 2.48 0 1 0-2.854 2.452l.014.002v1.726a4.355 4.355 0 0 1-8.71 0v-2.462h.03a.753.753 0 0 0 .743-.629l.001-.004c3.374-.64 5.891-3.56 5.9-7.071V.454a.45.45 0 0 0-.453-.45h-2.307a.454.454 0 0 0-.453.453v.618c0 .25.203.452.453.453h1.252v6.781a5.695 5.695 0 0 1-4.389 5.536l-.039.008a.757.757 0 0 0-.706-.489H6.614a.763.763 0 0 0-.704.483l-.002.005c-2.542-.607-4.403-2.857-4.407-5.542V1.528h1.258c.25 0 .453-.203.453-.453V.457a.453.453 0 0 0-.453-.453H.453a.452.452 0 0 0-.452.452v7.859a7.21 7.21 0 0 0 5.825 7.065l.045.007c.056.345.34.609.69.633h.002v2.535a5.514 5.514 0 0 0 11.028 0v-.07v.004v-1.826a2.496 2.496 0 0 0 1.679-2.35zm-3.816 0a1.339 1.339 0 1 1 0 .002z"/></svg>
);
const ToothIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="448" height="512" viewBox="0 0 448 512"><title>Tooth SVG Icon</title><path fill="currentColor" d="M186.1 52.1c-16.8-13-37.4-20.1-58.6-20.1C74.7 32 32 74.7 32 127.5v6.2c0 15.8 3.7 31.3 10.7 45.5l23.5 47.1c4.5 8.9 7.6 18.4 9.4 28.2l36.7 205.8c2 11.2 11.6 19.4 22.9 19.8s21.4-7.4 24-18.4l28.9-121.3C192.2 323.7 207 312 224 312s31.8 11.7 35.8 28.3l28.9 121.3c2.6 11.1 12.7 18.8 24 18.4s20.9-8.6 22.9-19.8l36.7-205.8c1.8-9.8 4.9-19.3 9.4-28.2l23.5-47.1c7.1-14.1 10.7-29.7 10.7-45.5v-2.1c0-55-44.6-99.6-99.6-99.6c-24.1 0-47.4 8.8-65.6 24.6l-3.2 2.8L267 74.5c7 5.4 8.2 15.5 2.8 22.5s-15.5 8.2-22.5 2.8l-24.4-19l-37-28.8z"/></svg>
);
const CalendarIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
);
const PhoneIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M2.5 5.5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 1.7l.3 1.8a2 2 0 0 1-.5 1.7l-1.1 1.1a14 14 0 0 0 6 6l1.1-1.1a2 2 0 0 1 1.7-.5l1.8.3a2 2 0 0 1 1.7 2v2a2 2 0 0 1-2 2h-.5A18.5 18.5 0 0 1 2.5 6v-.5Z" /></svg>
);
const MailIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2" /><path d="m3 6 9 7 9-7" /></svg>
);
const MapPinIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 10A8.84 8.84 0 1 1 4 10c0 6.63 8 12 8 12s8-5.37 8.84-12Z" /><circle cx="12" cy="10" r="3" /></svg>
);
const StarIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2"><path d="M12 2 15.09 8.26 22 9.27 17 14.14l1.18 6.88L12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2Z" /></svg>
);

// =============================
// Types & Mock Data
// =============================

type Doctor = {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  bio: string;
  phone: string;
  email: string;
  photo: string;
};

type Service = {
  id: string;
  name: string;
  description: string;
  icon: 'medical' | 'dental';
};

const DOCTORS: Doctor[] = [
  {
    id: 'd1',
    name: 'Dr. Elena Patel, MD',
    specialty: 'Family Medicine',
    rating: 4.9,
    bio: 'Board-certified with 12+ years of experience in preventive care and chronic disease management.',
    phone: '(804) 555-4101',
    email: 'epatel@rivercitycare.com',
    photo: 'https://placehold.co/600x600/0f172a/ffffff.jpg?text=Dr.+Patel'
  },
  {
    id: 'd2',
    name: 'Dr. Marcus Nguyen, DDS',
    specialty: 'General Dentistry',
    rating: 4.8,
    bio: 'Gentle comprehensive dentistry with a focus on cosmetic and restorative treatments.',
    phone: '(804) 555-4102',
    email: 'mnguyen@rivercitycare.com',
    photo: 'https://placehold.co/600x600/1e293b/ffffff.jpg?text=Dr.+Nguyen'
  },
  {
    id: 'd3',
    name: 'Dr. Aisha Romero, DO',
    specialty: 'Sports Medicine',
    rating: 5.0,
    bio: 'Non‑operative musculoskeletal care, ultrasound‑guided injections, and return‑to‑play plans.',
    phone: '(804) 555-4103',
    email: 'aromero@rivercitycare.com',
    photo: 'https://placehold.co/600x600/111827/ffffff.jpg?text=Dr.+Romero'
  },
];

const SERVICES: Service[] = [
  { id: 's1', name: 'Annual Checkups', description: 'Comprehensive wellness visits, screenings, and lab orders tailored to your age and history.', icon: 'medical' },
  { id: 's2', name: 'Pediatric Care', description: 'Well‑child visits, immunizations, and acute care for children and teens.', icon: 'medical' },
  { id: 's3', name: 'Cleanings & Exams', description: 'Gentle cleanings, exams, X‑rays, and hygiene coaching for all ages.', icon: 'dental' },
  { id: 's4', name: 'Cosmetic Dentistry', description: 'Whitening, veneers, and bonding for brighter, more confident smiles.', icon: 'dental' },
  { id: 's5', name: 'Sports Injury Care', description: 'Evaluation, rehab plans, and referral coordination to keep you moving.', icon: 'medical' },
  { id: 's6', name: 'Urgent Visits', description: 'Same‑day visits for minor illnesses and injuries (call for availability).', icon: 'medical' },
];

// =============================
// Page
// =============================
export default function MedicalDentalTemplatePage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  return (
    <div className="bg-slate-50 text-slate-800">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur shadow-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-slate-900">
            <StethoscopeIcon className="w-7 h-7 text-sky-600" />
            RiverCity <span className="text-sky-600">Care</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#services" className="hover:text-sky-600">Services</a>
            <a href="#doctors" className="hover:text-sky-600">Doctors</a>
            <a href="#appointments" className="hover:text-sky-600">Appointments</a>
            <a href="#contact" className="hover:text-sky-600">Contact</a>
          </nav>
          <div className="hidden md:flex items-center gap-3">
            <a href="#appointments" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white font-semibold hover:bg-black"><CalendarIcon className="w-5 h-5" />Book</a>
          </div>
          <button className="md:hidden" onClick={() => setMobileOpen(v => !v)} aria-label="Menu">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>
        {mobileOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white">
            <div className="px-6 py-3 flex flex-col gap-3 text-sm">
              <a href="#services" className="py-2">Services</a>
              <a href="#doctors" className="py-2">Doctors</a>
              <a href="#appointments" className="py-2">Appointments</a>
              <a href="#contact" className="py-2">Contact</a>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center opacity-10" />
          <video autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover z-0">
            <source src="/img/4121618-hd_1920_1080_25fps.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="container mx-auto px-6 py-16 md:py-24 relative">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900">
                Compassionate care for <span className="text-sky-600">every family</span>
              </h1>
              <p className="mt-4 text-lg text-slate-700">Same‑day appointments, on‑site dental, and coordinated care under one roof in Richmond.</p>
            </div>

            <div className="mt-8 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 md:p-6 flex flex-col sm:flex-row gap-3">
              <a href="#appointments" className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-sky-600 text-white font-semibold hover:bg-sky-700"><CalendarIcon className="w-5 h-5 mr-2" /> Book Appointment</a>
              <a href="tel:8045554100" className="inline-flex items-center justify-center px-5 py-3 rounded-xl border border-slate-300 hover:border-sky-500"><PhoneIcon className="w-5 h-5 mr-2" /> (804) 555‑4100</a>
            </div>
          </div>
        </section>

        {/* Trust bar */}
        <section className="bg-white border-y border-slate-200">
          <div className="container mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-2xl font-extrabold text-slate-900">4.9★</p>
              <p className="text-sm text-slate-600">Patient rating</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-900">Same‑Day</p>
              <p className="text-sm text-slate-600">Urgent slots</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-900">Most Plans</p>
              <p className="text-sm text-slate-600">Insurance accepted</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-900">On‑Site</p>
              <p className="text-sm text-slate-600">X‑ray & Labs</p>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="py-16 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">Services</h2>
              <p className="text-slate-600">Primary care, dental, and sports medicine in one place.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {SERVICES.map(s => (
                <div key={s.id} className="bg-white p-6 rounded-2xl shadow ring-1 ring-slate-200">
                  <div className="inline-flex p-3 rounded-xl bg-sky-50 text-sky-700 mb-4">
                    {s.icon === 'medical' ? <StethoscopeIcon className="w-6 h-6" /> : <ToothIcon className="w-6 h-6" />}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{s.name}</h3>
                  <p className="text-sm text-slate-700 mt-2">{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Doctors */}
        <section id="doctors" className="bg-white py-16">
          <div className="container mx-auto px-6">
            <div className="mb-10">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">Meet our doctors</h2>
              <p className="text-slate-600">Board‑certified physicians and dentists focused on your health.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {DOCTORS.map(d => (
                <div key={d.id} className="bg-slate-50 rounded-2xl shadow ring-1 ring-slate-200 overflow-hidden">
                  <Image src={d.photo} alt={d.name} width={600} height={400} className="h-56 w-full object-cover" />
                  <div className="p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">{d.name}</h3>
                        <p className="text-sm text-slate-600">{d.specialty}</p>
                      </div>
                      <div className="flex items-center gap-1 text-amber-400" title={`${d.rating} out of 5`}>
                        <StarIcon className="w-5 h-5" />
                        <span className="text-slate-800 font-semibold">{d.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-slate-700">{d.bio}</p>
                    <div className="mt-4 flex items-center gap-3 text-sm">
                      <a href={`tel:${d.phone.replace(/[^0-9]/g, '')}`} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-300 hover:border-sky-500"><PhoneIcon className="w-4 h-4" />{d.phone}</a>
                      <a href={`mailto:${d.email}`} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-300 hover:border-sky-500"><MailIcon className="w-4 h-4" /> Email</a>
                    </div>
                    <div className="mt-4">
                      <button onClick={() => { setSelectedDoctor(d); setBookingOpen(true); }} className="px-4 py-2 rounded-xl bg-sky-600 text-white font-semibold hover:bg-sky-700">Book with {d.name.split(' ')[0]}</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Insurance & Partners */}
        <section className="bg-white border-y border-slate-200">
          <div className="container mx-auto px-6 py-10">
            <h3 className="text-lg font-bold text-slate-900 mb-4">We accept most major plans</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center">
              {['Aetna', 'Cigna', 'BCBS', 'United', 'Medicare'].map(name => (
                <div key={name} className="flex items-center justify-center p-4 rounded-xl border border-slate-200 bg-slate-50">
                  <Image src={`https://placehold.co/220x80/ffffff/0f172a.jpg?text=${encodeURIComponent(name)}`} alt={`${name} logo`} width={220} height={80} />
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-3">Call to verify your individual benefits.</p>
          </div>
        </section>

        {/* Appointments */}
        <AppointmentSection open={bookingOpen} setOpen={setBookingOpen} doctor={selectedDoctor} clearDoctor={() => setSelectedDoctor(null)} />

        {/* Location / Map */}
        <section id="contact" className="py-16 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow">
                <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2"><MapPinIcon className="w-5 h-5 text-sky-600" /> Richmond Clinic</h3>
                <p className="text-sm text-slate-600 mt-1">123 Wellness Way, Richmond, VA</p>
                <ul className="mt-4 text-sm text-slate-700 space-y-1">
                  <li>Mon–Fri: 8 AM – 6 PM</li>
                  <li>Sat: 9 AM – 2 PM</li>
                  <li>Sun: Closed</li>
                </ul>
                <div className="mt-4 flex items-center gap-3 text-sm">
                  <a href="tel:8045554100" className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-300 hover:border-sky-500"><PhoneIcon className="w-4 h-4" />(804) 555‑4100</a>
                  <a href="mailto:hello@rivercitycare.com" className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-300 hover:border-sky-500"><MailIcon className="w-4 h-4" /> Email</a>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden shadow ring-1 ring-slate-200">
                <iframe
                  src={`https://www.google.com/maps?q=${encodeURIComponent('123 Wellness Way, Richmond, VA')}&output=embed`}
                  className="w-full h-[380px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-6">* We follow HIPAA best practices. Do not submit sensitive medical details via the general contact form.</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">RiverCity Care</h3>
              <p className="text-sm">Family medicine & dental in one convenient clinic.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Patients</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#appointments" className="hover:text-white">Book appointment</a></li>
                <li><a href="#services" className="hover:text-white">Our services</a></li>
                <li><a href="#doctors" className="hover:text-white">Find a doctor</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Office</h4>
              <ul className="space-y-2 text-sm">
                <li>Richmond, VA</li>
                <li>(804) 555‑4100</li>
                <li>hello@rivercitycare.com</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Hours</h4>
              <ul className="space-y-2 text-sm">
                <li>Mon–Fri: 8 AM – 6 PM</li>
                <li>Sat: 9 AM – 2 PM</li>
                <li>Sun: Closed</li>
              </ul>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-slate-700 text-center text-sm">© {new Date().getFullYear()} RiverCity Care. All rights reserved.</div>
        </div>
      </footer>

      {/* Booking modal */}
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} doctor={selectedDoctor} />
    </div>
  );
}

// =============================
// Appointment Section (inline form)
// =============================
function AppointmentSection({ doctor, clearDoctor }: { open: boolean; setOpen: (v: boolean) => void; doctor: Doctor | null; clearDoctor: () => void; }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [reason, setReason] = useState('General Visit');
  const [status, setStatus] = useState('');

  React.useEffect(() => {
    if (doctor) setReason(`Visit with ${doctor.name}`);
  }, [doctor]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Submitting…');
    setTimeout(() => {
      setStatus('Request received! We will confirm by email.');
      setName(''); setEmail(''); setPhone(''); setDate(''); setTime('');
      clearDoctor();
    }, 900);
  };

  return (
    <section id="appointments" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-10 shadow-xl">
          <h2 className="text-3xl font-extrabold text-slate-900">Request an appointment</h2>
          <p className="text-slate-600 mt-1">We’ll match you with the right provider and follow up quickly.</p>

          {doctor && (
            <div className="mt-4 p-4 rounded-xl bg-white border border-slate-200 flex items-center gap-4">
              <Image src={doctor.photo} alt={doctor.name} width={80} height={80} className="rounded-lg object-cover" />
              <div>
                <p className="font-semibold text-slate-900">Preferred provider:</p>
                <p className="text-slate-700 text-sm">{doctor.name} • {doctor.specialty}</p>
              </div>
            </div>
          )}

          <form onSubmit={submit} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <input className="p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} required />
            <input className="p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500" placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            <input className="md:col-span-2 p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} required />

            <select className="p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500" value={reason} onChange={e => setReason(e.target.value)}>
              <option>General Visit</option>
              <option>Dental Cleaning</option>
              <option>New Patient Exam</option>
              <option>Sports Injury</option>
              <option>Telehealth</option>
              <option>Other</option>
            </select>
            <div className="grid grid-cols-2 gap-3">
              <input type="date" className="p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500" value={date} onChange={e => setDate(e.target.value)} required />
              <input type="time" className="p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500" value={time} onChange={e => setTime(e.target.value)} required />
            </div>

            <div className="md:col-span-2 flex items-center justify-between">
              <button type="submit" className="px-6 py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-black">Submit Request</button>
              {status && <p className="text-sm text-sky-600 font-semibold">{status}</p>}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

// =============================
// Booking Modal (quick select)
// =============================
function BookingModal({ open, onClose, doctor }: { open: boolean; onClose: () => void; doctor: Doctor | null; }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [status, setStatus] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Booking…');
    setTimeout(() => {
      setStatus('Booked! We\'ll confirm by email.');
      setName(''); setEmail(''); setPhone(''); setDate(''); setTime('');
      onClose();
    }, 900);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-2xl font-extrabold text-slate-900">Quick booking</h3>
              {doctor ? (
                <p className="text-slate-600 mt-1">Preferred provider: {doctor.name} • {doctor.specialty}</p>
              ) : (
                <p className="text-slate-600 mt-1">We&apos;ll match you with an available provider.</p>
              )}
            </div>
            <button onClick={onClose} className="px-3 py-1 rounded-lg border border-slate-300 hover:bg-slate-50">Close</button>
          </div>

          <form onSubmit={submit} className="mt-6 grid grid-cols-1 gap-4">
            <input className="p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} required />
            <input className="p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500" placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            <input className="p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} required />
            <div className="grid grid-cols-2 gap-3">
              <input type="date" className="p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500" value={date} onChange={e => setDate(e.target.value)} required />
              <input type="time" className="p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500" value={time} onChange={e => setTime(e.target.value)} required />
            </div>
            <button type="submit" className="px-6 py-3 rounded-xl bg-sky-600 text-white font-semibold hover:bg-sky-700">Confirm</button>
            {status && <p className="text-sm text-sky-600 font-semibold">{status}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
