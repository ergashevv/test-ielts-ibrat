"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { CourseId } from "@/types";

interface CourseProgressState {
    completedSteps: string[];
    currentStep: string;
}

interface CourseProgressContextType {
    getCompletedSteps: (courseId: CourseId) => string[];
    getCurrentStep: (courseId: CourseId) => string;
    completeStep: (courseId: CourseId, stepId: string) => void;
    setCurrentStep: (courseId: CourseId, stepId: string) => void;
}

// Versioned key so eski demo ma'lumotlar UI'ni buzib yubormasin
const STORAGE_KEY = "course_progress_v3";
const DEFAULT_PROGRESS: CourseProgressState = {
    completedSteps: [],
    currentStep: "lead-in",
};

const CourseProgressContext = createContext<CourseProgressContextType | undefined>(undefined);

export function CourseProgressProvider({ children }: { children: ReactNode }) {
    const [progressByCourse, setProgressByCourse] = useState<Partial<Record<CourseId, CourseProgressState>>>(() => {
        if (typeof window === "undefined") {
            return {};
        }

        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) {
            return {};
        }

        try {
            const parsed = JSON.parse(saved);
            return parsed.progressByCourse || {};
        } catch (e) {
            console.error("Failed to parse progress", e);
            return {};
        }
    });

    const getCourseProgress = (courseId: CourseId): CourseProgressState => {
        return progressByCourse[courseId] ?? DEFAULT_PROGRESS;
    };

    // Save progress to localStorage whenever it changes
    useEffect(() => {
        if (typeof window === "undefined") return;
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ progressByCourse }));
    }, [progressByCourse]);

    const completeStep = (courseId: CourseId, stepId: string) => {
        setProgressByCourse((current) => {
            const courseProgress = current[courseId] ?? DEFAULT_PROGRESS;
            if (courseProgress.completedSteps.includes(stepId)) {
                return current;
            }

            return {
                ...current,
                [courseId]: {
                    ...courseProgress,
                    completedSteps: [...courseProgress.completedSteps, stepId],
                },
            };
        });
    };

    const setCourseCurrentStep = (courseId: CourseId, stepId: string) => {
        setProgressByCourse((current) => ({
            ...current,
            [courseId]: {
                ...(current[courseId] ?? DEFAULT_PROGRESS),
                currentStep: stepId,
            },
        }));
    };

    return (
        <CourseProgressContext.Provider value={{
            getCompletedSteps: (courseId) => getCourseProgress(courseId).completedSteps,
            getCurrentStep: (courseId) => getCourseProgress(courseId).currentStep,
            completeStep,
            setCurrentStep: setCourseCurrentStep
        }}>
            {children}
        </CourseProgressContext.Provider>
    );
}

export function useCourseProgress() {
    const context = useContext(CourseProgressContext);
    if (context === undefined) {
        throw new Error("useCourseProgress must be used within a CourseProgressProvider");
    }
    return context;
}
