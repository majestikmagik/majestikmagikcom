// File: app/page.tsx (or a new template page)
// A complete, high-quality website template for a local electrician service.
// Built as a single-file Next.js page using TypeScript and Tailwind CSS.

'use client';

import React, { useState } from 'react';
import Image from 'next/image';

// --- Helper Icon Components ---
const BoltIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
);
const LightbulbIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-7 7c0 2.05 1.2 3.86 3 4.86A7 7 0 0 1 12 20a7 7 0 0 1 5-2.14c1.8-.99 3-2.81 3-4.86a7 7 0 0 0-7-7z"/></svg>
);
const HomeIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
);
const ToolIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
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

export default function ElectricianWebsitePage() {
  
  const services = [
    { name: 'Emergency Repairs', icon: BoltIcon, description: '24/7 emergency service for power outages, faulty wiring, and hazards.' },
    { name: 'Panel Upgrades', icon: ToolIcon, description: 'Modernize your home\'s electrical system for safety and capacity.' },
    { name: 'Lighting Solutions', icon: LightbulbIcon, description: 'Installation of interior, exterior, and energy-efficient LED lighting.' },
    { name: 'Wiring & Rewiring', icon: HomeIcon, description: 'Full home wiring for new construction and safe upgrades for older homes.' },
  ];

  const testimonials = [
    { quote: "RVA Spark Electrical responded immediately to our power outage. The electrician was professional, found the issue quickly, and was very transparent about the cost.", author: "Jessica M.", location: "Midlothian, VA" },
    { quote: "I hired them to install recessed lighting in my kitchen, and the results are stunning. Clean work, very respectful team. I'll be calling them for all future electrical needs.", author: "Tom W.", location: "Richmond, VA" },
    { quote: "They upgraded our ancient electrical panel. The peace of mind knowing our home is safe is priceless. Fantastic service from start to finish.", author: "Brenda G.", location: "Henrico, VA" },
  ];

  const [formData, setFormData] = useState({ name: '', phone: '', email: '', service: '', message: '' });
  const [formStatus, setFormStatus] = useState('');

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('Sending request...');
    console.log('Form data submitted:', formData);
    setTimeout(() => {
      setFormStatus('Thank you! We will contact you shortly to confirm.');
      setFormData({ name: '', phone: '', email: '', service: '', message: '' });
    }, 1500);
  };

  return (
    <div className={`bg-slate-50 text-slate-800 font-sans`}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#" className="text-2xl font-bold text-slate-900">
            RVA<span className="text-yellow-500">Spark</span> Electrical
          </a>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#services" className="text-slate-600 hover:text-yellow-600 transition-colors">Services</a>
            <a href="#about" className="text-slate-600 hover:text-yellow-600 transition-colors">About</a>
            <a href="#testimonials" className="text-slate-600 hover:text-yellow-600 transition-colors">Reviews</a>
            <a href="#contact" className="text-slate-600 hover:text-yellow-600 transition-colors">Contact</a>
          </nav>
          <a href="tel:804-555-0399" className="hidden md:flex items-center px-4 py-2 bg-slate-800 text-white font-bold rounded-lg shadow-md hover:bg-slate-900 transition-all transform hover:scale-105">
            <PhoneIcon className="w-5 h-5 mr-2" />
            (804) 555-0399
          </a>
          <button className="md:hidden text-slate-800">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
          </button>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative bg-slate-900 text-white py-20 md:py-32">
            <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{backgroundImage: "url('https://placehold.co/1920x1080/111827/FFFFFF?text=Electrical+Grid&font=montserrat')"}}></div>
            <div className="container mx-auto px-6 text-center relative z-10">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
                    Certified & Reliable Electricians in Richmond
                </h1>
                <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-8">
                    Powering your home and business safely. Quality service, guaranteed.
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                    <a href="#contact" className="w-full sm:w-auto px-8 py-3 bg-yellow-500 text-slate-900 font-bold rounded-lg shadow-lg hover:bg-yellow-400 transition-all transform hover:scale-105">
                        Get a Free Quote
                    </a>
                    <a href="tel:804-555-0399" className="w-full sm:w-auto px-8 py-3 border-2 border-yellow-500 text-yellow-500 font-bold rounded-lg hover:bg-yellow-500 hover:text-slate-900 transition-all">
                        Call for Emergency Service
                    </a>
                </div>
            </div>
        </section>
        
        {/* Trust Bar */}
        <section className="bg-white py-6 border-b border-slate-200">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="p-4">
                        <h3 className="text-xl font-bold text-slate-800">Master Electricians</h3>
                        <p className="text-sm text-slate-600">Licensed & Certified</p>
                    </div>
                    <div className="p-4">
                        <h3 className="text-xl font-bold text-slate-800">10-Year Warranty</h3>
                        <p className="text-sm text-slate-600">On All Major Work</p>
                    </div>
                    <div className="p-4">
                        <h3 className="text-xl font-bold text-slate-800">Safety First</h3>
                        <p className="text-sm text-slate-600">NEC Code Compliant</p>
                    </div>
                    <div className="p-4">
                        <h3 className="text-xl font-bold text-slate-800">Same-Day Service</h3>
                        <p className="text-sm text-slate-600">Available for Most Calls</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 bg-slate-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-slate-900">Our Electrical Services</h2>
                    <p className="text-lg text-slate-600 mt-2">From simple repairs to complete system installations.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service) => (
                        <div key={service.name} className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-yellow-200/50 hover:-translate-y-2 transition-all duration-300">
                            <div className="inline-block p-4 bg-yellow-100 rounded-full mb-4">
                                <service.icon className="w-8 h-8 text-yellow-600" />
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
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="md:w-1/2">
                        <Image src="https://placehold.co/600x400/1E293B/FBBF24?text=Safe+%26+Secure&font=montserrat" alt="Electrician ensuring a safe and secure installation" className="rounded-lg shadow-2xl" width={600} height={400} />
                    </div>
                    <div className="md:w-1/2">
                        <h2 className="text-4xl font-bold text-slate-900 mb-4">Safety and Precision in Every Job</h2>
                        <p className="text-slate-700 mb-6 text-lg">
                           At RVA Spark Electrical, your safety is our highest priority. We are a team of dedicated, licensed master electricians who believe in doing the job right the first time. We provide clear communication and transparent pricing, ensuring you&apos;re informed every step of the way.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-start"><CheckCircleIcon className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" /><span><strong>Fully Licensed & Insured:</strong> Complete peace of mind for every project.</span></li>
                            <li className="flex items-start"><CheckCircleIcon className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" /><span><strong>Adherence to National Electrical Code (NEC):</strong> All work is performed to the highest safety standards.</span></li>
                            <li className="flex items-start"><CheckCircleIcon className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" /><span><strong>Clean & Professional Service:</strong> We respect your property and guarantee a tidy work area.</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
        
        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-slate-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-slate-900">What Our Customers Say</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-white p-8 rounded-lg shadow-xl border-t-4 border-yellow-500">
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
        <section className="bg-yellow-500 text-slate-900">
            <div className="container mx-auto px-6 py-16 text-center">
                <h2 className="text-3xl font-bold mb-2">Need a Professional Electrician?</h2>
                <p className="text-lg text-slate-800 mb-8">From minor repairs to major installations, we&apos;ve got you covered. Contact us now!</p>
                <a href="#contact" className="px-10 py-4 bg-slate-800 text-white font-bold rounded-lg shadow-lg hover:bg-slate-900 transition-all transform hover:scale-105">
                    Request an Appointment
                </a>
            </div>
        </section>
        
        {/* Contact Form Section */}
        <section id="contact" className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-slate-900">Contact Us</h2>
                    <p className="text-lg text-slate-600 mt-2">Fill out the form below or call (804) 555-0399 for immediate service.</p>
                </div>
                <div className="max-w-2xl mx-auto bg-slate-50 p-8 md:p-12 rounded-lg shadow-2xl border border-slate-200">
                    <form onSubmit={handleFormSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <input type="text" name="name" value={formData.name} onChange={handleFormChange} placeholder="Your Name" required className="p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" />
                            <input type="tel" name="phone" value={formData.phone} onChange={handleFormChange} placeholder="Phone Number" required className="p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" />
                        </div>
                        <div className="mb-6">
                            <input type="email" name="email" value={formData.email} onChange={handleFormChange} placeholder="Email Address" required className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500" />
                        </div>
                        <div className="mb-6">
                            <select name="service" value={formData.service} onChange={handleFormChange} required className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white">
                                <option value="">What service do you need?</option>
                                {services.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                                <option value="EV Charger Installation">EV Charger Installation</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="mb-6">
                            <textarea name="message" value={formData.message} onChange={handleFormChange} placeholder="Please describe your electrical issue..." rows={4} required className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"></textarea>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="w-full px-8 py-4 bg-slate-800 text-white font-bold rounded-lg shadow-lg hover:bg-slate-900 transition-all transform hover:scale-105">
                                Submit Request
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
                    <h3 className="text-xl font-bold text-white mb-4">RVA Spark Electrical</h3>
                    <p className="text-sm">Licensed & Insured Master Electricians serving the Richmond, VA area.</p>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-white mb-4">Services</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#services" className="hover:text-yellow-400">Emergency Repairs</a></li>
                        <li><a href="#services" className="hover:text-yellow-400">Panel Upgrades</a></li>
                        <li><a href="#services" className="hover:text-yellow-400">Lighting</a></li>
                        <li><a href="#services" className="hover:text-yellow-400">Wiring & Rewiring</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-white mb-4">Contact</h3>
                    <ul className="space-y-2 text-sm">
                        <li>Richmond, VA</li>
                        <li>(804) 555-0399</li>
                        <li>contact@rvaspark.com</li>
                    </ul>
                </div>
                 <div>
                    <h3 className="text-lg font-bold text-white mb-4">Hours</h3>
                    <ul className="space-y-2 text-sm">
                        <li>Mon - Fri: 7:30 AM - 5:30 PM</li>
                        <li>Sat & Sun: Closed</li>
                        <li className="font-bold text-yellow-400">24/7 Emergency Service Available</li>
                    </ul>
                </div>
            </div>
            <div className="mt-12 border-t border-slate-700 pt-8 text-center text-sm">
                <p>&copy; {new Date().getFullYear()} RVA Spark Electrical. All Rights Reserved.</p>
            </div>
        </div>
      </footer>
    </div>
  );
}
