'use client';

import React, { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';

const ArrowLeftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path
      fillRule="evenodd"
      d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
      clipRule="evenodd"
    />
  </svg>
);

// FAQ questions
const faqs = [
  {
    question: 'What services does Majestik Magik offer?',
    answer:
      'Custom web design & development (React/Next.js/WordPress), eCommerce, SEO, analytics, CRM tools, AI integrations, and ongoing support/maintenance for professional services, e-commerce, and small businesses. We work with industries such as manufacturing, healthcare, professional services, HVAC, plumbing, roofing, etc to deliver high-quality digital and AI solutions.',
  },
  {
    question: 'How do I request a quote?',
    answer:
      'Email contact@majestikmagik.com or use the contact form on our site. We’ll schedule a 15–20 min discovery call and send a proposal within 2–3 business days.',
  },
  {
    question: 'What industries do you specialize in?',
    answer:
      'Local service businesses, startups/SaaS, healthcare/medical (HIPAA-aware builds), and eCommerce. We tailor deliverables to your industry’s workflow.',
  },
  {
    question: 'How long does a typical website project take?',
    answer:
      'Basic sites: ~1–5+ days. Mid-sized: 4–6 weeks. Custom/complex or eCommerce: 6–10+ weeks. Timelines depend on content readiness and feedback speed.',
  },
  {
    question: 'What does your process look like?',
    answer:
      'Discovery → Scope/Proposal → Design → Build → Review/QA → Launch → Training & post-launch support. You’ll have a single point of contact throughout.',
  },
  {
    question: 'Do you require a deposit?',
    answer:
      'Yes. Projects usually start with 40–50% to book the slot, with the remainder tied to milestones or pre-launch.',
  },
  {
    question: 'What platforms/CMS do you support?',
    answer:
      'WordPress (with performance/security best practices), custom Next.js sites, and headless setups. We recommend based on your goals and team capacity.',
  },
  {
    question: 'Do you provide WordPress training?',
    answer:
      'Yes—video tutorials and live walkthroughs. Start here: https://majestikmagik.com/training/wordpress',
  },
  {
    question: 'Who owns my website and content after launch?',
    answer:
      'You do. Upon final payment, you own your site code (per contract), content, and assets. We’ll transfer admin credentials and repos as needed.',
  },
  {
    question: 'Do you handle hosting and domains?',
    answer:
      'We can set up hosting (e.g., WP Engine, AWS) and configure your domain/DNS. You can keep accounts in your name; we’ll help manage access securely.',
  },
  {
    question: 'Do you offer maintenance plans?',
    answer:
      'Yes—updates, backups, uptime monitoring, security hardening, small edits, and monthly performance/SEO reports. Plans are tailored to your site.',
  },
  {
    question: 'Can you improve my site speed and Core Web Vitals?',
    answer:
      'Absolutely. We optimize images, code-split, cache, tune servers/CDN, and audit third-party scripts to lift CWV scores.',
  },
  {
    question: 'Do you do SEO?',
    answer:
      'Yes—technical SEO, on-page optimization, schema, and content guidance. We also set up analytics, goals, and dashboards.',
  },
  {
    question: 'What about accessibility (ADA/WCAG)?',
    answer:
      'We follow WCAG 2.1 AA best practices in structure, contrast, keyboard navigation, and ARIA. We can add ongoing monitoring if needed.',
  },
  {
    question: 'How many design revisions are included?',
    answer:
      'Typically two rounds per page/template in the base scope. Additional revisions are welcome and billed at our hourly rate or via a change order.',
  },
  {
    question: 'Can you migrate my current site?',
    answer:
      'Yes. We’ll audit your stack, create a migration plan, and move content with minimum downtime. We can modernize the design during the move.',
  },
  {
    question: 'Do you integrate payments and subscriptions?',
    answer:
      'Yes—Stripe for one-time payments, subscriptions, and marketplaces. We also implement best practices for security and compliance.',
  },
  {
    question: 'How do you handle security?',
    answer:
      'Hardened hosting, least-privilege access, HTTPS, regular updates, WAF/CDN options, backups, and security monitoring are standard in our builds.',
  },
  {
    question: 'What analytics will I get?',
    answer:
      'GA4 or privacy-friendly analytics, Search Console, heatmaps (optional), and goal/event tracking with monthly summaries in maintenance plans.',
  },
  {
    question: 'Do you write copy or create content?',
    answer:
      'We can refine your copy or create new content. We also offer guided prompts and brand voice frameworks if you prefer to draft in-house.',
  },
  {
    question: 'What if I need urgent changes after launch?',
    answer:
      'We offer expedited support windows and on-call options. For emergencies (e.g., downtime), we prioritize incident response immediately.',
  },
  {
    question: 'Can you connect my CRM or marketing tools?',
    answer:
      'Yes—HubSpot, Mailchimp/Brevo, Zapier, Meta/Google pixels, and custom APIs. For local businesses, we can also onboard you to our Community CRM.',
  },
  {
    question: 'How do you price projects?',
    answer:
      'Fixed-scope packages for common builds and customized quotes for complex work. We’ll provide clear deliverables, timeline, and payment schedule.',
  },
  {
    question: 'Do you offer refunds?',
    answer:
      'See our Refund Policy at /refund-policy. We scope carefully and communicate milestones to avoid surprises.',
  },
  {
    question: 'What are your support hours?',
    answer:
      'Standard support is Monday–Friday, 9am–5pm ET. We offer premium/after-hours support plans for teams that need extended coverage.',
  },
  {
    question: 'Can you help with branding or logos?',
    answer:
      'Yes—brand discovery, logo kits, typography/color systems, and usage guidelines to keep your brand consistent across channels.',
  },
  {
    question: 'Do you work with healthcare and HIPAA considerations?',
    answer:
      'Yes. We build HIPAA-aware systems on eligible services and maintain strict data handling rules. For PHI, we guide you on BAAs and architecture.',
  },
  {
    question: 'How do I send files and credentials securely?',
    answer:
      'We’ll share a secure upload link or password manager request. Avoid emailing passwords; we use least-privilege access and revoke when finished.',
  },
  {
    question: 'Can you help with site audits and roadmaps?',
    answer:
      'Yes—tech, UX, SEO, and conversion audits with priority roadmaps and quick-win recommendations.',
  },
  {
    question: 'Where can I read your policies?',
    answer:
      'Privacy, Terms, Cookies, Refunds, IP, and Cyber Security policies are linked in our site footer for transparency.',
  },
];

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [query, setQuery] = useState('');

  // Reset any open panel when the search changes (keeps UX tidy)
  useEffect(() => {
    setOpenIndex(null);
  }, [query]);

  const filteredFaqs = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return faqs;
    return faqs.filter(({ question, answer }) =>
      (question + ' ' + answer).toLowerCase().includes(q)
    );
  }, [query]);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-slate-300">
      <main className="flex-grow py-16 md:py-24">
        <div className="container mx-auto px-6">
          <Link
            href="/"
            className="mb-8 inline-flex items-center text-indigo-400 hover:text-indigo-300 transition-colors group text-sm"
            aria-label="Back to home"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <div className="bg-slate-800 p-6 md:p-10 rounded-xl shadow-2xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-slate-100">Frequently Asked Questions</h1>

            {/* Search Bar */}
            <div className="mb-6">
              <label htmlFor="faq-search" className="sr-only">Search FAQs</label>
              <div className="relative">
                <input
                  id="faq-search"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search FAQs (e.g., SEO, refunds, WordPress)…"
                  className="w-full rounded-md bg-slate-700/40 border border-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 outline-none px-4 py-3 text-slate-200 placeholder-slate-400"
                  aria-describedby="faq-search-help"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                  >
                    ×
                  </button>
                )}
              </div>
              <div id="faq-search-help" className="mt-2 text-sm text-slate-400">
                {filteredFaqs.length} result{filteredFaqs.length === 1 ? '' : 's'}
                {query ? ` for “${query}”` : ''}
              </div>
            </div>

            {/* FAQ List */}
            <div className="space-y-4">
              {filteredFaqs.length === 0 ? (
                <div className="rounded-lg border border-slate-700 bg-slate-800 p-5 text-slate-400">
                  No results. Try different keywords like <em>SEO</em>, <em>refund</em>, <em>training</em>, or <em>hosting</em>.
                </div>
              ) : (
                filteredFaqs.map((faq, index) => (
                  <div key={`${faq.question}-${index}`} className="border border-slate-700 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggle(index)}
                      className="w-full text-left px-5 py-4 bg-slate-700/30 hover:bg-slate-700/50 text-lg font-medium flex justify-between items-center"
                      aria-expanded={openIndex === index}
                      aria-controls={`faq-panel-${index}`}
                    >
                      {faq.question}
                      <span className={`ml-4 transform transition-transform ${openIndex === index ? 'rotate-90' : ''}`}>
                        ▶
                      </span>
                    </button>
                    {openIndex === index && (
                      <div
                        id={`faq-panel-${index}`}
                        className="px-5 py-4 bg-slate-800 text-slate-400 border-t border-slate-700"
                      >
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FAQPage;
