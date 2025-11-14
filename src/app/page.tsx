"use client";

import { useEffect } from "react";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import {
  TrendingUp,
  Clock,
  Users,
  Target,
  BarChart3,
  Sparkles,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

export default function Home() {
  // Clean up any demo-related localStorage keys on page load
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("demo-user-role");
      localStorage.removeItem("demo-task-completions");
      localStorage.removeItem("demo-reflections");
      localStorage.removeItem("demo-setup-data");
    }
  }, []);

  const features = [
    {
      icon: Target,
      title: "Create custom onboarding plans in minutes",
      description: "Build personalized onboarding journeys by role, department, and location with smart timelines and automated task assignment."
    },
    {
      icon: BarChart3,
      title: "Track progress across all new hires",
      description: "Real-time dashboards show completion rates, ramp time, and milestone progress across your entire team."
    },
    {
      icon: Sparkles,
      title: "Automated weekly check-ins and reflections",
      description: "Pulse surveys at key intervals with confidence tracking and sentiment analysis to catch issues early."
    },
    {
      icon: Users,
      title: "Centralized resources and key contacts",
      description: "Built-in buddy pairing, manager dashboards, and team directory so new hires always know who to ask."
    },
    {
      icon: TrendingUp,
      title: "Prove HR's strategic impact",
      description: "Analytics on ramp time, completion rates, retention trends, and manager effectiveness to show leadership your value."
    },
    {
      icon: Clock,
      title: "Culture integration made easy",
      description: "Mission, values, and company 101 content delivered in engaging micro-learning formats."
    }
  ];

  const metrics = [
    { value: "50%", label: "Faster time-to-productivity" },
    { value: "90%", label: "New hire satisfaction" },
    { value: "0", label: "Onboarding tasks forgotten" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Metrics Banner */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-3">
            {metrics.map((metric, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="text-4xl sm:text-5xl font-bold bg-gradient-warm bg-clip-text text-transparent">
                  {metric.value}
                </div>
                <div className="text-sm sm:text-base text-white">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3 sm:space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
              Everything you need to{" "}
              <span className="bg-gradient-warm bg-clip-text text-transparent">
                onboard right
              </span>
            </h2>
            <p className="text-base sm:text-xl text-muted-foreground">
              From day one to full productivity, guide every new hire with structured onboarding and data-driven insights.
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 space-y-4 hover:shadow-medium transition-all">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                  <feature.icon className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-16 sm:py-24 bg-gradient-subtle">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid gap-8 sm:gap-12 grid-cols-1 lg:grid-cols-2 items-center">
            <div className="space-y-4 sm:space-y-6 order-2 lg:order-1">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
                Analytics that make HR a{" "}
                <span className="bg-gradient-warm bg-clip-text text-transparent">
                  strategic hero
                </span>
              </h2>
              <p className="text-base sm:text-xl text-muted-foreground">
                Real-time dashboards track ramp time, completion rates, retention impact, and manager effectiveness. Finally, metrics that prove HR&apos;s value to leadership.
              </p>
              <div className="space-y-3">
                {[
                  "Track ramp time to first milestone",
                  "Monitor 60-day retention trends",
                  "Measure manager effectiveness",
                  "Analyze engagement scores"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="text-success flex-shrink-0" size={20} />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <Link href="/admin/setup">
                <Button variant="hero" size="lg" className="group w-full sm:w-auto">
                  Get Started
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
            <div className="relative order-1 lg:order-2">
              <div className="absolute inset-0 bg-primary/20 blur-3xl"></div>
              <Image
                src="/dashboard-preview.jpg"
                alt="Analytics dashboard preview"
                width={1200}
                height={800}
                className="relative rounded-2xl shadow-medium w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="container mx-auto px-4 sm:px-6 text-center space-y-6 sm:space-y-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Ready to transform your onboarding?
          </h2>
          <p className="text-base sm:text-xl text-white/80 max-w-2xl mx-auto">
            Join forward-thinking HR teams who are proving their strategic impact while helping new hires succeed from day one.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/admin/setup">
              <Button variant="hero" size="lg">
                Create Your First Plan
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="bg-transparent border-white/20 text-white hover:bg-white/10">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
