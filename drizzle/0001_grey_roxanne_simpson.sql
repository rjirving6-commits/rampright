CREATE TABLE "companies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"industry" text,
	"size" text,
	"description" text,
	"website" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "important_people" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"company_id" uuid NOT NULL,
	"name" text NOT NULL,
	"title" text NOT NULL,
	"email" text NOT NULL,
	"role" text NOT NULL,
	"photo_url" text,
	"bio" text,
	"order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "module_content" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"company_id" uuid NOT NULL,
	"type" text NOT NULL,
	"title" text NOT NULL,
	"content" text,
	"order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "onboarding_plans" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"company_id" uuid NOT NULL,
	"template_id" uuid,
	"status" text DEFAULT 'not_started' NOT NULL,
	"start_date" timestamp NOT NULL,
	"current_week" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "onboarding_templates" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"company_id" uuid NOT NULL,
	"name" text NOT NULL,
	"duration_weeks" integer NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tasks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"plan_id" uuid NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"category" text,
	"week_number" integer NOT NULL,
	"completed" boolean DEFAULT false NOT NULL,
	"completed_at" timestamp,
	"order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "weekly_reflections" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"plan_id" uuid NOT NULL,
	"week_number" integer NOT NULL,
	"submitted_at" timestamp DEFAULT now() NOT NULL,
	"goals_progress" text,
	"challenges" text,
	"clarification_needed" text,
	"confidence_level" integer,
	"additional_comments" text
);
--> statement-breakpoint
ALTER TABLE "important_people" ADD CONSTRAINT "important_people_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "module_content" ADD CONSTRAINT "module_content_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "onboarding_plans" ADD CONSTRAINT "onboarding_plans_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "onboarding_plans" ADD CONSTRAINT "onboarding_plans_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "onboarding_plans" ADD CONSTRAINT "onboarding_plans_template_id_onboarding_templates_id_fk" FOREIGN KEY ("template_id") REFERENCES "public"."onboarding_templates"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "onboarding_templates" ADD CONSTRAINT "onboarding_templates_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_plan_id_onboarding_plans_id_fk" FOREIGN KEY ("plan_id") REFERENCES "public"."onboarding_plans"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "weekly_reflections" ADD CONSTRAINT "weekly_reflections_plan_id_onboarding_plans_id_fk" FOREIGN KEY ("plan_id") REFERENCES "public"."onboarding_plans"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "important_people_company_id_idx" ON "important_people" USING btree ("company_id");--> statement-breakpoint
CREATE INDEX "module_content_company_id_idx" ON "module_content" USING btree ("company_id");--> statement-breakpoint
CREATE INDEX "onboarding_plans_user_id_idx" ON "onboarding_plans" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "tasks_plan_id_idx" ON "tasks" USING btree ("plan_id");--> statement-breakpoint
CREATE INDEX "weekly_reflections_plan_id_idx" ON "weekly_reflections" USING btree ("plan_id");