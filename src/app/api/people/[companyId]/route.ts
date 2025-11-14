import { NextRequest, NextResponse } from "next/server";

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
    const { companyId } = await params;

    // TODO: Check authentication and company access
    // TODO: Fetch all people for company (ordered)
    // TODO: Return people array

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
    const { companyId } = await params;

    // TODO: Validate request body
    // TODO: Check authentication and authorization
    // TODO: Create person
    // TODO: Return created person with 201

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
