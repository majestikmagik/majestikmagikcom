'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
// --- Marquee Component ---
// UPDATE: Now features interactive grab-and-scroll functionality.
const ImageMarquee = () => {
  const templates = [
    { name: 'Roofing Template', imgSrc: '/img/roofing_template_001.png', url: '/templates/roofing/001' },
    { name: 'Plumbing Template', imgSrc: '/img/plumbing_template_001.png', url: '/templates/plumbing/001' },
    { name: 'HVAC Template', imgSrc: '/img/hvac_template_001.png', url: '/templates/hvac/001' },
    { name: 'Electrical Template', imgSrc: '/img/electrical_template_001.png', url: '/templates/electrical/001' },
    { name: 'Restaurant Template', imgSrc: '/img/restaurant_template_001.png', url: '/templates/restaurant/001' },
  ];

  const marqueeItems = [...templates, ...templates];

  const marqueeRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!marqueeRef.current) return;
    setIsDown(true);
    marqueeRef.current.classList.add('active');
    setStartX(e.pageX - marqueeRef.current.offsetLeft);
    setScrollLeft(marqueeRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    if (!marqueeRef.current) return;
    setIsDown(false);
    marqueeRef.current.classList.remove('active');
  };

  const handleMouseUp = () => {
    if (!marqueeRef.current) return;
    setIsDown(false);
    marqueeRef.current.classList.remove('active');
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDown || !marqueeRef.current) return;
    e.preventDefault();
    const x = e.pageX - marqueeRef.current.offsetLeft;
    const walk = (x - startX) * 2; // scroll-fast
    marqueeRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="relative w-full overflow-hidden mt-16 py-8 bg-slate-900/50 rounded-xl">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-slate-950 via-transparent to-slate-950 z-10"></div>

      {/* UPDATE: The div below now has event handlers and new classes for grab-and-scroll */}
      <div
        ref={marqueeRef}
        className="flex overflow-x-scroll cursor-grab active:cursor-grabbing select-none scrollbar-hide"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {marqueeItems.map((template, index) => (
          <a href={template.url} key={index} className="flex-shrink-0 mx-4 my-14 w-64 md:w-60 group pointer-events-auto"
            onClick={(e) => {
              // Prevent navigation if the user was dragging
              if (Math.abs(marqueeRef.current!.scrollLeft - scrollLeft) > 2) {
                e.preventDefault();
              }
            }}
          >
            <div className="overflow-hidden rounded-lg shadow-lg">
              <Image
                width={320}
                height={180}
                src={template.imgSrc}
                alt={`${template.name} Website Template`}
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110 pointer-events-none"
              />
            </div>
            <p className="mt-2 text-center text-sm text-slate-400 group-hover:text-indigo-400 transition-colors">
              {template.name}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
};


// --- Main Section Component ---

const AIConceptTemplateSection: React.FC = () => {

  return (
    <section
      id="templates"
      aria-labelledby="ai-website-concept-heading"
      className="py-24 md:py-28 bg-slate-950"
    >
      <div className="container px-6 mx-auto">
        
        {/* --- IMAGE MARQUEE SECTION --- */}
        <div className="mt-2 text-center max-w-6xl mx-auto">
          <h3 className="text-2xl text-slate-200 font-bold md:text-3xl scroll-animate">
            Explore Our Pre-Optimized AI Website Templates
          </h3>         
          <p className="mx-auto mt-2 text-slate-400 md:text-lg scroll-animate" style={{ transitionDelay: '0.2s' }}>  [Click any template below to see a live preview and visualize your next revenue engine.]
          </p>
          <div className="scroll-animate animate-delay-300">
            <ImageMarquee />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIConceptTemplateSection;