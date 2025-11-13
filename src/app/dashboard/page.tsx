import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import MetricsCard from "@/components/MetricsCard";
import OnboardingChecklist from "@/components/OnboardingChecklist";
import TeamDirectory from "@/components/TeamDirectory";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Clock, Users, CheckCircle2 } from "lucide-react";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }

  const user = session.user;

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
                <p className="text-muted-foreground mt-1">You&apos;re crushing week 2!</p>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline">Employee View</Badge>
                <Badge variant="secondary">Manager View</Badge>
              </div>
            </div>
          </header>

          {/* Metrics Section */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Your Progress</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <MetricsCard
                title="Days Active"
                value="12"
                change="+2 days this week"
                trend="neutral"
                icon={Clock}
              />
              <MetricsCard
                title="Tasks Completed"
                value="8/15"
                change="53% completion"
                trend="up"
                icon={CheckCircle2}
              />
              <MetricsCard
                title="Team Connections"
                value="12"
                change="+3 this week"
                trend="up"
                icon={Users}
              />
              <MetricsCard
                title="Confidence Score"
                value="7.5/10"
                change="+1.2 from last week"
                trend="up"
                icon={TrendingUp}
              />
            </div>
          </section>

          {/* Main Content Grid */}
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <OnboardingChecklist />
            </div>
            <div>
              <TeamDirectory />
            </div>
          </div>

          {/* 90-Day Timeline Section */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Your 90-Day Roadmap</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  phase: "Days 1-30",
                  title: "Foundation & Culture",
                  status: "Completed",
                  progress: 100,
                  milestones: [
                    "Complete onboarding orientation",
                    "Meet your team and manager",
                    "Set up workspace and tools",
                    "Learn company culture and values"
                  ]
                },
                {
                  phase: "Days 31-60",
                  title: "Skills & Integration",
                  status: "In Progress",
                  progress: 60,
                  milestones: [
                    "Complete role-specific training",
                    "Shadow team members",
                    "Take on first projects",
                    "Build cross-functional relationships"
                  ]
                },
                {
                  phase: "Days 61-90",
                  title: "Impact & Independence",
                  status: "Upcoming",
                  progress: 20,
                  milestones: [
                    "Lead your first project",
                    "Contribute to team goals",
                    "Identify improvement opportunities",
                    "Complete 90-day review"
                  ]
                },
              ].map((milestone, index) => (
                <div
                  key={index}
                  className="p-6 bg-card rounded-lg border border-border hover:shadow-soft transition-all"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {milestone.phase}
                      </Badge>
                      <Badge
                        variant={
                          milestone.status === "Completed"
                            ? "default"
                            : milestone.status === "In Progress"
                            ? "secondary"
                            : "outline"
                        }
                        className="text-xs"
                      >
                        {milestone.status}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {milestone.title}
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium text-foreground">
                          {milestone.progress}%
                        </span>
                      </div>
                      <Progress value={milestone.progress} className="h-2" />
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {milestone.milestones.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
