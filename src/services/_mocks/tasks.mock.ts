import type { CourseId, TaskConfig } from "@/types";

import {
  readingLeadInTasks,
  readingQuickTipsTasks,
  readingImprovementTasks,
  readingPracticeTasks,
  readingSummaryTasks,
  readingExercisesTasks,
} from "@/data/readingCourse";
import {
  writingLeadInTasks,
  writingQuickTipsTasks,
  writingImprovementTasks,
  writingPracticeTasks,
  writingSummaryTasks,
  writingExercisesTasks,
} from "@/data/writingCourse";
import {
  speakingLeadInTasks,
  speakingQuickTipsTasks,
  speakingImprovementTasks,
  speakingPracticeTasks,
  speakingSummaryTasks,
  speakingExercisesTasks,
} from "@/data/speakingCourse";
import {
  listeningLeadInTasks,
  listeningQuickTipsTasks,
  listeningImprovementTasks,
  listeningPracticeTasks,
  listeningSummaryTasks,
  listeningExercisesTasks,
} from "@/data/listeningCourse";

type StepId =
  | "lead-in"
  | "presentation"
  | "quick-tips"
  | "improvement"
  | "practice"
  | "summary"
  | "exercises";

const registry: Record<CourseId, Partial<Record<StepId, TaskConfig[]>>> = {
  reading: {
    "lead-in": readingLeadInTasks,
    "quick-tips": readingQuickTipsTasks,
    improvement: readingImprovementTasks,
    practice: readingPracticeTasks,
    summary: readingSummaryTasks,
    exercises: readingExercisesTasks,
  },
  writing: {
    "lead-in": writingLeadInTasks,
    "quick-tips": writingQuickTipsTasks,
    improvement: writingImprovementTasks,
    practice: writingPracticeTasks,
    summary: writingSummaryTasks,
    exercises: writingExercisesTasks,
  },
  speaking: {
    "lead-in": speakingLeadInTasks,
    "quick-tips": speakingQuickTipsTasks,
    improvement: speakingImprovementTasks,
    practice: speakingPracticeTasks,
    summary: speakingSummaryTasks,
    exercises: speakingExercisesTasks,
  },
  listening: {
    "lead-in": listeningLeadInTasks,
    "quick-tips": listeningQuickTipsTasks,
    improvement: listeningImprovementTasks,
    practice: listeningPracticeTasks,
    summary: listeningSummaryTasks,
    exercises: listeningExercisesTasks,
  },
};

export function getMockTasks(courseId: CourseId, stepId: string): TaskConfig[] {
  return registry[courseId]?.[stepId as StepId] ?? [];
}
