<!-- 5b3c710e-c68b-4358-9a37-d10b8325fc1d edbbd3b1-f4fb-453c-959e-eea34c3aeb67 -->
# RightRamp MVP Implementation Plan

## Overview

Build a simple onboarding MVP that allows managers to create onboarding plans and new hires to follow structured, personalized journeys with progress tracking and weekly feedback.

---

## Step 1: Database Schema

**File:** `src/lib/schema.ts`

Add these tables:

- **company**: id, name, created_at
- **onboarding_plan**: id, user_id (new hire), company_id, start_date, status
- **task**: id, onboarding_plan_id, title, description, purpose, expected_outcome, owner (new_hire/manager), week, completed_at
- **module_content**: id, company_id, type (company_overview, product_overview, competitive_landscape, tools_systems), content (JSON)
- **important_person**: id, company_id, name, role, email, type (manager, executive_sponsor, stakeholder, peer, buddy)
- **weekly_reflection**: id, onboarding_plan_id, week_number, responses (JSON), submitted_at

**Action:** Generate and run migration (`npm run db:generate && npm run db:migrate`)

---

## Step 2: API Routes

Create these API endpoints:

**`src/app/api/companies/route.ts`**

- POST: Create company
- GET: List companies (for managers)

**`src/app/api/onboarding-plans/route.ts`**

- POST: Create plan for new hire
- GET: Get user's plan(s)
- GET `[id]`: Get plan details with tasks

**`src/app/api/tasks/route.ts`**

- GET: List tasks (filter by plan_id)
- PATCH `[id]`: Mark task complete

**`src/app/api/modules/route.ts`**

- GET: Get module content (filter by company_id, type)
- PATCH: Update module content

**`src/app/api/people/route.ts`**

- GET: List people (filter by company_id)
- POST: Add person
- PATCH `[id]`: Update person

**`src/app/api/reflections/route.ts`**

- POST: Submit weekly reflection
- GET: Get reflections (filter by plan_id)

---

## Step 3: Manager Setup Flow

**`src/app/admin/setup/page.tsx`** - Simple setup wizard with 4 steps:

1. **Company Info** - Name only (keep it light)
2. **Select Template** - Choose "GTM Onboarding Template" (default)
3. **Add Content** - Edit 5 modules:

- Company Overview (mission, vision, values, business model, metrics)
- Product Overview (what it does, personas, problems solved, pricing)
- Competitive Landscape (top 3 competitors, differentiation, battlecards)
- Tools & Systems (CRM, outreach tools, Slack norms, knowledge tools, meeting cadence)
- Important People (add manager, executive sponsor, stakeholders, peers, buddy)

4. **Invite New Hire** - Enter email, send invitation

**Components:**

- `src/components/admin/SetupWizard.tsx` - Main container
- `src/components/admin/ModuleEditor.tsx` - Edit module content
- `src/components/admin/PeopleEditor.tsx` - Add/edit people

**Default Template:** Create seed data with Week 1-4 task templates

---

## Step 4: New Hire Dashboard

**Update `src/app/dashboard/page.tsx`** to fetch real data:

- Get user's onboarding plan
- Display progress percentage
- Show tasks grouped by week
- Show team members from important_person table

**Update existing components:**

- `OnboardingChecklist.tsx` - Connect to API, persist task completion
- `TeamDirectory.tsx` - Fetch from people API
- `MetricsCard.tsx` - Use real progress data

**New component:**

- `src/components/WeeklyReflectionForm.tsx` - Form with 3-5 questions:
- "What's unclear?"
- "What's taking longer than expected?"
- "What was most helpful?"
- "Confidence score (1-10)"

---

## Step 5: Module Content Pages

**`src/app/onboarding/modules/[type]/page.tsx`** - Dynamic page showing:

- Company Overview
- Product Overview
- Competitive Landscape
- Tools & Systems

Each page displays content from `module_content` table based on company_id and type.

---

## Step 6: Manager Progress View

**`src/app/admin/plans/page.tsx`** - List all onboarding plans
**`src/app/admin/plans/[id]/page.tsx`** - View individual plan:

- Progress percentage
- Task completion status
- Weekly reflection summaries
- Simple timeline

---

## Step 7: Invitation System

**`src/app/api/invitations/route.ts`**

- POST: Generate invitation token, send email (placeholder for now)

**`src/app/invite/[token]/page.tsx`**

- Validate token
- Create user account if needed
- Link to onboarding plan
- Redirect to dashboard

---

## Step 8: Progress Calculation

**`src/lib/utils/progress.ts`**

- Calculate completion % (tasks completed / total tasks)
- Calculate week progress
- Simple "what's next" logic

---

## Implementation Order

1. **Step 1** - Database schema (foundation)
2. **Step 2** - API routes (backend)
3. **Step 3** - Manager setup (admin interface)
4. **Step 4** - New hire dashboard (main UX)
5. **Step 5** - Module pages (content viewing)
6. **Step 6** - Manager progress view (visibility)
7. **Step 7** - Invitations (onboarding flow)
8. **Step 8** - Progress logic (calculations)

---

## Key Simplifications (MVP)

- **One default template** - "GTM Onboarding Template" pre-populated
- **Simple role detection** - Add `role` field to user table (manager/new_hire)
- **No email service** - Invitation links work, email sending is placeholder
- **Fixed week structure** - Week 1-4, not customizable
- **JSON content storage** - Flexible module content as JSON
- **Basic progress** - Simple percentage, no advanced analytics

---

## Files to Create/Modify

**New Files:**

- `src/lib/schema.ts` (extend)
- `src/app/api/companies/route.ts`
- `src/app/api/onboarding-plans/route.ts`
- `src/app/api/tasks/route.ts`
- `src/app/api/modules/route.ts`
- `src/app/api/people/route.ts`
- `src/app/api/reflections/route.ts`
- `src/app/api/invitations/route.ts`
- `src/app/admin/setup/page.tsx`
- `src/app/admin/plans/page.tsx`
- `src/app/admin/plans/[id]/page.tsx`
- `src/app/onboarding/modules/[type]/page.tsx`
- `src/app/invite/[token]/page.tsx`
- `src/components/admin/SetupWizard.tsx`
- `src/components/admin/ModuleEditor.tsx`
- `src/components/admin/PeopleEditor.tsx`
- `src/components/WeeklyReflectionForm.tsx`
- `src/lib/utils/progress.ts`

**Modify Existing:**

- `src/app/dashboard/page.tsx` - Connect to real data
- `src/components/OnboardingChecklist.tsx` - API integration
- `src/components/TeamDirectory.tsx` - API integration
- `src/components/MetricsCard.tsx` - Real data

