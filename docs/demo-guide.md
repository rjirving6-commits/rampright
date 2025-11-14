# RampRight Demo Guide

Welcome to the RampRight frontend demo! This guide will walk you through all the features and functionality of the onboarding platform.

## Overview

This is a **frontend-only demo** using mock data to showcase the RampRight onboarding platform. No backend or database is required - all data is simulated using localStorage for persistence across page refreshes.

## Getting Started

### Demo Features

- **Role Switcher**: Toggle between Manager and New Hire views
- **Demo Mode Indicator**: Badge in the header shows you're in demo mode
- **Reset Button**: Clear all demo data and start fresh
- **Mock Data**: Realistic onboarding scenarios with pre-populated data
- **Persistent State**: Your demo progress is saved in browser localStorage

### Quick Start

1. Visit the homepage
2. Use the **Role Switcher** in the header to select your role:
   - **Manager**: Setup onboarding plans and track progress
   - **New Hire**: Complete onboarding tasks and access resources
3. Explore the features for each role
4. Use the **Reset Demo** button anytime to start over

---

## Manager Flow Walkthrough

### 1. Setup Wizard (`/admin/setup`)

The manager creates a new onboarding plan through a 4-step wizard.

#### Step 1: Company Information
- Enter company name
- Add company description
- Set onboarding start date
- Configure onboarding duration (typically 30 days)

**What happens**: This sets the foundation for the onboarding plan.

#### Step 2: Template Selection
- Choose from pre-built templates:
  - **Go-to-Market (GTM)** - For sales/marketing roles (default)
  - **Engineering** - For technical roles
  - **Product** - For product managers
  - **Custom** - Build from scratch
- View template details and task breakdown

**What happens**: The selected template populates the plan with role-specific tasks and milestones.

#### Step 3: Content Customization

Customize module content across 5 key areas:

**A. Company Overview**
- Company mission and values
- Organizational structure
- Company history and culture
- What makes us unique

**B. Product Overview**
- Product features and benefits
- Customer profiles and use cases
- Product roadmap and vision
- Demo environment access

**C. Competitive Landscape**
- Key competitors analysis
- Our competitive advantages
- Market positioning
- Battle cards and talking points

**D. Tools & Systems**
- Communication tools (Slack, email, etc.)
- CRM and sales tools
- Documentation platforms
- Access instructions and credentials

**E. Important People**
- Add team members the new hire should meet
- Include name, role, email, and relationship type:
  - Direct Manager
  - Mentor/Buddy
  - Team Member
  - Key Stakeholder
- Add/edit/delete people as needed

**What happens**: This content becomes available to new hires in their module pages.

#### Step 4: Invite New Hire
- Enter new hire's email
- Review plan summary
- Send invitation (in demo: console.log)

**What happens**: In production, this would send an email invitation. In demo mode, the plan is created and available for viewing.

### 2. Plans Dashboard (`/admin/plans`)

View and manage all onboarding plans.

#### Features:
- **Plans List**: See all active onboarding plans
- **Progress Bars**: Visual indication of completion status
- **Quick Stats**: See completion percentage and current week
- **Click to Details**: Access full plan details for any new hire

**Mock Data**: The demo includes 2-3 sample plans with varying progress levels.

### 3. Plan Detail View (`/admin/plans/[id]`)

Detailed view of a single new hire's onboarding progress.

#### Components:

**A. Plan Header**
- New hire name and role
- Start date and duration
- Overall progress percentage
- Current week indicator

**B. Progress Timeline**
- Week-by-week visualization (Weeks 1-4)
- Task completion status per week
- Color-coded indicators:
  - Green: Completed
  - Yellow: In progress
  - Gray: Not started
- Reflection submission status

**C. Task Breakdown**
- View all tasks grouped by week
- See completion status
- Identify blockers or overdue items

**D. Weekly Reflections**
- Expandable cards for each week
- View new hire responses to 4 key questions:
  1. "What's unclear or confusing?"
  2. "What's taking longer than expected?"
  3. "What was most helpful this week?"
  4. Confidence score (1-10 scale)
