"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { TaskIntro } from "@/components/courses/tasks/TaskIntro";
import { TaskPresentation } from "@/components/courses/tasks/TaskPresentation";
import { TaskQuickTips } from "@/components/courses/tasks/TaskQuickTips";
import { TaskPractice } from "@/components/courses/tasks/TaskPractice";
import { TaskRecap } from "@/components/courses/tasks/TaskRecap";
import { writingTheme } from "@/data/writingCourse";
import { useCourseProgress } from "@/context/CourseProgressContext";
import { useTasks } from "@/hooks/queries";

const COMPONENT_MAP = {
    TaskIntro,
    TaskPresentation,
    TaskQuickTips,
    TaskPractice,
    TaskRecap
};

export default function QuickTipsPage() {
    const router = useRouter();
    const { completeStep } = useCourseProgress();

    const { data: tasks, isLoading, isError } = useTasks("writing", "quick-tips");
    const [currentStep, setCurrentStep] = useState(0);

    const handleNext = () => {
        if (!tasks) return;
        if (currentStep < tasks.length - 1) {
            setCurrentStep((prev) => prev + 1);
        } else {
            handleFinish();
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
        } else {
            router.back();
        }
    };

    const handleFinish = () => {
        completeStep("writing", "quick-tips");
        router.push("/courses/writing");
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

    const task = tasks[currentStep];
    if (!task) return null;

    // @ts-expect-error dynamic component
    const TypedComponent = COMPONENT_MAP[task.componentType];

    const segments = {
        total: tasks.length,
        active: currentStep + 1
    };

    return (
        <div className={`min-h-screen bg-gradient-to-br ${writingTheme.bgGradient}`}>
            <TypedComponent
                key={currentStep}
                {...task.props}
                onNext={handleNext}
                onBack={handleBack}
                onFinish={handleNext}
                onClose={() => router.push("/courses/writing")}
                courseTheme={writingTheme}
                segments={segments}
            />
        </div>
    );
}
