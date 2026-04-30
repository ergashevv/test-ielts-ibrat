/**
 * Quiz question schema. Frontend canonical form is UPPERCASE — see
 * `./normalize.ts` for the boundary normalizer that handles casing
 * inconsistencies and field-name aliases. See CLAUDE.md Epic 2 for the
 * Postman audit history backing each shape.
 *
 * `MULTIPLE` is multi-select (one question, multiple correct options) — not
 * to be confused with `MULTIPLE_DRAG_AND_DROP`.
 */

export type QuestionType =
  | "INFO_BLOCKS"
  | "MULTI_FILL_GAPS"
  | "REORDER_PARAGRAPHS"
  | "MATCHING"
  | "MULTIPLE_DRAG_AND_DROP"
  | "SINGLE_CHOICE"
  | "WRITING_EXERCISE"
  | "SPEAKING_QUESTION"
  | "IELTS_READING"
  | "MULTIPLE"
  | "CONVERSATIONAL_BLOCK";

export type Difficulty = "EASY" | "MEDIUM" | "HARD";

/**
 * Canonical audio shape after normalization. Backend uses `audio: { url, text }`
 * everywhere except SINGLE_CHOICE which uses `audioUrl: string`. The normalizer
 * collapses both into this object form.
 */
export interface Audio {
  url: string;
  text?: string;
}

/** `0` means "no limit" by backend convention, for both fields. */
export interface QuizLimit {
  count: number;
  time: number;
}

export interface LessonQuiz {
  _id: string;
  difficulty?: Difficulty;
  shuffleEnabled?: boolean;
  limit?: QuizLimit;
}

interface BaseQuestion {
  _id: string;
  questionType: QuestionType;
  title?: string;
  question?: string;
  difficulty?: Difficulty;
  audio?: Audio;
  image?: string;
  points?: number;
  order?: number;
}

// 1. INFO_BLOCKS — read-only, no answer
export interface InfoBlock {
  html?: string;
  image?: string;
  audio?: Audio;
}

export interface InfoBlocksQuestion extends BaseQuestion {
  questionType: "INFO_BLOCKS";
  blocks: InfoBlock[];
}

// 2. MULTI_FILL_GAPS — `|_1|`, `|_2|` markers in `question`, per-gap option lists
export interface FillGapOption {
  _id: string;
  text: string;
  /** Backend exposes `isCorrect` to students in real GET — do not rely on it being hidden. */
  isCorrect?: boolean;
}

export interface FillGap {
  gapNumber: number;
  options: FillGapOption[];
}

export interface MultiFillGapsQuestion extends BaseQuestion {
  questionType: "MULTI_FILL_GAPS";
  gaps: FillGap[];
  blocks?: InfoBlock[];
}

// 3. REORDER_PARAGRAPHS
export interface ReorderOption {
  /** Backend uses string ids like "p1"; Mongo `_id` may also be present. */
  id: string;
  _id?: string;
  text: string;
  order: number;
}

export interface ReorderParagraphsQuestion extends BaseQuestion {
  questionType: "REORDER_PARAGRAPHS";
  description?: string;
  options: ReorderOption[];
  correctExplanation?: string;
  incorrectExplanation?: string;
}

// 4. MATCHING — left ↔ right pairing
export interface MatchingOption {
  _id: string;
  text: string;
  side: "LEFT" | "RIGHT";
  order: number;
}

export interface MatchingQuestion extends BaseQuestion {
  questionType: "MATCHING";
  leftSideLabel?: string;
  rightSideLabel?: string;
  options: MatchingOption[];
}

// 5. MULTIPLE_DRAG_AND_DROP — group phrases by `order`
export interface DragOption {
  _id: string;
  text: string;
  isCorrect?: boolean;
  order: number;
}

export interface DragAndDropQuestion extends BaseQuestion {
  questionType: "MULTIPLE_DRAG_AND_DROP";
  imageUrl?: string;
  options: DragOption[];
  correctExplanation?: string;
  incorrectExplanation?: string;
}

