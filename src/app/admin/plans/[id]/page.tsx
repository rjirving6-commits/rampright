import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, AlertCircle } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PlanDetailPage({ params }: PageProps) {
  const { id } = await params;

  // TODO: Implement API calls:
  // - GET /api/onboarding/plans/${id}
  // - GET /api/tasks/plan/${planId}
  // - GET /api/reflections/${planId}

  return (
    <div className="container mx-auto max-w-7xl space-y-6 sm:space-y-8 py-6 sm:py-8 px-4 sm:px-6">
      <Link href="/admin/plans">
        <Button variant="ghost" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Plans
        </Button>
      </Link>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-muted-foreground" />
            Plan Details - Coming Soon
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This page is under development. The plan detail view will be available once the multi-company API endpoints are implemented.
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            Plan ID: <code className="font-mono">{id}</code>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
