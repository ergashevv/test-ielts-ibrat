export interface CourseTheme {
  primaryColor: string;
  gradient: string;
  shadowColor: string;
  lightBg: string;
  bgGradient: string;
}

export type CourseId = "reading" | "writing" | "speaking" | "listening";

export interface CourseNavigatorMeta {
  courseTitle: string;
  sessionTitle: string;
  sessionSubtitle: string;
  excludeSteps?: string[];
}

export interface LearningPoint {
  icon: string;
  title: string;
  description: string;
}

export interface TaskConfig {
  type: string;
  componentType: "TaskIntro" | "TaskTrueFalse" | "TaskRecap" | "TaskPresentation" | "TaskQuickTips" | "TaskVocabularyCard" | "TaskExplanation" | "TaskPractice" | "TaskQuiz" | "TaskSummary" | "TaskMatching" | "TaskReadingExercise" | "TaskResult" | "TaskSpeakingExercise" | "TaskDragFill" | "TaskListenMCQ";
  props: Record<string, any>;
}

export interface PresentationStep {
  id: string;
  title: string;
  content: string;
  contentBlocks?: string[];
  example?: string;
  tip?: string;
  image?: string;
}

export interface PresentationTextSection {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface PresentationTabsData {
  intro: {
    title: string;
    description: string;
    icon: string;
  };
  contentTitle: string;
  text: {
    intro?: string;
    sections: PresentationTextSection[];
  };
  audio: {
    src?: string;
    coverImage?: string;
    durationLabel?: string;
    currentLabel?: string;
  };
  video: {
    src?: string;
    poster?: string;
    durationLabel?: string;
    currentLabel?: string;
  };
  infographic: {
    image: string;
    alt?: string;
  };
}

export interface PracticeQuestion {
  id: string;
  question: string;
  type: "multiple-choice" | "fill-blank" | "short-answer" | "fill-blank-choice";
  options?: string[];
  answer: string;
  explanation?: string;
  taskLabel?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  answer: string;
}

export interface MatchPair {
  id: string;
  left: string;
  right: string;
}

export interface TaskMatchingMetadata {
  instruction?: string;
  pairs: MatchPair[];
}

export interface SummaryPoint {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  icon: string;
  image?: string;
  theme: string;
  backgroundColor?: string;
  progress: number;
  progressFrom?: number;
  progressTo?: number;
  unitCount?: number;
  /** Backend practicum `_id`. Each frontend course is its own practicum. */
  practicumId?: string;
}

export interface Promo {
  id: string;
  title: string;
  description: string;
  image: string;
  cta: string;
  ctaLabel?: string;
}

export interface Section {
  id: string;
  title: string;
  tasks: any[];
  progress?: number;
}

export interface User {
  id: string;
  name?: string;
  fullName?: string;
  email: string;
  phone?: string;
  avatar?: string;
  avatarUrl?: string;
  // Canonical fields from /user-profile (Round 4)
  firstName?: string;
  lastName?: string;
  coins?: number;
  xp?: number;
  level?: number;
  plan?: { _id: string; name: string; expiresAt: string } | null;
}


export interface SettingToggle {
  id: string;
  label: string;
  description?: string;
  enabled: boolean;
}

