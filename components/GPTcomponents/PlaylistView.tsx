import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { usePlaylist } from "../GPThooks/playlist-context"
import type { PlaylistItem } from "../../types/types"

interface PlaylistViewProps {
  onSelect?: (song: PlaylistItem) => void
  currentSongId?: string
}

export function PlaylistView({ onSelect, currentSongId }: PlaylistViewProps) {
  const { playlist, removeFromPlaylist } = usePlaylist()

  if (playlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[300px] text-muted-foreground">
        <p className="text-sm">No songs in playlist</p>
        <p className="text-xs mt-2">Add songs to get started</p>
      </div>
    )
  }

  return (
    <ScrollArea className="h-[400px] pr-4">
      <div className="space-y-4">
        {playlist.map((song) => (
          <div
            key={song.id}
            className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted/50 transition-colors"
            data-active={currentSongId === song.id}
          >
            <img src={song.albumArt || "/placeholder.svg"} alt="" className="h-12 w-12 rounded-md object-cover" />
            <div className="flex-1 min-w-0 cursor-pointer" onClick={() => onSelect?.(song)}>
              <div className="font-medium truncate">{song.title}</div>
              <div className="text-sm text-muted-foreground truncate">{song.artist}</div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => removeFromPlaylist(song.id)}>
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Remove from playlist</span>
            </Button>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}

