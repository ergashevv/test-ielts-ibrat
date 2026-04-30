import type { CourseId, TaskConfig } from "@/types";

import { getMockTasks } from "./_mocks/tasks.mock";

/**
 * Per the variant (b) decision (CLAUDE.md → API Integration TODO → Epic 2):
 * CONTENT-type lessons stay frontend-static, and QUIZ lessons will eventually
 * be merged in via the lesson detail endpoint inside the practice/exercises
 * step pages — not here. So this service stays mock-driven.
 */
export const tasksService = {
  fetchForStep: async (courseId: CourseId, stepId: string): Promise<TaskConfig[]> => {
    await new Promise((resolve) => setTimeout(resolve, 150));
    return getMockTasks(courseId, stepId);
  },
};
