# RampRight MVP - Phased Implementation Plan

## Overview
This plan breaks the MVP into discrete, testable phases. After each phase, you can verify functionality before proceeding to the next.

---

## Phase 1: Database Foundation
**Goal:** Set up the complete database schema and verify it's working

### Tasks
1. Extend `src/lib/schema.ts` with all new tables:
   - company
   - onboarding_plan
   - task
   - module_content
   - important_person
   - weekly_reflection
   - Add `role` field to user table (manager/new_hire)

2. Generate and run migrations
   ```bash
   pnpm db:generate
   pnpm db:migrate
   ```

3. Verify with Drizzle Studio
   ```bash
   pnpm db:studio
   ```

### Verification Checklist
- [ ] All 6 new tables exist in database
- [ ] user table has `role` field
- [ ] Can view tables in Drizzle Studio
- [ ] No TypeScript errors: `pnpm typecheck`
- [ ] No lint errors: `pnpm lint`

---

## Phase 2: Company & People API
**Goal:** Create basic company and people management APIs

### Tasks
1. Create `src/app/api/companies/route.ts`
   - POST: Create company
   - GET: List companies

2. Create `src/app/api/people/route.ts`
   - GET: List people by company_id
   - POST: Add person

3. Create `src/app/api/people/[id]/route.ts`
   - PATCH: Update person

### Verification Checklist
- [ ] Can create a company via POST /api/companies
- [ ] Can list companies via GET /api/companies
- [ ] Can add people via POST /api/people
- [ ] Can list people via GET /api/people?company_id=X
- [ ] Can update person via PATCH /api/people/[id]
- [ ] Test with curl/Postman or similar
- [ ] No TypeScript errors: `pnpm typecheck`
- [ ] No lint errors: `pnpm lint`

---

## Phase 3: Onboarding Plans & Tasks API
**Goal:** Create the core onboarding plan and task management APIs

### Tasks
1. Create `src/app/api/onboarding-plans/route.ts`
   - POST: Create plan for new hire
   - GET: Get user's plans

2. Create `src/app/api/onboarding-plans/[id]/route.ts`
   - GET: Get plan details with tasks

3. Create `src/app/api/tasks/route.ts`
   - GET: List tasks by plan_id

4. Create `src/app/api/tasks/[id]/route.ts`
   - PATCH: Mark task complete

### Verification Checklist
- [ ] Can create onboarding plan via POST /api/onboarding-plans
- [ ] Can get user's plans via GET /api/onboarding-plans
- [ ] Can get plan with tasks via GET /api/onboarding-plans/[id]
- [ ] Can list tasks via GET /api/tasks?plan_id=X
- [ ] Can mark task complete via PATCH /api/tasks/[id]
- [ ] Test with curl/Postman
- [ ] No TypeScript errors: `pnpm typecheck`
- [ ] No lint errors: `pnpm lint`

---

## Phase 4: Modules & Reflections API
**Goal:** Complete the remaining API endpoints

### Tasks
1. Create `src/app/api/modules/route.ts`
   - GET: Get module content by company_id and type
   - PATCH: Update module content

2. Create `src/app/api/reflections/route.ts`
   - POST: Submit weekly reflection
   - GET: Get reflections by plan_id

3. Create `src/lib/utils/progress.ts`
   - Calculate completion percentage
   - Calculate week progress
   - Simple "what's next" logic

### Verification Checklist
- [ ] Can get modules via GET /api/modules?company_id=X&type=Y
- [ ] Can update modules via PATCH /api/modules
- [ ] Can submit reflection via POST /api/reflections
- [ ] Can get reflections via GET /api/reflections?plan_id=X
- [ ] Progress calculation functions work correctly
- [ ] Test with curl/Postman
- [ ] No TypeScript errors: `pnpm typecheck`
- [ ] No lint errors: `pnpm lint`

---

## Phase 5: Manager Setup Flow (UI)
**Goal:** Build the manager setup wizard interface

### Tasks
1. Create `src/app/admin/setup/page.tsx`
   - 4-step wizard container

2. Create `src/components/admin/SetupWizard.tsx`
   - Step 1: Company Info
   - Step 2: Select Template (GTM default)
   - Step 3: Add Content (5 modules)
   - Step 4: Invite New Hire

