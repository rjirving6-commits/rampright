import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { tasks, onboardingPlans } from "@/lib/schema";
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
import { createTaskSchema, validateData } from "@/lib/validators";

/**
 * GET /api/tasks/:planId
 * Get all tasks for an onboarding plan
 *
 * Response: Array of task objects, ordered by weekNumber and order
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

    const tasksList = await db
      .select()
      .from(tasks)
      .where(eq(tasks.planId, planId))
      .orderBy(asc(tasks.weekNumber), asc(tasks.order));

    return successResponse(tasksList);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return unauthorizedError();
    }

    return errorResponse("Internal server error", 500);
  }
}

/**
 * POST /api/tasks/:planId
 * Create a new task for a plan
 *
 * Request body: { title, description?, category?, weekNumber, order? }
 * Response: Created task object
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
    const validation = validateData(createTaskSchema, body);

    if (!validation.success) {
      return validationError(validation.errors);
    }

    const [task] = await db
      .insert(tasks)
      .values({
        ...validation.data,
        planId,
      })
      .returning();

    return createdResponse(task);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return unauthorizedError();
    }

    return errorResponse("Internal server error", 500);
  }
}
