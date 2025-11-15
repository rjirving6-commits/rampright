import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

/**
 * Get authenticated session
 * Returns the current session or null if not authenticated
 */
export async function getAuthSession() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    return session;
  } catch {
    return null;
  }
}

/**
 * Require authentication
 * Returns session if authenticated, or throws an error response
 */
export async function requireAuth() {
  const session = await getAuthSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  return session;
}

/**
 * Check if user has access to a specific company
 * TODO: Implement proper company access checking logic
 * For now, this is a placeholder that always returns true
 */
export async function requireCompanyAccess(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  userId: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  companyId: string
): Promise<boolean> {
  // TODO: Query database to check if user belongs to this company
  // This could check:
  // - If user has an onboarding plan with this company
  // - If user is an admin/manager of this company
  // - Other company membership rules

  return true; // Placeholder
}

/**
 * Error response helpers
 */

export function errorResponse(message: string, status: number = 400) {
  return NextResponse.json({ error: message }, { status });
}

export function validationError(errors: Record<string, string[]>) {
  return NextResponse.json(
    { error: "Validation failed", errors },
    { status: 400 }
  );
}

export function unauthorizedError(message: string = "Unauthorized") {
  return NextResponse.json({ error: message }, { status: 401 });
}

export function forbiddenError(message: string = "Forbidden") {
  return NextResponse.json({ error: message }, { status: 403 });
}

export function notFoundError(message: string = "Resource not found") {
  return NextResponse.json({ error: message }, { status: 404 });
}

/**
 * Success response helpers
 */

export function successResponse<T>(data: T, status: number = 200) {
  return NextResponse.json(data, { status });
}

export function createdResponse<T>(data: T) {
  return NextResponse.json(data, { status: 201 });
}

export function noContentResponse() {
  return new NextResponse(null, { status: 204 });
}
