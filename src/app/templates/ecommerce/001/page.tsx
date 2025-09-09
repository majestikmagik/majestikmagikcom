'use client';

import React from 'react';
import Image from 'next/image';

// =====================================================
// Icons
// =====================================================
const BagIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 7l1-3h10l1 3"/><path d="M3 7h18l-1.5 13a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2L3 7Z"/><path d="M8 11a4 4 0 0 0 8 0"/></svg>
);
const SearchIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
);
const MailIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
);
const TagIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41 12 22l-9.41-9.41A2 2 0 0 1 2 11.17V4a2 2 0 0 1 2-2h7.17a2 2 0 0 1 1.41.59l8.01 8.01a2 2 0 0 1 0 2.83Z"/><circle cx="7.5" cy="7.5" r="1.5"/></svg>
);
const TruckIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 17h4"/><path d="M3 7h13v10H3z"/><path d="M16 13h4l1 2v2h-5z"/><circle cx="7.5" cy="17.5" r="1.5"/><circle cx="17.5" cy="17.5" r="1.5"/></svg>
);
const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
);

// =====================================================
// Types & Mock Data
// =====================================================

type Category = 'Home' | 'Kitchen' | 'Accessories' | 'Plants' | 'Stationery' | 'Art';

type Product = {
  id: string; title: string; price: number; compareAt?: number; image: string; category: Category; badge?: string;
};

type CartItem = { id: string; qty: number };

type Coupon = { code: string; pct: number };

const PRODUCTS: Product[] = [
  { id: 'p1', title: 'Hand‑Poured Soy Candle', price: 24, compareAt: 29, category: 'Home', image: 'https://placehold.co/900x900/f0fdf4/0f172a.jpg?text=Soy+Candle', badge: 'Bestseller' },
  { id: 'p2', title: 'Minimalist Mug — 12oz', price: 18, category: 'Kitchen', image: 'https://placehold.co/900x900/fafaf9/0f172a.jpg?text=Minimal+Mug' },
  { id: 'p3', title: 'Linen Apron', price: 38, category: 'Kitchen', image: 'https://placehold.co/900x900/f5f5f4/0f172a.jpg?text=Linen+Apron', badge: 'New' },
  { id: 'p4', title: 'Organic Cotton Tote', price: 22, category: 'Accessories', image: 'https://placehold.co/900x900/eff6ff/0f172a.jpg?text=Cotton+Tote' },
  { id: 'p5', title: 'Desk Plant — Pothos', price: 16, category: 'Plants', image: 'https://placehold.co/900x900/ecfeff/0f172a.jpg?text=Desk+Plant' },
  { id: 'p6', title: 'Notebook Trio', price: 14, category: 'Stationery', image: 'https://placehold.co/900x900/fff7ed/0f172a.jpg?text=Notebook+Set' },
  { id: 'p7', title: 'Ceramic Vase', price: 42, category: 'Home', image: 'https://placehold.co/900x900/fef9c3/0f172a.jpg?text=Ceramic+Vase' },
  { id: 'p8', title: 'Pour‑Over Coffee Kit', price: 89, category: 'Kitchen', image: 'https://placehold.co/900x900/ede9fe/0f172a.jpg?text=Coffee+Kit', badge: 'Giftable' },
  { id: 'p9', title: 'Gallery Art Print — A3', price: 29, category: 'Art', image: 'https://placehold.co/900x900/ffedd5/0f172a.jpg?text=Art+Print' },
];

const COUPONS: Coupon[] = [ { code: 'WELCOME10', pct: 10 } ];

// Free shipping threshold
const FREE_SHIP_AT = 75;

// =====================================================
// Helpers
// =====================================================
const currency = (n: number) => n.toLocaleString('en-US', { style:'currency', currency:'USD', maximumFractionDigits: 0 });

function findProduct(id: string) { return PRODUCTS.find(p => p.id === id)!; }

