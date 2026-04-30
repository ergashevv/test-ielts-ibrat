"use client";

import { useMemo } from "react";

import { useCourses, useLessons, useModules } from "@/hooks/queries";
import { courseCatalog } from "@/data/courseCatalog";
import type { CourseId } from "@/types";

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

/**
 * Returns the list of completed step IDs for a course, derived from the
 * backend lesson list (`completed` flag per lesson row).
 *
 * Each course is its own practicum (Postman audit 2026-04-30); we read its
 * first module's lessons. Once multi-module nav is designed, this will need
 * to aggregate completion across modules.
 */
export function useCompletedSteps(courseId: CourseId): string[] {
  const { data: courses } = useCourses();
  const practicumId =
    courses?.find((c) => c.id === courseId)?.practicumId ?? "";

  const { data: modules } = useModules(practicumId);
  const moduleId = (modules as any)?.[0]?._id;

  const { data: lessons } = useLessons(practicumId, moduleId);

  return useMemo(() => {
    const apiLessons = (lessons as any[]) ?? [];
    const effectiveSteps = getEffectiveSteps(courseId);

    const apiCompleted: string[] = [];
    apiLessons.forEach((lesson: any, idx: number) => {
      const stepId = effectiveSteps[idx];
      if (stepId && lesson.completed) apiCompleted.push(stepId);
    });

    return apiCompleted;
  }, [courseId, lessons]);
}
