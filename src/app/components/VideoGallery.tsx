// src/components/VideoGallery.tsx
'use client';
import { useState, useRef, useEffect } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight, Volume2, VolumeX, Loader2 } from 'lucide-react';

declare global {
  interface Window {
    YT: any;
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
  const [isPlaying, setIsPlaying] = useState(true); // Default to playing
  const [isLoading, setIsLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [players, setPlayers] = useState<any[]>([]);
  const [isClient, setIsClient] = useState(false);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const [progress, setProgress] = useState(0);
  const playerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => setIsClient(true), []);

  const setPlayerRef = (index: number) => (el: HTMLDivElement | null) => {
    playerRefs.current[index] = el;
  };

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
      players.forEach(p => p?.destroy && p.destroy());
      stopProgressTracking();
    };
  }, [isClient]);

  const initializePlayers = () => {
    const newPlayers = videos.map((video, index) => {
      if (playerRefs.current[index] && window.YT) {
        return new window.YT.Player(playerRefs.current[index], {
          videoId: video.id,
          playerVars: {
            playsinline: 1,
            modestbranding: 1,
            rel: 0,
            controls: 0,
            enablejsapi: 1,
            autoplay: 1, // Enable autoplay
            mute: 1
          },
          events: {
            onReady: (event: any) => onPlayerReady(event, index),
            onStateChange: (event: any) => onPlayerStateChange(event, index),
          }
        });
      }
      return null;
    });
    setPlayers(newPlayers.filter(Boolean) as any[]);
  };

  const onPlayerReady = (_event: any, index: number) => {
    players[index]?.mute();
    if (index === currentVideoIndex) {
      setIsLoading(false);
      setIsPlaying(true);
      players[index]?.playVideo();
      startProgressTracking(index);
    }
  };

  const onPlayerStateChange = (event: any, index: number) => {
    if (index !== currentVideoIndex) return;
    if (event.data === window.YT.PlayerState.PLAYING) {
      setIsPlaying(true);
      startProgressTracking(index);
    } else if (event.data === window.YT.PlayerState.PAUSED) {
      setIsPlaying(false);
      stopProgressTracking();
    } else if (event.data === window.YT.PlayerState.ENDED) {
      setIsPlaying(false);
      stopProgressTracking();
      setProgress(100);
      if (currentVideoIndex < videos.length - 1) {
        changeVideo(currentVideoIndex + 1);
      }
    }
  };

  const startProgressTracking = (index: number) => {
    stopProgressTracking();
    progressInterval.current = setInterval(() => {
      if (players[index]?.getDuration) {
        const d = players[index].getDuration();
        const c = players[index].getCurrentTime();
        if (d > 0) setProgress((c / d) * 100);
      }
    }, 200);
  };

  const stopProgressTracking = () => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }
  };

  const togglePlayPause = () => {
    if (players[currentVideoIndex]) {
      if (isPlaying) {
        players[currentVideoIndex].pauseVideo();
        setIsPlaying(false);
      } else {
        players[currentVideoIndex].playVideo();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (players[currentVideoIndex]) {
      if (isMuted) {
        players[currentVideoIndex].unMute();
        setIsMuted(false);
      } else {
        players[currentVideoIndex].mute();
        setIsMuted(true);
      }
    }
  };

  const changeVideo = (newIndex: number) => {
    stopProgressTracking();
    players[currentVideoIndex]?.pauseVideo();
    setIsPlaying(true); // Set to playing when changing videos
    setIsLoading(true);
    setCurrentVideoIndex(newIndex);
    setProgress(0);
    setTimeout(() => {
      if (players[newIndex]) {
        players[newIndex].mute();
        players[newIndex].playVideo();
        setIsLoading(false);
      }
    }, 500);
  };

  const renderVideoContent = (video: YouTubeVideo, index: number) => {
    if (!isClient) {
      return <img src={video.poster} alt={video.title} className="w-full h-full object-cover" />;
    }
    return (
      <>
        <div ref={setPlayerRef(index)} className="w-full h-full" />
        <img
          src={video.poster}
          alt={video.title}
          className={`absolute inset-0 w-full h-full object-cover ${index === currentVideoIndex && !isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
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
          <div key={video.id}
               className={`absolute inset-0 transition-opacity duration-500 ${index === currentVideoIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            {renderVideoContent(video, index)}
          </div>
        ))}

        {isClient && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center justify-center space-x-2 bg-black/70 backdrop-blur-md rounded-full px-4 py-3 z-20">
            <button onClick={() => currentVideoIndex>0&&changeVideo(currentVideoIndex-1)}
                    disabled={currentVideoIndex===0}
                    className={`p-2 rounded-full hover:bg-white/10 transition-all ${currentVideoIndex===0?'opacity-40 cursor-not-allowed':'opacity-90'}`}>
              <ChevronLeft size={20} className="text-white"/>
            </button>
            <button onClick={togglePlayPause} className="p-2 rounded-full hover:bg-white/10 transition-all">
              {isPlaying?<Pause size={20} className="text-white"/>:<Play size={20} className="text-white"/>}
            </button>
            <button onClick={toggleMute} className="p-2 rounded-full hover:bg-white/10 transition-all">
              {isMuted?<VolumeX size={20} className="text-white"/>:<Volume2 size={20} className="text-white"/>}
            </button>
            <button onClick={() => currentVideoIndex<videos.length-1&&changeVideo(currentVideoIndex+1)}
                    disabled={currentVideoIndex===videos.length-1}
                    className={`p-2 rounded-full hover:bg-white/10 transition-all ${currentVideoIndex===videos.length-1?'opacity-40 cursor-not-allowed':'opacity-90'}`}>
              <ChevronRight size={20} className="text-white"/>
            </button>
          </div>
        )}

        {isClient && (
          <div className="absolute bottom-0 left-0 w-full h-1 bg-white/30 z-20">
            <div className="h-full bg-white transition-all duration-100" style={{width:`${progress}%`}}/>
          </div>
        )}

        {isClient && (
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
            {videos.map((_,i)=>(
              <button key={i} onClick={()=>changeVideo(i)}
                      className={`w-3 h-3 rounded-full transition-all ${i===currentVideoIndex?'bg-white scale-125':'bg-white/50'}`}/>
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