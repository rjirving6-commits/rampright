import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ModuleViewer } from "@/components/onboarding/ModuleViewer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface PageProps {
  params: Promise<{
    type: string;
  }>;
}

// Valid module types
const validModuleTypes = [
  "company_overview",
  "product",
  "competitive",
  "tools",
  "culture",
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
  if (!validModuleTypes.includes(type)) {
    notFound();
  }

  // Get user's plan to find their company
  const planResponse = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/onboarding/plans/user/${session.user.id}`,
    {
      headers: { cookie: (await headers()).get("cookie") || "" },
      cache: "no-store",
    }
  );

  if (!planResponse.ok) {
    redirect("/admin/setup");
  }

  const plan = await planResponse.json();

  // Get module content
  const moduleResponse = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/modules/${plan.companyId}/${type}`,
    {
      headers: { cookie: (await headers()).get("cookie") || "" },
      cache: "no-store",
    }
  );

  if (!moduleResponse.ok) {
    notFound();
  }

  const moduleContent = await moduleResponse.json();

  // Format module type for display
  const moduleTitle = moduleContent.title;

  return (
    <div className="container max-w-5xl py-8">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              <Home className="h-4 w-4" />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{moduleTitle}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

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
