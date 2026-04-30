"use client";

import { courseCatalog } from "@/data/courseCatalog";
import type { CourseId } from "@/types";

import { useCourses } from "./queries/useCourses";
import { useLessons } from "./queries/useLessons";
import { useModules } from "./queries/useModules";

/**
 * Frontend pipeline order. Backend doesn't expose `lesson.stepType` yet
 * (CLAUDE.md → Epic 2), so we resolve step → lesson by index inside the
 * course's effective pipeline (after excluding steps via courseCatalog).
 *
 * If backend later adds stepType, swap the index lookup for a name match.
 */
const STEP_PIPELINE = [
  "lead-in",
  "presentation",
  "quick-tips",
  "improvement",
  "practice",
  "summary",
  "exercises",
] as const;

function getEffectiveSteps(courseId: CourseId): string[] {
  const exclude = courseCatalog[courseId].excludeSteps ?? [];
  return STEP_PIPELINE.filter((s) => !exclude.includes(s));
}

interface UseLessonForStepResult {
  practicumId: string;
  moduleId: string | undefined;
  lessonId: string | undefined;
  isLoading: boolean;
}

/**
 * Resolves the (practicumId, moduleId, lessonId) tuple for a given course
 * step. Each course is its own practicum (Postman audit 2026-04-30); we
 * pick the first module of that practicum since modules are topic-based
 * (e.g. "Leisure & Free Time"), not aligned with our 4 course types.
 *
 * Multi-module navigation will need a module-picker UI; until then this
 * hook's first-module assumption is sufficient.
 */
export function useLessonForStep(
  courseId: CourseId,
  stepId: string,
): UseLessonForStepResult {
  const { data: courses, isLoading: coursesLoading } = useCourses();
  const practicumId =
    courses?.find((c) => c.id === courseId)?.practicumId ?? "";

  const { data: modulesPage, isLoading: modulesLoading } =
    useModules(practicumId);
  const moduleId = modulesPage?.data[0]?._id;

  const { data: lessonsPage, isLoading: lessonsLoading } = useLessons(
    practicumId,
    moduleId,
  );

  const effectiveSteps = getEffectiveSteps(courseId);
  const stepIndex = effectiveSteps.indexOf(stepId);
  const lessonId =
    stepIndex >= 0 ? lessonsPage?.data[stepIndex]?._id : undefined;

  return {
    practicumId,
    moduleId,
    lessonId,
    isLoading:
      coursesLoading ||
      (Boolean(practicumId) && modulesLoading) ||
      (Boolean(moduleId) && lessonsLoading),
  };
}
