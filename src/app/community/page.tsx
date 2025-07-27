'use client';

import React from 'react';
import Link from 'next/link';

// --- SVG Icon Components ---
const ArrowLeftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
    </svg>
);

const ExternalLinkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
        <polyline points="15 3 21 3 21 9"></polyline>
        <line x1="10" y1="14" x2="21" y2="3"></line>
    </svg>
);


// --- Data for the Community Directory ---
// In a real app, this data would likely come from a database or CMS.
const businessData = [
    {
        id: 1,
        name: "Richmond Home Services",
        description: "Your one-stop solution for plumbing, electrical, and HVAC needs in the RVA area. Reliable service, available 24/7.",
        url: "https://example.com/richmond-home-services",
        imageUrl: "https://placehold.co/600x400/1e293b/475569?text=RHS"
    },
    {
        id: 2,
        name: "Virginia Green Lawns",
        description: "Specializing in eco-friendly lawn care, from fertilization to weed control, ensuring a lush, healthy lawn year-round.",
        url: "https://example.com/virginia-green-lawns",
        imageUrl: "https://placehold.co/600x400/1e293b/475569?text=VGL"
    },
    {
        id: 3,
        name: "Capital City Cleaners",
        description: "Professional residential and commercial cleaning services. We leave your space sparkling, so you can focus on what matters.",
        url: "https://example.com/capital-city-cleaners",
        imageUrl: "https://placehold.co/600x400/1e293b/475569?text=CCC"
    },
    {
        id: 4,
        name: "RVA Tech Support",
        description: "On-demand IT support for small businesses and home offices. We solve your tech headaches quickly and efficiently.",
        url: "https://example.com/rva-tech-support",
        imageUrl: "https://placehold.co/600x400/1e293b/475569?text=RTS"
    }
];


// --- Main Content Component ---
// This component renders the directory grid.
const DirectoryContent: React.FC = () => {
    return (
        <div className="text-slate-300 leading-relaxed space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-100 mb-1">Community Directory</h1>
            <p className="text-sm text-slate-400 mb-8">A curated list of trusted businesses we&apos;re proud to support.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {businessData.map((business) => (
                    <div key={business.id} className="bg-slate-900/50 rounded-lg shadow-lg overflow-hidden flex flex-col">
                        <img 
                            src={business.imageUrl} 
                            alt={`${business.name} logo`} 
                            className="w-full h-48 object-cover"
                            onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x400/1e293b/475569?text=Image'; }}
                        />
                        <div className="p-6 flex flex-col flex-grow">
                            <h2 className="text-xl font-bold text-slate-100 mb-2">{business.name}</h2>
                            <p className="text-slate-400 text-sm flex-grow mb-4">{business.description}</p>
                            <a
                                href={business.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                            >
                                Visit Website
                                <ExternalLinkIcon className="w-4 h-4 ml-2" />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


// --- Page Component ---
// This is the main export for your page file (e.g., app/directory/page.tsx)
const CommunityDirectoryPage = () => {
    return (
        <div className="flex flex-col min-h-screen bg-slate-900">
            <main className="flex-grow py-16 md:py-24">
                <div className="container mx-auto px-6">
                    <Link
                        href="/"
                        className="mb-8 inline-flex items-center text-indigo-400 hover:text-indigo-300 transition-colors group text-sm"
                        aria-label="Back to home"
                    >
                        <ArrowLeftIcon className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>
                    <article className="bg-slate-800 p-6 md:p-10 rounded-xl shadow-2xl">
                        <DirectoryContent />
                    </article>
                </div>
            </main>
        </div>
    );
};

export default CommunityDirectoryPage;
