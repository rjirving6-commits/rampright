# API Reference

Complete API documentation for RampRight onboarding platform.

## Overview

All API endpoints are RESTful and return JSON responses. Authentication is required for all endpoints via Better Auth session cookies.

**Base URL**: `/api`

**Authentication**: Session-based via Better Auth. Include session cookie in requests.

**Content-Type**: `application/json` for all requests and responses.

## Table of Contents

- [Authentication](#authentication)
- [Companies](#companies)
- [Onboarding Plans](#onboarding-plans)
- [Tasks](#tasks)
- [Module Content](#module-content)
- [Important People](#important-people)
- [Weekly Reflections](#weekly-reflections)
- [Error Responses](#error-responses)

---

## Authentication

Authentication is handled by Better Auth. All API endpoints require an authenticated session.

### Session Authentication

Include the Better Auth session cookie in all requests. The session is automatically managed by Better Auth client.

```typescript
// Client-side example using fetch
const response = await fetch('/api/companies', {
  credentials: 'include', // Include cookies
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### Authorization

Many endpoints require company-level authorization. Users can only access data for companies they belong to.

---

## Companies

### Create Company

Create a new company profile.

**Endpoint**: `POST /api/companies`

**Request Body**:
```json
{
  "name": "Acme Corp",
  "industry": "Technology",
  "size": "50-200",
  "description": "Leading SaaS provider",
  "website": "https://acme.com"
}
```

**Response**: `201 Created`
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "name": "Acme Corp",
  "industry": "Technology",
  "size": "50-200",
  "description": "Leading SaaS provider",
  "website": "https://acme.com",
  "createdAt": "2025-01-15T10:30:00Z"
}
```

**Validation Rules**:
- `name`: Required, max 255 characters
- `industry`: Optional, max 100 characters
- `size`: Optional
- `description`: Optional
- `website`: Optional, must be valid URL

---

### Get Company

Retrieve company details by ID.

**Endpoint**: `GET /api/companies/:id`

**URL Parameters**:
- `id` (uuid): Company ID

**Response**: `200 OK`
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "name": "Acme Corp",
  "industry": "Technology",
  "size": "50-200",
  "description": "Leading SaaS provider",
  "website": "https://acme.com",
  "createdAt": "2025-01-15T10:30:00Z"
}
```

**Errors**:
- `401 Unauthorized`: Not authenticated
- `403 Forbidden`: No access to this company
- `404 Not Found`: Company not found

---

### Update Company

Update company information.

**Endpoint**: `PATCH /api/companies/:id`

**URL Parameters**:
- `id` (uuid): Company ID

**Request Body**:
```json
{
  "name": "Acme Corporation",
  "description": "Updated description"
}
```

**Response**: `200 OK`
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "name": "Acme Corporation",
  "industry": "Technology",
  "size": "50-200",
  "description": "Updated description",
  "website": "https://acme.com",
  "createdAt": "2025-01-15T10:30:00Z"
}
```

---

## Onboarding Plans

### Create Onboarding Plan

Create a new onboarding plan for a user.

**Endpoint**: `POST /api/onboarding/plans`

**Request Body**:
```json
{
  "userId": "user_123",
  "companyId": "123e4567-e89b-12d3-a456-426614174000",
  "templateId": "456e7890-e89b-12d3-a456-426614174000",
  "startDate": "2025-02-01T00:00:00Z",
  "status": "not_started"
}
```

**Response**: `201 Created`
```json
{
  "id": "789e0123-e89b-12d3-a456-426614174000",
  "userId": "user_123",
  "companyId": "123e4567-e89b-12d3-a456-426614174000",
  "templateId": "456e7890-e89b-12d3-a456-426614174000",
  "status": "not_started",
  "startDate": "2025-02-01T00:00:00Z",
  "currentWeek": 1,
  "createdAt": "2025-01-15T10:30:00Z"
}
```

**Validation Rules**:
- `userId`: Required
- `companyId`: Required, must exist
- `templateId`: Optional
- `startDate`: Required, ISO 8601 format
- `status`: Optional, defaults to "not_started"

**Status Values**:
- `not_started`: Plan created but not started
- `in_progress`: Active onboarding
- `completed`: Onboarding finished

---

### Get Onboarding Plan

Retrieve plan details with related data.

**Endpoint**: `GET /api/onboarding/plans/:id`

**URL Parameters**:
- `id` (uuid): Plan ID

**Response**: `200 OK`
```json
{
  "id": "789e0123-e89b-12d3-a456-426614174000",
  "userId": "user_123",
  "companyId": "123e4567-e89b-12d3-a456-426614174000",
  "templateId": "456e7890-e89b-12d3-a456-426614174000",
  "status": "in_progress",
  "startDate": "2025-02-01T00:00:00Z",
  "currentWeek": 3,
  "createdAt": "2025-01-15T10:30:00Z"
}
```

---

### Update Onboarding Plan

Update plan status or current week.

**Endpoint**: `PATCH /api/onboarding/plans/:id`

**URL Parameters**:
- `id` (uuid): Plan ID

**Request Body**:
```json
{
  "status": "in_progress",
  "currentWeek": 4
}
```

**Response**: `200 OK`
```json
{
  "id": "789e0123-e89b-12d3-a456-426614174000",
  "userId": "user_123",
  "companyId": "123e4567-e89b-12d3-a456-426614174000",
  "templateId": "456e7890-e89b-12d3-a456-426614174000",
  "status": "in_progress",
  "startDate": "2025-02-01T00:00:00Z",
  "currentWeek": 4,
  "createdAt": "2025-01-15T10:30:00Z"
}
```

---

### Get User's Plan

Get the onboarding plan for a specific user.

**Endpoint**: `GET /api/onboarding/plans/user/:userId`

**URL Parameters**:
- `userId` (string): User ID

**Response**: `200 OK`
```json
{
  "id": "789e0123-e89b-12d3-a456-426614174000",
  "userId": "user_123",
  "companyId": "123e4567-e89b-12d3-a456-426614174000",
  "templateId": "456e7890-e89b-12d3-a456-426614174000",
  "status": "in_progress",
  "startDate": "2025-02-01T00:00:00Z",
  "currentWeek": 3,
  "createdAt": "2025-01-15T10:30:00Z"
}
```

**Errors**:
- `404 Not Found`: No plan found for user

---

## Tasks

### Get Tasks for Plan

Retrieve all tasks for an onboarding plan.

**Endpoint**: `GET /api/tasks/:planId`

**URL Parameters**:
- `planId` (uuid): Plan ID

**Response**: `200 OK`
```json
[
  {
    "id": "111e2222-e89b-12d3-a456-426614174000",
    "planId": "789e0123-e89b-12d3-a456-426614174000",
    "title": "Review company overview",
    "description": "Read the company overview module",
    "category": "learning",
    "weekNumber": 1,
    "completed": true,
    "completedAt": "2025-02-02T14:30:00Z",
    "order": 0,
    "createdAt": "2025-01-15T10:30:00Z"
  },
  {
    "id": "222e3333-e89b-12d3-a456-426614174000",
    "planId": "789e0123-e89b-12d3-a456-426614174000",
    "title": "Set up email and Slack",
    "description": null,
    "category": "setup",
    "weekNumber": 1,
    "completed": false,
    "completedAt": null,
    "order": 1,
    "createdAt": "2025-01-15T10:30:00Z"
  }
]
```

**Notes**:
- Tasks ordered by `weekNumber` ASC, then `order` ASC
- Empty array if no tasks exist

---

### Create Task

Add a new task to an onboarding plan.

**Endpoint**: `POST /api/tasks/:planId`

**URL Parameters**:
- `planId` (uuid): Plan ID

**Request Body**:
```json
{
  "title": "Complete compliance training",
  "description": "Finish required compliance modules",
  "category": "training",
  "weekNumber": 2,
  "order": 3
}
```

**Response**: `201 Created`
```json
{
  "id": "333e4444-e89b-12d3-a456-426614174000",
  "planId": "789e0123-e89b-12d3-a456-426614174000",
  "title": "Complete compliance training",
  "description": "Finish required compliance modules",
  "category": "training",
  "weekNumber": 2,
  "completed": false,
  "completedAt": null,
  "order": 3,
  "createdAt": "2025-01-15T10:30:00Z"
}
```

**Validation Rules**:
- `title`: Required, max 255 characters
- `description`: Optional
- `category`: Optional
- `weekNumber`: Required, positive integer
- `order`: Optional, defaults to 0

---

### Toggle Task Completion

Mark a task as complete or incomplete.

**Endpoint**: `PATCH /api/tasks/:id/toggle`

**URL Parameters**:
- `id` (uuid): Task ID

**Request Body**: None

**Response**: `200 OK`
```json
{
  "id": "111e2222-e89b-12d3-a456-426614174000",
  "planId": "789e0123-e89b-12d3-a456-426614174000",
  "title": "Review company overview",
  "description": "Read the company overview module",
  "category": "learning",
  "weekNumber": 1,
  "completed": true,
  "completedAt": "2025-02-02T14:30:00Z",
  "order": 0,
  "createdAt": "2025-01-15T10:30:00Z"
}
```

**Behavior**:
- If `completed` is `false`, sets to `true` and records `completedAt`
- If `completed` is `true`, sets to `false` and clears `completedAt`

---

### Delete Task

Remove a task from a plan.

**Endpoint**: `DELETE /api/tasks/:id`

**URL Parameters**:
- `id` (uuid): Task ID

**Response**: `204 No Content`

**Authorization**: Typically restricted to managers/admins

---

## Module Content

### Get All Modules for Company

Retrieve all learning modules for a company.

**Endpoint**: `GET /api/modules/:companyId`

**URL Parameters**:
- `companyId` (uuid): Company ID

**Response**: `200 OK`
```json
[
  {
    "id": "444e5555-e89b-12d3-a456-426614174000",
    "companyId": "123e4567-e89b-12d3-a456-426614174000",
    "type": "company_overview",
    "title": "Welcome to Acme Corp",
    "content": "# About Us\n\nWe're a leading SaaS provider...",
    "order": 0,
    "createdAt": "2025-01-15T10:30:00Z"
  },
  {
    "id": "555e6666-e89b-12d3-a456-426614174000",
    "companyId": "123e4567-e89b-12d3-a456-426614174000",
    "type": "product",
    "title": "Our Products",
    "content": "# Product Overview\n\n...",
    "order": 1,
    "createdAt": "2025-01-15T10:30:00Z"
  }
]
```

**Module Types**:
- `company_overview`: Company history, mission, values
- `product`: Product/service information
- `competitive`: Competitive landscape
- `tools`: Tools and systems
- `culture`: Culture and norms

---

### Get Specific Module

Retrieve a specific module by type.

**Endpoint**: `GET /api/modules/:companyId/:type`

**URL Parameters**:
- `companyId` (uuid): Company ID
- `type` (string): Module type

**Response**: `200 OK`
```json
{
  "id": "444e5555-e89b-12d3-a456-426614174000",
  "companyId": "123e4567-e89b-12d3-a456-426614174000",
  "type": "company_overview",
  "title": "Welcome to Acme Corp",
  "content": "# About Us\n\nWe're a leading SaaS provider...",
  "order": 0,
  "createdAt": "2025-01-15T10:30:00Z"
}
```

**Errors**:
- `404 Not Found`: Module doesn't exist for this company

---

### Create/Update Module

Create or update module content (upsert).

**Endpoint**: `POST /api/modules/:companyId`

**URL Parameters**:
- `companyId` (uuid): Company ID

**Request Body**:
```json
{
  "type": "company_overview",
  "title": "Welcome to Acme Corp",
  "content": "# About Us\n\nUpdated content...",
  "order": 0
}
```

**Response**: `200 OK`
```json
{
  "id": "444e5555-e89b-12d3-a456-426614174000",
  "companyId": "123e4567-e89b-12d3-a456-426614174000",
  "type": "company_overview",
  "title": "Welcome to Acme Corp",
  "content": "# About Us\n\nUpdated content...",
  "order": 0,
  "createdAt": "2025-01-15T10:30:00Z"
}
```

**Validation Rules**:
- `type`: Required, must be valid module type
- `title`: Required, max 255 characters
- `content`: Optional, Markdown format
- `order`: Optional, defaults to 0

**Behavior**:
- If module with type exists, updates it
- If module doesn't exist, creates new one

---

### Delete Module

Remove a module.

**Endpoint**: `DELETE /api/modules/:id`

**URL Parameters**:
- `id` (uuid): Module ID

**Response**: `204 No Content`

---

## Important People

### Get People for Company

Retrieve team directory for a company.

**Endpoint**: `GET /api/people/:companyId`

**URL Parameters**:
- `companyId` (uuid): Company ID

**Response**: `200 OK`
```json
[
  {
    "id": "666e7777-e89b-12d3-a456-426614174000",
    "companyId": "123e4567-e89b-12d3-a456-426614174000",
    "name": "Sarah Johnson",
    "title": "Engineering Manager",
    "email": "sarah@acme.com",
    "role": "manager",
    "photoUrl": "https://example.com/photos/sarah.jpg",
    "bio": "Sarah has been with Acme for 5 years...",
    "order": 0,
    "createdAt": "2025-01-15T10:30:00Z"
  },
  {
    "id": "777e8888-e89b-12d3-a456-426614174000",
    "companyId": "123e4567-e89b-12d3-a456-426614174000",
    "name": "Mike Chen",
    "title": "Senior Engineer",
    "email": "mike@acme.com",
    "role": "buddy",
    "photoUrl": "https://example.com/photos/mike.jpg",
    "bio": "Mike will be your onboarding buddy...",
    "order": 1,
    "createdAt": "2025-01-15T10:30:00Z"
  }
]
```

**Role Values**:
- `manager`: Direct manager
- `buddy`: Onboarding buddy
- `stakeholder`: Key stakeholder
- `team_member`: Team member

---

### Add Person

Add someone to the team directory.

**Endpoint**: `POST /api/people/:companyId`

**URL Parameters**:
- `companyId` (uuid): Company ID

**Request Body**:
```json
{
  "name": "Alex Martinez",
  "title": "Product Manager",
  "email": "alex@acme.com",
  "role": "stakeholder",
  "photoUrl": "https://example.com/photos/alex.jpg",
  "bio": "Alex leads our product team...",
  "order": 2
}
```

**Response**: `201 Created`
```json
{
  "id": "888e9999-e89b-12d3-a456-426614174000",
  "companyId": "123e4567-e89b-12d3-a456-426614174000",
  "name": "Alex Martinez",
  "title": "Product Manager",
  "email": "alex@acme.com",
  "role": "stakeholder",
  "photoUrl": "https://example.com/photos/alex.jpg",
  "bio": "Alex leads our product team...",
  "order": 2,
  "createdAt": "2025-01-15T10:30:00Z"
}
```

**Validation Rules**:
- `name`: Required, max 255 characters
- `title`: Required, max 255 characters
- `email`: Required, valid email format
- `role`: Required, must be valid role
- `photoUrl`: Optional, valid URL
- `bio`: Optional
- `order`: Optional, defaults to 0

---

### Update Person

Update person information.

**Endpoint**: `PATCH /api/people/:id`

**URL Parameters**:
- `id` (uuid): Person ID

**Request Body**:
```json
{
  "title": "Senior Product Manager",
  "bio": "Updated bio..."
}
```

**Response**: `200 OK`
```json
{
  "id": "888e9999-e89b-12d3-a456-426614174000",
  "companyId": "123e4567-e89b-12d3-a456-426614174000",
  "name": "Alex Martinez",
  "title": "Senior Product Manager",
  "email": "alex@acme.com",
  "role": "stakeholder",
  "photoUrl": "https://example.com/photos/alex.jpg",
  "bio": "Updated bio...",
  "order": 2,
  "createdAt": "2025-01-15T10:30:00Z"
}
```

---

### Delete Person

Remove someone from the directory.

**Endpoint**: `DELETE /api/people/:id`

**URL Parameters**:
- `id` (uuid): Person ID

**Response**: `204 No Content`

---

## Weekly Reflections

### Get Reflections for Plan

Retrieve all weekly reflections for a plan.

**Endpoint**: `GET /api/reflections/:planId`

**URL Parameters**:
- `planId` (uuid): Plan ID

**Response**: `200 OK`
```json
[
  {
    "id": "999e0000-e89b-12d3-a456-426614174000",
    "planId": "789e0123-e89b-12d3-a456-426614174000",
    "weekNumber": 3,
    "submittedAt": "2025-02-15T16:00:00Z",
    "goalsProgress": "Completed all week 3 goals, starting to feel more comfortable",
    "challenges": "Still learning the deployment process",
    "clarificationNeeded": "Need help understanding the release cycle",
    "confidenceLevel": 4,
    "additionalComments": "Great week overall!"
  },
  {
    "id": "000e1111-e89b-12d3-a456-426614174000",
    "planId": "789e0123-e89b-12d3-a456-426614174000",
    "weekNumber": 2,
    "submittedAt": "2025-02-08T16:00:00Z",
    "goalsProgress": "Met with all team members, completed onboarding tasks",
    "challenges": "Overwhelming amount of information",
    "clarificationNeeded": null,
    "confidenceLevel": 3,
    "additionalComments": null
  }
]
```

**Notes**:
- Ordered by `weekNumber` DESC (most recent first)
- `confidenceLevel` range: 1 (low) to 5 (high)

---

### Submit Reflection

Submit weekly reflection feedback.

**Endpoint**: `POST /api/reflections/:planId`

**URL Parameters**:
- `planId` (uuid): Plan ID

**Request Body**:
```json
{
  "weekNumber": 4,
  "goalsProgress": "Completed first feature, shipped to production",
  "challenges": "Time management with meetings",
  "clarificationNeeded": "What's the process for proposing new features?",
  "confidenceLevel": 4,
  "additionalComments": "Feeling much more confident now"
}
```

**Response**: `201 Created`
```json
{
  "id": "111e2222-e89b-12d3-a456-426614174000",
  "planId": "789e0123-e89b-12d3-a456-426614174000",
  "weekNumber": 4,
  "submittedAt": "2025-02-22T16:00:00Z",
  "goalsProgress": "Completed first feature, shipped to production",
  "challenges": "Time management with meetings",
  "clarificationNeeded": "What's the process for proposing new features?",
  "confidenceLevel": 4,
  "additionalComments": "Feeling much more confident now"
}
```

**Validation Rules**:
- `weekNumber`: Required, positive integer
- `goalsProgress`: Optional
- `challenges`: Optional
- `clarificationNeeded`: Optional
- `confidenceLevel`: Optional, integer 1-5
- `additionalComments`: Optional

**Behavior**:
- `submittedAt` automatically set to current timestamp
- New hires typically submit one reflection per week

---

## Error Responses

All errors follow a consistent format:

### Validation Error

**Status**: `400 Bad Request`

```json
{
  "error": "Validation failed",
  "details": {
    "name": "Name is required",
    "email": "Invalid email format"
  }
}
```

### Unauthorized

**Status**: `401 Unauthorized`

```json
{
  "error": "Authentication required"
}
```

### Forbidden

**Status**: `403 Forbidden`

```json
{
  "error": "You don't have access to this resource"
}
```

### Not Found

**Status**: `404 Not Found`

```json
{
  "error": "Resource not found"
}
```

### Server Error

**Status**: `500 Internal Server Error`

```json
{
  "error": "An unexpected error occurred"
}
```

---

## Rate Limiting

Currently no rate limiting is implemented. This will be added in a future release.

**Planned limits**:
- 100 requests per minute per user
- 1000 requests per hour per IP

---

## Pagination

Currently all endpoints return complete result sets. Pagination will be added for large datasets in a future release.

**Planned format**:
```
GET /api/tasks/:planId?page=2&limit=20
```

---

## API Versioning

Current API version: **v1** (implicit)

Future versions will use URL versioning:
```
/api/v2/companies
```

Current endpoints without version prefix are considered v1.

---

## Best Practices

### Client-Side Calling

```typescript
// Using fetch with error handling
async function fetchPlan(planId: string) {
  try {
    const response = await fetch(`/api/onboarding/plans/${planId}`, {
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Request failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch plan:', error);
    throw error;
  }
}
```

### Optimistic Updates

For better UX, update UI optimistically before API response:

```typescript
async function toggleTask(taskId: string) {
  // Update UI immediately
  updateTaskInUI(taskId, { completed: !task.completed });

  try {
    // Call API
    const result = await fetch(`/api/tasks/${taskId}/toggle`, {
      method: 'PATCH',
      credentials: 'include',
    });

    // Sync with server response
    const updatedTask = await result.json();
    updateTaskInUI(taskId, updatedTask);
  } catch (error) {
    // Rollback on error
    revertTaskInUI(taskId);
  }
}
```

### Validation

Always validate input on client before sending:

```typescript
import { z } from 'zod';

const companySchema = z.object({
  name: z.string().min(1).max(255),
  industry: z.string().max(100).optional(),
  website: z.string().url().optional(),
});

// Validate before sending
const data = companySchema.parse(formData);
```

---

## API Security

### Authentication

- All endpoints require authenticated session
- Session managed by Better Auth
- Automatic session renewal

### Authorization

- Company-level data isolation enforced
- Users can only access their company's data
- Managers have elevated permissions for certain operations

### Input Validation

- All inputs validated with Zod schemas
- SQL injection prevented by Drizzle ORM
- XSS prevention in markdown rendering

### HTTPS

- Production deployments must use HTTPS
- Credentials only sent over secure connections

---

## Support

For API issues or questions:

1. Check this documentation
2. Review code in `src/app/api/`
3. Check database schema in `docs/database-schema.md`
4. Open GitHub issue with details

---

**API Version**: 1.0.0
**Last Updated**: Phase 6 - Production Migration Complete
