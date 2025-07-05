"use client";

import React, { useState, useEffect } from 'react';
import { Bars3Icon, XMarkIcon } from './Icons'; // Assuming Icons.tsx is in the same directory

interface HeaderProps {
  navItems: string[];
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  handleNavClick: (e: React.MouseEvent<HTMLAnchorElement>, item: string) => void;
  currentPolicyPageId: string | null; // Add this prop
  handleClosePolicyPage: () => void; // Add this prop
}

const Header: React.FC<HeaderProps> = ({
  navItems,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  handleNavClick,
  currentPolicyPageId,
  handleClosePolicyPage
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
    <header className={`sticky top-0 z-50 transition-all duration-300 ease-in-out ${isScrolled || isMobileMenuOpen || currentPolicyPageId
      ? 'bg-slate-950 backdrop-blur-md shadow-xl shadow-slate-950'
      : 'bg-transparent shadow-none'
      }`}
    >
      <div className="container mx-auto px-6 py-6 flex justify-between items-center">
        <button
          onClick={() => currentPolicyPageId ? handleClosePolicyPage() : document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex items-center space-x-2 text-2xl text-white cursor-pointer"
          aria-label="Majestik Magik Home"
        >
          <img
            src="/img/logo_majestikmagik.webp"
            className="w-8 h-8 lazy-logo"
            alt="Majestik Magik icon"
            loading="lazy"
          />
          <span>Majestik Magik</span>
        </button>

        <nav className="hidden xl:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\.\s*/g, '-')}`}
              className="text-slate-300 hover:text-white transition-colors font-semibold duration-600 ease-in-out text-sm md:text-base"
              onClick={(e) => handleNavClick(e, item)}
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="xl:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-controls="mobile-menu"
            aria-expanded={isMobileMenuOpen}
            className="text-slate-300 hover:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 p-1 rounded-md cursor-pointer"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
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
        <div className="xl:hidden absolute top-full left-0 right-0 bg-slate-950 backdrop-blur-md shadow-lg z-40" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-3 sm:px-3">
            {navItems.map((item) => (
              <a
                key={`mobile-${item}`}
                href={`#${item.toLowerCase().replace(/\.\s*\s+/g, '-')}`}
                className="block rounded-md px-3 py-2 text-base font-semibold text-slate-300 hover:bg-slate-700 hover:text-indigo-400 transition-colors duration-300"
                onClick={(e) => handleNavClick(e, item)}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;