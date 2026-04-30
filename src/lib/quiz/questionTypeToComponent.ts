/**
 * Mapping from backend `questionType` to the frontend Task* `componentType`
 * used by step-page dispatchers.
 *
 * `null` means the component is not yet built — see CLAUDE.md
 * "Task types NOT YET BUILT" for the design backlog.
 */

import type { QuestionType } from "./types";

export const questionTypeToComponent: Record<QuestionType, string | null> = {
  SINGLE_CHOICE: "TaskPractice",
  MULTIPLE: "TaskPractice",
  MATCHING: "TaskMatching",
  SPEAKING_QUESTION: "TaskSpeakingExercise",
  IELTS_READING: "TaskReadingExercise",
  MULTI_FILL_GAPS: "TaskDragFill",

  INFO_BLOCKS: null,
  REORDER_PARAGRAPHS: null,
  MULTIPLE_DRAG_AND_DROP: null,
  WRITING_EXERCISE: null,
  CONVERSATIONAL_BLOCK: null,
};

export function componentForQuestionType(type: QuestionType): string | null {
  return questionTypeToComponent[type];
}
