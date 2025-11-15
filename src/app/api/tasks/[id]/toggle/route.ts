import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { tasks, onboardingPlans } from "@/lib/schema";
import { eq } from "drizzle-orm";
import {
  requireAuth,
  successResponse,
  notFoundError,
  unauthorizedError,
  forbiddenError,
  errorResponse,
} from "@/lib/api-utils";

/**
 * PATCH /api/tasks/:id/toggle
 * Toggle task completion status
 *
 * Response: Updated task object with completed status and completedAt timestamp
 * Status: 200 OK | 404 Not Found
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

    const [task] = await db
      .select()
      .from(tasks)
      .where(eq(tasks.id, id))
      .limit(1);

    if (!task) {
      return notFoundError("Task not found");
    }

    const [plan] = await db
      .select()
      .from(onboardingPlans)
      .where(eq(onboardingPlans.id, task.planId))
      .limit(1);

    if (!plan || plan.userId !== session.user.id) {
      return forbiddenError("You do not have access to this task");
    }

    const newCompleted = !task.completed;
    const completedAt = newCompleted ? new Date() : null;

    const [updatedTask] = await db
      .update(tasks)
      .set({
        completed: newCompleted,
        completedAt,
      })
      .where(eq(tasks.id, id))
      .returning();

    return successResponse(updatedTask);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return unauthorizedError();
    }

    return errorResponse("Internal server error", 500);
  }
}
