// Mock data for RampRight frontend demo

export type UserRole = "manager" | "new_hire";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface Company {
  id: string;
  name: string;
  industry: string;
  size: string;
  description: string;
  website: string;
}

export interface OnboardingTemplate {
  id: string;
  name: string;
  description: string;
  duration: number; // in weeks
}

export interface Task {
  id: string;
  planId: string;
  title: string;
  description: string;
  week: number;
  day?: number;
  completed: boolean;
  category: string;
}

export type ModuleType =
  | "company_overview"
  | "product_overview"
  | "competitive_landscape"
  | "tools_systems"
  | "team_culture";

export interface ModuleContent {
  id: string;
  type: ModuleType;
  title: string;
  content: string;
  updatedAt: string;
}

export interface ImportantPerson {
  id: string;
  name: string;
  role: string;
  email: string;
  type: "manager" | "team_member" | "buddy" | "stakeholder";
  bio?: string;
  avatarUrl?: string;
}

export interface WeeklyReflection {
  id: string;
  planId: string;
  week: number;
  unclear: string;
  takingLonger: string;
  mostHelpful: string;
  confidenceScore: number; // 1-10
  submittedAt: string;
}

export interface OnboardingPlan {
  id: string;
  userId: string;
  companyId: string;
  templateId: string;
  startDate: string;
  currentWeek: number;
  status: "in_progress" | "completed" | "paused";
  createdAt: string;
}

