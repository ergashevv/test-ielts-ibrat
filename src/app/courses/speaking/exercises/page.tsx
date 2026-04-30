"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { TaskIntro } from "@/components/courses/tasks/TaskIntro";
import { TaskPractice } from "@/components/courses/tasks/TaskPractice";
import { TaskRecap } from "@/components/courses/tasks/TaskRecap";
import { TaskSpeakingExercise } from "@/components/courses/tasks/TaskSpeakingExercise";
import { TaskMatching } from "@/components/courses/tasks/TaskMatching";
import { TaskDragFill } from "@/components/courses/tasks/TaskDragFill";
import { speakingExercisesTasks, speakingTheme } from "@/data/speakingCourse";
import { useCourseProgress } from "@/context/CourseProgressContext";
import {
    QUIZ_SUBMIT_TASKS,
    useLessonQuizSession,
} from "@/hooks/useLessonQuizSession";

const COMPONENT_MAP = {
    TaskIntro,
    TaskPractice,
    TaskRecap,
    TaskSpeakingExercise,
    TaskMatching,
    TaskDragFill,
};

export default function ExercisesPage() {
    const router = useRouter();
    const { completeStep } = useCourseProgress();
    const [currentStep, setCurrentStep] = useState(0);
    const { submit, withResult, practicumId, moduleId, lessonId } =
        useLessonQuizSession("speaking", "exercises");

    const task = speakingExercisesTasks[currentStep];
    if (!task) return null;

    // @ts-expect-error dynamic component
    const TypedComponent = COMPONENT_MAP[task.componentType];

    const handleNext = () => {
        if (currentStep < speakingExercisesTasks.length - 1) {
            setCurrentStep((prev) => prev + 1);
        } else {
            completeStep("speaking", "exercises");
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
        total: speakingExercisesTasks.length,
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
