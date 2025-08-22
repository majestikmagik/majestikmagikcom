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
          <a href={template.url} key={index} className="flex-shrink-0 mx-4 my-14 w-64 md:w-80 group pointer-events-auto"
            onClick={(e) => {
              // Prevent navigation if the user was dragging
              if (Math.abs(marqueeRef.current!.scrollLeft - scrollLeft) > 5) {
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

interface AIConceptTemplateSectionProps {
  conceptUserPrompt: string;
  setConceptUserPrompt: (prompt: string) => void;
  handleGenerateConceptPreview: () => void;
  isConceptLoading: boolean;
  conceptError: string | null;
  generatedCodeContent: string;
  generatedOutputType: 'html' | 'react-tsx' | null;
  isGeminiInitialized: boolean;
}

const AIConceptTemplateSection: React.FC<AIConceptTemplateSectionProps> = ({
  conceptUserPrompt,
  setConceptUserPrompt,
  handleGenerateConceptPreview,
  isConceptLoading,
  conceptError,
  generatedCodeContent,
  generatedOutputType,
  isGeminiInitialized,
}) => {
  const handleDownloadHtml = () => {
    if (!generatedCodeContent || generatedOutputType !== 'html') return;
    const blob = new Blob([generatedCodeContent], { type: 'text/html' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = 'majestik-magik-concept.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };

  return (
    <section
      id="templates"
      aria-labelledby="ai-website-concept-heading"
      className="py-24 md:py-28 bg-slate-950"
    >
      <div className="container px-6 mx-auto">
        {/* Section Header */}
        <div className="mb-12 text-left max-w-6xl mx-auto scroll-animate">
          <h2 className="text-3xl md:text-4xl text-center font-extrabold text-slate-100">
            From Idea to Income: Rapid AI Website Templates for Instant Validation & Launch
          </h2>
          <p className="mt-4 text-slate-400 text-center md:text-lg">
            Stop getting bogged down in endless mockups and design cycles. Start validating your vision and launching faster than ever. Our AI Website Templates transform your concepts into tangible, responsive reality in seconds. Simply describe any page or section (hero, pricing, features, contact, etc.), and our AI instantly generates a clean, production-ready HTML concept. Preview, refine, download, and accelerate your path to market with confidence.
          </p>

          <ul className="mt-6 grid gap-2 text-slate-400 text-sm md:text-base">
            <li>⚡ <span className="text-slate-300">Rapid Validation:</span> Get instant, high-fidelity concepts for landing pages or individual sections. Test ideas, gather feedback, and iterate at lightning speed – saving weeks of development time and thousands in design costs.</li>
            <li>🧩 <span className="text-slate-300">Strategic Flexibility:</span> Tweak your prompts and regenerate until your vision perfectly aligns with your market strategy. Make informed decisions faster.</li>
            <li>📦 <span className="text-slate-300">Actionable & Practical:</span> Export your concept as clean HTML immediately. Use it for internal review, stakeholder presentations, or as a direct blueprint for your next project. Ready to upgrade to a full build when your strategy demands it.</li>
            <li>🔗 <span className="text-slate-300">Need more?</span> We&apos;re ready to engineer your full custom design, complex APIs, and robust databases to scale your success.</li>
          </ul>
        </div>



        {/* Input and Buttons */}
        <div
          className="max-w-6xl p-6 mx-auto rounded-xl shadow-2xl md:p-8 bg-slate-800 scroll-animate"
          style={{ transitionDelay: '0.3s' }}
        >
          <textarea
            value={conceptUserPrompt}
            onChange={(e) => setConceptUserPrompt(e.target.value)}
            placeholder="e.g., 'A simple hero section for a tech startup', 'A 3-column feature list', 'A basic product card design'"
            rows={4}
            className="w-full p-3 transition-colors duration-300 border rounded-md bg-slate-700 text-slate-200 border-slate-600 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 placeholder-slate-500"
            aria-label="Describe your desired concept template"
          />
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
            <button
              onClick={handleGenerateConceptPreview}
              disabled={isConceptLoading || !isGeminiInitialized}
              className="flex items-center justify-center w-80 px-6 py-3 mt-4 font-semibold text-white transition-all duration-300 cursor-pointer rounded-md shadow-md bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-600 disabled:cursor-not-allowed"
              aria-live="polite"
              type="button"
            >
              {isConceptLoading ? (
                <>
                  <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Generating...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-3 -ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2a10 10 0 100 20 10 10 0 000-20zM12 6v6l4.5 2.25M12 18h.01"></path></svg>
                  Create My AI Concept
                </>
              )}
            </button>
            <a href="#pricing">
              <button
                className="flex items-center justify-center w-80 px-6 py-3 mt-4 font-semibold text-white transition-all duration-300 cursor-pointer rounded-md shadow-md bg-green-600 hover:bg-green-500"
                type="button"
              >
                Build My Revenue Engine
              </button>
            </a>
          </div>
        </div>

        {/* Warning/Error Messages */}
        {conceptError && (
          <p className="p-3 mt-4 text-sm text-red-400 rounded-md bg-red-900/30 text-center max-w-4xl mx-auto" role="alert">
            Error: {conceptError}
          </p>
        )}

        {/* Generated Content Preview */}
        {generatedCodeContent && generatedOutputType && (
          <div className="mt-8 max-w-4xl mx-auto">
            <h3 className="mb-3 text-xl font-semibold text-teal-400 scroll-animate">
              AI Generated Concept Preview:
            </h3>
            <div className="overflow-hidden border rounded-md shadow-inner bg-slate-900 border-slate-700">
              <iframe
                srcDoc={generatedCodeContent}
                title="AI Generated Concept Template (HTML)"
                className="w-full h-[600px] border-0"
                sandbox="allow-scripts"
              ></iframe>
            </div>
            <div className="text-right mt-4">
              <p className="font-bold">Your design is ready! Download now!</p>
              <button
                onClick={handleDownloadHtml}
                className="inline-flex items-center justify-center px-4 py-2 font-semibold text-white transition-all duration-300 rounded-md shadow-md bg-green-600 hover:bg-green-500 disabled:bg-slate-600 cursor-pointer disabled:cursor-not-allowed"
                aria-label="Download HTML Template"
                type="button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
                Download HTML
              </button>
            </div>
          </div>
        )}

        {/* --- IMAGE MARQUEE SECTION --- */}
        <div className="mt-24 text-center max-w-6xl mx-auto">
          <h3 className="text-2xl text-slate-200 font-bold md:text-3xl scroll-animate">
            Launch Faster, Convert Smarter: Explore Our Pre-Optimized AI Website Templates
          </h3>
          <p className="mx-auto mt-2 text-slate-400 md:text-lg scroll-animate" style={{ transitionDelay: '0.2s' }}>
            Stop building from scratch or waiting weeks for designs. Start with a proven foundation that&apos;s ready to generate leads.</p>
          <p className="mx-auto mt-2 text-slate-400 md:text-lg scroll-animate" style={{ transitionDelay: '0.2s' }}>Our expertly designed, AI-optimized pre-built templates offer an instant solution for a polished, high-performance online presence. Each template is engineered for conversions and speed, giving you a powerful head start.</p>

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
