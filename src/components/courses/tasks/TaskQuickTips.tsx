"use client";
import { useState } from "react";
import { CourseTheme, PresentationStep } from "@/types";
import { TaskHeader, TaskFooter } from "../shared";

interface TaskQuickTipsProps {
    steps: PresentationStep[];
    onFinish?: () => void;
    onBack?: () => void;
    courseTheme?: CourseTheme;
}

export function TaskQuickTips({
    steps,
    onFinish = () => { },
    onBack,
    courseTheme = {
        primaryColor: "#2D68FF",
        gradient: "linear-gradient(180deg, #779DFF 0%, #2D68FF 100%)",
        shadowColor: "rgba(45, 104, 255, 0.4)",
        lightBg: "#E9F2FF",
        bgGradient: "from-[#E9F2FF] via-white to-white"
    }
}: TaskQuickTipsProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!steps || steps.length === 0) return null;

    const total = steps.length;

    const handleNext = () => {
        if (currentIndex < total - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            onFinish();
        }
    };

    const handleBack = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        } else if (onBack) {
            onBack();
        }
    };

    return (
        <div className={`w-full min-h-screen flex flex-col bg-gradient-to-br ${courseTheme.bgGradient} font-(family-name:--font-urbanist)`}>
            <TaskHeader
                onClose={onBack || handleBack}
                showProgressBar={false}
                courseTheme={courseTheme}
            />

            <div className="flex-1 flex flex-col items-center pt-24 pb-40 px-6">
                <div className="h-20 mb-10 flex items-center justify-center shrink-0">
                    <span className="text-[28px] font-bold tracking-tight text-[#0F172A]">
                        Tips:
                    </span>
                </div>

                <div className="relative w-full max-w-[600px] flex-1 flex items-center justify-center">
                    <div className="relative w-full h-full flex items-center justify-center" style={{ minHeight: 320 }}>
                        {steps.map((step, idx) => {
                            const offset = idx - currentIndex;
                            const isActive = offset === 0;
                            const isPast = offset < 0;
                            const isFuture = offset > 0;

                            const distance = Math.abs(offset);
                            const translateY = isPast
                                ? -(160 + (distance - 1) * 80)
                                : isFuture
                                    ? 260 + (distance - 1) * 40
                                    : 0;
                            const scale = isActive ? 1 : Math.max(0.82, 1 - distance * 0.07);
                            const opacity = isActive
                                ? 1
                                : isPast
                                    ? distance === 1
                                        ? 0.3
                                        : 0
                                    : 0;
                            const zIndex = total - distance;

                            return (
                                <div
                                    key={step.id ?? idx}
                                    aria-hidden={!isActive}
                                    className="absolute inset-x-0 top-1/2 transition-all duration-500 ease-out"
                                    style={{
                                        transform: `translateY(calc(-50% + ${translateY}px)) scale(${scale})`,
                                        transformOrigin: "center top",
                                        opacity,
                                        zIndex,
                                        pointerEvents: isActive ? "auto" : "none"
                                    }}
                                >
                                    <TipCard step={step} courseTheme={courseTheme} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <TaskFooter
                onBack={handleBack}
                onAction={handleNext}
                actionLabel={currentIndex === total - 1 ? "Continue" : "Next"}
                courseTheme={courseTheme}
            />
        </div>
    );
}

function TipCard({ step, courseTheme }: { step: PresentationStep; courseTheme: CourseTheme }) {
    const blocks = step.contentBlocks && step.contentBlocks.length > 0
        ? step.contentBlocks
        : step.content
            ? [step.content]
            : [];

    return (
        <div className="flex flex-col gap-4 w-full">
            {step.title && (
                <span
                    className="text-[14px] font-bold tracking-wide self-start"
                    style={{ color: courseTheme.primaryColor }}
                >
                    {step.title}
                </span>
            )}
            <div className="flex flex-col gap-3">
                {blocks.map((block, i) => (
                    <div
                        key={i}
                        className="bg-white rounded-[20px] px-7 py-5 border border-slate-100 shadow-[0_8px_24px_rgba(0,0,0,0.04)]"
                    >
                        <p className="text-[16px] text-[#475569] leading-relaxed font-medium">
                            {block}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
