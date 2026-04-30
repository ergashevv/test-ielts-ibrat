# Ibrat IELTS Web

Next.js (App Router) frontend for an IELTS prep platform. Four courses (Reading, Writing, Speaking, Listening), each split into the same step pipeline: `lead-in → presentation → quick-tips → improvement → practice → summary → exercises`. Per-course exclusions in [src/data/courseCatalog.ts](src/data/courseCatalog.ts).

## Architecture

- **Theme per course** — `CourseTheme` defined in `src/data/<course>Course.ts`. Task components accept a `courseTheme` prop. Don't hard-code colors.
- **Step pages = thin shells** — Each `src/app/courses/<course>/<step>/page.tsx` iterates a `TaskConfig[]` and dispatches to a React component via a local `COMPONENT_MAP`. Adding a task type means updating both the page's map AND the union in [src/types/index.ts](src/types/index.ts) (`TaskConfig.componentType`).
- **Shared task chrome** — `TaskHeader` (X close + progress bar) and `TaskFooter` (Back + Action button + feedback strip) from [src/components/courses/shared](src/components/courses/shared). Reuse, don't reinvent.
- **Progress** — [useCourseProgress](src/context/CourseProgressContext.tsx) tracks step completion locally; [useCompletedSteps](src/hooks/useCompletedSteps.ts) reads it from the backend lesson list (`completed` flag).
- **Streak** — `useStreak()` from `StreakContext` registers correct/incorrect answers in `TaskPractice`. Reward UI is `TaskStreakReward`.

## Existing task components

In [src/components/courses/tasks/](src/components/courses/tasks/). All accept `courseTheme`, most accept `segments` and `progress`.

| Component | Purpose |
|---|---|
| TaskIntro | Outcomes / plain intro screen |
| TaskPractice | MC / fill-blank / fill-blank-choice. Accumulates per-question answers and emits via `onFinish(answers)` on the final question. |
| TaskTrueFalse | True/False with context+task cards |
| TaskMatching | 5×5 word↔definition matching |
| TaskVocabularyCard | Word card with audio (falls back to `window.speechSynthesis`) |
| TaskPresentation | Multi-step text presentation |
| TaskRecap | "Lesson completed!" with stats |
| TaskSummary | Bullet-point summary |
| TaskQuiz | Quick MC quiz |
| TaskReadingExercise | Passage + gap-fill MC |
| TaskExplanation | Static explanation page |
| TaskQuickTips | Tip cards |
| TaskResult | Score summary |
| TaskSpeakingExercise | Real `MediaRecorder` + `getUserMedia`; uploads `Blob` via `useAnalyzeSpeech` when scope IDs are set. |
| TaskDragFill | Click-to-place chips into inline `___` blanks. |

Several backend question types have no component yet — see [src/lib/quiz/questionTypeToComponent.ts](src/lib/quiz/questionTypeToComponent.ts) for entries mapping to `null`. New reorder/drag UI should follow `TaskDragFill`'s **click-to-place** pattern, not HTML5 drag.

## Conventions

- TypeScript everywhere. `TaskConfig.props` is `Record<string, any>` by design (dispatcher pattern); type props on the component itself.
- Tailwind: keep arbitrary values like `rounded-[16px]`, `max-w-[600px]` — IDE may suggest canonical classes; ignore them for consistency.
- Icons: `lucide-react`.
- Animations: `animate-scale-in`, `animate-fade-in`, `animate-slide-up` (wired in `globals.css`).
- Color tweaks go in `src/data/<course>Course.ts` (Reading orange, Writing blue, Listening purple `#884DDF`/`#CCA9FF`, Speaking green `#54B741`/`#71CC5E`). Never patch individual components.

`npx tsc --noEmit` is clean for new code. `TaskQuickTips` and lead-in pages have historical `@ts-expect-error` directives that intentionally bypass strict prop typing in the dispatcher pattern — don't "fix" them.

## API integration

