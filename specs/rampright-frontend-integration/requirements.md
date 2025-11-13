# RampRight Front-End Integration - Requirements

## 1. Project Overview

### Context
Integrate the front-end components and design system from the RampRight employee onboarding platform (Vite + React SPA) into the existing Next.js 15 boilerplate application. The goal is to preserve the visual design and user experience while adapting the architecture to work with Next.js App Router and BetterAuth authentication.

### Source Project
- **Location**: `/Users/rjirving/Projects/ramp-right`
- **Tech Stack**: Vite 5.4, React 18.3, React Router DOM 6.30, TypeScript
- **UI Library**: shadcn/ui with Tailwind CSS 3.4
- **Architecture**: Client-side SPA (no backend)

### Target Project
- **Location**: `/Users/rjirving/rampright`
- **Tech Stack**: Next.js 15, React 19, TypeScript
- **UI Library**: shadcn/ui with Tailwind CSS 4
- **Architecture**: Server Components with App Router
- **Authentication**: BetterAuth with Google OAuth
- **Database**: PostgreSQL with Drizzle ORM

---

## 2. Initial User Requirements

Based on user inputs, the integration should include:

1. **Remove unnecessary boilerplate features** (chat/AI functionality)
2. **Adopt RampRight design system** (coral/orange color scheme, custom gradients, custom shadows, 18px base typography)
3. **Port all 4 custom components** (Hero, MetricsCard, OnboardingChecklist, TeamDirectory)
4. **Replace landing page entirely** with RampRight's marketing page
5. **Protect dashboard with BetterAuth** requiring user authentication

---

## 3. Functional Requirements

### FR1: Boilerplate Cleanup
- **FR1.1**: Remove `/app/chat/page.tsx` (chat interface)
- **FR1.2**: Remove `/app/api/chat/route.ts` (chat API endpoint)
- **FR1.3**: Remove `/components/starter-prompt-modal.tsx` (chat-related modal)
- **FR1.4**: Remove "Chat" link from site header navigation
- **FR1.5**: Remove setup checklist from home page
- **FR1.6**: Preserve existing auth components, profile page, and dashboard route structure

### FR2: Design System Integration
- **FR2.1**: Add custom color variables to `globals.css`:
  - Primary: `hsl(12 88% 65%)` (coral/orange)
  - Primary glow: `hsl(16 100% 70%)` (bright orange for effects)
  - Success: `hsl(142 71% 45%)` (green)
  - Warning: `hsl(38 92% 50%)` (amber)
  - Custom gradients: warm, subtle, depth
  - Custom shadows: soft, medium
- **FR2.2**: Update `tailwind.config.ts` with custom utilities for gradients and shadows
- **FR2.3**: Update base font size to 18px (16px on mobile <640px)
- **FR2.4**: Increase default border radius to 0.75rem
- **FR2.5**: Add `hero` and `success` variants to Button component

### FR3: Asset Migration
- **FR3.1**: Copy `hero-onboarding.jpg` to `/public/` folder
- **FR3.2**: Copy `dashboard-preview.jpg` to `/public/` folder
- **FR3.3**: Update image references to use Next.js `<Image>` component

### FR4: Custom Component Porting
- **FR4.1**: Create `/components/Hero.tsx`
  - Landing page hero section with gradient text
  - CTA buttons ("Get Started", "See How It Works")
  - Hero image with glow effect
  - Key metrics badges (3 stats)
  - Responsive grid layout
  - Adapt imports for Next.js (use `next/image`)
- **FR4.2**: Create `/components/MetricsCard.tsx`
  - Display metric cards with: title, value, change %, trend direction, icon
  - Trend indicators (up/down/neutral) with color coding
  - Icon with accent background
  - Hover shadow effects
  - TypeScript props interface
- **FR4.3**: Create `/components/OnboardingChecklist.tsx`
  - Interactive task checklist with progress bar
  - Checkbox-based task completion
  - Task categories and due dates
  - State management with useState
  - Visual states for completed/incomplete tasks
- **FR4.4**: Create `/components/TeamDirectory.tsx`
  - Team member cards with avatars
  - Member details (name, role, department)
  - Action buttons (email, message)
  - Hover effects and responsive layout

### FR5: Landing Page Replacement
- **FR5.1**: Replace `/app/page.tsx` with RampRight's Index.tsx structure
- **FR5.2**: Implement sections:
  - Hero section using `<Hero>` component
  - Metrics banner (25% faster, 10% retention, 90% completion)
  - Features grid (6 feature cards with icons)
  - Dashboard preview section with image
  - Final CTA section
  - Footer (reuse existing component)
- **FR5.3**: Use Lucide React icons throughout
- **FR5.4**: Maintain responsive design patterns (mobile-first)

