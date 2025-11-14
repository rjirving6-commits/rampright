# Production Migration Requirements

## Overview
Transition RampRight from a demo/prototype application with mock data to a production-ready application with real database integration, while refocusing the landing page on the target audience (HR and hiring managers).

## Business Context

### Current State
- Application built as frontend-only demo with extensive mock data
- Demo mode with role switching (Manager/New Hire views)
- Mock data stored in `src/lib/mock-data.ts` (1,407 lines) and `src/lib/mock-api.ts` (320 lines)
- Landing page has generic messaging and demo access cards
- localStorage-based persistence for demo state
- Console logging instead of real API calls

### Target State
- Production-ready application with PostgreSQL database integration
- Real API endpoints replacing all mock data functions
- Landing page focused on HR/hiring managers as primary users
- Signup flow directing managers to setup wizard
- New hires access via email invitations (not from landing page)
- Complete removal of demo-specific components and mock data
- Proper authentication and authorization

## Primary Goals

### 1. Remove All Mock Data and Demo Features
- Delete demo-specific UI components (DemoResetButton, RoleSwitcher)
- Remove all mock data files and references
- Clean up localStorage demo keys
- Remove demo-related documentation

### 2. Implement Real Database Layer
- Create comprehensive database schema for all entities
- Build API routes for all CRUD operations
- Replace mock API functions with real database calls
- Implement proper error handling and validation

### 3. Refocus Landing Page for Target Audience
- Remove demo access cards and generic messaging
- Update copy to target HR and hiring managers specifically
- Direct signup CTA to setup wizard (`/admin/setup`)
- Clarify that new hires access via invitation, not landing page
- Update navigation to reflect manager-first approach

### 4. Set Dark Mode Default to System Settings
- Update theme provider to default to system preferences
- Remove hardcoded light mode default

## User Personas

### Primary User: HR Manager / Hiring Manager
**Access Pattern**:
- Arrives at landing page
- Signs up via "Get Started" CTA
- Redirected to setup wizard after authentication
- Creates onboarding plans for new hires
- Tracks progress across multiple employees

### Secondary User: New Hire
**Access Pattern**:
- Receives email invitation from manager
- Clicks invite link to sign up/sign in
- Auto-assigned to their onboarding plan
- Accesses their dashboard to complete tasks
- **Does NOT access via main landing page**

## Functional Requirements

### Landing Page
- [ ] Hero section targeting HR/hiring managers
- [ ] Feature highlights focused on manager benefits
- [ ] Primary CTA: "Get Started" → `/admin/setup`
- [ ] Remove all demo access cards and functionality
- [ ] Clean, professional design suitable for B2B SaaS
- [ ] Optional: Secondary CTA for demo video/walkthrough

### Authentication Flow
- [ ] Sign up redirects to setup wizard for new managers
- [ ] Existing users route based on role:
  - Managers → `/admin/plans`
  - New hires → `/dashboard`
- [ ] New hire invitations include unique signup links
- [ ] Proper session management via BetterAuth

### Database Schema
Must support:
- [ ] Companies with profile information
- [ ] Onboarding templates (reusable plans)
- [ ] Onboarding plans (instances per employee)
- [ ] Tasks with week assignments and completion tracking
- [ ] Module content (markdown-based learning materials)
- [ ] Important people directory
- [ ] Weekly reflections with confidence tracking
- [ ] User role management (manager vs new hire)

### API Layer
All endpoints must:
- [ ] Require authentication
- [ ] Implement proper authorization (users can only access their company's data)
- [ ] Return consistent error formats
- [ ] Validate input data
- [ ] Handle edge cases gracefully

### Component Updates
All 11 components currently using mock data must:
- [ ] Fetch data from real API endpoints
- [ ] Show loading states
- [ ] Handle errors with user-friendly messages
- [ ] Update UI based on real-time data
- [ ] Remove all console.log statements

## Technical Requirements

### Database
- PostgreSQL via Drizzle ORM
- Migrations for all schema changes
- Proper indexes for performance
- Foreign key constraints for data integrity

### API Standards
- RESTful conventions
- Consistent response formats
- HTTP status codes (200, 201, 400, 401, 403, 404, 500)
- Request/response validation
- Rate limiting (future consideration)

### Security
- [ ] Authentication required for all protected routes
- [ ] Authorization checks (company-level data isolation)
- [ ] Input sanitization
- [ ] SQL injection prevention (via Drizzle ORM)
- [ ] XSS prevention (React default + proper escaping)

### Performance
- [ ] Efficient database queries (no N+1 problems)
- [ ] Pagination for large datasets
- [ ] Proper indexing
- [ ] Client-side caching where appropriate

## Non-Functional Requirements

### Code Quality
- [ ] TypeScript strict mode compliance
- [ ] ESLint passing with no warnings
- [ ] Consistent code formatting
- [ ] Proper error handling throughout

### Documentation
- [ ] Update README.md with production setup instructions
- [ ] Update CLAUDE.md to remove mock data references
- [ ] Create API reference documentation
- [ ] Document database schema
- [ ] Remove demo-guide.md

### Backward Compatibility
- Demo branch preserved for reference
- No breaking changes to existing auth implementation
- UI/UX consistency maintained where possible

## Success Criteria

### Phase Completion
- [ ] All mock data files deleted
- [ ] All demo UI components removed
- [ ] Database schema complete and migrated
- [ ] All API endpoints functional and tested
- [ ] All components using real data
- [ ] Landing page refocused on HR managers
- [ ] Dark mode defaults to system settings
- [ ] `npm run lint && npm run typecheck` passes
- [ ] Production build succeeds

### Quality Gates
- [ ] No console.log or console.error in production code
- [ ] No TypeScript errors or warnings
- [ ] No ESLint errors or warnings
- [ ] No references to mock data in codebase
- [ ] All localStorage demo keys cleaned up

## Out of Scope (for this feature)

- Unit testing and E2E testing
- Email delivery system (can use console logging temporarily)
- Payment/billing integration
- Advanced analytics or reporting
- Mobile app development
- Third-party integrations (Slack, etc.)
- AI-powered features beyond existing chat

## Risk Mitigation

### High-Risk Areas
1. **Data Migration**: If any real users exist in demo mode
   - Mitigation: Create data export/import utilities

2. **Authentication Flow Changes**: Breaking existing sessions
   - Mitigation: Test thoroughly, plan for user re-authentication

3. **Component Refactoring**: Breaking UI functionality
   - Mitigation: Update incrementally, test each component

### Rollback Strategy
- Keep demo branch intact
- Commit after each phase completion
- Use feature flags if needed for gradual rollout

## Timeline Estimate
- **Total Estimated Time**: 9-11 hours
- **Recommended Approach**: Complete over 3-4 work sessions
- **Can be deployed incrementally**: Yes, by phase

## Dependencies
- PostgreSQL database (already configured)
- BetterAuth (already configured)
- Drizzle ORM (already configured)
- All existing environment variables remain the same

## Future Enhancements (Post-Migration)
- Email invitation system with real SMTP
- Onboarding plan templates library
- Progress analytics and reporting
- Slack/Teams integrations
- AI-powered onboarding recommendations
- Mobile responsiveness improvements
