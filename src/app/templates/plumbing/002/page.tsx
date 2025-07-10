'use client';

import React, { useState } from 'react';

// --- SVG Icons ---
// Using inline SVGs for performance and easy color manipulation.
// No need for external libraries.


const WrenchIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM12 21.5a9.5 9.5 0 110-19 9.5 9.5 0 010 19z" />
    <path d="M16.5 8.75a.75.75 0 00-1.5 0V10h-1.75a.75.75 0 000 1.5H15v1.25a.75.75 0 001.5 0V11.5h1.75a.75.75 0 000-1.5H16.5V8.75zM8.5 14.25a.75.75 0 00-1.5 0V15.5H5.25a.75.75 0 000 1.5H7v1.25a.75.75 0 001.5 0V16.5h1.75a.75.75 0 000-1.5H8.5v-1.25z" />
    <path d="M12.38 5.47a.75.75 0 00-1.06-1.06l-6 6a.75.75 0 001.06 1.06l6-6z" />
  </svg>
);

const PhoneIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.292-.072.431l4.218 5.565a.43.43 0 00.431.072l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C6.852 22.5 1.5 17.148 1.5 8.25V6h1.5V4.5z" clipRule="evenodd" />
  </svg>
);

const ClockIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
  </svg>
);

const MapPinIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a2.25 2.25 0 002.16-2.16l.041-.071.015-.028a.76.76 0 000-.723l-.016-.028-.04-.071a2.25 2.25 0 00-2.16-2.16l-.071-.041-.028-.015a.76.76 0 00-.723 0l-.028.015-.07.041a2.25 2.25 0 00-2.16 2.16l-.04.071-.016.028a.76.76 0 000 .723l.016.028.04.071a2.25 2.25 0 002.16 2.16zM12 18a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" clipRule="evenodd" />
    <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3.342a.75.75 0 00.2.5l3.36 3.188a.75.75 0 001.08 0l3.36-3.188a.75.75 0 00.2-.5V6.75A5.25 5.25 0 0012 1.5zM12 2.25a4.5 4.5 0 014.5 4.5v3.013l-3.88 3.68a.75.75 0 01-1.08 0L7.5 9.763V6.75a4.5 4.5 0 014.5-4.5z" clipRule="evenodd" />
  </svg>
);

const StarIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007z" clipRule="evenodd" />
    </svg>
);


