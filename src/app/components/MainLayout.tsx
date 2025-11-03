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
  const navItems = [
    { name: 'Home', url: '/#home' },
    { name: 'Templates', url: '/#templates' },
    { name: 'Pricing', url: '/#pricing' },
    { name: 'Labs', url: '/#labs' },
    { name: 'Team', url: '/#team' },
    { name: 'Testimonials', url: '/#testimonials' },
    { name: 'Contact', url: '/#contact' },
    { name: 'Shop', url: 'https://majestikmagik.printful.me/', external: true },
  ];

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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: { name: string, url: string, external?: boolean }) => {
    if (item.external) {
      // For external links, open in a new tab and prevent default navigation
      window.open(item.url, '_blank', 'noopener,noreferrer');
      e.preventDefault();
      return;
    }

    e.preventDefault();
    const targetId = item.url.split('#')[1];
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If no anchor on the page, navigate to the URL (useful when on a different route)
      if (item.url.startsWith('/')) {
        window.location.href = item.url;
      }
    }
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
