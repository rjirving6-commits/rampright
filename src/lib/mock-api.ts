// Mock API helper functions for RampRight frontend demo

import {
  mockOnboardingPlan,
  mockTasks,
  mockModuleContent,
  mockImportantPeople,
  mockWeeklyReflections,
  mockUsers,
  mockCompany,
  mockTemplate,
  type OnboardingPlan,
  type Task,
  type ModuleContent,
  type ImportantPerson,
  type WeeklyReflection,
  type ModuleType,
  type User,
  type Company,
  type OnboardingTemplate,
} from "./mock-data";

/**
 * Get onboarding plan for a specific user
 */
export function getOnboardingPlan(userId: string): OnboardingPlan | null {
  // In a real app, this would filter by userId
  // For demo, we return the mock plan if userId matches
  if (userId === mockOnboardingPlan.userId) {
    return mockOnboardingPlan;
  }
  return null;
}

/**
 * Get all onboarding plans (for manager view)
 */
export function getAllOnboardingPlans(): OnboardingPlan[] {
  // For demo, return a few mock plans
  return [
    mockOnboardingPlan,
    {
      ...mockOnboardingPlan,
      id: "plan-2",
      userId: "user-3",
      startDate: "2024-12-15",
      currentWeek: 4,
      status: "completed" as const,
    },
    {
      ...mockOnboardingPlan,
      id: "plan-3",
      userId: "user-4",
      startDate: "2025-01-13",
      currentWeek: 1,
      status: "in_progress" as const,
    },
  ];
}

/**
 * Get tasks for a specific onboarding plan
 */
export function getTasks(planId: string): Task[] {
  return mockTasks.filter((task) => task.planId === planId);
}

/**
 * Get tasks grouped by week
 */
export function getTasksByWeek(planId: string): Record<number, Task[]> {
  const tasks = getTasks(planId);
  const grouped: Record<number, Task[]> = {};

  tasks.forEach((task) => {
    if (!grouped[task.week]) {
      grouped[task.week] = [];
    }
    grouped[task.week].push(task);
  });

  return grouped;
}

/**
 * Get module content by type
 */
export function getModuleContent(type: ModuleType): ModuleContent | null {
  return mockModuleContent.find((module) => module.type === type) || null;
}

/**
 * Get all module content
 */
export function getAllModuleContent(): ModuleContent[] {
  return mockModuleContent;
}

/**
 * Get important people list
 */
export function getImportantPeople(): ImportantPerson[] {
  return mockImportantPeople;
}

/**
 * Get weekly reflections for a specific plan
 */
export function getReflections(planId: string): WeeklyReflection[] {
  return mockWeeklyReflections.filter(
    (reflection) => reflection.planId === planId
  );
}

/**
 * Get reflection for a specific week
 */
export function getReflectionByWeek(
  planId: string,
  week: number
): WeeklyReflection | null {
  return (
    mockWeeklyReflections.find(
      (r) => r.planId === planId && r.week === week
    ) || null
  );
}

/**
 * Calculate progress based on task completion
 */
export function calculateProgress(tasks: Task[]): {
  totalTasks: number;
  completedTasks: number;
  percentage: number;
  byWeek: Record<number, { total: number; completed: number; percentage: number }>;
} {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Calculate progress by week
  const byWeek: Record<number, { total: number; completed: number; percentage: number }> = {};

  tasks.forEach((task) => {
    if (!byWeek[task.week]) {
      byWeek[task.week] = { total: 0, completed: 0, percentage: 0 };
    }
    byWeek[task.week].total++;
    if (task.completed) {
      byWeek[task.week].completed++;
    }
  });

  // Calculate percentage for each week
  Object.keys(byWeek).forEach((weekStr) => {
    const week = parseInt(weekStr);
    const { total, completed } = byWeek[week];
    byWeek[week].percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  });

  return {
    totalTasks,
    completedTasks,
    percentage,
    byWeek,
  };
}

/**
 * Get user by ID
 */
export function getUser(userId: string): User | null {
  return mockUsers.find((user) => user.id === userId) || null;
}

/**
 * Get all users
 */
export function getAllUsers(): User[] {
  return mockUsers;
}

/**
 * Get company information
 */
export function getCompany(): Company {
  return mockCompany;
}

/**
 * Get onboarding template
 */
export function getTemplate(templateId: string): OnboardingTemplate | null {
  // For demo, only one template exists
  if (templateId === mockTemplate.id) {
    return mockTemplate;
  }
  return null;
}

/**
 * Get all available templates
 */
export function getAllTemplates(): OnboardingTemplate[] {
  return [mockTemplate];
}

/**
 * Toggle task completion status
 * In a real app, this would make an API call
 * For demo, it updates local state
 */
export function toggleTaskCompletion(taskId: string, tasks: Task[]): Task[] {
  return tasks.map((task) =>
    task.id === taskId ? { ...task, completed: !task.completed } : task
  );
}

/**
 * Submit weekly reflection
 * In a real app, this would POST to an API
 * For demo, it just logs to console
 */
export function submitWeeklyReflection(
  reflection: Omit<WeeklyReflection, "id" | "submittedAt">
): WeeklyReflection {
  const newReflection: WeeklyReflection = {
    ...reflection,
    id: `reflection-${Date.now()}`,
    submittedAt: new Date().toISOString(),
  };

  console.log("Weekly Reflection Submitted:", newReflection);
  return newReflection;
}

/**
 * Create onboarding plan (for manager setup wizard)
 * In a real app, this would POST to an API
 * For demo, it just logs to console
 */
export function createOnboardingPlan(data: {
  companyInfo: {
    name: string;
    industry: string;
    size: string;
    description: string;
  };
  template: string;
  moduleContent: Record<ModuleType, string>;
  importantPeople: Omit<ImportantPerson, "id">[];
  newHireEmail: string;
}): void {
  console.log("Onboarding Plan Created:", data);
  console.log("In a real app, this would:");
  console.log("1. Save company info to database");
  console.log("2. Create onboarding plan record");
  console.log("3. Save module content");
  console.log("4. Add important people");
  console.log("5. Send invitation email to:", data.newHireEmail);
}

/**
 * Update module content (for manager)
 */
export function updateModuleContent(
  type: ModuleType,
  content: string
): ModuleContent {
  const updated: ModuleContent = {
    id: `module-${type}`,
    type,
    title: type.split("_").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
    content,
    updatedAt: new Date().toISOString(),
  };

  console.log("Module Content Updated:", updated);
  return updated;
}

/**
 * Add important person (for manager)
 */
export function addImportantPerson(
  person: Omit<ImportantPerson, "id">
): ImportantPerson {
  const newPerson: ImportantPerson = {
    ...person,
    id: `person-${Date.now()}`,
  };

  console.log("Important Person Added:", newPerson);
  return newPerson;
}

/**
 * Update important person (for manager)
 */
export function updateImportantPerson(
  personId: string,
  updates: Partial<Omit<ImportantPerson, "id">>
): ImportantPerson | null {
  const person = mockImportantPeople.find((p) => p.id === personId);
  if (!person) return null;

  const updated = { ...person, ...updates };
  console.log("Important Person Updated:", updated);
  return updated;
}

/**
 * Delete important person (for manager)
 */
export function deleteImportantPerson(personId: string): boolean {
  console.log("Important Person Deleted:", personId);
  return true;
}