// --- Main App Component ---
export default function App() {
    interface FormStatus {
  type: string;
  message: string;
}
    // State for the mobile menu
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    // State for the contact form
    const [formStatus, setFormStatus] = useState<FormStatus | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event: React.FormEvent <HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        // In a real app, you would handle form submission here,
        // e.g., send data to an API endpoint.
        // For this demo, we'll just simulate a success message.
        setTimeout(() => {
            setFormStatus({ type: 'success', message: 'Thank you! Your message has been sent.' });
            setIsSubmitting(false);
            (event.target as HTMLFormElement).reset();
        }, 2000);
    };


    // --- Data for the website ---
    // This makes it easy to update content without digging into JSX.
    const companyInfo = {
        name: "Thomas & Son Plumbing",
        phone: "(804) 514-9975",
        phoneHref: "tel:8045149975",
        hours: "Open Daily, Closes 7:30 PM",
        location: "Richmond, VA & Surrounding Areas",
        tagline: "Call The Best, Flush The Rest",
        about: "Thomas & Son Plumbing in Wilkinson Terrace is your trusted partner for all your plumbing needs. We specialize in water heater installation, ensuring you have reliable and efficient hot water year-round. As expert bathroom renovators, we transform your space into a modern, functional oasis.",
        logoUrl: "../../img/438711483_10115845521844682_8945219802901792421_n.png",
    };

    const navLinks = [
        { name: 'Services', href: '#services' },
        { name: 'About', href: '#about' },
        { name: 'Why Us', href: '#why-us' },
        { name: 'Contact', href: '#contact' },
    ];

    const services = [
        { name: "Water Heater Installation", description: "Expert installation and replacement of tank and tankless water heaters.", icon: WrenchIcon },
        { name: "Drain Cleaning & Repair", description: "Advanced snaking and hydro-jetting to clear any clog, big or small.", icon: WrenchIcon },
        { name: "Leak Detection & Repair", description: "Precision leak detection for pipes, slabs, and fixtures to prevent water damage.", icon: WrenchIcon },
        { name: "Bathroom Remodeling", description: "Complete bathroom renovations, from new fixtures to full layout changes.", icon: WrenchIcon },
        { name: "Fixture Installation", description: "Professional installation of faucets, sinks, toilets, and showerheads.", icon: WrenchIcon },
        { name: "Emergency Services", description: "24/7 availability for urgent plumbing issues like burst pipes or major leaks.", icon: WrenchIcon },
    ];

    const whyChooseUs = [
        { title: "Family Owned & Operated", description: "We're your neighbors, dedicated to providing honest, reliable service to the Richmond community." },
        { title: "Upfront Pricing", description: "No surprises. We provide clear, detailed estimates before any work begins." },
        { title: "Quality Guaranteed", description: "We stand behind our workmanship with a satisfaction guarantee on all services." },
        { title: "Licensed & Insured", description: "Fully licensed and insured for your peace of mind and protection." },
    ];

    const testimonials = [
        { quote: "Thomas & Son were fantastic! They fixed our leaking pipe quickly and were very professional. Highly recommend their services.", author: "Sarah J. - Richmond, VA" },
        { quote: "Called them for a new water heater install. The price was fair, the work was clean, and they were done in just a few hours. Great experience.", author: "Mike B. - Henrico, VA" },
        { quote: "The only plumbers I'll call from now on. They are honest, skilled, and truly care about their customers.", author: "Linda P. - Chesterfield, VA" },
    ];

    // --- Main JSX Render ---
    return (
        <div className="bg-gray-900 text-gray-200 font-sans antialiased">
            {/* --- Header & Navigation --- */}
            <header className="bg-black/80 backdrop-blur-sm sticky top-0 z-50 shadow-lg shadow-red-600/10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <a href="#" className="flex items-center space-x-3">
                            <img src={companyInfo.logoUrl} alt="Thomas & Son Plumbing Logo" className="h-20 w-auto md:h-18" />
                            <span className="text-xl sm:text-2xl font-bold text-white tracking-tight hidden md:block">{companyInfo.name}</span>
                        </a>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex space-x-8">
                            {navLinks.map(link => (
                                <a key={link.name} href={link.href} className="text-lg font-medium text-gray-300 hover:text-red-500 transition-colors duration-300">
                                    {link.name}
                                </a>
                            ))}
                        </nav>
                        
                        {/* Call to Action Button */}
                        <a href={companyInfo.phoneHref} className="hidden md:flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-transform duration-300 hover:scale-105">
                            Call Now
                        </a>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 hover:text-white focus:outline-none">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    {isMenuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navLinks.map(link => (
                                <a key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">
                                    {link.name}
                                </a>
                            ))}
                        </div>
                         <div className="pt-4 pb-3 border-t border-gray-700">
                            <div className="flex items-center justify-center px-5">
                                <a href={companyInfo.phoneHref} className="w-full text-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700">
                                    Call Now: {companyInfo.phone}
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </header>

            {/* --- Main Content --- */}
            <main>
                {/* --- Hero Section --- */}
                <section className="relative bg-black text-white py-24 sm:py-32 lg:py-40">
                    <div className="absolute inset-0">
                        {/* Background image could go here, for now a gradient */}
                        <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
                         <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-gray-900"></div>
                    </div>
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight">
                            <span className="block">{companyInfo.name}</span>
                            <span className="block text-red-500 mt-2">{companyInfo.tagline}</span>
                        </h1>
                        <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl lg:text-2xl text-gray-300">
                            Your trusted, local plumbing experts in Richmond, VA. Fast, reliable service for every leak, clog, and installation.
                        </p>
                        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="#contact" className="inline-block w-full sm:w-auto rounded-md bg-red-600 px-8 py-4 text-lg font-bold text-white shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-red-700">
                                Get a Free Estimate
                            </a>
                            <a href="#services" className="inline-block w-full sm:w-auto rounded-md bg-gray-700 px-8 py-4 text-lg font-bold text-white shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-gray-600">
                                View Our Services
                            </a>
                        </div>
                    </div>
                </section>

                {/* --- Services Section --- */}
                <section id="services" className="py-20 sm:py-24 bg-gray-900">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h2 className="text-base font-semibold text-red-500 tracking-wider uppercase">Our Services</h2>
                            <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Comprehensive Plumbing Solutions</p>
                            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-400">Whatever your plumbing needs, we have the expertise to get the job done right.</p>
                        </div>
                        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                            {services.map((service) => (
                                <div key={service.name} className="bg-gray-800 rounded-lg shadow-lg p-8 transform hover:-translate-y-2 transition-transform duration-300 border-t-4 border-red-600">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-red-600 text-white">
                                        <service.icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="mt-6 text-xl font-bold text-white">{service.name}</h3>
                                    <p className="mt-2 text-base text-gray-400">{service.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                
                {/* --- About Us Section --- */}
                <section id="about" className="py-20 sm:py-24 bg-black">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
                            <div>
                                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Your Trusted Partner in Plumbing</h2>
                                <p className="mt-4 text-xl text-gray-400">{companyInfo.about}</p>
                                <div className="mt-6">
                                    <a href="#contact" className="text-lg font-medium text-red-500 hover:text-red-400">
                                        Schedule a consultation &rarr;
                                    </a>
                                </div>
                            </div>
                            <div className="mt-10 lg:mt-0">
                                <img className="rounded-lg shadow-xl" src="https://placehold.co/600x400/111827/ef4444?text=Our+Work" alt="Bathroom renovation project" />
                            </div>
                        </div>
                    </div>
                </section>


                {/* --- Why Choose Us Section --- */}
                <section id="why-us" className="py-20 sm:py-24 bg-gray-900">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">The Thomas & Son Difference</h2>
                            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-400">We&apos;re not just plumbers; we&apos;re problem solvers dedicated to your satisfaction.</p>
                        </div>
                        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                            {whyChooseUs.map((item) => (
                                <div key={item.title} className="text-center bg-gray-800 p-8 rounded-lg shadow-lg">
                                    <h3 className="text-xl font-bold text-red-500">{item.title}</h3>
                                    <p className="mt-2 text-base text-gray-400">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- Testimonials Section --- */}
                <section id="testimonials" className="py-20 sm:py-24 bg-black">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">What Our Customers Are Saying</h2>
                             <div className="mt-4 flex justify-center items-center">
                                <span className="text-yellow-400 font-bold text-xl mr-2">4.6</span>
                                <div className="flex">
                                    {[...Array(4)].map((_, i) => <StarIcon key={i} className="h-6 w-6 text-yellow-400" />)}
                                    <StarIcon className="h-6 w-6 text-gray-600" />
                                </div>
                                <span className="ml-2 text-gray-400 text-lg">(10 Google Reviews)</span>
                            </div>
                        </div>
                        <div className="mt-16 grid gap-8 lg:grid-cols-3">
                            {testimonials.map((testimonial) => (
                                <blockquote key={testimonial.author} className="bg-gray-800 p-8 rounded-lg shadow-lg">
                                    <p className="text-lg text-gray-300">&quot;{testimonial.quote}&quot;</p>
                                    <footer className="mt-6">
                                        <p className="font-semibold text-red-500">{testimonial.author}</p>
                                    </footer>
                                </blockquote>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- Contact Section --- */}
                <section id="contact" className="py-20 sm:py-24 bg-gray-900">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="lg:grid lg:grid-cols-2 lg:gap-16">
                            {/* Contact Info */}
                            <div className="mb-12 lg:mb-0">
                                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Get In Touch</h2>
                                <p className="mt-4 text-xl text-gray-400">Ready to solve your plumbing problems? Call us or fill out the form and we&apos;ll get back to you right away.</p>
                                <div className="mt-8 space-y-6">
                                    <div className="flex items-center">
                                        <PhoneIcon className="h-8 w-8 text-red-500" />
                                        <a href={companyInfo.phoneHref} className="ml-4 text-xl text-gray-300 hover:text-red-500">{companyInfo.phone}</a>
                                    </div>
                                    <div className="flex items-center">
                                        <ClockIcon className="h-8 w-8 text-red-500" />
                                        <span className="ml-4 text-xl text-gray-300">{companyInfo.hours}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <MapPinIcon className="h-8 w-8 text-red-500" />
                                        <span className="ml-4 text-xl text-gray-300">{companyInfo.location}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Form */}
                            <div>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="name" className="sr-only">Full Name</label>
                                        <input type="text" name="name" id="name" required className="block w-full bg-gray-800 border-gray-600 rounded-md py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500" placeholder="Full Name" />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="sr-only">Email</label>
                                        <input type="email" name="email" id="email" required className="block w-full bg-gray-800 border-gray-600 rounded-md py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500" placeholder="Email Address" />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="sr-only">Phone</label>
                                        <input type="tel" name="phone" id="phone" className="block w-full bg-gray-800 border-gray-600 rounded-md py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500" placeholder="Phone Number" />
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="sr-only">Message</label>
                                        <textarea name="message" id="message" rows={4} required className="block w-full bg-gray-800 border-gray-600 rounded-md py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500" placeholder="How can we help?"></textarea>
                                    </div>
                                    <div>
                                        <button type="submit" disabled={isSubmitting} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-gray-500 transition-colors">
                                            {isSubmitting ? 'Sending...' : 'Send Message'}
                                        </button>
                                    </div>
                                    {formStatus && (
                                        <div className={`p-4 rounded-md text-center ${formStatus.type === 'success' ? 'bg-green-800 text-green-200' : 'bg-red-800 text-red-200'}`}>
                                            {formStatus.message}
                                        </div>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* --- Footer --- */}
            <footer className="bg-black">
                <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} {companyInfo.name}. All Rights Reserved.</p>
                    <p className="mt-2">Serving Richmond, VA and surrounding communities.</p>
                    <p className="mt-4 text-sm">Website by <a href="https://www.majestikmagik.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-gray-300 hover:text-red-500">Majestik Magik</a></p>
                </div>
            </footer>
        </div>
    );
}