### FR6: Protected Dashboard
- **FR6.1**: Create `/app/dashboard/page.tsx` as Server Component
- **FR6.2**: Implement BetterAuth session check:
  - Import auth from `@/lib/auth`
  - Get session with `auth.api.getSession()`
  - Redirect unauthenticated users to sign-in
- **FR6.3**: Display dashboard sections:
  - Welcome header with user name
  - Role toggle (Employee/Manager view) - UI only, no backend logic
  - 4 metric cards: Days Active, Tasks Completed, Team Connections, Confidence Score
  - `<OnboardingChecklist>` component with progress tracking
  - `<TeamDirectory>` component showing team members
  - 90-Day Timeline section with 3 phases and progress bars
- **FR6.4**: Update site header to show "Dashboard" link only when authenticated

---

## 4. Non-Functional Requirements

### NFR1: Responsive Design
- **NFR1.1**: Support breakpoints: mobile (<768px), tablet (768px-1024px), desktop (>1024px)
- **NFR1.2**: Use responsive Tailwind classes (sm:, md:, lg:, xl:, 2xl:)
- **NFR1.3**: Implement fluid typography scaling
- **NFR1.4**: Ensure touch-friendly UI elements on mobile (44px minimum touch targets)

### NFR2: Dark Mode Support
- **NFR2.1**: All new components must support dark mode
- **NFR2.2**: Use semantic color tokens (bg-background, text-foreground)
- **NFR2.3**: Test color contrast in both light and dark modes
- **NFR2.4**: Preserve existing next-themes integration

### NFR3: TypeScript & Code Quality
- **NFR3.1**: All components must be fully typed with TypeScript
- **NFR3.2**: Pass `npm run lint` without errors
- **NFR3.3**: Pass `npm run typecheck` without errors
- **NFR3.4**: Use proper React 19 patterns (no deprecated APIs)
- **NFR3.5**: Follow existing code conventions in the boilerplate

### NFR4: Performance
- **NFR4.1**: Use Next.js `<Image>` component for optimized image loading
- **NFR4.2**: Implement Server Components where appropriate
- **NFR4.3**: Minimize client-side JavaScript (use "use client" sparingly)
- **NFR4.4**: Leverage Next.js static optimization for landing page

### NFR5: Accessibility
- **NFR5.1**: Maintain WCAG 2.1 AA compliance
- **NFR5.2**: Use semantic HTML elements
- **NFR5.3**: Ensure keyboard navigation support
- **NFR5.4**: Provide alt text for images
- **NFR5.5**: Use ARIA labels where appropriate

### NFR6: Browser Compatibility
- **NFR6.1**: Support last 2 versions of Chrome, Firefox, Safari, Edge
- **NFR6.2**: Test on iOS Safari and Chrome mobile
- **NFR6.3**: Graceful degradation for older browsers

---

## 5. Acceptance Criteria

### AC1: Boilerplate Cleanup
- [ ] Chat page and API route completely removed
- [ ] Starter prompt modal component deleted
- [ ] Chat link removed from navigation
- [ ] Setup checklist removed from home page
- [ ] No broken links or imports remain
- [ ] Existing auth and profile functionality unchanged

### AC2: Design System
- [ ] Coral/orange primary color visible throughout UI
- [ ] Custom gradients applied to hero and CTA sections
- [ ] Custom shadows visible on cards and hover states
- [ ] Base font size is 18px on desktop (verified in DevTools)
- [ ] Base font size is 16px on mobile (<640px)
- [ ] Button component has `hero` and `success` variants
- [ ] Border radius is 0.75rem on cards and buttons

### AC3: Assets
- [ ] `hero-onboarding.jpg` exists in `/public/` folder
- [ ] `dashboard-preview.jpg` exists in `/public/` folder
- [ ] Images load correctly on landing page
- [ ] Images use Next.js `<Image>` component (not `<img>` tag)

### AC4: Components
- [ ] `Hero.tsx` component renders with gradient text and CTAs
- [ ] `MetricsCard.tsx` displays metrics with trend indicators
- [ ] `OnboardingChecklist.tsx` shows tasks with progress bar
- [ ] `TeamDirectory.tsx` displays team members with action buttons
- [ ] All components are TypeScript typed
- [ ] All components support dark mode
- [ ] All components are responsive

### AC5: Landing Page
- [ ] Landing page replaced with RampRight design
- [ ] Hero section visible with image and CTAs
- [ ] Metrics banner shows 3 key statistics
- [ ] Features grid displays 6 feature cards
- [ ] Dashboard preview section includes image
- [ ] Final CTA section encourages sign-up
- [ ] Footer renders correctly
- [ ] Page is fully responsive (tested on mobile, tablet, desktop)

