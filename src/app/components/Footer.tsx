'use client';

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faGithub, faDiscord } from '@fortawesome/free-brands-svg-icons';

// --- SVG Icons for the Footer ---
const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-slate-400">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-slate-400">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-slate-400">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const LanguageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2">
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
    <path d="M2 12h20" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);





const Footer: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This effect runs only on the client, after the initial render
    setIsClient(true);
  }, []);

  return (
    <footer id="contact" aria-labelledby="contact-heading" className="bg-slate-800  text-slate-400">
      <div className="container px-6 py-12 mx-auto">

        {/* Top Contact Bar */}
        <div id="contact-info" className="scroll-animate mx-auto grid grid-cols-2 gap-6 mb-10 md:flex-row lg:grid-cols-3 justify-items-center" style={{ transitionDelay: '0.2s' }}>
          <div className="flex items-center space-x-4">
            <LocationIcon />
            <div>
              <p className="font-semibold text-slate-300">Address:</p>
              <p className="text-sm">405 E. Laburnum Ave. Ste 3, Richmond, VA 23222</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <PhoneIcon />
            <div>
              <p className="font-semibold text-slate-300">Phone:</p>
              <p className="text-sm">(804) 362-7561</p>
            </div>
          </div>
          <div className="flex items-center mx-auto space-x-4">
            <EmailIcon />
            <div>
              <p className="font-semibold text-slate-300">Email:</p>
              <a href="mailto:contact@majestikmagik.com" className="text-sm transition-colors hover:text-indigo-400">
                contact@majestikmagik.com
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 my-8"></div>

        {/* Main Links Grid */}
        <div className="mx-auto grid grid-cols-2 gap-8 lg:grid-col-2 justify-items-center">


          <div className="scroll-animate md:text-left" style={{ transitionDelay: '0.4s' }}>
            <h3 className="mb-4 font-bold tracking-wider text-slate-300 uppercase">Quick Links</h3>
            <ul className="space-y-2">

              <li className="mb-2">
                <a href="/privacy-policy"
                  className="footer-link flex items-center font-semibold transition-colors hover:text-indigo-400 duration-300"
                  aria-label="Read our Privacy Policy"

                >
                  Privacy Policy
                </a>
              </li>
              <li className="mb-2">
                <a href="/terms-of-service"
                  className="footer-link flex items-center font-semibold transition-colors hover:text-indigo-400 duration-300"
                  aria-label="Read our Privacy Policy"

                >
                  Terms of Service
                </a>
              </li>

              <li className="mb-2">
                <a href="/cookie-policy"
                  className="footer-link flex items-center font-semibold transition-colors hover:text-indigo-400 duration-300"
                  aria-label="Read our Cookie Policy"

                >
                  Cookie Policy
                </a>
              </li>
              <li className="mb-2">
                <a href="/refund-policy"
                  className="footer-link flex items-center font-semibold transition-colors hover:text-indigo-400 duration-300"
                  aria-label="Read our Refund Policy"

                >
                  Refund Policy
                </a>
              </li>
              <li className='mb-2'>
                <a href="/intellectual-property"
                  className="footer-link flex items-center font-semibold transition-colors hover:text-indigo-400 duration-300"
                  aria-label="Read our Intellectual Property Policy"

                >
                  Intellectual Property
                </a>
              </li>
              <li className="mb-2">
                <a href="/cyber-security-policy"
                  className="footer-link flex items-center font-semibold transition-colors hover:text-indigo-400 duration-300"
                  aria-label="Learn about our Cyber Security practices"

                >
                  Cyber Security
                </a>
              </li>
              <li className="mb-2">
                <a href="/sitemap.xml"
                  className="footer-link flex items-center font-semibold transition-colors hover:text-indigo-400 duration-300"
                  aria-label="View our Sitemap"

                >
                  Sitemap
                </a>
              </li>


            </ul>
          </div>


          <div className="scroll-animate md:text-left" style={{ transitionDelay: '0.2s' }}>
            <h3 className="mb-4 font-bold tracking-wider text-slate-300 uppercase">Social Media</h3>
            <ul className="space-x-6 flex items-center justify-center text-xl text-slate-400">
              <li>
                <a href="https://www.facebook.com/majestikmagik/" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Facebook" className="transition-colors duration-300 hover:text-indigo-400"><FontAwesomeIcon icon={faFacebook} /></a>
              </li>
              <li>
                <a href="https://www.instagram.com/majestikmagik/" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram" className="transition-colors duration-300 hover:text-indigo-400"><FontAwesomeIcon icon={faInstagram} /></a>
              </li>
              <li>
                <a href="https://github.com/majestikmagik" target="_blank" rel="noopener noreferrer" aria-label="Check out our GitHub profile" className="transition-colors duration-300 hover:text-indigo-400"><FontAwesomeIcon icon={faGithub} /></a>
              </li>
              <li>
                <a href="https://discord.gg/Bmz3cW9krQ" target="_blank" rel="noopener noreferrer" aria-label="Join our Discord server" className="transition-colors duration-300 hover:text-indigo-400"><FontAwesomeIcon icon={faDiscord} /></a>
              </li>

            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="bg-slate-900">
        <div className="container px-6 py-4 mx-auto border-t border-slate-800">
          <div className="flex flex-col items-center justify-between text-sm md:flex-row">
            <p className="mb-4 text-center md:mb-0 md:text-left">&copy; 2025 Majestik Magik. All rights reserved.</p>
            {isClient && (
              <div className="trustpilot-widget transition-colors hover:text-indigo-400" data-locale="en-US" data-template-id="56278e9abfbbba0bdcd568bc" data-businessunit-id="66c36745eb620c5977db34ef" data-style-height="52px" data-style-width="100%">
                <a href="https://www.trustpilot.com/review/majestikmagik.com" target="_blank" rel="noopener noreferrer">
                  Review Us On Trustpilot
                </a>
              </div>
            )}
            <button className="flex items-center mt-4 transition-colors md:mt-0 hover:text-indigo-400">
              <LanguageIcon />
              English (United States)
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