- Visual confidence score meter
- Highlighted concerns and blockers

**What to look for**:
- Low confidence scores (< 6) indicate potential issues
- Recurring themes in "unclear" or "taking longer" responses
- Engagement level (are reflections being submitted?)

---

## New Hire Flow Walkthrough

### 1. Dashboard (`/dashboard`)

The central hub for new hire onboarding activities.

#### Components:

**A. Welcome Header**
- Personalized greeting
- Current week indicator
- Days remaining in onboarding

**B. Progress Metrics Card**
- Overall completion percentage
- Completed tasks / Total tasks
- Current week progress
- Visual progress bar

**C. Onboarding Checklist**
- Tasks grouped by week (Weeks 1-4)
- Interactive checkboxes to mark completion
- Task descriptions and due dates
- Expandable week sections (accordion or tabs)

**Sample GTM Week 1 Tasks**:
- [ ] Complete new hire paperwork
- [ ] Set up email and communication tools
- [ ] Review company overview materials
- [ ] Schedule 1:1 with manager
- [ ] Meet your mentor/buddy

**Interaction**:
- Click checkbox to complete task
- Progress metrics update in real-time
- Visual feedback on completion

**D. Team Directory**
- Important people to meet
- Avatar, name, role, and contact info
- Role badges (Manager, Mentor, Team Member, etc.)
- Email links for easy contact

**E. Weekly Reflection Button**
- Prompts for reflection submission
- Opens modal/dialog form
- Only available at end of week (demo: always available)

### 2. Weekly Reflection Form

A dialog form with 4 questions to gather feedback:

#### Questions:
1. **What's unclear?** (textarea)
   - Identify confusing concepts or processes

2. **What's taking longer?** (textarea)
   - Flag tasks or learning areas that need more time

3. **What was most helpful?** (textarea)
   - Highlight effective onboarding elements

4. **Confidence score** (1-10 slider)
   - Self-assess comfort level and readiness

**What happens**: In demo mode, the form data is console.logged. In production, it would be saved to the database for manager review.

### 3. Module Content Pages (`/onboarding/modules/[type]`)

Deep-dive resources for each onboarding module.

#### Available Modules:

**A. Company Overview** (`/onboarding/modules/company_overview`)
- Mission, vision, and values
- Organizational structure
- Company history and milestones
- Culture and work environment

**B. Product Overview** (`/onboarding/modules/product_overview`)
- Product features and capabilities
- Customer profiles and use cases
- Product demo and sandbox access
- Roadmap and future plans

**C. Competitive Landscape** (`/onboarding/modules/competitive_landscape`)
- Competitor analysis
- Competitive advantages
- Market positioning
- Battle cards for sales conversations

**D. Tools & Systems** (`/onboarding/modules/tools_systems`)
- Communication platforms
- CRM and sales tools
- Documentation and wikis
- Login instructions and access

#### Features:
- Clean, readable formatting
- Breadcrumb navigation
- Back to dashboard link
- Print-friendly layout
- Dark/light mode support

**Navigation**: Access modules from dashboard cards or header navigation.

---

## Demo-Specific Features

### Role Switcher

Located in the header navigation.

**Purpose**: Switch between Manager and New Hire views to explore both experiences.

**How it works**:
1. Click the role switcher dropdown
2. Select "Manager" or "New Hire"
3. Header navigation updates
4. Available pages change based on role
5. Selection persists in localStorage

**Manager Navigation**:
- Setup (create plans)
- Plans (view all plans)

**New Hire Navigation**:
- Dashboard (main hub)
- Modules (learning content)

### Demo Mode Indicator

A badge in the header that reads "Demo Mode".

**Purpose**: Remind users this is a frontend demo with mock data.

**Visibility**: Always visible (hidden on mobile/small screens for space).

### Reset Demo Button

Located in the header (desktop) or menu (mobile).

**Purpose**: Clear all demo progress and start fresh.

**What it does**:
1. Clears all localStorage data
2. Resets task completion status
3. Removes form submissions
4. Redirects to homepage
5. Shows confirmation dialog before resetting

