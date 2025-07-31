'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// --- SVG Icon Components ---
// Using icons to visually represent concepts is a great way to improve readability.

const ArrowLeftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
    </svg>
);

const BrainCircuitIcon: React.FC<React.SVGProps<SVGSVGElement>> = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 14 14"><g fill="none" stroke="#808af7" strokeLinecap="round" strokeLinejoin="round"><path d="M4.62 1.438A2.38 2.38 0 0 1 7 3.818v6.47a2.724 2.724 0 1 1-5.439-.228C.994 9.45.636 8.26.636 7.265c0-1.354.665-2.67 1.617-3.189A2.38 2.38 0 0 1 4.62 1.438" /><path d="M3.511 5.694c-.35-.08-1.141-.599-1.26-1.611M4.97 8.365C6.398 8.205 6.963 6.699 7 6.086M2.29 8.632c-.356.28-.64.917-.731 1.427M9.38 1.438A2.38 2.38 0 0 0 7 3.818v6.47a2.724 2.724 0 1 0 5.439-.228c.567-.61.924-1.8.924-2.795c0-1.354-.664-2.67-1.617-3.189A2.38 2.38 0 0 0 9.38 1.438" /><path d="M10.489 5.694c.35-.08 1.141-.599 1.26-1.611M9.03 8.365C7.602 8.205 7.037 6.699 7 6.086m4.71 2.546c.356.28.64.917.731 1.427" /></g></svg>
);

const WorkflowIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 20V10" />
        <path d="M18 20V4" />
        <path d="M6 20V16" />
    </svg>
);

const MessageSquareIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
);

