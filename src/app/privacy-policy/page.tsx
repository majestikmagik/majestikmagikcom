'use client';
import React, { useState } from 'react';
import Link from 'next/link';

// --- Import your shared components ---
import Header from '../components/Header';
import { ArrowLeftIcon } from '../components/Icons';


/**
 * Content Component for the Privacy Policy
 */
const PrivacyPolicyContent: React.FC = () => {
    return (
        <div className="text-slate-300 leading-relaxed space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-100 mb-1">Privacy Policy for Majestik Magik</h1>
            <p className="text-sm text-slate-400 mb-4">Last Updated: June 29, 2025</p>

            <p>
                This Privacy Policy describes how Majestik Magik (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects, uses, and shares personal information of users (&quot;you&quot; or &quot;users&quot;) of our website, https://www.majestikmagik.com (the &quot;Site&quot;). This policy also outlines your choices regarding your personal information.
            </p>

            {/* Section 1 */}
            <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-slate-100 mt-8 mb-4">1. Information We Collect</h2>
                <p>We may collect the following types of personal information from you:</p>

                <h3 className="text-xl font-semibold text-slate-200 mt-4 mb-2">Information You Provide Directly:</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Contact Information:</strong> When you fill out contact forms, subscribe to newsletters, request a quote, or communicate with us, we may collect your name, email address, phone number, and any other information you choose to provide.</li>
                    <li><strong>Project Information:</strong> If you engage our services, we may collect information related to your project requirements, website content, design preferences, and other details necessary for the provision of our services.</li>
                    <li><strong>Account Information:</strong> If we create an account for you on our Site (e.g., for project tracking), we may collect your username and password.</li>
                    <li><strong>Communications:</strong> Records of your correspondence with us, including emails and other messages.</li>
                    <li><strong>Testimonials and Feedback:</strong> If you provide a testimonial or feedback, we may collect your name and the content of your feedback.</li>
                </ul>

                <h3 className="text-xl font-semibold text-slate-200 mt-4 mb-2">Information We Collect Automatically:</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Log Data:</strong> Our servers automatically record information (&quot;Log Data&quot;) created by your use of the Site. This may include your IP address, browser type, referring/exit pages, operating system, date/time stamps, and related data.</li>
                    <li><strong>Cookies and Similar Technologies:</strong> We may use cookies, web beacons, and other similar technologies to collect information about your browsing activities on our Site. Cookies are small data files stored on your device that help us improve our Site and your experience. You can control the use of cookies at the individual browser level.</li>
                    <li><strong>Usage Information:</strong> We may collect information about how you interact with our Site, such as the pages you visit, the links you click, and the time you spend on certain pages.</li>
                </ul>

                <h3 className="text-xl font-semibold text-slate-200 mt-4 mb-2">AI Chatbot Interactions:</h3>
                <p>To enhance our services and provide support, we utilize an AI-powered chatbot. When you interact with our AI Chatbot, we may collect and store the conversation history.</p>
                <p className="mt-2 p-3 bg-yellow-900/30 border-l-4 border-yellow-500 rounded-r-lg"><strong>Please be aware that conversations with our AI Chatbot may be reviewed by our team members.</strong> This review process is conducted for purposes of quality assurance, to improve the performance and accuracy of our AI systems, and to ensure the safety and security of our platform. Do not share any sensitive personal information (such as financial details, health information, or government-issued identification numbers) in your chat conversations.</p>
            </div>

            {/* Section 2 */}
            <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-slate-100 mt-8 mb-4">2. How We Use Your Information</h2>
                <p>We may use your personal information for the following purposes:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>To Provide and Improve Our Services: To deliver the website design and development services you request, manage your projects, and improve our service offerings.</li>
                    <li>To Communicate with You: To respond to your inquiries, provide quotes, send you updates about your projects, and communicate important information related to our services.</li>
                    <li>Marketing and Promotional Purposes: With your consent where required by law, we may send you newsletters, marketing communications, and information about our services that we think may be of interest to you. You can opt-out of receiving these communications at any time.</li>
                    <li>To Personalize Your Experience: To tailor the content and information we provide to you based on your interests and preferences.</li>
                    <li>To Maintain and Improve Our Site: To analyze Site usage, monitor the performance of our Site, and make improvements to its functionality and content.</li>
                    <li>Security and Fraud Prevention: To detect, prevent, and address security incidents and fraudulent activities.</li>
                    <li>Legal Compliance: To comply with applicable laws, regulations, and legal processes.</li>
                </ul>
            </div>

            {/* Section 3 */}
            <div className="space-y-2">
                <h3 className="text-xl font-semibold text-slate-200 mt-5 mb-1">3. How We Share Your Information</h3>
                <p>We may share your personal information with the following categories of recipients:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                    <li><strong>Service Providers:</strong> We may engage third-party service providers to assist us in operating our Site, providing our services, conducting our business, or servicing you. These providers may have access to your personal information to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose. Examples include hosting providers, payment processors, and analytics providers.</li>
                    <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, reorganization, sale of assets, or similar event, your personal information may be transferred as part of the transaction. We will notify you of any such transfer and any choices you may have regarding your information.</li>
                    <li><strong>Legal Requirements:</strong> We may disclose your personal information if required to do so by law or in response to valid requests by public authorities (e.g., a court or government agency).</li>
                    <li><strong>With Your Consent:</strong> We may share your personal information with third parties when we have your explicit consent to do so.</li>
                </ul>
            </div>

            {/* Section 4 */}
            <div className="space-y-2">
                <h3 className="text-xl font-semibold text-slate-200 mt-5 mb-1">4. Your Choices and Rights</h3>
                <p>You may have certain rights regarding your personal information, depending on your location and applicable laws. These rights may include:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                    <li><strong>Access:</strong> The right to request access to the personal information we hold about you.</li>
                    <li><strong>Correction:</strong> The right to request that we correct any inaccurate or incomplete personal information.</li>
                    <li><strong>Deletion:</strong> The right to request the deletion of your personal information, subject to certain exceptions.</li>
                    <li><strong>Objection to Processing:</strong> The right to object to the processing of your personal information for certain purposes, such as direct marketing.</li>
                    <li><strong>Restriction of Processing:</strong> The right to request that we restrict the processing of your personal information in certain circumstances.</li>
                    <li><strong>Data Portability:</strong> The right to receive a copy of your personal information in a structured, commonly used, and machine-readable format and to transmit it to another controller.</li>
                    <li><strong>Withdrawal of Consent:</strong> If we are processing your personal information based on your consent, you have the right to withdraw your consent at any time.</li>
                    <li><strong>Do Not Track:</strong> Our Site does not currently respond to &quot;Do Not Track&quot; signals from your browser.</li>
                </ul>
                <p>To exercise any of these rights, please contact us using the contact information provided below. We may require you to verify your identity before responding to your request.</p>
            </div>

            {/* Section 5 */}
            <div className="space-y-2">
                <h3 className="text-xl font-semibold text-slate-200 mt-5 mb-1">5. Data Retention</h3>
                <p>We will retain your personal information for as long as necessary to fulfill the purposes for which it was collected, including to provide you with our services, comply with our legal obligations, resolve disputes, and enforce our agreements. The retention period may vary depending on the type of information and the specific purposes.</p>
            </div>

            {/* Section 6 */}
            <div className="space-y-2">
                <h3 className="text-xl font-semibold text-slate-200 mt-5 mb-1">6. Security of Your Information</h3>
                <p>We take reasonable measures to protect your personal information from unauthorized access, use, disclosure, alteration, or destruction. However, no method of transmission over the internet or method of electronic storage is completely secure. Therefore, while we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.</p>
            </div>

            {/* Section 7 */}
            <div className="space-y-2">
                <h3 className="text-xl font-semibold text-slate-200 mt-5 mb-1">7. Links to Other Websites</h3>
                <p>Our Site may contain links to other websites that are not operated by us. If you click on a third-party link, you will be directed to that third party&apos;s website. We strongly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.</p>
            </div>

            {/* Section 8 */}
            <div className="space-y-2">
                <h3 className="text-xl font-semibold text-slate-200 mt-5 mb-1">8. Children&apos;s Privacy</h3>
                <p>Our Site and services are not directed to individuals under the age of 16. We do not knowingly collect personal information from children under 16. If we become aware that we have collected personal information from a child under 16, we will take steps to delete such information.</p>
            </div>

            {/* Section 9 */}
            <div className="space-y-2">
                <h3 className="text-xl font-semibold text-slate-200 mt-5 mb-1">9. Changes to This Privacy Policy</h3>
                <p>We may update this Privacy Policy from time to time. We will notify you of any material changes by postingasting the new Privacy Policy on this page or by other means as required by law. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
            </div>

            {/* Section 10 */}
            <div className="space-y-2">
                <h3 className="text-xl font-semibold text-slate-200 mt-5 mb-1">10. Contact Us</h3>
                <p>If you have any questions or concerns about this Privacy Policy or our privacy practices, please contact us at:</p>
                <p>
                    Majestik Magik<br />
                    405 E. Laburnum Ave Ste #3<br />
                    Richmond, VA 23222<br />
                    jamil.matheny@majestikmagik.com<br />
                    804.362.7561
                </p>
                <p className="mt-4">By using our Site, you consent to the terms of this Privacy Policy.</p>
            </div>
        </div>
    );
};

/**
 * The main page component that wraps the content with a layout.
 */
const PrivacyPolicyPage = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const navItems = ['Home', 'AI Web Templates', 'Services', 'Pricing', 'Team', 'Contact'];

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setIsMobileMenuOpen(false);
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-900">
            <Header
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
                handleNavClick={handleNavClick}
                navItems={navItems}
            />

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
                        <PrivacyPolicyContent />
                    </article>
                </div>
            </main>

            {/* Footer component has been removed as per the request. */}
        </div>
    );
};

export default PrivacyPolicyPage;