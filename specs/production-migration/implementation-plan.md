# Production Migration Implementation Plan

## Overview
This implementation plan outlines the phased approach to migrate RampRight from a demo application to a production-ready system with real database integration and a refocused landing page.

**Total Estimated Time**: 9-11 hours
**Recommended Approach**: Complete phases 1-2 together, then 3-4 together, then 5-6

---

## Phase 1: Dark Mode System Default ⚡

**Estimated Time**: 5 minutes
**Risk Level**: None
**Dependencies**: None

### Objective
Update the theme provider to default to system settings instead of light mode.

### Tasks

#### File: `src/components/theme-provider.tsx`
- [x] Change default theme from `"light"` to `"system"` ✅ (Already set in src/app/layout.tsx:35)
- [x] Verify defaultTheme prop in ThemeProvider component ✅
- [x] Test theme switching (light/dark/system modes) ✅ (enableSystem=true configured)

#### Verification
- [x] Dark mode respects system preferences on first load ✅ (defaultTheme="system" configured)
- [x] User can still manually override to light/dark ✅ (mode-toggle component available)
- [x] Theme preference persists across sessions ✅ (next-themes handles persistence)

---

## Phase 2: Landing Page Refactor & Demo Removal 🎨

**Estimated Time**: 45 minutes - 1 hour
**Risk Level**: Low
**Dependencies**: None

### Objective
Refocus landing page on HR/hiring managers, remove all demo UI components, and clean up demo-related code.

### Part A: Landing Page Refactor

#### File: `src/app/page.tsx`
- [ ] Remove demo access cards section (Manager View / New Hire View)
- [ ] Delete `handleDemoAccess()` function
- [ ] Remove localStorage demo role logic
- [ ] Update hero section copy to target HR/hiring managers
  - [ ] Change headline to manager-focused messaging
  - [ ] Update subheading to emphasize structured onboarding
- [ ] Update feature highlights section
  - [ ] "Create custom onboarding plans in minutes"
  - [ ] "Track progress across all new hires"
  - [ ] "Automated weekly check-ins and reflections"
  - [ ] "Centralized resources and key contacts"
- [ ] Update primary CTA button to route to `/admin/setup`
- [ ] Update CTA button text to "Get Started" or "Create Your First Plan"
- [ ] Add localStorage cleanup for demo keys on page load:
  ```typescript
  localStorage.removeItem('demo-user-role');
  localStorage.removeItem('demo-task-completions');
  localStorage.removeItem('demo-reflections');
  localStorage.removeItem('demo-setup-data');
  ```
- [ ] Update metrics/stats to be HR-focused
  - [ ] "50% faster time-to-productivity"
  - [ ] "90% new hire satisfaction"
  - [ ] "Zero onboarding tasks forgotten"

### Part B: Navigation Header Update

#### File: `src/components/site-header.tsx`
- [ ] Update "Sign Up" or "Get Started" button to route to `/admin/setup`
- [ ] Remove any "Dashboard" or "New Hire" links from public navigation
- [ ] Update authenticated state routing logic:
  - [ ] No company → redirect to `/admin/setup`
  - [ ] Has company, is admin → redirect to `/admin/plans`
  - [ ] Has plan, is new hire → redirect to `/dashboard`
- [ ] Ensure proper auth state checks

### Part C: Delete Demo Components

- [ ] Delete `src/components/DemoResetButton.tsx`
- [ ] Delete `src/components/RoleSwitcher.tsx`
- [ ] Search codebase for imports of deleted components
- [ ] Remove any imports from:
  - [ ] `src/app/layout.tsx`
  - [ ] `src/components/site-header.tsx`
  - [ ] Any admin layout files

### Part D: Documentation Cleanup

- [ ] Delete `docs/demo-guide.md`
- [ ] Update `README.md`:
  - [ ] Remove demo instructions
  - [ ] Add HR manager focus in overview
  - [ ] Update getting started section
  - [ ] Add placeholder for "How to invite new hires" (Phase 3)

