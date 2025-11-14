import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/onboarding/plans/user/:userId
 * Get user's active onboarding plan
 *
 * Response: Plan object with company details
 * Status: 200 OK | 404 Not Found (no plan exists)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;

    // TODO: Check authentication (must be user themselves or manager)
    // TODO: Fetch user's active plan
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
