import { listeningTheme } from "@/data/listeningCourse";
import { readingTheme } from "@/data/readingCourse";
import { speakingTheme } from "@/data/speakingCourse";
import { writingTheme } from "@/data/writingCourse";
import type { CourseId, CourseNavigatorMeta, CourseTheme } from "@/types";

interface CourseCatalogEntry extends CourseNavigatorMeta {
  theme: CourseTheme;
}

export const courseCatalog: Record<CourseId, CourseCatalogEntry> = {
  reading: {
    courseTitle: "Reading",
    sessionTitle: "Leisure & Free Time",
    sessionSubtitle: "Session 1: Understanding Statements & Locating Information",
    theme: readingTheme,
  },
  writing: {
    courseTitle: "Writing",
    sessionTitle: "Academic Writing Task 1",
    sessionSubtitle: "Session 1: Describing Charts And Trends",
    theme: writingTheme,
    excludeSteps: ["exercises"],
  },
  speaking: {
    courseTitle: "Speaking",
    sessionTitle: "Speaking Part 1 Foundations",
    sessionSubtitle: "Session 1: Giving Clear Personal Answers",
    theme: speakingTheme,
  },
  listening: {
    courseTitle: "Listening",
    sessionTitle: "Everyday Listening Skills",
    sessionSubtitle: "Session 1: Identifying Key Details And Signposts",
    theme: listeningTheme,
    excludeSteps: ["exercises"],
  },
};
