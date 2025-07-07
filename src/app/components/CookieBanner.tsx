"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

/**
 * Cookie Banner Component
 * This is a Client Component that handles its own state for visibility
 * based on localStorage.
 */
export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if consent has already been given.
    // This code only runs on the client-side after the component mounts.
    const consent = localStorage.getItem('majestik_magik_cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []); // Empty dependency array ensures this runs only once.

  const handleAccept = () => {
    // Set consent in localStorage and hide the banner.
    localStorage.setItem('majestik_magik_cookie_consent', 'true');
    setIsVisible(false);
  };

  // Use Tailwind classes to control the slide-in/out animation
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transform border-t border-slate-700 bg-slate-900/95 p-4 backdrop-blur-sm transition-transform duration-500 ease-out ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      aria-describedby="cookie-message"
    >
      <div className="container mx-auto flex flex-col items-center justify-between md:flex-row">
        <p id="cookie-message" className="mb-3 text-sm text-slate-300 md:mb-0 md:mr-4">
          We use cookies to enhance your experience and analyze site traffic. By clicking &quot;Accept&quot;, you consent to our use of cookies. For more information, please read our <Link href="/privacy-policy" className="text-indigo-400 hover:text-indigo-300 underline">Privacy Policy</Link>.
        </p>
        <button
          onClick={handleAccept}
          className="flex-shrink-0 cursor-pointer rounded-md bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-md transition-colors hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          aria-label="Accept cookies"
        >
          Accept Cookies
        </button>
      </div>
    </div>
  );
}