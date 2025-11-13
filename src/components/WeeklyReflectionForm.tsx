"use client"

import { useState } from "react";
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
import { submitWeeklyReflection } from "@/lib/mock-api";

interface WeeklyReflectionFormProps {
  planId: string;
  week: number;
}

export default function WeeklyReflectionForm({ planId, week }: WeeklyReflectionFormProps) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    unclear: "",
    takingLonger: "",
    mostHelpful: "",
    confidenceScore: 5,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Submit the reflection (console.log for demo)
    submitWeeklyReflection({
      planId,
      week,
      ...formData,
    });

    // Show success message
    setSubmitted(true);

    // Reset form after 2 seconds and close dialog
    setTimeout(() => {
      setSubmitted(false);
      setOpen(false);
      setFormData({
        unclear: "",
        takingLonger: "",
        mostHelpful: "",
        confidenceScore: 5,
      });
    }, 2000);
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
              <Label htmlFor="unclear">What&apos;s still unclear to you?</Label>
              <Textarea
                id="unclear"
                placeholder="Share any topics or concepts you'd like more clarity on..."
                value={formData.unclear}
                onChange={(e) => handleChange("unclear", e.target.value)}
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="takingLonger">
                What&apos;s taking longer than expected?
              </Label>
              <Textarea
                id="takingLonger"
                placeholder="Tell us about any tasks or challenges that are taking more time..."
                value={formData.takingLonger}
                onChange={(e) => handleChange("takingLonger", e.target.value)}
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mostHelpful">What was most helpful this week?</Label>
              <Textarea
                id="mostHelpful"
                placeholder="Share what resources, people, or activities were most valuable..."
                value={formData.mostHelpful}
                onChange={(e) => handleChange("mostHelpful", e.target.value)}
                rows={3}
                required
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="confidenceScore">
                  How confident do you feel in your role?
                </Label>
                <span className="text-2xl font-bold text-primary">
                  {formData.confidenceScore}
                </span>
              </div>
              <Slider
                id="confidenceScore"
                min={1}
                max={10}
                step={1}
                value={[formData.confidenceScore]}
                onValueChange={(value) => handleChange("confidenceScore", value[0])}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Not confident (1)</span>
                <span>Very confident (10)</span>
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
                className="text-base font-semibold shadow-lg hover:shadow-xl bg-primary text-white hover:bg-primary/90 border-0"
                style={{ backgroundColor: 'hsl(12, 88%, 65%)', color: 'white' }}
              >
                Submit Reflection
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
