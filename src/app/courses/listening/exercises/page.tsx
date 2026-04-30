"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { TaskIntro } from "@/components/courses/tasks/TaskIntro";
import { TaskPractice } from "@/components/courses/tasks/TaskPractice";
import { TaskRecap } from "@/components/courses/tasks/TaskRecap";
import { listeningExercisesTasks, listeningTheme } from "@/data/listeningCourse";
import { useCourseProgress } from "@/context/CourseProgressContext";
import {
    QUIZ_SUBMIT_TASKS,
    useLessonQuizSession,
} from "@/hooks/useLessonQuizSession";

const COMPONENT_MAP = {
    TaskIntro,
    TaskPractice,
    TaskRecap,
};

export default function ExercisesPage() {
    const router = useRouter();
    const { completeStep } = useCourseProgress();
    const [currentStep, setCurrentStep] = useState(0);
    const { submit, withResult } = useLessonQuizSession("listening", "exercises");

    const task = listeningExercisesTasks[currentStep];
    if (!task) return null;

    // @ts-expect-error dynamic component
    const TypedComponent = COMPONENT_MAP[task.componentType];

    const handleNext = () => {
        if (currentStep < listeningExercisesTasks.length - 1) {
            setCurrentStep((prev) => prev + 1);
        } else {
            completeStep("listening", "exercises");
            router.push("/courses/listening");
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

    const segments = {
        total: listeningExercisesTasks.length,
        active: currentStep + 1,
    };

    return (
        <div className={`min-h-screen bg-gradient-to-br ${listeningTheme.bgGradient}`}>
            <TypedComponent
                key={currentStep}
                {...withResult(task)}
                onNext={handleNext}
                onBack={handleBack}
                onFinish={onFinishHandler}
                onClose={() => router.push("/courses/listening")}
                courseTheme={listeningTheme}
                segments={segments}
            />
        </div>
    );
}
