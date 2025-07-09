// File: /app/cyber-security-policy/page.tsx
// FIX: Restructured the component to resolve naming conflicts and build errors.

'use client';
import React from 'react';
import Link from 'next/link';


// --- Import your shared components ---
import { ArrowLeftIcon } from '../components/Icons';


/**
 * Content Component for the Cyber Security Policy
 * This contains only the text and formatting for the policy itself.
 */
const CyberSecurityPolicyContent: React.FC = () => {
    return (
        <div className="text-slate-300 leading-relaxed space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-100 mb-1">Our Commitment to Your Website Security</h1>
            {/* <p className="text-sm text-slate-400 mb-4">Last Updated: [Date]</p> */}

            <p>
                At MajestikMagik.com, we understand that the security of your website is paramount. Just like a well-crafted spell requires careful protection, your online presence deserves robust defenses against the ever-evolving landscape of cyber threats. We want to assure you that we are committed to employing diligent practices and technologies to safeguard your website and the information it holds.
            </p>

            <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-slate-100 mt-8 mb-4">Our Proactive Security Measures</h2>
                <p>Here&apos;s a glimpse into our ongoing efforts to protect your digital realm from various cyber threats:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Protection Against SQL Injection Attacks:</strong> We implement secure coding practices and input validation techniques to prevent malicious SQL queries from being injected into our databases, safeguarding your website&apos;s data integrity.</li>
                    <li><strong>Defense Against Cross-Site Scripting (XSS) Attacks:</strong> We employ measures to sanitize user input and encode output to prevent attackers from injecting malicious scripts into your website, protecting your visitors from potential harm.</li>
                    <li><strong>Regular Security Assessments:</strong> We conduct periodic reviews and assessments of our systems and infrastructure to identify potential vulnerabilities.</li>
                    <li><strong>Industry-Standard Encryption:</strong> We utilize robust encryption methods (like HTTPS/TLS) to protect sensitive data in transit.</li>
                    <li><strong>Firewall Protection:</strong> Our systems are fortified with firewalls that act as barriers against unauthorized access.</li>
                    <li><strong>Malware Scanning and Prevention:</strong> We implement measures to detect and prevent the introduction of malicious software.</li>
                    <li><strong>Secure Hosting Environment:</strong> We partner with reputable hosting providers that maintain stringent security protocols.</li>
                    <li><strong>Regular Software Updates and Patching:</strong> We diligently keep our software and systems up-to-date with the latest security patches.</li>
                    <li><strong>Access Controls:</strong> We implement strict access controls to limit who can access sensitive areas of our systems.</li>
                    <li><strong>Data Backup and Recovery:</strong> We maintain regular backups of critical data to ensure business continuity.</li>
                    <li><strong>Continuous Monitoring:</strong> Our systems are continuously monitored for suspicious activity and potential indicators of compromise.</li>
                </ul>
            </div>

            <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-slate-100 mt-8 mb-4">Your Role in Maintaining Security</h2>
                <p>While we are dedicated to providing a secure environment, website security is a shared responsibility. We encourage you to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Utilize Two-Factor Authentication (2FA) if available:</strong> This significantly reduces the risk of unauthorized access.</li>
                    <li><strong>Regularly Update Your Password:</strong> It&apos;s important to change your password periodically.</li>
                    <li><strong>Consider No Password Email-Only Authentication (if offered):</strong> This method streamlines login by eliminating the need for a traditional password.</li>
                    <li>Use strong, unique passwords for your account.</li>
                    <li>Keep your own devices and software updated.</li>
                    <li>Be cautious of suspicious emails and links (phishing).</li>
                </ul>
            </div>

            <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-slate-100 mt-8 mb-4">Our Ongoing Commitment</h2>
                <p>
                    The digital landscape is constantly changing, and so too are the tactics employed by cyber attackers. We are committed to staying informed about the latest security threats and adapting our practices accordingly. Our goal is to provide you with a reliable and secure platform for your online endeavors.
                </p>
            </div>

            <p className="mt-4">If you have any questions or concerns about our security practices, please do not hesitate to contact us.</p>
        </div>
    );
};


/**
 * The main page component that wraps the content with a layout.
 * This is the component that Next.js will render for the page.
 */
const CyberSecurityPolicyPage = () => {

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
                        {/* This now correctly renders the content component */}
                        <CyberSecurityPolicyContent />
                    </article>
                </div>
            </main>
            
            {/* Footer component has been removed as per the request. */}
        </div>
    );
};

export default CyberSecurityPolicyPage;
