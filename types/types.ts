export interface Song {
    id: string
    title: string
    artist: string
    albumArt: string
    duration: number
}

export interface PlaylistItem extends Song {
    addedAt: string
}
  
  