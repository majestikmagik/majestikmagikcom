"use client";

import React from 'react';
import { ArrowLeftIcon } from '../components/Icons';
import { PrivacyPolicyContent } from './PolicyContent/PrivacyPolicyContent';
import { RefundPolicyContent } from './PolicyContent/RefundPolicyContent';
import { CookiePolicyContent } from './PolicyContent/CookiePolicyContent';
import { IntellectualPropertyPolicyContent } from './PolicyContent/IntellectualPropertyPolicyContent';
import { CyberSecurityPolicyContent } from './PolicyContent/CyberSecurityPolicyContent';
import { TermsOfServiceContent } from './PolicyContent/TermsOfServiceContent';

// Assuming PolicyLink interface is defined elsewhere or can be defined here
// If it's used elsewhere, it might be better to import it.
// For now, defining it here based on usage in App.tsx
interface PolicyLink {
  id: string;
  name: string;
  url: string;
}

interface PolicyPageProps {
  policyId: string | null; // Accept the ID
  policyLinks: PolicyLink[]; // Accept the list of links
  onClose: () => void;
}

const PolicyPage: React.FC<PolicyPageProps> = ({ policyId, policyLinks, onClose }) => {

  // Find the current policy based on the passed ID
  const currentPolicy = policyLinks.find(link => link.id === policyId);

  // If no policy is found for the ID (shouldn't happen if logic in App.tsx is correct, but good practice)
  if (!currentPolicy) {
    return (
      <section className="py-16 md:py-24 bg-slate-900 flex-grow">
        <div className="container mx-auto px-6">
          <button
            onClick={onClose}
            className="mb-8 inline-flex items-center text-indigo-400 hover:text-indigo-300 transition-colors group text-sm"
            aria-label="Back to main site"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
            Back to Main Site
          </button>
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-slate-100">Policy Not Found</h1>
          <div className="bg-slate-800 p-6 md:p-10 rounded-xl shadow-2xl text-slate-300">
            <p>Could not find the requested policy document.</p>
          </div>
        </div>
      </section>
    );
  }

  // Use the name and url from the found policy object
  const title = currentPolicy.name;
  const sourceUrl = currentPolicy.url;

  const isPrivacyPolicy = policyId === "privacy-policy";
  const isRefundPolicy = policyId === "refund-policy";
  const isCookiePolicy = policyId === "cookie-policy";
  const isIntellectualPropertyPolicy = policyId === "intellectual-property-policy";
  const isCyberSecurityPolicy = policyId === "cyber-security";
  const isTermsOfServicePolicy = policyId === "terms-of-service";

  return (
    <section className="py-16 md:py-24 bg-slate-900 flex-grow">
      <div className="container mx-auto px-6">
        <button
          onClick={onClose}
          className="mb-8 inline-flex items-center text-indigo-400 hover:text-indigo-300 transition-colors group text-sm cursor-pointer"
          aria-label="Back to main site"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
          Back to Main Site
        </button>
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-slate-100">{title}</h1>
        <div className="bg-slate-800 p-6 md:p-10 rounded-xl shadow-2xl">
          {isPrivacyPolicy ? (
            <PrivacyPolicyContent />
          ) : isRefundPolicy ? (
            <RefundPolicyContent />
          ) : isCookiePolicy ? (
            <CookiePolicyContent />
          ) : isIntellectualPropertyPolicy ? (
            <IntellectualPropertyPolicyContent />
          ) : isCyberSecurityPolicy ? (
            <CyberSecurityPolicyContent />
          ) : isTermsOfServicePolicy ? (
            <TermsOfServiceContent />
          ) : (
            <>
              <p className="text-slate-300 mb-4 leading-relaxed">
                The full content for the "{title}" would be displayed here. In a real application, this information would be
                fetched or derived from our official policy documentation.
              </p>
              <div className="border-t border-slate-700 pt-6 mt-6 text-slate-300 space-y-4">
                <h3 className="text-xl font-semibold text-slate-100">Simulated Content Overview:</h3>
                <p>
                  This section simulates the kind of information you would find in the {title}.
                  Each policy is crucial for understanding your rights and our commitments.
                </p>
                <p>
                  For example, a typical <strong>Privacy Policy</strong> would cover data collection, use, storage, user rights (like access or deletion), cookie usage (if not separate), third-party disclosures, security practices, children's privacy, policy updates, and contact details for privacy-related inquiries.
                </p>
                <p>
                  A <strong>Terms of Service</strong> document would outline the rules for using our website and services, user responsibilities, intellectual property rights regarding our content, limitations of liability, dispute resolution processes, and termination clauses.
                </p>
                <p>
                  The <strong>Refund Policy</strong> would detail eligibility for refunds, the process for requesting a refund, timelines, and any non-refundable items or services.
                </p>
                <p>
                  Our <strong>Cookie Policy</strong> would explain what cookies are, how we use them, the types of cookies deployed, and how users can manage their cookie preferences.
                </p>
                <p>
                  The <strong>Intellectual Property Policy</strong> would assert our ownership of content, trademarks, and other IP, and outline the permissible use of our materials by others.
                </p>
                <p>
                  The <strong>Cyber Security</strong> information would describe the measures we take to protect our systems and user data, and may include advice for users on protecting their own accounts.
                </p>
                <p className="mt-4 text-slate-400 text-xs">
                  Note: The content above is illustrative. Please consult the linked official documents for authoritative information.
                </p>
              </div>
            </>
          )}        
        </div>
      </div>
    </section>
  );
};

export default PolicyPage;