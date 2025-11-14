import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/tasks/:planId
 * Get all tasks for an onboarding plan
 *
 * Response: Array of task objects, ordered by weekNumber and order
 * Status: 200 OK
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ planId: string }> }
) {
  try {
    const { planId } = await params;

    // TODO: Check authentication and plan access
    // TODO: Fetch all tasks for plan (ordered by weekNumber, order)
    // TODO: Return tasks array

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
 * POST /api/tasks/:planId
 * Create a new task for a plan
 *
 * Request body: { title, description?, category?, weekNumber, order? }
 * Response: Created task object
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
    // TODO: Create task
    // TODO: Return created task with 201

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
