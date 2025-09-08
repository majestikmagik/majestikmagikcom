// File: app/page.tsx
// A complete, enterprise-grade website template for a high-end restaurant.
// Built as a single-file Next.js page using TypeScript and Tailwind CSS.

'use client';

import React, { useState, useEffect } from 'react';
import { Playfair_Display, Lato } from 'next/font/google';
import { PhoneIcon, ClockIcon, MapPinIcon, ChevronDownIcon } from 'lucide-react';

// --- Font Configuration ---
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '800'],
  display: 'swap',
  variable: '--font-playfair',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  display: 'swap',
  variable: '--font-lato',
});


// --- Data Structures (Simulating a CMS) ---
const menuData = {
  dinner: [
    { category: "Appetizers", items: [
      { name: "Seared Scallops", price: "24", description: "With saffron risotto and a lemon-butter emulsion." },
      { name: "Foie Gras Torchon", price: "28", description: "Served with fig jam, brioche toast points, and aged balsamic." },
      { name: "Virginia Ham & Cheese Board", price: "22", description: "A selection of local artisanal cheeses and Edwards Surryano ham." },
    ]},
    { category: "Main Courses", items: [
      { name: "Pan-Seared Duck Breast", price: "42", description: "Cherry reduction sauce, sweet potato purée, and grilled asparagus." },
      { name: "Filet Mignon", price: "58", description: "8oz center-cut, served with truffle mashed potatoes and a red wine demi-glace." },
      { name: "Blackened Rockfish", price: "39", description: "Locally caught, served over a bed of corn maque choux and topped with lump crab." },
    ]},
  ],
  brunch: [
    { category: "Starters", items: [
        { name: "Avocado Toast", price: "18", description: "With heirloom tomatoes, feta, and a balsamic glaze on sourdough." },
        { name: "Yogurt Parfait", price: "14", description: "Greek yogurt, house-made granola, and seasonal berries." },
    ]},
    { category: "Mains", items: [
        { name: "Lobster Benedict", price: "29", description: "Poached eggs and butter-poached lobster on an English muffin with hollandaise." },
        { name: "Chicken & Waffles", price: "25", description: "Crispy fried chicken with a Belgian waffle and bourbon-maple syrup." },
    ]},
  ],
  wine: [
    { category: "By the Glass", items: [
        { name: "Sauvignon Blanc, Napa", price: "16", description: "Crisp, notes of grapefruit and lime." },
        { name: "Pinot Noir, Willamette Valley", price: "18", description: "Elegant, with hints of cherry and earth." },
    ]},
  ]
};

const galleryImages = [
    'https://placehold.co/600x800/1a1a1a/c4b59d?text=Plated+Dish&font=playfair',
    'https://placehold.co/600x400/1a1a1a/c4b59d?text=Cocktail&font=playfair',
    'https://placehold.co/600x400/1a1a1a/c4b59d?text=Interior&font=playfair',
    'https://placehold.co/600x800/1a1a1a/c4b59d?text=Chef+at+Work&font=playfair',
];

