import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, TrendingUp, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customer Success Stories - Real Results from Leading Companies",
  description: "See how leading companies are transforming their onboarding with our platform. Read real success stories and measurable results from organizations across industries.",
};

interface CaseStudy {
  id: string;
  companyName: string;
  industry: string;
  companySize: string;
  challenge: string;
  solution: string;
  results: {
    metric: string;
    value: string;
  }[];
  logo?: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: "1",
    companyName: "TechCorp Solutions",
    industry: "Technology",
    companySize: "500-1000 employees",
    challenge:
      "Struggling with inconsistent onboarding across departments, leading to 30% turnover in the first 90 days and delayed time-to-productivity.",
    solution:
      "Implemented structured 90-day onboarding plans with automated task tracking, weekly reflections, and manager check-ins across all departments.",
    results: [
      { metric: "Reduced Turnover", value: "68%" },
      { metric: "Faster Time-to-Productivity", value: "40%" },
      { metric: "Employee Satisfaction", value: "92%" },
    ],
  },
  {
    id: "2",
    companyName: "Global Retail Group",
    industry: "Retail",
    companySize: "2000+ employees",
    challenge:
      "Managing onboarding for hundreds of seasonal hires across 50+ locations with no centralized system or visibility into progress.",
    solution:
      "Deployed scalable onboarding templates with location-specific customization, real-time progress tracking, and automated compliance verification.",
    results: [
      { metric: "Onboarding Time Saved", value: "75%" },
      { metric: "Compliance Rate", value: "100%" },
      { metric: "Manager Efficiency", value: "+55%" },
    ],
  },
  {
    id: "3",
    companyName: "FinanceHub Inc",
    industry: "Financial Services",
    companySize: "200-500 employees",
    challenge:
      "Complex regulatory requirements and dispersed remote teams made consistent, compliant onboarding nearly impossible to track and verify.",
    solution:
      "Built custom onboarding workflows with mandatory compliance checkpoints, digital signature collection, and comprehensive audit trails.",
    results: [
      { metric: "Audit Pass Rate", value: "100%" },
      { metric: "Documentation Time", value: "-60%" },
      { metric: "Remote Employee Engagement", value: "+82%" },
    ],
  },
  {
    id: "4",
    companyName: "HealthWise Medical",
    industry: "Healthcare",
    companySize: "1000-2000 employees",
    challenge:
      "High-stakes healthcare environment required rigorous training and certification tracking for new clinical staff with zero room for error.",
    solution:
      "Created role-specific onboarding paths with integrated certification tracking, clinical shadowing schedules, and competency assessments.",
    results: [
      { metric: "Training Completion", value: "98%" },
      { metric: "Certification Tracking", value: "100%" },
      { metric: "Clinical Readiness", value: "+45%" },
    ],
  },
];

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        {/* Page Header */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Customer Success Stories
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See how leading companies are transforming their onboarding with our platform.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {caseStudies.map((study) => (
            <Card
              key={study.id}
              className="flex flex-col hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="outline" className="font-medium">
                    {study.industry}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Users className="h-3 w-3" />
                    <span>{study.companySize.split(" ")[0]}</span>
                  </div>
                </div>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Building2 className="h-6 w-6 text-primary" />
                  {study.companyName}
                </CardTitle>
              </CardHeader>

              <CardContent className="flex-grow space-y-6">
                {/* Challenge */}
                <div>
                  <h3 className="font-semibold text-sm mb-2 text-muted-foreground uppercase tracking-wide">
                    Challenge
                  </h3>
                  <p className="text-sm">{study.challenge}</p>
                </div>

                {/* Solution */}
                <div>
                  <h3 className="font-semibold text-sm mb-2 text-muted-foreground uppercase tracking-wide">
                    Solution
                  </h3>
                  <p className="text-sm">{study.solution}</p>
                </div>

                {/* Results */}
                <div>
                  <h3 className="font-semibold text-sm mb-3 text-muted-foreground uppercase tracking-wide flex items-center gap-1">
                    <TrendingUp className="h-4 w-4" />
                    Results
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {study.results.map((result, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                      >
                        <span className="text-xs font-medium">
                          {result.metric}
                        </span>
                        <span className="text-lg font-bold text-primary">
                          {result.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>

              <CardFooter>
                <Button variant="outline" className="w-full group" asChild>
                  <Link href={`/case-studies/${study.id}`}>
                    Read full case study
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-24 text-center space-y-6 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold">Ready to write your success story?</h2>
          <p className="text-lg text-muted-foreground">
            Join hundreds of companies creating exceptional onboarding experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/pricing">Start Free Trial</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">Schedule a Demo</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
