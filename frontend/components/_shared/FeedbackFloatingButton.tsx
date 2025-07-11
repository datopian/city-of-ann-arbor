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
        <Button className="right-3 bottom-3 lg:flex fixed z-[1000] lg:right-auto lg:-left-[32px] lg:rounded-t-none lg:bottom-[50vh] text-base lg:-rotate-90 bg-[#5F99A5] hover:bg-opacity-90 p-5">
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