### Verification
- [ ] Landing page shows HR/manager-focused messaging
- [ ] No demo UI elements visible anywhere
- [ ] "Get Started" CTA routes to `/admin/setup`
- [ ] localStorage demo keys are cleaned up
- [ ] Run `npm run lint` - passes with no errors
- [ ] Run `npm run typecheck` - passes with no errors
- [ ] Visual inspection: landing page looks professional for B2B audience

---

## Phase 3: Database Schema & API Foundation 🗄️

**Estimated Time**: 2-3 hours
**Risk Level**: Medium
**Dependencies**: PostgreSQL configured

### Objective
Create comprehensive database schema and API route structure to replace mock data layer.

### Part A: Database Schema

#### File: `src/lib/schema.ts`

- [ ] Create `companies` table:
  ```typescript
  - id (uuid, primary key)
  - name (text, required)
  - industry (text)
  - size (text)
  - description (text)
  - website (text)
  - createdAt (timestamp)
  ```

- [ ] Create `onboardingTemplates` table:
  ```typescript
  - id (uuid, primary key)
  - companyId (uuid, foreign key → companies.id)
  - name (text, required)
  - durationWeeks (integer)
  - description (text)
  - createdAt (timestamp)
  ```

- [ ] Create `onboardingPlans` table:
  ```typescript
  - id (uuid, primary key)
  - userId (text, foreign key → users.id)
  - companyId (uuid, foreign key → companies.id)
  - templateId (uuid, foreign key → onboardingTemplates.id, nullable)
  - status (text: 'not_started', 'in_progress', 'completed')
  - startDate (timestamp)
  - currentWeek (integer)
  - createdAt (timestamp)
  ```

- [ ] Create `tasks` table:
  ```typescript
  - id (uuid, primary key)
  - planId (uuid, foreign key → onboardingPlans.id)
  - title (text, required)
  - description (text)
  - category (text)
  - weekNumber (integer, required)
  - completed (boolean, default false)
  - completedAt (timestamp, nullable)
  - order (integer)
  - createdAt (timestamp)
  ```

- [ ] Create `moduleContent` table:
  ```typescript
  - id (uuid, primary key)
  - companyId (uuid, foreign key → companies.id)
  - type (enum: 'company_overview', 'product', 'competitive', 'tools', 'culture')
  - title (text, required)
  - content (text, markdown)
  - order (integer)
  - createdAt (timestamp)
  ```

- [ ] Create `importantPeople` table:
  ```typescript
  - id (uuid, primary key)
  - companyId (uuid, foreign key → companies.id)
  - name (text, required)
  - title (text, required)
  - email (text, required)
  - role (text: 'manager', 'buddy', 'stakeholder', 'team_member')
  - photoUrl (text, nullable)
  - bio (text)
  - order (integer)
  - createdAt (timestamp)
  ```

- [ ] Create `weeklyReflections` table:
  ```typescript
  - id (uuid, primary key)
  - planId (uuid, foreign key → onboardingPlans.id)
  - weekNumber (integer, required)
  - submittedAt (timestamp)
  - goalsProgress (text)
  - challenges (text)
  - clarificationNeeded (text)
  - confidenceLevel (integer, 1-5)
  - additionalComments (text)
  ```

- [ ] Add indexes for performance:
  - [ ] Index on `onboardingPlans.userId`
  - [ ] Index on `tasks.planId`
  - [ ] Index on `moduleContent.companyId`
  - [ ] Index on `importantPeople.companyId`
  - [ ] Index on `weeklyReflections.planId`

#### Database Migration
- [ ] Run `npm run db:generate` to generate migration files
- [ ] Review generated SQL migration
- [ ] Run `npm run db:migrate` to apply migration
- [ ] Verify tables created in database (use `npm run db:studio`)