Foundation: axios + interceptors at [src/lib/api/](src/lib/api/), TanStack Query at [src/lib/query/](src/lib/query/), services at [src/services/](src/services/), hooks at [src/hooks/queries/](src/hooks/queries/). Mock toggle: `NEXT_PUBLIC_USE_MOCK=true` (dev fallback in [src/data/mock.ts](src/data/mock.ts)). CONTENT lessons stay frontend-static; only QUIZ + auth + profile + progress + streak + plans + scoring go through the API.

### Contract

- Base URL: `NEXT_PUBLIC_API_URL` (staging: `https://staging.ibrat.dev/v1`).
- Auth: HttpOnly cookies (`token`, `refreshToken`) — browser-managed, never read or write client-side. [middleware.ts](src/middleware.ts) gates all paths except `/login` and `/api`.
- Error envelope: `{ error: { code, message, data }, requestId }` → [ApiError](src/lib/api/errors.ts). 401 redirects to `/login` automatically.
- Pagination: `{ pagesCount, currentPage, totalCount, resultCount, limit, data: T[] }`. Use `emptyPage<T>()` from [src/lib/api/types.ts](src/lib/api/types.ts) for mock fallbacks.
- Hierarchy: `Practicum → Module → Lesson (CONTENT|QUIZ)`. **Each frontend course is its own practicum.** Frontend resolves IDs via `coursesService.list()` → `GET /practicums/public` filtered by `name.toLowerCase()`. Modules within a practicum are topic-based ("Leisure & Free Time" etc.), not aligned with the step pipeline; [useLessonForStep](src/hooks/useLessonForStep.ts) takes the first module.
- Step → lesson resolution is by **index** in the effective pipeline (after `excludeSteps`). Backend doesn't expose `lesson.stepType` yet.

### Quiz model

- Endpoint: `POST .../quiz/complete` (NOT `/quiz/finish` — that doesn't exist).
- State machine: `quiz/start` (empty body) → `quiz/complete`.
- Submit payload: `{ answers: [{ questionId, answersIds: string[] }] }`. Build with the per-type helpers in [src/lib/quiz/answerBuilders.ts](src/lib/quiz/answerBuilders.ts) — notably `MATCHING` uses pipe-joined `"leftId|rightId"` strings.
- Submit response: `QuizCompleteResult` in [src/services/answers.service.ts](src/services/answers.service.ts) — aggregate fields plus per-question `questions[]`.
- Speech: separate `POST .../quiz/questions/:questionId/analyze-speech` with `multipart/form-data`.

### Question-type model

11 canonical types modeled as a discriminated union in [src/lib/quiz/types.ts](src/lib/quiz/types.ts). Boundary normalizer in [src/lib/quiz/normalize.ts](src/lib/quiz/normalize.ts) handles the messy parts: uppercases `questionType`, aliases legacy `MULTIPLE_CHOICE` → `MULTIPLE`, collapses `audioUrl`/`audio` into a canonical `Audio`, and accepts both real-GET (`passage`/`subQuestions`) and create-payload (`question`/`questions`) shapes for `IELTS_READING`. Real lesson body wraps quiz content as `lesson.quiz: { ..., questions[] }` — the lesson service flattens it onto `lesson.questions`.

`isCorrect` IS exposed to students in real GET responses. Don't rely on it being absent.

## Open backend questions

These shape decisions but don't block local work:

- Token refresh: `refreshToken` cookie exists, no documented refresh endpoint. Silent rotation, or hidden `/auth/refresh`?
- `lesson.stepType` enum — needed to label lessons reliably (currently index-based).
- Real GET shape for 7 untested question types (`MULTI_FILL_GAPS`, `REORDER_PARAGRAPHS`, `MATCHING`, `MULTIPLE_DRAG_AND_DROP`, `MULTIPLE`, `WRITING_EXERCISE`, `SPEAKING_QUESTION`, `INFO_BLOCKS`). Student account hits `403 PRACTICUM_LOCKED`; admin token needed.
- `WRITING_EXERCISE` create body, `/analyze-speech` response shape, `/quiz/reset` existence, `passed` threshold, audio shape standardization, explanation/difficulty visibility to students.
