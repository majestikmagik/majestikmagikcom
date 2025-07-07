'use client';
import React, { useState } from 'react';
import Link from 'next/link';

// --- Import your shared components ---
import Header from '../components/Header';
import { ArrowLeftIcon } from '../components/Icons';


/**
 * Content Component for the Cookie Policy
 */
const CookiePolicyContent: React.FC = () => {
    return (
        <div className="text-slate-300 leading-relaxed space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-100 mb-1">Cookie Policy for Majestik Magik</h1>
            <p className="text-sm text-slate-400 mb-4">Last Updated: May 18, 2025</p>

            <p>
                This Cookie Policy explains how Majestik Magik (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) uses cookies and similar technologies to recognize you when you visit our website, https://www.majestikmagik.com (the &quot;Site&quot;). It explains what these technologies are and why we use them, as well as your rights to control our use of them.
            </p>

            <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-slate-100 mt-8 mb-4">1. What are Cookies?</h2>
                <p>
                    Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site.
                </p>
            </div>

            <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-slate-100 mt-8 mb-4">2. How We Use Cookies</h2>
                <p>We use cookies for various purposes, including:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Essential Cookies:</strong> These cookies are strictly necessary to provide you with services available through our Site and to use some of its features, such as accessing secure areas. Because these cookies are strictly necessary to deliver the Site, you cannot refuse them.</li>
                    <li><strong>Analytics Cookies:</strong> These cookies collect information that is used either in aggregate form to help us understand how our Site is being used or how effective our marketing campaigns are, or to help us customize our Site for you. For example, we may use analytics cookies to see which pages are visited most often, to identify and resolve errors, and to understand where our visitors are coming from.</li>
                    <li><strong>Functionality Cookies:</strong> These cookies allow our Site to remember choices you make (such as your language preference) and provide enhanced, more personal features. They may also be used to provide services you have asked for, such as watching a video or commenting on a blog.</li>
                    <li><strong>Marketing and Advertising Cookies:</strong> These cookies are used to track visitors across websites. The intention is to display ads that are relevant and engaging for the individual user and thereby more valuable for publishers and third-party advertisers. We may also use these cookies to help us deliver targeted advertising and measure the effectiveness of our advertising campaigns.</li>
                </ul>
            </div>

            <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-slate-100 mt-8 mb-4">3. Types of Cookies We Use</h2>
                <p>The specific types of cookies we may use on our Site include:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>First-Party Cookies:</strong> These are cookies set by the Majestik Magik website.</li>
                    <li><strong>Third-Party Cookies:</strong> These are cookies set by a third-party website other than Majestik Magik. We may use third-party cookies for analytics and advertising purposes.</li>
                    <li><strong>Session Cookies:</strong> These cookies are temporary and expire when you close your browser.</li>
                    <li><strong>Persistent Cookies:</strong> These cookies remain on your device for a longer period or until you manually delete them. The length of time a cookie will remain on your device will depend on the specific cookie.</li>
                </ul>
            </div>

            <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-slate-100 mt-8 mb-4">4. How to Control Cookies</h2>
                <p>You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences in the following ways:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Browser Controls:</strong> You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our Site though your access to some functionality and areas of our Site may be restricted. As the means by which you can refuse cookies through your web browser controls vary from browser to browser, you should visit your browser&apos;s help menu for more information.</li>
                    <li><strong>Specific Cookie Opt-Outs:</strong> For certain third-party cookies, you may be able to go directly to the third party&apos;s website to opt-out of their use of cookies. For example, many advertising providers offer opt-out mechanisms.</li>
                    <li><strong>Our Cookie Banner:</strong> When you first visit our Site, we may display a cookie banner that allows you to manage your cookie preferences. You can usually revisit and change your settings at any time through a link on our Site (if implemented).</li>
                </ul>
                <p>Please note that if you disable cookies, some features of our Site may not function properly.</p>
            </div>

            <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-slate-100 mt-8 mb-4">5. Other Tracking Technologies</h2>
                <p>
                    We may also use other tracking technologies similar to cookies, such as web beacons (also known as pixel tags or clear gifs). These are tiny graphics files that contain a unique identifier that enable us to recognize when someone has visited our Site or opened an email that we have sent them. This allows us, for example, to monitor the traffic patterns of users from one page within our Site to another, to deliver or communicate with cookies, to understand whether you have come to our Site from an online advertisement displayed on a third-party website, and to improve site performance.
                </p>
            </div>

            <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-slate-100 mt-8 mb-4">6. Changes to This Cookie Policy</h2>
                <p>
                    We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Please revisit this Cookie Policy regularly to stay informed about our use of cookies and related technologies. The date at the top of this Cookie Policy indicates when it was last updated.
                </p>
            </div>

            <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-slate-100 mt-8 mb-4">7. Contact Us</h2>
                <p>If you have any questions about our use of cookies or other tracking technologies, please contact us at:</p>
                <address className="not-italic mt-2">
                    Majestik Magik<br />
                    405 E. Laburnum Ave Ste #3<br />
                    Richmond, VA 23222<br />
                    <a href="mailto:jamil.matheny@majestikmagik.com" className="text-indigo-400 hover:underline">jamil.matheny@majestikmagik.com</a><br />
                    <a href="tel:8043627561" className="text-indigo-400 hover:underline">804.362.7561</a>
                </address>
            </div>
            <p className="mt-4">By continuing to use our Site, you acknowledge that you have read and understood this Cookie Policy.</p>
        </div>
    );
};


/**
 * The main page component that wraps the content with a layout.
 */
const CookiePolicyPage = () => {
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
                        <CookiePolicyContent />
                    </article>
                </div>
            </main>
            
            {/* Footer component has been removed as per the request. */}
        </div>
    );
};

export default CookiePolicyPage;