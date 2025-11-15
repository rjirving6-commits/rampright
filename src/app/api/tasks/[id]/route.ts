import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { tasks, onboardingPlans } from "@/lib/schema";
import { eq } from "drizzle-orm";
import {
  requireAuth,
  noContentResponse,
  notFoundError,
  unauthorizedError,
  forbiddenError,
  errorResponse,
} from "@/lib/api-utils";

/**
 * DELETE /api/tasks/:id
 * Delete a task
 *
 * Response: No content
 * Status: 204 No Content | 404 Not Found | 403 Forbidden
 */
export async function DELETE(
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
      return forbiddenError("You do not have access to delete this task");
    }

    await db.delete(tasks).where(eq(tasks.id, id));

    return noContentResponse();
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return unauthorizedError();
    }

    return errorResponse("Internal server error", 500);
  }
}
