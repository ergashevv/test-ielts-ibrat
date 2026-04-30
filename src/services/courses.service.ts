import { apiConfig } from "@/lib/api";
import { mockCourses } from "@/data/mock";
import { practicumsService, type ApiPracticum } from "./practicums.service";
import type { Course, CourseId } from "@/types";

const KNOWN_COURSE_IDS: readonly CourseId[] = [
  "reading",
  "listening",
  "writing",
  "speaking",
] as const;

type CourseMeta = Pick<Course, "icon" | "theme" | "backgroundColor" | "description"> & {
  order: number;
};

export const COURSE_META: Record<CourseId, CourseMeta> = {
  reading: {
    icon: "/reading.svg",
    theme: "blue",
    backgroundColor: "#E9F2FF",
    description: "Master IELTS Reading section",
    order: 0,
  },
  listening: {
    icon: "/listening.svg",
    theme: "purple",
    backgroundColor: "#F5F0FD",
    description: "Improve your hearing skills",
    order: 1,
  },
  writing: {
    icon: "/writing.svg",
    theme: "red",
    backgroundColor: "#FFEEE9",
    description: "Improve your IELTS Writing skills",
    order: 2,
  },
  speaking: {
    icon: "/speaking.svg",
    theme: "green",
    backgroundColor: "#EEF8EC",
    description: "Practice your speaking fluency",
    order: 3,
  },
};

function practicumToCourseId(name: string): CourseId | null {
  const normalized = name.trim().toLowerCase();
  return (KNOWN_COURSE_IDS as readonly string[]).includes(normalized)
    ? (normalized as CourseId)
    : null;
}

export function buildCoursesFromPracticums(practicums: ApiPracticum[]): Course[] {
  type WithOrder = Course & { order: number };
  const list: WithOrder[] = [];
  for (const p of practicums) {
    const id = practicumToCourseId(p.name);
    if (!id) continue;
    const meta = COURSE_META[id];
    list.push({
      id,
      title: p.name,
      description: meta.description,
      icon: meta.icon,
      theme: meta.theme,
      backgroundColor: meta.backgroundColor,
      progress: 0,
      unitCount: p.modulesCount ?? 0,
      practicumId: p._id,
      order: meta.order,
    });
  }
  return list.sort((a, b) => a.order - b.order);
}

/**
 * Course list = filtered IELTS practicums from `/practicums/public`.
 *
 * Confirmed via Postman audit (2026-04-30): Reading / Writing / Listening /
 * Speaking are 4 separate practicums (NOT modules of a single IELTS
 * practicum, as Round 4 wrongly stated). The frontend pulls the public list,
 * filters by `name.toLowerCase()` matching a known `CourseId`, and attaches
 * static UI metadata (icon/theme/bg).
 */
export const coursesService = {
  list: async (): Promise<Course[]> => {
    if (apiConfig.useMock) return mockCourses;
    const page = await practicumsService.listPublic();
    return buildCoursesFromPracticums(page.data);
  },
};
