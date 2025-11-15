import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { moduleContent } from "@/lib/schema";
import { eq, asc, and } from "drizzle-orm";
import {
  requireAuth,
  requireCompanyAccess,
  successResponse,
  createdResponse,
  validationError,
  unauthorizedError,
  forbiddenError,
  errorResponse,
} from "@/lib/api-utils";
import { createModuleContentSchema, validateData } from "@/lib/validators";

/**
 * GET /api/modules/:companyId
 * Get all module content for a company
 *
 * Response: Array of module objects, ordered by order field
 * Status: 200 OK
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string }> }
) {
  try {
    const session = await requireAuth();
    if (!session) {
      return unauthorizedError();
    }

    const { companyId } = await params;

    const hasAccess = await requireCompanyAccess(session.user.id, companyId);
    if (!hasAccess) {
      return forbiddenError("You do not have access to this company");
    }

    const modules = await db
      .select()
      .from(moduleContent)
      .where(eq(moduleContent.companyId, companyId))
      .orderBy(asc(moduleContent.order));

    return successResponse(modules);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return unauthorizedError();
    }

    return errorResponse("Internal server error", 500);
  }
}

/**
 * POST /api/modules/:companyId
 * Create or update module content
 *
 * Request body: { type, title, content, order? }
 * Response: Created/updated module object
 * Status: 200 OK | 201 Created
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string }> }
) {
  try {
    const session = await requireAuth();
    if (!session) {
      return unauthorizedError();
    }

    const { companyId } = await params;

    const hasAccess = await requireCompanyAccess(session.user.id, companyId);
    if (!hasAccess) {
      return forbiddenError("You do not have access to this company");
    }

    const body = await request.json();
    const validation = validateData(createModuleContentSchema, body);

    if (!validation.success) {
      return validationError(validation.errors);
    }

    const existingModule = await db
      .select()
      .from(moduleContent)
      .where(
        and(
          eq(moduleContent.companyId, companyId),
          eq(moduleContent.type, validation.data.type)
        )
      )
      .limit(1);

    if (existingModule.length > 0) {
      const [updated] = await db
        .update(moduleContent)
        .set(validation.data)
        .where(eq(moduleContent.id, existingModule[0].id))
        .returning();

      return successResponse(updated);
    }

    const [created] = await db
      .insert(moduleContent)
      .values({
        ...validation.data,
        companyId,
      })
      .returning();

    return createdResponse(created);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return unauthorizedError();
    }

    return errorResponse("Internal server error", 500);
  }
}
