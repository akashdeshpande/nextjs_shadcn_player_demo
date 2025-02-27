// MusicPlayer.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Howl } from "howler";
import ResponsivePlayerUI from "./ResponsivePlayer";
import Queue from "./Queue";

const MusicPlayer = () => {
  // Business logic state from your unstyled component
  const [mediaUrl, setMediaUrl] = useState("");
  const [sound, setSound] = useState<Howl | null>(null);
  const [volume, setVolume] = useState(1.0); // range: 0–1
  const [speed, setSpeed] = useState(1.0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [renderInterval, setRenderInterval] = useState<any>(null);
  const [queueOpen, setQueueOpen] = useState(false); // Queue state

  const handleOpenSheet = () => setQueueOpen(true);
  const handleCloseSheet = () => setQueueOpen(false);

  // Update the progress and duration while sound is playing.
  useEffect(() => {
    if (renderInterval) {
      clearInterval(renderInterval);
    }
    const interval = setInterval(() => {
      if (sound && sound.playing()) {
        const currentTime = sound.seek() as number;
        setElapsedTime(currentTime);
        setDuration(sound.duration());
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
      }
    }, 100);
    setRenderInterval(interval);
    return () => clearInterval(interval);
  }, [sound]);

  // Create a new Howl instance
  const createSound = () => {
    return new Howl({
      src: mediaUrl,
      preload: true,
      onend: () => console.log("playback finished"),
      onloaderror: (id, error) =>
        console.error("Error loading sound source: ", error),
      html5: true,
    });
  };

  // Business logic functions
  const playSound = () => {
    if (sound) {
      if (sound.playing()) {
        sound.stop();
      }
      sound.play();
      setIsPlaying(true);
    } else if (mediaUrl !== "") {
      const newSound = createSound();
      setSound(newSound);
      newSound.play();
      setIsPlaying(true);
      console.log("creating new sound.");
    } else {
      console.error("Can't play! media url is empty", mediaUrl);
    }
  };

  const pauseSound = () => {
    if (sound) {
      sound.pause();
      setIsPlaying(false);
    }
  };

  const stopSound = () => {
    if (sound) {
      sound.stop();
      setElapsedTime(0);
      setIsPlaying(false);
    }
  };

  const seekForward = () => {
    if (sound) {
      sound.seek((sound.seek() as number) + 5);
    }
  };

  const seekBackward = () => {
    if (sound) {
      sound.seek((sound.seek() as number) - 5);
    }
  };

  const handleVolumeChange = (newVolumePercent: number) => {
    // newVolumePercent comes from 0 to 100 (from the UI) so convert to 0–1.
    const newVolume = newVolumePercent / 100;
    setVolume(newVolume);
    if (sound) {
      sound.volume(newVolume);
    }
  };

  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
    if (sound) {
      sound.rate(newSpeed);
    }
  };

  const handleLoadSong = () => {
    if (sound) {
      if (sound.playing()) sound.stop();
      const newSound = createSound();
      setSound(newSound);
      newSound.play();
      setIsPlaying(true);
      setSpeed(1.0);
      setVolume(1.0);
    } else {
      playSound();
    }
  };

  const handleSeekChange = (newTime: number) => {
    if (sound) {
      sound.seek(newTime);
      setElapsedTime(newTime);
    }
  };

  // Format time (same as your original helper)
  const formatTime = (timeInSec: number) => {
    let hours = Math.floor(timeInSec / 3600);
    let minutes = Math.floor(timeInSec / 60);
    let seconds = Math.floor(timeInSec % 60);
    if (Math.floor(duration / 60) > 60) {
      minutes = minutes % 60;
      return `${hours < 10 ? "0" : ""}${hours}:${
        minutes < 10 ? "0" : ""
      }${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  // Dummy song data for the UI (you could update this based on loaded metadata)
  const song = {
    title: "Sample Song",
    artist: "Unknown Artist",
    albumArt: "/placeholder.svg",
    duration: duration || 0,
  };

  return (
    <div>
      {/* Media URL input – part of the business logic */}
      <div className="p-4">
        <p>Input URL for sound:</p>
        <input
          type="text"
          id="mediaUrl"
          onChange={(e) => setMediaUrl(e.target.value)}
          value={mediaUrl}
          className="border p-1"
        />
        <button
          onClick={handleLoadSong}
          className="ml-2 px-2 py-1 border rounded"
        >
          Load
        </button>
      </div>
      {/* Pass all state and callbacks to the responsive UI */}
      <ResponsivePlayerUI
        song={song}
        isPlaying={isPlaying}
        volume={volume * 100} // convert volume to percentage (0–100)
        progress={elapsedTime}
        onPlay={playSound}
        onPause={pauseSound}
        onStop={stopSound}
        onSeek={handleSeekChange}
        onSeekForward={seekForward}
        onSeekBackward={seekBackward}
        onVolumeChange={handleVolumeChange}
        onSpeedChange={handleSpeedChange}
        formatTime={formatTime}
        queueOpen={queueOpen}
        setQueueOpen={handleOpenSheet}
      />
      <Queue open={queueOpen} onClose={handleCloseSheet} />
    </div>
  );
};

export default MusicPlayer;
