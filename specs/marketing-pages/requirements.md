# Marketing Pages - Requirements

## Overview
Create four new public-facing pages accessible from the main navigation bar to enhance the marketing and information architecture of the application.

## Pages Required

### 1. Pricing Page (`/pricing`)
**Purpose:** Display pricing tiers and feature comparison to help users choose the right plan

**Requirements:**
- Display 3 pricing tiers (columns/cards)
- Each tier should include:
  - Tier name/title
  - Price placeholder (leave blank for now - will be filled in later)
  - List of features included in that tier
  - Call-to-action button
- Features should vary by tier (basic → advanced)
- Responsive design (stack on mobile)
- Support light/dark mode

**Feature Categories to Consider:**
- Number of users/seats
- Number of onboarding plans
- Module content access
- AI chat capabilities
- Support level
- Custom branding
- Analytics/reporting
- Integrations
- Storage limits

### 2. Blog Page (`/blog`)
**Purpose:** Publish company articles, updates, and thought leadership content

**Requirements:**
- Blog post listing page
- Display posts in grid or list format
- Each post preview should show:
  - Title
  - Excerpt/preview text
  - Publication date
  - Author (optional)
  - Featured image (optional)
  - Read time estimate (optional)
- Placeholder content for initial release
- Responsive design
- Support light/dark mode

**Future Considerations:**
- Individual blog post pages (`/blog/[slug]`)
- Categories/tags
- Search functionality
- Pagination

### 3. Case Studies Page (`/case-studies`)
**Purpose:** Showcase customer success stories and use cases

**Requirements:**
- Case study listing page
- Display case studies in grid format
- Each case study preview should show:
  - Customer/company name
  - Industry/sector
  - Challenge/problem statement (brief)
  - Results/impact highlights
  - Featured image or logo
  - "Read more" link
- Placeholder content for initial release
- Responsive design
- Support light/dark mode

**Future Considerations:**
- Individual case study detail pages (`/case-studies/[slug]`)
- Filter by industry
- Metrics visualization

### 4. Documents Page (`/documents`)
**Purpose:** Central hub for changelogs, release notes, and upcoming features roadmap

**Requirements:**
- Two main sections:
  1. **Changelog** - Historical product changes and updates
  2. **Roadmap** - Upcoming features and planned improvements
- Changelog section:
  - Organized by version/date
  - List of changes (features, improvements, bug fixes)
  - Reverse chronological order (newest first)
- Roadmap section:
  - Upcoming features with status (planned, in progress, upcoming)
  - Optional timeline/quarters
- Placeholder content for initial release
- Responsive design
- Support light/dark mode

**Future Considerations:**
- API documentation
- User guides
- Search functionality
- Export capabilities

## Navigation Integration

**Requirements:**
- Add all 4 pages to the main site header navigation
- Links should be clearly labeled
- Active page should be visually indicated
- Mobile navigation should include these pages
- Links accessible to all users (public pages)

## Design Requirements

**All Pages Should:**
- Use existing shadcn/ui components for consistency
- Follow established design patterns from the site
- Support dark mode via next-themes
- Be fully responsive (mobile, tablet, desktop)
- Use standard Tailwind CSS utility classes
- Match the visual style of existing pages
- Include proper page titles and meta descriptions
- Have accessible markup (semantic HTML, ARIA labels)

## Content Strategy

**Initial Release:**
- All pages will have placeholder/demo content
- Content structure and layout are the priority
- Actual content (pricing amounts, blog posts, case studies, changelog entries) will be added later by the business team

## Technical Constraints

- Next.js 15 App Router
- React Server Components where possible
- TypeScript for type safety
- No database integration required initially (static content)
- No authentication required (public pages)

## Success Criteria

- All 4 pages are accessible from navigation
- Pages are visually consistent with existing site design
- Responsive on all device sizes
- Dark mode works correctly
- Content structure is clear and ready for real content
- Code passes linting and type checking
