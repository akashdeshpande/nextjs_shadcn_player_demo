import Image from "next/image";
import { Button } from "@/components/ui/button"
import MusicPlayer from "@/components/GPTcomponents/MusicPlayer";
import Sonik from "@/components/Sonik/Sonik";

    // https://howlerjs.com/assets/howler.js/examples/player/audio/rave_digger.webm
    // https://howlerjs.com/assets/howler.js/examples/player/audio/80s_vibe.webm

export default function Home() {
  return (
    <div>
      <Button>Test Btn</Button>
      {/* <MusicPlayer
        song={{
          title: "Never Gonna Give You Up",
          artist: "Rick Astley",
          albumArt: "/placeholder.svg?height=400&width=400",
          duration: 213,
        }}
      ></MusicPlayer> */}
      <MusicPlayer></MusicPlayer>
    </div>
  );
}
