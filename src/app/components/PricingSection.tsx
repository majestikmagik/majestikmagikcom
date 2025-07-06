import React from 'react';
import { CheckCircleIcon, CreditCardIcon } from './Icons';

interface PricingPlan {
  name: string;
  description: string;
  bestFor: string;
  features: string[];
  price: string;
  buttonText: string;
  highlight: boolean;
  url: string;
}

interface PricingSectionProps {
  pricingPlans: PricingPlan[];
  lowTierPricingPlans: PricingPlan[];
  pricingTier: 'high' | 'low';
  setPricingTier: (tier: 'high' | 'low') => void;
  handleNavClick: (e: React.MouseEvent<HTMLAnchorElement>, item: string) => void;
}

const PricingSection: React.FC<PricingSectionProps> = ({
  pricingPlans,
  lowTierPricingPlans,
  pricingTier,
  setPricingTier,
  handleNavClick,
}) => {
  const displayedPlans = pricingTier === 'high' ? pricingPlans : lowTierPricingPlans;

  return (
    <section id="pricing" aria-labelledby="pricing-plans-heading" className="py-16 md:py-24 bg-slate-950">
      <div className="container px-6 mx-auto">
        <div className="mb-12 text-center">
          <h2 id="pricing-plans-heading" className="mb-4 text-3xl font-bold text-slate-100 scroll-animate md:text-4xl">
            Choose Your Magical Plan
          </h2>
          <p className="max-w-2xl mx-auto font-semibold text-slate-400 md:text-xl scroll-animate" style={{ transitionDelay: '0.3s' }}>
            We offer transparent pricing for projects of all sizes. Select a plan type below to find the perfect fit for your vision and budget.
          </p>
        </div>

        <div className="flex justify-center mb-20 scroll-animate">
          <div className="inline-flex rounded-md shadow-sm bg-slate-700/50" role="group">
            <button
              type="button"
              onClick={() => setPricingTier('high')}
              aria-pressed={pricingTier === 'high'}
              className={`px-6 py-3 text-sm font-semibold rounded-l-lg border border-transparent focus:z-10 focus:ring-2 focus:ring-indigo-500 cursor-pointer transition-all duration-200
                ${pricingTier === 'high' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-300 hover:bg-slate-600'}`}
            >
              Standard Plans
            </button>
            <button
              type="button"
              onClick={() => setPricingTier('low')}
              aria-pressed={pricingTier === 'low'}
              className={`px-6 py-3 text-sm font-semibold rounded-r-lg border border-transparent focus:z-10 focus:ring-2 focus:ring-indigo-500 cursor-pointer transition-all duration-200
                ${pricingTier === 'low' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-300 hover:bg-slate-600'}`}
            >
              Budget-Friendly Plans
            </button>
          </div>
        </div>

        <div className="grid items-stretch gap-8 md:grid-cols-1 lg:grid-cols-3">
          {displayedPlans.map((plan, index) => (
            <div
              key={plan.name}
              className={`scroll-animate flex flex-col h-full bg-slate-800 rounded-xl shadow-2xl border border-slate-700/50 overflow-hidden transition-all duration-300 hover:shadow-indigo-500/40 hover:border-slate-600 ${plan.highlight ? 'lg:scale-105 border-2 border-indigo-500 shadow-indigo-500/30 z-10' : ''}`
              }
              style={{ transitionDelay: `${0.2 + index * 0.1}s` }}
            >
              <div className="flex flex-col h-full p-6 md:p-8">
                <h3 className="mb-2 text-2xl font-bold text-white">{plan.name}</h3>
                <p className="mb-4 text-sm font-semibold leading-relaxed text-slate-400 min-h-[60px]">{plan.description}</p>
                <p className="mb-6 text-sm text-slate-300">
                  <strong className="font-semibold text-slate-100">Best For:</strong> {plan.bestFor}
                </p>

                <ul className="flex-grow mb-8 space-y-2 text-sm text-slate-300">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircleIcon className="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 text-indigo-400" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="my-6 text-4xl font-extrabold text-center text-white">
                  {plan.price}
                </div>
                <a
                  href={plan.url}
                  {...(plan.url.startsWith('#')
                    ? { onClick: (e: React.MouseEvent<HTMLAnchorElement>) => handleNavClick(e, plan.url) }
                    : { target: "_blank", rel: "noopener noreferrer" }
                  )}
                  className="flex items-center justify-center w-full mt-auto text-center text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-500 py-3 px-5 font-semibold transition-colors duration-300"
                >
                  <CreditCardIcon className="w-5 h-5 mr-2 text-white" />
                  {plan.buttonText}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;