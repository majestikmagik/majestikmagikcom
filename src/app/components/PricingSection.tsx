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

interface PricingSectionProps {
  pricingPlans: PricingPlan[];
  handleNavClick: (e: React.MouseEvent<HTMLAnchorElement>, item: string) => void;
}

const PricingSection: React.FC<PricingSectionProps> = ({
  pricingPlans,
}) => {
  return (
    <section id="pricing" aria-labelledby="pricing-plans-heading" className="py-16 md:py-24 bg-slate-900">
      <div className="container px-6 mx-auto">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h1 id="pricing-plans-heading" className="text-3xl font-bold text-slate-100 md:text-4xl scroll-animate">
            Worry-Free Website Care Plans
          </h1>
          <p className="mt-4 font-semibold text-slate-400 md:text-xl scroll-animate" style={{ transitionDelay: '0.2s' }}>
            Keep your site secure, fast, and up-to-date with our monthly care plans. No long-term contracts, just peace of mind.
          </p>
        </div>

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
                  {(plan.investment?.monthlyPlan?.includes || []).map(feature => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckIcon className="w-5 h-5 mt-1 text-green-500 flex-shrink-0" />
                      <span dangerouslySetInnerHTML={{ __html: feature.replace(/<[^>]*>/g, '') }} />
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
      </div>
    </section>
  );
};

export default PricingSection;