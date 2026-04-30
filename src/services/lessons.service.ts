import { api, apiConfig, endpoints } from "@/lib/api";
import { emptyPage, type Envelope, type Paginated } from "@/lib/api/types";
import {
  normalizeQuestionList,
  type ApiQuizQuestion,
  type Difficulty,
  type LessonQuiz,
} from "@/lib/quiz";

const DIFFICULTIES: ReadonlySet<Difficulty> = new Set([
  "EASY",
  "MEDIUM",
  "HARD",
]);

/**
 * Lesson under a Module. Per CLAUDE.md Variant (b):
 *   - CONTENT lessons: HTML body in `question`, `metadata: null` — frontend stays static
 *   - QUIZ lessons: real GET shape (Round 6) wraps questions in a `quiz`
 *     object: `{ ..., quiz: { _id, difficulty, shuffleEnabled, limit, questions[] } }`.
 *     The normalizer flattens `quiz.questions` onto `lesson.questions` for
 *     downstream consumers, while exposing the wrapper metadata at `lesson.quiz`.
 *
 * QUIZ question shape is the discriminated union from `@/lib/quiz` (10+ types).
 * Raw API responses get normalized at this boundary so downstream code sees
 * canonical shapes (UPPERCASE `questionType`, audio collapsed to `{ url, text }`,
 * IELTS_READING `passage`/`subQuestions` shape).
 */
export type LessonType = "CONTENT" | "QUIZ";

export interface ApiLessonSummary {
  _id: string;
  title?: string;
  type: LessonType;
  order?: number;
  completed?: boolean;
}

export interface ApiLessonDetail extends ApiLessonSummary {
  /** HTML body for CONTENT lessons; passage HTML for IELTS_READING quiz lessons. */
  question?: string;
  metadata?: unknown;
  /** Quiz wrapper metadata (Round 6). Empty for CONTENT lessons. */
  quiz?: LessonQuiz;
  /** Flattened from `quiz.questions[]` by the normalizer. */
  questions?: ApiQuizQuestion[];
}

interface RawLessonDetail extends ApiLessonSummary {
  question?: string;
  metadata?: unknown;
  questions?: unknown;
  quiz?: {
    _id?: string;
    difficulty?: unknown;
    shuffleEnabled?: unknown;
    limit?: unknown;
    questions?: unknown;
  };
}

function extractQuizMeta(quiz: RawLessonDetail["quiz"]): LessonQuiz | undefined {
  if (!quiz || typeof quiz !== "object") return undefined;
  const limit =
    quiz.limit && typeof quiz.limit === "object"
      ? (quiz.limit as { count?: number; time?: number })
      : undefined;
  return {
    _id: typeof quiz._id === "string" ? quiz._id : "",
    difficulty: DIFFICULTIES.has(quiz.difficulty as Difficulty)
      ? (quiz.difficulty as Difficulty)
      : undefined,
    shuffleEnabled:
      typeof quiz.shuffleEnabled === "boolean" ? quiz.shuffleEnabled : undefined,
    limit:
      limit && typeof limit.count === "number" && typeof limit.time === "number"
        ? { count: limit.count, time: limit.time }
        : undefined,
  };
}

function applyQuestionNormalizer(raw: RawLessonDetail): ApiLessonDetail {
  // Real GET wraps questions inside `quiz.questions`; create payload had them
  // at the top level. Prefer the wrapper, fall back to the legacy field.
  const rawQuestions = raw.quiz?.questions ?? raw.questions;
  return {
    ...raw,
    quiz: extractQuizMeta(raw.quiz),
    questions: rawQuestions ? normalizeQuestionList(rawQuestions) : undefined,
  };
}

export const lessonsService = {
  list: async (
    practicumId: string,
    moduleId: string,
  ): Promise<ApiLessonSummary[]> => {
    if (apiConfig.useMock) return [];
    if (!practicumId || !moduleId) return [];
    return api.get<ApiLessonSummary[]>(endpoints.lessons.list(practicumId, moduleId));
  },

  detail: async (
    practicumId: string,
    moduleId: string,
    lessonId: string,
  ): Promise<ApiLessonDetail> => {
    if (apiConfig.useMock) {
      return {
        _id: lessonId,
        type: "QUIZ",
        questions: [],
      };
    }
    const res = await api.get<Envelope<RawLessonDetail>>(
      endpoints.lessons.detail(practicumId, moduleId, lessonId),
    );
    return applyQuestionNormalizer(res.data);
  },

  studentDetail: async (
    studentId: string,
    practicumId: string,
    moduleId: string,
    lessonId: string,
  ): Promise<ApiLessonDetail> => {
    if (apiConfig.useMock) {
      return {
        _id: lessonId,
        type: "QUIZ",
        completed: false,
        questions: [],
      };
    }
    const res = await api.get<Envelope<RawLessonDetail>>(
      endpoints.lessons.studentDetail(studentId, practicumId, moduleId, lessonId),
    );
    return applyQuestionNormalizer(res.data);
  },
};
