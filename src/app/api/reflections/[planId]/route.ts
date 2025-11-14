import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/reflections/:planId
 * Get all weekly reflections for a plan
 *
 * Response: Array of reflection objects, ordered by weekNumber
 * Status: 200 OK
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ planId: string }> }
) {
  try {
    const { planId } = await params;

    // TODO: Check authentication and plan access
    // TODO: Fetch all reflections for plan (ordered by weekNumber)
    // TODO: Return reflections array

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
 * POST /api/reflections/:planId
 * Submit a new weekly reflection
 *
 * Request body: {
 *   weekNumber: number;
 *   goalsProgress?: string;
 *   challenges?: string;
 *   clarificationNeeded?: string;
 *   confidenceLevel?: number;
 *   additionalComments?: string;
 * }
 * Response: Created reflection object
 * Status: 201 Created
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ planId: string }> }
) {
  try {
    const { planId } = await params;

    // TODO: Validate request body
    // TODO: Check authentication and authorization
    // TODO: Create reflection with submittedAt timestamp
    // TODO: Return created reflection with 201

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
