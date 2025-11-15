"use client"

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { MessageSquare, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface WeeklyReflectionFormProps {
  planId: string;
  week: number;
}

export default function WeeklyReflectionForm({ planId, week }: WeeklyReflectionFormProps) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [, startTransition] = useTransition();
  const router = useRouter();
  const [formData, setFormData] = useState({
    clarificationNeeded: "",
    challenges: "",
    goalsProgress: "",
    confidenceLevel: 3,
    additionalComments: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/reflections/${planId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          weekNumber: week,
          ...formData,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit reflection");
      }

      setSubmitted(true);

      setTimeout(() => {
        setSubmitted(false);
        setOpen(false);
        setFormData({
          clarificationNeeded: "",
          challenges: "",
          goalsProgress: "",
          confidenceLevel: 3,
          additionalComments: "",
        });
        setIsSubmitting(false);

        startTransition(() => {
          router.refresh();
        });
      }, 2000);
    } catch {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="default" 
          size="lg" 
          className="w-full text-base font-semibold shadow-lg hover:shadow-xl bg-primary text-white hover:bg-primary/90 border-0"
          style={{ backgroundColor: 'hsl(12, 88%, 65%)', color: 'white' }}
        >
          <MessageSquare className="mr-2 h-5 w-5" />
          Submit Week {week} Reflection
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Week {week} Reflection</DialogTitle>
          <DialogDescription>
            Share your experience and help us support you better. Your feedback is valuable!
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <CheckCircle2 className="h-16 w-16 text-success" />
            <h3 className="text-xl font-semibold text-foreground">
              Reflection Submitted!
            </h3>
            <p className="text-sm text-muted-foreground text-center">
              Thank you for sharing your feedback. Your manager will review it soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="clarificationNeeded">What&apos;s still unclear to you?</Label>
              <Textarea
                id="clarificationNeeded"
                placeholder="Share any topics or concepts you'd like more clarity on..."
                value={formData.clarificationNeeded}
                onChange={(e) => handleChange("clarificationNeeded", e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="challenges">
                What challenges did you face this week?
              </Label>
              <Textarea
                id="challenges"
                placeholder="Tell us about any challenges or obstacles you encountered..."
                value={formData.challenges}
                onChange={(e) => handleChange("challenges", e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="goalsProgress">What progress did you make this week?</Label>
              <Textarea
                id="goalsProgress"
                placeholder="Share your achievements and what you learned..."
                value={formData.goalsProgress}
                onChange={(e) => handleChange("goalsProgress", e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalComments">Additional comments (optional)</Label>
              <Textarea
                id="additionalComments"
                placeholder="Any other thoughts or feedback..."
                value={formData.additionalComments}
                onChange={(e) => handleChange("additionalComments", e.target.value)}
                rows={2}
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="confidenceLevel">
                  How confident do you feel in your role?
                </Label>
                <span className="text-2xl font-bold text-primary">
                  {formData.confidenceLevel}/5
                </span>
              </div>
              <Slider
                id="confidenceLevel"
                min={1}
                max={5}
                step={1}
                value={[formData.confidenceLevel]}
                onValueChange={(value) => handleChange("confidenceLevel", value[0])}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Not confident (1)</span>
                <span>Very confident (5)</span>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="text-base font-semibold shadow-lg hover:shadow-xl bg-primary text-white hover:bg-primary/90 border-0"
                style={{ backgroundColor: 'hsl(12, 88%, 65%)', color: 'white' }}
              >
                {isSubmitting ? "Submitting..." : "Submit Reflection"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
