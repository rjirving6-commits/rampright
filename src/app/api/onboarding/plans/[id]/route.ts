import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/onboarding/plans/:id
 * Get onboarding plan details by ID
 *
 * Response: {
 *   id, userId, companyId, templateId, status, startDate, currentWeek, createdAt,
 *   company: { name, industry, ... },
 *   user: { name, email, ... }
 * }
 * Status: 200 OK | 404 Not Found
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // TODO: Check authentication and authorization
    // TODO: Fetch plan with related data (company, user info)
    // TODO: Return plan or 404

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

/**
 * PATCH /api/onboarding/plans/:id
 * Update onboarding plan
 *
 * Request body: Partial<{ status, currentWeek, startDate }>
 * Response: Updated plan object
 * Status: 200 OK | 404 Not Found | 403 Forbidden
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // TODO: Validate request body
    // TODO: Check authentication and authorization
    // TODO: Update plan (status, currentWeek, etc.)
    // TODO: Return updated plan

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
