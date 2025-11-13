"use client";

import { Task, WeeklyReflection } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, FileText, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressTimelineProps {
  tasksByWeek: Record<number, Task[]>;
  reflections: WeeklyReflection[];
  currentWeek: number;
  totalWeeks?: number;
}

export function ProgressTimeline({
  tasksByWeek,
  reflections,
  currentWeek,
  totalWeeks = 4,
}: ProgressTimelineProps) {
  const weeks = Array.from({ length: totalWeeks }, (_, i) => i + 1);

  const getWeekProgress = (week: number) => {
    const tasks = tasksByWeek[week] || [];
    if (tasks.length === 0) return 0;
    const completed = tasks.filter((t) => t.completed).length;
    return Math.round((completed / tasks.length) * 100);
  };

  const hasReflection = (week: number) => {
    return reflections.some((r) => r.week === week);
  };

  const getWeekStatus = (week: number) => {
    if (week > currentWeek) return "upcoming";
    if (week === currentWeek) return "current";
    const progress = getWeekProgress(week);
    if (progress === 100) return "completed";
    return "in-progress";
  };

  return (
    <div className="space-y-6">
      {weeks.map((week, index) => {
        const status = getWeekStatus(week);
        const progress = getWeekProgress(week);
        const tasks = tasksByWeek[week] || [];
        const completedTasks = tasks.filter((t) => t.completed).length;
        const reflection = hasReflection(week);
        const isLast = index === weeks.length - 1;

        return (
          <div key={week} className="relative">
            {/* Timeline connector */}
            {!isLast && (
              <div className="absolute left-[15px] top-[40px] h-[calc(100%+8px)] w-0.5 bg-border" />
            )}

            <div className="flex gap-4">
              {/* Week indicator */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full border-2",
                    status === "completed" &&
                      "border-green-500 bg-green-500 text-white dark:border-green-600 dark:bg-green-600",
                    status === "current" &&
                      "border-blue-500 bg-blue-500 text-white dark:border-blue-600 dark:bg-blue-600",
                    status === "in-progress" &&
                      "border-yellow-500 bg-yellow-500 text-white dark:border-yellow-600 dark:bg-yellow-600",
                    status === "upcoming" &&
                      "border-muted-foreground/30 bg-background text-muted-foreground"
                  )}
                >
                  <span className="text-sm font-semibold">{week}</span>
                </div>
              </div>

              {/* Week content */}
              <div className="flex-1 pb-6">
                <div className="mb-2 flex items-center gap-2">
                  <h3 className="font-semibold">Week {week}</h3>
                  {status === "current" && (
                    <Badge variant="default" className="text-xs">
                      Current
                    </Badge>
                  )}
                  {status === "completed" && (
                    <Badge variant="outline" className="border-green-600 text-green-600 text-xs dark:border-green-500 dark:text-green-500">
                      Completed
                    </Badge>
                  )}
                  {status === "upcoming" && (
                    <Badge variant="outline" className="text-xs">
                      Upcoming
                    </Badge>
                  )}
                </div>

                <Card>
                  <CardContent className="p-4 space-y-3">
                    {/* Task progress */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Tasks</span>
                        <span className="font-medium">
                          {completedTasks}/{tasks.length} completed
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all",
                            progress === 100
                              ? "bg-green-500"
                              : progress > 0
                              ? "bg-blue-500"
                              : "bg-muted"
                          )}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{progress}% complete</span>
                      </div>
                    </div>

                    {/* Task list */}
                    {tasks.length > 0 && (
                      <div className="space-y-1.5 border-t pt-3">
                        {tasks.map((task) => (
                          <div
                            key={task.id}
                            className="flex items-start gap-2 text-sm"
                          >
                            {task.completed ? (
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600 dark:text-green-500" />
                            ) : (
                              <Circle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                            )}
                            <span
                              className={cn(
                                task.completed
                                  ? "text-muted-foreground line-through"
                                  : ""
                              )}
                            >
                              {task.title}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Reflection indicator */}
                    <div className="border-t pt-3">
                      <div className="flex items-center gap-2 text-sm">
                        {reflection ? (
                          <>
                            <FileText className="h-4 w-4 text-green-600 dark:text-green-500" />
                            <span className="text-green-600 dark:text-green-500">
                              Weekly reflection submitted
                            </span>
                          </>
                        ) : status !== "upcoming" ? (
                          <>
                            <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-500" />
                            <span className="text-amber-600 dark:text-amber-500">
                              No reflection submitted
                            </span>
                          </>
                        ) : (
                          <>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">
                              Reflection pending
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
