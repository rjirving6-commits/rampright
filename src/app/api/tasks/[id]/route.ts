import { NextRequest, NextResponse } from "next/server";

/**
 * DELETE /api/tasks/:id
 * Delete a task
 *
 * Response: No content
 * Status: 204 No Content | 404 Not Found | 403 Forbidden
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // TODO: Check authentication and authorization (managers only)
    // TODO: Delete task from database
    // TODO: Return 204 No Content

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
