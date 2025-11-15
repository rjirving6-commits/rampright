import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { companies } from "@/lib/schema";
import {
  requireAuth,
  createdResponse,
  validationError,
  unauthorizedError,
  errorResponse,
} from "@/lib/api-utils";
import { createCompanySchema, validateData } from "@/lib/validators";

/**
 * POST /api/companies
 * Create a new company
 *
 * Request body:
 * {
 *   name: string;
 *   industry?: string;
 *   size?: string;
 *   description?: string;
 *   website?: string;
 * }
 *
 * Response: { id, name, industry, size, description, website, createdAt }
 * Status: 201 Created
 */
export async function POST(request: NextRequest) {
  try {
    const session = await requireAuth();
    if (!session) {
      return unauthorizedError();
    }

    const body = await request.json();
    const validation = validateData(createCompanySchema, body);

    if (!validation.success) {
      return validationError(validation.errors);
    }

    const [company] = await db
      .insert(companies)
      .values(validation.data)
      .returning();

    return createdResponse(company);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return unauthorizedError();
    }

    return errorResponse("Internal server error", 500);
  }
}