// =====================================================
// Page
// =====================================================
export default function EcommerceLeadGenTemplatePage() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [cartOpen, setCartOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [category, setCategory] = React.useState<Category | 'All'>('All');
  const [cart, setCart] = React.useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try { return JSON.parse(localStorage.getItem('cart') || '[]'); } catch { return []; }
  });
  const [coupon, setCoupon] = React.useState<string>(() => (typeof window !== 'undefined' ? (localStorage.getItem('coupon') || '') : ''));
  const [showSignup, setShowSignup] = React.useState(false);
  const [subscribed, setSubscribed] = React.useState<boolean>(() => (typeof window !== 'undefined' ? localStorage.getItem('subscribed') === 'true' : false));
  const [checkoutStep, setCheckoutStep] = React.useState<1|2|3>(1);
  const [orderStatus, setOrderStatus] = React.useState('');

  React.useEffect(() => { if (typeof window !== 'undefined') localStorage.setItem('cart', JSON.stringify(cart)); }, [cart]);
  React.useEffect(() => { if (typeof window !== 'undefined') localStorage.setItem('coupon', coupon); }, [coupon]);
  React.useEffect(() => {
    const t = setTimeout(() => { if (!subscribed) setShowSignup(true); }, 2500);
    return () => clearTimeout(t);
  }, [subscribed]);

  const items = React.useMemo(() => {
    const list = PRODUCTS.filter(p => (category==='All' || p.category===category) && (p.title.toLowerCase().includes(query.toLowerCase())));
    return list;
  }, [category, query]);

  const add = (id: string) => setCart(prev => {
    const ex = prev.find(i => i.id === id);
    if (ex) return prev.map(i => i.id===id ? { ...i, qty: Math.min(99, i.qty+1) } : i);
    return [...prev, { id, qty: 1 }];
  });
  const dec = (id: string) => setCart(prev => prev.map(i => i.id===id ? { ...i, qty: Math.max(1, i.qty-1) } : i));
  const remove = (id: string) => setCart(prev => prev.filter(i => i.id !== id));
  const clear = () => setCart([]);

  const subtotal = React.useMemo(() => cart.reduce((s,i)=> s + findProduct(i.id).price * i.qty, 0), [cart]);
  const discountPct = (COUPONS.find(c => c.code.toUpperCase() === coupon.trim().toUpperCase())?.pct || 0);
  const discount = Math.round(subtotal * (discountPct/100));
  const shipping = subtotal - discount >= FREE_SHIP_AT || subtotal===0 ? 0 : 6;
  const total = Math.max(0, subtotal - discount + shipping);

  const checkout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    if (checkoutStep < 3) { setCheckoutStep((s)=> (s+1) as 1|2|3); return; }
    setOrderStatus('Placing order…');
    setTimeout(() => { setOrderStatus('Order received! #RC-' + Math.floor(100000 + Math.random()*899999)); clear(); setCheckoutStep(1); setCartOpen(false); }, 1000);
  };

  const categories: (Category | 'All')[] = ['All','Home','Kitchen','Accessories','Plants','Stationery','Art'];

  return (
    <div className="bg-gradient-to-b from-rose-50 via-orange-50 to-amber-50 min-h-screen text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur bg-white/80 border-b border-amber-100">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 text-2xl font-black tracking-tight">
            <TagIcon className="w-7 h-7 text-rose-600"/>
            RiverCity <span className="text-rose-600">Shop</span>
          </a>
          <div className="hidden md:flex items-center gap-3">
            <div className="relative">
              <SearchIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
              <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search products" className="pl-9 pr-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-rose-500 bg-white w-72"/>
            </div>
            <button onClick={()=>setCartOpen(true)} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white font-semibold hover:bg-black"><BagIcon className="w-5 h-5"/> Cart ({cart.reduce((s,i)=>s+i.qty,0)})</button>
          </div>
          <button className="md:hidden" onClick={()=>setMobileOpen(v=>!v)} aria-label="Menu">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
        </div>
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-amber-100">
            <div className="px-6 py-3 flex flex-col gap-3">
              <div className="relative">
                <SearchIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
                <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search products" className="pl-9 pr-3 py-2 rounded-xl border border-slate-300 bg-white w-full"/>
              </div>
              <button onClick={()=>setCartOpen(true)} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white font-semibold"><BagIcon className="w-5 h-5"/> Cart ({cart.reduce((s,i)=>s+i.qty,0)})</button>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* Hero - creative split with lead magnet */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-24 -left-24 h-60 w-60 bg-rose-300/30 blur-3xl rounded-full"/>
            <div className="absolute -bottom-24 -right-24 h-80 w-80 bg-amber-300/30 blur-3xl rounded-full"/>
          </div>
          <div className="container mx-auto px-6 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.05]">Small shop, big vibes.</h1>
              <p className="mt-4 text-lg text-slate-700 max-w-xl">Thoughtfully curated goods for home, desk, and daily rituals. Hand‑picked, planet‑kind.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#catalog" className="px-5 py-3 rounded-2xl bg-rose-600 text-white font-semibold hover:bg-rose-700">Shop new arrivals</a>
                <a href="#signup" className="px-5 py-3 rounded-2xl border border-slate-300 hover:border-rose-600">Get 10% off</a>
              </div>
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="p-4 rounded-2xl bg-white/70 border border-amber-100"><p className="text-2xl font-extrabold">4.9★</p><p className="text-xs text-slate-600">Reviews</p></div>
                <div className="p-4 rounded-2xl bg-white/70 border border-amber-100"><p className="text-2xl font-extrabold">$75+</p><p className="text-xs text-slate-600">Free shipping</p></div>
                <div className="p-4 rounded-2xl bg-white/70 border border-amber-100"><p className="text-2xl font-extrabold">48 hr</p><p className="text-xs text-slate-600">Dispatch</p></div>
                <div className="p-4 rounded-2xl bg-white/70 border border-amber-100"><p className="text-2xl font-extrabold">Eco</p><p className="text-xs text-slate-600">Packaging</p></div>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl ring-1 ring-amber-100">
                <Image src="https://placehold.co/1400x1000/ffe4e6/0f172a.jpg?text=Your+Products+Here" alt="Featured products" width={1400} height={1000} className="object-cover" />
              </div>
              <div id="signup" className="absolute -bottom-8 -right-4 bg-white/90 backdrop-blur rounded-2xl shadow-xl ring-1 ring-amber-100 w-[min(100%,22rem)]">
                <div className="p-4">
                  <p className="text-sm font-semibold flex items-center gap-2"><MailIcon className="w-4 h-4 text-rose-600"/> Get 10% off your first order</p>
                  <LeadCapture onCoupon={(code)=>{ setCoupon(code); setSubscribed(true); localStorage.setItem('subscribed','true'); }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Catalog controls */}
        <section id="catalog" className="py-4">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-slate-600">Category:</span>
                <div className="flex flex-wrap gap-2">
                  {categories.map(c => (
                    <button key={c} onClick={()=>setCategory(c)} className={`px-3 py-1.5 rounded-full border text-sm ${category===c ? 'border-rose-700 bg-rose-50 text-rose-800' : 'border-slate-300 hover:border-rose-600'}`}>{c}</button>
                  ))}
                </div>
              </div>
              <div className="ml-auto hidden md:block text-sm text-slate-600">{items.length} products</div>
            </div>
          </div>
        </section>

        {/* Product grid */}
        <section className="pb-16">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map(p => (
                <article key={p.id} className="group bg-white rounded-2xl overflow-hidden shadow ring-1 ring-amber-100 hover:shadow-lg">
                  <div className="relative">
                    <Image src={p.image} alt={p.title} width={900} height={900} className="w-full h-auto object-cover" />
                    {p.badge && <span className="absolute left-3 top-3 px-2 py-1 rounded-full text-xs font-semibold bg-rose-600 text-white">{p.badge}</span>}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-slate-900 group-hover:text-rose-700">{p.title}</h3>
                    <div className="mt-1 flex items-center gap-2">
                      <p className="font-bold">{currency(p.price)}</p>
                      {p.compareAt && <p className="text-sm text-slate-500 line-through">{currency(p.compareAt)}</p>}
                    </div>
                    <div className="mt-3 flex items-center gap-3 text-sm">
                      <button onClick={()=>{ add(p.id); setCartOpen(true); }} className="px-4 py-2 rounded-xl bg-slate-900 text-white font-semibold hover:bg-black">Add to cart</button>
                      <button onClick={()=>add(p.id)} className="px-4 py-2 rounded-xl border border-slate-300 hover:border-rose-600">Quick add</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial strip */}
        <section className="bg-white/70 border-y border-amber-100 py-10">
          <div className="container mx-auto px-6 text-center">
            <blockquote className="text-xl md:text-2xl font-semibold text-slate-800">
              “Beautiful curation and fast shipping — it felt like a boutique, online.”
            </blockquote>
            <p className="mt-2 text-sm text-slate-600">— Jordan P.</p>
          </div>
        </section>

        {/* Perks */}
        <section className="py-12">
          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-white/70 border border-amber-100"><TruckIcon className="w-6 h-6 mx-auto text-rose-600"/><h4 className="font-bold mt-2">Free shipping $75+</h4><p className="text-sm text-slate-600">Flat $6 otherwise.</p></div>
            <div className="p-6 rounded-2xl bg-white/70 border border-amber-100"><TagIcon className="w-6 h-6 mx-auto text-rose-600"/><h4 className="font-bold mt-2">10% welcome code</h4><p className="text-sm text-slate-600">Join the list & save.</p></div>
            <div className="p-6 rounded-2xl bg-white/70 border border-amber-100"><BagIcon className="w-6 h-6 mx-auto text-rose-600"/><h4 className="font-bold mt-2">Easy returns</h4><p className="text-sm text-slate-600">30‑day window.</p></div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white text-slate-600">
        <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <p className="text-xl font-black text-slate-900">RiverCity Shop</p>
            <p className="text-sm mt-2">Curated goods for home and everyday. Richmond, VA.</p>
          </div>
          <div>
            <h5 className="font-semibold text-slate-900">Shop</h5>
            <ul className="mt-2 space-y-1 text-sm">
              <li><a href="#catalog" className="hover:text-rose-700">New arrivals</a></li>
              <li><a href="#catalog" className="hover:text-rose-700">Gifts</a></li>
              <li><a href="#catalog" className="hover:text-rose-700">All products</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-slate-900">Support</h5>
            <ul className="mt-2 space-y-1 text-sm">
              <li>Shipping & returns</li>
              <li>Contact</li>
              <li>FAQs</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-slate-900">Join the list</h5>
            <LeadCapture onCoupon={(code)=>{ setCoupon(code); setSubscribed(true); localStorage.setItem('subscribed','true'); }} compact />
          </div>
        </div>
        <div className="py-4 text-center text-xs border-t border-amber-100">© {new Date().getFullYear()} RiverCity Shop</div>
      </footer>

      {/* Cart Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-[60]">
          <div className="absolute inset-0 bg-black/50" onClick={()=>setCartOpen(false)} />
          <aside className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl border-l border-amber-100 flex flex-col">
            <div className="p-4 border-b border-amber-100 flex items-center justify-between">
              <h3 className="text-lg font-bold">Your cart</h3>
              <button onClick={()=>setCartOpen(false)} aria-label="Close"><XIcon className="w-6 h-6"/></button>
            </div>
            <div className="flex-1 overflow-auto">
              {cart.length === 0 ? (
                <div className="p-6 text-sm text-slate-600">Your cart is empty.</div>
              ) : (
                <ul className="divide-y divide-amber-100">
                  {cart.map(i => {
                    const p = findProduct(i.id);
                    return (
                      <li key={i.id} className="p-4 flex gap-3 items-center">
                        <Image src={p.image} alt={p.title} width={96} height={96} className="rounded-xl object-cover" />
                        <div className="flex-1">
                          <p className="font-semibold text-slate-900">{p.title}</p>
                          <p className="text-sm text-slate-600">{currency(p.price)}</p>
                          <div className="mt-2 inline-flex items-center gap-2 border border-slate-300 rounded-xl">
                            <button onClick={()=>dec(i.id)} className="px-2">−</button>
                            <span className="px-2 text-sm">{i.qty}</span>
                            <button onClick={()=>add(i.id)} className="px-2">+</button>
                          </div>
                        </div>
                        <button onClick={()=>remove(i.id)} className="text-sm text-rose-700 hover:underline">Remove</button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
            <div className="p-4 border-t border-amber-100 space-y-3">
              <div className="flex items-center gap-2">
                <input value={coupon} onChange={(e)=>setCoupon(e.target.value)} placeholder="Promo code" className="flex-1 p-2 rounded-xl border border-slate-300" />
                <button onClick={()=>{ /* code auto-applies via state */ }} className="px-3 py-2 rounded-xl border border-slate-300 hover:border-rose-600">Apply</button>
              </div>
              <div className="text-sm space-y-1">
                <div className="flex justify-between"><span>Subtotal</span><span>{currency(subtotal)}</span></div>
                <div className="flex justify-between"><span>Discount {discountPct?`(${discountPct}%)`:''}</span><span className={discount>0? 'text-rose-700':'text-slate-500'}>-{currency(discount)}</span></div>
                <div className="flex justify-between"><span>Shipping</span><span>{shipping===0? 'FREE' : currency(shipping)}</span></div>
                <div className="flex justify-between font-bold text-slate-900 border-t border-amber-100 pt-2"><span>Total</span><span>{currency(total)}</span></div>
                {subtotal - discount < FREE_SHIP_AT && subtotal>0 && (
                  <p className="text-xs text-slate-600">Add {currency(FREE_SHIP_AT - (subtotal - discount))} for free shipping.</p>
                )}
              </div>

              {/* Checkout steps */}
              {cart.length>0 && (
                <form onSubmit={checkout} className="space-y-2 text-sm">
                  {checkoutStep===1 && (
                    <div className="grid grid-cols-1 gap-2">
                      <input required placeholder="Email for order updates" className="p-2 rounded-xl border border-slate-300" />
                      <button type="submit" className="px-4 py-2 rounded-xl bg-slate-900 text-white font-semibold">Continue to shipping</button>
                    </div>
                  )}
                  {checkoutStep===2 && (
                    <div className="grid grid-cols-1 gap-2">
                      <input required placeholder="Full name" className="p-2 rounded-xl border border-slate-300" />
                      <input required placeholder="Address" className="p-2 rounded-xl border border-slate-300" />
                      <div className="grid grid-cols-2 gap-2">
                        <input required placeholder="City" className="p-2 rounded-xl border border-slate-300" />
                        <input required placeholder="ZIP" className="p-2 rounded-xl border border-slate-300" />
                      </div>
                      <button type="submit" className="px-4 py-2 rounded-xl bg-slate-900 text-white font-semibold">Continue to payment</button>
                    </div>
                  )}
                  {checkoutStep===3 && (
                    <div className="grid grid-cols-1 gap-2">
                      <input required placeholder="Card number (mock)" className="p-2 rounded-xl border border-slate-300" />
                      <div className="grid grid-cols-2 gap-2">
                        <input required placeholder="MM/YY" className="p-2 rounded-xl border border-slate-300" />
                        <input required placeholder="CVC" className="p-2 rounded-xl border border-slate-300" />
                      </div>
                      <button type="submit" className="px-4 py-2 rounded-xl bg-rose-600 text-white font-semibold hover:bg-rose-700">Place order</button>
                      {orderStatus && <p className="text-rose-700 font-semibold">{orderStatus}</p>}
                    </div>
                  )}
                </form>
              )}
            </div>
          </aside>
        </div>
      )}

      {/* Email signup modal (timed) */}
      {showSignup && !subscribed && (
        <div className="fixed inset-0 z-[70]">
          <div className="absolute inset-0 bg-black/50" onClick={()=>setShowSignup(false)} />
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <div className="bg-white rounded-3xl shadow-2xl ring-1 ring-amber-100 w-full max-w-lg overflow-hidden">
              <div className="p-6 md:p-8">
                <p className="text-sm font-semibold text-rose-700 flex items-center gap-2"><MailIcon className="w-4 h-4"/> Welcome offer</p>
                <h3 className="text-2xl font-black mt-1">Get 10% off your first order</h3>
                <p className="text-sm text-slate-600">Join our list for early drops and exclusive promos. We’ll email your code.</p>
                <div className="mt-4">
                  <LeadCapture onCoupon={(code)=>{ setCoupon(code); setSubscribed(true); setShowSignup(false); localStorage.setItem('subscribed','true'); }} />
                </div>
                <button onClick={()=>setShowSignup(false)} className="mt-3 text-xs text-slate-500 underline">Maybe later</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// =====================================================
// Lead capture component (returns code)
// =====================================================
function LeadCapture({ onCoupon, compact }: { onCoupon: (code: string)=>void; compact?: boolean }) {
  const [email, setEmail] = React.useState('');
  const [status, setStatus] = React.useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setStatus('Enter a valid email.'); return; }
    setStatus('Sending…');
    setTimeout(()=>{ setStatus('Welcome! Code: WELCOME10'); onCoupon('WELCOME10'); setEmail(''); }, 700);
  };

  if (compact) return (
    <form onSubmit={submit} className="mt-2 flex items-center gap-2">
      <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Your email" className="flex-1 p-2 rounded-xl border border-slate-300" />
      <button className="px-3 py-2 rounded-xl bg-rose-600 text-white font-semibold">Join</button>
      {status && <p className="text-xs text-rose-700 ml-2">{status}</p>}
    </form>
  );

  return (
    <form onSubmit={submit} className="mt-2 grid grid-cols-1 gap-2">
      <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Your email" className="p-3 rounded-xl border border-slate-300 bg-white" />
      <button className="px-4 py-2 rounded-xl bg-slate-900 text-white font-semibold">Get code</button>
      {status && <p className="text-xs text-rose-700">{status}</p>}
    </form>
  );
}
