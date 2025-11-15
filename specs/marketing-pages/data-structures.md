# Data Structures for Marketing Pages

## Blog Post Interface

```typescript
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string; // Full content for detail pages (future)
  author: {
    name: string;
    avatar?: string;
  };
  publishedAt: string; // ISO date string
  readTime: number; // in minutes
  category?: string;
  tags?: string[];
  featuredImage?: string;
}
```

**Placeholder Data:**
- 5-6 blog posts
- Topics: onboarding best practices, HR trends, product updates, customer stories
- Dates: Last 3 months
- Read times: 3-8 minutes

## Case Study Interface

```typescript
interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  company: {
    name: string;
    logo?: string;
    industry: string;
    size: string; // e.g., "50-200 employees"
  };
  challenge: string;
  solution: string;
  results: {
    metric: string;
    value: string;
    description: string;
  }[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  featuredImage?: string;
}
```

**Placeholder Data:**
- 3-4 case studies
- Industries: Tech, Healthcare, Finance, Retail
- Company sizes: Various (startup to enterprise)
- Results: Quantifiable metrics (time saved, satisfaction, retention)

## Changelog Entry Interface

```typescript
interface ChangelogEntry {
  version: string;
  date: string; // ISO date string
  changes: {
    type: 'feature' | 'improvement' | 'fix' | 'security';
    description: string;
  }[];
}
```

**Placeholder Data:**
- 6-8 version releases
- Dates: Last 6 months
- Mix of features, improvements, and fixes
- Versions: Semantic versioning (e.g., 1.5.0, 1.4.2)

## Roadmap Item Interface

```typescript
interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  status: 'planned' | 'in-progress' | 'upcoming';
  category: string; // e.g., 'Analytics', 'Integrations', 'AI'
  quarter?: string; // e.g., 'Q2 2025'
  priority?: 'low' | 'medium' | 'high';
}
```

**Placeholder Data:**
- 8-10 roadmap items
- Mix of statuses (planned, in-progress, upcoming)
- Categories: Analytics, AI, Integrations, Mobile, Automation
- Timeframes: Q1-Q4 2025

## Sample Placeholder Content

### Blog Posts (Examples)

1. **"5 Ways to Reduce Time-to-Productivity for New Hires"**
   - Author: Sarah Johnson
   - Published: 2 weeks ago
   - Read time: 5 min

2. **"The ROI of Structured Onboarding: What the Data Shows"**
   - Author: Michael Chen
   - Published: 1 month ago
   - Read time: 7 min

3. **"Building a Culture of Belonging from Day One"**
   - Author: Emily Rodriguez
   - Published: 1 month ago
   - Read time: 6 min

### Case Studies (Examples)

1. **TechFlow Solutions**
   - Industry: SaaS
   - Challenge: 60% of new hires felt lost in first week
   - Results: 50% faster ramp time, 90% satisfaction

2. **HealthCare Plus**
   - Industry: Healthcare
   - Challenge: Inconsistent onboarding across 12 locations
   - Results: 100% compliance, 40% time savings

### Changelog (Examples)

**v1.5.0** - January 15, 2025
- Feature: AI-powered chat assistant
- Feature: Weekly reflection forms
- Improvement: Enhanced analytics dashboard
- Fix: Task completion notification bug

**v1.4.2** - December 20, 2024
- Improvement: Faster page load times
- Fix: Mobile navigation issue
- Security: Updated authentication dependencies

### Roadmap (Examples)

1. **Mobile App** (In Progress, Q1 2025)
   - Native iOS and Android apps for on-the-go access

2. **Slack Integration** (Planned, Q2 2025)
   - Send onboarding reminders and updates directly to Slack

3. **Advanced Analytics** (Upcoming, Q2 2025)
   - Predictive retention modeling and cohort analysis
