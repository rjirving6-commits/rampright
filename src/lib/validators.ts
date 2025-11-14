import { z } from "zod";

/**
 * Company validation schemas
 */

export const createCompanySchema = z.object({
  name: z.string().min(1, "Company name is required"),
  industry: z.string().optional(),
  size: z.string().optional(),
  description: z.string().optional(),
  website: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

export const updateCompanySchema = createCompanySchema.partial();

export type CreateCompanyInput = z.infer<typeof createCompanySchema>;
export type UpdateCompanyInput = z.infer<typeof updateCompanySchema>;

/**
 * Onboarding Plan validation schemas
 */

export const createOnboardingPlanSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  companyId: z.string().uuid("Invalid company ID"),
  templateId: z.string().uuid("Invalid template ID").optional(),
  startDate: z.string().datetime("Invalid date format"),
  status: z
    .enum(["not_started", "in_progress", "completed"])
    .default("not_started"),
  currentWeek: z.number().int().min(1).default(1),
});

export const updateOnboardingPlanSchema = z.object({
  status: z.enum(["not_started", "in_progress", "completed"]).optional(),
  currentWeek: z.number().int().min(1).optional(),
  startDate: z.string().datetime("Invalid date format").optional(),
});

export type CreateOnboardingPlanInput = z.infer<
  typeof createOnboardingPlanSchema
>;
export type UpdateOnboardingPlanInput = z.infer<
  typeof updateOnboardingPlanSchema
>;

/**
 * Task validation schemas
 */

export const createTaskSchema = z.object({
  title: z.string().min(1, "Task title is required"),
  description: z.string().optional(),
  category: z.string().optional(),
  weekNumber: z.number().int().min(1, "Week number must be at least 1"),
  order: z.number().int().min(0).default(0),
});

export const updateTaskSchema = createTaskSchema.partial();

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;

/**
 * Module Content validation schemas
 */

export const moduleTypeSchema = z.enum([
  "company_overview",
  "product",
  "competitive",
  "tools",
  "culture",
]);

export const createModuleContentSchema = z.object({
  type: moduleTypeSchema,
  title: z.string().min(1, "Module title is required"),
  content: z.string().optional(),
  order: z.number().int().min(0).default(0),
});

export const updateModuleContentSchema = createModuleContentSchema.partial();

export type ModuleType = z.infer<typeof moduleTypeSchema>;
export type CreateModuleContentInput = z.infer<
  typeof createModuleContentSchema
>;
export type UpdateModuleContentInput = z.infer<
  typeof updateModuleContentSchema
>;

/**
 * Important People validation schemas
 */

export const personRoleSchema = z.enum([
  "manager",
  "buddy",
  "stakeholder",
  "team_member",
]);

export const createImportantPersonSchema = z.object({
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Title is required"),
  email: z.string().email("Invalid email address"),
  role: personRoleSchema,
  photoUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  bio: z.string().optional(),
  order: z.number().int().min(0).default(0),
});

export const updateImportantPersonSchema =
  createImportantPersonSchema.partial();

export type PersonRole = z.infer<typeof personRoleSchema>;
export type CreateImportantPersonInput = z.infer<
  typeof createImportantPersonSchema
>;
export type UpdateImportantPersonInput = z.infer<
  typeof updateImportantPersonSchema
>;

/**
 * Weekly Reflection validation schemas
 */

export const createWeeklyReflectionSchema = z.object({
  weekNumber: z.number().int().min(1, "Week number must be at least 1"),
  goalsProgress: z.string().optional(),
  challenges: z.string().optional(),
  clarificationNeeded: z.string().optional(),
  confidenceLevel: z
    .number()
    .int()
    .min(1, "Confidence level must be between 1 and 5")
    .max(5, "Confidence level must be between 1 and 5")
    .optional(),
  additionalComments: z.string().optional(),
});

export type CreateWeeklyReflectionInput = z.infer<
  typeof createWeeklyReflectionSchema
>;

/**
 * Onboarding Template validation schemas
 */

export const createOnboardingTemplateSchema = z.object({
  name: z.string().min(1, "Template name is required"),
  durationWeeks: z.number().int().min(1, "Duration must be at least 1 week"),
  description: z.string().optional(),
});

export const updateOnboardingTemplateSchema =
  createOnboardingTemplateSchema.partial();

export type CreateOnboardingTemplateInput = z.infer<
  typeof createOnboardingTemplateSchema
>;
export type UpdateOnboardingTemplateInput = z.infer<
  typeof updateOnboardingTemplateSchema
>;

/**
 * Utility function to validate data against a schema
 */
export function validateData<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: Record<string, string[]> } {
  const result = schema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  const errors: Record<string, string[]> = {};
  result.error.issues.forEach((error: z.ZodIssue) => {
    const path = error.path.join(".");
    if (!errors[path]) {
      errors[path] = [];
    }
    errors[path].push(error.message);
  });

  return { success: false, errors };
}
