"use client"

import * as React from "react"
import type { Song, PlaylistItem } from "./../../types/types"

interface PlaylistContextType {
  playlist: PlaylistItem[]
  addToPlaylist: (song: Song) => void
  removeFromPlaylist: (songId: string) => void
  isInPlaylist: (songId: string) => boolean
}

const PlaylistContext = React.createContext<PlaylistContextType | undefined>(undefined)

export function PlaylistProvider({ children }: { children: React.ReactNode }) {
  const [playlist, setPlaylist] = React.useState<PlaylistItem[]>([])

  const addToPlaylist = React.useCallback((song: Song) => {
    setPlaylist((current) => {
      if (current.some((item) => item.id === song.id)) {
        return current
      }
      return [...current, { ...song, addedAt: new Date().toISOString() }]
    })
  }, [])

  const removeFromPlaylist = React.useCallback((songId: string) => {
    setPlaylist((current) => current.filter((item) => item.id !== songId))
  }, [])

  const isInPlaylist = React.useCallback((songId: string) => playlist.some((item) => item.id === songId), [playlist])

  return (
    <PlaylistContext.Provider
      value={{
        playlist,
        addToPlaylist,
        removeFromPlaylist,
        isInPlaylist,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  )
}

export function usePlaylist() {
  const context = React.useContext(PlaylistContext)
  if (context === undefined) {
    throw new Error("usePlaylist must be used within a PlaylistProvider")
  }
  return context
}

