import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/modules/:companyId/:type
 * Get specific module by type (e.g., 'company_overview', 'product', etc.)
 *
 * Response: Module object
 * Status: 200 OK | 404 Not Found
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ companyId: string; type: string }> }
) {
  try {
    const { companyId, type } = await params;

    // TODO: Check authentication and company access
    // TODO: Fetch specific module by type
    // TODO: Return module or 404

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
