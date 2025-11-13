"use client"

import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle2 } from "lucide-react";
import { useState } from "react";

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate: string;
  category: string;
}

const initialTasks: ChecklistItem[] = [
  {
    id: "1",
    title: "Complete company values training",
    description: "Watch 3 short videos about our mission and culture",
    completed: true,
    dueDate: "Day 1",
    category: "Culture",
  },
  {
    id: "2",
    title: "Meet your onboarding buddy",
    description: "30-min intro call scheduled",
    completed: true,
    dueDate: "Day 1",
    category: "People",
  },
  {
    id: "3",
    title: "Set up development environment",
    description: "Install tools and access company repos",
    completed: false,
    dueDate: "Week 1",
    category: "Technical",
  },
  {
    id: "4",
    title: "Review team goals and OKRs",
    description: "Understand Q4 priorities with your manager",
    completed: false,
    dueDate: "Week 1",
    category: "Strategy",
  },
  {
    id: "5",
    title: "Complete first project milestone",
    description: "Ship your first feature or complete initial assignment",
    completed: false,
    dueDate: "Week 2",
    category: "Delivery",
  },
];

export default function OnboardingChecklist() {
  const [tasks, setTasks] = useState<ChecklistItem[]>(initialTasks);

  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercentage = Math.round((completedCount / tasks.length) * 100);

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-foreground">Your Onboarding Journey</h3>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="text-success" size={20} />
            <span className="text-sm font-medium text-muted-foreground">
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

      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`p-4 border rounded-lg transition-all hover:shadow-soft ${
              task.completed ? 'bg-accent/30 border-success/20' : 'bg-card border-border'
            }`}
          >
            <div className="flex items-start gap-3">
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => toggleTask(task.id)}
                className="mt-1"
              />
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className={`font-semibold ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                      {task.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                  </div>
                  <Badge variant="outline" className="whitespace-nowrap">
                    {task.category}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock size={14} />
                  <span>{task.dueDate}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
