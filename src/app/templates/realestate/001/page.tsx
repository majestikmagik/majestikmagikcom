'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';

// =============================
// Icon helpers (Lucide-style SVG)
// =============================
const HomeIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/><path d="M9 22V12h6v10"/></svg>
);
const MapPinIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);
const BedIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg>
);
const BathIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 10V7a3 3 0 0 1 6 0"/><path d="M6 10h10a4 4 0 0 1 4 4v1a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5v-1a4 4 0 0 1 4-4Z"/></svg>
);
const RulerIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 2 2 16l6 6L22 8 16 2Z"/><path d="m7.5 10.5 2 2"/><path d="m10.5 7.5 2 2"/><path d="m13.5 4.5 2 2"/></svg>
);
const MenuIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
);
const PhoneIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M2.5 5.5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 1.7l.3 1.8a2 2 0 0 1-.5 1.7l-1.1 1.1a14 14 0 0 0 6 6l1.1-1.1a2 2 0 0 1 1.7-.5l1.8.3a2 2 0 0 1 1.7 2v2a2 2 0 0 1-2 2h-.5A18.5 18.5 0 0 1 2.5 6v-.5Z"/></svg>
);
const MailIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16v16H4z"/><path d="m22 6-10 7L2 6"/></svg>
);
const StarIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2"><path d="M12 2 15.09 8.26 22 9.27 17 14.14l1.18 6.88L12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2Z"/></svg>
);
const HeartIcon = ({ className, filled = false }: { className?: string; filled?: boolean }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"/></svg>
);

// =============================
// Mock Data
// =============================

type Property = {
  id: string;
  title: string;
  address: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  type: 'House' | 'Condo' | 'Townhome' | 'Apartment' | 'Land';
  image: string;
  lat: number;
  lng: number;
  agentId: string;
  featured?: boolean;
  rating?: number;
};

type Agent = {
  id: string;
  name: string;
  title: string;
  phone: string;
  email: string;
  photo: string;
  rating: number;
  bio: string;
};

const AGENTS: Agent[] = [
  {
    id: 'a1',
    name: 'Ava Thompson',
    title: 'Principal Broker',
    phone: '(804) 555-1200',
    email: 'ava@rivercityrealty.com',
    photo: 'https://images.pexels.com/photos/8293766/pexels-photo-8293766.jpeg?_gl=1*194v7c6*_ga*MTM4NjEyMjYxMy4xNzU1ODc4OTU1*_ga_8JE65Q40S6*czE3NTczNDE0OTkkbzQkZzEkdDE3NTczNDE1NDYkajEzJGwwJGgw',
    rating: 4.9,
    bio: '15+ years in Richmond real estate with a focus on luxury and relocations.'
  },
  {
    id: 'a2',
    name: 'Marcus Lee',
    title: 'Buyer Specialist',
    phone: '(804) 555-3344',
    email: 'marcus@rivercityrealty.com',
    photo: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.8,
    bio: 'Neighborhood expert for Midlothian, Short Pump, and the Fan District.'
  },
  {
    id: 'a3',
    name: 'Sofia Garcia',
    title: 'Listing Agent',
    phone: '(804) 555-7788',
    email: 'sofia@rivercityrealty.com',
    photo: 'https://images.pexels.com/photos/7415107/pexels-photo-7415107.jpeg?_gl=1*danp6a*_ga*MTM4NjEyMjYxMy4xNzU1ODc4OTU1*_ga_8JE65Q40S6*czE3NTczNDE0OTkkbzQkZzEkdDE3NTczNDE5ODYkajM0JGwwJGgw',
    rating: 5.0,
    bio: 'Top-notch staging and marketing to net sellers more — faster.'
  }
];

