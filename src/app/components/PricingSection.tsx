import React from 'react';
import { CheckCircleIcon, CreditCardIcon } from './Icons';

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
      <div className="container px-6 mb-20 mx-auto">
        <div className="mb-20 text-center">
          <h1 id="pricing-plans-heading" className="mb-10 text-3xl font-bold text-slate-100 scroll-animate md:text-4xl">
            Turn Vision into Profit: Your Path to a High-Performance, Managed Website
          </h1>
          <p className="max-w-6xl mt-4 mx-auto font-semibold text-slate-400 md:text-xl scroll-animate" style={{ transitionDelay: '0.3s' }}>
            Stop wrestling with complex hosting, unpredictable maintenance, or hidden costs. Start focusing on what you do best – growing your business.
          </p>
          <p className="max-w-6xl mt-4 mx-auto font-semibold text-slate-400 md:text-xl scroll-animate" style={{ transitionDelay: '0.4s' }}>
            You&apos;ve got the idea, perhaps even an AI-generated concept. Now, it&apos;s time to transform that potential into a fully functional, secure, and continuously optimized digital asset. We handle everything from seamless hosting and peak performance optimization to ongoing maintenance and security, ensuring your website is always a reliable revenue engine.
          </p>

          <p className="max-w-6xl mt-4 mx-auto font-semibold text-slate-400 md:text-xl scroll-animate" style={{ transitionDelay: '0.5s' }}>
            Choose the plan that aligns with your growth stage:
          </p>
        </div>

        <div className="flex justify-center mt-20 mb-20 scroll-animate">
          <div className="inline-flex rounded-md shadow-sm mb-10 bg-slate-700/50" role="group">
            <button
              type="button"
              onClick={() => setPricingTier('high')}
              aria-pressed={pricingTier === 'high'}
              className={`px-6 py-3 text-md font-semibold rounded-l-lg border border-transparent focus:z-10 focus:ring-2 focus:ring-indigo-500 cursor-pointer transition-all duration-200
                ${pricingTier === 'high' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-300 hover:bg-slate-600'}`}
            >
             ⚡Accelerate Your Growth
            </button>
            <button
              type="button"
              onClick={() => setPricingTier('low')}
              aria-pressed={pricingTier === 'low'}
              className={`px-6 py-3 text-md font-semibold rounded-r-lg border border-transparent focus:z-10 focus:ring-2 focus:ring-indigo-500 cursor-pointer transition-all duration-200
                ${pricingTier === 'low' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-300 hover:bg-slate-600'}`}
            >
              🚀 Launch Smart, Scale Fast
            </button>
          </div>
        </div>

        <div className="grid items-stretch gap-8 md:grid-cols-1 xl:grid-cols-3">
          {displayedPlans.map((plan, index) => (
            <div
              key={plan.name}
              className={`scroll-animate flex flex-col h-full bg-slate-800 rounded-xl shadow-2xl border border-slate-700/50 overflow-hidden transition-all duration-300 hover:shadow-indigo-500/40 hover:border-slate-600 ${plan.highlight ? 'lg:scale-105 border-2 border-indigo-500 shadow-indigo-500/30 z-10' : ''}`}
              style={{ transitionDelay: `${0.2 + index * 0.1}s` }}
            >
              <div className="flex flex-col h-full p-6 md:p-8">
                <h3 className="mb-2 text-2xl font-bold text-white">{plan.name}</h3>
                <p className="mb-4 text-lg font-semibold leading-relaxed text-slate-400 min-h-[60px]">{plan.description}</p>
                <p className="mb-6 text-lg text-slate-300">
                  <strong className="font-semibold text-slate-100">Best For:</strong> {plan.bestFor}
                </p>

                <ul className="flex-grow mb-8 space-y-2 text-lg text-slate-300">
                  {(plan.whatYouGet || []).map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircleIcon className="flex-shrink-0 w-5 h-5 mt-0.5 mr-2 text-indigo-400" />
                      <span dangerouslySetInnerHTML={{ __html: feature }} />
                    </li>
                  ))}
                </ul>

                <ul>
                  {plan.coreBenefits && (
                    <div className="mb-6 text-lg text-slate-300">
                      <p className="font-semibold text-slate-100 mb-1">Core Benefits:</p>
                      <ul className="list-disc list-inside space-y-1">
                        {plan.coreBenefits.map((benefit, index) => (
                          <li key={index} dangerouslySetInnerHTML={{ __html: benefit }} />
                        ))}
                      </ul>
                    </div>
                  )}
                </ul>
                <ul>
                  {plan.subscription && (
                    <div className="mb-6 text-lg text-slate-300">
                      <p className="font-semibold text-slate-100 mb-1">Subscription Includes:</p>
                      <ul className="list-disc list-inside space-y-1">
                        {plan.subscription.map((item, index) => (
                          <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
                        ))}
                      </ul>
                    </div>
                  )}
                </ul>

                {/* Timeline */}
                {plan.timeline && (
                  <p className="mb-4 text-lg text-slate-300">
                    <strong className="text-slate-100">Timeline:</strong> {plan.timeline}
                  </p>
                )}

                {/* Investment / Pricing Breakdown */}
                {plan.investment && (
                  <div className="mb-6 text-lg text-slate-300">
                    <p className="font-semibold text-slate-100 mb-1">Investment Breakdown:</p>

                    {/* Setup Fee */}
                    <p className="mb-2 text-lg">
                      <strong className="text-slate-100">Setup Fee:</strong> {plan.investment.setupFee}
                    </p>

                    {/* Monthly Plan */}
                    {plan.investment.monthlyPlan && (
                      <div className="mb-3 text-lg">
                        <p className="font-semibold text-slate-100">{plan.investment.monthlyPlan.name} — {plan.investment.monthlyPlan.price}</p>
                        <ul className="mt-1 list-disc list-inside space-y-1 text-slate-300">
                          {plan.investment.monthlyPlan.includes.map((item, idx) => (
                            <li key={idx} dangerouslySetInnerHTML={{ __html: item }} />
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Optional Add-Ons */}
                {plan.optionalAddOns && plan.optionalAddOns.length > 0 && (
                  <div className="mb-6 text-lg text-slate-300">
                    <p className="font-semibold text-slate-100 mb-1">Optional Add-Ons:</p>
                    <ul className="space-y-2">
                      {plan.optionalAddOns.map((addon, idx) => (
                        <li key={idx}>
                          <p className="text-slate-100 font-medium">{addon.name} — {addon.price}</p>
                          <p className="text-slate-400">{addon.description}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="my-6 text-2xl font-extrabold text-center text-white">
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