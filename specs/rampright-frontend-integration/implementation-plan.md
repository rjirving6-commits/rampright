# RampRight Front-End Integration - Implementation Plan

## Overview

This implementation plan outlines the step-by-step process to integrate RampRight's front-end components and design system into the Next.js 15 boilerplate. The plan is divided into 7 phases, each with actionable tasks and checkboxes for progress tracking.

**Estimated Total Time**: 6-8 hours
**Prerequisites**: Access to source project at `/Users/rjirving/Projects/ramp-right`

---

## Phase 1: Clean Up Boilerplate

**Goal**: Remove unnecessary chat/AI features from the boilerplate to prepare for RampRight integration.

**Estimated Time**: 30 minutes

### Tasks

- [ ] Delete `/src/app/chat/page.tsx` (AI chat interface page)
- [ ] Delete `/src/app/api/chat/route.ts` (chat API endpoint)
- [ ] Delete `/src/components/starter-prompt-modal.tsx` (chat-related modal)
- [ ] Open `/src/components/site-header.tsx` and remove "Chat" navigation link
- [ ] Open `/src/app/page.tsx` and remove `<SetupChecklist>` component import and usage
- [ ] Run `npm run lint` to check for broken imports
- [ ] Run `npm run typecheck` to verify TypeScript types
- [ ] Fix any errors from removed files

### Verification
- [ ] No TypeScript errors
- [ ] No ESLint errors
- [ ] App runs without console errors
- [ ] Navigation no longer shows "Chat" link
- [ ] Home page renders without setup checklist

---

## Phase 2: Design System Setup

**Goal**: Integrate RampRight's color scheme, gradients, shadows, and typography into the boilerplate.

**Estimated Time**: 1 hour

### Tasks

#### 2.1: Update Global Styles

- [ ] Open `/src/app/globals.css`
- [ ] Add custom color variables to `:root`:
  ```css
  --primary: 12 88% 65%;
  --primary-glow: 16 100% 70%;
  --success: 142 71% 45%;
  --warning: 38 92% 50%;
  ```
- [ ] Add dark mode variants to `.dark`:
  ```css
  --primary: 12 88% 65%;
  --primary-glow: 16 100% 70%;
  --success: 142 71% 45%;
  --warning: 38 92% 50%;
  ```
- [ ] Add custom gradient variables:
  ```css
  --gradient-warm: linear-gradient(135deg, #ff6b6b 0%, #feca57 50%, #ff9ff3 100%);
  --gradient-subtle: linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--muted)) 100%);
  --gradient-depth: linear-gradient(135deg, hsl(var(--secondary)) 0%, hsl(220 30% 15%) 100%);
  ```
- [ ] Add custom shadow variables:
  ```css
  --shadow-soft: 0 4px 20px -4px hsl(var(--primary) / 0.15);
  --shadow-medium: 0 8px 30px -6px hsl(var(--primary) / 0.25);
  ```
- [ ] Update base styles to set font size to 18px:
  ```css
  html { font-size: 18px; }
  @media (max-width: 640px) { html { font-size: 16px; } }
  ```

#### 2.2: Update Tailwind Config

- [ ] Open `tailwind.config.ts`
- [ ] Add custom gradients to `extend.backgroundImage`:
  ```typescript
  'gradient-warm': 'var(--gradient-warm)',
  'gradient-subtle': 'var(--gradient-subtle)',
  'gradient-depth': 'var(--gradient-depth)',
  ```
- [ ] Add custom shadows to `extend.boxShadow`:
  ```typescript
  'soft': 'var(--shadow-soft)',
  'medium': 'var(--shadow-medium)',
  ```
- [ ] Update `borderRadius` default to `0.75rem`

#### 2.3: Update Button Component

- [ ] Open `/src/components/ui/button.tsx`
- [ ] Add `hero` variant to `buttonVariants`:
  ```typescript
  hero: "bg-gradient-warm text-white shadow-lg hover:shadow-xl scale-105 px-8 py-6 text-lg font-semibold",
  ```
- [ ] Add `success` variant to `buttonVariants`:
  ```typescript
  success: "bg-success text-white hover:bg-success/90",
  ```
- [ ] Export updated variant type

### Verification
- [ ] Colors updated in DevTools (inspect CSS variables)
- [ ] Gradients available as Tailwind utilities (`bg-gradient-warm`)
- [ ] Shadows available as Tailwind utilities (`shadow-soft`)
- [ ] Base font size is 18px on desktop
- [ ] Base font size is 16px on mobile (<640px)
- [ ] Button component has `hero` and `success` variants
- [ ] No TypeScript errors

---

## Phase 3: Copy Assets

**Goal**: Copy image assets from RampRight source project to the boilerplate.

**Estimated Time**: 15 minutes

### Tasks

- [ ] Navigate to `/Users/rjirving/Projects/ramp-right/src/assets/`
- [ ] Copy `hero-onboarding.jpg` to `/Users/rjirving/rampright/public/`
- [ ] Copy `dashboard-preview.jpg` to `/Users/rjirving/rampright/public/`
- [ ] Verify both images exist in `/public/` folder
- [ ] Check file sizes (should be: hero-onboarding.jpg ~168KB, dashboard-preview.jpg ~94KB)

### Verification
- [ ] `hero-onboarding.jpg` exists in `/public/`
- [ ] `dashboard-preview.jpg` exists in `/public/`
- [ ] Images are accessible at `http://localhost:3000/hero-onboarding.jpg` (when dev server running)

---

## Phase 4: Port Custom Components

**Goal**: Create all 4 custom React components from RampRight, adapted for Next.js.

**Estimated Time**: 2-3 hours

### Tasks

#### 4.1: Create Hero Component

- [ ] Create new file `/src/components/Hero.tsx`
- [ ] Copy content from `/Users/rjirving/Projects/ramp-right/src/components/Hero.tsx`
- [ ] Add `"use client"` directive at the top (uses interactivity)
- [ ] Replace `import heroImage from "@/assets/hero-onboarding.jpg"` with Next.js Image import:
  ```typescript
  import Image from "next/image"
  ```
- [ ] Update `<img>` tag to use Next.js `<Image>` component:
  ```typescript
  <Image src="/hero-onboarding.jpg" alt="..." width={800} height={600} />
  ```
- [ ] Update import paths to use `@/` alias
- [ ] Import necessary icons from `lucide-react`
- [ ] Import Button from `@/components/ui/button`
- [ ] Import Badge from `@/components/ui/badge`
- [ ] Add TypeScript types for component props (if any)
- [ ] Test component renders correctly

#### 4.2: Create MetricsCard Component

- [ ] Create new file `/src/components/MetricsCard.tsx`
- [ ] Copy content from `/Users/rjirving/Projects/ramp-right/src/components/MetricsCard.tsx`
- [ ] No "use client" needed (presentational component)
- [ ] Update import paths to use `@/` alias
- [ ] Import Card components from `@/components/ui/card`
- [ ] Import necessary icons from `lucide-react`
- [ ] Add proper TypeScript interface for props:
  ```typescript
  interface MetricsCardProps {
    title: string;
    value: string | number;
    change: string;
    trend: "up" | "down" | "neutral";
    icon: React.ComponentType<{ className?: string }>;
  }
  ```
- [ ] Export component with proper typing
- [ ] Test component renders with sample data

#### 4.3: Create OnboardingChecklist Component

- [ ] Create new file `/src/components/OnboardingChecklist.tsx`
- [ ] Copy content from `/Users/rjirving/Projects/ramp-right/src/components/OnboardingChecklist.tsx`
- [ ] Add `"use client"` directive (uses useState hooks)
- [ ] Update import paths to use `@/` alias
- [ ] Import Card components from `@/components/ui/card`
- [ ] Import Checkbox from `@/components/ui/checkbox`
- [ ] Import Progress from `@/components/ui/progress`
- [ ] Import Badge from `@/components/ui/badge`
- [ ] Ensure useState is imported from React
- [ ] Add TypeScript types for task items
- [ ] Test component renders with checkboxes functional