// --- Main Content Component for the Labs Page ---
const LabsContent = () => {
    return (
        <div className="text-slate-300 leading-relaxed space-y-12">
            {/* --- HERO SECTION --- */}
            <div>
                <p className="text-indigo-400 font-semibold mb-2">PROJECT: INSIGHT MD</p>
                <h1 className="text-4xl md:text-6xl font-bold text-slate-100 mb-4">Creating a future where no cancer diagnosis comes too late.</h1>
                <p className="text-lg text-slate-400">
                    Majestik Magik Labs is the research and development heart of our company. Our flagship project, Insight MD, is an AI-powered software platform designed to empower radiologists in the fight against cancer. This is our mission.
                </p>
            </div>

            {/* --- THE MISSION SECTION --- */}
            <div className="bg-slate-900/50 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-slate-100 mb-3">Our Founding Story</h2>
                <p className="text-slate-400">
                    This project was born from a deeply personal family experience with a late-stage cancer diagnosis. That journey revealed the immense challenges patients and clinicians face and ignited our mission: to build tools that provide doctors with greater confidence and give every patient the best possible chance for an early, life-saving diagnosis. We are driven by the belief that the right technology, designed with empathy, can make a profound difference.
                </p>
            </div>

            {/* --- THE THREE PILLARS SECTION --- */}
            <div>
                <h2 className="text-3xl font-bold text-center text-slate-100 mb-10">The Insight MD Platform: A Three-Pillar Approach</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Pillar 1: AI */}
                    <div className="text-center">
                        <div className="flex justify-center mb-4">
                            <div className="bg-slate-800 p-4 rounded-full">
                                <BrainCircuitIcon className="w-8 h-8 text-indigo-400" />
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-slate-100 mb-2">High-Accuracy Computer Vision</h3>
                        <p className="text-slate-400 text-sm">A state-of-the-art 3D deep learning model for the detection, segmentation, and classification of suspicious lesions, aimed at improving diagnostic accuracy.</p>
                    </div>
                    {/* Pillar 2: Workflow */}
                    <div className="text-center">
                        <div className="flex justify-center mb-4">
                            <div className="bg-slate-800 p-4 rounded-full">
                                <WorkflowIcon className="w-8 h-8 text-indigo-400" />
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-slate-100 mb-2">Workflow-Obsessed UX</h3>
                        <p className="text-slate-400 text-sm">An exceptionally intuitive interface designed for clinicians, featuring tools like customizable hanging protocols and integrated reporting to enhance their expertise.</p>
                    </div>
                    {/* Pillar 3: Co-Pilot */}
                    <div className="text-center">
                        <div className="flex justify-center mb-4">
                            <div className="bg-slate-800 p-4 rounded-full">
                                <MessageSquareIcon className="w-8 h-8 text-indigo-400" />
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-slate-100 mb-2">AI Co-Pilot Companion</h3>
                        <p className="text-slate-400 text-sm">A planned LLM-powered chat feature that will allow clinicians to interact with the system, ask for contextual information, and query prior studies, turning diagnosis into a partnership.</p>
                    </div>
                </div>
            </div>

            {/* --- PROTOTYPE GALLERY --- */}
            <div>
                <h2 className="text-3xl font-bold text-center text-slate-100 mb-10">From Vision to Reality</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <Link href="/img/insightmd_01.png"> <Image src="/img/insightmd_01.png" alt="Prototype 1" width={1000} height={1000} className="w-full h-auto rounded-lg shadow" /></Link>
                   <Link href="/img/insightmd_02.png"> <Image src="/img/insightmd_02.png" alt="Prototype 2" width={1000} height={1000} className="w-full h-auto rounded-lg shadow" /></Link>
                   <Link href="/img/insightmd_03.png"> <Image src="/img/insightmd_03.png" alt="Prototype 3" width={1000} height={1000} className="w-full h-auto rounded-lg shadow" /></Link>
                   <Link href="/img/insightmd_04.png"> <Image src="/img/insightmd_04.png" alt="Prototype 4" width={1000} height={1000} className="w-full h-auto rounded-lg shadow" /></Link>
                </div>
                <p className="text-center text-xs text-slate-500 mt-2 font-bold">NOTE: THIS IS FICTITIOUS PATIENT DATA – FOR DEMONSTRATION PURPOSES ONLY. High-fidelity prototypes of the Insight MD platform.</p>
            </div>

            {/* --- ROADMAP SECTION --- */}
            <div>
                <h2 className="text-3xl font-bold text-center text-slate-100 mb-10">Our Journey & Roadmap</h2>
                <div className="max-w-4xl mx-auto">
                    <ol className="relative border-l border-slate-700">
                        <li className="mb-10 ml-4">
                            <div className="absolute w-3 h-3 bg-green-500 rounded-full mt-1.5 -left-1.5 border border-slate-900"></div>
                            <time className="mb-1 text-sm font-normal leading-none text-green-400">Q3 2025 - COMPLETE</time>
                            <h3 className="text-lg font-semibold text-slate-100">Company Formation & Prototyping</h3>
                            <p className="text-base font-normal text-slate-400"><strong>July 25, 2025:</strong> Majestik Magik, Inc. officially incorporated as a Delaware C-Corp. The company is now in a position to begin the development of the Insight MD platform.</p>
                            <p className="text-base font-normal text-slate-400">- Completed initial high-fidelity prototype of the Insight MD platform prior to incorporating. (<em>See gallery above</em>)</p>
                        </li>
                        <li className="mb-10 ml-4">
                            <div className="absolute w-3 h-3 bg-indigo-500 rounded-full mt-1.5 -left-1.5 border border-slate-900"></div>
                            <time className="mb-1 text-sm font-normal animate-flash leading-none text-indigo-400">Q4 2025 - IN PROGRESS</time>
                            <h3 className="text-lg font-semibold text-slate-100">SBIR Grant & Clinical Partnership</h3>
                            <p className="text-base font-normal text-slate-400">Preparing a Phase I SBIR grant proposal to the National Cancer Institute (NCI) and establishing a foundational research partnership with a clinical partner.</p>
                            <p className="mt-4"><strong>July 28, 2025</strong></p>
                            <ul className="text-base font-normal text-slate-400">- Secured and approved $2,000 in cloud credits from the <a href="https://cloud.google.com/startup" className="hover:text-indigo-400 ease-in-out duration-300" target="_blank">Google Cloud Startup Program</a> for the development of the Insight MD platform. </ul>
                            <p className="mt-4"><strong>July 29, 2025</strong></p>
                            <ul className="text-base font-normal text-slate-400">- Awaiting confirmation for $5,000 in cloud credits from the <a href="https://aws.amazon.com/startups/" className="hover:text-indigo-400 ease-in-out duration-300" target="_blank">AWS Startup Program</a> for development of the Insight MD platform. </ul>
                            <ul className="text-base font-normal text-slate-400">- Awaiting confirmation for SAM.gov entity registration. </ul>
                            <ul className="text-base font-normal text-slate-400">- Sending email proposals to potential clinical partners. <b><a href="/data/research_sbir/A_Clinician-Centric_AI_Co-Pilot_for_Enhanced_Grading_and_Detection_of_Prostate_Cancer_on_MRI.pdf" className="hover:text-indigo-400 ease-in-out duration-300" target="_blank">[DOWNLOAD PDF]</a></b>  </ul>
                            <p className="mt-4"><strong>July 30, 2025</strong></p>
                            <ul className="text-base font-normal text-slate-400">- Awaiting confirmation on <a href="https://aws.amazon.com/startups/lp/llama-for-aws-startups?trk=5c641b85-cb9f-49e9-9b6b-2356ed253060&sc_channel=el" className="hover:text-indigo-400 ease-in-out duration-300" target="_blank">AWS Build with Llama</a> application. </ul>
                        </li>
                        <li className="ml-4">
                            <div className="absolute w-3 h-3 bg-slate-700 rounded-full mt-1.5 -left-1.5 border border-slate-900"></div>
                            <time className="mb-1 text-sm font-normal leading-none text-slate-500">2026-2027 - THE FUTURE</time>
                            <h3 className="text-lg font-semibold text-slate-100">Phase II, FDA Clearance & Commercialization</h3>
                            <p className="text-base font-normal text-slate-400">Execute on Phase II R&D, pursue FDA 510(k) clearance, and bring Insight MD to our first clinical partners.</p>
                        </li>
                    </ol>
                </div>
            </div>

            {/* --- CLOUD PARTNERSHIP SECTION --- */}
            <div className="bg-slate-950/50 py-12 px-6 rounded-xl mt-12 border border-slate-700 shadow">
                <h2 className="text-center text-2xl font-bold text-slate-100 mb-6">Cloud Infrastructure Partners</h2>
                <div className="flex flex-wrap justify-center items-center gap-8">
                   
                    <a href="https://cloud.google.com/startup" target="_blank"><Image src="/img/gcp-logo.png" alt="Google Cloud" width={258} height={159} /></a>
                </div>
                <p className="text-center text-sm text-slate-400 mt-4">Insight MD is powered by world-class compute partnerships for scalable and secure HIPAA compliant cloud-based AI development.</p>
            </div>
        </div>
    );
};

