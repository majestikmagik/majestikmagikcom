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
  title: 'Majestik Magik | Helping Small Businesses Build Powerful Websites that Attract Customers',
  description: 'Boost your business with Majestik Magik — Richmond’s AI-powered web design and marketing agency. We build custom AI websites that generate leads, improve SEO rankings, and convert traffic into sales — all in under 30 days. Get expert web design, local SEO, and digital strategy tailored to your industry.',
  authors: [{ name: 'Majestik Magik' }],
  manifest: '/site.webmanifest',
  icons: {
    icon: '/img/majestikmagik_logo_indigo.png',
    shortcut: '/img/majestikmagik_logo_indigo.png',
    apple: '/img/majestikmagik_logo_indigo.png',
  },
  openGraph: {
    title: 'Majestik Magik | Helping Small Businesses Build Powerful Websites that Attract Customers',
    description: 'Boost your business with Majestik Magik — Richmond’s AI-powered web design and marketing agency. We build custom AI websites that generate leads, improve SEO rankings, and convert traffic into sales — all in under 30 days. Get expert web design, local SEO, and digital strategy tailored to your industry.',
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
    title: 'Majestik Magik | Helping Small Businesses Build Powerful Websites that Attract Customers',
    description: 'Boost your business with Majestik Magik — Richmond’s AI-powered web design and marketing agency. We build custom AI websites that generate leads, improve SEO rankings, and convert traffic into sales — all in under 30 days. Get expert web design, local SEO, and digital strategy tailored to your industry.',
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
      <body className="bg-transparent bg-gradient-to-br from-slate-900 via-indigo-800 to-slate-900 text-slate-200 overflow-x-hidden">
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

        <Script id="mailerlite-universal" strategy="afterInteractive">
          {`(function(w,d,e,u,f,l,n){w[f]=w[f]||function(){(w[f].q=w[f].q||[])
            .push(arguments);},l=d.createElement(e),l.async=1,l.src=u,
            n=d.getElementsByTagName(e)[0],n.parentNode.insertBefore(l,n);})
            (window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');
            ml('account', '1747571');`}
        </Script>


        {/* Facebook Pixel Code */}
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod ?
            n.callMethod.apply(n, arguments) : n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '2550379602025185');
          fbq('track', 'PageView');
        `}
        </Script>

        <noscript
          dangerouslySetInnerHTML={{
            __html: `<img 
                height="1" 
                width="1" 
                style="display:none" 
                src="https://www.facebook.com/tr?id=2550379602025185&ev=PageView&noscript=1"
                alt="Facebook Pixel"
          />`
          }}
        />

        <Script type="application/ld+json" id="structured-data">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Majestik Magik",
            "url": "https://www.majestikmagik.com",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://www.majestikmagik.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}
        </Script>

        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "Majestik Magik",
            "image": "https://majestikmagik.com/img/og-hero.jpg",
            "@id": "https://majestikmagik.com/quick-fixes",
            "url": "https://majestikmagik.com",
            "telephone": "+1-804-362-7561",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Richmond",
              "addressRegion": "VA",
              "postalCode": "23222",
              "addressCountry": "US"
            },
            "areaServed": {
              "@type": "City",
              "name": "Richmond"
            },
            "serviceType": [
              "Same-day website fixes",
              "WordPress repair",
              "Shopify bug fixes",
              "Webflow updates",
              "Website speed optimization",
              "Technical SEO fixes"
            ]
          })
        }} />



      </body>
    </html>
  );
}
