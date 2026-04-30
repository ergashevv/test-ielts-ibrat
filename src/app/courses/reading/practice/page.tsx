"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { TaskIntro } from "@/components/courses/tasks/TaskIntro";
import { TaskPresentation } from "@/components/courses/tasks/TaskPresentation";
import { TaskExplanation } from "@/components/courses/tasks/TaskExplanation";
import { TaskPractice } from "@/components/courses/tasks/TaskPractice";
import { TaskRecap } from "@/components/courses/tasks/TaskRecap";
import { TaskReadingExercise } from "@/components/courses/tasks/TaskReadingExercise";
import { TaskResult } from "@/components/courses/tasks/TaskResult";
import { readingPracticeTasks, readingTheme } from "@/data/readingCourse";
import { useCourseProgress } from "@/context/CourseProgressContext";
import {
    QUIZ_SUBMIT_TASKS,
    useLessonQuizSession,
} from "@/hooks/useLessonQuizSession";

const COMPONENT_MAP = {
    TaskIntro,
    TaskPresentation,
    TaskExplanation,
    TaskPractice,
    TaskRecap,
    TaskReadingExercise,
    TaskResult,
};

export default function PracticePage() {
    const router = useRouter();
    const { completeStep } = useCourseProgress();
    const [currentStep, setCurrentStep] = useState(0);
    const { submit, withResult } = useLessonQuizSession("reading", "practice");

    const task = readingPracticeTasks[currentStep];
    if (!task) return null;

    // @ts-expect-error dynamic component
    const TypedComponent = COMPONENT_MAP[task.componentType];

    const handleNext = () => {
        if (currentStep < readingPracticeTasks.length - 1) {
            setCurrentStep((prev) => prev + 1);
        } else {
            completeStep("reading", "practice");
            router.push("/courses/reading");
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
        } else {
            router.back();
        }
    };

    const handleQuizSubmit = (answersRecord: Record<string, string>) => {
        submit(answersRecord);
        handleNext();
    };

    const onFinishHandler = QUIZ_SUBMIT_TASKS.has(task.componentType)
        ? handleQuizSubmit
        : handleNext;

    return (
        <div className={`min-h-screen bg-gradient-to-br ${readingTheme.bgGradient}`}>
            <TypedComponent
                key={currentStep}
                {...withResult(task)}
                onNext={handleNext}
                onBack={handleBack}
                onFinish={onFinishHandler}
                onClose={() => router.push("/courses/reading")}
                courseTheme={readingTheme}
            />
        </div>
    );
}
