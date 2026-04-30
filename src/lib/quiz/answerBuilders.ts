/**
 * Per-question-type answer builders.
 *
 * Backend canonical submit payload (confirmed via IELTS_READING /complete):
 *   { answers: [{ questionId, answersIds: string[] }] }
 *
 * Every question type maps user input into a `string[]` for `answersIds`.
 * For types whose submit format is still pending backend confirmation, we
 * pick a best-effort encoding and document the assumption inline so it's
 * easy to swap once the contract lands.
 */

export interface QuizAnswer {
  questionId: string;
  answersIds: string[];
}

export function buildSingleChoiceAnswer(
  questionId: string,
  optionId: string,
): QuizAnswer {
  return { questionId, answersIds: [optionId] };
}

export function buildMultipleAnswer(
  questionId: string,
  optionIds: string[],
): QuizAnswer {
  return { questionId, answersIds: optionIds };
}

/**
 * MULTI_FILL_GAPS — one option per gap, ordered by `gapNumber` ascending.
 * Backend assumed to read `answersIds[i]` as the chosen option for gap i+1.
 */
export function buildFillGapsAnswer(
  questionId: string,
  optionsByGap: { gapNumber: number; optionId: string }[],
): QuizAnswer {
  const ordered = [...optionsByGap]
    .sort((a, b) => a.gapNumber - b.gapNumber)
    .map((g) => g.optionId);
  return { questionId, answersIds: ordered };
}

/**
 * SHORT_ANSWER (nested under IELTS_READING) — user types literal text.
 * Confirmed via Postman: `answersIds: ["detail one"]`.
 */
export function buildShortAnswer(questionId: string, text: string): QuizAnswer {
  return { questionId, answersIds: [text] };
}

/**
 * REORDER_PARAGRAPHS — flat `answersIds: string[]` in user-chosen order.
 * Confirmed via Postman audit (2026-04-30).
 */
export function buildReorderAnswer(
  questionId: string,
  orderedIds: string[],
): QuizAnswer {
  return { questionId, answersIds: orderedIds };
}

/**
 * MATCHING — pipe-separated `"leftOptionId|rightOptionId"` per pair.
 * Confirmed via Postman audit (2026-04-30).
 */
export function buildMatchingAnswer(
  questionId: string,
  pairs: { leftId: string; rightId: string }[],
): QuizAnswer {
  return {
    questionId,
    answersIds: pairs.map((p) => `${p.leftId}|${p.rightId}`),
  };
}

/**
 * MULTIPLE_DRAG_AND_DROP — flat `answersIds: string[]` of option ids in the
 * user-chosen sequence. Backend groups by `order` server-side.
 * Confirmed via Postman audit (2026-04-30).
 */
export function buildDragAndDropAnswer(
  questionId: string,
  orderedIds: string[],
): QuizAnswer {
  return { questionId, answersIds: orderedIds };
}

/**
 * WRITING_EXERCISE — pending backend confirmation. We submit the text body
 * as a single-element `answersIds` (matching the SHORT_ANSWER convention).
 */
export function buildWritingAnswer(questionId: string, text: string): QuizAnswer {
  return { questionId, answersIds: [text] };
}