// 6. SINGLE_CHOICE — one correct answer
export interface SingleChoiceOption {
  _id: string;
  text: string;
  /** Per-option audio. Backend sends `audioUrl: string` here; normalized into `audio`. */
  audio?: Audio;
  isCorrect?: boolean;
  order?: number;
}

export interface SingleChoiceQuestion extends BaseQuestion {
  questionType: "SINGLE_CHOICE";
  options: SingleChoiceOption[];
  explanation?: string;
}

// 7. WRITING_EXERCISE — body shape pending backend confirmation
export interface WritingExerciseQuestion extends BaseQuestion {
  questionType: "WRITING_EXERCISE";
  /** Open-ended until backend documents the body. */
  raw?: Record<string, unknown>;
}

// 8. SPEAKING_QUESTION
export interface SpeakingQuestion extends BaseQuestion {
  questionType: "SPEAKING_QUESTION";
  context?: string;
  clues?: string[];
  answerExample?: string;
}

// 9. IELTS_READING — passage with nested sub-questions.
// Real GET: `{ passage, subQuestions: [...] }`. Normalizer also accepts the
// older create-payload shape `{ question, questions: [...] }`.
export type IeltsSubQuestionType =
  | "SINGLE"
  | "FILLING_GAPS"
  | "SHORT_ANSWER"
  | "DIAGRAM_LABELING";

export interface IeltsSingleSubQuestion {
  questionType: "SINGLE";
  question: string;
  options: { _id: string; text: string; isCorrect?: boolean }[];
}

export interface IeltsFillingGapsSubQuestion {
  questionType: "FILLING_GAPS";
  question: string;
  options: { _id: string; text: string; isCorrect?: boolean; order?: number }[];
}

export interface IeltsShortAnswerSubQuestion {
  questionType: "SHORT_ANSWER";
  question: string;
  /** Accepted answers (server-side; usually hidden from students). */
  answers?: string[];
}

/** Image with labeled blanks. `blanks[]` shape is partial pending more samples. */
export interface IeltsDiagramLabelingSubQuestion {
  questionType: "DIAGRAM_LABELING";
  diagram: string;
  blanks: Array<{
    _id?: string;
    label?: string;
    correctAnswer?: string;
    options?: { _id: string; text: string; isCorrect?: boolean }[];
  }>;
}

export type IeltsSubQuestion =
  | IeltsSingleSubQuestion
  | IeltsFillingGapsSubQuestion
  | IeltsShortAnswerSubQuestion
  | IeltsDiagramLabelingSubQuestion;

export interface IeltsReadingQuestion extends BaseQuestion {
  questionType: "IELTS_READING";
  passage?: string;
  subQuestions: IeltsSubQuestion[];
}

// 10. MULTIPLE — multi-select
export interface MultipleOption {
  _id: string;
  text: string;
  audio?: Audio;
  isCorrect?: boolean;
}

export interface MultipleQuestion extends BaseQuestion {
  questionType: "MULTIPLE";
  options: MultipleOption[];
}

// 11. CONVERSATIONAL_BLOCK — dialog turns; some turns embed a sub-question.
export interface DialogSubQuestion {
  questionType: QuestionType;
  options?: Array<{ _id: string; text: string; isCorrect?: boolean }>;
}

export interface DialogTurn {
  speaker: string;
  text: string;
  subQuestion?: DialogSubQuestion;
}

export interface ConversationalBlockQuestion extends BaseQuestion {
  questionType: "CONVERSATIONAL_BLOCK";
  dialog: DialogTurn[];
}

// Discriminated union — switch on `questionType` to narrow.
export type ApiQuizQuestion =
  | InfoBlocksQuestion
  | MultiFillGapsQuestion
  | ReorderParagraphsQuestion
  | MatchingQuestion
  | DragAndDropQuestion
  | SingleChoiceQuestion
  | WritingExerciseQuestion
  | SpeakingQuestion
  | IeltsReadingQuestion
  | MultipleQuestion
  | ConversationalBlockQuestion;
