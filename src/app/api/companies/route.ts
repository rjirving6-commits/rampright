import { NextRequest, NextResponse } from "next/server";

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
    // TODO: Implement authentication check
    // TODO: Validate request body with Zod
    // TODO: Insert company into database
    // TODO: Return created company with 201 status

    return NextResponse.json(
      { error: "Not implemented yet" },
      { status: 501 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