// Mock Users
export const mockUsers: User[] = [
  {
    id: "user-1",
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    role: "manager",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  {
    id: "user-2",
    name: "Alex Chen",
    email: "alex.chen@company.com",
    role: "new_hire",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  },
];

// Mock Company
export const mockCompany: Company = {
  id: "company-1",
  name: "TechFlow Solutions",
  industry: "SaaS",
  size: "50-200 employees",
  description:
    "A leading B2B SaaS company providing workflow automation solutions for enterprise customers.",
  website: "https://techflowsolutions.com",
};

// Mock Onboarding Template
export const mockTemplate: OnboardingTemplate = {
  id: "template-gtm",
  name: "Go-To-Market (GTM) Role",
  description:
    "Comprehensive onboarding for sales, marketing, and customer success roles",
  duration: 4, // 4 weeks
};

// Mock Onboarding Plan
export const mockOnboardingPlan: OnboardingPlan = {
  id: "plan-1",
  userId: "user-2",
  companyId: "company-1",
  templateId: "template-gtm",
  startDate: "2025-01-06",
  currentWeek: 2,
  status: "in_progress",
  createdAt: "2025-01-01",
};

// Mock Tasks (4 weeks for GTM template)
export const mockTasks: Task[] = [
  // Week 1: Foundation & Culture
  {
    id: "task-1-1",
    planId: "plan-1",
    title: "Complete company orientation session",
    description: "Attend the welcome orientation and meet the leadership team",
    week: 1,
    day: 1,
    completed: true,
    category: "orientation",
  },
  {
    id: "task-1-2",
    planId: "plan-1",
    title: "Set up email and communication tools",
    description: "Configure Slack, email, calendar, and other communication platforms",
    week: 1,
    day: 1,
    completed: true,
    category: "setup",
  },
  {
    id: "task-1-3",
    planId: "plan-1",
    title: "Review company overview module",
    description: "Learn about company history, mission, values, and culture",
    week: 1,
    day: 2,
    completed: true,
    category: "learning",
  },
  {
    id: "task-1-4",
    planId: "plan-1",
    title: "Read product overview documentation",
    description: "Understand our product suite, features, and value proposition",
    week: 1,
    day: 2,
    completed: true,
    category: "learning",
  },
  {
    id: "task-1-5",
    planId: "plan-1",
    title: "Meet your onboarding buddy",
    description: "Schedule a 1:1 with your assigned buddy for ongoing support",
    week: 1,
    day: 3,
    completed: true,
    category: "relationships",
  },
  {
    id: "task-1-6",
    planId: "plan-1",
    title: "Complete IT security training",
    description: "Mandatory security awareness and compliance training",
    week: 1,
    day: 4,
    completed: false,
    category: "compliance",
  },
  {
    id: "task-1-7",
    planId: "plan-1",
    title: "Submit Week 1 reflection",
    description: "Share your first week experience and any questions",
    week: 1,
    day: 5,
    completed: false,
    category: "reflection",
  },

  // Week 2: Product Deep Dive
  {
    id: "task-2-1",
    planId: "plan-1",
    title: "Complete product demo walkthrough",
    description: "Watch and follow along with product demo videos",
    week: 2,
    day: 1,
    completed: true,
    category: "learning",
  },
  {
    id: "task-2-2",
    planId: "plan-1",
    title: "Review competitive landscape module",
    description: "Learn about competitors, market positioning, and differentiation",
    week: 2,
    day: 2,
    completed: true,
    category: "learning",
  },
  {
    id: "task-2-3",
    planId: "plan-1",
    title: "Set up CRM and sales tools",
    description: "Get access to Salesforce, HubSpot, and other GTM tools",
    week: 2,
    day: 2,
    completed: false,
    category: "setup",
  },
  {
    id: "task-2-4",
    planId: "plan-1",
    title: "Shadow a customer demo call",
    description: "Observe a live customer demo to see the product in action",
    week: 2,
    day: 3,
    completed: false,
    category: "observation",
  },
  {
    id: "task-2-5",
    planId: "plan-1",
    title: "Review sales playbook",
    description: "Study the sales methodology, process, and best practices",
    week: 2,
    day: 4,
    completed: false,
    category: "learning",
  },
  {
    id: "task-2-6",
    planId: "plan-1",
    title: "Meet with product team",
    description: "Intro meeting with product managers to understand roadmap",
    week: 2,
    day: 4,
    completed: false,
    category: "relationships",
  },
  {
    id: "task-2-7",
    planId: "plan-1",
    title: "Submit Week 2 reflection",
    description: "Reflect on product learning and any remaining questions",
    week: 2,
    day: 5,
    completed: false,
    category: "reflection",
  },

  // Week 3: Customer & Market Knowledge
  {
    id: "task-3-1",
    planId: "plan-1",
    title: "Study customer personas and use cases",
    description: "Learn about our ICP and common customer use cases",
    week: 3,
    day: 1,
    completed: false,
    category: "learning",
  },
  {
    id: "task-3-2",
    planId: "plan-1",
    title: "Review past customer success stories",
    description: "Read case studies and testimonials from happy customers",
    week: 3,
    day: 1,
    completed: false,
    category: "learning",
  },
  {
    id: "task-3-3",
    planId: "plan-1",
    title: "Join team standup meetings",
    description: "Start attending daily standups with the GTM team",
    week: 3,
    day: 2,
    completed: false,
    category: "engagement",
  },
  {
    id: "task-3-4",
    planId: "plan-1",
    title: "Practice product demo with buddy",
    description: "Give a practice demo to your buddy and get feedback",
    week: 3,
    day: 3,
    completed: false,
    category: "practice",
  },
  {
    id: "task-3-5",
    planId: "plan-1",
    title: "Review pricing and packaging",
    description: "Understand our pricing tiers, discounts, and contract terms",
    week: 3,
    day: 4,
    completed: false,
    category: "learning",
  },
  {
    id: "task-3-6",
    planId: "plan-1",
    title: "Meet with customer success team",
    description: "Learn about post-sale process and customer support",
    week: 3,
    day: 4,
    completed: false,
    category: "relationships",
  },
  {
    id: "task-3-7",
    planId: "plan-1",
    title: "Submit Week 3 reflection",
    description: "Share progress on customer knowledge and readiness",
    week: 3,
    day: 5,
    completed: false,
    category: "reflection",
  },

  // Week 4: Independence & First Wins
  {
    id: "task-4-1",
    planId: "plan-1",
    title: "Take ownership of first prospects",
    description: "Start working on assigned leads or accounts",
    week: 4,
    day: 1,
    completed: false,
    category: "execution",
  },
  {
    id: "task-4-2",
    planId: "plan-1",
    title: "Conduct first live demo (with support)",
    description: "Deliver your first customer demo with buddy/manager backup",
    week: 4,
    day: 2,
    completed: false,
    category: "execution",
  },
  {
    id: "task-4-3",
    planId: "plan-1",
    title: "Review tools and systems module",
    description: "Master all GTM tools, integrations, and workflows",
    week: 4,
    day: 2,
    completed: false,
    category: "learning",
  },
  {
    id: "task-4-4",
    planId: "plan-1",
    title: "Join customer calls and contribute",
    description: "Actively participate in customer conversations",
    week: 4,
    day: 3,
    completed: false,
    category: "execution",
  },
  {
    id: "task-4-5",
    planId: "plan-1",
    title: "30-day check-in with manager",
    description: "Review progress, goals, and any support needed going forward",
    week: 4,
    day: 4,
    completed: false,
    category: "milestone",
  },
  {
    id: "task-4-6",
    planId: "plan-1",
    title: "Complete onboarding certification quiz",
    description: "Test your knowledge on product, process, and company",
    week: 4,
    day: 4,
    completed: false,
    category: "assessment",
  },
  {
    id: "task-4-7",
    planId: "plan-1",
    title: "Submit final onboarding reflection",
    description: "Comprehensive reflection on the entire onboarding experience",
    week: 4,
    day: 5,
    completed: false,
    category: "reflection",
  },
];

// Mock Module Content (5 types)
export const mockModuleContent: ModuleContent[] = [
  {
    id: "module-1",
    type: "company_overview",
    title: "Company Overview",
    content: `# Welcome to TechFlow Solutions

## Our Story

Founded in 2018, TechFlow Solutions emerged from a simple observation: enterprise workflows were broken. Our founders, Sarah Mitchell and James Park, experienced firsthand how disconnected tools and manual processes held teams back from doing their best work.

## Mission & Vision

**Mission:** Empower teams to do their best work by automating workflows and eliminating friction.

**Vision:** A world where every team can focus on what matters most, not the tools they use.

## Core Values

1. **Customer Obsession** - We start with the customer and work backwards
2. **Innovation** - We embrace change and continuously improve
3. **Ownership** - We take responsibility and drive results
4. **Collaboration** - We win together as one team
5. **Integrity** - We do the right thing, always

## Culture

We believe in:
- Transparency and open communication
- Work-life balance and flexibility
- Continuous learning and development
- Celebrating wins, big and small
- Supporting each other's growth

## Company Milestones

- **2018:** Company founded
- **2019:** First 100 customers
- **2020:** Series A funding ($10M)
- **2021:** Reached 500 customers
- **2022:** Series B funding ($30M)
- **2023:** Launched enterprise tier
- **2024:** 2,000+ customers, 150 employees
- **2025:** Expanding internationally

## Leadership Team

- **Sarah Mitchell** - CEO & Co-founder
- **James Park** - CTO & Co-founder
- **Michael Chen** - VP of Sales
- **Rachel Adams** - VP of Marketing
- **David Kim** - VP of Product
- **Lisa Thompson** - VP of Customer Success`,
    updatedAt: "2025-01-01",
  },
  {
    id: "module-2",
    type: "product_overview",
    title: "Product Overview",
    content: `# TechFlow Platform

## What We Do

TechFlow is a comprehensive workflow automation platform that helps teams streamline their processes, reduce manual work, and improve productivity.

## Core Features

### 1. Workflow Builder
- Drag-and-drop visual workflow designer
- 500+ pre-built templates
- Custom triggers and actions
- Version control and testing

### 2. Integrations Hub
- 200+ native integrations
- API-first architecture
- Webhook support
- Custom connector builder

### 3. Analytics Dashboard
- Real-time workflow monitoring
- Performance metrics and KPIs
- Custom reports and exports
- ROI tracking

### 4. Team Collaboration
- Shared workflows and templates
- Role-based permissions
- Comments and annotations
- Activity feeds

### 5. Enterprise Controls
- SSO and SAML support
- Audit logs
- Data encryption
- Compliance certifications (SOC 2, GDPR)

## Product Tiers

### Starter ($49/month)
- Up to 5 users
- 1,000 tasks/month
- 50+ integrations
- Email support

### Professional ($199/month)
- Up to 25 users
- 10,000 tasks/month
- All integrations
- Priority support
- Advanced analytics

### Enterprise (Custom)
- Unlimited users
- Unlimited tasks
- Dedicated support
- Custom SLAs
- Advanced security
- On-premise option

## Value Proposition

**For Sales Teams:** Automate lead routing, follow-ups, and data entry
**For Marketing Teams:** Streamline campaign management and reporting
**For Operations Teams:** Connect systems and eliminate manual processes
**For Customer Success:** Automate onboarding and customer communications

## Competitive Advantages

1. Easiest to use (highest G2 ratings for usability)
2. Fastest time-to-value (deploy workflows in minutes)
3. Most reliable (99.99% uptime SLA)
4. Best support (< 1 hour response time)`,
    updatedAt: "2025-01-01",
  },
  {
    id: "module-3",
    type: "competitive_landscape",
    title: "Competitive Landscape",
    content: `# Market Position & Competition

## Market Overview

The workflow automation market is projected to reach $30B by 2026, growing at 23% CAGR. Key drivers include digital transformation, remote work, and efficiency demands.

## Main Competitors

### 1. Zapier
**Strengths:**
- Market leader with strong brand
- Largest integration library
- Simple to get started

**Weaknesses:**
- Limited enterprise features
- Can get expensive at scale
- Less robust for complex workflows

**Our Advantage:** Better enterprise features, more reliable, faster execution

### 2. Make (formerly Integromat)
**Strengths:**
- Visual workflow builder
- Powerful for complex scenarios
- Competitive pricing

**Weaknesses:**
- Steeper learning curve
- Less brand recognition
- Smaller integration library

**Our Advantage:** Easier to use, better support, more integrations

### 3. Workato
**Strengths:**
- Enterprise-focused
- Strong API management
- Good for IT teams

**Weaknesses:**
- Expensive
- Overwhelming for non-technical users
- Long implementation time

**Our Advantage:** Faster deployment, better UX, more affordable

### 4. Microsoft Power Automate
**Strengths:**
- Tight Microsoft ecosystem integration
- Included in some Office 365 plans
- Enterprise credibility

**Weaknesses:**
- Limited outside Microsoft ecosystem
- Complex licensing
- Less intuitive UI

**Our Advantage:** Platform agnostic, simpler pricing, better user experience

## Our Differentiation

### 🎯 Sweet Spot
We focus on the mid-market and growth stage companies who need:
- Enterprise-grade features without enterprise complexity
- Fast time-to-value
- Excellent support
- Fair, transparent pricing

### 💪 Key Differentiators
1. **Fastest Time-to-Value:** Average customer live in 2 days
2. **Best-in-Class Support:** < 1 hour response time, 95% CSAT
3. **Reliability:** 99.99% uptime (vs. industry avg of 99.5%)
4. **User Experience:** Highest G2 scores for ease of use

## Battle Cards

### Against Zapier
"While Zapier is great for simple automations, TechFlow is built for teams that need reliability, enterprise features, and world-class support. Plus, we're typically 30% more cost-effective at scale."

### Against Make
"Make is powerful but complex. TechFlow gives you the same capabilities with a much easier learning curve. Your team will be productive on day one."

### Against Workato
"Workato requires months and consultants to implement. With TechFlow, you'll be live in days, not months, and at a fraction of the cost."

### Against Power Automate
"If you live entirely in Microsoft, Power Automate works. But if you use best-of-breed tools across your stack, TechFlow is the better choice."`,
    updatedAt: "2025-01-01",
  },
  {
    id: "module-4",
    type: "tools_systems",
    title: "Tools & Systems",
    content: `# GTM Tools & Systems

## Communication & Collaboration

### Slack
- Primary communication platform
- Channels: #sales, #marketing, #customer-success, #general
- Use threads to keep conversations organized
- Set status when in meetings or focused work

### Google Workspace
- Email: yourname@techflowsolutions.com
- Calendar: Schedule meetings, block focus time
- Drive: Shared documents and resources
- Meet: Video conferencing

### Zoom
- Customer-facing calls and demos
- Record important meetings (with permission)
- Use virtual backgrounds
- Enable closed captions for accessibility

## Sales & CRM

### Salesforce
- **Purpose:** CRM and deal management
- **Access:** Request from IT via Slack
- **Training:** Salesforce enablement course in LMS

**Key Objects:**
- Leads: New prospects
- Accounts: Customer organizations
- Opportunities: Active deals
- Contacts: Individual people

**Best Practices:**
- Update opportunities daily
- Log all customer interactions
- Keep fields current and accurate
- Use standard stage naming

### Outreach
- **Purpose:** Sales engagement and sequencing
- **Access:** Provisioned during onboarding
- **Training:** Outreach bootcamp (scheduled Week 2)

**Features:**
- Email sequences
- Call logging
- Task management
- Analytics

### Gong
- **Purpose:** Call recording and analysis
- **Access:** Auto-provisioned
- **Training:** Self-serve tutorials

**Usage:**
- All customer calls auto-recorded
- Review your calls for self-improvement
- Learn from top performers
- Managers review for coaching

## Marketing Tools

### HubSpot
- Marketing automation
- Lead scoring
- Campaign management
- Analytics and reporting

### LinkedIn Sales Navigator
- Prospect research
- Social selling
- Lead recommendations
- InMail messaging

## Customer Success

### Zendesk
- Customer support ticketing
- Knowledge base
- Live chat
- Customer satisfaction surveys

### ChurnZero
- Customer health scoring
- Usage analytics
- Automated playbooks
- Success planning

## Data & Analytics

### Tableau
- **Purpose:** Business intelligence and reporting
- **Access:** View access for all, edit for analysts
- **Dashboards:**
  - Sales performance
  - Pipeline analytics
  - Customer health
  - Marketing attribution

### Looker
- Product usage analytics
- Customer behavior analysis
- Feature adoption tracking

## Productivity & Learning

### Notion
- Team wiki
- Project management
- Documentation
- Meeting notes

### Guru
- Knowledge management
- Quick access to answers
- Browser extension
- Slack integration

## Security & IT

### 1Password
- Password manager
- Secure credential sharing
- Team vaults

### Okta
- Single sign-on (SSO)
- Multi-factor authentication
- Access management

## Getting Help

### IT Support
- Slack: #it-support
- Email: it@techflowsolutions.com
- Urgent: Call ext. 1234

### Tool-Specific Help
- Most tools have a #tool-name channel in Slack
- Check Notion wiki for documentation
- Ask your buddy or manager`,
    updatedAt: "2025-01-01",
  },
  {
    id: "module-5",
    type: "team_culture",
    title: "Team Culture & Ways of Working",
    content: `# Team Culture & Ways of Working

## Our GTM Team Culture

We're a high-performing, collaborative team that wins together. We believe in transparency, accountability, and having fun along the way.

## Working Hours & Flexibility

### Core Hours
- 10am - 4pm (your local timezone)
- Be available for meetings and collaboration
- Block focus time on your calendar

### Flexible Schedule
- Start early or late based on your preference
- Take breaks when you need them
- Manage your own schedule
- Results matter more than hours

### Remote Work
- Fully distributed team
- Monthly in-person team gatherings
- Annual company offsites
- Quarterly regional meetups

## Communication Norms

### Response Times
- **Slack urgent:** Within 1 hour during work hours
- **Slack normal:** Within 4 hours
- **Email:** Within 24 hours
- **Customer requests:** Within 2 hours

### Meeting Etiquette
- Camera on by default
- Arrive on time
- Come prepared with agenda
- End with clear action items
- Record important sessions

### Written Communication
- Use clear, concise language
- Provide context in threads
- Tag people when you need their input
- Use emoji reactions to acknowledge

## Team Rituals

### Daily
- **Morning Standup (9:30am):** Quick sync on priorities
- **Slack check-ins:** Share wins and blockers

### Weekly
- **Monday Team Call:** Week kickoff and priorities
- **Friday Wins:** Celebrate the week's achievements
- **1:1s with Manager:** Coaching and support

### Monthly
- **All-Hands Meeting:** Company updates
- **GTM Team Lunch:** Team bonding (virtual or in-person)
- **Learning Session:** Skill development

### Quarterly
- **Business Reviews:** Results and strategy
- **Goal Setting:** OKR planning
- **Team Offsite:** Strategy and fun

## Recognition & Celebrations

### Wins Channel
- Share customer wins in #wins
- Celebrate personal milestones
- Recognize peer contributions

### Awards
- Monthly MVP Award
- Quarterly President's Club
- Annual Top Performer
- Peer recognition badges

## Professional Development

### Learning Budget
- $2,000/year per person
- Books, courses, conferences
- Certifications and training

### Career Growth
- Clear career paths
- Regular promotion cycles
- Internal mobility encouraged
- Mentorship program

## Well-being & Benefits

### Time Off
- Unlimited PTO (minimum 3 weeks/year)
- 10 company holidays
- Birthday day off
- Volunteer days

### Health & Wellness
- Comprehensive health insurance
- Mental health support (Talkspace)
- Fitness stipend ($100/month)
- Ergonomic home office setup

### Perks
- Latest laptop and equipment
- Phone stipend
- Internet reimbursement
- Co-working space access

## Diversity & Inclusion

We're committed to building a diverse and inclusive team where everyone feels they belong.

- Employee Resource Groups (ERGs)
- Unconscious bias training
- Inclusive hiring practices
- Pay equity audits

## Feedback Culture

### Giving Feedback
- Timely and specific
- Focus on behavior, not personality
- Assume positive intent
- Offer solutions

### Receiving Feedback
- Listen actively
- Ask clarifying questions
- Thank the person
- Act on it

### 360 Reviews
- Twice per year
- Manager, peer, and self feedback
- Focus on growth and development

## Having Fun

Work is important, but so is enjoying the journey!

- Virtual game nights
- Trivia competitions
- Fitness challenges
- Holiday parties
- Random coffee chats (Donut)

## Questions?

Your manager and buddy are here to help you navigate our culture. Don't hesitate to ask!`,
    updatedAt: "2025-01-01",
  },
];

// Mock Important People
export const mockImportantPeople: ImportantPerson[] = [
  {
    id: "person-1",
    name: "Sarah Johnson",
    role: "Sales Manager",
    email: "sarah.johnson@company.com",
    type: "manager",
    bio: "Your direct manager. Here to support your success and growth.",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  {
    id: "person-2",
    name: "Michael Torres",
    role: "Senior Account Executive",
    email: "michael.torres@company.com",
    type: "buddy",
    bio: "Your onboarding buddy. Reach out anytime for questions or guidance.",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
  },
  {
    id: "person-3",
    name: "Emily Rodriguez",
    role: "VP of Sales",
    email: "emily.rodriguez@company.com",
    type: "stakeholder",
    bio: "Head of Sales. Feel free to reach out with ideas or feedback.",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
  },
  {
    id: "person-4",
    name: "David Kim",
    role: "VP of Product",
    email: "david.kim@company.com",
    type: "stakeholder",
    bio: "Product leader. Great resource for product questions and roadmap.",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
  },
  {
    id: "person-5",
    name: "Jessica Martinez",
    role: "Customer Success Manager",
    email: "jessica.martinez@company.com",
    type: "team_member",
    bio: "CS team lead. Partner with her on customer onboarding and support.",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica",
  },
  {
    id: "person-6",
    name: "Ryan O'Connor",
    role: "Sales Engineer",
    email: "ryan.oconnor@company.com",
    type: "team_member",
    bio: "Technical expert. Join him on demos for technical deep dives.",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ryan",
  },
];

// Mock Weekly Reflections
export const mockWeeklyReflections: WeeklyReflection[] = [
  {
    id: "reflection-1",
    planId: "plan-1",
    week: 1,
    unclear:
      "Still getting familiar with the product features and how they compare to competitors. Would love more hands-on time with the platform.",
    takingLonger:
      "Setting up all the tools took longer than expected. Lots of accounts and passwords to manage.",
    mostHelpful:
      "The onboarding buddy session was incredibly helpful. Michael answered all my questions and shared practical tips.",
    confidenceScore: 7,
    submittedAt: "2025-01-10T17:30:00Z",
  },
];