// --- Page Component ---

const App = () => {

    return (
        <div className="flex flex-col min-h-screen bg-slate-900 font-sans">
            {/* Header Video Section */}
            <div className="relative w-full overflow-hidden" style={{ aspectRatio: '12 / 5' }}>
                <video
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    src="/videos/majestikmagik_labs_mritest.mp4" // Placeholder video URL
                    autoPlay
                    loop
                    muted
                    playsInline // Important for mobile autoplay
                    preload="auto"
                >
                    Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent flex flex-col justify-end items-center text-center p-10">
                    <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg mb-2">Majestik Magik Labs</h1>
                    <p className="text-xl md:text-2xl text-indigo-300 drop-shadow-md">presents Insight MD</p>
                </div>
            </div>
            <main className="flex-grow">
                <div className="container mx-auto px-4 md:px-6 max-w-8xl">
                    <Link
                        href="/"
                        className="mb-8 inline-flex items-center text-indigo-400 hover:text-indigo-300 transition-colors group text-sm"
                        aria-label="Back to home"
                    >
                        <ArrowLeftIcon className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
                        Back to majestikmagik.com
                    </Link>
                    <article className="bg-slate-800 py-12 px-6 md:px-12 mb-20 rounded-xl shadow-2xl border border-slate-700">
                        <LabsContent />
                    </article>
                </div>
            </main>
        </div>
    );
};

export default App;
