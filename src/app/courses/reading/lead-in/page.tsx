"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { TaskIntro } from "@/components/courses/tasks/TaskIntro";
import { TaskTrueFalse } from "@/components/courses/tasks/TaskTrueFalse";
import { TaskRecap } from "@/components/courses/tasks/TaskRecap";
import { TaskPresentation } from "@/components/courses/tasks/TaskPresentation";
import { TaskPractice } from "@/components/courses/tasks/TaskPractice";
import { TaskQuiz } from "@/components/courses/tasks/TaskQuiz";
import { TaskSummary } from "@/components/courses/tasks/TaskSummary";
import { TaskMatching } from "@/components/courses/tasks/TaskMatching";
import { TaskReadingExercise } from "@/components/courses/tasks/TaskReadingExercise";
import { TaskResult } from "@/components/courses/tasks/TaskResult";
import { readingTheme } from "@/data/readingCourse";
import { useCourseProgress } from "@/context/CourseProgressContext";
import { useTasks } from "@/hooks/queries";

const COMPONENT_MAP = {
    TaskIntro,
    TaskTrueFalse,
    TaskRecap,
    TaskPresentation,
    TaskPractice,
    TaskQuiz,
    TaskSummary,
    TaskMatching,
    TaskReadingExercise,
    TaskResult
} as const;

export default function LeadInPage() {
    const router = useRouter();
    const { completeStep } = useCourseProgress();

    const { data: tasks, isLoading, isError } = useTasks("reading", "lead-in");
    const [currentTaskIndex, setCurrentTaskIndex] = useState(0);

    const handleNext = () => {
        if (!tasks) return;
        if (currentTaskIndex < tasks.length - 1) {
            setCurrentTaskIndex((prev) => prev + 1);
        }
    };

    const handleBack = () => {
        if (currentTaskIndex > 0) {
            setCurrentTaskIndex((prev) => prev - 1);
        } else {
            router.back();
        }
    };

    const handleFinish = () => {
        completeStep("reading", "lead-in");
        router.push("/courses/reading");
    };

    if (isLoading) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center text-slate-500">
                Loading Lead-in...
            </div>
        );
    }

    if (isError || !tasks || tasks.length === 0) {
        return (
            <div className="w-full min-h-screen flex flex-col items-center justify-center text-slate-600 gap-3">
                <p>{isError ? "Could not load Lead-in tasks. Please try again." : "No tasks available"}</p>
                <button
                    onClick={() => router.back()}
                    className="px-4 py-2 text-sm font-semibold rounded-xl border border-slate-200 hover:bg-slate-50"
                >
                    Go back
                </button>
            </div>
        );
    }

    const currentTaskConfig = tasks[currentTaskIndex];
    const Component = COMPONENT_MAP[currentTaskConfig.componentType as keyof typeof COMPONENT_MAP];

    if (!Component) {
        return <div className="p-8 text-center text-slate-500">Unknown component type</div>;
    }

    const segments = {
        total: tasks.length,
        active: currentTaskIndex + 1
    };

    const componentProps = {
        ...currentTaskConfig.props,
        courseTheme: readingTheme,
        onNext: handleNext,
        onBack: handleBack,
        onFinish: handleFinish,
        segments
    };

    return (
        <div className="w-full min-h-screen">
            {/* @ts-expect-error dynamic component approach */}
            <Component key={currentTaskIndex} {...componentProps} />
        </div>
    );
}
