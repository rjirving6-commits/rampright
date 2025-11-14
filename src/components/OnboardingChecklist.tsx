"use client"

import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Task } from "@/lib/mock-data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface OnboardingChecklistProps {
  tasks: Task[];
  tasksByWeek: Record<number, Task[]>;
}

export default function OnboardingChecklist({ tasks: initialTasks }: OnboardingChecklistProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercentage = Math.round((completedCount / tasks.length) * 100);

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Update tasksByWeek to reflect local state changes
  const updatedTasksByWeek: Record<number, Task[]> = {};
  tasks.forEach((task) => {
    if (!updatedTasksByWeek[task.week]) {
      updatedTasksByWeek[task.week] = [];
    }
    updatedTasksByWeek[task.week].push(task);
  });

  return (
    <Card className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
          <h3 className="text-xl sm:text-2xl font-bold text-foreground">Your Onboarding Journey</h3>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="text-success" size={20} />
            <span className="text-xs sm:text-sm font-medium text-muted-foreground">
              {completedCount} of {tasks.length} completed
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-semibold text-foreground">{progressPercentage}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-warm transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      <Accordion type="multiple" defaultValue={["week-2"]} className="space-y-3">
        {Object.keys(updatedTasksByWeek).sort((a, b) => parseInt(a) - parseInt(b)).map((weekStr) => {
          const week = parseInt(weekStr);
          const weekTasks = updatedTasksByWeek[week];
          const completedInWeek = weekTasks.filter(t => t.completed).length;
          const totalInWeek = weekTasks.length;

          return (
            <AccordionItem key={week} value={`week-${week}`} className="border rounded-lg">
              <AccordionTrigger className="px-3 sm:px-4 py-3 hover:no-underline">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full pr-4 gap-2 sm:gap-0">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                    <Badge variant="outline" className="text-xs">Week {week}</Badge>
                    <span className="text-sm sm:text-base font-semibold text-foreground">
                      {week === 1 && "Foundation & Culture"}
                      {week === 2 && "Product Deep Dive"}
                      {week === 3 && "Customer & Market Knowledge"}
                      {week === 4 && "Independence & First Wins"}
                    </span>
                  </div>
                  <span className="text-xs sm:text-sm text-muted-foreground">
                    {completedInWeek}/{totalInWeek} tasks
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-3 sm:px-4 pb-4">
                <div className="space-y-3 pt-2">
                  {weekTasks.map((task) => (
                    <div
                      key={task.id}
                      className={`p-3 sm:p-4 border rounded-lg transition-all hover:shadow-soft ${
                        task.completed ? 'bg-accent/30 border-success/20' : 'bg-card border-border'
                      }`}
                    >
                      <div className="flex items-start gap-2 sm:gap-3">
                        <Checkbox
                          checked={task.completed}
                          onCheckedChange={() => toggleTask(task.id)}
                          className="mt-1 flex-shrink-0"
                        />
                        <div className="flex-1 space-y-2 min-w-0">
                          <div className="flex flex-col sm:flex-row items-start sm:items-start justify-between gap-2 sm:gap-4">
                            <div className="flex-1 min-w-0">
                              <h4 className={`text-sm sm:text-base font-semibold break-words ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                                {task.title}
                              </h4>
                              <p className="text-xs sm:text-sm text-muted-foreground mt-1 break-words">{task.description}</p>
                            </div>
                            <Badge variant="outline" className="text-xs whitespace-nowrap flex-shrink-0">
                              {task.category}
                            </Badge>
                          </div>
                          {task.day && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock size={14} />
                              <span>Day {task.day}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </Card>
  );
}