// --- Main Page Component ---
export default function RestaurantPage() {
  const [activeMenu, setActiveMenu] = useState<'dinner' | 'brunch' | 'wine'>('dinner');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`bg-stone-50 text-slate-700 ${playfair.variable} ${lato.variable} font-lato`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 shadow-md backdrop-blur-lg' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#" className="text-3xl font-playfair font-bold text-slate-900">The Gilded Spoon</a>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#menu" className="text-slate-600 hover:text-amber-700 transition-colors">Menu</a>
            <a href="#about" className="text-slate-600 hover:text-amber-700 transition-colors">Our Story</a>
            <a href="#events" className="text-slate-600 hover:text-amber-700 transition-colors">Private Dining</a>
            <a href="#contact" className="text-slate-600 hover:text-amber-700 transition-colors">Contact</a>
          </nav>
          <a href="#reservations" className="hidden md:block px-6 py-2 bg-slate-900 text-white font-bold rounded-full shadow-lg hover:bg-slate-700 transition-all transform hover:scale-105">
            Make a Reservation
          </a>
          <button className="md:hidden text-slate-900">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
          </button>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center text-white text-center">
          <video autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover z-0">
            <source src="/img/restaurant_hero.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <div className="relative z-20 p-6">
            <h1 className="text-5xl md:text-7xl font-playfair font-extrabold leading-tight mb-4">
              An Unforgettable Richmond Dining Experience
            </h1>
            <p className="text-lg md:text-xl text-stone-200 max-w-3xl mx-auto mb-8 font-lato">
              Where modern culinary artistry meets timeless Virginian hospitality.
            </p>
            <a href="#reservations" className="px-10 py-4 bg-amber-500 text-slate-900 font-bold rounded-full shadow-2xl hover:bg-amber-400 transition-all transform hover:scale-105 text-lg">
              Reserve Your Table
            </a>
          </div>
          <div className="absolute bottom-10 z-20 animate-bounce">
            <ChevronDownIcon className="w-8 h-8 text-white/70" />
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 bg-white">
            <div className="container mx-auto px-6 max-w-4xl text-center">
                <h2 className="text-4xl md:text-5xl font-playfair font-bold text-slate-900 mb-6">A Taste of Virginia</h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                    The Gilded Spoon was born from a passion for showcasing the rich bounty of Virginia&apos;s farms and waters. Our chef partners with local purveyors to craft a menu that is both innovative and deeply rooted in Southern tradition. We believe in elegant simplicity, allowing the quality of our ingredients to shine through in every dish.
                </p>
            </div>
        </section>

        {/* Menu Section */}
        <section id="menu" className="py-24 bg-stone-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-playfair font-bold text-slate-900">Our Menu</h2>
              <div className="mt-6 border border-slate-200 inline-flex rounded-full p-1 bg-white shadow-sm">
                <button onClick={() => setActiveMenu('dinner')} className={`px-6 py-2 rounded-full font-semibold transition-colors ${activeMenu === 'dinner' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:bg-stone-100'}`}>Dinner</button>
                <button onClick={() => setActiveMenu('brunch')} className={`px-6 py-2 rounded-full font-semibold transition-colors ${activeMenu === 'brunch' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:bg-stone-100'}`}>Brunch</button>
                <button onClick={() => setActiveMenu('wine')} className={`px-6 py-2 rounded-full font-semibold transition-colors ${activeMenu === 'wine' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:bg-stone-100'}`}>Wine List</button>
              </div>
            </div>
            <div className="max-w-4xl mx-auto">
              {menuData[activeMenu].map(category => (
                <div key={category.category} className="mb-10">
                  <h3 className="text-3xl font-playfair font-bold text-amber-800 mb-6 border-b-2 border-amber-200 pb-2">{category.category}</h3>
                  <div className="space-y-6">
                    {category.items.map(item => (
                      <div key={item.name}>
                        <div className="flex justify-between items-baseline">
                          <h4 className="text-xl font-bold text-slate-800">{item.name}</h4>
                          <p className="text-xl font-semibold text-slate-800">${item.price}</p>
                        </div>
                        <p className="text-slate-500">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Gallery Section */}
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-5xl font-playfair font-bold text-slate-900">The Ambiance</h2>
                    <p className="text-lg text-slate-600 mt-2">An intimate setting for memorable moments.</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="grid gap-4">
                        <img className="h-auto max-w-full rounded-lg shadow-lg" src={galleryImages[0]} alt="Plated dish" />
                        <img className="h-auto max-w-full rounded-lg shadow-lg" src={galleryImages[1]} alt="Cocktail" />
                    </div>
                    <div className="grid gap-4">
                        <img className="h-auto max-w-full rounded-lg shadow-lg" src={galleryImages[2]} alt="Restaurant interior" />
                        <img className="h-auto max-w-full rounded-lg shadow-lg" src={galleryImages[3]} alt="Chef at work" />
                    </div>
                    <div className="grid gap-4">
                        <img className="h-auto max-w-full rounded-lg shadow-lg" src="https://placehold.co/600x800/1a1a1a/c4b59d?text=Wine+Cellar&font=playfair" alt="Wine cellar" />
                        <img className="h-auto max-w-full rounded-lg shadow-lg" src="https://placehold.co/600x400/1a1a1a/c4b59d?text=Dining+Table&font=playfair" alt="Dining table setting" />
                    </div>
                     <div className="grid gap-4">
                        <img className="h-auto max-w-full rounded-lg shadow-lg" src="https://placehold.co/600x400/1a1a1a/c4b59d?text=Dessert&font=playfair" alt="Dessert plating" />
                        <img className="h-auto max-w-full rounded-lg shadow-lg" src="https://placehold.co/600x800/1a1a1a/c4b59d?text=Entrance&font=playfair" alt="Restaurant entrance" />
                    </div>
                </div>
            </div>
        </section>

        {/* Private Events Section */}
        <section id="events" className="py-24 bg-stone-50">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="md:w-1/2">
                        <h2 className="text-5xl font-playfair font-bold text-slate-900 mb-4">Private Dining & Events</h2>
                        <p className="text-lg text-slate-600 mb-8">
                            Host your next celebration or corporate event in one of our elegant private dining spaces. Our team will work with you to create a custom menu and experience tailored to your needs.
                        </p>
                        <a href="#" className="px-8 py-3 bg-slate-800 text-white font-bold rounded-full shadow-lg hover:bg-slate-700 transition-all transform hover:scale-105">
                            Inquire About Events
                        </a>
                    </div>
                    <div className="md:w-1/2">
                        <img src="https://placehold.co/600x500/1a1a1a/c4b59d?text=Private+Dining+Room&font=playfair" alt="Elegant private dining room" className="rounded-lg shadow-2xl" />
                    </div>
                </div>
            </div>
        </section>

        {/* Reservations CTA */}
        <section id="reservations" className="bg-amber-500">
            <div className="container mx-auto px-6 py-20 text-center">
                <h2 className="text-4xl md:text-5xl font-playfair font-bold text-slate-900 mb-4">Reserve Your Experience</h2>
                <p className="text-lg text-slate-800 mb-8 max-w-2xl mx-auto">We recommend booking in advance. For parties larger than six, please call us directly.</p>
                {/* Placeholder for an OpenTable/Resy widget */}
                <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-2xl">
                    <p className="font-semibold">Reservation system (e.g., OpenTable) would be embedded here.</p>
                    <button className="w-full mt-4 px-8 py-3 bg-slate-900 text-white font-bold rounded-full shadow-lg hover:bg-slate-700 transition-all">
                        Find a Table
                    </button>
                </div>
            </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contact" className="bg-slate-900 text-stone-300">
        <div className="container mx-auto px-6 py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                <div className="md:col-span-1">                    
                    <h3 className="text-2xl font-playfair font-bold text-white mb-4">The Gilded Spoon</h3>
                    <p className="text-sm">Modern American Cuisine in the heart of Richmond, VA.</p>
                </div>
                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <MapPinIcon className="w-6 h-6 text-white mb-2" />
                        <h4 className="font-bold text-white mb-4">Location</h4>
                        <address className="text-sm not-italic space-y-2">
                            <p>123 W Broad St</p>
                            <p>Richmond, VA 23220</p>
                        </address>
                    </div>
                    <div>
                        <ClockIcon className="w-6 h-6 text-white mb-2" />
                        <h4 className="font-bold text-white mb-4">Hours</h4>
                        <ul className="text-sm space-y-2">
                            <li>Brunch: Sat & Sun 10am - 2pm</li>
                            <li>Dinner: Tue - Sun 5pm - 10pm</li>
                        </ul>
                    </div>
                    <div>
                        <PhoneIcon className="w-6 h-6 text-white mb-2" />
                        <h4 className="font-bold text-white mb-4">Contact</h4>
                        <p className="text-sm">Phone: (123) 456-7890</p>
                        <p className="text-sm">Email: Yv1n6@example.com</p>
                    </div>
                </div>
            </div>
            <div className="mt-12 border-t border-slate-700 pt-8 text-center text-sm text-slate-400">
                <p>&copy; {new Date().getFullYear()} The Gilded Spoon. All Rights Reserved.</p>
            </div>
        </div>
      </footer>
    </div>
  );
}
