'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeftIcon } from '../../components/Icons';

const JamilMathenyContent: React.FC = () => {
    return (
        <div className="text-slate-300 leading-relaxed space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-100 mb-1">Jamil Matheny, Founder & CEO</h1>
            <p className="text-sm text-slate-400 mb-4">About the Founder</p>
            <Image src="/img/jamil_matheny_img.jpg" alt="Jamil Matheny" width={150} height={150} className="float-left mr-4 mb-4 rounded-lg md:w-1/5" />
            <p>Jamil Matheny is the Founder & CEO of Majestik Magik, Inc., a digital solutions agency born from a lifelong passion for technology and a deep-seated desire to help businesses achieve their goals. He leads the company with a core mission: to create effective, purpose-driven websites and AI-powered solutions that solve real-world business challenges.</p> <p>A Virginia native, Jamil&apos;s fascination with technology began at an early age. Mentored by a neighbor who worked in IT, he gained a foundational understanding of computer hardware components. This interest grew through various school clubs and after-school programs, and his journey into programming was sparked by the creative possibilities of early web platforms like Myspace and Yahoo Geocities.</p> <p>With a natural knack for building—a hobby that has ranged from model cars and soldering to art—Jamil applied this same constructive mindset to his professional ambitions. As a largely self-taught programmer, he complemented his university studies by channeling his coding knowledge into a deep dive into business and entrepreneurship. Fueled by countless books on business and personal development, he worked numerous jobs over the years to analyze different operational models with the dream of one day creating his own company.</p> 
            <div className="clear-both">
                <Image
                    src="/img/344705572_03be87188e_b.jpg"
                    alt="Jamil Matheny featured in the Richmond Times-Dispatch"
                    width={150}
                    height={250}
                    className="float-right ml-4 mb-4 rounded-lg shadow-lg md:w-1/3"
                />
                <p>Jamil’s entrepreneurial journey has been far from ordinary. From his early days as a journalist at Advanced Media Network (Kombo.com), covering events like E3 in Los Angeles and meeting icons such as Bill Gates, to being featured in the Richmond Times-Dispatch for his insights on gaming culture, Jamil has always had a forward-looking vision. He later fronted the heavy metal band Spiral Fracture, which won the 2012 Battle of the Bands contest and earned a spot performing at the Rockstar Energy Mayhem Festival alongside Slipknot and Anthrax—a testament to his leadership and stage presence.</p> <p>Resilient and adaptive, Jamil has also built businesses outside of tech, from a photography brand (Jamil Images, LLC) to a solo cleaning business. Each venture sharpened his eye for detail, client service, and operational discipline. Even while facing setbacks in manual labor jobs like FedEx and Amazon, he turned challenges into lessons that strengthened his resolve to pursue entrepreneurship full time.</p> <p>These experiences—paired with his deep love of learning, his strong family values, and his role as a father—fuel his drive to build Majestik Magik into a trusted partner for businesses. His vision extends beyond web design: through AI innovation and healthcare projects like InsightMD, Jamil is determined to create impact-driven solutions that make a difference in people&apos;s lives. His philosophy is simple but powerful: &quot;I don&apos;t chase. I align. The win is already mine.&quot;</p>
            </div>
        </div>
    );
};

const JamilMathenyPage = () => {
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
                        <JamilMathenyContent />
                    </article>
                </div>
            </main>
        </div>
    );
};

export default JamilMathenyPage;