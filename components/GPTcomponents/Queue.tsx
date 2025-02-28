"use client";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet";
type QueueOpenSide = "right" | "top" | "bottom" | "left";

interface QueueProps {
    side?: QueueOpenSide;
    open?: boolean; // Controlled open state
    onClose?: () => void;
}

export default function Queue ({
    side = "right",
    open = false,
    onClose,
}: QueueProps) {
    return (
        <div>
            <Sheet open={open} onOpenChange={(isOpen) => !isOpen && onClose?.()}>
                <SheetTrigger asChild>
                {/* <Button variant="ghost" size="icon">
                    <ListMusic className="h-5 w-5" />
                </Button> */}
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