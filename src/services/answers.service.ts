import { api, apiConfig, endpoints } from "@/lib/api";
import type { Envelope } from "@/lib/api/types";
import type { QuizAnswer } from "@/lib/quiz";

// Re-export so existing call sites that import from `@/services/answers.service`
// keep working. New code should import `QuizAnswer` from `@/lib/quiz` directly.
export type { QuizAnswer };

/**
 * Quiz state machine — confirmed via Postman audit (2026-04-30):
 *   POST .../quiz/start    → session  (status: IN_PROGRESS, body empty)
 *   POST .../quiz/complete → result   (canonical submit endpoint, replaces /quiz/finish)
 *
 * Note: `/quiz/finish` is NOT a real endpoint — earlier docs were wrong.
 */
export interface QuizSession {
  _id: string;
  lessonId: string;
  startedAt: string;
  status: "IN_PROGRESS" | "COMPLETED" | "FAILED";
}

/** Per-option detail returned by `/quiz/complete` for each question. */
export interface QuizQuestionResultOption {
  optionId: string;
  isCorrect: boolean;
}

/** Per-question feedback returned by `/quiz/complete`. */
export interface QuizQuestionResult {
  /** Backend uses `question` to mean questionId here. */
  question: string;
  status: "GRADED" | "PENDING";
  isCorrect: boolean;
  isSkipped: boolean;
  selectedOptions: QuizQuestionResultOption[];
  /** 0–100. */
  performanceRating: number;
}

/**
 * Aggregate result returned by `/quiz/complete`.
 *
 * Confirmed fields (Postman audit 2026-04-30):
 *   - performanceRating: 0–100 percentage
 *   - point: raw XP/coin equivalent
 *   - numberOf{Correct,Incorrect,Skipped}Answers: counts
 *   - startedAt / finishedAt: ISO timestamps
 *
 * Pending: `passed` boolean and its threshold — backend dev to confirm.
 * Per-question feedback (`questions`) is included alongside the aggregate;
 * exact envelope shape (sibling vs nested) confirmed as `data.questions[]`.
 */
export interface QuizCompleteResult {
  performanceRating: number;
  point: number;
  numberOfCorrectAnswers: number;
  numberOfIncorrectAnswers: number;
  numberOfSkippedAnswers: number;
  startedAt: string;
  finishedAt: string;
  questions: QuizQuestionResult[];
}

export interface SpeechAnalysisResult {
  transcript: string;
  feedback: string;
  score?: number;
}

export const answersService = {
  startQuiz: async (
    practicumId: string,
    moduleId: string,
    lessonId: string,
  ): Promise<QuizSession> => {
    if (apiConfig.useMock) {
      return {
        _id: "mock-session",
        lessonId,
        startedAt: new Date().toISOString(),
        status: "IN_PROGRESS",
      };
    }
    const res = await api.post<Envelope<QuizSession>>(
      endpoints.quiz.start(practicumId, moduleId, lessonId),
    );
    return res.data;
  },

  /**
   * Submit answers and complete the quiz. Canonical payload:
   *   `{ answers: [{ questionId, answersIds: string[] }] }`
   *
   * Use `answerBuilders` from `@/lib/quiz` to construct the per-question
   * `answersIds` from typed user input.
   */
  finishQuiz: async (
    practicumId: string,
    moduleId: string,
    lessonId: string,
    answers: QuizAnswer[],
  ): Promise<QuizCompleteResult> => {
    if (apiConfig.useMock) {
      const now = new Date().toISOString();
      return {
        performanceRating: 100,
        point: answers.length * 10,
        numberOfCorrectAnswers: answers.length,
        numberOfIncorrectAnswers: 0,
        numberOfSkippedAnswers: 0,
        startedAt: now,
        finishedAt: now,
        questions: answers.map((a) => ({
          question: a.questionId,
          status: "GRADED",
          isCorrect: true,
          isSkipped: false,
          selectedOptions: a.answersIds.map((id) => ({
            optionId: id,
            isCorrect: true,
          })),
          performanceRating: 100,
        })),
      };
    }
    const res = await api.post<Envelope<QuizCompleteResult>>(
      endpoints.quiz.complete(practicumId, moduleId, lessonId),
      { answers },
    );
    return res.data;
  },

  resetQuiz: async (
    practicumId: string,
    moduleId: string,
    lessonId: string,
  ): Promise<void> => {
    if (apiConfig.useMock) return;
    await api.post<unknown>(endpoints.quiz.reset(practicumId, moduleId, lessonId));
  },

  analyzeSpeech: async (
    practicumId: string,
    moduleId: string,
    lessonId: string,
    questionId: string,
    file: Blob,
    language: string = "english",
  ): Promise<SpeechAnalysisResult> => {
    if (apiConfig.useMock) {
      return { transcript: "", feedback: "Mock feedback." };
    }
    const form = new FormData();
    form.append("file", file);
    form.append("language", language);
    const res = await api.post<Envelope<SpeechAnalysisResult>>(
      endpoints.quiz.analyzeSpeech(practicumId, moduleId, lessonId, questionId),
      form,
      { headers: { "Content-Type": "multipart/form-data" } },
    );
    return res.data;
  },
};
