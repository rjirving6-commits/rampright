# Marketing Pages - Implementation Plan

## Phase 1: Project Setup and Planning ✓

### Tasks
- [x] Review existing site structure and design patterns
- [x] Identify reusable components (Card, Button, Badge, etc.)
- [x] Define pricing tier feature sets
- [x] Create placeholder content data structures

## Phase 2: Pricing Page

### Tasks
- [ ] Create `/src/app/pricing/page.tsx`
- [ ] Define 3 pricing tiers with feature lists:
  - [ ] Starter/Basic tier
  - [ ] Professional/Growth tier
  - [ ] Enterprise/Premium tier
- [ ] Implement pricing card component with:
  - [ ] Tier name
  - [ ] Price placeholder
  - [ ] Feature list with checkmarks
  - [ ] CTA button
- [ ] Make pricing cards responsive (3 columns → stack on mobile)
- [ ] Add page header with title and description
- [ ] Implement dark mode support
- [ ] Add proper TypeScript types

## Phase 3: Blog Page

### Tasks
- [ ] Create `/src/app/blog/page.tsx`
- [ ] Define blog post data structure/interface
- [ ] Create 3-5 placeholder blog posts
- [ ] Implement blog post card component with:
  - [ ] Title
  - [ ] Excerpt
  - [ ] Publication date
  - [ ] Author name
  - [ ] "Read more" link
- [ ] Create grid layout for blog posts
- [ ] Make grid responsive (3 cols → 2 cols → 1 col)
- [ ] Add page header with title
- [ ] Implement dark mode support
- [ ] Add proper TypeScript types

## Phase 4: Case Studies Page

### Tasks
- [ ] Create `/src/app/case-studies/page.tsx`
- [ ] Define case study data structure/interface
- [ ] Create 3-4 placeholder case studies
- [ ] Implement case study card component with:
  - [ ] Company name
  - [ ] Industry tag/badge
  - [ ] Challenge summary
  - [ ] Results/metrics
  - [ ] "Read case study" link
- [ ] Create grid layout for case studies
- [ ] Make grid responsive (3 cols → 2 cols → 1 col)
- [ ] Add page header with title and description
- [ ] Implement dark mode support
- [ ] Add proper TypeScript types

## Phase 5: Documents Page

### Tasks
- [ ] Create `/src/app/documents/page.tsx`
- [ ] Define changelog entry data structure
- [ ] Define roadmap item data structure
- [ ] Create placeholder changelog entries (5-8 versions)
- [ ] Create placeholder roadmap items (6-10 features)
- [ ] Implement changelog section with:
  - [ ] Section header
  - [ ] Version entries with dates
  - [ ] Change categories (features, improvements, fixes)
  - [ ] Reverse chronological ordering
- [ ] Implement roadmap section with:
  - [ ] Section header
  - [ ] Feature cards with status badges
  - [ ] Status indicators (planned, in progress, upcoming)
- [ ] Add page navigation/tabs between changelog and roadmap
- [ ] Make layout responsive
- [ ] Implement dark mode support
- [ ] Add proper TypeScript types

## Phase 6: Navigation Integration

### Tasks
- [ ] Open `/src/components/site-header.tsx`
- [ ] Add navigation links for all 4 pages:
  - [ ] Pricing
  - [ ] Blog
  - [ ] Case Studies
  - [ ] Documents
- [ ] Ensure links work on desktop navigation
- [ ] Ensure links work on mobile navigation
- [ ] Add active state styling for current page
- [ ] Test navigation flow between all pages

## Phase 7: Polish and Quality Assurance

### Tasks
- [ ] Review all pages for consistent spacing and typography
- [ ] Verify dark mode works correctly on all pages
- [ ] Test responsive breakpoints on all pages
- [ ] Ensure all components use shadcn/ui design tokens
- [ ] Add proper page metadata (title, description) for SEO
- [ ] Verify accessibility (semantic HTML, ARIA labels)
- [ ] Run `npm run lint` and fix any issues
- [ ] Run `npm run typecheck` and fix any type errors
- [ ] Visual review in browser (light and dark mode)
- [ ] Test on mobile device or emulator

## Phase 8: Documentation

### Tasks
- [ ] Add comments to complex components
- [ ] Document data structures for future content updates
- [ ] Create brief guide for updating placeholder content
- [ ] Update this spec with any deviations from plan

## Notes

- All pages are public (no authentication required)
- Content is static for now (no database/CMS integration)
- Focus on structure and design - actual content comes later
- Use existing shadcn/ui components to maintain consistency
- Follow patterns from existing pages (landing page, dashboard, etc.)

## Estimated Complexity

- **Pricing Page**: Medium (feature comparison logic)
- **Blog Page**: Low-Medium (straightforward grid)
- **Case Studies Page**: Low-Medium (similar to blog)
- **Documents Page**: Medium (dual sections, more complex structure)
- **Navigation**: Low (simple link additions)

**Total Estimated Effort**: ~4-6 hours for implementation + polish
