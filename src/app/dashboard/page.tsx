import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import MetricsCard from "@/components/MetricsCard";
import OnboardingChecklist from "@/components/OnboardingChecklist";
import TeamDirectory from "@/components/TeamDirectory";
import WeeklyReflectionForm from "@/components/WeeklyReflectionForm";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Clock, Users, CheckCircle2 } from "lucide-react";
import {
  getOnboardingPlan,
  getTasks,
  getTasksByWeek,
  calculateProgress,
  getImportantPeople,
  getReflections,
} from "@/lib/mock-api";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }

  const user = session.user;

  // Get mock data for demo (hardcoded user-2 for new hire)
  const onboardingPlan = getOnboardingPlan("user-2");
  const tasks = getTasks("plan-1");
  const tasksByWeek = getTasksByWeek("plan-1");
  const progress = calculateProgress(tasks);
  const importantPeople = getImportantPeople();
  const reflections = getReflections("plan-1");

  // Calculate metrics
  const daysActive = onboardingPlan
    ? Math.floor(
        (new Date().getTime() - new Date(onboardingPlan.startDate).getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : 0;
  const currentWeek = onboardingPlan?.currentWeek || 1;
  const latestReflection = reflections.length > 0 ? reflections[reflections.length - 1] : null;

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header Section */}
          <header className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  Welcome back, {user.name}! 👋
                </h1>
                <p className="text-muted-foreground mt-1">
                  You&apos;re crushing week {currentWeek}!
                </p>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline">New Hire View</Badge>
              </div>
            </div>
          </header>

          {/* Metrics Section */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Your Progress</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <MetricsCard
                title="Days Active"
                value="9"
                change={`Week ${currentWeek} of 4`}
                trend="neutral"
                icon={Clock}
              />
              <MetricsCard
                title="Tasks Completed"
                value={`${progress.completedTasks}/${progress.totalTasks}`}
                change={`${progress.percentage}% completion`}
                trend={progress.percentage >= 50 ? "up" : "neutral"}
                icon={CheckCircle2}
              />
              <MetricsCard
                title="Team Connections"
                value={importantPeople.length.toString()}
                change="Important contacts"
                trend="up"
                icon={Users}
              />
              <MetricsCard
                title="Confidence Score"
                value={latestReflection ? `${latestReflection.confidenceScore}/10` : "N/A"}
                change={latestReflection ? "Latest reflection" : "No reflections yet"}
                trend={latestReflection && latestReflection.confidenceScore >= 7 ? "up" : "neutral"}
                icon={TrendingUp}
              />
            </div>
          </section>

          {/* Main Content Grid */}
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <OnboardingChecklist tasks={tasks} tasksByWeek={tasksByWeek} />
            </div>
            <div>
              <TeamDirectory people={importantPeople} />
            </div>
          </div>

          {/* 90-Day Timeline Section */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Your 4-Week Roadmap</h2>
            <div className="grid gap-4 md:grid-cols-4">
              {[1, 2, 3, 4].map((week) => {
                const weekProgress = progress.byWeek[week] || { total: 0, completed: 0, percentage: 0 };
                const isCurrentWeek = week === currentWeek;
                const isPastWeek = week < currentWeek;
                const status = isPastWeek
                  ? "Completed"
                  : isCurrentWeek
                  ? "In Progress"
                  : "Upcoming";

                return (
                  <div
                    key={week}
                    className="p-6 bg-card rounded-lg border border-border hover:shadow-soft transition-all"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          Week {week}
                        </Badge>
                        <Badge
                          variant={
                            status === "Completed"
                              ? "default"
                              : status === "In Progress"
                              ? "secondary"
                              : "outline"
                          }
                          className="text-xs"
                        >
                          {status}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {week === 1 && "Foundation & Culture"}
                        {week === 2 && "Product Deep Dive"}
                        {week === 3 && "Customer & Market"}
                        {week === 4 && "Independence & First Wins"}
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium text-foreground">
                            {weekProgress.percentage}%
                          </span>
                        </div>
                        <Progress value={weekProgress.percentage} className="h-2" />
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {weekProgress.completed} of {weekProgress.total} tasks completed
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Weekly Reflection Section */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  Weekly Reflection
                </h2>
                <p className="text-muted-foreground text-sm">
                  Share your experience and get personalized support
                </p>
              </div>
            </div>
            <div className="max-w-md p-6 bg-card rounded-lg border border-border shadow-soft">
              <WeeklyReflectionForm planId="plan-1" week={currentWeek} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
