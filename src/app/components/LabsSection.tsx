'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// --- SVG Icon Components ---
// NOTE: In a real Next.js app, these would be imported from separate files.

const ArrowRightIcon : React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);

// --- NEW LABS SECTION COMPONENT ---
// This section is designed to showcase your R&D work on the homepage.
export const LabsSection = () => {
    return (
         <section id="labs" aria-labelledby="labs-heading" className="relative py-16 md:py-24 overflow-hidden">
            {/* Video Background */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
            >
                <source src="/videos/majestikmagik_labs_mritest.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-slate-900/80 z-10"></div>
            <div className="container relative px-6 mx-auto z-20">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="order-2 md:order-1">
                        <p className="text-sm font-bold uppercase tracking-wider text-indigo-400 mb-2">From the Labs</p>
                        <h2 id="labs-heading" className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
                            Project: Insight MD
                        </h2>
                        <p className="text-slate-400 mb-6">
                            Beyond our client work, Majestik Magik is driven by a deeper mission: to build technology that saves lives. Our flagship R&D project, Insight MD, is an AI-powered co-pilot for radiologists, designed to help detect cancer earlier and more accurately.
                        </p>
                        <p className="text-slate-400 mb-8">
                            This initiative is born from a personal story and fueled by a passion to make a real-world impact on patient outcomes.
                        </p>
                        {/* In a real Next.js app, you would use the <Link> component here */}
                        <Link href="/labs" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors group">
                            Learn More About Our Research
                            <ArrowRightIcon className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                    <div className="order-1 md:order-2">
                        {/* In a real Next.js app, you would use the <Image> component here */}
                        <Image 
                            src="/img/insightmd_03.png"
                            alt="Insight MD Viewer Prototype"
                            className="rounded-xl shadow-2xl w-full h-auto object-cover"
                            width={1200}
                            height={794}
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>
           
        </section>
    );
};

export default LabsSection;