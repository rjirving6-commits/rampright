import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { moduleContent } from "@/lib/schema";
import { eq } from "drizzle-orm";
import {
  requireAuth,
  requireCompanyAccess,
  noContentResponse,
  notFoundError,
  unauthorizedError,
  forbiddenError,
  errorResponse,
} from "@/lib/api-utils";

/**
 * DELETE /api/modules/:id
 * Delete a module
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

    const [module] = await db
      .select()
      .from(moduleContent)
      .where(eq(moduleContent.id, id))
      .limit(1);

    if (!module) {
      return notFoundError("Module not found");
    }

    const hasAccess = await requireCompanyAccess(session.user.id, module.companyId);
    if (!hasAccess) {
      return forbiddenError("You do not have access to delete this module");
    }

    await db.delete(moduleContent).where(eq(moduleContent.id, id));

    return noContentResponse();
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return unauthorizedError();
    }

    return errorResponse("Internal server error", 500);
  }
}
