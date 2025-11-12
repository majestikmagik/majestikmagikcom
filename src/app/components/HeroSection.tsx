"use client";

import React from 'react';
import Image from 'next/image';

interface HeroSectionProps {
  onWatchCommercial: () => void;
  onGetStarted: () => void;
  conceptUserPrompt: string;
  setConceptUserPrompt: (prompt: string) => void;
  handleGenerateConceptPreview: () => void;
  isConceptLoading: boolean;
  isGeminiInitialized: boolean;
  conceptError: string | null;
  generatedCodeContent: string;
  generatedOutputType: 'html' | 'react-tsx' | null;
}

const partners = [
  {
    id: 'parrisgainer', href: "https://www.parrisgainer.com",
    content: <Image src="/img/parrisgainer.webp" alt="Parris Gainer Consulting Services" className="lazy-logo h-8 sm:h-8 opacity-50 hover:opacity-100 transition-opacity" loading="lazy" width={120} height={40} />
  },
  {
    id: 'cearco', href: "https://cearcochemicals.com",
    content: <Image src="/img/cearco.webp" alt="Cearco Chemicals" className="lazy-logo h-8 sm:h-10 opacity-50 hover:opacity-100 transition-opacity" loading="lazy" width={90} height={40} />
  },
  {
    id: 'noelcustoms', href: "https://noelcustoms.shop",
    content: <Image src="/img/noel_customs.webp" alt="Noel Customs Shop" className="lazy-logo h-8 sm:h-10 opacity-50 hover:opacity-100 transition-opacity" loading="lazy" width={90} height={40} />
  },
  {
    id: 'orbitt', href: "https://orbitt.pro/mm",
    content: (
      <svg width="113" height="18" viewBox="0 0 113 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="lazy-logo h-8 sm:h-10 opacity-50 hover:opacity-100 cursor-pointer transition-opacity">
        <g clipPath="url(#clip0_7133_3109)">
          <path d="M16.8426 8.70299C16.8426 13.4079 13.6842 17.2155 8.42132 17.2155C3.15844 17.2155 0 13.4079 0 8.70299C0 3.99812 3.15844 0.19043 8.42132 0.19043C13.6842 0.19043 16.8426 3.99812 16.8426 8.70299ZM13.5877 8.70299C13.5877 5.55581 11.6512 3.02677 8.42132 3.02677C5.19142 3.02677 3.25491 5.55581 3.25491 8.70299C3.25491 11.8502 5.19142 14.3792 8.42132 14.3792C11.6512 14.3792 13.5877 11.8502 13.5877 8.70299Z" fill="white" />
          <path d="M21.6515 6.97597C22.4161 5.24874 23.1093 4.35156 26.1963 4.35156V7.42456C22.6305 7.1879 21.6015 8.44183 21.6015 11.6102V17.025H18.5396V4.5423H21.6015V5.22754C21.6015 5.7715 21.4586 6.24481 21.2442 6.66867C21.1478 6.8806 21.0763 7.16671 21.3621 7.21263C21.5051 7.23736 21.6265 7.04662 21.648 6.97597H21.6515Z" fill="white" />
          <path d="M30.4197 5.01217C30.4197 5.5102 30.3018 5.88815 30.0839 6.31201C29.9874 6.54866 29.8195 6.83124 30.0589 6.95133C30.2982 7.06789 30.4412 6.76059 30.4912 6.66876C31.2558 5.34419 32.5242 4.35165 34.4857 4.35165C37.762 4.35165 39.9879 7.18799 39.9879 10.7837C39.9879 14.3795 37.762 17.2159 34.4857 17.2159C32.5706 17.2159 31.2558 16.2445 30.4912 14.874C30.4447 14.8034 30.3483 14.5667 30.1339 14.6374C29.8695 14.7327 29.966 14.9694 30.0874 15.206C30.3018 15.6334 30.4233 16.0114 30.4233 16.4847V17.0286H27.3613V0H30.4233V5.01217H30.4197ZM36.9295 10.7837C36.9295 8.79866 35.9256 7.09615 33.7711 7.09615C31.7631 7.09615 30.4233 8.79866 30.4233 10.7837C30.4233 12.7688 31.7631 14.4749 33.7711 14.4749C35.9256 14.4749 36.9295 12.7724 36.9295 10.7837Z" fill="white" />
          <path d="M41.585 0H44.6469V3.02708H41.585V0ZM41.585 4.54239H44.6469V17.0286H41.585V4.54239Z" fill="white" />
          <path d="M51.028 7.18795V12.8889C51.028 14.2594 51.053 14.3795 52.3428 14.3795H54.4722V17.0286H51.6961C49.1593 17.0286 47.9624 16.2021 47.9624 13.1962V7.18795H45.665V4.53881H47.9624V1.13379H51.0244V4.53881H54.4687V7.18795H51.0244H51.028Z" fill="white" />
          <path d="M60.6466 7.18795V12.8889C60.6466 14.2594 60.6716 14.3795 61.9614 14.3795H64.0909V17.0286H61.3147C58.778 17.0286 57.5811 16.2021 57.5811 13.1962V7.18795H55.2837V4.53881H57.5811V1.13379H60.643V4.53881H64.0873V7.18795H60.643H60.6466Z" fill="white" />
          <path d="M111.449 11.4515L111.342 11.5999C109.842 13.6662 108.291 15.5948 107.09 15.7149C106.772 15.7431 106.494 15.6478 106.24 15.4147C104.968 14.2526 104.954 10.0599 105.475 6.65837L105.497 6.51002L103.05 5.74354L98.7585 12.8079L99.8375 4.17878L97.5008 3.49707L91.459 12.9633L92.9525 6.0685L90.5015 5.66936L89.5547 11.5999C88.0541 13.6662 86.5034 15.5948 85.3065 15.7149C84.9885 15.7431 84.7098 15.6478 84.4561 15.4147C83.1842 14.2526 83.1699 10.0599 83.6915 6.65837L83.713 6.51002L81.2655 5.74354L76.9745 12.8079L78.0535 4.17878L75.7168 3.49707L69.6751 12.9633L71.1685 6.0685L68.7175 5.66936L66.9775 16.552L69.1106 17.7424L75.4524 7.62972L74.2198 16.9088L76.4207 17.8342L81.1619 9.76316C81.0262 12.1015 81.1727 15.5418 82.9412 17.1136C83.6094 17.7106 84.2882 18.0037 85.0064 18.0037C85.1171 18.0037 85.2279 17.9967 85.3387 17.9825C86.4212 17.8519 87.586 17.0818 88.9116 15.6125L88.7615 16.552L90.8945 17.7424L97.2364 7.62972L96.0038 16.9088L98.2046 17.8342L102.946 9.76316C102.81 12.1015 102.957 15.5418 104.725 17.1136C105.393 17.7106 106.072 18.0037 106.79 18.0037C106.901 18.0037 107.012 17.9967 107.123 17.9825C108.77 17.7847 110.606 16.1176 112.9 12.7408L112.993 12.603L111.442 11.4551L111.449 11.4515Z" fill="#1A51F4" />
        </g>
        <defs>
          <clipPath id="clip0_7133_3109">
            <rect width="113" height="18" fill="white" />
          </clipPath>
        </defs>
      </svg>
    )
  }
];

