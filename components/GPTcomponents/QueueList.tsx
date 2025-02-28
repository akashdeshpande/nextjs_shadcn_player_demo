import { Song } from "@/components/GPTcomponents/types/types";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Trash2 } from "lucide-react";
import { useState } from "react";

interface QueueListProps {
    songs: Song[];
    setSong: (song: Song | undefined) => void;
}


export default function QueueList ({songs, setSong}: QueueListProps) {

    const [currentSongId, setCurrentSongId] = useState(0);

    const onSelect = (id: Song['id']) => {
        setSong(songs.find((song) => song.id === id));
        console.log("");
    }

    const removeFromPlaylist = (id: Song['id']) => {
        console.log("Yet to implement / not supported atm");
    }

    return (
        <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
                {songs.map((song) => (
                <div
                    key={song.id}
                    className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                    data-active={currentSongId === song.id}
                >
                    <img src={song.albumArt || "/placeholder.svg"} alt="" className="h-12 w-12 rounded-md object-cover" />
                    <div className="flex-1 min-w-0 cursor-pointer" onClick={() => onSelect?.(song.id)}>
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
    );
}