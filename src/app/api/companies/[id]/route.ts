import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { companies } from "@/lib/schema";
import { eq } from "drizzle-orm";
import {
  requireAuth,
  requireCompanyAccess,
  successResponse,
  notFoundError,
  validationError,
  unauthorizedError,
  forbiddenError,
  errorResponse,
} from "@/lib/api-utils";
import { updateCompanySchema, validateData } from "@/lib/validators";

/**
 * GET /api/companies/:id
 * Get company details by ID
 *
 * Response: { id, name, industry, size, description, website, createdAt }
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

    const hasAccess = await requireCompanyAccess(session.user.id, id);
    if (!hasAccess) {
      return forbiddenError("You do not have access to this company");
    }

    const [company] = await db
      .select()
      .from(companies)
      .where(eq(companies.id, id))
      .limit(1);

    if (!company) {
      return notFoundError("Company not found");
    }

    return successResponse(company);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return unauthorizedError();
    }

    return errorResponse("Internal server error", 500);
  }
}

/**
 * PATCH /api/companies/:id
 * Update company details
 *
 * Request body: Partial<{ name, industry, size, description, website }>
 * Response: Updated company object
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

    const hasAccess = await requireCompanyAccess(session.user.id, id);
    if (!hasAccess) {
      return forbiddenError("You do not have access to this company");
    }

    const body = await request.json();
    const validation = validateData(updateCompanySchema, body);

    if (!validation.success) {
      return validationError(validation.errors);
    }

    const [updatedCompany] = await db
      .update(companies)
      .set(validation.data)
      .where(eq(companies.id, id))
      .returning();

    if (!updatedCompany) {
      return notFoundError("Company not found");
    }

    return successResponse(updatedCompany);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return unauthorizedError();
    }

    return errorResponse("Internal server error", 500);
  }
}
