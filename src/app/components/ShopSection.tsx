'use client';

import React from 'react';
import Image from 'next/image';

// --- SVG Icon Components ---
const ArrowRightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path
      fillRule="evenodd"
      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

// --- MAJESTIK MAGIK SHOP SECTION ---
export const ShopSection = () => {
  return (
    <section
      id="shop"
      aria-labelledby="shop-heading"
      className="relative py-16 md:py-24 overflow-hidden"
    >
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/majestikmagik_shop_bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-slate-950/90 z-10"></div>

      <div className="container relative px-6 mx-auto z-20">
        <div className="grid md:grid-cols-2 gap-12 items-center scroll-animate">
          <div className="order-2 md:order-1">
            <p className="text-sm font-bold uppercase tracking-wider text-indigo-400 mb-2">
              Shop the Collection
            </p>
            <h2
              id="shop-heading"
              className="text-3xl md:text-4xl font-bold text-slate-100 mb-4"
            >
              Majestik Magik Apparel
            </h2>
            <p className="text-slate-400 mb-6">
              Express your creativity and ambition through Majestik Magik’s official apparel line.
              Each piece represents innovation, empowerment, and hustle — designed for creators,
              visionaries, and builders shaping the future.
            </p>
            <p className="text-slate-400 mb-8">
              From premium tees and hoodies to sleek accessories, our collection embodies the
              movement behind Majestik Magik: turning ideas into impact.
            </p>
            <a
              href="https://majestikmagik.printful.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors group"
            >
              Visit the Shop
              <ArrowRightIcon className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
          <div className="order-1 md:order-2">
            <Image
              src="/img/majestikmagik_apparel_showcase.webp"
              alt="Majestik Magik Apparel Showcase"
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

export default ShopSection;
