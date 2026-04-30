"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { TaskIntro } from "@/components/courses/tasks/TaskIntro";
import { TaskPresentation } from "@/components/courses/tasks/TaskPresentation";
import { TaskPractice } from "@/components/courses/tasks/TaskPractice";
import { TaskReadingExercise } from "@/components/courses/tasks/TaskReadingExercise";
import { TaskResult } from "@/components/courses/tasks/TaskResult";
import { TaskRecap } from "@/components/courses/tasks/TaskRecap";
import { readingExercisesTasks } from "@/data/readingCourse";
import { useCourseProgress } from "@/context/CourseProgressContext";
import {
    QUIZ_SUBMIT_TASKS,
    useLessonQuizSession,
} from "@/hooks/useLessonQuizSession";

const COMPONENT_MAP = {
    TaskIntro,
    TaskPresentation,
    TaskPractice,
    TaskReadingExercise,
    TaskResult,
    TaskRecap,
};

export default function ReadingExercisesPage() {
    const router = useRouter();
    const { completeStep } = useCourseProgress();
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const { submit, withResult } = useLessonQuizSession("reading", "exercises");

    const activeTask = readingExercisesTasks[currentStepIndex];
    if (!activeTask) return null;

    // @ts-expect-error dynamic component
    const Component = COMPONENT_MAP[activeTask.componentType];
    const progress = ((currentStepIndex + 1) / readingExercisesTasks.length) * 100;

    const handleNext = () => {
        if (currentStepIndex < readingExercisesTasks.length - 1) {
            setCurrentStepIndex(currentStepIndex + 1);
        } else {
            completeStep("reading", "exercises");
            router.push("/courses/reading");
        }
    };

    const handleBack = () => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex(currentStepIndex - 1);
        } else {
            router.back();
        }
    };

    const handleQuizSubmit = (answersRecord: Record<string, string>) => {
        submit(answersRecord);
        handleNext();
    };

    const onFinishHandler = QUIZ_SUBMIT_TASKS.has(activeTask.componentType)
        ? handleQuizSubmit
        : handleNext;

    const segments = {
        total: readingExercisesTasks.length,
        active: currentStepIndex + 1,
    };

    return (
        <div className="min-h-screen bg-white">
            <Component
                key={currentStepIndex}
                {...withResult(activeTask)}
                onNext={handleNext}
                onBack={handleBack}
                onFinish={onFinishHandler}
                onClose={() => router.push("/courses/reading")}
                progress={progress}
                segments={segments}
            />
        </div>
    );
}
