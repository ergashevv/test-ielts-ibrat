"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { TaskIntro } from "@/components/courses/tasks/TaskIntro";
import { TaskPractice } from "@/components/courses/tasks/TaskPractice";
import { TaskRecap } from "@/components/courses/tasks/TaskRecap";
import { writingExercisesTasks, writingTheme } from "@/data/writingCourse";
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
    const { submit, withResult } = useLessonQuizSession("writing", "exercises");

    const task = writingExercisesTasks[currentStep];
    if (!task) return null;

    // @ts-expect-error dynamic component
    const TypedComponent = COMPONENT_MAP[task.componentType];

    const handleNext = () => {
        if (currentStep < writingExercisesTasks.length - 1) {
            setCurrentStep((prev) => prev + 1);
        } else {
            completeStep("writing", "exercises");
            router.push("/courses/writing");
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
        total: writingExercisesTasks.length,
        active: currentStep + 1,
    };

    return (
        <div className={`min-h-screen bg-gradient-to-br ${writingTheme.bgGradient}`}>
            <TypedComponent
                key={currentStep}
                {...withResult(task)}
                onNext={handleNext}
                onBack={handleBack}
                onFinish={onFinishHandler}
                onClose={() => router.push("/courses/writing")}
                courseTheme={writingTheme}
                segments={segments}
            />
        </div>
    );
}
