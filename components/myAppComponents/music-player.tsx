"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FastForward, ListMusic, Pause, Play, Rewind, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react"
import { cn } from "@/lib/utils"

interface MusicPlayerProps {
  song: {
    title: string
    artist: string
    albumArt: string
    duration: number
  }
}

export function MusicPlayer1({ song }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [isMuted, setIsMuted] = React.useState(false)
  const [volume, setVolume] = React.useState(100)
  const [progress, setProgress] = React.useState(0)
  const [isExpanded, setIsExpanded] = React.useState(false)

  // Format time in MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 bg-background border-t transition-all duration-300 ease-in-out",
        isExpanded ? "h-[100dvh] md:h-24" : "h-16 md:h-24",
      )}
    >
      {/* Mobile Layout */}
      <div className="md:hidden">
        {/* Mini Player */}
        <div
          className={cn("flex items-center h-16 px-4 gap-4", isExpanded ? "hidden" : "flex")}
          onClick={() => setIsExpanded(true)}
        >
          <div
            className="h-[2px] absolute top-0 left-0 bg-primary"
            style={{ width: `${(progress / song.duration) * 100}%` }}
          />
          <img src={song.albumArt || "/placeholder.svg"} alt="" className="h-12 w-12 rounded-md" />
          <div className="flex-1 min-w-0">
            <div className="font-semibold truncate">{song.title}</div>
            <div className="text-sm text-muted-foreground truncate">{song.artist}</div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10"
            onClick={(e) => {
              e.stopPropagation()
              setIsPlaying(!isPlaying)
            }}
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>
        </div>

        {/* Expanded Player */}
        <div className={cn("flex flex-col items-center px-4 pt-12 pb-8 h-full", isExpanded ? "flex" : "hidden")}>
          <Button variant="ghost" className="absolute top-0 right-0 m-2" onClick={() => setIsExpanded(false)}>
            Close
          </Button>
          <img src={song.albumArt || "/placeholder.svg"} alt="" className="h-64 w-64 rounded-lg shadow-lg mb-8" />
          <div className="text-center mb-8">
            <div className="text-2xl font-bold mb-2">{song.title}</div>
            <div className="text-muted-foreground">{song.artist}</div>
          </div>
          <div className="w-full max-w-md mb-8">
            <div className="flex justify-between text-sm mb-2">
              <span>{formatTime(progress)}</span>
              <span>{formatTime(song.duration)}</span>
            </div>
            <Slider
              value={[progress]}
              max={song.duration}
              step={1}
              onValueChange={(value) => setProgress(value[0])}
              className="mb-8"
            />
            <div className="flex justify-center items-center gap-4 mb-8">
              <Button variant="ghost" size="icon" className="h-12 w-12">
                <SkipBack className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon" className="h-12 w-12">
                <Rewind className="h-6 w-6" />
              </Button>
              <Button
                variant="default"
                size="icon"
                className="h-16 w-16 rounded-full"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
              </Button>
              <Button variant="ghost" size="icon" className="h-12 w-12">
                <FastForward className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon" className="h-12 w-12">
                <SkipForward className="h-6 w-6" />
              </Button>
            </div>
            <div className="flex items-center justify-between gap-4">
              <Select defaultValue="1x">
                <SelectTrigger className="w-[80px]">
                  <SelectValue placeholder="Speed" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0.5x">0.5x</SelectItem>
                  <SelectItem value="1x">1x</SelectItem>
                  <SelectItem value="1.5x">1.5x</SelectItem>
                  <SelectItem value="2x">2x</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2 flex-1">
                <Button variant="ghost" size="icon" onClick={() => setIsMuted(!isMuted)}>
                  {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </Button>
                <Slider
                  value={[isMuted ? 0 : volume]}
                  max={100}
                  step={1}
                  onValueChange={(value) => {
                    setVolume(value[0])
                    setIsMuted(value[0] === 0)
                  }}
                  className="w-full max-w-[120px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:grid grid-cols-3 h-full items-center px-4 gap-4">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <img src={song.albumArt || "/placeholder.svg"} alt="" className="h-14 w-14 rounded-md" />
          <div>
            <div className="font-semibold">{song.title}</div>
            <div className="text-sm text-muted-foreground">{song.artist}</div>
          </div>
        </div>

        {/* Center Section */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <SkipBack className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Rewind className="h-5 w-5" />
            </Button>
            <Button
              variant="default"
              size="icon"
              className="h-10 w-10 rounded-full"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
            </Button>
            <Button variant="ghost" size="icon">
              <FastForward className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <SkipForward className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex items-center gap-2 w-full max-w-md">
            <div className="text-sm w-12 text-right">{formatTime(progress)}</div>
            <Slider
              value={[progress]}
              max={song.duration}
              step={1}
              onValueChange={(value) => setProgress(value[0])}
              className="flex-1"
            />
            <div className="text-sm w-12">{formatTime(song.duration)}</div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center justify-end gap-4">
          <Select defaultValue="1x">
            <SelectTrigger className="w-[80px]">
              <SelectValue placeholder="Speed" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0.5x">0.5x</SelectItem>
              <SelectItem value="1x">1x</SelectItem>
              <SelectItem value="1.5x">1.5x</SelectItem>
              <SelectItem value="2x">2x</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setIsMuted(!isMuted)}>
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </Button>
            <Slider
              value={[isMuted ? 0 : volume]}
              max={100}
              step={1}
              onValueChange={(value) => {
                setVolume(value[0])
                setIsMuted(value[0] === 0)
              }}
              className="w-[120px]"
            />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <ListMusic className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Playlist</SheetTitle>
              </SheetHeader>
              <div className="mt-4">
                {/* Playlist items would go here */}
                <div className="text-muted-foreground text-sm">No items in playlist</div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  )
}

export default function Demo() {
  return (
    <div className="h-[150vh] bg-background">
      <MusicPlayer1
        song={{
          title: "Never Gonna Give You Up",
          artist: "Rick Astley",
          albumArt: "/placeholder.svg?height=400&width=400",
          duration: 213,
        }}
      />
    </div>
  )
}

