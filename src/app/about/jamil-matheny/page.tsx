'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeftIcon } from '../../components/Icons';

const JamilMathenyContent: React.FC = () => {
    return (
        <div className="text-slate-300 leading-relaxed space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-100 mb-1">Jamil Matheny, Founder & CEO</h1>
            <p className="text-sm text-slate-400 mb-4">About the Founder</p>
            <p>Jamil Matheny is the Founder & CEO of Majestik Magik, Inc., a digital solutions agency born from a lifelong passion for technology and a deep-seated desire to help businesses achieve their goals. He leads the company with a core mission: to create effective, purpose-driven websites that solve real-world business challenges.</p>
            <p>A Virginia native, Jamil&apos;s fascination with technology began at an early age. Mentored by a neighbor who worked in IT, he gained a foundational understanding of computer hardware components. This interest grew through various school clubs and after-school programs, and his journey into programming was sparked by the creative possibilities of early web platforms like Myspace and Yahoo Geocities.</p>
            <p>With a natural knack for building—a hobby that has ranged from model cars and soldering to art—Jamil applied this same constructive mindset to his professional ambitions. As a largely self-taught programmer, he complemented his university studies by channeling his coding knowledge into a deep dive into business and entrepreneurship. Fueled by countless books on business and personal development, he worked numerous jobs over the years to analyze different operational models with the dream of one day creating his own company. This unique blend of practical technical skill and dedicated business study forms the bedrock of Majestik Magik&apos;s philosophy.</p>
            <p>Having experienced the challenges of entrepreneurship firsthand, Jamil is driven to alleviate the business pains of his clients. His vision for Majestik Magik is to provide small businesses with not just a website, but a robust digital system that works to support their growth and success.</p>
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