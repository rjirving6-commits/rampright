# RampRight - Employee Onboarding Platform

A modern employee onboarding platform designed for HR managers and hiring managers to create structured, trackable onboarding experiences that help new hires succeed from day one.

## 🎯 Overview

RampRight helps HR teams transform onboarding from paperwork chaos into a strategic advantage. Create custom onboarding plans, track progress across all new hires, and prove your impact with data-driven analytics.

### For HR Managers

- **Create custom onboarding plans in minutes** - Build personalized journeys by role, department, and location
- **Track progress across all new hires** - Real-time dashboards show completion rates and milestone progress
- **Automated weekly check-ins** - Pulse surveys capture feedback and catch issues early
- **Centralized resources** - Company info, team directory, and key contacts in one place
- **Prove HR's strategic impact** - Analytics on ramp time, completion rates, and retention

### For New Hires

- **Structured onboarding checklist** - Clear tasks organized by week with completion tracking
- **Learning modules** - Company overview, product info, competitive landscape, and tools
- **Team directory** - Know who to ask for help with photos, titles, and contact info
- **Weekly reflections** - Share progress, challenges, and questions with your manager

## 🚀 Features

- **🔐 Authentication**: Better Auth with Google OAuth integration
- **🗃️ Database**: Drizzle ORM with PostgreSQL for production data storage
- **🎨 UI Components**: shadcn/ui with Tailwind CSS and dark mode support
- **⚡ Modern Stack**: Next.js 15, React 19, TypeScript
- **📱 Responsive**: Mobile-first design that works on all devices
- **📊 Analytics**: Track onboarding progress and measure success

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18.0 or higher ([Download here](https://nodejs.org/))
- **pnpm**: Package manager (`npm install -g pnpm`)
- **Git**: For cloning the repository ([Download here](https://git-scm.com/))
- **PostgreSQL**: Either locally installed or access to a hosted service like Vercel Postgres

## 🛠️ Quick Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/rampright.git
cd rampright
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Environment Setup

Copy the example environment file:

```bash
cp env.example .env
```

Fill in your environment variables in the `.env` file:

```env
# Database
POSTGRES_URL="postgresql://username:password@localhost:5432/rampright"

# Authentication - Better Auth
BETTER_AUTH_SECRET="your-random-32-character-secret-key-here"

# Google OAuth (Get from Google Cloud Console)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Database Setup

Generate and run database migrations:

```bash
pnpm run db:generate
pnpm run db:migrate
```

### 5. Start the Development Server

```bash
pnpm run dev
```

Your application will be available at [http://localhost:3000](http://localhost:3000)

## 🎓 Getting Started for HR Managers

### First Time Setup

1. **Sign Up** - Visit the landing page and click "Get Started"
2. **Authenticate** - Sign in with your Google account
3. **Complete Setup Wizard** - Follow the 4-step process to:
   - Create your company profile
   - Add company information (overview, product, tools, culture)
   - Add important people (managers, buddies, team members)
   - Review and confirm your setup

### Creating Your First Onboarding Plan

After completing setup, you can create onboarding plans for new hires:

1. Navigate to `/admin/plans`
2. Click "Create New Plan"
3. Select the new hire and configure their onboarding timeline
4. Tasks are automatically generated based on your company setup
5. Track progress as the new hire completes their onboarding

### Managing Onboarding Plans

- **View All Plans** - `/admin/plans` shows all active onboarding plans
- **Track Progress** - See completion percentages and current week
- **Review Reflections** - Read weekly feedback from new hires
- **Update Content** - Edit company info, people, and resources anytime

## 👥 How New Hires Access the Platform

> **Note**: Automated email invitation system is a planned future enhancement

Currently, new hires can access their onboarding dashboard after authentication:

1. New hire signs in with their Google account
2. System checks for an assigned onboarding plan
3. If a plan exists, they're directed to `/dashboard`
4. Dashboard shows their personalized onboarding checklist, resources, and team directory

**Coming Soon**: Automated email invitations with direct links to onboarding dashboard

## ⚙️ Service Configuration

### PostgreSQL Database on Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to the **Storage** tab
3. Click **Create** → **Postgres**
4. Choose your database name and region
5. Copy the `POSTGRES_URL` from the `.env.local` tab
6. Add it to your `.env` file

### Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
4. Set application type to **Web application**
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)
6. Copy the **Client ID** and **Client Secret** to your `.env` file

## 🗂️ Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── auth/[...all]/       # Better Auth catch-all route
│   │   └── diagnostics/         # System diagnostics
│   ├── admin/                   # Manager/Admin pages
│   │   ├── setup/               # Setup wizard
│   │   └── plans/               # Plan management
│   ├── dashboard/               # New hire dashboard
│   └── onboarding/              # Onboarding modules
├── components/                  # React components
│   ├── admin/                   # Admin-specific components
│   ├── auth/                    # Authentication components
│   ├── onboarding/              # Onboarding flow components
│   └── ui/                      # shadcn/ui components
└── lib/                         # Utilities and configurations
    ├── auth.ts                  # Better Auth server config
    ├── auth-client.ts           # Client-side auth utilities
    ├── db.ts                    # Database connection
    ├── schema.ts                # Database schema
    └── utils.ts                 # General utilities
```

## 🔧 Available Scripts

```bash
pnpm run dev          # Start development server
pnpm run build        # Build for production (runs db:migrate first)
pnpm run start        # Start production server
pnpm run lint         # Run ESLint
pnpm run typecheck    # TypeScript type checking
pnpm run db:generate  # Generate database migrations
pnpm run db:migrate   # Run database migrations
pnpm run db:push      # Push schema changes to database
pnpm run db:studio    # Open Drizzle Studio (database GUI)
pnpm run db:dev       # Push schema for development
pnpm run db:reset     # Reset database (drop all tables)
```

## 📖 Pages Overview

### Public Pages
- **Home (`/`)** - Landing page with features and "Get Started" CTA
- **Sign In** - Google OAuth authentication

### HR Manager Pages
- **Setup Wizard (`/admin/setup`)** - First-time company setup (4 steps)
- **Plans Overview (`/admin/plans`)** - View all onboarding plans
- **Plan Details (`/admin/plans/[id]`)** - Track individual new hire progress

### New Hire Pages
- **Dashboard (`/dashboard`)** - Main onboarding hub with checklist and resources
- **Learning Modules (`/onboarding/modules/[type]`)** - Company info, product, tools, etc.

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel Dashboard](https://vercel.com/new)
3. Configure environment variables:
   - `POSTGRES_URL` - Production PostgreSQL connection string
   - `BETTER_AUTH_SECRET` - Secure random 32+ character string
   - `GOOGLE_CLIENT_ID` - Google OAuth Client ID
   - `GOOGLE_CLIENT_SECRET` - Google OAuth Client Secret
   - `NEXT_PUBLIC_APP_URL` - Your production domain
4. Deploy!

### Production Checklist

Before deploying to production:

- [ ] Database migrations applied (`pnpm run db:migrate`)
- [ ] Environment variables configured in Vercel
- [ ] Google OAuth redirect URIs updated for production domain
- [ ] Test authentication flow
- [ ] Test setup wizard end-to-end
- [ ] Verify onboarding plan creation

## 📚 Documentation

- **Database Schema** - See `docs/database-schema.md` for full schema documentation
- **API Reference** - See `docs/api-reference.md` for endpoint documentation
- **Better Auth Guide** - `docs/technical/betterauth/`
- **AI Integration** - `docs/technical/ai/`

## 🤝 Contributing

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Need Help?

If you encounter any issues:

1. Check the documentation in the `docs/` folder
2. Review existing issues on GitHub
3. Create a new issue with detailed information

---

**Built with ❤️ for HR teams who want to make onboarding right**