const PLACEHOLDER_PROMPTS = [
  "A complete project management dashboard with task tracking and analytics.",
  "A full-featured e-commerce product catalog with filtering and cart.",
  "A SaaS application with user authentication and subscription management.",
  "A real-estate property listing platform with search and booking.",
  "A restaurant reservation system with menu browsing and bookings.",
  "A fitness tracking dashboard with workout history and progress analytics.",
  "A content management system with rich text editor and media management.",
  "A community forum application with user profiles and discussion threads.",
];

const HeroSection: React.FC<HeroSectionProps> = ({
  conceptUserPrompt,
  setConceptUserPrompt,
  handleGenerateConceptPreview,
  isConceptLoading,
  isGeminiInitialized,
  conceptError,
  generatedCodeContent,
  generatedOutputType,
}) => {
  const [isPreviewModalOpen, setIsPreviewModalOpen] = React.useState(false);
  const [databaseType, setDatabaseType] = React.useState<'postgresql' | 'mysql'>('postgresql');
  const [isDownloading, setIsDownloading] = React.useState(false);
  const [placeholderText, setPlaceholderText] = React.useState('');
  const [promptIndex, setPromptIndex] = React.useState(0);
  const [charIndex, setCharIndex] = React.useState(0);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [hasSavedVersion, setHasSavedVersion] = React.useState(false);
  const [currentCode, setCurrentCode] = React.useState(generatedCodeContent);
  const [showNotification, setShowNotification] = React.useState<'saving' | 'loading' | 'cleared' | null>(null);
  const [showClearConfirmModal, setShowClearConfirmModal] = React.useState(false);

  React.useEffect(() => {
    const currentPrompt = PLACEHOLDER_PROMPTS[promptIndex];
    const speed = isDeleting ? 30 : 50;

    const timer = setTimeout(() => {
      if (!isDeleting && charIndex < currentPrompt.length) {
        setPlaceholderText(currentPrompt.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (isDeleting && charIndex > 0) {
        setPlaceholderText(currentPrompt.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (!isDeleting && charIndex === currentPrompt.length) {
        // Wait before starting to delete
        setTimeout(() => setIsDeleting(true), 7000);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setPromptIndex((prev) => (prev + 1) % PLACEHOLDER_PROMPTS.length);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, promptIndex]);

  // Check for saved version on mount
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('majestik-magik-app');
      setHasSavedVersion(!!saved);
    }
  }, []);

  // Update currentCode when generatedCodeContent changes
  React.useEffect(() => {
    setCurrentCode(generatedCodeContent);
  }, [generatedCodeContent]);

  // Save to localStorage
  const handleSaveToLocalStorage = () => {
    if (typeof window !== 'undefined') {
      const appData = {
        code: currentCode,
        prompt: conceptUserPrompt,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem('majestik-magik-app', JSON.stringify(appData));
      setHasSavedVersion(true);
      setShowNotification('saving');
      setTimeout(() => setShowNotification(null), 3000);
    }
  };

  // Load from localStorage
  const handleLoadFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('majestik-magik-app');
      if (saved) {
        try {
          const appData = JSON.parse(saved);
          setCurrentCode(appData.code);
          setConceptUserPrompt(appData.prompt);
          setIsPreviewModalOpen(true);
          setShowNotification('loading');
          setTimeout(() => setShowNotification(null), 3000);
        } catch {
          alert('Error loading saved app');
        }
      }
    }
  };

  // Clear localStorage
  const handleClearLocalStorage = () => {
    setShowClearConfirmModal(true);
  };

  const confirmClearLocalStorage = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('majestik-magik-app');
      setHasSavedVersion(false);
      setShowNotification('cleared');
      setTimeout(() => setShowNotification(null), 3000);
      setShowClearConfirmModal(false);
    }
  };
  return (
    <section id="home" aria-labelledby="home-heading" className="relative py-20 md:py-32 overflow-hidden">

      {/* Deep blue to slate-950 circular gradient overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(30, 58, 138, 0.8) 0%, rgba(15, 23, 42, 0.95) 70%)',
        }}
      ></div>
      <div className="container relative px-6 mx-auto text-center z-20">
        {/* SEO-optimized H1 */}
        <h1 className="mb-6 md:mb-8 text-6xl md:text-6xl lg:text-9xl text-white font-semibold scroll-animate">
          <span className="text-transparent bg-clip-text animate-gradient-x">
            Build. Ship. Scale.
          </span>
        </h1>

        {/* Keyword-rich supporting paragraph */}
        <p
          className="max-w-5xl mx-auto mb-4 md:mb-6 text-lg md:text-xl text-slate-200 scroll-animate"
          style={{ transitionDelay: "0.1s" }}
        >
          Helping small businesses build powerful websites that attract customers.
        </p>

        {/* Accessibility helper to reinforce long-tail terms without cluttering UI */}
        <p className="sr-only">
          Same-day website troubleshooting, emergency website repair, local website
          maintenance in Richmond VA, WordPress fixes, Shopify bug fixes, Webflow
          quick updates, speed optimization, technical SEO fixes.
        </p>


        {/* AI Concept Input and Buttons */}
        <div
          className="max-w-6xl p-6 mx-auto rounded-xl shadow-2xl md:p-8 bg-slate-800/80 scroll-animate mt-12"
          style={{ transitionDelay: '0.5s' }}
        >
          <textarea
            value={conceptUserPrompt}
            onChange={(e) => setConceptUserPrompt(e.target.value)}
            placeholder={placeholderText}
            rows={6}
            className="w-full p-2 transition-colors duration-300 ease-in-out bg-slate-700 text-slate-200 placeholder-slate-500 scroll-animate"
            style={{
              border: '2px solid',
              borderImage: 'linear-gradient(135deg, #4f46e5 0%, #2563eb 50%, #14b8a6 100%) 1',
              boxShadow: 'inset 0 0 0 0px rgba(0,0,0,0), 0 0 20px rgba(79, 70, 229, 0.3), 0 0 40px rgba(37, 99, 235, 0.2), 0 0 60px rgba(20, 184, 166, 0.1)',
            }}
            aria-label="Describe your desired concept template"
          />
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row mt-4">
            <button
              onClick={handleGenerateConceptPreview}
              disabled={isConceptLoading || !isGeminiInitialized}
              className="flex items-center justify-center w-80 px-6 py-3 font-semibold text-white transition-all duration-300 cursor-pointer rounded-md shadow-md bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
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
                  Build App
                </>
              )}
            </button>
            <a href="#pricing" className="inline-block">
              <button
                type="button"
                className="flex items-center justify-center w-80 px-6 py-3 rounded-md font-semibold
               text-white bg-teal-600/90 hover:bg-teal-500 transition-all duration-300
               shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
                aria-label="Need Help? Book Today"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M8 7h8M8 11h8M8 15h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <rect x="3" y="4" width="18" height="16" rx="2" ry="2" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
                Need Help? Book Today
              </button>
            </a>
          </div>

          {/* Error Message */}
          {conceptError && (
            <p className="p-3 mt-4 text-sm text-red-400 rounded-md bg-red-900/30 text-center max-w-2xl mx-auto" role="alert">
              Error: {conceptError}
            </p>
          )}

          {/* Show modal trigger button when content is generated */}
          {generatedCodeContent && generatedOutputType && (
            <div className="mt-4 text-center flex gap-2 justify-center flex-wrap">
              <button
                onClick={() => setIsPreviewModalOpen(true)}
                className="inline-flex items-center justify-center px-6 py-3 font-semibold text-white transition-all duration-300 rounded-md shadow-md bg-blue-600 hover:bg-blue-500 cursor-pointer"
                type="button"
              >
                View Your Design Preview
              </button>
              {hasSavedVersion && (
                <button
                  onClick={handleLoadFromLocalStorage}
                  className="inline-flex items-center justify-center px-6 py-3 font-semibold text-white transition-all duration-300 rounded-md shadow-md bg-purple-600 hover:bg-purple-500 cursor-pointer"
                  type="button"
                >
                  📦 Load Saved App
                </button>
              )}
            </div>
          )}
        </div>

        {/* Modal for Generated Content Preview */}
        {isPreviewModalOpen && generatedCodeContent && generatedOutputType && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4">
            <div className="relative bg-slate-900 rounded-xl shadow-2xl max-w-6xl w-full max-h-screen overflow-auto">
              {/* Close Button */}
              <button
                onClick={() => setIsPreviewModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 cursor-pointer hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Modal Content */}
              <div className="p-8">
                <h2 className="text-2xl font-bold text-white mb-4">Your AI Generated Concept</h2>

                {/* Preview */}
                <div className="overflow-hidden border rounded-md shadow-inner bg-slate-800 border-slate-700 mb-6">
                  <iframe
                    srcDoc={generatedCodeContent}
                    title="AI Generated Concept Template"
                    className="w-full h-[600px] border-0"
                    sandbox="allow-scripts"
                  ></iframe>
                </div>

                {/* Download Options & AI Editing */}
                <div className="flex flex-col gap-4 justify-end">
                  {/* Database & Save Options */}
                  <div className="flex gap-4 justify-end flex-wrap items-center">
                    <div className="flex gap-2">
                      <label className="text-white text-sm font-semibold">Database:</label>
                      <select
                        value={databaseType}
                        onChange={(e) => setDatabaseType(e.target.value as 'postgresql' | 'mysql')}
                        className="px-3 py-1 bg-slate-700 text-white rounded border border-slate-600"
                      >
                        <option value="postgresql">PostgreSQL</option>
                        <option value="mysql">MySQL</option>
                      </select>
                    </div>
                    <button
                      onClick={handleSaveToLocalStorage}
                      className="px-3 py-1 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-500 cursor-pointer rounded transition-colors"
                      title="Save to browser storage for later"
                      type="button"
                    >
                      💾 Save to Browser
                    </button>
                    {hasSavedVersion && (
                      <button
                        onClick={handleClearLocalStorage}
                        className="px-3 py-1 text-sm font-semibold text-white bg-red-600 hover:bg-red-500 cursor-pointer rounded transition-colors"
                        title="Clear saved version"
                        type="button"
                      >
                        🗑️ Clear Saved
                      </button>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 justify-end flex-wrap">
                    <button
                      onClick={() => setIsPreviewModalOpen(false)}
                      className="px-4 py-2 font-semibold cursor-pointer text-white bg-slate-700 hover:bg-slate-600 rounded-md transition-colors"
                      type="button"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => {
                        const blob = new Blob([currentCode], { type: 'text/html' });
                        const href = URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = href;
                        link.download = 'majestik-magik-concept.html';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        URL.revokeObjectURL(href);
                      }}
                      className="inline-flex items-center justify-center px-4 py-2 font-semibold cursor-pointer text-white bg-blue-600 hover:bg-blue-500 rounded-md transition-colors"
                      type="button"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
                      Download HTML
                    </button>
                    <button
                      onClick={async () => {
                        setIsDownloading(true);
                        try {
                          const response = await fetch('/api/generate-app-package', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                              appDescription: conceptUserPrompt || 'Full-Stack Application',
                              databaseType,
                              format: 'react',
                            }),
                          });

                          if (!response.ok) {
                            const error = await response.json();
                            throw new Error(error.error || 'Failed to generate package');
                          }

                          // Get ZIP file from response
                          const blob = await response.blob();
                          const href = URL.createObjectURL(blob);
                          const link = document.createElement('a');
                          link.href = href;
                          link.download = `fullstack-app-react-${databaseType}.zip`;
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                          URL.revokeObjectURL(href);
                        } catch (error) {
                          console.error('Download failed:', error);
                          alert('Failed to download React application package');
                        } finally {
                          setIsDownloading(false);
                        }
                      }}
                      disabled={isDownloading}
                      className="inline-flex items-center justify-center px-4 py-2 font-semibold cursor-pointer text-white bg-green-600 hover:bg-green-500 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-md transition-colors"
                      type="button"
                    >
                      {isDownloading ? (
                        <>
                          <svg className="w-5 h-5 mr-2 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                          Generating...
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
                          Download React/Next.js
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Companies Partner Banner */}
        <p className="text-sm text-slate-500 mt-30 mb-4 scroll-animate">
          Trusted by businesses in Richmond, VA and beyond
        </p>
        <div className="scrolling-logos-wrapper scroll-animate">
          <div className="scrolling-logos-container">
            {[...partners, ...partners, ...partners].map((partner, index) => (
              <a
                key={`${partner.id}-${index}`}
                href={partner.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${partner.id}`}
                className="flex items-center justify-center flex-shrink-0 mr-8 sm:mr-12 last:mr-0"
              >
                {partner.content}
              </a>
            ))}
          </div>
        </div>

        {/* Notification Modal */}
        {showNotification && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center pointer-events-none">
            <div className="bg-slate-900 border-2 border-green-500 rounded-lg shadow-2xl p-8 max-w-sm mx-4 pointer-events-auto animate-in fade-in zoom-in duration-300">
              <div className="flex items-center gap-4">
                {showNotification === 'saving' && (
                  <>
                    <div className="flex-shrink-0">
                      <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">App Saved!</h3>
                      <p className="text-sm text-slate-300">Your app has been saved to browser storage.</p>
                    </div>
                  </>
                )}
                {showNotification === 'loading' && (
                  <>
                    <div className="flex-shrink-0">
                      <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">App Loaded!</h3>
                      <p className="text-sm text-slate-300">Your saved app has been restored.</p>
                    </div>
                  </>
                )}
                {showNotification === 'cleared' && (
                  <>
                    <div className="flex-shrink-0">
                      <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Cleared!</h3>
                      <p className="text-sm text-slate-300">Your saved app has been removed.</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Clear Confirmation Modal */}
        {showClearConfirmModal && (
          <div className="fixed inset-0 z-[10001] flex items-center justify-center bg-black/70 p-4">
            <div className="bg-slate-900 border-2 border-slate-700 rounded-lg shadow-2xl p-8 max-w-sm">
              <h3 className="text-xl font-bold text-white mb-2">Clear Saved App?</h3>
              <p className="text-slate-300 mb-6">
                Are you sure you want to delete your saved app? This action cannot be undone.
              </p>
              <div className="flex gap-4 justify-end">
                <button
                  onClick={() => setShowClearConfirmModal(false)}
                  className="px-4 py-2 font-semibold text-white bg-slate-700 hover:bg-slate-600 rounded-md transition-colors"
                  type="button"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmClearLocalStorage}
                  className="px-4 py-2 font-semibold text-white bg-red-600 hover:bg-red-500 rounded-md transition-colors"
                  type="button"
                >
                  Clear App
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;