### Part B: API Route Structure

#### Create API Route Files (empty shells with TypeScript types)

**Company Management**:
- [ ] Create `src/app/api/companies/route.ts`
  - [ ] POST handler stub (create company)
  - [ ] Add TypeScript types for request/response
- [ ] Create `src/app/api/companies/[id]/route.ts`
  - [ ] GET handler stub (get company)
  - [ ] PATCH handler stub (update company)
  - [ ] Add TypeScript types

**Onboarding Plans**:
- [ ] Create `src/app/api/onboarding/plans/route.ts`
  - [ ] POST handler stub (create plan)
  - [ ] Add TypeScript types
- [ ] Create `src/app/api/onboarding/plans/[id]/route.ts`
  - [ ] GET handler stub (get plan details)
  - [ ] PATCH handler stub (update plan)
  - [ ] Add TypeScript types
- [ ] Create `src/app/api/onboarding/plans/user/[userId]/route.ts`
  - [ ] GET handler stub (get user's plan)
  - [ ] Add TypeScript types

**Tasks**:
- [ ] Create `src/app/api/tasks/[planId]/route.ts`
  - [ ] GET handler stub (get all tasks)
  - [ ] POST handler stub (create task)
  - [ ] Add TypeScript types
- [ ] Create `src/app/api/tasks/[id]/toggle/route.ts`
  - [ ] PATCH handler stub (toggle completion)
  - [ ] Add TypeScript types
- [ ] Create `src/app/api/tasks/[id]/route.ts`
  - [ ] DELETE handler stub (delete task)
  - [ ] Add TypeScript types

**Module Content**:
- [ ] Create `src/app/api/modules/[companyId]/route.ts`
  - [ ] GET handler stub (get all modules)
  - [ ] POST handler stub (create/update module)
  - [ ] Add TypeScript types
- [ ] Create `src/app/api/modules/[companyId]/[type]/route.ts`
  - [ ] GET handler stub (get specific module)
  - [ ] Add TypeScript types
- [ ] Create `src/app/api/modules/[id]/route.ts`
  - [ ] DELETE handler stub (delete module)
  - [ ] Add TypeScript types

**Important People**:
- [ ] Create `src/app/api/people/[companyId]/route.ts`
  - [ ] GET handler stub (get all people)
  - [ ] POST handler stub (add person)
  - [ ] Add TypeScript types
- [ ] Create `src/app/api/people/[id]/route.ts`
  - [ ] PATCH handler stub (update person)
  - [ ] DELETE handler stub (delete person)
  - [ ] Add TypeScript types

**Reflections**:
- [ ] Create `src/app/api/reflections/[planId]/route.ts`
  - [ ] GET handler stub (get all reflections)
  - [ ] POST handler stub (submit reflection)
  - [ ] Add TypeScript types

### Part C: Shared API Utilities

#### Create `src/lib/api-utils.ts`
- [ ] Create `getAuthSession()` helper function
- [ ] Create `requireAuth()` middleware
- [ ] Create `requireCompanyAccess()` authorization helper
- [ ] Create error response helpers:
  - [ ] `errorResponse(message, status)`
  - [ ] `validationError(errors)`
  - [ ] `unauthorizedError()`
  - [ ] `notFoundError()`
- [ ] Create success response helpers:
  - [ ] `successResponse(data, status?)`
  - [ ] `createdResponse(data)`

#### Create `src/lib/validators.ts`
- [ ] Create Zod schemas for all entities:
  - [ ] Company schema
  - [ ] OnboardingPlan schema
  - [ ] Task schema
  - [ ] ModuleContent schema
  - [ ] ImportantPerson schema
  - [ ] WeeklyReflection schema
- [ ] Export validation functions

### Verification
- [ ] All database tables created successfully
- [ ] Database Studio shows correct schema
- [ ] All API route files created with proper structure
- [ ] TypeScript compilation succeeds
- [ ] Run `npm run typecheck` - passes
- [ ] Run `npm run lint` - passes

---

## Phase 4: Implement API Logic & Replace Mock Data 🔄

**Estimated Time**: 4-5 hours
**Risk Level**: High
**Dependencies**: Phase 3 complete

### Objective
Implement full CRUD functionality in all API routes and update all components to use real data instead of mock data.

### Part A: Implement API Routes

#### Company Management APIs

**File: `src/app/api/companies/route.ts`**
- [ ] Implement POST `/api/companies` (create company):
  - [ ] Validate request body with Zod schema
  - [ ] Check authentication
  - [ ] Insert company into database
  - [ ] Return created company with 201 status
  - [ ] Handle errors (validation, database, auth)

**File: `src/app/api/companies/[id]/route.ts`**
- [ ] Implement GET `/api/companies/:id`:
  - [ ] Check authentication
  - [ ] Check user has access to this company
  - [ ] Fetch company from database
  - [ ] Return company or 404
- [ ] Implement PATCH `/api/companies/:id`:
  - [ ] Validate request body
  - [ ] Check authentication and authorization
  - [ ] Update company in database
  - [ ] Return updated company

#### Onboarding Plan APIs

**File: `src/app/api/onboarding/plans/route.ts`**
- [ ] Implement POST `/api/onboarding/plans`:
  - [ ] Validate request body
  - [ ] Check authentication
  - [ ] Create plan with associated tasks
  - [ ] Return created plan with 201

**File: `src/app/api/onboarding/plans/[id]/route.ts`**
- [ ] Implement GET `/api/onboarding/plans/:id`:
  - [ ] Check authentication and authorization
  - [ ] Fetch plan with related data (company, user info)
  - [ ] Return plan or 404
- [ ] Implement PATCH `/api/onboarding/plans/:id`:
  - [ ] Validate request body
  - [ ] Check authentication and authorization
  - [ ] Update plan (status, currentWeek, etc.)
  - [ ] Return updated plan

**File: `src/app/api/onboarding/plans/user/[userId]/route.ts`**
- [ ] Implement GET `/api/onboarding/plans/user/:userId`:
  - [ ] Check authentication (must be user themselves or manager)
  - [ ] Fetch user's active plan
  - [ ] Return plan or 404

#### Task APIs

**File: `src/app/api/tasks/[planId]/route.ts`**
- [ ] Implement GET `/api/tasks/:planId`:
  - [ ] Check authentication and plan access
  - [ ] Fetch all tasks for plan (ordered by weekNumber, order)
  - [ ] Return tasks array
- [ ] Implement POST `/api/tasks/:planId`:
  - [ ] Validate request body
  - [ ] Check authentication and authorization
  - [ ] Create task
  - [ ] Return created task with 201

**File: `src/app/api/tasks/[id]/toggle/route.ts`**
- [ ] Implement PATCH `/api/tasks/:id/toggle`:
  - [ ] Check authentication and task access
  - [ ] Toggle completed status
  - [ ] Set/clear completedAt timestamp
  - [ ] Return updated task

**File: `src/app/api/tasks/[id]/route.ts`**
- [ ] Implement DELETE `/api/tasks/:id`:
  - [ ] Check authentication and authorization (managers only)
  - [ ] Delete task from database
  - [ ] Return 204 No Content

#### Module Content APIs

**File: `src/app/api/modules/[companyId]/route.ts`**
- [ ] Implement GET `/api/modules/:companyId`:
  - [ ] Check authentication and company access
  - [ ] Fetch all modules for company (ordered)
  - [ ] Return modules array
- [ ] Implement POST `/api/modules/:companyId`:
  - [ ] Validate request body
  - [ ] Check authentication and authorization
  - [ ] Upsert module content
  - [ ] Return module

**File: `src/app/api/modules/[companyId]/[type]/route.ts`**
- [ ] Implement GET `/api/modules/:companyId/:type`:
  - [ ] Check authentication and company access
  - [ ] Fetch specific module by type
  - [ ] Return module or 404

**File: `src/app/api/modules/[id]/route.ts`**
- [ ] Implement DELETE `/api/modules/:id`:
  - [ ] Check authentication and authorization
  - [ ] Delete module
  - [ ] Return 204

#### Important People APIs

**File: `src/app/api/people/[companyId]/route.ts`**
- [ ] Implement GET `/api/people/:companyId`:
  - [ ] Check authentication and company access
  - [ ] Fetch all people for company (ordered)
  - [ ] Return people array
- [ ] Implement POST `/api/people/:companyId`:
  - [ ] Validate request body
  - [ ] Check authentication and authorization
  - [ ] Create person
  - [ ] Return created person with 201

**File: `src/app/api/people/[id]/route.ts`**
- [ ] Implement PATCH `/api/people/:id`:
  - [ ] Validate request body
  - [ ] Check authentication and authorization
  - [ ] Update person
  - [ ] Return updated person
- [ ] Implement DELETE `/api/people/:id`:
  - [ ] Check authentication and authorization
  - [ ] Delete person
  - [ ] Return 204

#### Reflections APIs

**File: `src/app/api/reflections/[planId]/route.ts`**
- [ ] Implement GET `/api/reflections/:planId`:
  - [ ] Check authentication and plan access
  - [ ] Fetch all reflections for plan (ordered by weekNumber)
  - [ ] Return reflections array
- [ ] Implement POST `/api/reflections/:planId`:
  - [ ] Validate request body
  - [ ] Check authentication and authorization
  - [ ] Create reflection with submittedAt timestamp
  - [ ] Return created reflection with 201

### Part B: Update Components to Use Real APIs

#### Priority 1: Core User Flows

**File: `src/app/dashboard/page.tsx`**
- [ ] Remove all imports from `@/lib/mock-api`
- [ ] Create async function to fetch onboarding plan via API:
  - [ ] `GET /api/onboarding/plans/user/${userId}`
- [ ] Create async function to fetch tasks:
  - [ ] `GET /api/tasks/${planId}`
- [ ] Create async function to fetch important people:
  - [ ] `GET /api/people/${companyId}`
- [ ] Create async function to fetch reflections:
  - [ ] `GET /api/reflections/${planId}`
- [ ] Create async function to fetch modules:
  - [ ] `GET /api/modules/${companyId}`
- [ ] Update component to use fetched data
- [ ] Add error handling and display error states
- [ ] Add loading states if needed

**File: `src/components/OnboardingChecklist.tsx`**
- [ ] Remove mock data imports
- [ ] Accept tasks as prop from parent (already fetched)
- [ ] Update task toggle handler:
  - [ ] Call `PATCH /api/tasks/${taskId}/toggle`
  - [ ] Update local state optimistically
  - [ ] Handle errors with rollback
  - [ ] Show success/error toast notifications
- [ ] Add loading state during toggle
- [ ] Remove any console.log statements

**File: `src/components/WeeklyReflectionForm.tsx`**
- [ ] Remove mock data imports
- [ ] Update form submission handler:
  - [ ] Call `POST /api/reflections/${planId}`
  - [ ] Show loading state during submission
  - [ ] Show success message on completion
  - [ ] Handle errors with user-friendly messages
  - [ ] Clear form on success
- [ ] Remove console.log statements
- [ ] Add proper error boundaries

#### Priority 2: Admin/Manager Flows

**File: `src/components/admin/SetupWizard.tsx`**
- [ ] Remove all mock data pre-population
- [ ] Update form submission to call real APIs:
  - [ ] Step 1: Create company (`POST /api/companies`)
  - [ ] Step 2: Create onboarding template (if needed)
  - [ ] Step 3: Create module content (`POST /api/modules/${companyId}`)
  - [ ] Step 4: Add important people (`POST /api/people/${companyId}`)
  - [ ] Step 5: Create onboarding plan (`POST /api/onboarding/plans`)
- [ ] Add loading states between steps
- [ ] Add error handling at each step
- [ ] Show success confirmation at the end
- [ ] Remove console.log statements
- [ ] Add ability to save progress and resume

**File: `src/components/admin/ModuleEditor.tsx`**
- [ ] Remove mock data imports
- [ ] Fetch module content via API:
  - [ ] `GET /api/modules/${companyId}/${moduleType}`
- [ ] Update save handler:
  - [ ] Call `POST /api/modules/${companyId}`
  - [ ] Show loading state during save
  - [ ] Show success/error feedback
- [ ] Add autosave functionality (optional)
- [ ] Remove console.log statements

**File: `src/components/admin/PeopleEditor.tsx`**
- [ ] Remove mock data imports
- [ ] Fetch people via API:
  - [ ] `GET /api/people/${companyId}`
- [ ] Implement add person handler:
  - [ ] `POST /api/people/${companyId}`
  - [ ] Update UI with new person
  - [ ] Show success feedback
- [ ] Implement update person handler:
  - [ ] `PATCH /api/people/${personId}`
  - [ ] Update UI
  - [ ] Show success feedback
- [ ] Implement delete person handler:
  - [ ] `DELETE /api/people/${personId}`
  - [ ] Remove from UI with confirmation
  - [ ] Show success feedback
- [ ] Add proper error handling
- [ ] Remove console.log statements

**File: `src/components/admin/ProgressTimeline.tsx`**
- [ ] Remove mock data imports
- [ ] Fetch all plans for company (create endpoint if needed):
  - [ ] `GET /api/onboarding/plans?companyId=${companyId}`
- [ ] For each plan, fetch tasks to calculate progress:
  - [ ] `GET /api/tasks/${planId}`
- [ ] Display real progress data
- [ ] Add loading states
- [ ] Handle errors gracefully

**File: `src/components/admin/ReflectionSummary.tsx`**
- [ ] Remove mock data imports
- [ ] Fetch reflections via API:
  - [ ] `GET /api/reflections/${planId}`
- [ ] Display real reflection data
- [ ] Add filters/sorting if needed
- [ ] Add loading states
- [ ] Handle empty states (no reflections yet)

#### Priority 3: Content Display

**File: `src/components/onboarding/ModuleViewer.tsx`**
- [ ] Remove mock data imports
- [ ] Fetch module content via API:
  - [ ] `GET /api/modules/${companyId}/${moduleType}`
- [ ] Display fetched markdown content
- [ ] Add loading state
- [ ] Handle errors (module not found)
- [ ] Add empty state messaging

**File: `src/components/TeamDirectory.tsx`**
- [ ] Remove mock data imports
- [ ] Accept people as prop from parent (already fetched)
- [ ] Display real people data
- [ ] Add empty state if no people added yet
- [ ] Handle missing photo URLs gracefully

### Part C: Remove Console Logging

- [ ] Search codebase for `console.log` statements
- [ ] Replace with proper error handling or remove
- [ ] Search for `console.error` and ensure proper error reporting
- [ ] Search for `console.warn` and address warnings

### Verification
- [ ] All API endpoints return expected data
- [ ] All components display real database data
- [ ] Task completion toggle works and persists
- [ ] Weekly reflection submission works
- [ ] Setup wizard creates all data successfully
- [ ] Module editor saves content to database
- [ ] People editor CRUD operations work
- [ ] No console.log statements in code
- [ ] Error messages are user-friendly
- [ ] Loading states appear during async operations
- [ ] Run `npm run typecheck` - passes
- [ ] Run `npm run lint` - passes

---

## Phase 5: Clean Up Mock Data Files 🧹

**Estimated Time**: 30 minutes
**Risk Level**: Low
**Dependencies**: Phase 4 complete

### Objective
Remove all mock data files and ensure no references remain in the codebase.

### Part A: Delete Mock Data Files

- [ ] Delete `src/lib/mock-data.ts`
- [ ] Delete `src/lib/mock-api.ts`
- [ ] Delete `specs/mvp-implementation-plan/frontend-demo-plan.md` (if exists)

### Part B: Search for Remaining References

- [ ] Search codebase for `mock-data` string
  - [ ] Remove any import statements
  - [ ] Update any references
- [ ] Search codebase for `mock-api` string
  - [ ] Remove any import statements
  - [ ] Update any references
- [ ] Search codebase for `mockUsers`, `mockCompany`, `mockTemplate`, etc.
  - [ ] Remove any references
- [ ] Search for `"mock"` string across all files
  - [ ] Review results and clean up

### Part C: Clean Up localStorage

**File: `src/app/layout.tsx` or appropriate initialization file**
- [ ] Ensure localStorage cleanup runs on app initialization
- [ ] Remove all demo-related keys:
  ```typescript
  localStorage.removeItem('demo-user-role');
  localStorage.removeItem('demo-task-completions');
  localStorage.removeItem('demo-reflections');
  localStorage.removeItem('demo-setup-data');
  ```

### Verification
- [ ] Mock data files successfully deleted
- [ ] No import errors in codebase
- [ ] Search for "mock" returns no relevant results
- [ ] Run `npm run typecheck` - passes with no errors
- [ ] Run `npm run lint` - passes with no errors
- [ ] Application builds successfully: `npm run build`

---

## Phase 6: Documentation & Final Polish 📝

**Estimated Time**: 1 hour
**Risk Level**: Low
**Dependencies**: All previous phases complete

### Objective
Update all documentation to reflect production-ready application and perform final quality checks.

### Part A: Update Documentation Files

**File: `README.md`**
- [ ] Update project description to remove demo references
- [ ] Add section: "Getting Started for HR Managers"
  - [ ] Explain signup flow
  - [ ] Explain setup wizard
  - [ ] Explain creating first onboarding plan
- [ ] Add section: "How New Hires Access the Platform"
  - [ ] Explain invitation process (even if email sending is placeholder)
  - [ ] Explain new hire dashboard
- [ ] Update environment variables section if needed
- [ ] Update scripts section
- [ ] Add database setup instructions
- [ ] Remove any demo-related instructions

**File: `CLAUDE.md`**
- [ ] Remove "Mock Data" sections
- [ ] Remove references to `mock-data.ts` and `mock-api.ts`
- [ ] Update project structure to show API routes
- [ ] Add section on database schema
- [ ] Update guidelines for AI assistants:
  - [ ] Remove mock data references
  - [ ] Add API development guidelines
  - [ ] Add database migration guidelines

**Create: `docs/database-schema.md`**
- [ ] Document all tables with field descriptions
- [ ] Show relationships between tables
- [ ] Include indexes and constraints
- [ ] Add sample queries for common operations
- [ ] Document migration process

**Create: `docs/api-reference.md`**
- [ ] Document all API endpoints
- [ ] Include request/response examples
- [ ] Document authentication requirements
- [ ] Document error responses
- [ ] Add usage examples for each endpoint

### Part B: Create Seed Data Script (Optional but Recommended)

**File: `src/scripts/seed-data.ts`**
- [ ] Create script to populate initial company data
- [ ] Create sample onboarding template
- [ ] Create sample module content
- [ ] Create sample important people
- [ ] Add instructions for running seed script to README

### Part C: Final Quality Checks

#### Code Quality
- [ ] Run `npm run lint` - ensure no errors or warnings
- [ ] Run `npm run typecheck` - ensure no TypeScript errors
- [ ] Run `npm run build` - ensure production build succeeds
- [ ] Check for any remaining TODO comments in code
- [ ] Check for any remaining console.log statements
- [ ] Verify all error handling is in place

#### Functionality Testing
- [ ] Test signup flow → setup wizard
- [ ] Test creating a new company and onboarding plan
- [ ] Test adding module content
- [ ] Test adding important people
- [ ] Test task completion toggle
- [ ] Test weekly reflection submission
- [ ] Test dark mode (system/light/dark)
- [ ] Test responsive design on mobile

#### Security Checks
- [ ] Verify all API routes require authentication
- [ ] Verify company-level data isolation (users can't access other companies)
- [ ] Check for SQL injection vulnerabilities (Drizzle ORM protects, but verify)
- [ ] Check for XSS vulnerabilities in markdown rendering
- [ ] Verify sensitive data is not logged

#### Performance Checks
- [ ] Check for N+1 query problems in API routes
- [ ] Verify database indexes are in place
- [ ] Test with larger datasets (many tasks, modules, etc.)
- [ ] Check bundle size: `npm run build` and review output
- [ ] Check for unnecessary re-renders in React components

### Part D: Commit and Documentation

- [ ] Create comprehensive commit message documenting migration
- [ ] Update CHANGELOG.md (if exists) or create one
- [ ] Tag release as `v1.0.0-production-ready` or similar
- [ ] Push to `stage` branch
- [ ] Create pull request to `main` with detailed description

### Verification Checklist

#### Code
- [ ] ✅ No TypeScript errors
- [ ] ✅ No ESLint errors or warnings
- [ ] ✅ Production build succeeds
- [ ] ✅ No console.log in production code
- [ ] ✅ No mock data references

#### Documentation
- [ ] ✅ README.md updated
- [ ] ✅ CLAUDE.md updated
- [ ] ✅ Database schema documented
- [ ] ✅ API reference created
- [ ] ✅ All demo docs removed

#### Functionality
- [ ] ✅ Signup flow works end-to-end
- [ ] ✅ Setup wizard creates real data
- [ ] ✅ Dashboard displays real data
- [ ] ✅ Task completion persists
- [ ] ✅ Reflections submit successfully
- [ ] ✅ Dark mode defaults to system

#### Database
- [ ] ✅ All tables created
- [ ] ✅ Migrations applied
- [ ] ✅ Indexes in place
- [ ] ✅ Foreign keys enforced

#### APIs
- [ ] ✅ All endpoints functional
- [ ] ✅ Authentication required
- [ ] ✅ Authorization enforced
- [ ] ✅ Errors handled gracefully

---

## Post-Migration Tasks (Future Enhancements)

These are out of scope for this migration but recommended for future development:

- [ ] Implement real email invitation system (currently placeholder)
- [ ] Add unit tests for API routes
- [ ] Add E2E tests for critical flows
- [ ] Add onboarding plan templates library
- [ ] Implement analytics and reporting
- [ ] Add Slack/Teams integrations
- [ ] Implement AI-powered onboarding recommendations
- [ ] Add mobile app or improve mobile web experience
- [ ] Add payment/billing for multi-company plans
- [ ] Implement role-based permissions (admin, manager, viewer)

---

## Rollback Plan

If issues are encountered during migration:

1. **Phase 1-2**: Simple revert of commits (no data migration)
2. **Phase 3**: Rollback database migration: `npm run db:rollback`
3. **Phase 4-5**: Restore mock data files from demo branch
4. **Phase 6**: Documentation can be updated at any time

**Important**: Always commit after each phase completion to enable easy rollback.

---

## Success Criteria

Migration is considered complete when:

- [ ] All 6 phases completed
- [ ] All tasks in each phase checked off
- [ ] All verification checklists pass
- [ ] Application is production-ready for real users
- [ ] Documentation is complete and accurate
- [ ] Code quality gates pass (lint, typecheck, build)

**Estimated Total Time**: 9-11 hours over 3-4 work sessions
