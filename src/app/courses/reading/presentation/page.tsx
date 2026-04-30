"use client";
import { useRouter } from "next/navigation";
import { TaskPresentationReading } from "@/components/courses/tasks/TaskPresentationReading";
import { readingPresentationTabs, readingTheme } from "@/data/readingCourse";
import { useCourseProgress } from "@/context/CourseProgressContext";

export default function PresentationPage() {
    const router = useRouter();
    const { completeStep } = useCourseProgress();

    const handleFinish = () => {
        completeStep("reading", "presentation");
        router.push("/courses/reading");
    };

    return (
        <TaskPresentationReading
            data={readingPresentationTabs}
            onFinish={handleFinish}
            courseTheme={readingTheme}
        />
    );
}
