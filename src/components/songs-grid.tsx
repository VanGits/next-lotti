import MusicPlayer from "@/ui/music-player";
import React from "react";

const SongsGrid = () => {
  return (
    <div className="songs-grid">
      <MusicPlayer
        image="/assets/songs/didyathink.jpg"
        title="Did Ya Think"
        song="/assets/audios/did.mp3"
      />
      <MusicPlayer
        image="/assets/songs/casualty.jpg"
        title="Casualty"
        song="/assets/audios/casualty.mp3"
      />
      <MusicPlayer
        image="/assets/songs/inbloom.jpg"
        title="In Bloom"
        song="/assets/audios/bloom.mp3"
      />
      <MusicPlayer
        image="/assets/songs/butterflies.jpg"
        title="Butterflies"
        song="/assets/audios/butterflies.mp3"
      />
    </div>
  );
};

export default SongsGrid;