#### 4.4: Create TeamDirectory Component

- [ ] Create new file `/src/components/TeamDirectory.tsx`
- [ ] Copy content from `/Users/rjirving/Projects/ramp-right/src/components/TeamDirectory.tsx`
- [ ] No "use client" needed (presentational component)
- [ ] Update import paths to use `@/` alias
- [ ] Import Card components from `@/components/ui/card`
- [ ] Import Avatar from `@/components/ui/avatar`
- [ ] Import Button from `@/components/ui/button`
- [ ] Import Badge from `@/components/ui/badge`
- [ ] Import necessary icons from `lucide-react` (Mail, MessageSquare)
- [ ] Add TypeScript interface for team member data
- [ ] Export component with proper typing
- [ ] Test component renders with sample team data

### Verification
- [ ] All 4 components created in `/src/components/`
- [ ] Hero.tsx uses Next.js Image component
- [ ] All imports use `@/` path alias
- [ ] All components properly typed with TypeScript
- [ ] Components using hooks have `"use client"` directive
- [ ] No TypeScript errors (`npm run typecheck`)
- [ ] No ESLint errors (`npm run lint`)

---

## Phase 5: Replace Landing Page

**Goal**: Replace the current home page with RampRight's marketing landing page.

**Estimated Time**: 1.5 hours

### Tasks

#### 5.1: Update Home Page Structure

- [ ] Open `/src/app/page.tsx`
- [ ] Remove all existing content except imports
- [ ] Add imports:
  ```typescript
  import Hero from "@/components/Hero"
  import { Card, CardContent } from "@/components/ui/card"
  import { Badge } from "@/components/ui/badge"
  import { Button } from "@/components/ui/button"
  import Image from "next/image"
  import { Sparkles, TrendingUp, Clock, Users, Target, BarChart3, ArrowRight, CheckCircle2 } from "lucide-react"
  ```
- [ ] Keep page as Server Component (no "use client")

#### 5.2: Implement Hero Section

- [ ] Add `<Hero />` component at the top of the page
- [ ] Wrap in appropriate container div with padding/margins

#### 5.3: Implement Metrics Banner

- [ ] Create metrics banner section after Hero
- [ ] Add 3 metric cards with icons:
  - "25% Faster Time-to-Productivity" with TrendingUp icon
  - "10% Higher Employee Retention" with Users icon
  - "90% Task Completion Rate" with CheckCircle2 icon
- [ ] Use Grid layout: `grid-cols-1 md:grid-cols-3`
- [ ] Style with cards and badges

#### 5.4: Implement Features Grid

