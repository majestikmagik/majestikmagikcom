'use client';

import React, { useState } from 'react'; // useEffect removed
import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import CookieBanner from './CookieBanner';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const navItems = ['Home', 'Services', 'Templates', 'Pricing', 'Labs', 'Team', 'Testimonials', 'Contact'];

  // Get the current URL path
  const pathname = usePathname();
  
  // Check if the current path is one of the policy pages
  const isPolicyPage = [
    '/privacy-policy',
    '/terms-of-service',
    '/refund-policy',
    '/cookie-policy',
    '/intellectual-property-policy',
    '/cyber-security-policy'
  ].includes(pathname);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: string) => {
    e.preventDefault();
    const sectionId = item.toLowerCase().replace(/\s+/g, '-');
    
    if (window.location.pathname === '/') {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
        window.location.href = `/#${sectionId}`;
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        navItems={navItems}
        handleNavClick={handleNavClick}
      />

      <main>
        {children}
      </main>
      
      {/* The 'isPolicyPage' variable is passed as the 'isAlwaysVisible' prop */}
      <Footer isAlwaysVisible={isPolicyPage} />
      
      <CookieBanner />
    </div>
  );
}
