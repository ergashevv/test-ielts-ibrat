"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { courseCatalog } from "@/data/courseCatalog";
import { useCompletedSteps } from "@/hooks/useCompletedSteps";
import type { CourseId } from "@/types";
import { CourseModuleSidebar } from "./CourseModuleSidebar";

interface CourseStep {
    id: string;
    title: string;
    description: string;
    icon: string;
    status: "locked" | "completed" | "current" | "start";
}

const stepsTemplate = [
    { id: "lead-in", title: "Lead-in", description: "", icon: "/icons/lesson-steps/lead-in-icon.svg" },
    { id: "presentation", title: "Presentation", description: "", icon: "/icons/lesson-steps/presentation-icon.svg" },
    { id: "quick-tips", title: "Quick tips", description: "", icon: "/icons/lesson-steps/quick-tips-icon.svg" },
    { id: "improvement", title: "Improvement", description: "", icon: "/icons/lesson-steps/Improvement.svg" },
    { id: "practice", title: "Practice", description: "", icon: "/icons/lesson-steps/Practice-icon.svg" },
    { id: "summary", title: "Summary", description: "", icon: "/icons/lesson-steps/summary-icon.svg" },
    { id: "exercises", title: "Exercises", description: "", icon: "/icons/lesson-steps/Practice-icon.svg" },
];

export function CourseNavigator({ courseId }: { courseId: CourseId }) {
    const router = useRouter();
    const courseConfig = courseCatalog[courseId];
    const completedSteps = useCompletedSteps(courseId);

    const excluded = courseConfig.excludeSteps ?? [];
    const visibleSteps = stepsTemplate.filter((s) => !excluded.includes(s.id));

    const steps: CourseStep[] = visibleSteps.map((step, index) => {
        let status: CourseStep["status"] = "locked";

        if (completedSteps.includes(step.id)) {
            status = "completed";
        } else if (index === 0 || completedSteps.includes(visibleSteps[index - 1].id)) {
            status = "current";
            if (completedSteps.length === 0 && index === 0) status = "start";
        }

        return { ...step, status };
    });

    const handleStepClick = (stepId: string, status: CourseStep["status"]) => {
        if (status !== "locked") {
            router.push(`/courses/${courseId}/${stepId}`);
        }
    };

    return (
        <div
            className="min-h-screen flex justify-center"
            style={{
                background: `linear-gradient(180deg, ${courseConfig.theme.lightBg} 0%, #FFFFFF 100%)`,
            }}
        >
            <div className="flex gap-[24px] pt-[48px] px-[48px] pb-[48px]">
                {/* Sidebar - 224px width */}
                <div className="hidden lg:block shrink-0 w-[224px]">
                    <CourseModuleSidebar />
                </div>

                {/* Main Content - 588px width */}
                <main className="w-[588px] shrink-0">
                    {/* Top Header Card */}
                    <div className="bg-white rounded-[16px] px-[20px] py-[16px] mb-[32px] w-full">
                        <h1 className="text-[18px] font-bold text-[#0F172A] leading-tight mb-[4px]">
                            {courseConfig.sessionTitle}
                        </h1>
                        <p className="text-[16px] text-[#0F172A] font-medium leading-[24px]">
                            {courseConfig.sessionSubtitle}
                        </p>
                    </div>

                    {/* Steps */}
                    <div className="flex flex-col gap-[16px] mb-[32px]">
                        {steps.map((step) => {
                            const isActive = step.status === "current" || step.status === "start";
                            const isCompleted = step.status === "completed";
                            const isLocked = step.status === "locked";

                            // Circle and icon sizes based on status
                            const circleSize = isActive ? 56 : 48;
                            const iconSize = isActive ? 24 : 20;

                            return (
                                <div
                                    key={step.id}
                                    onClick={() => handleStepClick(step.id, step.status)}
                                    className={`relative flex items-center ${isLocked ? "cursor-not-allowed" : "cursor-pointer"
                                        }`}
                                >
                                    {/* Circle with Glow Rings */}
                                    <div className="relative flex items-center justify-center shrink-0" style={{ width: 56, height: 56 }}>
                                        {/* Glow rings only for active */}
                                        {isActive && (
                                            <>
                                                <div
                                                    className="absolute w-[88px] h-[88px] rounded-full border-[1.5px] opacity-[0.15]"
                                                    style={{ borderColor: courseConfig.theme.primaryColor }}
                                                ></div>
                                                <div
                                                    className="absolute w-[72px] h-[72px] rounded-full border-[1.5px] opacity-[0.25]"
                                                    style={{ borderColor: courseConfig.theme.primaryColor }}
                                                ></div>
                                            </>
                                        )}

                                        {/* Circle */}
                                        <div
                                            className={`rounded-full flex items-center justify-center relative ${isActive
                                                ? ""
                                                : isCompleted
                                                    ? ""
                                                    : "bg-white"
                                                }`}
                                            style={{
                                                width: circleSize,
                                                height: circleSize,
                                                backgroundColor: isActive || isCompleted
                                                    ? courseConfig.theme.primaryColor
                                                    : undefined,
                                            }}
                                        >
                                            <div className="relative" style={{ width: iconSize, height: iconSize }}>
                                                <Image
                                                    src={step.icon}
                                                    alt={step.title}
                                                    fill
                                                    className={`object-contain ${isActive || isCompleted
                                                        ? "brightness-0 invert"
                                                        : ""
                                                        }`}
                                                    style={{
                                                        opacity: isLocked ? 0.5 : 1
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Step Title */}
                                    <div
                                        className="flex-1 transition-[margin,font-size] duration-300 ease-out"
                                        style={{ marginLeft: isActive ? 24 : 16 }}
                                    >
                                        <h3 className={`transition-all duration-300 ease-out ${isActive
                                            ? "text-[22px] font-black text-[#1E1E1E]"
                                            : isCompleted
                                                ? "text-[17px] font-semibold text-[#646464]"
                                                : "text-[17px] font-semibold text-[#94A3B8]"
                                            }`}>
                                            {step.title}
                                        </h3>
                                    </div>

                                    {/* Completed Checkmark */}
                                    {isCompleted && (
                                        <div className="w-[24px] h-[24px] rounded-full bg-[#54B741] flex items-center justify-center shrink-0">
                                            <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                                                <path d="M1 5L4.5 8.5L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Bottom Header Card */}
                    <div className="bg-white rounded-[16px] px-[20px] py-[16px] w-full">
                        <h1 className="text-[18px] font-bold text-[#0F172A] leading-tight mb-[4px]">
                            {courseConfig.sessionTitle}
                        </h1>
                        <p className="text-[16px] text-[#0F172A] font-medium leading-[24px]">
                            {courseConfig.sessionSubtitle}
                        </p>
                    </div>
                </main>
            </div>
        </div>
    );
}