- [ ] Create features section with heading "Everything You Need to Succeed"
- [ ] Add 6 feature cards in a grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`)
- [ ] Features to include:
  1. "Personalized Onboarding Plans" - Sparkles icon
  2. "Progress Tracking" - BarChart3 icon
  3. "Team Integration" - Users icon
  4. "90-Day Milestones" - Target icon
  5. "Real-time Analytics" - TrendingUp icon
  6. "Time Optimization" - Clock icon
- [ ] Each card should have: icon, title, description

#### 5.5: Implement Dashboard Preview Section

- [ ] Create section with heading "Prove Your Strategic Impact"
- [ ] Add description text about analytics and reporting
- [ ] Add Next.js Image for dashboard preview:
  ```typescript
  <Image src="/dashboard-preview.jpg" alt="Dashboard Preview" width={1200} height={800} />
  ```
- [ ] Add shadow and border radius styling

#### 5.6: Implement Final CTA Section

- [ ] Create CTA section with gradient background (`bg-gradient-warm`)
- [ ] Add heading "Ready to Transform Your Onboarding?"
- [ ] Add description text
- [ ] Add two buttons:
  - Primary: "Get Started" (hero variant)
  - Secondary: "Schedule Demo" (outline variant)

#### 5.7: Keep Footer

- [ ] Ensure existing `<SiteFooter />` component is imported and rendered at bottom
- [ ] Verify footer displays correctly

### Verification
- [ ] Landing page matches RampRight design visually
- [ ] All sections render correctly:
  - [ ] Hero section
  - [ ] Metrics banner
  - [ ] Features grid
  - [ ] Dashboard preview
  - [ ] Final CTA
  - [ ] Footer
- [ ] Images load correctly using Next.js Image
- [ ] Responsive on mobile (375px), tablet (768px), desktop (1440px)
- [ ] Dark mode works correctly
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] No ESLint errors

---

## Phase 6: Create Protected Dashboard

**Goal**: Build the dashboard page with authentication protection and onboarding components.

**Estimated Time**: 2 hours

### Tasks

#### 6.1: Create Dashboard Page Structure

- [ ] Open `/src/app/dashboard/page.tsx` (should already exist)
- [ ] Replace content with new structure
- [ ] Keep as Server Component (no "use client")
- [ ] Add imports:
  ```typescript
  import { auth } from "@/lib/auth"
  import { headers } from "next/headers"
  import { redirect } from "next/navigation"
  import MetricsCard from "@/components/MetricsCard"
  import OnboardingChecklist from "@/components/OnboardingChecklist"
  import TeamDirectory from "@/components/TeamDirectory"
  import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
  import { Badge } from "@/components/ui/badge"
  import { Button } from "@/components/ui/button"
  import { Progress } from "@/components/ui/progress"
  import { TrendingUp, Users, Target, Sparkles, Clock } from "lucide-react"
  ```

#### 6.2: Implement Authentication Check

- [ ] Add session check at the top of the page component:
  ```typescript
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect("/")
  }
  ```
- [ ] Extract user data from session:
  ```typescript
  const user = session.user
  ```

#### 6.3: Implement Dashboard Header

- [ ] Create header section with:
  - Welcome message: "Welcome back, {user.name}!"
  - Role toggle UI (Employee/Manager) - static badges for now
  - Last login date/time display

#### 6.4: Implement Metrics Cards Section

- [ ] Create grid of 4 MetricsCard components:
  - **Days Active**: value="12", change="+2 from last week", trend="up", icon={Clock}
  - **Tasks Completed**: value="8/12", change="67% complete", trend="up", icon={CheckCircle2}
  - **Team Connections**: value="15", change="+3 this week", trend="up", icon={Users}
  - **Confidence Score**: value="85%", change="+5% this month", trend="up", icon={TrendingUp}
- [ ] Use grid layout: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`

#### 6.5: Implement Main Content Area

- [ ] Create two-column layout using grid (`grid-cols-1 lg:grid-cols-3`)
- [ ] Left column (col-span-2):
  - Add `<OnboardingChecklist />` component
  - Wrap in Card with header "Your Onboarding Journey"
- [ ] Right column (col-span-1):
  - Add `<TeamDirectory />` component
  - Wrap in Card with header "Your Team"

#### 6.6: Implement 90-Day Timeline Section

- [ ] Create section below main content with heading "Your 90-Day Roadmap"
- [ ] Add 3 phase cards in grid (`grid-cols-1 md:grid-cols-3`):
  - **Phase 1 (Days 1-30)**: "Foundation & Culture" - 100% complete
  - **Phase 2 (Days 31-60)**: "Skills & Integration" - 60% complete
  - **Phase 3 (Days 61-90)**: "Impact & Independence" - 20% complete
- [ ] Each card shows:
  - Phase number badge
  - Title
  - Progress bar with percentage
  - Key milestones list

### Verification
- [ ] Dashboard requires authentication (redirect to home if not signed in)
- [ ] Signed-in users can access dashboard
- [ ] Welcome header displays user's name from session
- [ ] Role toggle UI is visible
- [ ] 4 metrics cards render correctly with icons and trends
- [ ] Onboarding checklist component displays
- [ ] Team directory component displays
- [ ] 90-Day timeline section shows 3 phases
- [ ] Responsive layout works on mobile, tablet, desktop
- [ ] Dark mode works correctly
- [ ] No console errors
- [ ] No TypeScript errors

