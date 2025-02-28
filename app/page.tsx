"use client"

import MusicPlayer from "@/components/GPTcomponents/MusicPlayer";
import Queue from "@/components/GPTcomponents/Queue";
import { useState } from "react";
import { Song } from "@/components/GPTcomponents/types/types";

    // https://howlerjs.com/assets/howler.js/examples/player/audio/rave_digger.webm
    // https://howlerjs.com/assets/howler.js/examples/player/audio/80s_vibe.webm

export default function Home() {

  const song1: Song = {
    id: 1,
    title: "Rave Digger",
    artist: "Howler One",
    albumArt: "https://picsum.photos/300/300",
    link: "https://howlerjs.com/assets/howler.js/examples/player/audio/rave_digger.webm"
  }
  const song2: Song = {
    id: 2,
    title: "80s Vibe",
    artist: "Howler Two",
    albumArt: "https://picsum.photos/300/300",
    link: "https://howlerjs.com/assets/howler.js/examples/player/audio/80s_vibe.webm"
  }

const dummySong = {
  id: 1,
  title: "",
  artist: "",
  albumArt: "/placeholder.svg",
  duration: 0,
  link: "",
};

  const [songs, setSongs] = useState<Song[]>([song1, song2]);

  const [song, setSong] = useState<Song | undefined>(dummySong);

  return (
    <div>
      <MusicPlayer
        songs={songs}
        song={song}
        setSong={setSong}
      ></MusicPlayer>
    </div>
  );
}
