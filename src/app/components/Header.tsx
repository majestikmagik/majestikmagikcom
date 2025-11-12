"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Bars3Icon, XMarkIcon } from './Icons'; // Assuming Icons.tsx is in the same directory

interface HeaderProps {
  navItems: { name: string; url: string; external?: boolean }[];
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  handleNavClick: (e: React.MouseEvent<HTMLAnchorElement>, item: { name: string; url: string; external?: boolean }) => void;
}
// --- Header Component ---
// This component is designed to be sticky and responsive, adapting to scroll position and mobile view.
const Header: React.FC<HeaderProps> = ({
  navItems,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  handleNavClick,
}) => {

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ease-in-out ${isScrolled || isMobileMenuOpen
      ? 'bg-slate-950/70 backdrop-blur-md shadow-2xl shadow-slate-950'
      : 'bg-transparent shadow-none'
      }`}
    >
      <div className="container mx-auto px-6 py-6 flex justify-between items-center">
        <button
          onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex items-center space-x-2 text-2xl text-white cursor-pointer"
          aria-label="Majestik Magik Home"
          type="button"
        >
          <Image
            src="/img/logo_majestikmagik_inc.png"
            className="w-10 h-10 lazy-logo"
            alt="Majestik Magik icon"
            loading="lazy"
            width={48}
            height={48}
          />
          <span>Majestik Magik</span>
        </button>

        <nav className="hidden xl:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.url}
              className="text-slate-300 hover:text-indigo-400 transition-colors font-semibold duration-600 ease-in-out text-sm md:text-base"
              onClick={(e) => handleNavClick(e, item)}
              {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {item.name}
            </a>
          ))}
        </nav>

        <div className="xl:hidden flex items-center">
           <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-controls="mobile-menu"
            className="text-slate-300 hover:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 p-1 rounded-md cursor-pointer"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            type="button"
          >
            <span className="sr-only">{isMobileMenuOpen ? "Close menu" : "Open menu"}</span>
            {isMobileMenuOpen ? (
              <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="xl:hidden absolute top-full left-0 right-0 bg-slate-950/90 backdrop-blur-md shadow-slate-950 shadow-lg z-40" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-3 sm:px-3">
            {navItems.map((item) => (
              <a
                key={`mobile-${item.name}`}
                href={item.url}
                className="block rounded-md px-3 py-2 text-base font-semibold text-slate-300 hover:bg-slate-700 hover:text-indigo-400 transition-colors duration-300"
                onClick={(e) => handleNavClick(e, item)}
                {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;