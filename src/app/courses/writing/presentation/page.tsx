"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { TaskPresentationReading } from "@/components/courses/tasks/TaskPresentationReading";
import { TaskPractice } from "@/components/courses/tasks/TaskPractice";
import { writingPresentationTabs, writingPresentationPractice, writingTheme } from "@/data/writingCourse";
import { useCourseProgress } from "@/context/CourseProgressContext";

export default function PresentationPage() {
    const router = useRouter();
    const { completeStep } = useCourseProgress();
    const [stage, setStage] = useState<"learn" | "practice">("learn");

    const handleFinish = () => {
        completeStep("writing", "presentation");
        router.push("/courses/writing");
    };

    if (stage === "learn") {
        return (
            <TaskPresentationReading
                data={writingPresentationTabs}
                onFinish={() => setStage("practice")}
                courseTheme={writingTheme}
            />
        );
    }

    return (
        <TaskPractice
            steps={writingPresentationPractice}
            onFinish={handleFinish}
            onBack={() => setStage("learn")}
            onClose={() => router.push("/courses/writing")}
            courseTheme={writingTheme}
        />
    );
}
