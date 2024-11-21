import React, { useEffect, useRef } from 'react';

type Props = {
  image: string;
  title: string;
  song: string;
  id?: string
};

const MusicPlayer = ({ image, title, song, id }: Props) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const playPauseButtonRef = useRef<HTMLButtonElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const currentTimeSpanRef = useRef<HTMLSpanElement>(null);
  const durationSpanRef = useRef<HTMLSpanElement>(null);

  let isDragging = false;

  useEffect(() => {
    const audio = audioRef.current;
    const playPauseButton = playPauseButtonRef.current;
    const progressBar = progressBarRef.current;
    const progress = progressRef.current;
    const currentTimeSpan = currentTimeSpanRef.current;
    const durationSpan = durationSpanRef.current;
  
    if (!audio || !playPauseButton || !progressBar || !progress || !currentTimeSpan || !durationSpan) return;
  
    const togglePlay = () => {
      if (audio.paused) {
        audio.play();
        playPauseButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-pause"><circle cx="12" cy="12" r="10"/><line x1="10" x2="10" y1="15" y2="9"/><line x1="14" x2="14" y1="15" y2="9"/></svg>';
      } else {
        audio.pause();
        playPauseButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-play"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>';
      }
    };
  
    const updateProgress = () => {
      const percent = (audio.currentTime / audio.duration) * 100;
      progress.style.width = `${percent}%`;
      currentTimeSpan.textContent = formatTime(audio.currentTime);
    };
  
    const setProgress = (e: MouseEvent) => {
      const newTime = (e.offsetX / progressBar.offsetWidth) * audio.duration;
      audio.currentTime = newTime;
    };
  
    const formatTime = (time: number) => {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60).toString().padStart(2, '0');
      return `${minutes}:${seconds}`;
    };
  
    playPauseButton.addEventListener('click', togglePlay);
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('durationchange', () => {
      durationSpan.textContent = formatTime(audio.duration);
    });
    audio.load()
    progressBar.addEventListener('click', setProgress);
  
    // Handle dragging functionality
    progressBar.addEventListener('mousedown', () => {
      isDragging = true;
    });
  
    document.addEventListener('mousemove', (e) => {
      if (isDragging) {
        const rect = progressBar.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / progressBar.offsetWidth;
        progress.style.width = `${pos * 100}%`;
      }
    });
  
    document.addEventListener('mouseup', (e) => {
      if (isDragging) {
        isDragging = false;
        setProgress(e as MouseEvent);
      }
    });
  
    return () => {
      playPauseButton.removeEventListener('click', togglePlay);
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('canplay', () => {
        durationSpan.textContent = formatTime(audio.duration);
      });
      progressBar.removeEventListener('click', setProgress);
      progressBar.removeEventListener('mousedown', () => {
        isDragging = true;
      });
      document.removeEventListener('mousemove', (e) => {
        if (isDragging) {
          const rect = progressBar.getBoundingClientRect();
          const pos = (e.clientX - rect.left) / progressBar.offsetWidth;
          progress.style.width = `${pos * 100}%`;
        }
      });
      document.removeEventListener('mouseup', (e) => {
        if (isDragging) {
          isDragging = false;
          setProgress(e as MouseEvent);
        }
      });
    };
  }, [song]);
  

  return (
    <div className="song-wrapper" id={id}>
      <img src={image} alt={title} />
      <audio ref={audioRef} src={song} />
      <div className="audio-player">
        <button ref={playPauseButtonRef} className="play-pause"><svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-play"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg></button>
        <div className="progress-bar" ref={progressBarRef}>
          <div className="progress" ref={progressRef}></div>
        </div>
        <span className="current-time" ref={currentTimeSpanRef}>0:00</span>
        <span className="separator"> / </span>
        <span className="duration" ref={durationSpanRef}>0:00</span>
      </div>
    </div>
  );
};

export default MusicPlayer;