const PROPERTIES: Property[] = [
  {
    id: 'p2',
    title: 'Downtown Skyline Condo',
    address: '900 Canal St, Richmond, VA',
    price: 389000,
    beds: 2,
    baths: 2,
    sqft: 1180,
    type: 'Condo',
    image: 'https://placehold.co/800x600/0ea5e9/ffffff.png?text=Skyline+Condo',
    lat: 37.5390,
    lng: -77.4380,
    agentId: 'a2',
    rating: 4.7
  },
  {
    id: 'p3',
    title: 'Family Townhome Near Parks',
    address: '45 Greenway Dr, Henrico, VA',
    price: 315000,
    beds: 3,
    baths: 2,
    sqft: 1600,
    type: 'Townhome',
    image: 'https://placehold.co/800x600/f59e0b/ffffff.png?text=Townhome',
    lat: 37.6170,
    lng: -77.4850,
    agentId: 'a3',
    rating: 4.8
  },
  {
    id: 'p4',
    title: 'Chic Apartment in the Fan',
    address: '1717 Monument Ave, Richmond, VA',
    price: 249500,
    beds: 1,
    baths: 1,
    sqft: 820,
    type: 'Apartment',
    image: 'https://placehold.co/800x600/8b5cf6/ffffff.png?text=Apartment',
    lat: 37.5547,
    lng: -77.4606,
    agentId: 'a2',
    rating: 4.6
  },
  {
    id: 'p5',
    title: 'Build-Ready Lot With Trees',
    address: '6000 River Rd, Richmond, VA',
    price: 189000,
    beds: 0,
    baths: 0,
    sqft: 0,
    type: 'Land',
    image: 'https://placehold.co/800x600/15803d/ffffff.png?text=Land+Lot',
    lat: 37.5590,
    lng: -77.5300,
    agentId: 'a1',
    rating: 4.5
  }
];



// =============================
// Utility helpers
// =============================
const currency = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

