"use client"

import { useEffect, useRef, useState } from "react"

interface VideoIntroProps {
  onComplete: () => void
  onSkip: () => void
}

type VideoPhase = 'invitation' | 'engagement' | 'ended'

export default function VideoIntro({ onComplete, onSkip }: VideoIntroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const preloadRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<VideoPhase>('invitation');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Preload engagement video in background
  useEffect(() => {
    if (preloadRef.current) {
      preloadRef.current.preload = 'auto';
      preloadRef.current.load();
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = () => {
      video.play().catch(() => {
        // Autoplay blocked - browser will handle it
      });
    };

    if (video.readyState >= 3) {
      playVideo();
    } else {
      video.addEventListener('canplay', playVideo, { once: true });
    }
  }, [phase]);

  const handleScreenClick = (e: React.MouseEvent) => {
    // Don't trigger if clicking the skip button
    if ((e.target as HTMLElement).closest('button')) return;
    if (phase === 'invitation' && !isTransitioning) {
      setIsTransitioning(true);
      setPhase('engagement');
    }
  };

  const handleVideoEnded = () => {
    if (phase === 'engagement') {
      setPhase('ended');
      onComplete();
    }
  };

  const handleSkip = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSkip();
  };

  const getVideoSource = () => {
    switch (phase) {
      case 'invitation':
        return '/invitation.mp4';
      case 'engagement':
        return '/engagement-video.mp4';
      default:
        return '/engagement-video.mp4';
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black flex items-center justify-center z-[9999] cursor-pointer"
      onClick={handleScreenClick}
    >
      {/* Hidden preloader for engagement video */}
      <video
        ref={preloadRef}
        className="hidden"
        preload="auto"
        muted
      >
        <source src="/engagement-video.mp4" type="video/mp4" />
      </video>

      {phase !== 'ended' && (
        <video 
          ref={videoRef}
          key={phase}
          className="w-full h-full object-contain"
          playsInline={true}
          muted={true}
          autoPlay={true}
          onEnded={handleVideoEnded}
          preload="auto"
          disablePictureInPicture
          loop={phase === 'invitation'}
        >
          <source src={getVideoSource()} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Click hint for invitation phase */}
      {phase === 'invitation' && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-40 animate-pulse">
          <p className="text-white/80 text-sm md:text-base font-light tracking-wide">
            Click anywhere to continue
          </p>
        </div>
      )}

      {/* Skip Button - Always visible */}
      <button
        onClick={handleSkip}
        onTouchStart={(e) => e.stopPropagation()}
        className="absolute top-4 right-4 md:top-8 md:right-8 z-50 px-4 py-2 bg-black/60 backdrop-blur-sm text-white rounded-full text-sm font-medium hover:bg-black/80 transition-all pointer-events-auto touch-manipulation"
      >
        Skip
      </button>
    </div>
  );
}