### AC6: Dashboard
- [ ] Dashboard requires authentication (redirects if not signed in)
- [ ] Authenticated users can access `/dashboard` route
- [ ] Welcome header displays user's name from session
- [ ] Role toggle UI is present (Employee/Manager)
- [ ] 4 metric cards render with sample data
- [ ] Onboarding checklist component visible
- [ ] Team directory component visible
- [ ] 90-Day timeline section present
- [ ] "Dashboard" link appears in navigation only when signed in

### AC7: Code Quality
- [ ] `npm run lint` passes with no errors
- [ ] `npm run typecheck` passes with no errors
- [ ] No TypeScript `any` types used
- [ ] No console errors in browser DevTools
- [ ] All imports resolve correctly

### AC8: Responsive & Accessibility
- [ ] Landing page works on mobile (375px width)
- [ ] Landing page works on tablet (768px width)
- [ ] Landing page works on desktop (1440px width)
- [ ] Dashboard works on mobile, tablet, desktop
- [ ] Dark mode toggle works on all pages
- [ ] All interactive elements keyboard accessible
- [ ] All images have alt text

---

## 6. Out of Scope

The following items are explicitly **not included** in this phase:

### Backend Integration
- ❌ Database schema changes for onboarding tasks
- ❌ API routes for checklist persistence
- ❌ Real-time data syncing
- ❌ User profile data from database
- ❌ Metric calculation logic

### Testing
- ❌ Unit tests (Jest/Vitest)
- ❌ Integration tests
- ❌ End-to-end tests (Playwright)
- ❌ Visual regression tests

### Advanced Features
- ❌ Role-based access control (Employee vs Manager views)
- ❌ Actual onboarding workflow logic
- ❌ Task assignment and notifications
- ❌ Analytics and reporting
- ❌ Multi-language support (i18n)
- ❌ Email notifications
- ❌ File uploads
- ❌ Advanced permissions

### DevOps
- ❌ CI/CD pipeline updates
- ❌ Deployment configuration
- ❌ Environment-specific builds
- ❌ Performance monitoring setup

---

## 7. Assumptions

1. **Existing boilerplate is functional**: BetterAuth, database, and core infrastructure work correctly
2. **shadcn/ui components available**: Base UI components (Button, Card, Avatar, etc.) already installed
3. **Images provided**: Source images are accessible at `/Users/rjirving/Projects/ramp-right/src/assets/`
4. **Static data acceptable**: Dashboard will display placeholder/sample data (no backend queries yet)
5. **Single user persona**: Initial implementation supports one user type (no role differentiation)
6. **Modern browser support**: Target audience uses recent browser versions

---

## 8. Constraints

1. **No breaking changes**: Existing auth, profile, and database functionality must remain intact
2. **Design fidelity**: Must closely match RampRight's visual design and UX
3. **Framework adherence**: Follow Next.js 15 best practices (Server Components, App Router)
4. **Type safety**: Maintain strict TypeScript with no `any` types
5. **Timeline**: Prioritize speed of implementation over perfect optimization
6. **No new dependencies**: Use existing packages where possible (Lucide icons, shadcn/ui, Tailwind)

---

## 9. Success Metrics

### Qualitative
- ✅ Visual design matches RampRight screenshots
- ✅ UX feels consistent across pages
- ✅ Code is readable and maintainable
- ✅ Components are reusable

### Quantitative
- ✅ 0 TypeScript errors
- ✅ 0 ESLint errors
- ✅ 100% of acceptance criteria met
- ✅ 4 custom components created
- ✅ 2 pages updated (home, dashboard)
- ✅ Lighthouse score >90 for Performance, Accessibility, Best Practices

---

## 10. Dependencies

### Technical Dependencies
- Next.js 15 (already installed)
- React 19 (already installed)
- TypeScript (already installed)
- Tailwind CSS 4 (already installed)
- shadcn/ui components (already installed)
- Lucide React icons (already installed)
- BetterAuth (already configured)
- next-themes (already configured)

### External Dependencies
- Access to source project at `/Users/rjirving/Projects/ramp-right`
- Image assets from source project
- User approval for each implementation phase

---

## 11. Risks & Mitigation

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Tailwind v4 breaking changes vs v3 | Medium | Medium | Review Tailwind v4 migration guide; test thoroughly |
| React 19 compatibility issues | High | Low | Use stable React 19 features only; avoid canary APIs |
| Next.js Image optimization issues | Medium | Low | Test with various image formats; use fallback if needed |
| Dark mode color contrast failures | Medium | Medium | Test with WCAG tools; adjust colors as needed |
| Responsive design breakage | High | Medium | Test on real devices; use browser DevTools |
| TypeScript migration errors | Medium | Medium | Convert incrementally; use proper types from start |
| Authentication redirect loops | High | Low | Test sign-in/sign-out flows thoroughly |

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-01-12 | Claude | Initial requirements document |