// =============================
// Page Component
// =============================
export default function RealEstateTemplatePage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // Filters
  const [q, setQ] = useState('Richmond, VA');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [beds, setBeds] = useState('');
  const [baths, setBaths] = useState('');
  const [ptype, setPtype] = useState('');
  const [sort, setSort] = useState<'new' | 'price_asc' | 'price_desc'>('new');

  const filtered = useMemo(() => {
    let items = [...PROPERTIES];
    if (minPrice) items = items.filter(p => p.price >= Number(minPrice));
    if (maxPrice) items = items.filter(p => p.price <= Number(maxPrice));
    if (beds) items = items.filter(p => p.beds >= Number(beds));
    if (baths) items = items.filter(p => p.baths >= Number(baths));
    if (ptype) items = items.filter(p => p.type === ptype as Property['type']);
    if (sort === 'price_asc') items.sort((a, b) => a.price - b.price);
    if (sort === 'price_desc') items.sort((a, b) => b.price - a.price);
    return items;
  }, [minPrice, maxPrice, beds, baths, ptype, sort]);

  const toggleFav = (id: string) => setFavorites(prev => ({ ...prev, [id]: !prev[id] }));

  const currentMapSrc = selectedProperty
    ? `https://www.google.com/maps?q=${encodeURIComponent(selectedProperty.address)}&output=embed`
    : `https://www.google.com/maps?q=${encodeURIComponent(q)}&output=embed`;

  return (
    <div className="bg-slate-50 text-slate-800">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur shadow-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-slate-900">
            <HomeIcon className="w-7 h-7 text-indigo-600" />
            RiverCity <span className="text-indigo-600">Realty</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#listings" className="hover:text-indigo-600">Listings</a>
            <a href="#agents" className="hover:text-indigo-600">Agents</a>
            <a href="#map" className="hover:text-indigo-600">Map</a>
            <a href="#contact" className="hover:text-indigo-600">Contact</a>
          </nav>
          <div className="hidden md:flex items-center gap-3">
            <a href="tel:804-555-2025" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white font-semibold hover:bg-black">
              <PhoneIcon className="w-5 h-5"/> (804) 555-2025
            </a>
          </div>
          <button className="md:hidden" onClick={() => setMobileOpen(v => !v)} aria-label="Menu">
            <MenuIcon className="w-7 h-7" />
          </button>
        </div>
        {mobileOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white">
            <div className="px-6 py-3 flex flex-col gap-3 text-sm">
              <a href="#listings" className="py-2">Listings</a>
              <a href="#agents" className="py-2">Agents</a>
              <a href="#map" className="py-2">Map</a>
              <a href="#contact" className="py-2">Contact</a>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0  bg-cover bg-center opacity-20"/>
           <video autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover z-0">
            <source src="/img/7646757-hd_1920_1080_25fps.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="container mx-auto px-6 py-16 md:py-24 relative">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900">
                Find your next <span className="text-indigo-600">home</span> in Richmond
              </h1>
              <p className="mt-4 text-lg text-slate-200">Property listings, expert agents, and neighborhood insights — all in one place.</p>
            </div>

            {/* Search Bar */}
            <div className="mt-8 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 md:p-6">
              <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
                <input value={q} onChange={e => setQ(e.target.value)} placeholder="City, address, ZIP" className="md:col-span-2 p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                <input value={minPrice} onChange={e => setMinPrice(e.target.value)} placeholder="Min price" inputMode="numeric" className="p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500"/>
                <input value={maxPrice} onChange={e => setMaxPrice(e.target.value)} placeholder="Max price" inputMode="numeric" className="p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500"/>
                <select value={beds} onChange={e => setBeds(e.target.value)} className="p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500">
                  <option value="">Beds</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                </select>
                <select value={baths} onChange={e => setBaths(e.target.value)} className="p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500">
                  <option value="">Baths</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                </select>
                <select value={ptype} onChange={e => setPtype(e.target.value)} className="p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500">
                  <option value="">Any type</option>
                  <option value="House">House</option>
                  <option value="Condo">Condo</option>
                  <option value="Townhome">Townhome</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Land">Land</option>
                </select>
                <select value={sort} onChange={e => setSort(e.target.value as 'new' | 'price_asc' | 'price_desc')} className="p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500">
                  <option value="new">Sort: Featured</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                </select>
              </div>
              <p className="mt-3 text-xs text-slate-500">* Demo search updates the map center; filter controls narrow the mock dataset below.</p>
            </div>
          </div>
        </section>

        {/* Featured strip */}
        <section className="bg-white border-y border-slate-200">
          <div className="container mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-2xl font-extrabold text-slate-900">1,500+</p>
              <p className="text-sm text-slate-600">Homes sold</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-900">$850M</p>
              <p className="text-sm text-slate-600">Total volume</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-900">4.9★</p>
              <p className="text-sm text-slate-600">Client rating</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-900">35</p>
              <p className="text-sm text-slate-600">Neighborhoods served</p>
            </div>
          </div>
        </section>

        {/* Listings */}
        <section id="listings" className="py-16 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="flex items-end justify-between gap-6 mb-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">Available Listings</h2>
                <p className="text-slate-600">Browse featured homes across Greater Richmond.</p>
              </div>
              <a href="#contact" className="hidden md:inline-block px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700">Get Pre‑Approved</a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filtered.map((p) => {
                const agent = AGENTS.find(a => a.id === p.agentId)!;
                const fav = !!favorites[p.id];
                return (
                  <article key={p.id} className="group bg-white rounded-2xl shadow ring-1 ring-slate-200 overflow-hidden hover:shadow-lg transition">
                    <div className="relative">
                      <Image src={p.image} alt={p.title} width={800} height={600} className="h-56 w-full object-cover" />
                      <button onClick={() => toggleFav(p.id)} aria-label="Save listing" className="absolute top-3 right-3 p-2 bg-white/90 rounded-full shadow hover:bg-white">
                        <HeartIcon className={`w-5 h-5 ${fav ? 'text-rose-600' : 'text-slate-700'}`} filled={fav} />
                      </button>
                      {p.featured && <span className="absolute left-3 top-3 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-600 text-white">Featured</span>}
                    </div>
                    <div className="p-5">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-700">{p.title}</h3>
                        <span className="text-indigo-700 font-extrabold">{currency(p.price)}</span>
                      </div>
                      <p className="mt-1 text-sm text-slate-600 flex items-center gap-2"><MapPinIcon className="w-4 h-4"/>{p.address}</p>
                      <div className="mt-3 flex items-center gap-4 text-slate-700">
                        <span className="inline-flex items-center gap-1 text-sm"><BedIcon className="w-4 h-4"/>{p.beds} bd</span>
                        <span className="inline-flex items-center gap-1 text-sm"><BathIcon className="w-4 h-4"/>{p.baths} ba</span>
                        <span className="inline-flex items-center gap-1 text-sm"><RulerIcon className="w-4 h-4"/>{p.sqft ? `${p.sqft.toLocaleString()} sqft` : '—'}</span>
                        <span className="inline-flex items-center gap-1 text-sm">{p.type}</span>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Image src={agent.photo} alt={agent.name} width={40} height={40} className="rounded-full object-cover" />
                          <div>
                            <p className="text-sm font-semibold text-slate-900">{agent.name}</p>
                            <p className="text-xs text-slate-600">{agent.title}</p>
                          </div>
                        </div>
                        <button onClick={() => setSelectedProperty(p)} className="px-3 py-2 rounded-xl text-sm font-semibold border border-slate-300 hover:border-indigo-500">View details</button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Map */}
        <section id="map" className="bg-white py-16">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div className="lg:w-2/3 w-full">
                <div className="rounded-2xl overflow-hidden shadow ring-1 ring-slate-200">
                  <iframe
                    src={currentMapSrc}
                    className="w-full h-[420px]"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <p className="text-xs text-slate-500 mt-2">Map centers on your search or the selected property.</p>
              </div>
              <div className="lg:w-1/3 w-full bg-slate-50 rounded-2xl border border-slate-200 p-6 shadow">
                <h3 className="text-xl font-extrabold text-slate-900">Neighborhood Insights</h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-700">
                  <li>• Walkable areas: The Fan, Museum District</li>
                  <li>• Top schools: Short Pump, Midlothian</li>
                  <li>• Commute: 10–25 mins to downtown</li>
                  <li>• Outdoor spots: Belle Isle, James River Park</li>
                </ul>
                <a href="#contact" className="mt-6 inline-flex items-center justify-center px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700">Ask an agent</a>
              </div>
            </div>
          </div>
        </section>

        {/* Agents */}
        <section id="agents" className="bg-slate-50 py-16">
          <div className="container mx-auto px-6">
            <div className="mb-10">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">Meet the Team</h2>
              <p className="text-slate-600">Richmond experts ready to guide your journey.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {AGENTS.map(a => (
                <div key={a.id} className="bg-white rounded-2xl shadow ring-1 ring-slate-200 overflow-hidden">
                  <Image src={a.photo} alt={a.name} width={600} height={400} className="h-56 w-full object-cover"/>
                  <div className="p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">{a.name}</h3>
                        <p className="text-sm text-slate-600">{a.title}</p>
                      </div>
                      <div className="flex items-center gap-1 text-amber-400" title={`${a.rating} out of 5`}>
                        <StarIcon className="w-5 h-5"/>
                        <span className="text-slate-800 font-semibold">{a.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-slate-700">{a.bio}</p>
                    <div className="mt-4 flex items-center gap-3 text-sm">
                      <a href={`tel:${a.phone.replace(/[^0-9]/g, '')}`} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-300 hover:border-indigo-500"><PhoneIcon className="w-4 h-4"/>{a.phone}</a>
                      <a href={`mailto:${a.email}`} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-300 hover:border-indigo-500"><MailIcon className="w-4 h-4"/>
                        Email</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="bg-indigo-600 text-white">
          <div className="container mx-auto px-6 py-16 text-center">
            <h2 className="text-3xl font-extrabold">Ready to tour a home?</h2>
            <p className="mt-2 text-indigo-100">We’ll schedule private showings and craft competitive offers.</p>
            <a href="#contact" className="mt-6 inline-block px-8 py-3 rounded-xl bg-white text-indigo-700 font-bold hover:bg-indigo-50">Schedule a Tour</a>
          </div>
        </section>

        {/* Contact / Lead Form */}
        <ContactForm selectedProperty={selectedProperty} clearSelected={() => setSelectedProperty(null)} />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">RiverCity Realty</h3>
              <p className="text-sm">Local experts serving Richmond, Henrico, Chesterfield, and beyond.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Buy</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#listings" className="hover:text-white">Search homes</a></li>
                <li><a href="#map" className="hover:text-white">Map view</a></li>
                <li><a href="#agents" className="hover:text-white">Find an agent</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Sell</h4>
              <ul className="space-y-2 text-sm">
                <li>Free home valuation</li>
                <li>Staging & marketing</li>
                <li>Offer negotiation</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li>Richmond, VA</li>
                <li>(804) 555-2025</li>
                <li>hello@rivercityrealty.com</li>
              </ul>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-slate-700 text-center text-sm">© {new Date().getFullYear()} RiverCity Realty. All rights reserved.</div>
        </div>
      </footer>

      {/* Property Modal */}
      {selectedProperty && (
        <PropertyModal property={selectedProperty} onClose={() => setSelectedProperty(null)} />)
      }
    </div>
  );
}

// =============================
// Contact Form Component
// =============================
function ContactForm({ selectedProperty, clearSelected }: { selectedProperty: Property | null; clearSelected: () => void; }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const defaultMsg = selectedProperty
    ? `Hi, I’m interested in ${selectedProperty.title} at ${selectedProperty.address}. Can we schedule a tour?`
    : 'Hi, I’d like to speak with an agent about buying or selling in Richmond.';

  React.useEffect(() => {
    setMessage(defaultMsg);
  }, [selectedProperty, defaultMsg]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');
    setTimeout(() => {
      setStatus('Thanks! An agent will reach out shortly.');
      setName(''); setEmail(''); setPhone(''); setMessage('');
      if (selectedProperty) clearSelected();
    }, 900);
  };

  return (
    <section id="contact" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-10 shadow-xl">
          <h2 className="text-3xl font-extrabold text-slate-900">Get in touch</h2>
          <p className="text-slate-600 mt-1">We’ll match you with the right agent and set up tours.</p>
          {selectedProperty && (
            <div className="mt-4 p-4 rounded-xl bg-white border border-slate-200">
              <p className="text-sm text-slate-500 mb-1">Inquiring about:</p>
              <div className="flex items-center gap-4">
                <Image src={selectedProperty.image} alt={selectedProperty.title} width={120} height={90} className="rounded-lg object-cover"/>
                <div>
                  <p className="font-semibold text-slate-900">{selectedProperty.title}</p>
                  <p className="text-sm text-slate-600">{selectedProperty.address}</p>
                </div>
              </div>
            </div>
          )}
          <form onSubmit={submit} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <input className="p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} required />
            <input className="p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500" placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            <input className="md:col-span-2 p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} required />
            <textarea className="md:col-span-2 p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500" rows={4} placeholder="Your message" value={message} onChange={e => setMessage(e.target.value)} required />
            <div className="md:col-span-2 flex items-center justify-between">
              <button type="submit" className="px-6 py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-black">Send message</button>
              {status && <p className="text-sm text-green-600 font-semibold">{status}</p>}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

// =============================
// Modal for property details
// =============================
function PropertyModal({ property, onClose }: { property: Property; onClose: () => void; }) {
  const agent = AGENTS.find(a => a.id === property.agentId)!;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <Image src={property.image} alt={property.title} width={800} height={600} className="h-64 md:h-full w-full object-cover"/>
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-extrabold text-slate-900">{property.title}</h3>
                <p className="text-slate-600 flex items-center gap-2 mt-1"><MapPinIcon className="w-4 h-4"/>{property.address}</p>
              </div>
              <button onClick={onClose} className="px-3 py-1 rounded-lg border border-slate-300 hover:bg-slate-50">Close</button>
            </div>
            <div className="mt-4 flex items-center gap-4 text-slate-700">
              <span className="inline-flex items-center gap-1 text-sm"><BedIcon className="w-4 h-4"/>{property.beds} bd</span>
              <span className="inline-flex items-center gap-1 text-sm"><BathIcon className="w-4 h-4"/>{property.baths} ba</span>
              <span className="inline-flex items-center gap-1 text-sm"><RulerIcon className="w-4 h-4"/>{property.sqft ? `${property.sqft.toLocaleString()} sqft` : '—'}</span>
              <span className="inline-flex items-center gap-1 text-sm">{property.type}</span>
            </div>
            <p className="mt-4 text-2xl font-extrabold text-indigo-700">{currency(property.price)}</p>
            <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <p className="text-sm text-slate-600 mb-2">Represented by</p>
              <div className="flex items-center gap-4">
                <Image src={agent.photo} alt={agent.name} width={48} height={48} className="rounded-full object-cover"/>
                <div className="flex-1">
                  <p className="font-semibold text-slate-900">{agent.name}</p>
                  <p className="text-xs text-slate-600">{agent.title} • {agent.rating.toFixed(1)}★</p>
                </div>
                <a href={`tel:${agent.phone.replace(/[^0-9]/g, '')}`} className="px-3 py-2 rounded-xl border border-slate-300 hover:border-indigo-500 text-sm">Call</a>
                <a href={`mailto:${agent.email}`} className="px-3 py-2 rounded-xl border border-slate-300 hover:border-indigo-500 text-sm">Email</a>
              </div>
            </div>
            <div className="mt-6">
              <h4 className="font-bold text-slate-900">Overview</h4>
              <ul className="mt-2 grid grid-cols-2 gap-2 text-sm text-slate-700">
                <li>• Built: 2016</li>
                <li>• Lot: 0.24 ac</li>
                <li>• HOA: $85/mo</li>
                <li>• Parking: 2‑car garage</li>
              </ul>
            </div>
            <a href="#contact" className="mt-6 inline-flex items-center justify-center px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700">Request a Tour</a>
          </div>
        </div>
      </div>
    </div>
  );
}
