# RampRight MVP - Frontend Demo Implementation Plan (Mock Data)

## Overview
Build the frontend UI for the onboarding MVP using mock data for demo purposes. No backend/database work required.

---

## Phase 1: Mock Data Setup
**Goal:** Create all mock data structures to power the frontend components

### Tasks
1. Create `src/lib/mock-data.ts` with:
   - Mock company data
   - Mock onboarding plan
   - Mock tasks (Week 1-4) with GTM template
   - Mock module content (5 types)
   - Mock important people
   - Mock weekly reflections
   - Mock users (manager & new hire)

2. Create `src/lib/mock-api.ts` with helper functions:
   - `getOnboardingPlan(userId)`
   - `getTasks(planId)`
   - `getModuleContent(type)`
   - `getImportantPeople()`
   - `getReflections(planId)`
   - `calculateProgress(tasks)`

### Verification Checklist
- [x] Mock data file created with realistic data
- [x] Mock API functions return expected data
- [x] Week 1-4 tasks for GTM template included
- [x] All 5 module types have content
- [x] Important people list populated
- [x] No TypeScript errors: `pnpm typecheck`
- [x] No lint errors: `pnpm lint`

---

## Phase 2: Manager Setup Flow (UI Only)
**Goal:** Build the manager setup wizard interface with mock data

### Tasks
1. Create `src/app/admin/setup/page.tsx`
   - 4-step wizard container
   - Use local state to collect data
   - Console.log final data (no API calls)

2. Create `src/components/admin/SetupWizard.tsx`
   - Step navigation (stepper component)
   - Step 1: Company Info form
   - Step 2: Template selection (GTM default)
   - Step 3: Content editing tabs
   - Step 4: Invite new hire form

3. Create `src/components/admin/ModuleEditor.tsx`
   - Editable form for each module type:
     - Company Overview
     - Product Overview
     - Competitive Landscape
     - Tools & Systems
   - Pre-populated with mock data
   - Uses textarea/rich text for content

4. Create `src/components/admin/PeopleEditor.tsx`
   - Add/edit important people
   - Form fields: name, role, email, type
   - List view with edit/delete
   - Pre-populated with mock data

### Verification Checklist
- [x] Can access /admin/setup page
- [x] Step 1: Company info form works
- [x] Step 2: Template selection UI displays
- [x] Step 3: All 5 module editors work
- [x] Step 3: People editor add/edit/delete works
- [x] Step 4: Invite form accepts email
- [x] Step navigation (next/back) works
- [x] Final step console.logs collected data
- [x] UI styled with shadcn/ui components
- [x] Responsive design works
- [x] Dark/light mode works
- [x] No TypeScript errors: `pnpm typecheck`
- [x] No lint errors: `pnpm lint`

---

## Phase 3: New Hire Dashboard (UI Only)
**Goal:** Update the dashboard with mock data integration

### Tasks
1. Update `src/app/dashboard/page.tsx`
   - Import mock data functions
   - Display mock onboarding plan
   - Show progress percentage (from mock)
   - Group tasks by week
   - Display team members

2. Update `src/components/OnboardingChecklist.tsx`
   - Accept tasks as props
   - Handle checkbox toggle with local state
   - Visual feedback for completion
   - Group by week accordion/tabs

3. Update `src/components/TeamDirectory.tsx`
   - Accept people as props
   - Display with avatars
   - Contact info (email)
   - Role badges

4. Update `src/components/MetricsCard.tsx`
   - Accept progress data as props
   - Display completion percentage
   - Show completed/total tasks
   - Current week indicator

5. Create `src/components/WeeklyReflectionForm.tsx`
   - Dialog/modal component
   - 4 questions:
     - "What's unclear?" (textarea)
     - "What's taking longer than expected?" (textarea)
     - "What was most helpful?" (textarea)
     - "Confidence score (1-10)" (slider)
   - Console.log submission (no API)
   - Success message

