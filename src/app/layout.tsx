// File: app/layout.tsx
// FIX: This is now a clean Server Component that uses the new MainLayout client component.
// This allows the metadata export to work correctly for SEO.

import type { Metadata } from 'next';
import Script from 'next/script';
import MainLayout from './components/MainLayout'; // Import the new client layout
import './globals.css';



// The metadata export now works correctly because this is a Server Component.
export const metadata: Metadata = {
  metadataBase: new URL('https://www.majestikmagik.com'),
  title: 'Majestik Magik - AI-powered websites that capture leads, boost sales, and SEO ranking — all in under 30 days at a fraction of big-agency costs.',
  description: 'Majestik Magik is a Richmond, VA-based AI-driven digital agency for business solutions that specializes in cutting-edge web development, AI and innovative design. We deliver digital excellence focused on user experience and technical performance, including website speed optimization and schema markup. Specializing in custom AI development and mobile-first design, we also provide tailored industrial website design for manufacturing and heavy industry clients, ensuring a robust digital presence.',
  keywords: "Majestik Magik, digital agency, AI solutions, web development, design, digital excellence, innovation, user experience, richmond web designers, richmond, virginia usa, richmond virginia usa, richmond plumbing websites, richmond hvac websites, richmond electrical websites, richmond roofing websites, richmond industrial websites, AI for business solutions, Best web developer Richmond VA, Update my old website, Get more leads from website, Improve website user experience, How to improve website speed, How to improve website performance, How to improve website SEO, Website not ranking on Google, Industrial website design, Manufacturing website development, B2B industrial web solutions, Industrial digital presence, Heavy industry web design, Industrial company websites, Engineering firm website design, Construction company website design, Logistics website development, Industrial SEO services, Digital solutions for manufacturers, AI integration services, Custom AI development, Machine learning solutions, Artificial intelligence agency, AI strategy consulting, AI-powered web design, Generative AI solutions, Website development company, Custom web design, Responsive web design, E-commerce development, Content management system (CMS) development, WordPress development, Drupal development, Website redesign services, Web application development, Front-end development, Back-end development, UI/UX design services, Mobile-first design, Accessibility web design (WCAG compliance), Website maintenance services, Website security services, Digital transformation agency, Full-service digital agency, Digital strategy consulting, Online presence management, Branding and digital identity, Website speed optimization, Core Web Vitals optimization, Page load speed improvement, Website performance audit, Image optimization services, CDN integration (Content Delivery Network), Browser caching, Minification (CSS, JavaScript, HTML), Schema markup implementation (local business schema, organization schema, service schema), Structured data optimization, Sitemap generation and submission (XML sitemap), Robots.txt optimization, Canonicalization issues (resolving duplicate content), Hreflang implementation, Crawl budget optimization, Broken link checking and repair, SSL certificate installation, HTTPS migration, Website security audits, DDoS protection, Malware removal services, Mobile responsiveness testing, Mobile-friendly website design, User experience (UX) audit, Website usability testing, Accessibility compliance services, Website hosting solutions, Cloud hosting solutions, Managed WordPress hosting, Server configuration optimization, Richmond VA web design company, Web development Richmond Virginia, AI solutions Richmond VA, Richmond digital marketing agency, Local SEO Richmond VA, Richmond small business web design, Website design services Richmond, Industrial website design, Manufacturing website development, B2B industrial web solutions, Industrial digital presence, Heavy industry web design, Industrial company websites, Engineering firm website design, Construction company website design, Logistics website development, Industrial SEO services, Digital solutions for manufacturers, AI integration services, Custom AI development, Machine learning solutions, Artificial intelligence agency, AI strategy consulting, AI-powered web design, Generative AI solutions",
  authors: [{ name: 'Majestik Magik' }],
  manifest: '/site.webmanifest',
  icons: {
    icon: '/img/majestikmagik_logo_indigo.png',
    shortcut: '/img/majestikmagik_logo_indigo.png',
    apple: '/img/majestikmagik_logo_indigo.png',
  },
  openGraph: {
    title: 'Majestik Magik - AI-powered websites that capture leads, boost sales, and SEO ranking — all in under 30 days at a fraction of big-agency costs.',
    description: 'Richmond, VA-based digital agency for business solutions that specializes in cutting-edge web development, AI and innovative design.',
    url: 'https://www.majestikmagik.com',
    siteName: 'Majestik Magik',
    images: [
      {
        url: '/img/screenshot_mm.png', // Relative to the public folder
        width: 1200,
        height: 630,
        alt: 'A screenshot of the Majestik Magik website homepage.',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Majestik Magik - AI-powered websites that capture leads, boost sales, and rank higher on Google — all in under 30 days at a fraction of big-agency costs.',
    description: 'Richmond, VA-based digital agency for business solutions that specializes in cutting-edge web development, AI and innovative design.',
    images: ['/img/screenshot_mm.png'], // Relative to the public folder
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-slate-900 via-indigo-800 to-slate-900 text-slate-200 overflow-x-hidden">
        {/* Use the MainLayout Client Component to wrap the children and handle interactive elements */}
        <MainLayout>
          {children}
        </MainLayout>
        {/* Global scripts can remain here */}
        <Script
          strategy="afterInteractive"
          type="text/javascript"
          src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
        />
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=AW-16649126006"
        />
        <Script id="google-tag-config" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-16649126006');
          `}
        </Script>
      </body>
    </html>
  );
}
