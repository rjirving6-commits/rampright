"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, CheckCircle2, Circle, Clock, Zap, Bug, Sparkles } from "lucide-react";

// Note: Metadata export not supported in client components
// SEO metadata is handled in layout.tsx or via dynamic meta tags

interface ChangelogEntry {
  version: string;
  date: string;
  changes: {
    type: "feature" | "improvement" | "fix";
    description: string;
  }[];
}

interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  status: "planned" | "in-progress" | "upcoming";
  category: string;
  estimatedQuarter?: string;
}

const changelogEntries: ChangelogEntry[] = [
  {
    version: "2.4.0",
    date: "2025-01-10",
    changes: [
      {
        type: "feature",
        description: "Added bulk import for onboarding tasks via CSV",
      },
      {
        type: "feature",
        description: "New analytics dashboard for manager insights",
      },
      {
        type: "improvement",
        description: "Enhanced mobile responsiveness across all pages",
      },
      {
        type: "fix",
        description: "Resolved timezone issues in weekly reflection reminders",
      },
    ],
  },
  {
    version: "2.3.0",
    date: "2024-12-15",
    changes: [
      {
        type: "feature",
        description: "Integration with Slack for real-time notifications",
      },
      {
        type: "feature",
        description: "Custom module content editor with rich text support",
      },
      {
        type: "improvement",
        description: "Improved search functionality in team directory",
      },
      {
        type: "fix",
        description: "Fixed pagination issues in onboarding plans list",
      },
    ],
  },
  {
    version: "2.2.0",
    date: "2024-11-28",
    changes: [
      {
        type: "feature",
        description: "Weekly reflection sentiment analysis",
      },
      {
        type: "improvement",
        description: "Faster page load times with optimized queries",
      },
      {
        type: "improvement",
        description: "Enhanced accessibility with ARIA labels",
      },
      {
        type: "fix",
        description: "Corrected task completion percentage calculations",
      },
    ],
  },
  {
    version: "2.1.0",
    date: "2024-11-05",
    changes: [
      {
        type: "feature",
        description: "Automated task reminders via email",
      },
      {
        type: "feature",
        description: "Export onboarding plans to PDF",
      },
      {
        type: "improvement",
        description: "Updated UI components for better consistency",
      },
      {
        type: "fix",
        description: "Fixed date picker issues in Safari browser",
      },
    ],
  },
  {
    version: "2.0.0",
    date: "2024-10-20",
    changes: [
      {
        type: "feature",
        description: "Major redesign with Next.js 15 and React 19",
      },
      {
        type: "feature",
        description: "New onboarding template system",
      },
      {
        type: "feature",
        description: "Role-based access control (RBAC)",
      },
      {
        type: "improvement",
        description: "Performance improvements across the platform",
      },
      {
        type: "fix",
        description: "Security patches and dependency updates",
      },
    ],
  },
  {
    version: "1.9.0",
    date: "2024-09-30",
    changes: [
      {
        type: "feature",
        description: "Microsoft Teams integration",
      },
      {
        type: "improvement",
        description: "Improved email notification templates",
      },
      {
        type: "fix",
        description: "Fixed user profile image upload issues",
      },
    ],
  },
  {
    version: "1.8.0",
    date: "2024-09-10",
    changes: [
      {
        type: "feature",
        description: "Dark mode support",
      },
      {
        type: "feature",
        description: "Customizable company branding",
      },
      {
        type: "improvement",
        description: "Enhanced task filtering and sorting",
      },
      {
        type: "fix",
        description: "Resolved issues with Google OAuth login",
      },
    ],
  },
  {
    version: "1.7.0",
    date: "2024-08-25",
    changes: [
      {
        type: "feature",
        description: "Weekly reflection submission system",
      },
      {
        type: "improvement",
        description: "Optimized database queries for better performance",
      },
      {
        type: "fix",
        description: "Fixed task assignment notification bugs",
      },
    ],
  },
];

