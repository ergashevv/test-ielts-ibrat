import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/query";
import { answersService, type QuizAnswer } from "@/services/answers.service";

interface QuizScope {
  practicumId: string;
  moduleId: string;
  lessonId: string;
}

export function useStartQuiz() {
  return useMutation({
    mutationFn: ({ practicumId, moduleId, lessonId }: QuizScope) =>
      answersService.startQuiz(practicumId, moduleId, lessonId),
  });
}

export function useFinishQuiz() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      practicumId,
      moduleId,
      lessonId,
      answers,
    }: QuizScope & { answers: QuizAnswer[] }) =>
      answersService.finishQuiz(practicumId, moduleId, lessonId, answers),
    onSuccess: (_data, { practicumId, moduleId }) => {
      // Lesson list carries `completed` flags; refresh after a finish so the
      // course navigator picks up the new completion state.
      queryClient.invalidateQueries({
        queryKey: queryKeys.lessons.list(practicumId, moduleId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.practicums.modules(practicumId),
      });
    },
  });
}

export function useResetQuiz() {
  return useMutation({
    mutationFn: ({ practicumId, moduleId, lessonId }: QuizScope) =>
      answersService.resetQuiz(practicumId, moduleId, lessonId),
  });
}

export function useAnalyzeSpeech() {
  return useMutation({
    mutationFn: ({
      practicumId,
      moduleId,
      lessonId,
      questionId,
      file,
      language,
    }: QuizScope & { questionId: string; file: Blob; language?: string }) =>
      answersService.analyzeSpeech(practicumId, moduleId, lessonId, questionId, file, language),
  });
}
