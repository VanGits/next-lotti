import MusicPlayer from "@/ui/music-player";
import React from "react";

const LottiWho = () => {
  return (
    <div className="lotti-who">
      <h1>3. Music</h1>
      <h4>
        Lotti is an extension of myself. Pieces of me are in Lotti. Some parts
        of my mother are in Lotti. My grandma is definitely in Lotti. The
        stories of the women I know and am inspired by are in Lotti. Lotti is a
        project. | to express | to share | to zoom in | | to examine |
        She&apos;s colorful. She&apos;s playful. She&apos;s triumphant.
        She&apos;s heartache. She&apos;s freedom. She&apos;s love. That&apos;s
        Lotti.
      </h4>
      <MusicPlayer
        image="/assets/songs/moderngirl.jpeg"
        title="modern girl"
        song="/assets/audios/modern.mp3"
        id="modern"
      />
    </div>
  );
};

export default LottiWho;
