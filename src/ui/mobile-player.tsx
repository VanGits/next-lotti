import React, { useEffect, useRef, useState } from 'react';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Shuffle, 
  Repeat 
} from 'lucide-react';
import { playlist } from '@/lib/playlist';

const SpotifyMusicPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');

  let isDragging = false;

  const currentTrack = playlist[currentTrackIndex];

  useEffect(() => {
    const audio = audioRef.current;
    const progressBar = progressBarRef.current;
    const progress = progressRef.current;

    if (!audio || !progressBar || !progress) return;

    const updateProgress = () => {
      const percent = (audio.currentTime / audio.duration) * 100;
      setProgress(percent);
      setCurrentTime(formatTime(audio.currentTime));
    };

    const setProgressTime = (e: MouseEvent) => {
      if (!progressBar) return;
      const newTime = (e.offsetX / progressBar.offsetWidth) * audio.duration;
      audio.currentTime = newTime;
    };

    const handleTrackEnd = () => {
      if (isRepeating) {
        audio.currentTime = 0;
        audio.play();
      } else {
        nextTrack();
      }
    };

    const formatTime = (time: number) => {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60).toString().padStart(2, '0');
      return `${minutes}:${seconds}`;
    };

    const handleLoadedMetadata = () => {
      setDuration(formatTime(audio.duration));
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleTrackEnd);
    progressBar.addEventListener('click', setProgressTime);

    // Dragging functionality
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && progressBar && progress) {
        const rect = progressBar.getBoundingClientRect();
        const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / progressBar.offsetWidth));
        progress.style.width = `${pos * 100}%`;
        
        if (audio) {
          audio.currentTime = pos * audio.duration;
        }
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    progressBar.addEventListener('mousedown', () => { isDragging = true; });
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleTrackEnd);
      progressBar.removeEventListener('click', setProgressTime);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [currentTrack, isRepeating]);

  const nextTrack = () => {
    const nextIndex = isShuffled 
      ? Math.floor(Math.random() * playlist.length)
      : (currentTrackIndex + 1) % playlist.length;
    setCurrentTrackIndex(nextIndex);
    
    // Slight delay to ensure audio is ready
    setTimeout(() => {
      audioRef.current?.play();
      setIsPlaying(true);
    }, 100);
  };

  const prevTrack = () => {
    const prevIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    setCurrentTrackIndex(prevIndex);
    
    // Slight delay to ensure audio is ready
    setTimeout(() => {
      audioRef.current?.play();
      setIsPlaying(true);
    }, 100);
  };

  return (
    <div className="spotify-mobile-player">
      <audio 
        ref={audioRef} 
        src={currentTrack.audio}
        preload='auto'
      />

      <div className="player-container">
        {/* Album Artwork */}
        <div className="album-artwork">
          <img 
            src={currentTrack.image} 
            alt="Album Cover" 
            className="album-cover"
          />
        </div>

        {/* Track Info */}
        <div className="track-info">
          <h2 className="song-title">{currentTrack.title}</h2>
          <p className="artist-name">{currentTrack.artist}</p>
        </div>

        {/* Progress Bar */}
        <div className="progress-container">
          <div 
            className="progress-bar"
            ref={progressBarRef}
          >
            <div 
              className="progress-fill" 
              ref={progressRef}
              style={{width: `${progress}%`}}
            ></div>
          </div>
          <div className="time-info">
            <span className="current-time">{currentTime}</span>
            <span className="total-time">{duration}</span>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="player-controls">
          <button 
            className={`control-btn shuffle-btn ${isShuffled ? 'active' : ''}`}
            onClick={() => setIsShuffled(!isShuffled)}
          >
            <Shuffle size={24} />
          </button>

          <button 
            className="control-btn skip-back-btn"
            onClick={prevTrack}
          >
            <SkipBack size={32} />
          </button>

          <button 
            className="control-btn play-pause-btn"
            onClick={() => {
                const audio = audioRef.current;
                if (audio) {
                  if (isPlaying) {
                    audio.pause();
                  } else {
                    audio.play();
                  }
                  setIsPlaying(!isPlaying);
                }
              }}              
          >
            {isPlaying ? <Pause size={40} /> : <Play size={40} />}
          </button>

          <button 
            className="control-btn skip-forward-btn"
            onClick={nextTrack}
          >
            <SkipForward size={32} />
          </button>

          <button 
            className={`control-btn repeat-btn ${isRepeating ? 'active' : ''}`}
            onClick={() => setIsRepeating(!isRepeating)}
          >
            <Repeat size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpotifyMusicPlayer;