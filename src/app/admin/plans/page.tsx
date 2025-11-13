import Link from "next/link";
import { getAllOnboardingPlans, getTasks, getUser, calculateProgress } from "@/lib/mock-api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminPlansPage() {
  const plans = getAllOnboardingPlans();

  return (
    <div className="container mx-auto max-w-6xl space-y-8 py-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Users className="h-5 w-5" />
          <span className="text-sm font-medium">Manager View</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Onboarding Plans</h1>
        <p className="text-muted-foreground">
          Monitor progress and provide support for your new hires
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Plans
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{plans.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              In Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {plans.filter((p) => p.status === "in_progress").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {plans.filter((p) => p.status === "completed").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Plans List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">All Plans</h2>
        <div className="space-y-4">
          {plans.map((plan) => {
            const user = getUser(plan.userId);
            const tasks = getTasks(plan.id);
            const progress = calculateProgress(tasks);
            const startDate = new Date(plan.startDate);
            const daysSinceStart = Math.floor(
              (new Date().getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
            );

            if (!user) return null;

            return (
              <Card key={plan.id} className="transition-shadow hover:shadow-md">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    {/* User Info */}
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={user.avatarUrl} alt={user.name} />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{user.name}</h3>
                          <Badge
                            variant={
                              plan.status === "completed"
                                ? "default"
                                : plan.status === "in_progress"
                                ? "secondary"
                                : "outline"
                            }
                            className={cn(
                              plan.status === "completed" &&
                                "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200"
                            )}
                          >
                            {plan.status === "in_progress"
                              ? "In Progress"
                              : plan.status === "completed"
                              ? "Completed"
                              : "Paused"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>

                    {/* Progress Info */}
                    <div className="flex flex-col gap-3 md:min-w-[300px]">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Overall Progress</span>
                        <span className="font-medium">
                          {progress.completedTasks}/{progress.totalTasks} tasks
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all",
                            progress.percentage === 100
                              ? "bg-green-500"
                              : progress.percentage > 0
                              ? "bg-blue-500"
                              : "bg-muted"
                          )}
                          style={{ width: `${progress.percentage}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>
                          Week {plan.currentWeek} of 4 • {daysSinceStart} days
                        </span>
                        <span className="font-medium">{progress.percentage}%</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <Link href={`/admin/plans/${plan.id}`}>
                      <Button variant="outline" className="gap-2">
                        View Details
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
