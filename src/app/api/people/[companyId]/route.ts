import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { importantPeople } from "@/lib/schema";
import { eq, asc } from "drizzle-orm";
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
import { createImportantPersonSchema, validateData } from "@/lib/validators";

/**
 * GET /api/people/:companyId
 * Get all important people for a company
 *
 * Response: Array of people objects, ordered by order field
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

    const people = await db
      .select()
      .from(importantPeople)
      .where(eq(importantPeople.companyId, companyId))
      .orderBy(asc(importantPeople.order));

    return successResponse(people);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return unauthorizedError();
    }

    return errorResponse("Internal server error", 500);
  }
}

/**
 * POST /api/people/:companyId
 * Add a new important person
 *
 * Request body: { name, title, email, role, photoUrl?, bio?, order? }
 * Response: Created person object
 * Status: 201 Created
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
    const validation = validateData(createImportantPersonSchema, body);

    if (!validation.success) {
      return validationError(validation.errors);
    }

    const [person] = await db
      .insert(importantPeople)
      .values({
        ...validation.data,
        companyId,
      })
      .returning();

    return createdResponse(person);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return unauthorizedError();
    }

    return errorResponse("Internal server error", 500);
  }
}
