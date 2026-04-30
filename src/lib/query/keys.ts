import type { CourseId } from "@/types";

/**
 * Centralized query-key factory. Always reference these instead of inline arrays
 * so invalidation stays consistent across the app.
 */
export const queryKeys = {
  user: {
    all: ["user"] as const,
    me: () => [...queryKeys.user.all, "me"] as const,
    settings: () => [...queryKeys.user.all, "settings"] as const,
  },
  courses: {
    all: ["courses"] as const,
    list: () => [...queryKeys.courses.all, "list"] as const,
    detail: (courseId: CourseId) => [...queryKeys.courses.all, "detail", courseId] as const,
  },
  progress: {
    all: ["progress"] as const,
    forCourse: (courseId: CourseId) =>
      [...queryKeys.progress.all, courseId] as const,
    enrolled: (studentId: string) =>
      [...queryKeys.progress.all, "enrolled", studentId] as const,
  },
  practicums: {
    all: ["practicums"] as const,
    modules: (practicumId: string) =>
      [...queryKeys.practicums.all, practicumId, "modules"] as const,
  },
  lessons: {
    all: ["lessons"] as const,
    list: (practicumId: string, moduleId: string) =>
      [...queryKeys.lessons.all, practicumId, moduleId] as const,
    detail: (practicumId: string, moduleId: string, lessonId: string) =>
      [...queryKeys.lessons.all, practicumId, moduleId, lessonId] as const,
  },
  tasks: {
    all: ["tasks"] as const,
    forStep: (courseId: CourseId, stepId: string) =>
      [...queryKeys.tasks.all, courseId, stepId] as const,
  },
  streak: {
    all: ["streak"] as const,
    me: () => [...queryKeys.streak.all, "me"] as const,
  },
  promos: {
    all: ["promos"] as const,
    list: () => [...queryKeys.promos.all, "list"] as const,
  },
  plans: {
    all: ["plans"] as const,
    list: (params?: { isActive?: boolean }) =>
      [...queryKeys.plans.all, "list", params ?? {}] as const,
    activeMe: () => [...queryKeys.plans.all, "me"] as const,
  },
  notifications: {
    all: ["notifications"] as const,
    list: (params?: { page?: number; limit?: number; userId?: string }) =>
      [...queryKeys.notifications.all, "list", params ?? {}] as const,
    unreadCount: () => [...queryKeys.notifications.all, "unread-count"] as const,
  },
} as const;
