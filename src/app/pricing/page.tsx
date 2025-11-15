import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing - Simple, Transparent Plans",
  description: "Choose the perfect onboarding plan for your team. All plans include a 14-day free trial. From Starter to Enterprise, find the right fit for your organization.",
};

interface PricingTier {
  name: string;
  description: string;
  price: string;
  priceDescription: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
  badge?: string;
}

const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    description: "Perfect for small teams just getting started with onboarding",
    price: "$49",
    priceDescription: "per month",
    features: [
      "Up to 10 active onboarding plans",
      "Standard onboarding templates",
      "Basic task management",
      "Email notifications",
      "Weekly reflections",
      "Community support",
      "Mobile-friendly interface",
    ],
    cta: "Start Free Trial",
  },
  {
    name: "Professional",
    description: "Ideal for growing companies with advanced onboarding needs",
    price: "$149",
    priceDescription: "per month",
    features: [
      "Up to 50 active onboarding plans",
      "Custom onboarding templates",
      "Advanced task automation",
      "Priority email & chat support",
      "Weekly reflections & analytics",
      "Team directory & org charts",
      "Custom module content",
      "Integration with Slack & Teams",
      "Advanced reporting",
      "Role-based permissions",
    ],
    cta: "Start Free Trial",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "Enterprise",
    description: "For large organizations requiring custom solutions and dedicated support",
    price: "Custom",
    priceDescription: "contact sales",
    features: [
      "Unlimited onboarding plans",
      "Dedicated account manager",
      "Custom integrations",
      "Advanced security & compliance",
      "SSO & SAML authentication",
      "Custom API access",
      "White-label options",
      "Priority 24/7 support",
      "Onsite training & setup",
      "SLA guarantees",
      "Custom contract terms",
    ],
    cta: "Contact Sales",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        {/* Page Header */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your team. All plans include a 14-day free trial.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pricingTiers.map((tier) => (
            <Card
              key={tier.name}
              className={`relative flex flex-col ${
                tier.highlighted
                  ? "border-primary shadow-lg scale-105"
                  : "border-border"
              }`}
            >
              {tier.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="px-4 py-1 bg-primary text-primary-foreground">
                    {tier.badge}
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-8 pt-8">
                <CardTitle className="text-2xl font-bold">{tier.name}</CardTitle>
                <CardDescription className="text-sm mt-2">
                  {tier.description}
                </CardDescription>
                <div className="mt-6">
                  <div className="text-4xl font-bold">{tier.price}</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {tier.priceDescription}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="pt-6">
                <Button
                  className="w-full"
                  variant={tier.highlighted ? "default" : "outline"}
                  size="lg"
                >
                  {tier.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* FAQ or Additional Info Section */}
        <div className="mt-24 text-center space-y-4">
          <h2 className="text-2xl font-bold">All plans include:</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-8">
            <div className="space-y-2">
              <div className="text-4xl">🔒</div>
              <h3 className="font-semibold">Secure & Compliant</h3>
              <p className="text-sm text-muted-foreground">
                SOC 2 Type II certified with enterprise-grade security
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl">📱</div>
              <h3 className="font-semibold">Mobile Ready</h3>
              <p className="text-sm text-muted-foreground">
                Access your onboarding platform from any device
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl">⚡</div>
              <h3 className="font-semibold">Quick Setup</h3>
              <p className="text-sm text-muted-foreground">
                Get started in minutes with our intuitive setup wizard
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
