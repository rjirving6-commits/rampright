import { NextRequest, NextResponse } from "next/server";

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
    const { id } = await params;

    // TODO: Validate request body
    // TODO: Check authentication and authorization
    // TODO: Update person
    // TODO: Return updated person

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
    const { id } = await params;

    // TODO: Check authentication and authorization
    // TODO: Delete person
    // TODO: Return 204

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
