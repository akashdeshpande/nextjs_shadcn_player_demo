import React, { createContext, useContext, useState } from "react";
import { Song } from "@/components/GPTcomponents/types/types";

interface MusicPlayerContextType {
  song: Song | undefined;
  setSong: (song: Song | undefined) => void;
}

const dummySong = {
  id: 1,
  title: "",
  artist: "",
  albumArt: "/placeholder.svg",
  duration: 0,
  link: "",
};

const MusicPlayerContext = createContext<MusicPlayerContextType | undefined>(undefined);

export const MusicPlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [song, setSong] = useState<Song | undefined>(dummySong);

  return (
    <MusicPlayerContext.Provider value={{ song, setSong }}>
      {children}
    </MusicPlayerContext.Provider>
  );
};

export const useMusicPlayer = () => {
  const context = useContext(MusicPlayerContext);
  if (!context) {
    throw new Error("useMusicPlayer must be used within a MusicPlayerProvider");
  }
  return context;
};
