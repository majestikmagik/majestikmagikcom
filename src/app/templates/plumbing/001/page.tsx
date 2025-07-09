// File: app/page.tsx
// This is a complete, high-quality website template for a local plumbing service.
// It's built as a single-file Next.js page using TypeScript and Tailwind CSS.

'use client';

import React, { useState } from 'react';
// FIX: Removed 'next/font/google' import to resolve build error.
// The app will now use the default system font stack.

// --- Helper Icon Components ---
// In a real project, these would be in separate files (e.g., app/components/Icons.tsx)

const WrenchIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
);
const DropletIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>
);
const ZapIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
);
const SearchIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
);
const StarIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
);
const CheckCircleIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
);
const PhoneIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);

// --- Page Component ---

export default function PlumbingWebsitePage() {
  
  // Data for sections - in a real app, this would come from a CMS.
  const services = [
    { name: 'Emergency Plumbing', icon: ZapIcon, description: '24/7 rapid response for bursts, leaks, and critical plumbing failures.' },
    { name: 'Drain Cleaning', icon: WrenchIcon, description: 'Advanced solutions for clogged drains, sewers, and pipes.' },
    { name: 'Water Heaters', icon: DropletIcon, description: 'Expert repair, replacement, and installation of all water heater types.' },
    { name: 'Leak Detection', icon: SearchIcon, description: 'State-of-the-art technology to find and fix hidden leaks precisely.' },
  ];

  const testimonials = [
    { quote: "RVA Plumbing Pros fixed our burst pipe in the middle of the night. Lifesavers! Professional, fast, and surprisingly affordable.", author: "Sarah L.", location: "The Fan, Richmond" },
    { quote: "Their team was fantastic. They explained everything clearly and the final price was exactly what they quoted. Highly recommend for any plumbing work.", author: "Mike B.", location: "Short Pump, VA" },
    { quote: "We've used them for both routine maintenance and an emergency water heater replacement. Consistently great service every time.", author: "Jennifer H.", location: "Midlothian, VA" },
  ];

  const [formData, setFormData] = useState({ name: '', phone: '', email: '', service: '', message: '' });
  const [formStatus, setFormStatus] = useState('');

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('Submitting...');
    // In a real app, you would send this data to a backend or email service.
    console.log('Form data submitted:', formData);
    setTimeout(() => {
      setFormStatus('Thank you! We will be in touch shortly.');
      setFormData({ name: '', phone: '', email: '', service: '', message: '' });
    }, 1500);
  };

  return (
    <div className="bg-gray-50 text-gray-800 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#" className="text-2xl font-bold text-blue-900">
            RVA Plumbing Pros
          </a>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#services" className="text-gray-600 hover:text-blue-700 transition-colors">Services</a>
            <a href="#about" className="text-gray-600 hover:text-blue-700 transition-colors">Why Choose Us</a>
            <a href="#testimonials" className="text-gray-600 hover:text-blue-700 transition-colors">Testimonials</a>
            <a href="#contact" className="text-gray-600 hover:text-blue-700 transition-colors">Contact</a>
          </nav>
          <a href="tel:804-555-0199" className="hidden md:flex items-center px-4 py-2 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition-all transform hover:scale-105">
            <PhoneIcon className="w-5 h-5 mr-2" />
            (804) 555-0199
          </a>
          <button className="md:hidden text-blue-900">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
          </button>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative bg-blue-900 text-white py-20 md:py-32">
            <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{backgroundImage: "url('https://placehold.co/1920x1080/000000/FFFFFF?text=Professional+Plumbing+Tools&font=montserrat')"}}></div>
            <div className="container mx-auto px-6 text-center relative z-10">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
                    Reliable Plumbing Services in Richmond, VA
                </h1>
                <p className="text-lg md:text-xl text-blue-200 max-w-3xl mx-auto mb-8">
                    Your trusted local experts for all plumbing needs. Fast, fair, and fixed right the first time.
                </p>
                <div className="flex justify-center space-x-4">
                    <a href="#contact" className="px-8 py-3 bg-yellow-400 text-blue-900 font-bold rounded-lg shadow-lg hover:bg-yellow-500 transition-all transform hover:scale-105">
                        Request Service Now
                    </a>
                    <a href="#services" className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-blue-900 transition-all">
                        View Our Services
                    </a>
                </div>
                <div className="mt-12 text-sm text-blue-300 font-semibold tracking-wider">
                    24/7 EMERGENCY SERVICE AVAILABLE &nbsp; • &nbsp; LICENSED & INSURED
                </div>
            </div>
        </section>
        
        {/* Trust Bar */}
        <section className="bg-gray-100 py-6">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="p-4">
                        <h3 className="text-xl font-bold text-blue-800">100+ 5-Star Reviews</h3>
                        <p className="text-sm text-gray-600">On Google & Yelp</p>
                    </div>
                    <div className="p-4">
                        <h3 className="text-xl font-bold text-blue-800">Family Owned</h3>
                        <p className="text-sm text-gray-600">Serving RVA with Pride</p>
                    </div>
                    <div className="p-4">
                        <h3 className="text-xl font-bold text-blue-800">Upfront Pricing</h3>
                        <p className="text-sm text-gray-600">No Hidden Fees, Ever</p>
                    </div>
                    <div className="p-4">
                        <h3 className="text-xl font-bold text-blue-800">Workmanship Guarantee</h3>
                        <p className="text-sm text-gray-600">We Stand By Our Work</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-blue-900">Our Plumbing Services</h2>
                    <p className="text-lg text-gray-600 mt-2">Comprehensive solutions for your home or business.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service) => (
                        <div key={service.name} className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                            <div className="inline-block p-4 bg-blue-100 rounded-full mb-4">
                                <service.icon className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-blue-900">{service.name}</h3>
                            <p className="text-gray-600">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Why Choose Us Section */}
        <section id="about" className="bg-gray-100 py-20">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="md:w-1/2">
                        <img src="https://placehold.co/600x400/3B82F6/FFFFFF?text=Clean+Work+Area&font=montserrat" alt="Clean and organized plumbing work area" className="rounded-lg shadow-2xl" />
                    </div>
                    <div className="md:w-1/2">
                        <h2 className="text-4xl font-bold text-blue-900 mb-4">The Richmond Plumber You Can Trust</h2>
                        <p className="text-gray-700 mb-6 text-lg">
                            At RVA Plumbing Pros, we&apos;re not just fixing pipes—we&apos;re building relationships. We believe in providing honest service, transparent pricing, and quality workmanship that lasts. Our licensed plumbers respect your home, clean up after every job, and guarantee your satisfaction.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-start"><CheckCircleIcon className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" /><span><strong>Experienced & Licensed Technicians:</strong> Our team is fully certified and continuously trained.</span></li>
                            <li className="flex items-start"><CheckCircleIcon className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" /><span><strong>Clear, Upfront Estimates:</strong> You approve the price before we start any work. No surprises.</span></li>
                            <li className="flex items-start"><CheckCircleIcon className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" /><span><strong>Satisfaction Guaranteed:</strong> We&apos;re not happy until you&apos;re 100% satisfied with our service.</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
        
        {/* Testimonials Section */}
        <section id="testimonials" className="py-20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-blue-900">What Our RVA Neighbors Are Saying</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-white p-8 rounded-lg shadow-xl border-t-4 border-yellow-400">
                            <div className="flex mb-4">
                                {[...Array(5)].map((_, i) => <StarIcon key={i} className="w-5 h-5 text-yellow-400" />)}
                            </div>
                            <p className="text-gray-600 mb-4 italic">&quot;{testimonial.quote}&quot;</p>
                            <p className="font-bold text-blue-900">{testimonial.author}</p>
                            <p className="text-sm text-gray-500">{testimonial.location}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* CTA Banner */}
        <section className="bg-blue-800 text-white">
            <div className="container mx-auto px-6 py-16 text-center">
                <h2 className="text-3xl font-bold mb-2">Have a Plumbing Problem?</h2>
                <p className="text-lg text-blue-200 mb-8">Don&apos;t wait for it to get worse. Contact us today for a fast, free estimate!</p>
                <a href="#contact" className="px-10 py-4 bg-yellow-400 text-blue-900 font-bold rounded-lg shadow-lg hover:bg-yellow-500 transition-all transform hover:scale-105">
                    Get Your Free Estimate
                </a>
            </div>
        </section>
        
        {/* Contact Form Section */}
        <section id="contact" className="py-20 bg-gray-100">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-blue-900">Schedule Your Service Today</h2>
                    <p className="text-lg text-gray-600 mt-2">Fill out the form below or give us a call at (804) 555-0199.</p>
                </div>
                <div className="max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-lg shadow-2xl">
                    <form onSubmit={handleFormSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <input type="text" name="name" value={formData.name} onChange={handleFormChange} placeholder="Your Name" required className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <input type="tel" name="phone" value={formData.phone} onChange={handleFormChange} placeholder="Phone Number" required className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div className="mb-6">
                            <input type="email" name="email" value={formData.email} onChange={handleFormChange} placeholder="Email Address" required className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div className="mb-6">
                            <select name="service" value={formData.service} onChange={handleFormChange} required className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                                <option value="">Select a Service...</option>
                                {services.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="mb-6">
                            <textarea name="message" value={formData.message} onChange={handleFormChange} placeholder="Briefly describe your issue..." rows={4} required className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="w-full px-8 py-4 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105">
                                Request Service
                            </button>
                        </div>
                        {formStatus && <p className="text-center mt-4 text-green-600">{formStatus}</p>}
                    </form>
                </div>
            </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-blue-900 text-blue-200">
        <div className="container mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-xl font-bold text-white mb-4">RVA Plumbing Pros</h3>
                    <p className="text-sm">Your local, reliable plumbers serving the greater Richmond area since 1995.</p>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#services" className="hover:text-white">Services</a></li>
                        <li><a href="#about" className="hover:text-white">Why Choose Us</a></li>
                        <li><a href="#contact" className="hover:text-white">Contact</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-white mb-4">Contact Info</h3>
                    <ul className="space-y-2 text-sm">
                        <li>123 Main Street, Richmond, VA 23220</li>
                        <li>(804) 555-0199</li>
                        <li>service@rvaplumbingpros.com</li>
                    </ul>
                </div>
                 <div>
                    <h3 className="text-lg font-bold text-white mb-4">Service Areas</h3>
                    <p className="text-sm">Richmond, Henrico, Chesterfield, Midlothian, Short Pump, Glen Allen, and surrounding areas.</p>
                </div>
            </div>
            <div className="mt-12 border-t border-blue-800 pt-8 text-center text-sm">
                <p>&copy; {new Date().getFullYear()} RVA Plumbing Pros. All Rights Reserved.</p>
            </div>
        </div>
      </footer>
    </div>
  );
}
