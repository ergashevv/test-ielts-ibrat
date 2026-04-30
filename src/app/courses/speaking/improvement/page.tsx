"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { TaskIntro } from "@/components/courses/tasks/TaskIntro";
import { TaskPresentation } from "@/components/courses/tasks/TaskPresentation";
import { TaskPractice } from "@/components/courses/tasks/TaskPractice";
import { TaskRecap } from "@/components/courses/tasks/TaskRecap";
import { TaskVocabularyCard } from "@/components/courses/tasks/TaskVocabularyCard";
import { TaskMatching } from "@/components/courses/tasks/TaskMatching";
import { TaskSpeakingExercise } from "@/components/courses/tasks/TaskSpeakingExercise";
import { speakingTheme } from "@/data/speakingCourse";
import { useCourseProgress } from "@/context/CourseProgressContext";
import { useTasks } from "@/hooks/queries";

const COMPONENT_MAP = {
    TaskIntro,
    TaskPresentation,
    TaskPractice,
    TaskRecap,
    TaskVocabularyCard,
    TaskMatching,
    TaskSpeakingExercise
} as const;

export default function ImprovementPage() {
    const router = useRouter();
    const { completeStep } = useCourseProgress();

    const { data: tasks, isLoading, isError } = useTasks("speaking", "improvement");
    const [currentTaskIndex, setCurrentTaskIndex] = useState(0);

    const handleNext = () => {
        if (!tasks) return;
        if (currentTaskIndex < tasks.length - 1) {
            setCurrentTaskIndex((prev) => prev + 1);
        } else {
            handleFinish();
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
        completeStep("speaking", "improvement");
        router.push("/courses/speaking");
    };

    if (isLoading) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center text-slate-500">
                Loading...
            </div>
        );
    }

    if (isError || !tasks || tasks.length === 0) {
        return (
            <div className="w-full min-h-screen flex flex-col items-center justify-center text-slate-600 gap-3">
                <p>{isError ? "Could not load tasks. Please try again." : "No tasks available"}</p>
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
        return <div className="p-8 text-center text-slate-500">Unknown component type: {currentTaskConfig.componentType}</div>;
    }

    const componentProps = {
        ...currentTaskConfig.props,
        courseTheme: speakingTheme,
        onNext: handleNext,
        onBack: handleBack,
        onFinish: currentTaskIndex === tasks.length - 1 ? handleFinish : handleNext
    };

    return (
        <div className="w-full min-h-screen">
            {/* @ts-expect-error dynamic component approach */}
            <Component {...componentProps} />
        </div>
    );
}
