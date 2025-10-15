import React from 'react';
import { CheckIcon } from './Icons';

interface PricingPlan {
  name: string;
  tagline?: string;
  description: string;
  bestFor: string;
  features: string[];
  price?: string;
  buttonText: string;
  highlight: boolean;
  url: string;
  coreBenefits?: string[];
  subscription?: string[];
  whatYouGet?: string[];
  timeline?: string;
  investment?: {
    setupFee: string;
    monthlyPlan: {
      name: string;
      price: string;
      includes: string[];
    };
  };
  optionalAddOns?: {
    name: string;
    description: string;
    price?: string;
  }[];
}

type MicroService = {
  service: string;
  price: string;
  blurb?: string;
  url: string;
};

interface PricingSectionProps {
  pricingPlans: PricingPlan[];
  handleNavClick?: (e: React.MouseEvent<HTMLAnchorElement>, item: string) => void;
  microServices?: MicroService[];
}

const DEFAULT_MICRO_SERVICES: MicroService[] = [
  { service: 'Shopify Notification or Email Template Fix', price: '$125', url: 'https://book.stripe.com/bJefZh2tU7SK2lw6lxdEs03' },
  { service: 'DNS or Email Setup / Fix', price: '$100', url: 'https://book.stripe.com/14AaEX1pQeh82lw39ldEs04' },
  { service: 'Website Speed Optimization', price: '$99', url: 'https://book.stripe.com/28E5kDfgGflcd0abFRdEs05' },
  { service: 'Landing Page Redesign', price: '$149', url: 'https://book.stripe.com/7sY9AT6Ka6OG9NYdNZdEs06' },
  { service: 'SEO Keyword Audit', price: '$75', url: 'https://book.stripe.com/eVq00j5G66OGaS2bFRdEs07' },
  { service: 'Contact Form Integration / Fix', price: '$60', url: 'https://book.stripe.com/8x228r8Si0qi2lw8tFdEs08' },
];

const PricingSection: React.FC<PricingSectionProps> = ({
  pricingPlans,
  microServices = DEFAULT_MICRO_SERVICES,
}) => {
  return (
    <section id="pricing" aria-labelledby="pricing-plans-heading" className="py-16 md:py-24 bg-slate-900">
      <div className="container px-6 mx-auto">
        {/* Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h1 id="pricing-plans-heading" className="text-3xl font-bold text-slate-100 md:text-4xl scroll-animate">
            Worry-Free Website Care Plans
          </h1>
          <p className="mt-4 font-semibold text-slate-400 md:text-xl scroll-animate" style={{ transitionDelay: '0.2s' }}>
            Keep your site secure, fast, and up-to-date with our monthly care plans. Cancel Anytime. No Long-Term Commitment.
          </p>
          <p className="mt-4 text-md text-slate-500 scroll-animate" style={{ transitionDelay: '0.3s' }}>
            Trusted by 20+ local businesses in Richmond
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid items-stretch gap-8 md:grid-cols-1 lg:grid-cols-3 justify-center">
          {pricingPlans.map((plan, index) => {
            const monthlyPrice = plan.investment?.monthlyPlan?.price || '';
            const priceMatch = monthlyPrice.match(/(\$\d+)\/?(.*)/);
            const displayPrice = priceMatch ? priceMatch[1] : monthlyPrice;
            const displayPeriod = priceMatch && priceMatch[2] ? `/${priceMatch[2]}` : '';

            return (
              <div
                key={plan.name}
                className={`scroll-animate flex flex-col p-8 text-center bg-slate-800 rounded-xl shadow-2xl border border-slate-700/50 transition-all duration-300 hover:shadow-indigo-500/40 hover:border-slate-600 ${plan.highlight ? 'lg:scale-105 border-2 border-indigo-500 shadow-indigo-500/30 z-10' : ''}`}
                style={{ transitionDelay: `${0.2 + index * 0.1}s` }}
              >
                <h3 className="text-2xl font-bold text-indigo-400">{plan.name}</h3>

                <div className="my-4">
                  <span className="text-5xl font-extrabold text-white">{displayPrice}</span>
                  <span className="text-lg text-slate-400">{displayPeriod}</span>
                </div>

                <p className="text-slate-500 mb-6">{plan.investment?.setupFee}</p>

                <ul className="flex-grow mb-8 space-y-3 text-left text-slate-300">
                  {(plan.investment?.monthlyPlan?.includes || []).map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckIcon className="w-5 h-5 mt-1 text-green-500 flex-shrink-0" />
                      <span
                        dangerouslySetInnerHTML={{ __html: feature.replace(/<[^>]*>/g, '') }}
                      />
                    </li>
                  ))}
                </ul>

                <a
                  href={plan.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto w-full px-6 py-3 font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-500 transition-colors duration-300"
                >
                  {plan.buttonText}
                </a>
              </div>
            );
          })}
        </div>

        {/* Micro Services */}
        <div
          id="micro-services"
          aria-labelledby="micro-services-heading"
          className="mt-16 md:mt-24"
        >
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h2 id="micro-services-heading" className="text-2xl md:text-3xl font-bold text-slate-100">
              Quick Fix Micro-Services
            </h2>
            <p className="mt-3 text-slate-400">
              High-impact fixes delivered remotely — same day or within 2 business days.
            </p>
          </div>

          {/* Cards on mobile, table look on desktop */}
          <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {microServices.map((m) => (
              <div
                key={m.service}
                className="rounded-xl border border-slate-700/60 bg-slate-800 p-5 shadow-lg hover:border-slate-600 transition"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-slate-100 font-semibold">{m.service}</h3>
                  <span className="text-indigo-300 font-bold whitespace-nowrap">{m.price}</span>
                </div>
                {m.blurb ? (
                  <p className="mt-2 text-sm text-slate-400">{m.blurb}</p>
                ) : null}
                <div className="mt-4">
                  <a
                    href={m.url}
                    className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-500 transition"
                  >
                    Request Service
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Small note */}
          <p className="mt-6 text-center text-sm text-slate-500">
            Need something not listed? <a href="#contact" className="text-indigo-400 hover:text-indigo-300 underline underline-offset-4">Ask for a custom micro-service</a>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
