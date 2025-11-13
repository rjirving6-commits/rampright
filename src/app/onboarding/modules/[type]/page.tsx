import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getModuleContent } from "@/lib/mock-api";
import { ModuleType } from "@/lib/mock-data";
import { ModuleViewer } from "@/components/onboarding/ModuleViewer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{
    type: string;
  }>;
}

// Valid module types
const validModuleTypes: ModuleType[] = [
  "company_overview",
  "product_overview",
  "competitive_landscape",
  "tools_systems",
  "team_culture",
];

export async function generateStaticParams() {
  return validModuleTypes.map((type) => ({
    type,
  }));
}

export default async function ModulePage({ params }: PageProps) {
  const { type } = await params;

  // Check authentication
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }

  // Validate module type
  if (!validModuleTypes.includes(type as ModuleType)) {
    notFound();
  }

  // Get module content
  const moduleContent = getModuleContent(type as ModuleType);

  if (!moduleContent) {
    notFound();
  }

  return (
    <div className="container max-w-5xl py-8">
      <div className="mb-6">
        <Link href="/dashboard">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>

      <ModuleViewer module={moduleContent} />
    </div>
  );
}
