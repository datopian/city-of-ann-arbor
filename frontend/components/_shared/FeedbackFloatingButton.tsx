import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";

export function FeedbackFloatingButton() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="fixed z-[1000] right-3 bottom-3 bg-ann-arbor-accent-green hover:bg-opacity-90"
          size="sm"
        >
          Feedback
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <div className="h-[80vh]">
        <iframe
          src="https://www.cognitoforms.com/CityOfAnnArbor1/CityOfAnnArborOpenDataPortalFeedback"
          style={{ width: "100%", height: "100%", border: "none" }}
          allowFullScreen
        ></iframe>
        </div>
      </DialogContent>
    </Dialog>
  );
}
