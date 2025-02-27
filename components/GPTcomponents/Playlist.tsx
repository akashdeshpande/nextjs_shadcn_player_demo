import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ListMusic } from "lucide-react";

interface PlaylistProps {
    side?: "right" | "top" | "bottom" | "left";
}

export default function Playlist ({side = "right"}: PlaylistProps) {
    return (
        <div>
            <Sheet>
                <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                    <ListMusic className="h-5 w-5" />
                </Button>
                </SheetTrigger>
                <SheetContent side={side}>
                <SheetHeader>
                    <SheetTitle>Playlist</SheetTitle>
                </SheetHeader>
                <div className="mt-4">
                    {/* Playlist items would go here */}
                    <div className="text-muted-foreground text-sm">
                    No items in playlist
                    </div>
                </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}