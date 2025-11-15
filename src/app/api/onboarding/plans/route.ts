import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { onboardingPlans, tasks as tasksTable } from "@/lib/schema";
import {
  requireAuth,
  createdResponse,
  validationError,
  unauthorizedError,
  errorResponse,
} from "@/lib/api-utils";
import { createOnboardingPlanSchema, validateData, createTaskSchema } from "@/lib/validators";
import { z } from "zod";

const createPlanWithTasksSchema = createOnboardingPlanSchema.extend({
  tasks: z.array(createTaskSchema).optional(),
});

/**
 * POST /api/onboarding/plans
 * Create a new onboarding plan
 *
 * Request body:
 * {
 *   userId: string;
 *   companyId: string;
 *   templateId?: string;
 *   startDate: string;
 *   tasks?: Array<{ title, description, category, weekNumber, order }>;
 * }
 *
 * Response: Created plan object with associated tasks
 * Status: 201 Created
 */
export async function POST(request: NextRequest) {
  try {
    const session = await requireAuth();
    if (!session) {
      return unauthorizedError();
    }

    const body = await request.json();
    const validation = validateData(createPlanWithTasksSchema, body);

    if (!validation.success) {
      return validationError(validation.errors);
    }

    const { tasks: tasksList, ...planData } = validation.data;

    const [plan] = await db
      .insert(onboardingPlans)
      .values({
        ...planData,
        startDate: new Date(planData.startDate),
      })
      .returning();

    if (tasksList && tasksList.length > 0) {
      const tasksToInsert = tasksList.map(task => ({
        ...task,
        planId: plan.id,
      }));

      await db.insert(tasksTable).values(tasksToInsert);
    }

    return createdResponse(plan);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return unauthorizedError();
    }

    return errorResponse("Internal server error", 500);
  }
}
