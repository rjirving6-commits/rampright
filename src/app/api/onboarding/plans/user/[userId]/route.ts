import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { onboardingPlans, companies } from "@/lib/schema";
import { eq, desc } from "drizzle-orm";
import {
  requireAuth,
  successResponse,
  notFoundError,
  unauthorizedError,
  forbiddenError,
  errorResponse,
} from "@/lib/api-utils";

/**
 * GET /api/onboarding/plans/user/:userId
 * Get user's active onboarding plan
 *
 * Response: Plan object with company details
 * Status: 200 OK | 404 Not Found (no plan exists)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const session = await requireAuth();
    if (!session) {
      return unauthorizedError();
    }

    const { userId } = await params;

    if (session.user.id !== userId) {
      return forbiddenError("You can only access your own plan");
    }

    const result = await db
      .select({
        plan: onboardingPlans,
        company: companies,
      })
      .from(onboardingPlans)
      .leftJoin(companies, eq(onboardingPlans.companyId, companies.id))
      .where(eq(onboardingPlans.userId, userId))
      .orderBy(desc(onboardingPlans.createdAt))
      .limit(1);

    if (!result || result.length === 0) {
      return notFoundError("No onboarding plan found for this user");
    }

    const { plan, company } = result[0];

    return successResponse({
      ...plan,
      company,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return unauthorizedError();
    }

    return errorResponse("Internal server error", 500);
  }
}
