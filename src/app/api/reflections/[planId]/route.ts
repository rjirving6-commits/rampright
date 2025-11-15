import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { weeklyReflections, onboardingPlans } from "@/lib/schema";
import { eq, asc } from "drizzle-orm";
import {
  requireAuth,
  successResponse,
  createdResponse,
  validationError,
  unauthorizedError,
  forbiddenError,
  errorResponse,
} from "@/lib/api-utils";
import { createWeeklyReflectionSchema, validateData } from "@/lib/validators";

/**
 * GET /api/reflections/:planId
 * Get all weekly reflections for a plan
 *
 * Response: Array of reflection objects, ordered by weekNumber
 * Status: 200 OK
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ planId: string }> }
) {
  try {
    const session = await requireAuth();
    if (!session) {
      return unauthorizedError();
    }

    const { planId } = await params;

    const [plan] = await db
      .select()
      .from(onboardingPlans)
      .where(eq(onboardingPlans.id, planId))
      .limit(1);

    if (!plan) {
      return errorResponse("Plan not found", 404);
    }

    if (plan.userId !== session.user.id) {
      return forbiddenError("You do not have access to this plan");
    }

    const reflections = await db
      .select()
      .from(weeklyReflections)
      .where(eq(weeklyReflections.planId, planId))
      .orderBy(asc(weeklyReflections.weekNumber));

    return successResponse(reflections);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return unauthorizedError();
    }

    return errorResponse("Internal server error", 500);
  }
}

/**
 * POST /api/reflections/:planId
 * Submit a new weekly reflection
 *
 * Request body: {
 *   weekNumber: number;
 *   goalsProgress?: string;
 *   challenges?: string;
 *   clarificationNeeded?: string;
 *   confidenceLevel?: number;
 *   additionalComments?: string;
 * }
 * Response: Created reflection object
 * Status: 201 Created
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ planId: string }> }
) {
  try {
    const session = await requireAuth();
    if (!session) {
      return unauthorizedError();
    }

    const { planId } = await params;

    const [plan] = await db
      .select()
      .from(onboardingPlans)
      .where(eq(onboardingPlans.id, planId))
      .limit(1);

    if (!plan) {
      return errorResponse("Plan not found", 404);
    }

    if (plan.userId !== session.user.id) {
      return forbiddenError("You do not have access to this plan");
    }

    const body = await request.json();
    const validation = validateData(createWeeklyReflectionSchema, body);

    if (!validation.success) {
      return validationError(validation.errors);
    }

    const [reflection] = await db
      .insert(weeklyReflections)
      .values({
        ...validation.data,
        planId,
      })
      .returning();

    return createdResponse(reflection);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return unauthorizedError();
    }

    return errorResponse("Internal server error", 500);
  }
}
