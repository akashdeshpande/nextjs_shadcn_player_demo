import Image from "next/image";
import { Button } from "@/components/ui/button"
import MusicPlayer from "@/components/GPTcomponents/MusicPlayer";
import Queue from "@/components/GPTcomponents/Queue";

    // https://howlerjs.com/assets/howler.js/examples/player/audio/rave_digger.webm
    // https://howlerjs.com/assets/howler.js/examples/player/audio/80s_vibe.webm

export default function Home() {
  return (
    <div>
      <MusicPlayer></MusicPlayer>
      <Queue></Queue>
    </div>
  );
}
