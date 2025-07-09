// File: app/page.tsx (or a new template page)
// A complete, high-quality website template for a local HVAC service.
// Built as a single-file Next.js page using TypeScript and Tailwind CSS.

'use client';

import React, { useState } from 'react';

// --- Helper Icon Components ---
const SnowflakeIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="2" y1="12" x2="22" y2="12" /><line x1="12" y1="2" x2="12" y2="22" /><path d="m20 16-4-4 4-4" /><path d="m4 8 4 4-4 4" /><path d="m16 4-4 4-4-4" /><path d="m8 20 4-4 4 4" /></svg>
);
const FlameIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" /></svg>
);
const WindIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" /><path d="M9.6 4.6A2 2 0 1 1 11 8H2" /><path d="M12.6 19.4A2 2 0 1 0 14 16H2" /></svg>
);
const ShieldCheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /><path d="m9 12 2 2 4-4" /></svg>
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

export default function HvacWebsitePage() {
  
  const services = [
    { name: 'AC Repair & Service', icon: SnowflakeIcon, description: 'Fast, reliable air conditioning repairs to keep you cool all summer.' },
    { name: 'Heating & Furnace', icon: FlameIcon, description: 'Expert furnace repair and installation to ensure your home stays warm.' },
    { name: 'Indoor Air Quality', icon: WindIcon, description: 'Solutions for cleaner, healthier air, including purifiers and humidifiers.' },
    { name: 'Maintenance Plans', icon: ShieldCheckIcon, description: 'Preventative care to keep your HVAC system running efficiently year-round.' },
  ];

  const testimonials = [
    { quote: "Our AC went out during a heatwave, and RVA Climate Control was there within an hour. Incredibly professional and honest service.", author: "David P.", location: "Glen Allen, VA" },
    { quote: "They installed our new furnace and the whole process was seamless. The technicians were knowledgeable and respectful of our home.", author: "Emily R.", location: "Chesterfield, VA" },
    { quote: "The maintenance plan is worth every penny. It gives us peace of mind knowing our system is in top shape before the season starts.", author: "Brian K.", location: "Richmond, VA" },
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
      setFormStatus('Thank you! Our team will contact you shortly.');
      setFormData({ name: '', phone: '', email: '', service: '', message: '' });
    }, 1500);
  };

  return (
    <div className={`bg-slate-50 text-slate-800 font-sans`}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#" className="text-2xl font-bold text-slate-800">
            RVA<span className="text-cyan-600">Climate</span><span className="text-orange-500">Control</span>
          </a>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#services" className="text-slate-600 hover:text-cyan-600 transition-colors">Services</a>
            <a href="#about" className="text-slate-600 hover:text-cyan-600 transition-colors">About Us</a>
            <a href="#testimonials" className="text-slate-600 hover:text-cyan-600 transition-colors">Reviews</a>
            <a href="#contact" className="text-slate-600 hover:text-cyan-600 transition-colors">Contact</a>
          </nav>
          <a href="tel:804-555-0299" className="hidden md:flex items-center px-4 py-2 bg-orange-500 text-white font-bold rounded-lg shadow-md hover:bg-orange-600 transition-all transform hover:scale-105">
            <PhoneIcon className="w-5 h-5 mr-2" />
            (804) 555-0299
          </a>
          <button className="md:hidden text-slate-800">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
          </button>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative bg-slate-800 text-white py-20 md:py-32">
            <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{backgroundImage: "url('https://placehold.co/1920x1080/1E293B/FFFFFF?text=Modern+HVAC+System&font=montserrat')"}}></div>
            <div className="container mx-auto px-6 text-center relative z-10">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
                    Total Home Comfort in Richmond, VA
                </h1>
                <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-8">
                    Expert HVAC solutions for every season. Your comfort is our priority.
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                    <a href="#contact" className="w-full sm:w-auto px-8 py-3 bg-cyan-500 text-white font-bold rounded-lg shadow-lg hover:bg-cyan-600 transition-all transform hover:scale-105">
                        Schedule a Free Consultation
                    </a>
                    <a href="tel:804-555-0299" className="w-full sm:w-auto px-8 py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-all">
                        Emergency Service
                    </a>
                </div>
            </div>
        </section>
        
        {/* Trust Bar */}
        <section className="bg-white py-6 border-b border-slate-200">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="p-4">
                        <h3 className="text-xl font-bold text-cyan-700">NATE Certified</h3>
                        <p className="text-sm text-slate-600">Highest Industry Standard</p>
                    </div>
                    <div className="p-4">
                        <h3 className="text-xl font-bold text-cyan-700">20+ Years Experience</h3>
                        <p className="text-sm text-slate-600">Serving the RVA Community</p>
                    </div>
                    <div className="p-4">
                        <h3 className="text-xl font-bold text-cyan-700">Financing Available</h3>
                        <p className="text-sm text-slate-600">Flexible Payment Options</p>
                    </div>
                    <div className="p-4">
                        <h3 className="text-xl font-bold text-cyan-700">24/7 Availability</h3>
                        <p className="text-sm text-slate-600">Here When You Need Us</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 bg-slate-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-slate-800">Heating & Cooling Services</h2>
                    <p className="text-lg text-slate-600 mt-2">Reliable solutions to keep your home comfortable all year long.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service) => (
                        <div key={service.name} className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-cyan-200/50 hover:-translate-y-2 transition-all duration-300">
                            <div className="inline-block p-4 bg-cyan-100 rounded-full mb-4">
                                <service.icon className="w-8 h-8 text-cyan-600" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-slate-800">{service.name}</h3>
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
                        <img src="https://placehold.co/600x400/0891B2/FFFFFF?text=Certified+Technician&font=montserrat" alt="Certified HVAC technician working on a unit" className="rounded-lg shadow-2xl" />
                    </div>
                    <div className="md:w-1/2">
                        <h2 className="text-4xl font-bold text-slate-800 mb-4">Your Local Comfort Experts</h2>
                        <p className="text-slate-700 mb-6 text-lg">
                            RVA Climate Control is a family-owned business dedicated to providing honest, high-quality HVAC services to our Richmond neighbors. We combine cutting-edge technology with a commitment to old-fashioned customer service.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-start"><CheckCircleIcon className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" /><span><strong>Transparent Pricing:</strong> We provide detailed, upfront quotes before any work begins. No surprises, just fair prices.</span></li>
                            <li className="flex items-start"><CheckCircleIcon className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" /><span><strong>Respect for Your Home:</strong> Our technicians are clean, courteous, and always wear shoe covers.</span></li>
                            <li className="flex items-start"><CheckCircleIcon className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" /><span><strong>100% Satisfaction Guarantee:</strong> We stand behind our work and ensure you are completely satisfied.</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
        
        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-slate-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-slate-800">Trusted by Your RVA Neighbors</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-white p-8 rounded-lg shadow-xl border-t-4 border-orange-500">
                            <div className="flex mb-4">
                                {[...Array(5)].map((_, i) => <StarIcon key={i} className="w-5 h-5 text-orange-400" />)}
                            </div>
                            <p className="text-slate-600 mb-4 italic">&quot;{testimonial.quote}&quot;</p>
                            <p className="font-bold text-slate-800">{testimonial.author}</p>
                            <p className="text-sm text-slate-500">{testimonial.location}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* CTA Banner */}
        <section className="bg-cyan-700 text-white">
            <div className="container mx-auto px-6 py-16 text-center">
                <h2 className="text-3xl font-bold mb-2">Stay Comfortable, All Year Long.</h2>
                <p className="text-lg text-cyan-100 mb-8">Get a professional system check-up or a free new system estimate today!</p>
                <a href="#contact" className="px-10 py-4 bg-orange-500 text-white font-bold rounded-lg shadow-lg hover:bg-orange-600 transition-all transform hover:scale-105">
                    Book Your Appointment
                </a>
            </div>
        </section>
        
        {/* Contact Form Section */}
        <section id="contact" className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-slate-800">Get in Touch</h2>
                    <p className="text-lg text-slate-600 mt-2">Fill out the form below or call us at (804) 555-0299 for immediate assistance.</p>
                </div>
                <div className="max-w-2xl mx-auto bg-slate-50 p-8 md:p-12 rounded-lg shadow-2xl border border-slate-200">
                    <form onSubmit={handleFormSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <input type="text" name="name" value={formData.name} onChange={handleFormChange} placeholder="Your Name" required className="p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                            <input type="tel" name="phone" value={formData.phone} onChange={handleFormChange} placeholder="Phone Number" required className="p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                        </div>
                        <div className="mb-6">
                            <input type="email" name="email" value={formData.email} onChange={handleFormChange} placeholder="Email Address" required className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                        </div>
                        <div className="mb-6">
                            <select name="service" value={formData.service} onChange={handleFormChange} required className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white">
                                <option value="">I need help with...</option>
                                {services.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                                <option value="New System Estimate">New System Estimate</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="mb-6">
                            <textarea name="message" value={formData.message} onChange={handleFormChange} placeholder="How can we help you today?" rows={4} required className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"></textarea>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="w-full px-8 py-4 bg-cyan-600 text-white font-bold rounded-lg shadow-lg hover:bg-cyan-700 transition-all transform hover:scale-105">
                                Send Service Request
                            </button>
                        </div>
                        {formStatus && <p className="text-center mt-4 text-green-600 font-semibold">{formStatus}</p>}
                    </form>
                </div>
            </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-slate-300">
        <div className="container mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-xl font-bold text-white mb-4">RVA Climate Control</h3>
                    <p className="text-sm">Your local experts in heating, ventilation, and air conditioning.</p>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-white mb-4">Our Services</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#services" className="hover:text-cyan-400">AC Repair & Service</a></li>
                        <li><a href="#services" className="hover:text-cyan-400">Heating & Furnace</a></li>
                        <li><a href="#services" className="hover:text-cyan-400">Indoor Air Quality</a></li>
                        <li><a href="#services" className="hover:text-cyan-400">Maintenance Plans</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-white mb-4">Contact Us</h3>
                    <ul className="space-y-2 text-sm">
                        <li>Richmond, VA</li>
                        <li>(804) 555-0299</li>
                        <li>office@rvaclimatecontrol.com</li>
                    </ul>
                </div>
                 <div>
                    <h3 className="text-lg font-bold text-white mb-4">Business Hours</h3>
                    <ul className="space-y-2 text-sm">
                        <li>Mon - Fri: 8:00 AM - 6:00 PM</li>
                        <li>Sat: 9:00 AM - 3:00 PM</li>
                        <li>Sun: Closed</li>
                        <li className="font-bold text-orange-400">24/7 Emergency Service</li>
                    </ul>
                </div>
            </div>
            <div className="mt-12 border-t border-slate-700 pt-8 text-center text-sm">
                <p>&copy; {new Date().getFullYear()} RVA Climate Control. All Rights Reserved.</p>
            </div>
        </div>
      </footer>
    </div>
  );
}
