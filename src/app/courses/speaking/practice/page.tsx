"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { TaskIntro } from "@/components/courses/tasks/TaskIntro";
import { TaskPresentation } from "@/components/courses/tasks/TaskPresentation";
import { TaskPractice } from "@/components/courses/tasks/TaskPractice";
import { TaskRecap } from "@/components/courses/tasks/TaskRecap";
import { TaskReadingExercise } from "@/components/courses/tasks/TaskReadingExercise";
import { TaskResult } from "@/components/courses/tasks/TaskResult";
import { TaskSpeakingExercise } from "@/components/courses/tasks/TaskSpeakingExercise";
import { speakingPracticeTasks, speakingTheme } from "@/data/speakingCourse";
import { useCourseProgress } from "@/context/CourseProgressContext";
import {
    QUIZ_SUBMIT_TASKS,
    useLessonQuizSession,
} from "@/hooks/useLessonQuizSession";

const COMPONENT_MAP = {
    TaskIntro,
    TaskPresentation,
    TaskPractice,
    TaskRecap,
    TaskReadingExercise,
    TaskResult,
    TaskSpeakingExercise,
};

export default function PracticePage() {
    const router = useRouter();
    const { completeStep } = useCourseProgress();
    const [currentStep, setCurrentStep] = useState(0);
    const { submit, withResult, practicumId, moduleId, lessonId } =
        useLessonQuizSession("speaking", "practice");

    const task = speakingPracticeTasks[currentStep];
    if (!task) return null;

    // @ts-expect-error dynamic component
    const TypedComponent = COMPONENT_MAP[task.componentType];

    const handleNext = () => {
        if (currentStep < speakingPracticeTasks.length - 1) {
            setCurrentStep((prev) => prev + 1);
        } else {
            completeStep("speaking", "practice");
            router.push("/courses/speaking");
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
        total: speakingPracticeTasks.length,
        active: currentStep + 1,
    };

    const speakingApiProps =
        task.componentType === "TaskSpeakingExercise"
            ? {
                  practicumId,
                  moduleId,
                  lessonId,
                  questionId: (task.props.questionId as string | undefined) ?? `${currentStep}`,
              }
            : {};

    return (
        <div className={`min-h-screen bg-gradient-to-br ${speakingTheme.bgGradient}`}>
            <TypedComponent
                key={currentStep}
                {...withResult(task)}
                {...speakingApiProps}
                onNext={handleNext}
                onBack={handleBack}
                onFinish={onFinishHandler}
                onClose={() => router.push("/courses/speaking")}
                courseTheme={speakingTheme}
                segments={segments}
            />
        </div>
    );
}
