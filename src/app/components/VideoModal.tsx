"use client";

import React, { useEffect, useRef } from 'react';
import { XMarkIcon } from './Icons'; // Assuming Icons.tsx is in the same directory

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, videoSrc }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Effect to play/pause video when modal opens/closes
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    if (isOpen) {
      videoElement.play().catch(error => {
        // Autoplay might be blocked, which is fine. The user can click play.
        console.warn("Video autoplay was prevented:", error);
      });
    } else {
      videoElement.pause();
      videoElement.currentTime = 0; // Rewind video
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      onClick={onClose} // Close modal on overlay click
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-slate-900 rounded-lg shadow-2xl w-full max-w-4xl aspect-video relative overflow-hidden"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the video container
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white bg-black/50 hover:bg-black/80 cursor-pointer rounded-full p-2 z-10"
          aria-label="Close video player"
          type="button"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
        <video
          ref={videoRef}
          className="w-full h-full"
          src={videoSrc}
          controls
          preload="auto"
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default VideoModal;