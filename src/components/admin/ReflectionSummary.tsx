"use client";

import { WeeklyReflection } from "@/lib/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, AlertCircle, Lightbulb } from "lucide-react";
import { useState } from "react";

interface ReflectionSummaryProps {
  reflections: WeeklyReflection[];
  totalWeeks?: number;
}

export function ReflectionSummary({ reflections, totalWeeks = 4 }: ReflectionSummaryProps) {
  const [openWeeks, setOpenWeeks] = useState<number[]>([]);

  const toggleWeek = (week: number) => {
    setOpenWeeks((prev) =>
      prev.includes(week) ? prev.filter((w) => w !== week) : [...prev, week]
    );
  };

  const getConfidenceColor = (score: number) => {
    if (score >= 8) return "text-green-600 dark:text-green-400";
    if (score >= 6) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const getConfidenceBadge = (score: number) => {
    if (score >= 8) return "default";
    if (score >= 6) return "secondary";
    return "destructive";
  };

  // Create array of all weeks
  const allWeeks = Array.from({ length: totalWeeks }, (_, i) => i + 1);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Weekly Reflections</h3>
        <p className="text-sm text-muted-foreground">
          {reflections.length} of {totalWeeks} submitted
        </p>
      </div>

      <div className="space-y-3">
        {allWeeks.map((week) => {
          const reflection = reflections.find((r) => r.weekNumber === week);
          const isOpen = openWeeks.includes(week);

          if (!reflection) {
            return (
              <Card key={week} className="border-dashed">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-medium">
                      Week {week}
                    </CardTitle>
                    <Badge variant="outline" className="text-muted-foreground">
                      Not Submitted
                    </Badge>
                  </div>
                </CardHeader>
              </Card>
            );
          }

          return (
            <Collapsible key={week} open={isOpen} onOpenChange={() => toggleWeek(week)}>
              <Card>
                <CollapsibleTrigger className="w-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CardTitle className="text-base font-medium">
                          Week {reflection.weekNumber}
                        </CardTitle>
                        <Badge variant={getConfidenceBadge(reflection.confidenceLevel || 0)}>
                          Confidence: {reflection.confidenceLevel || 0}/10
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          {new Date(reflection.submittedAt).toLocaleDateString()}
                        </span>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <CardContent className="space-y-4 pt-0">
                    {/* Confidence Score Visualization */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">Confidence Level</span>
                        <span className={`font-semibold ${getConfidenceColor(reflection.confidenceLevel || 0)}`}>
                          {reflection.confidenceLevel || 0}/10
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div
                          className={`h-full rounded-full transition-all ${
                            (reflection.confidenceLevel || 0) >= 8
                              ? "bg-green-500"
                              : (reflection.confidenceLevel || 0) >= 6
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                          style={{ width: `${(reflection.confidenceLevel || 0) * 10}%` }}
                        />
                      </div>
                    </div>

                    {/* What's Unclear */}
                    {reflection.clarificationNeeded && (
                      <div className="space-y-2 rounded-lg border border-orange-200 bg-orange-50 p-3 dark:border-orange-900 dark:bg-orange-950/30">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                          <h4 className="text-sm font-semibold text-orange-900 dark:text-orange-100">
                            What&apos;s Unclear
                          </h4>
                        </div>
                        <p className="text-sm text-orange-800 dark:text-orange-200">
                          {reflection.clarificationNeeded}
                        </p>
                      </div>
                    )}

                    {/* Challenges */}
                    {reflection.challenges && (
                      <div className="space-y-2 rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-900 dark:bg-amber-950/30">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                          <h4 className="text-sm font-semibold text-amber-900 dark:text-amber-100">
                            Challenges
                          </h4>
                        </div>
                        <p className="text-sm text-amber-800 dark:text-amber-200">
                          {reflection.challenges}
                        </p>
                      </div>
                    )}

                    {/* Goals Progress */}
                    {reflection.goalsProgress && (
                      <div className="space-y-2 rounded-lg border border-green-200 bg-green-50 p-3 dark:border-green-900 dark:bg-green-950/30">
                        <div className="flex items-center gap-2">
                          <Lightbulb className="h-4 w-4 text-green-600 dark:text-green-400" />
                          <h4 className="text-sm font-semibold text-green-900 dark:text-green-100">
                            Goals Progress
                          </h4>
                        </div>
                        <p className="text-sm text-green-800 dark:text-green-200">
                          {reflection.goalsProgress}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          );
        })}
      </div>

      {/* Summary Stats */}
      {reflections.length > 0 && (
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Average Confidence:</span>
              <span className="font-semibold">
                {(
                  reflections.reduce((sum, r) => sum + (r.confidenceLevel || 0), 0) /
                  reflections.length
                ).toFixed(1)}
                /10
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Completion Rate:</span>
              <span className="font-semibold">
                {Math.round((reflections.length / totalWeeks) * 100)}%
              </span>
            </div>
            {reflections.some((r) => (r.confidenceLevel || 0) < 6) && (
              <div className="flex items-start gap-2 rounded-md bg-amber-100 p-2 dark:bg-amber-950">
                <AlertCircle className="mt-0.5 h-4 w-4 text-amber-600 dark:text-amber-400" />
                <p className="text-xs text-amber-900 dark:text-amber-100">
                  Low confidence scores detected. Consider scheduling a check-in.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
