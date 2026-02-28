'use client';

import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/translations';

export function RomanticAudio() {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const wasPlayingRef = useRef(false);
  const t = useTranslation();

  // Handle first user interaction to start audio
  useEffect(() => {
    if (typeof window === 'undefined' || !audioRef.current) return;

    const audio = audioRef.current;
    let hasStarted = false;

    if (!audio.src || audio.src === '') {
      audio.src = '/romantic-piano.mp3';
      audio.load();
    }

    const startAudio = () => {
      setTimeout(() => {
        if (hasStarted || isPlaying) return;

        setTimeout(() => {
          try {
            audio.muted = false;
            const playPromise = audio.play();

            if (playPromise !== undefined) {
              playPromise
                .then(() => {
                  setIsPlaying(true);
                  hasStarted = true;
                })
                .catch((err) => {
                  console.log('Audio play failed:', err);
                  if (audio.readyState < 3) {
                    const onCanPlay = () => {
                      audio.muted = false;
                      audio.play()
                        .then(() => {
                          setIsPlaying(true);
                          hasStarted = true;
                        })
                        .catch(() => { });
                    };
                    audio.addEventListener('canplay', onCanPlay, { once: true });
                  }
                });
            } else {
              setIsPlaying(true);
              hasStarted = true;
            }
          } catch (err) {
            console.log('Audio start error:', err);
          }
        }, 3500);
      }, 0);
    };

    const options = { once: true, passive: false, capture: true };
    document.addEventListener('touchstart', startAudio, options);
    document.addEventListener('click', startAudio, options);

    return () => {
      document.removeEventListener('touchstart', startAudio);
      document.removeEventListener('click', startAudio);
    };
  }, [isPlaying]);

  // Initialize audio settings
  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;
    audio.volume = 0.25;
    audio.muted = isMuted;

    if (!audio.src || audio.src === '') {
      audio.src = '/romantic-piano.mp3';
    }
    audio.load();

    const handleCanPlay = () => {
      setTimeout(() => {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
              wasPlayingRef.current = true;
            })
            .catch(() => {
              console.log('Autoplay prevented, waiting for interaction');
            });
        }
      }, 1000);
    };

    audio.addEventListener('canplaythrough', handleCanPlay, { once: true });
    if (audio.readyState >= 4) {
      handleCanPlay();
    }

    return () => {
      audio.removeEventListener('canplaythrough', handleCanPlay);
      if (audio && !audio.paused) {
        audio.pause();
      }
    };
  }, []);

  // Handle mute state changes
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.muted = isMuted;
  }, [isMuted]);

  // Pause music when user leaves the browser/tab
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const pauseIfPlaying = () => {
      if (!audioRef.current) return;
      const a = audioRef.current;
      try {
        a.muted = true;
        a.pause();
        wasPlayingRef.current = false;
        setIsPlaying(false);
      } catch (error) {
        console.error('Error while pausing audio:', error);
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        pauseIfPlaying();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pagehide', pauseIfPlaying);
    window.addEventListener('beforeunload', pauseIfPlaying);
    window.addEventListener('blur', pauseIfPlaying);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pagehide', pauseIfPlaying);
      window.removeEventListener('beforeunload', pauseIfPlaying);
      window.removeEventListener('blur', pauseIfPlaying);
    };
  }, []);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMute}
        className="
          rounded-full w-12 h-12 
          bg-accent hover:bg-muted
          active:bg-muted/80
          transition-all duration-200 
          flex items-center justify-center
          shadow-md
          text-accent-foreground
        "
        aria-label={isMuted ? t('unmuteMusic') : t('muteMusic')}
        title={isMuted ? t('unmuteMusic') : t('muteMusic')}
      >
        {isMuted ? (
          <VolumeX className="h-6 w-6" aria-hidden="true" />
        ) : (
          <Volume2 className="h-6 w-6" aria-hidden="true" />
        )}
      </Button>

      <audio
        ref={audioRef}
        src="/romantic-piano.mp3"
        loop
        playsInline
        preload="auto"
        crossOrigin="anonymous"
        className="hidden"
      />
    </div>
  );
}
