/**
 * Boundary normalizers — apply to raw API responses before the rest of the
 * frontend consumes them, so downstream code can rely on canonical shapes.
 *
 * Known inconsistencies (from Postman audit + Round 6 real GET, 2026-04-30):
 *   1. `questionType` casing: `"single_choice"` (lowercase) vs `"SINGLE_CHOICE"`.
 *   2. Audio shape: `audio: { url, text }` everywhere except SINGLE_CHOICE
 *      which uses `audioUrl: string`.
 *   3. IELTS_READING wrapper field naming: real GET uses `passage` +
 *      `subQuestions[]`; create payload uses `question` + `questions[]`.
 *   4. `MULTIPLE` vs `MULTIPLE_CHOICE` aliasing.
 */

import type {
  ApiQuizQuestion,
  Audio,
  ConversationalBlockQuestion,
  DialogTurn,
  IeltsReadingQuestion,
  IeltsSubQuestion,
  IeltsSubQuestionType,
  QuestionType,
} from "./types";

const KNOWN_QUESTION_TYPES: ReadonlySet<QuestionType> = new Set([
  "INFO_BLOCKS",
  "MULTI_FILL_GAPS",
  "REORDER_PARAGRAPHS",
  "MATCHING",
  "MULTIPLE_DRAG_AND_DROP",
  "SINGLE_CHOICE",
  "WRITING_EXERCISE",
  "SPEAKING_QUESTION",
  "IELTS_READING",
  "MULTIPLE",
  "CONVERSATIONAL_BLOCK",
]);

const KNOWN_IELTS_SUB_TYPES: ReadonlySet<IeltsSubQuestionType> = new Set([
  "SINGLE",
  "FILLING_GAPS",
  "SHORT_ANSWER",
  "DIAGRAM_LABELING",
]);

export function normalizeQuestionType(raw: unknown): QuestionType {
  if (typeof raw !== "string") return "SINGLE_CHOICE";
  const upper = raw.trim().toUpperCase();
  if (KNOWN_QUESTION_TYPES.has(upper as QuestionType)) {
    return upper as QuestionType;
  }
  // Backend sometimes sends "MULTIPLE_CHOICE" (older naming) — alias it.
  if (upper === "MULTIPLE_CHOICE") return "MULTIPLE";
  // Unknown — fall back to SINGLE_CHOICE so the dispatcher renders something.
  return "SINGLE_CHOICE";
}

function normalizeIeltsSubType(raw: unknown): IeltsSubQuestionType {
  if (typeof raw !== "string") return "SINGLE";
  const upper = raw.trim().toUpperCase();
  return KNOWN_IELTS_SUB_TYPES.has(upper as IeltsSubQuestionType)
    ? (upper as IeltsSubQuestionType)
    : "SINGLE";
}

/**
 * Accepts either `audio: { url, text }` or `audioUrl: string` (or both)
 * and returns the canonical `Audio` object — or `undefined` if neither is set.
 *
 * Pass the parent object; the function looks up both fields.
 */
export function normalizeAudio(parent: Record<string, unknown>): Audio | undefined {
  const audio = parent.audio;
  if (audio && typeof audio === "object") {
    const a = audio as Record<string, unknown>;
    if (typeof a.url === "string" && a.url) {
      return {
        url: a.url,
        text: typeof a.text === "string" ? a.text : undefined,
      };
    }
  }
  if (typeof parent.audioUrl === "string" && parent.audioUrl) {
    return { url: parent.audioUrl };
  }
  return undefined;
}

function normalizeOptionList<T extends Record<string, unknown>>(
  options: unknown,
): T[] {
  if (!Array.isArray(options)) return [];
  return options.map((opt) => {
    if (!opt || typeof opt !== "object") return {} as T;
    const o = opt as Record<string, unknown>;
    const audio = normalizeAudio(o);
    return {
      ...o,
      ...(audio ? { audio } : {}),
    } as unknown as T;
  });
}

function normalizeIeltsSubQuestion(raw: unknown): IeltsSubQuestion {
  if (!raw || typeof raw !== "object") {
    return { questionType: "SINGLE", question: "", options: [] };
  }
  const r = raw as Record<string, unknown>;
  const subType = normalizeIeltsSubType(r.questionType);
  const question = typeof r.question === "string" ? r.question : "";

  if (subType === "SHORT_ANSWER") {
    return {
      questionType: "SHORT_ANSWER",
      question,
      answers: Array.isArray(r.answers)
        ? (r.answers.filter((a): a is string => typeof a === "string"))
        : undefined,
    };
  }

  if (subType === "DIAGRAM_LABELING") {
    const blanks = Array.isArray(r.blanks) ? r.blanks : [];
    return {
      questionType: "DIAGRAM_LABELING",
      diagram: typeof r.diagram === "string" ? r.diagram : "",
      blanks: blanks.map((b) => {
        if (!b || typeof b !== "object") return {};
        const bb = b as Record<string, unknown>;
        return {
          _id: typeof bb._id === "string" ? bb._id : undefined,
          label: typeof bb.label === "string" ? bb.label : undefined,
          correctAnswer:
            typeof bb.correctAnswer === "string" ? bb.correctAnswer : undefined,
          options: Array.isArray(bb.options)
            ? normalizeOptionList(bb.options)
            : undefined,
        };
      }),
    };
  }

  return {
    questionType: subType,
    question,
    options: normalizeOptionList(r.options),
  } as IeltsSubQuestion;
}

