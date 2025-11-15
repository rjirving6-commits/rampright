# Database Schema Documentation

This document describes the complete database schema for RampRight, an employee onboarding platform.

## Overview

RampRight uses PostgreSQL with Drizzle ORM. The schema is defined in `src/lib/schema.ts` and consists of two main groups:

1. **Authentication Tables** - Managed by Better Auth
2. **Application Tables** - Core onboarding platform functionality

## Table of Contents

- [Authentication Tables](#authentication-tables)
- [Application Tables](#application-tables)
- [Relationships](#relationships)
- [Indexes](#indexes)
- [Common Queries](#common-queries)

---

## Authentication Tables

These tables are managed by Better Auth for user authentication and session management.

### `user`

Stores user accounts and profile information.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | text | PRIMARY KEY | Unique user identifier |
| `name` | text | NOT NULL | User's full name |
| `email` | text | NOT NULL, UNIQUE | User's email address |
| `email_verified` | boolean | NOT NULL, DEFAULT false | Email verification status |
| `image` | text | - | Profile image URL |
| `created_at` | timestamp | NOT NULL, DEFAULT now() | Account creation timestamp |
| `updated_at` | timestamp | NOT NULL, DEFAULT now() | Last update timestamp |

### `session`

Stores active user sessions for authentication.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | text | PRIMARY KEY | Session identifier |
| `expires_at` | timestamp | NOT NULL | Session expiration time |
| `token` | text | NOT NULL, UNIQUE | Session token |
| `created_at` | timestamp | NOT NULL, DEFAULT now() | Session creation time |
| `updated_at` | timestamp | NOT NULL | Last update time |
| `ip_address` | text | - | Client IP address |
| `user_agent` | text | - | Client user agent |
| `user_id` | text | NOT NULL, FK → user.id | Associated user |

**Foreign Keys:**
- `user_id` → `user.id` (CASCADE DELETE)

### `account`

Stores OAuth provider account linkages.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | text | PRIMARY KEY | Account identifier |
| `account_id` | text | NOT NULL | Provider account ID |
| `provider_id` | text | NOT NULL | OAuth provider (e.g., "google") |
| `user_id` | text | NOT NULL, FK → user.id | Associated user |
| `access_token` | text | - | OAuth access token |
| `refresh_token` | text | - | OAuth refresh token |
| `id_token` | text | - | OAuth ID token |
| `access_token_expires_at` | timestamp | - | Access token expiration |
| `refresh_token_expires_at` | timestamp | - | Refresh token expiration |
| `scope` | text | - | OAuth scope |
| `password` | text | - | Hashed password (if using email/password) |
| `created_at` | timestamp | NOT NULL, DEFAULT now() | Account creation time |
| `updated_at` | timestamp | NOT NULL | Last update time |

**Foreign Keys:**
- `user_id` → `user.id` (CASCADE DELETE)

### `verification`

Stores email verification tokens and other verification data.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | text | PRIMARY KEY | Verification identifier |
| `identifier` | text | NOT NULL | Email or identifier to verify |
| `value` | text | NOT NULL | Verification token |
| `expires_at` | timestamp | NOT NULL | Token expiration |
| `created_at` | timestamp | NOT NULL, DEFAULT now() | Creation time |
| `updated_at` | timestamp | NOT NULL | Last update time |

---

## Application Tables

These tables power the core onboarding platform functionality.

### `companies`

Stores company profiles and settings.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | uuid | PRIMARY KEY, DEFAULT random | Company identifier |
| `name` | text | NOT NULL | Company name |
| `industry` | text | - | Industry/sector |
| `size` | text | - | Company size (e.g., "50-200") |
| `description` | text | - | Company description |
| `website` | text | - | Company website URL |
| `created_at` | timestamp | NOT NULL, DEFAULT now() | Creation timestamp |

**Usage:**
- One company can have multiple onboarding plans
- Company owns module content and important people
- Company profile shown to all new hires

### `onboarding_templates`

Stores reusable onboarding plan templates.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | uuid | PRIMARY KEY, DEFAULT random | Template identifier |
| `company_id` | uuid | NOT NULL, FK → companies.id | Owning company |
| `name` | text | NOT NULL | Template name |
| `duration_weeks` | integer | NOT NULL | Onboarding duration in weeks |
| `description` | text | - | Template description |
| `created_at` | timestamp | NOT NULL, DEFAULT now() | Creation timestamp |

**Foreign Keys:**
- `company_id` → `companies.id` (CASCADE DELETE)

**Usage:**
- Templates define standard onboarding durations
- Can be reused across multiple new hires
- Deletion removes template but not active plans

### `onboarding_plans`

Stores individual onboarding plan instances for each new hire.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | uuid | PRIMARY KEY, DEFAULT random | Plan identifier |
| `user_id` | text | NOT NULL, FK → user.id | New hire user |
| `company_id` | uuid | NOT NULL, FK → companies.id | Company |
| `template_id` | uuid | FK → onboarding_templates.id | Source template (nullable) |
| `status` | text | NOT NULL, DEFAULT 'not_started' | Plan status |
| `start_date` | timestamp | NOT NULL | Onboarding start date |
| `current_week` | integer | NOT NULL, DEFAULT 1 | Current week number |
| `created_at` | timestamp | NOT NULL, DEFAULT now() | Creation timestamp |

**Foreign Keys:**
- `user_id` → `user.id` (CASCADE DELETE)
- `company_id` → `companies.id` (CASCADE DELETE)
- `template_id` → `onboarding_templates.id` (SET NULL on delete)

**Indexes:**
- `onboarding_plans_user_id_idx` on `user_id`

**Status Values:**
- `not_started` - Plan created but not yet started
- `in_progress` - Active onboarding
- `completed` - Onboarding finished

**Usage:**
- Each new hire has one active plan per company
- Current week tracks progress through onboarding timeline
- Associated tasks, reflections keyed to this plan

### `tasks`

Stores checklist tasks for onboarding plans.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | uuid | PRIMARY KEY, DEFAULT random | Task identifier |
| `plan_id` | uuid | NOT NULL, FK → onboarding_plans.id | Parent plan |
| `title` | text | NOT NULL | Task title |
| `description` | text | - | Task description/details |
| `category` | text | - | Task category |
| `week_number` | integer | NOT NULL | Week this task belongs to |
| `completed` | boolean | NOT NULL, DEFAULT false | Completion status |
| `completed_at` | timestamp | - | Completion timestamp |
| `order` | integer | NOT NULL, DEFAULT 0 | Display order within week |
| `created_at` | timestamp | NOT NULL, DEFAULT now() | Creation timestamp |

**Foreign Keys:**
- `plan_id` → `onboarding_plans.id` (CASCADE DELETE)

**Indexes:**
- `tasks_plan_id_idx` on `plan_id`

**Usage:**
- Tasks organized by week number (1-12 typical)
- Order field controls display sequence
- Completed tasks show timestamp for audit trail

### `module_content`

Stores learning module content (company info, product, tools, culture).

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | uuid | PRIMARY KEY, DEFAULT random | Module identifier |
| `company_id` | uuid | NOT NULL, FK → companies.id | Owning company |
| `type` | text | NOT NULL | Module type |
| `title` | text | NOT NULL | Module title |
| `content` | text | - | Markdown content |
| `order` | integer | NOT NULL, DEFAULT 0 | Display order |
| `created_at` | timestamp | NOT NULL, DEFAULT now() | Creation timestamp |

**Foreign Keys:**
- `company_id` → `companies.id` (CASCADE DELETE)

**Indexes:**
- `module_content_company_id_idx` on `company_id`

**Module Types:**
- `company_overview` - Company history, mission, values
- `product` - Product/service information
- `competitive` - Competitive landscape
- `tools` - Tools and systems training
- `culture` - Culture and norms

**Usage:**
- Content stored as Markdown for rich formatting
- Each company maintains its own modules
- New hires access modules through dashboard

### `important_people`

Stores team directory with managers, buddies, and stakeholders.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | uuid | PRIMARY KEY, DEFAULT random | Person identifier |
| `company_id` | uuid | NOT NULL, FK → companies.id | Company |
| `name` | text | NOT NULL | Person's name |
| `title` | text | NOT NULL | Job title |
| `email` | text | NOT NULL | Email address |
| `role` | text | NOT NULL | Role type |
| `photo_url` | text | - | Profile photo URL |
| `bio` | text | - | Short biography |
| `order` | integer | NOT NULL, DEFAULT 0 | Display order |
| `created_at` | timestamp | NOT NULL, DEFAULT now() | Creation timestamp |

**Foreign Keys:**
- `company_id` → `companies.id` (CASCADE DELETE)

**Indexes:**
- `important_people_company_id_idx` on `company_id`

**Role Values:**
- `manager` - Direct manager
- `buddy` - Onboarding buddy
- `stakeholder` - Key stakeholder
- `team_member` - Team member

**Usage:**
- Helps new hires know who to contact
- Photo URLs typically from Google OAuth or uploaded assets
- Order controls display sequence in team directory

### `weekly_reflections`

Stores new hire weekly reflection submissions.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | uuid | PRIMARY KEY, DEFAULT random | Reflection identifier |
| `plan_id` | uuid | NOT NULL, FK → onboarding_plans.id | Parent plan |
| `week_number` | integer | NOT NULL | Week this reflection is for |
| `submitted_at` | timestamp | NOT NULL, DEFAULT now() | Submission timestamp |
| `goals_progress` | text | - | Progress on goals |
| `challenges` | text | - | Challenges encountered |
| `clarification_needed` | text | - | Questions needing clarification |
| `confidence_level` | integer | - | Confidence rating (1-5) |
| `additional_comments` | text | - | Additional feedback |

**Foreign Keys:**
- `plan_id` → `onboarding_plans.id` (CASCADE DELETE)

**Indexes:**
- `weekly_reflections_plan_id_idx` on `plan_id`

**Usage:**
- New hires submit weekly feedback
- Managers review to catch issues early
- Confidence level tracks ramp progress (1=low, 5=high)

---

## Relationships

### Entity Relationship Diagram

```
user
├── session (1:many)
├── account (1:many)
└── onboarding_plans (1:many)

companies
├── onboarding_templates (1:many)
├── onboarding_plans (1:many)
├── module_content (1:many)
└── important_people (1:many)

onboarding_templates
└── onboarding_plans (1:many, nullable)

onboarding_plans
├── tasks (1:many)
└── weekly_reflections (1:many)
```

### Key Relationships

1. **User → Onboarding Plan**: One user can have multiple plans (different companies, different times)
2. **Company → Plans**: One company has many onboarding plans (one per new hire)
3. **Plan → Tasks**: One plan has many tasks (organized by week)
4. **Plan → Reflections**: One plan has many reflections (one per week)
5. **Company → Modules**: One company has multiple learning modules
6. **Company → People**: One company has multiple important people

### Cascade Rules

- Deleting a **user** cascades to: sessions, accounts, onboarding_plans
- Deleting a **company** cascades to: templates, plans, modules, people
- Deleting an **onboarding_plan** cascades to: tasks, reflections
- Deleting a **template** sets plan.template_id to NULL (doesn't delete plans)

---

## Indexes

Performance indexes for common query patterns:

| Index Name | Table | Column(s) | Purpose |
|------------|-------|-----------|---------|
| `onboarding_plans_user_id_idx` | onboarding_plans | user_id | Fast user plan lookup |
| `tasks_plan_id_idx` | tasks | plan_id | Fast task queries by plan |
| `module_content_company_id_idx` | module_content | company_id | Fast module lookup by company |
| `important_people_company_id_idx` | important_people | company_id | Fast people lookup by company |
| `weekly_reflections_plan_id_idx` | weekly_reflections | plan_id | Fast reflection lookup by plan |

---

## Common Queries

### Get User's Active Onboarding Plan

```typescript
import { db } from "@/lib/db";
import { onboardingPlans } from "@/lib/schema";
import { eq } from "drizzle-orm";

const plan = await db.query.onboardingPlans.findFirst({
  where: eq(onboardingPlans.userId, userId),
  with: {
    company: true,
  }
});
```

### Get All Tasks for a Plan (Grouped by Week)

```typescript
import { db } from "@/lib/db";
import { tasks } from "@/lib/schema";
import { eq, asc } from "drizzle-orm";

const planTasks = await db.query.tasks.findMany({
  where: eq(tasks.planId, planId),
  orderBy: [asc(tasks.weekNumber), asc(tasks.order)],
});
```

### Get Module Content for Company

```typescript
import { db } from "@/lib/db";
import { moduleContent } from "@/lib/schema";
import { eq, and } from "drizzle-orm";

const module = await db.query.moduleContent.findFirst({
  where: and(
    eq(moduleContent.companyId, companyId),
    eq(moduleContent.type, "company_overview")
  ),
});
```

### Get Important People for Company

```typescript
import { db } from "@/lib/db";
import { importantPeople } from "@/lib/schema";
import { eq, asc } from "drizzle-orm";

const people = await db.query.importantPeople.findMany({
  where: eq(importantPeople.companyId, companyId),
  orderBy: asc(importantPeople.order),
});
```

### Get Weekly Reflections for Plan

```typescript
import { db } from "@/lib/db";
import { weeklyReflections } from "@/lib/schema";
import { eq, desc } from "drizzle-orm";

const reflections = await db.query.weeklyReflections.findMany({
  where: eq(weeklyReflections.planId, planId),
  orderBy: desc(weeklyReflections.weekNumber),
});
```

### Create Onboarding Plan with Tasks

```typescript
import { db } from "@/lib/db";
import { onboardingPlans, tasks } from "@/lib/schema";

// Create plan
const [newPlan] = await db.insert(onboardingPlans).values({
  userId: userId,
  companyId: companyId,
  status: "not_started",
  startDate: new Date(),
  currentWeek: 1,
}).returning();

// Create tasks for the plan
await db.insert(tasks).values([
  {
    planId: newPlan.id,
    title: "Review company overview",
    weekNumber: 1,
    category: "learning",
    order: 0,
  },
  // ... more tasks
]);
```

### Toggle Task Completion

```typescript
import { db } from "@/lib/db";
import { tasks } from "@/lib/schema";
import { eq } from "drizzle-orm";

const [task] = await db.select().from(tasks).where(eq(tasks.id, taskId));

await db.update(tasks)
  .set({
    completed: !task.completed,
    completedAt: !task.completed ? new Date() : null,
  })
  .where(eq(tasks.id, taskId));
```

---

## Migration Management

### Generating Migrations

After updating `src/lib/schema.ts`:

```bash
pnpm run db:generate
```

This creates a new migration file in `drizzle/` folder.

### Applying Migrations

```bash
pnpm run db:migrate
```

This applies pending migrations to the database.

### Development Quick Push

For rapid development iteration (bypasses migrations):

```bash
pnpm run db:dev
```

**⚠️ Warning**: Only use `db:dev` in local development. Always use migrations for production.

### Viewing Database

Launch Drizzle Studio to browse data:

```bash
pnpm run db:studio
```

Opens web interface at `https://local.drizzle.studio`

---

## Best Practices

1. **Always use indexes** for foreign key columns that are frequently queried
2. **Use CASCADE DELETE** carefully - understand what gets deleted
3. **Use transactions** for multi-table operations (plan + tasks creation)
4. **Validate data** with Zod schemas before inserting
5. **Use TypeScript types** exported from schema (`Task`, `Company`, etc.)
6. **Don't store sensitive data** in plain text (use Better Auth for passwords)
7. **Use timestamps** for audit trails (created_at, completed_at, etc.)
8. **Set appropriate defaults** (status='not_started', completed=false, etc.)

---

## Schema Version

**Current Version**: 1.0.0 (Production)
**Last Updated**: Phase 6 - Production Migration Complete
**Schema File**: `src/lib/schema.ts`
