import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Updates - Changelog & Roadmap",
  description: "Stay up to date with new features, improvements, and what's coming next. View our product changelog and upcoming roadmap for the onboarding platform.",
};

export default function DocumentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
