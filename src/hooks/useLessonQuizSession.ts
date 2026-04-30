"use client";

import { useEffect, useState } from "react";

import { useFinishQuiz, useStartQuiz } from "@/hooks/queries";
import { useLessonForStep } from "@/hooks/useLessonForStep";
import type { QuizAnswer } from "@/lib/quiz";
import type { QuizCompleteResult } from "@/services/answers.service";
import type { CourseId } from "@/types";

interface QuizTaskOverridable {
  componentType: string;
  props: Record<string, unknown>;
}

/**
 * Orchestrates the lesson quiz state machine for a step page:
 *   - resolves lessonId via cached useModules + useLessons
 *   - fires useStartQuiz once when lessonId becomes available
 *   - exposes `submit(answers)` that posts via useFinishQuiz and stores the result
 *   - exposes `withResult(task)` to override TaskResult/TaskRecap stats from the API response
 *
 * Mock mode: the underlying services short-circuit to mocks, so this is safe
 * to call regardless of NEXT_PUBLIC_USE_MOCK.
 */
export function useLessonQuizSession(courseId: CourseId, stepId: string) {
  const { practicumId, moduleId, lessonId } = useLessonForStep(
    courseId,
    stepId,
  );
  const startQuiz = useStartQuiz();
  const finishQuiz = useFinishQuiz();
  const [result, setResult] = useState<QuizCompleteResult | null>(null);

  useEffect(() => {
    if (!lessonId || !moduleId) return;
    // Only fire on the initial idle state; once started (pending/success/error)
    // it stays out of idle, so this won't loop on transient failures.
    if (!startQuiz.isIdle) return;
    startQuiz.mutate({ practicumId, moduleId, lessonId });
  }, [practicumId, moduleId, lessonId, startQuiz]);

  const submit = (answersRecord?: Record<string, string | string[]>) => {
    if (!lessonId || !moduleId) return;
    if (!answersRecord) return;
    const answers: QuizAnswer[] = Object.entries(answersRecord).map(
      ([questionId, answer]) => ({
        questionId,
        answersIds: Array.isArray(answer) ? answer : [answer],
      }),
    );
    if (answers.length === 0) return;
    finishQuiz.mutate(
      { practicumId, moduleId, lessonId, answers },
      { onSuccess: (r) => setResult(r) },
    );
  };

  /**
   * Overrides TaskResult / TaskRecap stats with API response when available.
   * Pass the raw task config; returns the props object to spread into the component.
   */
  const withResult = (task: QuizTaskOverridable | undefined) => {
    if (!task) return {};
    if (!result) return task.props;
    const total =
      result.numberOfCorrectAnswers +
      result.numberOfIncorrectAnswers +
      result.numberOfSkippedAnswers;
    if (task.componentType === "TaskResult") {
      return {
        ...task.props,
        stats: { score: result.numberOfCorrectAnswers, total },
      };
    }
    if (task.componentType === "TaskRecap") {
      const rawStats = task.props.stats;
      const baseStats =
        rawStats && typeof rawStats === "object"
          ? (rawStats as Record<string, unknown>)
          : {};
      return {
        ...task.props,
        stats: {
          ...baseStats,
          score: result.numberOfCorrectAnswers,
          total,
          accuracy: result.performanceRating,
        },
      };
    }
    return task.props;
  };

  return { result, submit, withResult, practicumId, moduleId, lessonId };
}

/**
 * Components whose `onFinish(answers)` payload should be forwarded to
 * `useLessonQuizSession.submit`. Other components (TaskIntro / TaskPresentation
 * / etc.) just advance the step without API submission.
 */
export const QUIZ_SUBMIT_TASKS: ReadonlySet<string> = new Set([
  "TaskReadingExercise",
  "TaskPractice",
]);
