"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export function DemoResetButton() {
  const [open, setOpen] = useState(false);

  const handleReset = () => {
    // Clear all localStorage
    localStorage.clear();

    // Close dialog
    setOpen(false);

    // Reload the page to reset state
    window.location.href = "/";
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset Demo
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reset Demo Data?</DialogTitle>
          <DialogDescription>
            This will clear all demo data and reset the application to its
            initial state. You&apos;ll be redirected to the homepage.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleReset}>Reset Demo</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
