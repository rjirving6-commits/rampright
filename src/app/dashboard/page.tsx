import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import MetricsCard from "@/components/MetricsCard";
import OnboardingChecklist from "@/components/OnboardingChecklist";
import TeamDirectory from "@/components/TeamDirectory";
import WeeklyReflectionForm from "@/components/WeeklyReflectionForm";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Clock, Users, CheckCircle2, Building2, Package, TrendingUpIcon, Wrench, Heart, ArrowRight } from "lucide-react";
import Link from "next/link";
import {
  getOnboardingPlan,
  getTasks,
  getTasksByWeek,
  calculateProgress,
  getImportantPeople,
  getReflections,
  getAllModuleContent,
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
  const modules = getAllModuleContent();

  // Calculate metrics
  const currentWeek = onboardingPlan?.currentWeek || 1;
  const latestReflection = reflections.length > 0 ? reflections[reflections.length - 1] : null;

  // Module metadata
  const moduleMetadata = {
    company_overview: {
      icon: Building2,
      description: "Learn about our history, mission, values, and culture",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10 hover:bg-blue-500/20",
    },
    product_overview: {
      icon: Package,
      description: "Understand our products, features, and value proposition",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10 hover:bg-purple-500/20",
    },
    competitive_landscape: {
      icon: TrendingUpIcon,
      description: "Market positioning and competitive differentiation",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10 hover:bg-orange-500/20",
    },
    tools_systems: {
      icon: Wrench,
      description: "Master the tools and systems you'll use daily",
      color: "text-green-500",
      bgColor: "bg-green-500/10 hover:bg-green-500/20",
    },
    team_culture: {
      icon: Heart,
      description: "Our team culture and ways of working",
      color: "text-pink-500",
      bgColor: "bg-pink-500/10 hover:bg-pink-500/20",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="space-y-6 sm:space-y-8">
          {/* Header Section */}
          <header className="space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground break-words">
                  Welcome back, {user.name}! 👋
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground mt-1">
                  You&apos;re crushing week {currentWeek}!
                </p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <Badge variant="outline" className="text-xs sm:text-sm">New Hire View</Badge>
              </div>
            </div>
          </header>

          {/* Metrics Section */}
          <section className="space-y-3 sm:space-y-4">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Your Progress</h2>
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
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

          {/* Learning Modules Section */}
          <section className="space-y-3 sm:space-y-4">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-foreground">Learning Modules</h2>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Essential knowledge to help you succeed in your role
              </p>
            </div>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {modules.map((module) => {
                const metadata = moduleMetadata[module.type as keyof typeof moduleMetadata];
                const Icon = metadata.icon;

                return (
                  <Link key={module.id} href={`/onboarding/modules/${module.type}`}>
                    <Card className={`h-full transition-all cursor-pointer border-border hover:shadow-lg ${metadata.bgColor}`}>
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className={`p-2 rounded-lg bg-background/50 ${metadata.color}`}>
                            <Icon className="h-6 w-6" />
                          </div>
                        </div>
                        <CardTitle className="text-lg mt-3">{module.title}</CardTitle>
                        <CardDescription className="text-sm">
                          {metadata.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <Button variant="ghost" size="sm" className="w-full gap-2 group">
                          View Module
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Main Content Grid */}
          <div className="grid gap-6 sm:gap-8 grid-cols-1 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <OnboardingChecklist tasks={tasks} tasksByWeek={tasksByWeek} />
            </div>
            <div className="lg:col-span-1">
              <TeamDirectory people={importantPeople} />
            </div>
          </div>

          {/* 60-Day Timeline Section */}
          <section className="space-y-3 sm:space-y-4">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Your 4-Week Roadmap</h2>
            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
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
          <section className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-foreground">
                  Weekly Reflection
                </h2>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  Share your experience and get personalized support
                </p>
              </div>
            </div>
            <div className="w-full max-w-md p-4 sm:p-6 bg-card rounded-lg border border-border shadow-soft">
              <WeeklyReflectionForm planId="plan-1" week={currentWeek} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