3. Create `src/components/admin/ModuleEditor.tsx`
   - Edit module content (5 types)

4. Create `src/components/admin/PeopleEditor.tsx`
   - Add/edit important people

5. Create default template seed data
   - Week 1-4 task templates

### Verification Checklist
- [ ] Can access /admin/setup page (as manager)
- [ ] Step 1: Can enter company name
- [ ] Step 2: Can see GTM template selected
- [ ] Step 3: Can edit all 5 module types
- [ ] Step 3: Can add/edit important people
- [ ] Step 4: Can enter new hire email
- [ ] Wizard saves data to database via APIs
- [ ] Default template creates Week 1-4 tasks
- [ ] UI looks good in light/dark mode
- [ ] No TypeScript errors: `pnpm typecheck`
- [ ] No lint errors: `pnpm lint`

---

## Phase 6: New Hire Dashboard (UI)
**Goal:** Update the new hire dashboard with real data

### Tasks
1. Update `src/app/dashboard/page.tsx`
   - Fetch user's onboarding plan
   - Display progress percentage
   - Show tasks grouped by week
   - Show team members

2. Update `src/components/OnboardingChecklist.tsx`
   - Connect to tasks API
   - Handle task completion via API

3. Update `src/components/TeamDirectory.tsx`
   - Fetch from people API

4. Update `src/components/MetricsCard.tsx`
   - Use real progress data

5. Create `src/components/WeeklyReflectionForm.tsx`
   - Form with 3-5 reflection questions
   - Submit to reflections API

### Verification Checklist
- [ ] Dashboard loads user's onboarding plan
- [ ] Progress percentage displays correctly
- [ ] Tasks grouped by week (Week 1-4)
- [ ] Can check off tasks (persists to database)
- [ ] Team directory shows important people
- [ ] Metrics show real progress data
- [ ] Weekly reflection form works
- [ ] Can submit weekly reflection
- [ ] Reflection saves to database
- [ ] UI responsive and works in light/dark mode
- [ ] No TypeScript errors: `pnpm typecheck`
- [ ] No lint errors: `pnpm lint`

---

## Phase 7: Module Content Pages
**Goal:** Create dynamic pages for viewing module content

### Tasks
1. Create `src/app/onboarding/modules/[type]/page.tsx`
   - Fetch module content by type and company_id
   - Display content nicely

2. Support all 5 module types:
   - company_overview
   - product_overview
   - competitive_landscape
   - tools_systems
   - important_people

3. Add navigation from dashboard to modules

### Verification Checklist
- [ ] Can access /onboarding/modules/company_overview
- [ ] Can access /onboarding/modules/product_overview
- [ ] Can access /onboarding/modules/competitive_landscape
- [ ] Can access /onboarding/modules/tools_systems
- [ ] Module content displays correctly
- [ ] Navigation from dashboard works
- [ ] Content formatted nicely (markdown support if needed)
- [ ] UI responsive and works in light/dark mode
- [ ] No TypeScript errors: `pnpm typecheck`
- [ ] No lint errors: `pnpm lint`

---

## Phase 8: Manager Progress View
**Goal:** Allow managers to view new hire progress

### Tasks
1. Create `src/app/admin/plans/page.tsx`
   - List all onboarding plans
   - Show basic stats per plan

2. Create `src/app/admin/plans/[id]/page.tsx`
   - Progress percentage
   - Task completion status (by week)
   - Weekly reflection summaries
   - Simple timeline

### Verification Checklist
- [ ] Can access /admin/plans (as manager)
- [ ] Lists all onboarding plans
- [ ] Shows progress for each plan
- [ ] Can click into plan detail page
- [ ] Detail page shows progress percentage
- [ ] Detail page shows task completion by week
- [ ] Detail page shows weekly reflections
- [ ] Timeline displays correctly
- [ ] UI responsive and works in light/dark mode
- [ ] No TypeScript errors: `pnpm typecheck`
- [ ] No lint errors: `pnpm lint`

---

## Phase 9: Invitation System
**Goal:** Create the invitation flow for new hires

### Tasks
1. Create `src/app/api/invitations/route.ts`
   - POST: Generate invitation token
   - Email sending (placeholder/console.log)

