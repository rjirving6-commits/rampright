import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllOnboardingPlans,
  getTasks,
  getUser,
  calculateProgress,
  getTasksByWeek,
  getReflections,
} from "@/lib/mock-api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Calendar, TrendingUp, CheckCircle2, Clock, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProgressTimeline } from "@/components/admin/ProgressTimeline";
import { ReflectionSummary } from "@/components/admin/ReflectionSummary";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PlanDetailPage({ params }: PageProps) {
  const { id } = await params;
  const plans = getAllOnboardingPlans();
  const plan = plans.find((p) => p.id === id);

  if (!plan) {
    notFound();
  }

  const user = getUser(plan.userId);
  const tasks = getTasks(plan.id);
  const tasksByWeek = getTasksByWeek(plan.id);
  const reflections = getReflections(plan.id);
  const progress = calculateProgress(tasks);

  if (!user) {
    notFound();
  }

  const startDate = new Date(plan.startDate);
  const daysSinceStart = Math.floor(
    (new Date().getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="container mx-auto max-w-7xl space-y-6 sm:space-y-8 py-6 sm:py-8 px-4 sm:px-6">
      {/* Breadcrumbs */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              <Home className="h-4 w-4" />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin/plans">Plans</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="truncate max-w-[150px] sm:max-w-none">{user.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Back Button */}
      <Link href="/admin/plans">
        <Button variant="ghost" className="gap-2 text-sm sm:text-base">
          <ArrowLeft className="h-4 w-4" />
          Back to Plans
        </Button>
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          <Avatar className="h-12 w-12 sm:h-16 sm:w-16 flex-shrink-0">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback className="text-sm sm:text-lg">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-2 min-w-0 flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight truncate">{user.name}</h1>
              <Badge
                variant={
                  plan.status === "completed"
                    ? "default"
                    : plan.status === "in_progress"
                    ? "secondary"
                    : "outline"
                }
                className={cn(
                  "text-xs sm:text-sm flex-shrink-0",
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
            <p className="text-sm sm:text-base text-muted-foreground truncate">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{progress.percentage}%</div>
            <p className="text-xs text-muted-foreground">
              {progress.completedTasks} of {progress.totalTasks} tasks
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Week</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Week {plan.currentWeek}</div>
            <p className="text-xs text-muted-foreground">of 4 weeks total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Days Elapsed</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{daysSinceStart}</div>
            <p className="text-xs text-muted-foreground">
              Started {startDate.toLocaleDateString()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reflections</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reflections.length}/4</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((reflections.length / 4) * 100)}% completion rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 sm:gap-8 grid-cols-1 lg:grid-cols-2">
        {/* Progress Timeline */}
        <div className="space-y-3 sm:space-y-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold">Progress Timeline</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Week-by-week task completion and status
            </p>
          </div>
          <ProgressTimeline
            tasksByWeek={tasksByWeek}
            reflections={reflections}
            currentWeek={plan.currentWeek}
            totalWeeks={4}
          />
        </div>

        {/* Reflections */}
        <div className="space-y-3 sm:space-y-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold">Weekly Reflections</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Feedback and insights from the new hire
            </p>
          </div>
          <ReflectionSummary reflections={reflections} totalWeeks={4} />
        </div>
      </div>

      <Separator />

      {/* Additional Info */}
      <Card>
        <CardHeader>
          <CardTitle>Plan Information</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Plan ID</p>
            <p className="font-mono text-sm">{plan.id}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Template</p>
            <p className="text-sm">Go-To-Market (GTM) Role</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Start Date</p>
            <p className="text-sm">{startDate.toLocaleDateString()}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Created</p>
            <p className="text-sm">{new Date(plan.createdAt).toLocaleDateString()}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
