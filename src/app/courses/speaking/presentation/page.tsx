"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { TaskPresentationReading } from "@/components/courses/tasks/TaskPresentationReading";
import { TaskPractice } from "@/components/courses/tasks/TaskPractice";
import {
    speakingPresentationTabs,
    speakingPresentationPractice,
    speakingTheme
} from "@/data/speakingCourse";
import { useCourseProgress } from "@/context/CourseProgressContext";

export default function PresentationPage() {
    const router = useRouter();
    const { completeStep } = useCourseProgress();
    const [stage, setStage] = useState<"learn" | "practice">("learn");

    const handleFinish = () => {
        completeStep("speaking", "presentation");
        router.push("/courses/speaking");
    };

    if (stage === "learn") {
        return (
            <TaskPresentationReading
                data={speakingPresentationTabs}
                onFinish={() => setStage("practice")}
                courseTheme={speakingTheme}
            />
        );
    }

    return (
        <TaskPractice
            steps={speakingPresentationPractice}
            onFinish={handleFinish}
            onBack={() => setStage("learn")}
            onClose={() => router.push("/courses/speaking")}
            courseTheme={speakingTheme}
        />
    );
}
