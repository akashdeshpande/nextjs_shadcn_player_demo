"use client"

import Image from "next/image";
import { Button } from "@/components/ui/button"
import MusicPlayer from "@/components/GPTcomponents/MusicPlayer";
import LoadEpisodeList from "@/components/myAppComponents/load-episode-list";
import { useState } from "react";

    // https://howlerjs.com/assets/howler.js/examples/player/audio/rave_digger.webm
    // https://howlerjs.com/assets/howler.js/examples/player/audio/80s_vibe.webm



export default function Home() {
  const [mediaUrl, setMediaUrl] = useState("");

  const handleMediaChange = (mediaUrl) => {
    setMediaUrl(mediaUrl);
  }

  return (
    <div>
      <LoadEpisodeList 
        handleMediaChange={handleMediaChange}
      />
      <MusicPlayer
        mediaUrl={mediaUrl}
        setMediaUrl={handleMediaChange}
      ></MusicPlayer>
    </div>
  );
}
