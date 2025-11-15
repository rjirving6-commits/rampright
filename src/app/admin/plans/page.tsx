import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserPlus } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";

export default function AdminPlansPage() {
  // TODO: Implement API call to fetch all onboarding plans
  // GET /api/onboarding/plans?companyId=${companyId}
  const plans: Array<{ status: string }> = [];

  return (
    <div className="container mx-auto max-w-6xl space-y-6 sm:space-y-8 py-6 sm:py-8 px-4 sm:px-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Users className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="text-xs sm:text-sm font-medium">Manager View</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Onboarding Plans</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Monitor progress and provide support for your new hires
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Plans
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{plans.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              In Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {plans.filter((p) => p.status === "in_progress").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {plans.filter((p) => p.status === "completed").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Plans List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">All Plans</h2>
        {plans.length === 0 ? (
          <EmptyState
            icon={UserPlus}
            title="No onboarding plans yet"
            description="Create your first onboarding plan to help new hires get started and track their progress."
            action={{
              label: "Create Onboarding Plan",
              href: "/admin/setup",
            }}
          />
        ) : (
          <div className="space-y-4">
            {/* TODO: Render plans list when API is implemented */}
          </div>
        )}
      </div>
    </div>
  );
}
