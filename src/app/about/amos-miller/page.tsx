'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeftIcon } from '../../components/Icons';

const AmosMillerContent: React.FC = () => {
    return (
        <div className="text-slate-300 leading-relaxed space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-100 mb-1">Amos Miller, AI & Automation Engineer</h1>
            <p className="text-sm text-slate-400 mb-4">About Amos Miller</p>
            <p>As an AI & Automation Engineer at Majestik Magik, Amos Miller is dedicated to architecting intelligent systems that are scalable, efficient, and user-friendly. He specializes in bridging the gap between cutting-edge artificial intelligence and practical automation, creating solutions that empower businesses and bring complex ideas to life.</p>
            <p>Amos&apos;s expertise encompasses a wide range of AI disciplines, including machine learning, natural language processing, and the implementation of large language models such as GPT-4. He has hands-on experience developing sophisticated AI chatbots, autonomous agents, and real-world applications that leverage the full potential of OpenAI&apos;s APIs. On the automation front, he is proficient in creating streamlined, logic-based workflows using platforms like Make.com, n8n, and Zapier to enhance operational efficiency.</p>
            <p>Inspired by his father, a programmer, Amos&apos;ss passion for technology was ignited at a young age. This early fascination led him to explore coding from the age of nine, starting with foundational languages like C and C++ in school programming clubs. Deeply impressed by the capabilities of artificial intelligence, he chose to focus his academic and professional path on machine learning and deep learning, gaining experience in practical applications such as image processing and object detection.</p>
            <p>Today, Amos applies this deep-seated knowledge and passion at Majestik Magik, engineering smart systems that solve real-world problems and drive growth through intelligent automation. He brings an energetic and results-driven approach to his work, fueled by a passion for continuous growth. Outside of his professional pursuits, he enjoys playing tennis and challenging himself with the strategic board game Go, reflecting his blend of dynamic energy and thoughtful precision.</p>
        </div>
    );
};

const AmosMillerPage = () => {
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
                        <AmosMillerContent />
                    </article>
                </div>
            </main>
        </div>
    );
};

export default AmosMillerPage;