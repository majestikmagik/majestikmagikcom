// File: app/page.tsx (or a new template page)
// A complete, high-quality website template for a local roofing contractor.
// Built as a single-file Next.js page using TypeScript and Tailwind CSS.

'use client';

import React, { useState } from 'react';

// --- Helper Icon Components ---
const HomeShieldIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 10a2.5 2.5 0 0 0-2.5 2.5c0 1.5 1 2.5 2.5 2.5"/><path d="M12 8V5"/><path d="m15 12-2.5-2.5L10 12"/></svg>
);
const LayersIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
);
const CloudDrizzleIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M8 19v1"/><path d="M8 14v1"/><path d="M16 19v1"/><path d="M16 14v1"/><path d="M12 21v1"/><path d="M12 16v1"/></svg>
);
const ConstructionIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="8" rx="1"/><path d="M17 14v7"/><path d="M7 14v7"/><path d="M17 3v3"/><path d="M7 3v3"/><path d="M12 3v3"/></svg>
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

export default function RoofingWebsitePage() {
  
  const services = [
    { name: 'Roof Replacement', icon: HomeShieldIcon, description: 'Durable, high-quality materials for a new roof that lasts for decades.' },
    { name: 'Roof Repair', icon: ConstructionIcon, description: 'Expert repairs for leaks, storm damage, and wear to extend your roof\'s life.' },
    { name: 'Gutter Systems', icon: CloudDrizzleIcon, description: 'Seamless gutter installation and repair to protect your home\'s foundation.' },
    { name: 'Shingle & Metal', icon: LayersIcon, description: 'Specializing in both traditional asphalt shingles and modern metal roofing.' },
  ];

  const testimonials = [
    { quote: "After the last big storm, RVA Roofing was out the next day for an inspection. They handled everything with our insurance and did a fantastic job on the replacement.", author: "Mark D.", location: "Chesterfield, VA" },
    { quote: "The most professional and courteous construction crew I've ever had at my home. The new metal roof is beautiful and the cleanup was immaculate.", author: "Linda S.", location: "Richmond, VA" },
    { quote: "Honest, reliable, and the quality of their work is top-notch. They fixed a persistent leak that two other companies couldn't. Highly recommended.", author: "Robert P.", location: "Mechanicsville, VA" },
  ];

  const [formData, setFormData] = useState({ name: '', phone: '', address: '', service: '', message: '' });
  const [formStatus, setFormStatus] = useState('');

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('Submitting your request...');
    console.log('Form data submitted:', formData);
    setTimeout(() => {
      setFormStatus('Thank you! We will call you shortly to schedule your inspection.');
      setFormData({ name: '', phone: '', address: '', service: '', message: '' });
    }, 1500);
  };

  return (
    <div className={`bg-slate-100 text-slate-800 font-sans`}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#" className="text-2xl font-bold text-slate-900">
            RVA<span className="text-red-700">Roofing</span> Co.
          </a>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#services" className="text-slate-600 hover:text-red-700 transition-colors">Services</a>
            <a href="#about" className="text-slate-600 hover:text-red-700 transition-colors">Why Us</a>
            <a href="#testimonials" className="text-slate-600 hover:text-red-700 transition-colors">Reviews</a>
            <a href="#contact" className="text-slate-600 hover:text-red-700 transition-colors">Contact</a>
          </nav>
          <a href="tel:804-555-0499" className="hidden md:flex items-center px-4 py-2 bg-slate-800 text-white font-bold rounded-lg shadow-md hover:bg-slate-900 transition-all transform hover:scale-105">
            <PhoneIcon className="w-5 h-5 mr-2" />
            (804) 555-0499
          </a>
          <button className="md:hidden text-slate-800">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
          </button>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative bg-slate-900 text-white py-20 md:py-32">
            <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{backgroundImage: "url('https://placehold.co/1920x1080/2D3748/FFFFFF?text=Durable+Roofing&font=montserrat')"}}></div>
            <div className="container mx-auto px-6 text-center relative z-10">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
                    Protecting Richmond Homes, One Roof at a Time
                </h1>
                <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-8">
                    Your trusted, local experts for roof repair, replacement, and installation.
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                    <a href="#contact" className="w-full sm:w-auto px-8 py-3 bg-red-700 text-white font-bold rounded-lg shadow-lg hover:bg-red-800 transition-all transform hover:scale-105">
                        Get a Free Inspection
                    </a>
                    <a href="#services" className="w-full sm:w-auto px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-slate-900 transition-all">
                        Explore Our Services
                    </a>
                </div>
            </div>
        </section>
        
        {/* Trust Bar */}
        <section className="bg-white py-6 border-b border-slate-200">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="p-4">
                        <h3 className="text-xl font-bold text-slate-800">GAF Certified</h3>
                        <p className="text-sm text-slate-600">Top-Tier Materials & Warranty</p>
                    </div>
                    <div className="p-4">
                        <h3 className="text-xl font-bold text-slate-800">Lifetime Warranty</h3>
                        <p className="text-sm text-slate-600">On All New Roof Systems</p>
                    </div>
                    <div className="p-4">
                        <h3 className="text-xl font-bold text-slate-800">A+ BBB Rating</h3>
                        <p className="text-sm text-slate-600">A Commitment to Quality</p>
                    </div>
                    <div className="p-4">
                        <h3 className="text-xl font-bold text-slate-800">Financing Available</h3>
                        <p className="text-sm text-slate-600">Affordable Payment Plans</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 bg-slate-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-slate-900">Our Roofing Solutions</h2>
                    <p className="text-lg text-slate-600 mt-2">Protecting your biggest investment with quality materials and expert craftsmanship.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service) => (
                        <div key={service.name} className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-red-200/50 hover:-translate-y-2 transition-all duration-300">
                            <div className="inline-block p-4 bg-red-100 rounded-full mb-4">
                                <service.icon className="w-8 h-8 text-red-700" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-slate-900">{service.name}</h3>
                            <p className="text-slate-600">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Why Choose Us Section */}
        <section id="about" className="bg-white py-20">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row-reverse items-center gap-12">
                    <div className="md:w-1/2">
                        <img src="https://placehold.co/600x400/B91C1C/FFFFFF?text=Quality+Craftsmanship&font=montserrat" alt="Roofer installing shingles with precision" className="rounded-lg shadow-2xl" />
                    </div>
                    <div className="md:w-1/2">
                        <h2 className="text-4xl font-bold text-slate-900 mb-4">The RVA Roofing Difference</h2>
                        <p className="text-slate-700 mb-6 text-lg">
                           We&apos;re a family-owned roofing company that treats your home like our own. We use only the best materials, backed by industry-leading warranties and our personal commitment to quality. From initial inspection to final cleanup, we guarantee a professional, hassle-free experience.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-start"><CheckCircleIcon className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" /><span><strong>Detailed, No-Obligation Inspections:</strong> We provide a thorough assessment and an honest, transparent quote.</span></li>
                            <li className="flex items-start"><CheckCircleIcon className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" /><span><strong>Dedicated Project Management:</strong> You&apos;ll have a single point of contact throughout your entire project.</span></li>
                            <li className="flex items-start"><CheckCircleIcon className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" /><span><strong>Impeccable Cleanup:</strong> We protect your landscaping and use magnetic rollers to ensure no nails are left behind.</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
        
        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-slate-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-slate-900">What Our Customers Are Saying</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-white p-8 rounded-lg shadow-xl border-t-4 border-red-700">
                            <div className="flex mb-4">
                                {[...Array(5)].map((_, i) => <StarIcon key={i} className="w-5 h-5 text-yellow-400" />)}
                            </div>
                            <p className="text-slate-600 mb-4 italic">&quot;{testimonial.quote}&quot;</p>
                            <p className="font-bold text-slate-900">{testimonial.author}</p>
                            <p className="text-sm text-slate-500">{testimonial.location}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* CTA Banner */}
        <section className="bg-slate-800 text-white">
            <div className="container mx-auto px-6 py-16 text-center">
                <h2 className="text-3xl font-bold mb-2">Worried About Your Roof?</h2>
                <p className="text-lg text-slate-300 mb-8">Don&apos;t wait for a small issue to become a major problem. Schedule your free, no-obligation inspection today!</p>
                <a href="#contact" className="px-10 py-4 bg-red-700 text-white font-bold rounded-lg shadow-lg hover:bg-red-800 transition-all transform hover:scale-105">
                    Schedule Free Inspection
                </a>
            </div>
        </section>
        
        {/* Contact Form Section */}
        <section id="contact" className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-slate-900">Contact Us for a Free Estimate</h2>
                    <p className="text-lg text-slate-600 mt-2">Fill out the form below or call (804) 555-0499 to speak with a roofing expert.</p>
                </div>
                <div className="max-w-2xl mx-auto bg-slate-50 p-8 md:p-12 rounded-lg shadow-2xl border border-slate-200">
                    <form onSubmit={handleFormSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <input type="text" name="name" value={formData.name} onChange={handleFormChange} placeholder="Your Name" required className="p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600" />
                            <input type="tel" name="phone" value={formData.phone} onChange={handleFormChange} placeholder="Phone Number" required className="p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600" />
                        </div>
                        <div className="mb-6">
                            <input type="text" name="address" value={formData.address} onChange={handleFormChange} placeholder="Property Address" required className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600" />
                        </div>
                        <div className="mb-6">
                            <select name="service" value={formData.service} onChange={handleFormChange} required className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 bg-white">
                                <option value="">What can we help you with?</option>
                                {services.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                                <option value="Storm Damage Inspection">Storm Damage Inspection</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="mb-6">
                            <textarea name="message" value={formData.message} onChange={handleFormChange} placeholder="Additional details (optional)..." rows={4} className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"></textarea>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="w-full px-8 py-4 bg-red-700 text-white font-bold rounded-lg shadow-lg hover:bg-red-800 transition-all transform hover:scale-105">
                                Request My Free Estimate
                            </button>
                        </div>
                        {formStatus && <p className="text-center mt-4 text-green-600 font-semibold">{formStatus}</p>}
                    </form>
                </div>
            </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300">
        <div className="container mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-xl font-bold text-white mb-4">RVA Roofing Co.</h3>
                    <p className="text-sm">GAF Certified roofing contractors serving the greater Richmond area.</p>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-white mb-4">Our Services</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#services" className="hover:text-red-500">Roof Replacement</a></li>
                        <li><a href="#services" className="hover:text-red-500">Roof Repair</a></li>
                        <li><a href="#services" className="hover:text-red-500">Gutter Systems</a></li>
                        <li><a href="#services" className="hover:text-red-500">Storm Damage</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-white mb-4">Contact</h3>
                    <ul className="space-y-2 text-sm">
                        <li>Richmond, VA</li>
                        <li>(804) 555-0499</li>
                        <li>estimates@rvaroofingco.com</li>
                    </ul>
                </div>
                 <div>
                    <h3 className="text-lg font-bold text-white mb-4">Hours</h3>
                    <ul className="space-y-2 text-sm">
                        <li>Mon - Fri: 8:00 AM - 6:00 PM</li>
                        <li>Sat: By Appointment Only</li>
                        <li className="font-bold text-red-500">24/7 Emergency Tarping</li>
                    </ul>
                </div>
            </div>
            <div className="mt-12 border-t border-slate-700 pt-8 text-center text-sm">
                <p>&copy; {new Date().getFullYear()} RVA Roofing Co. All Rights Reserved.</p>
            </div>
        </div>
      </footer>
    </div>
  );
}
