'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

// --- SVG Icon Components ---
// Using the same style as your example for consistency.
const ArrowLeftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
    </svg>
);

const PlayIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M8 5v14l11-7z" />
    </svg>
);


// --- Data for the video playlist ---
// In a real app, you might fetch this from a CMS or an API.
const videoData = [
    {
        id: 1,
        src: "/videos/wordpress/WordPress_Tutorial_01.mp4",
        title: "Wordpress - Introduction & Adding A New Post",
        description: "Welcome to your WordPress training! This introductory module provides a tour of the WordPress dashboard and walks you through the essential first step: creating and publishing a new post.",
        playlistTitle: "Module 1: Introduction & Adding A New Post"
    },
    {
        id: 2,
        src: "/videos/wordpress/WordPress_Tutorial_02.mp4",
        title: "Wordpress - Editing A Post",
        description: "Take the next step in managing your WordPress site. This video guides you through the process of editing a post, covering how to change text and headlines, replace images, update categories and tags, and publish your revisions.",
        playlistTitle: "Module 2: Editing A Post"
    },    
    {
        id: 3,
        src: "/videos/wordpress/WordPress_Tutorial_03.mp4",
        title: "Wordpress - Adding Media & Images",
        description: "Enhance your posts with media! This module teaches you how to add images and other media files to your WordPress posts, making your content more engaging and visually appealing.",
        playlistTitle: "Module 3: Adding Media & Images"
    },  
];


// --- Main Content Component ---
// This contains the logic and layout for the video player and playlist.
const VideoTrainingContent: React.FC = () => {
    const [currentVideo, setCurrentVideo] = useState(videoData[0]);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Effect to handle changing the video source and plays it when a new video is selected
    useEffect(() => {
        if (videoRef.current && currentVideo) {
            videoRef.current.load();
            videoRef.current.play().catch(error => {
                console.log("Autoplay was prevented by the browser:", error);
            });
        }
    }, [currentVideo]);

    const handleVideoSelect = (video: typeof videoData[0]) => {
        setCurrentVideo(video);
    };

    return (
        <div className="text-slate-300 leading-relaxed space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-100 mb-1">Training Modules</h1>
            <p className="text-sm text-slate-400 mb-6">Select a module from the playlist to begin.</p>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Video Player Section */}
                <div className="lg:col-span-2 bg-slate-900/50 p-4 rounded-lg shadow-inner">
                    <video ref={videoRef} key={currentVideo.src} controls className="w-full h-auto aspect-video rounded-md">
                        <source src={currentVideo.src} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div className="pt-6">
                        <h2 className="text-2xl font-bold text-slate-100 mb-2">
                            {currentVideo.title}
                        </h2>
                        <p className="text-slate-400">
                            {currentVideo.description}
                        </p>
                    </div>
                </div>

                {/* Playlist Section */}
                <div className="lg:col-span-1 bg-slate-900/50 p-4 rounded-lg shadow-inner">
                    <h3 className="text-xl font-bold text-slate-200 border-b border-slate-700 pb-3 mb-3">
                        Video Playlist
                    </h3>
                    <ul className="space-y-2 max-h-[400px] lg:max-h-[500px] overflow-y-auto">
                        {videoData.map(video => (
                            <li
                                key={video.id}
                                onClick={() => handleVideoSelect(video)}
                                className={`flex items-center gap-3 p-3 rounded-md cursor-pointer transition-all duration-200 ${
                                    currentVideo.id === video.id 
                                        ? 'bg-indigo-500/20 text-indigo-300 font-semibold' 
                                        : 'hover:bg-slate-700/50 text-slate-400'
                                }`}
                            >
                                <PlayIcon className={`w-4 h-4 flex-shrink-0 ${currentVideo.id === video.id ? 'text-indigo-400' : 'text-slate-500'}`} />
                                <span>{video.playlistTitle}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};


// --- Page Component ---
// This is the main export for your page file (e.g., app/training/page.tsx)
const VideoTrainingPage = () => {
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
                        <VideoTrainingContent />
                    </article>
                </div>
            </main>
        </div>
    );
};

export default VideoTrainingPage;