const roadmapItems: RoadmapItem[] = [
  {
    id: "1",
    title: "AI-Powered Onboarding Assistant",
    description:
      "Intelligent chatbot to answer new hire questions and provide personalized guidance throughout the onboarding journey.",
    status: "in-progress",
    category: "AI & Automation",
    estimatedQuarter: "Q2 2025",
  },
  {
    id: "2",
    title: "Advanced Analytics & Reporting",
    description:
      "Comprehensive analytics suite with customizable dashboards, cohort analysis, and predictive insights for onboarding effectiveness.",
    status: "in-progress",
    category: "Analytics",
    estimatedQuarter: "Q1 2025",
  },
  {
    id: "3",
    title: "Mobile Native Apps",
    description:
      "Dedicated iOS and Android applications for on-the-go access to onboarding tasks, reflections, and team connections.",
    status: "planned",
    category: "Mobile",
    estimatedQuarter: "Q3 2025",
  },
  {
    id: "4",
    title: "Video Onboarding Modules",
    description:
      "Built-in video hosting and playback for training videos, welcome messages, and interactive learning content.",
    status: "planned",
    category: "Content",
    estimatedQuarter: "Q2 2025",
  },
  {
    id: "5",
    title: "Integration Marketplace",
    description:
      "Expanded ecosystem of integrations with HRIS systems, learning platforms, and productivity tools like Notion and Asana.",
    status: "upcoming",
    category: "Integrations",
    estimatedQuarter: "Q4 2025",
  },
  {
    id: "6",
    title: "Multi-Language Support",
    description:
      "Full internationalization with support for 10+ languages to serve global teams and distributed workforces.",
    status: "upcoming",
    category: "Accessibility",
    estimatedQuarter: "Q3 2025",
  },
  {
    id: "7",
    title: "Automated Workflow Builder",
    description:
      "No-code workflow automation tool to create custom onboarding sequences, triggers, and conditional logic.",
    status: "planned",
    category: "Automation",
    estimatedQuarter: "Q2 2025",
  },
  {
    id: "8",
    title: "Peer Mentorship Matching",
    description:
      "AI-powered matching algorithm to connect new hires with experienced team members based on skills, interests, and goals.",
    status: "upcoming",
    category: "Engagement",
    estimatedQuarter: "Q4 2025",
  },
  {
    id: "9",
    title: "Compliance & Certification Tracking",
    description:
      "Automated tracking of required certifications, training completions, and regulatory compliance requirements.",
    status: "in-progress",
    category: "Compliance",
    estimatedQuarter: "Q1 2025",
  },
  {
    id: "10",
    title: "Virtual Office Tours",
    description:
      "Interactive 360-degree virtual tours of office spaces, facilities, and key locations for remote employees.",
    status: "planned",
    category: "Remote Work",
    estimatedQuarter: "Q3 2025",
  },
];

const changeTypeConfig = {
  feature: {
    icon: Sparkles,
    label: "New Feature",
    className: "text-green-600 dark:text-green-400",
  },
  improvement: {
    icon: Zap,
    label: "Improvement",
    className: "text-blue-600 dark:text-blue-400",
  },
  fix: {
    icon: Bug,
    label: "Bug Fix",
    className: "text-orange-600 dark:text-orange-400",
  },
};

const statusConfig = {
  "in-progress": {
    icon: Clock,
    label: "In Progress",
    badgeVariant: "default" as const,
    className: "text-blue-600 dark:text-blue-400",
  },
  planned: {
    icon: Circle,
    label: "Planned",
    badgeVariant: "secondary" as const,
    className: "text-purple-600 dark:text-purple-400",
  },
  upcoming: {
    icon: CheckCircle2,
    label: "Upcoming",
    badgeVariant: "outline" as const,
    className: "text-gray-600 dark:text-gray-400",
  },
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function DocumentsPage() {
  const [activeTab, setActiveTab] = useState("changelog");

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        {/* Page Header */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Product Updates
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay up to date with new features, improvements, and what&apos;s coming next.
          </p>
        </div>

        {/* Tabs Navigation */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="max-w-6xl mx-auto"
        >
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
            <TabsTrigger value="changelog">Changelog</TabsTrigger>
            <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
          </TabsList>

          {/* Changelog Tab */}
          <TabsContent value="changelog" className="space-y-6">
            <div className="space-y-8">
              {changelogEntries.map((entry) => (
                <Card key={entry.version}>
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <CardTitle className="text-2xl">
                        Version {entry.version}
                      </CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(entry.date)}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {entry.changes.map((change, index) => {
                        const config = changeTypeConfig[change.type];
                        const Icon = config.icon;
                        return (
                          <div
                            key={index}
                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                          >
                            <Icon className={`h-5 w-5 mt-0.5 shrink-0 ${config.className}`} />
                            <div className="flex-grow">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant="outline" className="text-xs">
                                  {config.label}
                                </Badge>
                              </div>
                              <p className="text-sm">{change.description}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Roadmap Tab */}
          <TabsContent value="roadmap" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {roadmapItems.map((item) => {
                const config = statusConfig[item.status];
                const StatusIcon = config.icon;
                return (
                  <Card key={item.id} className="flex flex-col">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <Badge variant={config.badgeVariant} className="shrink-0">
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {config.label}
                        </Badge>
                        {item.estimatedQuarter && (
                          <span className="text-xs text-muted-foreground">
                            {item.estimatedQuarter}
                          </span>
                        )}
                      </div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-sm text-muted-foreground mb-4">
                        {item.description}
                      </p>
                      <Badge variant="secondary" className="text-xs">
                        {item.category}
                      </Badge>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