#### 6.7: Update Site Header Navigation

- [ ] Open `/src/components/site-header.tsx`
- [ ] Add "Dashboard" link to navigation
- [ ] Make Dashboard link visible only when user is authenticated (requires converting to Client Component or using session in Server Component)
- [ ] Alternatively: Keep Dashboard link always visible, rely on page-level redirect

### Verification
- [ ] Dashboard link appears in site header
- [ ] Link navigates to `/dashboard` correctly

---

## Phase 7: Quality Assurance

**Goal**: Verify all functionality, fix bugs, ensure code quality and responsive design.

**Estimated Time**: 1-2 hours

### Tasks

#### 7.1: Code Quality Checks

- [ ] Run `npm run lint` and fix all errors
- [ ] Run `npm run typecheck` and fix all type errors
- [ ] Review all new files for:
  - [ ] Proper TypeScript types (no `any` types)
  - [ ] Consistent code formatting
  - [ ] Proper imports (using `@/` alias)
  - [ ] Comments where needed for complex logic
  - [ ] Removed console.logs (except intentional)

#### 7.2: Responsive Design Testing

- [ ] Test landing page on mobile (375px width):
  - [ ] Hero section stacks properly
  - [ ] Metrics banner stacks vertically
  - [ ] Features grid is single column
  - [ ] Images resize appropriately
  - [ ] CTAs are full width
  - [ ] Text is readable
- [ ] Test landing page on tablet (768px width):
  - [ ] Metrics banner shows 3 columns
  - [ ] Features grid shows 2 columns
  - [ ] Spacing looks good
- [ ] Test landing page on desktop (1440px width):
  - [ ] Features grid shows 3 columns
  - [ ] Max container width applied
  - [ ] Content centered
- [ ] Test dashboard on mobile, tablet, desktop:
  - [ ] Metrics cards stack/grid correctly
  - [ ] Two-column layout becomes single column on mobile
  - [ ] Timeline cards stack on mobile

#### 7.3: Dark Mode Testing

- [ ] Toggle dark mode on landing page:
  - [ ] All text is readable
  - [ ] Contrast is sufficient
  - [ ] Gradients look good
  - [ ] Images have proper styling
  - [ ] Shadows are visible
- [ ] Toggle dark mode on dashboard:
  - [ ] Cards have proper background
  - [ ] Metrics are readable
  - [ ] Checklist items are visible
  - [ ] Team directory cards look good

#### 7.4: Authentication Flow Testing

- [ ] Test signed-out user:
  - [ ] Navigate to `/dashboard` → should redirect to home
  - [ ] Click "Get Started" on landing page → should show sign-in
- [ ] Test sign-in flow:
  - [ ] Sign in with Google OAuth
  - [ ] After sign-in, redirected to correct page
  - [ ] User name appears in dashboard header
  - [ ] Profile page still works
- [ ] Test sign-out flow:
  - [ ] Sign out from header
  - [ ] Redirected to home page
  - [ ] Cannot access `/dashboard` anymore

#### 7.5: Browser DevTools Checks

- [ ] Open Chrome DevTools console:
  - [ ] No red errors on landing page
  - [ ] No red errors on dashboard
  - [ ] No 404 errors for assets
  - [ ] No CORS errors
- [ ] Check Network tab:
  - [ ] Images load correctly (hero-onboarding.jpg, dashboard-preview.jpg)
  - [ ] No failed requests
  - [ ] CSS loads properly
- [ ] Check Lighthouse scores:
  - [ ] Performance >90
  - [ ] Accessibility >90
  - [ ] Best Practices >90
  - [ ] SEO >90

#### 7.6: Cross-Browser Testing

- [ ] Test in Chrome (latest)
- [ ] Test in Firefox (latest)
- [ ] Test in Safari (latest)
- [ ] Test in Edge (latest)
- [ ] Test on iOS Safari (mobile device)
- [ ] Test on Chrome mobile (Android/iOS)

