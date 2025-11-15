import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { onboardingPlans, companies, user } from "@/lib/schema";
import { eq } from "drizzle-orm";
import {
  requireAuth,
  successResponse,
  notFoundError,
  validationError,
  unauthorizedError,
  forbiddenError,
  errorResponse,
} from "@/lib/api-utils";
import { updateOnboardingPlanSchema, validateData } from "@/lib/validators";

/**
 * GET /api/onboarding/plans/:id
 * Get onboarding plan details by ID
 *
 * Response: {
 *   id, userId, companyId, templateId, status, startDate, currentWeek, createdAt,
 *   company: { name, industry, ... },
 *   user: { name, email, ... }
 * }
 * Status: 200 OK | 404 Not Found
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAuth();
    if (!session) {
      return unauthorizedError();
    }

    const { id } = await params;

    const result = await db
      .select({
        plan: onboardingPlans,
        company: companies,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        },
      })
      .from(onboardingPlans)
      .leftJoin(companies, eq(onboardingPlans.companyId, companies.id))
      .leftJoin(user, eq(onboardingPlans.userId, user.id))
      .where(eq(onboardingPlans.id, id))
      .limit(1);

    if (!result || result.length === 0) {
      return notFoundError("Onboarding plan not found");
    }

    const { plan, company: companyData, user: userData } = result[0];

    if (plan.userId !== session.user.id) {
      return forbiddenError("You do not have access to this plan");
    }

    return successResponse({
      ...plan,
      company: companyData,
      user: userData,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return unauthorizedError();
    }

    return errorResponse("Internal server error", 500);
  }
}

/**
 * PATCH /api/onboarding/plans/:id
 * Update onboarding plan
 *
 * Request body: Partial<{ status, currentWeek, startDate }>
 * Response: Updated plan object
 * Status: 200 OK | 404 Not Found | 403 Forbidden
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAuth();
    if (!session) {
      return unauthorizedError();
    }

    const { id } = await params;

    const [existingPlan] = await db
      .select()
      .from(onboardingPlans)
      .where(eq(onboardingPlans.id, id))
      .limit(1);

    if (!existingPlan) {
      return notFoundError("Onboarding plan not found");
    }

    if (existingPlan.userId !== session.user.id) {
      return forbiddenError("You do not have access to this plan");
    }

    const body = await request.json();
    const validation = validateData(updateOnboardingPlanSchema, body);

    if (!validation.success) {
      return validationError(validation.errors);
    }

    const { startDate, ...otherData } = validation.data;
    const updateData = {
      ...otherData,
      ...(startDate && { startDate: new Date(startDate) }),
    };

    const [updatedPlan] = await db
      .update(onboardingPlans)
      .set(updateData)
      .where(eq(onboardingPlans.id, id))
      .returning();

    return successResponse(updatedPlan);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return unauthorizedError();
    }

    return errorResponse("Internal server error", 500);
  }
}