**When to use**:
- Want to start the demo over
- Testing different scenarios
- Showing the demo to someone new
- Experiencing bugs or issues

---

## Technical Notes

### Mock Data Structure

All mock data is defined in:
- `src/lib/mock-data.ts` - Data structures
- `src/lib/mock-api.ts` - Helper functions

### localStorage Keys

The demo uses these localStorage keys:
- `demo-user-role` - Current role (manager/new-hire)
- `demo-task-completions` - Completed task IDs
- `demo-reflections` - Submitted weekly reflections
- `demo-setup-data` - Manager setup wizard state

### Browser Support

- Works in all modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- Requires localStorage enabled

### Responsive Design

- Desktop optimized (1280px+)
- Tablet friendly (768px - 1279px)
- Mobile responsive (< 768px)
- Touch-friendly interactions

### Accessibility

- Keyboard navigation supported
- ARIA labels for screen readers
- Color contrast meets WCAG 2.1 AA
- Focus indicators visible

---

## Troubleshooting

### Reset Isn't Working
1. Try manually clearing localStorage:
   - Open browser DevTools (F12)
   - Go to Application/Storage tab
   - Click "Local Storage"
   - Right-click and select "Clear"
   - Refresh the page

### Tasks Won't Complete
1. Check if JavaScript is enabled
2. Check browser console for errors (F12)
3. Try refreshing the page
4. Use the Reset Demo button

### Navigation Not Updating
1. Verify role is set correctly (check Role Switcher)
2. Refresh the page
3. Clear localStorage and reset

### Dark Mode Issues
1. Toggle dark/light mode using the theme switcher
2. System preference is detected automatically
3. Selection persists across sessions

---

## Best Practices for Demo Presentations

### Preparation
1. Reset demo data before presenting
2. Test both roles before showing
3. Prepare talking points for key features
4. Have browser DevTools ready (if showing console.log)

### Presentation Flow
1. **Start with homepage**: Explain the concept
2. **Show Manager flow**: Create a plan from scratch
3. **Switch to New Hire**: Complete some tasks
4. **Return to Manager**: Show progress tracking
5. **Highlight reflections**: Demonstrate feedback loop

### Key Points to Emphasize
- Role-based experiences (manager vs new hire)
- Progress tracking and visibility
- Content customization capabilities
- Feedback collection through reflections
- Clean, intuitive UI/UX

### Common Questions

**Q: Is this connected to a real database?**
A: No, this is a frontend-only demo using mock data and localStorage.

**Q: Can I save my progress?**
A: Yes, within your browser session using localStorage. It persists until you clear it or use Reset Demo.

**Q: Will this work on mobile?**
A: Yes, the entire interface is responsive and mobile-friendly.

**Q: How do I add my own company data?**
A: In the demo, use the Setup Wizard. In production, this would save to a database.

**Q: Can I integrate this with our HR systems?**
A: This demo showcases the frontend. Production integration would require backend development.

---

## Next Steps

### For Development
- Connect to real backend API
- Implement authentication
- Add database persistence
- Build email notification system
- Add file upload capabilities
- Integrate with HR/ATS platforms

### For Product Evolution
- Add video/multimedia content support
- Build analytics dashboard
- Create mobile apps
- Add Slack/Teams integrations
- Implement AI-powered recommendations
- Add customizable workflows

---

## Feedback & Support

This is a demo environment for showcasing the RampRight platform concept.

For questions or feedback about the demo:
- Check the troubleshooting section above
- Review the implementation plan in `/specs/mvp-implementation-plan/`
- Check the project README for technical details

---

## Version Information

- **Demo Version**: Phase 7 (Frontend Complete)
- **Last Updated**: November 2024
- **Framework**: Next.js 15 with App Router
- **UI Library**: shadcn/ui with Tailwind CSS
- **Data Strategy**: Mock data with localStorage persistence

---

Thank you for exploring the RampRight demo! We hope this gives you a clear vision of how the onboarding platform can transform the new hire experience.
