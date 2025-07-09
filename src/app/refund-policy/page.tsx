// File: /app/refund-policy/page.tsx
// This file creates a dedicated, standalone page for your Refund Policy.

'use client';

import React from 'react';
import Link from 'next/link';

// --- Import your shared components ---

import { ArrowLeftIcon } from '../components/Icons';


const RefundPolicyContent = () => {
  return (
    <div className="text-slate-300 leading-relaxed space-y-4">
      <h1 className="text-3xl md:text-4xl font-bold text-slate-100 mb-1">Our Refund Policy</h1>
      <p className="text-sm text-slate-400 mb-4">Last Updated: May 17, 2025</p>

      <p>
        At MajestikMagik.com, we strive to provide high-quality digital products and services. We understand that sometimes things don&apos;t work out as expected. This policy outlines the conditions under which refunds may be issued.
      </p>

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-slate-100 mt-8 mb-4">Digital Products (e.g., templates, e-books, software licenses)</h2>
        <p>Due to the intangible nature of digital products, which cannot be returned once delivered, our refund policy for these items is as follows:</p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li><strong>No Refunds After Download:</strong> Once a digital product has been downloaded or accessed, we generally do not offer refunds.</li>
          <li><strong>Exceptions for Technical Issues:</strong> If you experience significant technical issues preventing you from accessing or using the product, and our support team cannot resolve the issue within a reasonable timeframe, you may be eligible for a refund. Please contact us within <strong>7 days</strong> of delivery to report such issues.</li>
          <li><strong>Misrepresentation:</strong> If the digital product is significantly different from its description or if it fails to perform as advertised, you may be eligible for a refund. Evidence of misrepresentation will be required. Please contact us within <strong>7 days</strong> of delivery to report such issues.</li>
        </ul>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-slate-100 mt-8 mb-4">Services (e.g., custom development, consulting, subscription services)</h2>
        <p>Refunds for services are handled on a case-by-case basis, depending on the nature of the service and work completed:</p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li><strong>Project-Based Services:</strong> For custom development or consulting services, refunds will be evaluated based on the work completed and the agreed-upon milestones. If a project is cancelled before completion, any refund will be prorated based on the services already rendered and expenses incurred.</li>
          <li>
            <strong>Subscription Services:</strong>
            <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
              <li>Monthly Subscriptions: Monthly subscriptions are generally non-refundable once the service period has begun. You can cancel your subscription at any time to prevent future charges.</li>
              <li>Annual Subscriptions: For annual subscriptions, a refund may be issued for the unused portion of the subscription, minus any non-refundable setup fees or a pro-rated amount for the time already used. A cancellation fee may also apply.</li>
            </ul>
          </li>
          <li><strong>Cancellation Before Service Commencement:</strong> If you cancel a service before any work has begun or before the subscription period starts, a full refund may be issued.</li>
        </ul>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-slate-100 mt-8 mb-4">How to Request a Refund</h2>
        <p>To request a refund, please follow these steps:</p>
        <ol className="list-decimal list-inside space-y-2 ml-4">
          <li><strong>Contact Us:</strong> Send an email to <a href="mailto:jamil.matheny@majestikmagik.com" className="text-indigo-400 hover:text-indigo-300 underline">jamil.matheny@majestikmagik.com</a> with your order number and a detailed explanation of why you are requesting a refund.</li>
          <li><strong>Provide Evidence:</strong> For technical issues or misrepresentation, please provide screenshots, error messages, or other relevant evidence to support your claim.</li>
          <li><strong>Review Process:</strong> We will review your request within 5 business days and may contact you for additional information.</li>
          <li><strong>Refund Issuance:</strong> If your refund request is approved, the refund will be processed to your original method of payment within 7-10 business days.</li>
        </ol>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-slate-100 mt-8 mb-4">Changes to This Policy</h2>
        <p>
          We reserve the right to modify this refund policy at any time. Any changes will be posted on this page, and the &quot;Last Updated&quot; date will be revised accordingly. We encourage you to review this policy periodically.
        </p>
      </div>

      <p className="mt-4">If you have any questions about our refund policy, please don&apos;t hesitate to contact us.</p>
    </div>
  );
};


/**
 * The main page component that wraps the content with a layout.
 */
const RefundPolicyPage = () => {

  return (
    <>
      <div className="flex flex-col min-h-screen bg-slate-900">
        <main className="flex-grow py-16 md:py-24">
          <div className="container mx-auto px-6">
            <Link
              href="/"
              className="mb-8 inline-flex items-center text-indigo-400 hover:text-indigo-300 transition-colors group text-sm"
              aria-label="Back to main site"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>

            <article className="bg-slate-800 p-6 md:p-10 rounded-xl shadow-2xl">
              <RefundPolicyContent />
            </article>
          </div>
        </main>
      </div>
    </>
  );
};

export default RefundPolicyPage;
