import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing - Simple, Transparent Plans",
  description: "Choose the perfect onboarding plan for your team. From Professional to Enterprise, find the right fit for your organization.",
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

