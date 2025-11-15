import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { moduleContent } from "@/lib/schema";
import { eq, and } from "drizzle-orm";
import {
  requireAuth,
  requireCompanyAccess,
  successResponse,
  notFoundError,
  unauthorizedError,
  forbiddenError,
  errorResponse,
} from "@/lib/api-utils";

/**
 * GET /api/modules/:companyId/:type
 * Get specific module by type (e.g., 'company_overview', 'product', etc.)
 *
 * Response: Module object
 * Status: 200 OK | 404 Not Found
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string; type: string }> }
) {
  try {
    const session = await requireAuth();
    if (!session) {
      return unauthorizedError();
    }

    const { companyId, type } = await params;

    const hasAccess = await requireCompanyAccess(session.user.id, companyId);
    if (!hasAccess) {
      return forbiddenError("You do not have access to this company");
    }

    const [module] = await db
      .select()
      .from(moduleContent)
      .where(
        and(
          eq(moduleContent.companyId, companyId),
          eq(moduleContent.type, type)
        )
      )
      .limit(1);

    if (!module) {
      return notFoundError("Module not found");
    }

    return successResponse(module);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return unauthorizedError();
    }

    return errorResponse("Internal server error", 500);
  }
}
