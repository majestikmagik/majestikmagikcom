// File: /app/intellectual-property-policy/page.tsx
// This file creates a dedicated, standalone page for your Intellectual Property Policy.

'use client';
import React from 'react';
import Link from 'next/link';

// --- Import your shared components ---
import { ArrowLeftIcon } from '../components/Icons';


/**
 * Content Component for the Intellectual Property Policy
 */
const IntellectualPropertyContent = () => {
    return (
        <div className="text-slate-300 leading-relaxed space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-100 mb-1">Intellectual Property Policy</h1>
            <p className="text-sm text-slate-400 mb-4">Last Updated: May 18, 2025</p>

            <p>
                This Intellectual Property Policy outlines the ownership and usage guidelines for the intellectual property associated with Majestik Magik (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) and our website, https://www.majestikmagik.com (the &quot;Site&quot;). This policy also addresses the intellectual property rights of others.
            </p>

            <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-slate-100 mt-8 mb-4">1. Our Intellectual Property</h2>
                <p>
                    All content, features, and functionality (including but not limited to text, graphics, logos, button icons, images, audio clips, digital downloads, data compilations, software, and the design, selection, and arrangement thereof) appearing on the Site are the exclusive property of Majestik Magik, its licensors, or other content providers and are protected by United States and international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
                </p>
                <p>
                    This includes, but is not limited to, the Majestik Magik name and logo, the design and layout of our website, and all original creative works and code developed by us.
                </p>
            </div>

            <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-slate-100 mt-8 mb-4">2. Permitted Use of Our Content</h2>
                <p>
                    Subject to these terms, you are granted a limited, non-exclusive, non-transferable, and revocable license to access and use the Site and its content for your personal and non-commercial use in browsing our services and potentially engaging with us.
                </p>
                <p>You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our Site, except as follows:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Your computer may temporarily store copies of such materials in RAM incidental to your accessing and viewing those materials.</li>
                    <li>You may store files that are automatically cached by your Web browser for display enhancement purposes.</li>
                    <li>You may print or download one copy of a reasonable number of pages of the Site for your own personal, non-commercial use and not for further reproduction, publication, or distribution.</li>
                </ul>
            </div>

            <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-slate-100 mt-8 mb-4">3. Prohibited Uses</h2>
                <p>You are specifically prohibited from the following without the express prior written consent of Majestik Magik:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Using any part of our Site or its content for any commercial purpose or benefit (other than engaging our services).</li>
                    <li>Modifying, adapting, translating, reverse engineering, decompiling, or disassembling any portion of the Site or its content.</li>
                    <li>Removing, altering, or obscuring any copyright, trademark, or other proprietary rights notices from copies of content from the Site.</li>
                    <li>Using any robot, spider, or other automatic device, process, or means to access, scrape, or index any portion of the Site or its content for any purpose, including monitoring or copying.</li>
                    <li>Using our trademarks, service marks, or logos in any manner that is likely to cause confusion or that disparages or discredits Majestik Magik.</li>
                </ul>
            </div>

            <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-slate-100 mt-8 mb-4">4. Trademarks</h2>
                <p>
                    The Majestik Magik name and logo, and all related names, logos, product and service names, designs, and slogans are trademarks of Majestik Magik or its affiliates or licensors. You must not use such marks without our prior written permission. All other names, logos, product and service names, designs, and slogans on this Site are the trademarks of their respective owners.
                </p>
            </div>

            <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-slate-100 mt-8 mb-4">5. Copyright</h2>
                <p>
                    The content and compilation of content included on this Site, including all text, graphics, images, videos, and software, is the copyright of Majestik Magik or its content suppliers and is protected by United States and international copyright laws.
                </p>
            </div>

            <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-slate-100 mt-8 mb-4">6. Respect for the Intellectual Property of Others</h2>
                <p>
                    Majestik Magik respects the intellectual property rights of others and expects our users to do the same. If you believe that any content on our Site infringes upon your intellectual property rights, please notify us in accordance with the procedure set forth below.
                </p>
            </div>

            <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-slate-100 mt-8 mb-4">7. Procedure for Making Claims of Copyright Infringement</h2>
                <p>
                    If you believe that your copyrighted work has been copied in a way that constitutes copyright infringement and is accessible on this Site, please notify our designated copyright agent in writing. Your notification must include the following information:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>A physical or electronic signature of the person authorized to act on behalf of the owner of the copyright interest.</li>
                    <li>A description of the copyrighted work that you claim has been infringed.</li>
                    <li>A description of where the material that you claim is infringing is located on the Site.</li>
                    <li>Your address, telephone number, and email address.</li>
                    <li>A statement by you that you have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law.</li>
                    <li>A statement by you, made under penalty of perjury, that the above information in your notice is accurate and that you are the copyright owner or authorized to act on the copyright owner&apos;s behalf.</li>
                </ul>
                <p className="mt-4">Please send your notice to our designated copyright agent at:</p>
                <address className="not-italic mt-2">
                    Attn: Majestik Magik<br />
                    PSM Registered Agent LLC<br />
                    405 E. Laburnum Ave Ste #3<br />
                    Richmond, VA 23222<br />
                    <a href="mailto:jamil.matheny@majestikmagik.com" className="text-indigo-400 hover:underline">jamil.matheny@majestikmagik.com</a><br />
                    <a href="tel:8043627561" className="text-indigo-400 hover:underline">804.362.7561</a>
                </address>
            </div>

            <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-slate-100 mt-8 mb-4">8. Enforcement of Intellectual Property Rights</h2>
                <p>
                    We actively protect our intellectual property rights. Any unauthorized use of our intellectual property may result in legal action.
                </p>
            </div>

            <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-slate-100 mt-8 mb-4">9. Changes to This Intellectual Property Policy</h2>
                <p>
                    We may update this Intellectual Property Policy from time to time. We will notify you of any material changes by posting the new Intellectual Property Policy on this page or by other means as required by law. You are advised to review this Intellectual Property Policy periodically for any changes. Changes to this Intellectual Property Policy are effective when they are posted on this page.
                </p>
            </div>

            <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-slate-100 mt-8 mb-4">10. Contact Us</h2>
                <p>If you have any questions or concerns about this Intellectual Property Policy, please contact us at:</p>
                <address className="not-italic mt-2">
                    Majestik Magik<br />
                    405 E. Laburnum Ave Ste #3<br />
                    Richmond, VA 23222<br />
                    <a href="mailto:jamil.matheny@majestikmagik.com" className="text-indigo-400 hover:underline">jamil.matheny@majestikmagik.com</a><br />
                    <a href="tel:8043627561" className="text-indigo-400 hover:underline">804.362.7561</a>
                </address>
            </div>
            <p className="mt-4">By using our Site, you acknowledge that you have read and understood this Intellectual Property Policy.</p>
        </div>
    );
};


/**
 * The main page component that wraps the content with a layout.
 */
const IntellectualPropertyPage = () => {

    return (
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
                        <IntellectualPropertyContent />
                    </article>
                </div>
            </main>
            
            {/* Footer component has been removed as per the request. */}
        </div>
    );
};

export default IntellectualPropertyPage;