/**
 * IELTS_READING normalization — tolerate both shapes:
 *   - Round 6 real GET:   `{ passage, subQuestions: [{ questionType, ... }] }`
 *   - Create payload:     `{ question, questions: [{ question: { questionType, ... } }] }`
 */
function normalizeIeltsReading(
  base: Record<string, unknown>,
): IeltsReadingQuestion {
  let rawSubs: unknown[] = [];
  if (Array.isArray(base.subQuestions)) {
    rawSubs = base.subQuestions;
  } else if (Array.isArray(base.questions)) {
    // Older shape wraps each in `{ question: {...} }`.
    rawSubs = (base.questions as unknown[]).map((q) => {
      if (q && typeof q === "object" && "question" in q) {
        return (q as Record<string, unknown>).question;
      }
      return q;
    });
  }
  const passage =
    typeof base.passage === "string"
      ? base.passage
      : typeof base.question === "string"
        ? base.question
        : undefined;
  return {
    ...base,
    questionType: "IELTS_READING",
    passage,
    subQuestions: rawSubs.map(normalizeIeltsSubQuestion),
  } as IeltsReadingQuestion;
}

function normalizeDialogTurn(raw: unknown): DialogTurn {
  if (!raw || typeof raw !== "object") {
    return { speaker: "", text: "" };
  }
  const r = raw as Record<string, unknown>;
  const turn: DialogTurn = {
    speaker: typeof r.speaker === "string" ? r.speaker : "",
    text: typeof r.text === "string" ? r.text : "",
  };
  if (r.subQuestion && typeof r.subQuestion === "object") {
    const sq = r.subQuestion as Record<string, unknown>;
    turn.subQuestion = {
      questionType: normalizeQuestionType(sq.questionType),
      options: Array.isArray(sq.options)
        ? normalizeOptionList(sq.options)
        : undefined,
    };
  }
  return turn;
}

function normalizeConversationalBlock(
  base: Record<string, unknown>,
): ConversationalBlockQuestion {
  const dialog = Array.isArray(base.dialog) ? base.dialog : [];
  return {
    ...base,
    questionType: "CONVERSATIONAL_BLOCK",
    dialog: dialog.map(normalizeDialogTurn),
  } as ConversationalBlockQuestion;
}

/**
 * Normalize a single raw question into our canonical discriminated union.
 * Unknown types fall back to SINGLE_CHOICE; missing fields get safe defaults
 * so the dispatcher can render something instead of crashing.
 */
export function normalizeQuestion(raw: unknown): ApiQuizQuestion {
  if (!raw || typeof raw !== "object") {
    return {
      _id: "",
      questionType: "SINGLE_CHOICE",
      options: [],
    } as ApiQuizQuestion;
  }
  const r = raw as Record<string, unknown>;
  const type = normalizeQuestionType(r.questionType ?? r.type);
  const audio = normalizeAudio(r);
  const base: Record<string, unknown> = {
    ...r,
    questionType: type,
    ...(audio ? { audio } : {}),
  };

  switch (type) {
    case "IELTS_READING":
      return normalizeIeltsReading(base);
    case "CONVERSATIONAL_BLOCK":
      return normalizeConversationalBlock(base);
    case "INFO_BLOCKS":
      return {
        ...base,
        questionType: "INFO_BLOCKS",
        blocks: Array.isArray(r.blocks) ? r.blocks : [],
      } as ApiQuizQuestion;
    case "MULTI_FILL_GAPS":
      return {
        ...base,
        questionType: "MULTI_FILL_GAPS",
        gaps: Array.isArray(r.gaps) ? r.gaps : [],
      } as ApiQuizQuestion;
    case "WRITING_EXERCISE":
      return {
        ...base,
        questionType: "WRITING_EXERCISE",
        raw: r,
      } as ApiQuizQuestion;
    case "SPEAKING_QUESTION":
      return {
        ...base,
        questionType: "SPEAKING_QUESTION",
        clues: Array.isArray(r.clues)
          ? (r.clues.filter((c): c is string => typeof c === "string"))
          : undefined,
      } as ApiQuizQuestion;
    default: {
      // SINGLE_CHOICE / MULTIPLE / MATCHING / REORDER_PARAGRAPHS / MULTIPLE_DRAG_AND_DROP
      // all expose a flat `options[]` — normalize per-option audio too.
      return {
        ...base,
        options: normalizeOptionList(r.options),
      } as unknown as ApiQuizQuestion;
    }
  }
}

export function normalizeQuestionList(raw: unknown): ApiQuizQuestion[] {
  if (!Array.isArray(raw)) return [];
  return raw.map(normalizeQuestion);
}
