import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ListMusic } from "lucide-react";

interface QueueProps {
    side?: "right" | "top" | "bottom" | "left";
}

export default function Queue ({side = "right"}: QueueProps) {
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
                    <SheetTitle>Queue</SheetTitle>
                </SheetHeader>
                <div className="mt-4">
                    {/* Queue items would go here */}
                    <div className="text-muted-foreground text-sm">
                    No items in Queue
                    </div>
                </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}