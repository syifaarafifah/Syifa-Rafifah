// src/components/VideoGallery.tsx
'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight, Volume2, VolumeX, Loader2 } from 'lucide-react';
import Image from 'next/image';

// Simple type declarations
interface YouTubePlayer {
  playVideo(): void;
  pauseVideo(): void;
  stopVideo(): void;
  mute(): void;
  unMute(): void;
  getDuration(): number;
  getCurrentTime(): number;
  destroy(): void;
}

declare global {
  interface Window {
    YT: {
      Player: new (
        elementId: string | HTMLElement,
        config: {
          videoId: string;
          playerVars: {
            playsinline: number;
            modestbranding: number;
            rel: number;
            controls: number;
            enablejsapi: number;
            autoplay: number;
            mute: number;
          };
          events: {
            onReady: (event: { target: YouTubePlayer }) => void;
            onStateChange: (event: { target: YouTubePlayer; data: number }) => void;
          };
        }
      ) => YouTubePlayer;
      PlayerState: {
        UNSTARTED: number;
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
        BUFFERING: number;
        CUED: number;
      };
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

interface YouTubeVideo {
  id: string;
  title: string;
  poster: string;
}

interface VideoGalleryProps {
  videos: YouTubeVideo[];
}

export default function VideoGallery({ videos }: VideoGalleryProps) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isClient, setIsClient] = useState(false);
  
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const playerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const players = useRef<YouTubePlayer[]>([]);
  const isInitialized = useRef(false);

  useEffect(() => setIsClient(true), []);

  const setPlayerRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    playerRefs.current[index] = el;
  }, []);

  const stopProgressTracking = useCallback(() => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }
  }, []);

  const startProgressTracking = useCallback((index: number) => {
    stopProgressTracking();
    progressInterval.current = setInterval(() => {
      const player = players.current[index];
      if (player && typeof player.getDuration === 'function' && typeof player.getCurrentTime === 'function') {
        try {
          const duration = player.getDuration();
          const currentTime = player.getCurrentTime();
          if (duration > 0) setProgress((currentTime / duration) * 100);
        } catch (error) {
          // Handle YouTube API errors silently
        }
      }
    }, 200);
  }, [stopProgressTracking]);

  const handlePlayerReady = useCallback((event: { target: YouTubePlayer }, index: number) => {
    event.target.mute();
    if (index === currentVideoIndex) {
      setIsLoading(false);
      setIsPlaying(true);
      event.target.playVideo();
      startProgressTracking(index);
    }
  }, [currentVideoIndex, startProgressTracking]);

  const handlePlayerStateChange = useCallback((event: { target: YouTubePlayer; data: number }, index: number) => {
    if (index !== currentVideoIndex) return;
    
    if (event.data === window.YT?.PlayerState.PLAYING) {
      setIsPlaying(true);
      startProgressTracking(index);
    } else if (event.data === window.YT?.PlayerState.PAUSED) {
      setIsPlaying(false);
      stopProgressTracking();
    } else if (event.data === window.YT?.PlayerState.ENDED) {
      setIsPlaying(false);
      stopProgressTracking();
      setProgress(100);
      if (currentVideoIndex < videos.length - 1) {
        handleVideoChange(currentVideoIndex + 1);
      }
    }
  }, [currentVideoIndex, videos.length, startProgressTracking, stopProgressTracking]);

  const handleVideoChange = useCallback((newIndex: number) => {
    stopProgressTracking();
    const currentPlayer = players.current[currentVideoIndex];
    if (currentPlayer) {
      currentPlayer.pauseVideo();
    }
    
    setIsPlaying(true);
    setIsLoading(true);
    setCurrentVideoIndex(newIndex);
    setProgress(0);
    
    setTimeout(() => {
      const newPlayer = players.current[newIndex];
      if (newPlayer) {
        newPlayer.mute();
        newPlayer.playVideo();
        startProgressTracking(newIndex);
      }
      setIsLoading(false);
    }, 500);
  }, [currentVideoIndex, startProgressTracking, stopProgressTracking]);

  const initializePlayers = useCallback(() => {
    if (!window.YT || isInitialized.current) return;
    isInitialized.current = true;

    players.current = Array(videos.length).fill(null);
    
    videos.forEach((video, index) => {
      if (playerRefs.current[index]) {
        try {
          const player = new window.YT.Player(playerRefs.current[index]!, {
            videoId: video.id,
            playerVars: {
              playsinline: 1,
              modestbranding: 1,
              rel: 0,
              controls: 0,
              enablejsapi: 1,
              autoplay: index === currentVideoIndex ? 1 : 0,
              mute: 1
            },
            events: {
              onReady: (event: { target: YouTubePlayer }) => handlePlayerReady(event, index),
              onStateChange: (event: { target: YouTubePlayer; data: number }) => handlePlayerStateChange(event, index),
            }
          });
          players.current[index] = player;
        } catch (error) {
          console.error('Failed to initialize YouTube player:', error);
        }
      }
    });
  }, [videos, currentVideoIndex, handlePlayerReady, handlePlayerStateChange]);

  useEffect(() => {
    if (!isClient) return;
    
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      window.onYouTubeIframeAPIReady = initializePlayers;
    } else {
      initializePlayers();
    }

    return () => {
      players.current.forEach(player => {
        try {
          player?.destroy();
        } catch (e) {
          // ignore errors on destroy
        }
      });
      stopProgressTracking();
      isInitialized.current = false;
    };
  }, [isClient, initializePlayers, stopProgressTracking]);

  const togglePlayPause = useCallback(() => {
    const player = players.current[currentVideoIndex];
    if (player) {
      if (isPlaying) {
        player.pauseVideo();
        setIsPlaying(false);
      } else {
        player.playVideo();
        setIsPlaying(true);
      }
    }
  }, [currentVideoIndex, isPlaying]);

  const toggleMute = useCallback(() => {
    const player = players.current[currentVideoIndex];
    if (player) {
      if (isMuted) {
        player.unMute();
        setIsMuted(false);
      } else {
        player.mute();
        setIsMuted(true);
      }
    }
  }, [currentVideoIndex, isMuted]);

  const goToPreviousVideo = useCallback(() => {
    if (currentVideoIndex > 0) {
      handleVideoChange(currentVideoIndex - 1);
    }
  }, [currentVideoIndex, handleVideoChange]);

  const goToNextVideo = useCallback(() => {
    if (currentVideoIndex < videos.length - 1) {
      handleVideoChange(currentVideoIndex + 1);
    }
  }, [currentVideoIndex, videos.length, handleVideoChange]);

  const renderVideoContent = (video: YouTubeVideo, index: number) => {
    if (!isClient) {
      return (
        <Image 
          src={video.poster} 
          alt={video.title} 
          className="w-full h-full object-cover"
          width={800}
          height={600}
          priority
        />
      );
    }
    return (
      <>
        <div ref={setPlayerRef(index)} className="w-full h-full" />
        <Image
          src={video.poster}
          alt={video.title}
          className={`absolute inset-0 w-full h-full object-cover ${index === currentVideoIndex && !isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          width={800}
          height={600}
          priority
        />
      </>
    );
  };

  return (
    <div className="mb-20">
      <div className="relative rounded-3xl overflow-hidden bg-gray-900 aspect-[9/16] md:aspect-video max-h-[80vh] mx-auto shadow-2xl border border-gray-200">
        {isLoading && isClient && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-10">
            <Loader2 className="animate-spin h-10 w-10 text-white" />
          </div>
        )}
        {videos.map((video, index) => (
          <div 
            key={video.id}
            className={`absolute inset-0 transition-opacity duration-500 ${index === currentVideoIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
            {renderVideoContent(video, index)}
          </div>
        ))}

        {isClient && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center justify-center space-x-2 bg-black/70 backdrop-blur-md rounded-full px-4 py-3 z-20">
            <button 
              onClick={goToPreviousVideo}
              disabled={currentVideoIndex === 0}
              className={`p-2 rounded-full hover:bg-white/10 transition-all ${currentVideoIndex === 0 ? 'opacity-40 cursor-not-allowed' : 'opacity-90'}`}
            >
              <ChevronLeft size={20} className="text-white"/>
            </button>
            <button onClick={togglePlayPause} className="p-2 rounded-full hover:bg-white/10 transition-all">
              {isPlaying ? <Pause size={20} className="text-white"/> : <Play size={20} className="text-white"/>}
            </button>
            <button onClick={toggleMute} className="p-2 rounded-full hover:bg-white/10 transition-all">
              {isMuted ? <VolumeX size={20} className="text-white"/> : <Volume2 size={20} className="text-white"/>}
            </button>
            <button 
              onClick={goToNextVideo}
              disabled={currentVideoIndex === videos.length - 1}
              className={`p-2 rounded-full hover:bg-white/10 transition-all ${currentVideoIndex === videos.length - 1 ? 'opacity-40 cursor-not-allowed' : 'opacity-90'}`}
            >
              <ChevronRight size={20} className="text-white"/>
            </button>
          </div>
        )}

        {isClient && (
          <div className="absolute bottom-0 left-0 w-full h-1 bg-white/30 z-20">
            <div className="h-full bg-white transition-all duration-100" style={{width: `${progress}%`}}/>
          </div>
        )}

        {isClient && (
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
            {videos.map((_, i) => (
              <button 
                key={i} 
                onClick={() => handleVideoChange(i)}
                className={`w-3 h-3 rounded-full transition-all ${i === currentVideoIndex ? 'bg-white scale-125' : 'bg-white/50'}`}
              />
            ))}
          </div>
        )}

        {isClient && (
          <div className="absolute top-6 left-6 bg-black/70 text-white px-4 py-2 rounded-full text-sm z-20 backdrop-blur-sm">
            {videos[currentVideoIndex].title}
          </div>
        )}
      </div>
      <div className="mt-6 text-center text-gray-500 text-sm">
        <p>Swipe or use controls to explore project features</p>
      </div>
    </div>
  );
}