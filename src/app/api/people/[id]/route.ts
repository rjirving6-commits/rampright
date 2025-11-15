import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { importantPeople } from "@/lib/schema";
import { eq } from "drizzle-orm";
import {
  requireAuth,
  requireCompanyAccess,
  successResponse,
  noContentResponse,
  notFoundError,
  validationError,
  unauthorizedError,
  forbiddenError,
  errorResponse,
} from "@/lib/api-utils";
import { updateImportantPersonSchema, validateData } from "@/lib/validators";

/**
 * PATCH /api/people/:id
 * Update an important person
 *
 * Request body: Partial<{ name, title, email, role, photoUrl, bio, order }>
 * Response: Updated person object
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

    const [person] = await db
      .select()
      .from(importantPeople)
      .where(eq(importantPeople.id, id))
      .limit(1);

    if (!person) {
      return notFoundError("Person not found");
    }

    const hasAccess = await requireCompanyAccess(session.user.id, person.companyId);
    if (!hasAccess) {
      return forbiddenError("You do not have access to update this person");
    }

    const body = await request.json();
    const validation = validateData(updateImportantPersonSchema, body);

    if (!validation.success) {
      return validationError(validation.errors);
    }

    const [updatedPerson] = await db
      .update(importantPeople)
      .set(validation.data)
      .where(eq(importantPeople.id, id))
      .returning();

    return successResponse(updatedPerson);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return unauthorizedError();
    }

    return errorResponse("Internal server error", 500);
  }
}

/**
 * DELETE /api/people/:id
 * Delete an important person
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

    const [person] = await db
      .select()
      .from(importantPeople)
      .where(eq(importantPeople.id, id))
      .limit(1);

    if (!person) {
      return notFoundError("Person not found");
    }

    const hasAccess = await requireCompanyAccess(session.user.id, person.companyId);
    if (!hasAccess) {
      return forbiddenError("You do not have access to delete this person");
    }

    await db.delete(importantPeople).where(eq(importantPeople.id, id));

    return noContentResponse();
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return unauthorizedError();
    }

    return errorResponse("Internal server error", 500);
  }
}
