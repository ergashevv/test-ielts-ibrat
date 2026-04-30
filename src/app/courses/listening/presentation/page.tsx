"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { TaskPresentationReading } from "@/components/courses/tasks/TaskPresentationReading";
import { TaskPractice } from "@/components/courses/tasks/TaskPractice";
import {
    listeningPresentationTabs,
    listeningPresentationPractice,
    listeningTheme
} from "@/data/listeningCourse";
import { useCourseProgress } from "@/context/CourseProgressContext";

export default function PresentationPage() {
    const router = useRouter();
    const { completeStep } = useCourseProgress();
    const [stage, setStage] = useState<"learn" | "practice">("learn");

    const handleFinish = () => {
        completeStep("listening", "presentation");
        router.push("/courses/listening");
    };

    if (stage === "learn") {
        return (
            <TaskPresentationReading
                data={listeningPresentationTabs}
                onFinish={() => setStage("practice")}
                courseTheme={listeningTheme}
            />
        );
    }

    return (
        <TaskPractice
            steps={listeningPresentationPractice}
            onFinish={handleFinish}
            onBack={() => setStage("learn")}
            onClose={() => router.push("/courses/listening")}
            courseTheme={listeningTheme}
        />
    );
}