#### 7.7: Accessibility Testing

- [ ] Test keyboard navigation:
  - [ ] Tab through all interactive elements
  - [ ] Focus states are visible
  - [ ] Can activate buttons with Enter/Space
  - [ ] Can check checkboxes with keyboard
- [ ] Test with screen reader (VoiceOver/NVDA):
  - [ ] All images have alt text
  - [ ] Headings are in logical order
  - [ ] Interactive elements are announced correctly
- [ ] Check color contrast:
  - [ ] Use WebAIM Contrast Checker
  - [ ] All text meets WCAG AA standards
  - [ ] Links are distinguishable

#### 7.8: Final Review

- [ ] Review all acceptance criteria from requirements.md:
  - [ ] All checkboxes completed
  - [ ] No outstanding issues
- [ ] Create list of known issues/limitations (if any)
- [ ] Document any deviations from original plan
- [ ] Take screenshots of:
  - [ ] Landing page (desktop)
  - [ ] Landing page (mobile)
  - [ ] Dashboard (desktop)
  - [ ] Dashboard (mobile)
  - [ ] Dark mode examples

### Verification
- [ ] All lint errors fixed
- [ ] All type errors fixed
- [ ] Responsive design works on all breakpoints
- [ ] Dark mode works correctly
- [ ] Authentication flows work correctly
- [ ] No console errors in browser
- [ ] All browsers tested and working
- [ ] Accessibility checks pass
- [ ] Lighthouse scores meet targets
- [ ] Screenshots captured for documentation

---

## Post-Implementation Checklist

After completing all phases, verify the following:

### Functionality
- [ ] Landing page loads without errors
- [ ] Dashboard requires authentication
- [ ] Sign-in/sign-out flows work correctly
- [ ] All components render properly
- [ ] All interactive elements work (buttons, checkboxes, etc.)

### Design Fidelity
- [ ] Visual design matches RampRight screenshots
- [ ] Colors match (coral/orange primary)
- [ ] Typography is correct (18px base)
- [ ] Spacing and layout match original
- [ ] Icons are consistent

### Code Quality
- [ ] 0 TypeScript errors
- [ ] 0 ESLint errors
- [ ] All files properly organized
- [ ] Consistent naming conventions
- [ ] Proper component structure

### Performance
- [ ] Images optimized with Next.js Image
- [ ] No unnecessary re-renders
- [ ] Fast page load times
- [ ] Smooth animations/transitions

### Responsiveness
- [ ] Works on mobile (375px-767px)
- [ ] Works on tablet (768px-1023px)
- [ ] Works on desktop (1024px+)
- [ ] Touch targets are 44px minimum on mobile

### Accessibility
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] WCAG AA color contrast
- [ ] Semantic HTML used

### Cross-Browser
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] iOS Safari
- [ ] Chrome mobile

---

## Known Limitations (Current Phase)

Document any known limitations or future work needed:

1. **Static Data**: Dashboard displays placeholder data (no backend integration yet)
2. **Role Toggle**: Employee/Manager toggle is UI-only (no actual role-based logic)
3. **Task Persistence**: Checklist state is not saved to database
4. **Team Data**: Team directory shows hardcoded sample data
5. **Metrics Calculation**: Metrics are not calculated from real data
6. **No Testing**: Unit tests and E2E tests not included in this phase

---

## Next Steps (Future Phases)

After successful completion of front-end integration:

1. **Backend Integration**: Connect components to database and API routes
2. **Testing Suite**: Add unit tests, integration tests, E2E tests
3. **Role-Based Access**: Implement actual Employee vs Manager permissions
4. **Task Management**: Build API for checklist CRUD operations
5. **Real Metrics**: Calculate metrics from user activity data
6. **Notifications**: Add toast notifications for user actions
7. **Analytics**: Integrate real analytics and reporting
8. **Multi-tenant**: Support multiple organizations/teams

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-01-12 | Claude | Initial implementation plan |
