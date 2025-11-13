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
  const features = [
    {
      icon: Target,
      title: "Personalized Journeys",
      description: "Auto-generated onboarding checklists by role, department, and location with smart timelines."
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Built-in buddy pairing, manager dashboards, and automated feedback check-ins."
    },
    {
      icon: Clock,
      title: "Progress Tracking",
      description: "Real-time ramp tracking with skill checklists and milestone visibility for employees and managers."
    },
    {
      icon: BarChart3,
      title: "Impact Analytics",
      description: "Prove HR's value with metrics on ramp time, completion rates, and retention trends."
    },
    {
      icon: Sparkles,
      title: "Culture Integration",
      description: "Mission, values, and company 101 content in engaging micro-learning formats."
    },
    {
      icon: TrendingUp,
      title: "Continuous Feedback",
      description: "Pulse surveys at key intervals with confidence tracking and sentiment analysis."
    }
  ];

  const metrics = [
    { value: "25%", label: "Faster ramp time" },
    { value: "10%", label: "Better retention" },
    { value: "90%", label: "Completion rate" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Metrics Banner */}
      <section className="py-16 bg-gradient-depth">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            {metrics.map((metric, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="text-5xl font-bold bg-gradient-warm bg-clip-text text-transparent">
                  {metric.value}
                </div>
                <div className="text-secondary-foreground">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Everything you need to{" "}
              <span className="bg-gradient-warm bg-clip-text text-transparent">
                onboard right
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              From day one to full productivity, guide every new hire with personalized experiences and data-driven insights.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
      <section className="py-24 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                Analytics that make HR a{" "}
                <span className="bg-gradient-warm bg-clip-text text-transparent">
                  strategic hero
                </span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Real-time dashboards track ramp time, completion rates, retention impact, and manager effectiveness. Finally, metrics that prove HR&apos;s value to leadership.
              </p>
              <div className="space-y-3">
                {[
                  "Track ramp time to first milestone",
                  "Monitor 90-day retention trends",
                  "Measure manager effectiveness",
                  "Analyze engagement scores"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="text-success flex-shrink-0" size={20} />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <Link href="/dashboard">
                <Button variant="hero" size="lg" className="group">
                  Explore Dashboard
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-3xl"></div>
              <Image
                src="/dashboard-preview.jpg"
                alt="Analytics dashboard preview"
                width={1200}
                height={800}
                className="relative rounded-2xl shadow-medium w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-depth">
        <div className="container mx-auto px-4 text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-secondary-foreground">
            Ready to transform your onboarding?
          </h2>
          <p className="text-xl text-secondary-foreground/80 max-w-2xl mx-auto">
            Join forward-thinking HR teams who are proving their strategic impact while helping new hires succeed from day one.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg">
              Start Free Trial
            </Button>
            <Button variant="outline" size="lg" className="bg-transparent border-secondary-foreground/20 text-secondary-foreground hover:bg-secondary-foreground/10">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