2. Create `src/app/invite/[token]/page.tsx`
   - Validate token
   - Create/link user account
   - Associate with onboarding plan
   - Redirect to dashboard

3. Update setup wizard to send invitation

### Verification Checklist
- [ ] Manager can send invitation from setup wizard
- [ ] Invitation token generated and stored
- [ ] Can access /invite/[token] page
- [ ] Token validation works
- [ ] Invalid token shows error
- [ ] Valid token creates/links user
- [ ] User redirected to dashboard with active plan
- [ ] Email placeholder logs to console (or actual email works)
- [ ] No TypeScript errors: `pnpm typecheck`
- [ ] No lint errors: `pnpm lint`

---

## Phase 10: End-to-End Testing & Polish
**Goal:** Complete full flow testing and polish the MVP

### Tasks
1. Test complete manager flow:
   - Sign up → Setup wizard → Create plan → Send invitation

2. Test complete new hire flow:
   - Accept invitation → View dashboard → Complete tasks → Submit reflection

3. Test manager monitoring:
   - View progress → Review reflections

4. Polish UI/UX:
   - Consistent styling
   - Error handling
   - Loading states
   - Empty states
   - Responsive design

5. Add navigation updates:
   - Update site header for role-based links
   - Add breadcrumbs where needed

### Verification Checklist
- [ ] Full manager flow works end-to-end
- [ ] Full new hire flow works end-to-end
- [ ] Manager can monitor progress accurately
- [ ] All forms have validation
- [ ] All API calls have error handling
- [ ] All pages have loading states
- [ ] All pages have empty states
- [ ] UI consistent across all pages
- [ ] Dark/light mode works everywhere
- [ ] Mobile responsive design works
- [ ] Navigation is intuitive
- [ ] No console errors
- [ ] No TypeScript errors: `pnpm typecheck`
- [ ] No lint errors: `pnpm lint`

---

## Phase 11: Documentation & Deployment Prep
**Goal:** Document the system and prepare for deployment

### Tasks
1. Update README with:
   - Feature overview
   - Setup instructions
   - User roles explained
   - API documentation

2. Create `docs/mvp/user-guide.md`:
   - Manager workflow
   - New hire workflow
   - Screenshots/examples

3. Verify environment variables in `env.example`

4. Test production build:
   ```bash
   pnpm build
   pnpm start
   ```

5. Database migration verification

### Verification Checklist
- [ ] README updated and accurate
- [ ] User guide created
- [ ] env.example has all required vars
- [ ] Production build succeeds
- [ ] Production server starts
- [ ] All features work in production mode
- [ ] Database migrations documented
- [ ] No TypeScript errors: `pnpm typecheck`
- [ ] No lint errors: `pnpm lint`

---

## Implementation Notes

### Phase Dependencies
- Phases 1-4: Backend foundation (can't skip)
- Phases 5-8: Frontend features (relatively independent)
- Phase 9: Depends on phases 1-3
- Phases 10-11: Integration and polish

### Recommended Approach
1. Complete phases sequentially
2. Verify each phase before moving to next
3. Keep dev server running for UI phases (5-8)
4. Use Drizzle Studio for database inspection
5. Test with real auth users (manager and new hire)

### Quality Gates
After EVERY phase:
- [ ] Run `pnpm typecheck` - must pass
- [ ] Run `pnpm lint` - must pass
- [ ] Manually test all verification items
- [ ] Commit working code

---

## Rollback Strategy
If a phase fails verification:
1. Review error messages from typecheck/lint
2. Check browser console for runtime errors
3. Inspect database in Drizzle Studio
4. Review API responses in Network tab
5. Fix issues before proceeding

---

## Current Status
- [ ] Phase 1: Database Foundation
- [ ] Phase 2: Company & People API
- [ ] Phase 3: Onboarding Plans & Tasks API
- [ ] Phase 4: Modules & Reflections API
- [ ] Phase 5: Manager Setup Flow (UI)
- [ ] Phase 6: New Hire Dashboard (UI)
- [ ] Phase 7: Module Content Pages
- [ ] Phase 8: Manager Progress View
- [ ] Phase 9: Invitation System
- [ ] Phase 10: End-to-End Testing & Polish
- [ ] Phase 11: Documentation & Deployment Prep