### Verification Checklist
- [x] Dashboard loads mock onboarding plan
- [x] Progress percentage displays correctly
- [x] Tasks grouped by Week 1-4
- [x] Can toggle task completion (local state)
- [x] Task completion updates progress metric
- [x] Team directory shows important people
- [x] Team directory has avatars and roles
- [x] Metrics card shows real-time progress
- [x] Weekly reflection form opens
- [x] Can fill out reflection form
- [x] Reflection console.logs on submit
- [x] All components responsive
- [x] Dark/light mode works
- [x] No TypeScript errors: `pnpm typecheck`
- [x] No lint errors: `pnpm lint`

---

## Phase 4: Module Content Pages
**Goal:** Create dynamic pages for viewing module content

### Tasks
1. Create `src/app/onboarding/modules/[type]/page.tsx`
   - Dynamic route for module type
   - Fetch mock data based on type
   - Display module content

2. Create `src/components/onboarding/ModuleViewer.tsx`
   - Displays module content nicely
   - Supports markdown rendering (if needed)
   - Consistent layout for all types

3. Support all 5 module types:
   - company_overview
   - product_overview
   - competitive_landscape
   - tools_systems

4. Add navigation from dashboard:
   - Cards or links to each module
   - Icons for each module type
   - "View Details" CTAs

### Verification Checklist
- [x] Can access /onboarding/modules/company_overview
- [x] Can access /onboarding/modules/product_overview
- [x] Can access /onboarding/modules/competitive_landscape
- [x] Can access /onboarding/modules/tools_systems
- [x] Module content displays from mock data
- [x] Navigation from dashboard works
- [x] Content formatted nicely
- [x] Module viewer component reusable
- [x] Back navigation works
- [x] Responsive design
- [x] Dark/light mode works
- [x] No TypeScript errors: `pnpm typecheck`
- [x] No lint errors: `pnpm lint`

---

## Phase 5: Manager Progress View
**Goal:** Allow managers to view new hire progress (mock data)

### Tasks
1. Create `src/app/admin/plans/page.tsx`
   - List view of onboarding plans (mock)
   - Show 2-3 mock plans
   - Progress bars for each
   - Click to view details

2. Create `src/app/admin/plans/[id]/page.tsx`
   - Plan header with new hire info
   - Progress overview card
   - Task completion by week (visual timeline)
   - Weekly reflection summaries
   - Status indicators

3. Create `src/components/admin/ProgressTimeline.tsx`
   - Visual week-by-week progress
   - Task completion status
   - Reflection submission indicators
   - Current week highlight

4. Create `src/components/admin/ReflectionSummary.tsx`
   - Display weekly reflection responses
   - Confidence score visualization
   - Highlight concerns/blockers
   - Expandable cards per week

### Verification Checklist
- [x] Can access /admin/plans
- [x] Lists 2-3 mock onboarding plans
- [x] Progress bars display correctly
- [x] Can click into plan detail
- [x] Detail page shows new hire info
- [x] Detail page shows overall progress
- [x] Timeline shows week-by-week status
- [x] Task completion visualized clearly
- [x] Weekly reflections display
- [x] Reflection summaries readable
- [x] Confidence scores visualized
- [x] Responsive design
- [x] Dark/light mode works
- [x] No TypeScript errors: `pnpm typecheck`
- [x] No lint errors: `pnpm lint`

---

## Phase 6: Navigation & Polish
**Goal:** Complete the navigation flow and polish the UI

### Tasks
1. Update `src/components/site-header.tsx`
   - Add role-based navigation
   - Manager links: Setup, Plans
   - New hire links: Dashboard, Modules
   - Mock role switcher for demo

2. Create `src/components/RoleSwitcher.tsx` (demo only)
   - Toggle between Manager/New Hire view
   - Update header navigation
   - Persist in localStorage

3. Add breadcrumbs where needed:
   - Module pages
   - Plan detail pages
   - Setup wizard

4. Polish all pages:
   - Consistent spacing/padding
   - Loading skeletons (even if instant)
   - Empty states
   - Error boundaries
   - Animations/transitions

5. Create demo landing experience:
   - Update homepage with demo CTA
   - Quick role selection
   - Sample data preview

### Verification Checklist
- [x] Header shows role-based links
- [x] Role switcher works (Manager ↔ New Hire)
- [x] Navigation persists across pages
- [x] Breadcrumbs display on relevant pages
- [x] All pages have consistent styling
- [x] Loading states implemented
- [x] Empty states look good
- [x] Transitions smooth
- [x] Homepage has demo CTA
- [x] Can quickly switch roles
- [x] All links work correctly
- [x] Mobile navigation works
- [x] Dark/light mode consistent
- [x] No TypeScript errors: `pnpm typecheck`
- [x] No lint errors: `pnpm lint`

---

## Phase 7: Demo Refinements & Documentation
**Goal:** Final polish and create demo documentation

### Tasks
1. Add demo features:
   - Reset button (clear localStorage)
   - Sample data generator
   - Tour/walkthrough (optional)
   - Demo mode indicator

2. Create `docs/demo-guide.md`:
   - How to use the demo
   - Manager flow walkthrough
   - New hire flow walkthrough
   - Features showcase
   - Screenshots

3. Update README:
   - Add demo section
   - Link to demo guide
   - Note it's frontend-only with mock data

4. Final QA pass:
   - Test all flows end-to-end
   - Check responsive on mobile
   - Verify dark/light mode everywhere
   - Fix any visual bugs

### Verification Checklist
- [ ] Demo reset functionality works
- [ ] Clear localStorage clears all state
- [ ] Demo mode indicator visible
- [ ] Demo guide created
- [ ] README updated
- [ ] All manager flows work
- [ ] All new hire flows work
- [ ] Mobile responsive verified
- [ ] Dark/light mode verified
- [ ] No console errors
- [ ] No TypeScript errors: `pnpm typecheck`
- [ ] No lint errors: `pnpm lint`

---

## Implementation Notes

### Mock Data Strategy
- All data lives in `src/lib/mock-data.ts`
- Use localStorage to persist demo state
- Mock API functions simulate real API behavior
- Easy to swap for real API later

### Component Architecture
- Presentational components accept props
- Business logic in page components
- Easy to connect to real APIs later
- Consistent prop interfaces

### Recommended Approach
1. Complete phases sequentially
2. Verify each phase before moving on
3. Keep dev server running throughout
4. Test with both Manager and New Hire roles
5. Check responsive design at each phase

### Quality Gates
After EVERY phase:
- [ ] Run `pnpm typecheck` - must pass
- [ ] Run `pnpm lint` - must pass
- [ ] Test in browser (desktop & mobile)
- [ ] Test dark/light mode
- [ ] Commit working code

---

## Files to Create

### Phase 1: Mock Data
- `src/lib/mock-data.ts`
- `src/lib/mock-api.ts`

### Phase 2: Manager Setup
- `src/app/admin/setup/page.tsx`
- `src/components/admin/SetupWizard.tsx`
- `src/components/admin/ModuleEditor.tsx`
- `src/components/admin/PeopleEditor.tsx`

### Phase 3: New Hire Dashboard
- Update: `src/app/dashboard/page.tsx`
- Update: `src/components/OnboardingChecklist.tsx`
- Update: `src/components/TeamDirectory.tsx`
- Update: `src/components/MetricsCard.tsx`
- Create: `src/components/WeeklyReflectionForm.tsx`

### Phase 4: Module Pages
- `src/app/onboarding/modules/[type]/page.tsx`
- `src/components/onboarding/ModuleViewer.tsx`

### Phase 5: Manager Progress
- `src/app/admin/plans/page.tsx`
- `src/app/admin/plans/[id]/page.tsx`
- `src/components/admin/ProgressTimeline.tsx`
- `src/components/admin/ReflectionSummary.tsx`

### Phase 6: Navigation
- Update: `src/components/site-header.tsx`
- Create: `src/components/RoleSwitcher.tsx`
- Update: `src/app/page.tsx`

### Phase 7: Documentation
- `docs/demo-guide.md`
- Update: `README.md`

---

## Current Status
- [x] Phase 1: Mock Data Setup
- [x] Phase 2: Manager Setup Flow (UI Only)
- [x] Phase 3: New Hire Dashboard (UI Only)
- [x] Phase 4: Module Content Pages
- [x] Phase 5: Manager Progress View
- [x] Phase 6: Navigation & Polish
- [ ] Phase 7: Demo Refinements & Documentation
