"use client";
import React, { useState } from "react";
import Image from "next/image";
import { CourseTheme, PresentationStep } from "@/types";
import { TaskHeader, TaskFooter } from "../shared";

interface TaskPresentationProps {
    steps: PresentationStep[];
    onFinish?: () => void;
    onBack?: () => void;
    courseTheme?: CourseTheme;
    progress?: number;
    segments?: { total: number; active: number };
    segmentOffset?: number;
    hideCompleteScreen?: boolean;
}

export function TaskPresentation({
    onFinish = () => { },
    steps = [],
    courseTheme = {
        primaryColor: "#2D68FF",
        gradient: "linear-gradient(180deg, #779DFF 0%, #2D68FF 100%)",
        shadowColor: "rgba(45, 104, 255, 0.4)",
        lightBg: "#E9F2FF",
        bgGradient: "from-[#E9F2FF] via-white to-white"
    },
    onBack,
    progress,
    segments: propsSegments,
    segmentOffset = 0,
    hideCompleteScreen = false
}: TaskPresentationProps) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [showComplete, setShowComplete] = useState(false);

    if (steps.length === 0) return null;

    const currentStep = steps[currentStepIndex];
    const totalSegments = steps.length + segmentOffset;
    const activeSegments = currentStepIndex + 1 + segmentOffset;

    const handleNext = () => {
        if (currentStepIndex < steps.length - 1) {
            setCurrentStepIndex(currentStepIndex + 1);
        } else if (!showComplete && !hideCompleteScreen) {
            setShowComplete(true);
        } else {
            onFinish();
        }
    };

    const handleBack = () => {
        if (showComplete) {
            setShowComplete(false);
        } else if (currentStepIndex > 0) {
            setCurrentStepIndex(currentStepIndex - 1);
        } else if (onBack) {
            onBack();
        }
    };

    return (
        <div className={`w-full min-h-screen flex flex-col bg-gradient-to-br ${courseTheme.bgGradient} font-(family-name:--font-urbanist)`}>
            
            <TaskHeader
                onClose={onBack || handleBack}
                progress={progress}
                segments={propsSegments || (progress === undefined ? { total: totalSegments, active: activeSegments } : undefined)}
                variant="step"
                courseTheme={courseTheme}
            />

            {/* Content Area - Figma Specs */}
            <div className={`flex-1 flex flex-col items-center justify-center ${showComplete ? "pt-0" : "pt-[80px]"} pb-40`}>
                {showComplete ? (
                    <div className="flex flex-col items-center w-full max-w-[600px] animate-scale-in">
                        <div className="relative w-[440px] h-[440px]">
                            <Image 
                                src="/presantition-complate-image.svg" 
                                alt="Success" 
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                        <div
                            className="inline-flex items-center justify-center rounded-full text-[14px] font-bold z-20 mb-[38px] px-6 py-[9px] border-[1.2px] tracking-tight mt-[-153px]"
                            style={{
                                color: courseTheme.primaryColor,
                                backgroundColor: courseTheme.lightBg,
                                borderColor: `${courseTheme.primaryColor}33`
                            }}
                        >
                            Great job on completing!
                        </div>
                        <h2 className="text-[32px] font-bold text-[#0F172A] text-center leading-tight tracking-tight">
                            Section completed
                        </h2>
                    </div>
                ) : (
                    <div className="content-container flex flex-col items-center gap-10 animate-scale-in">
                        {/* Centered Title */}
                        {currentStep.title && (
                            <div className="text-center">
                                <h1 className="text-[32px] font-bold text-[#0F172A] leading-tight tracking-tight">
                                    {currentStep.title}
                                </h1>
                            </div>
                        )}

                        {/* Centered Image/Visual */}
                        {currentStep.image && (
                            <div className="w-full max-w-[500px] aspect-video relative rounded-3xl overflow-hidden shadow-2xl">
                                <Image
                                    src={currentStep.image}
                                    alt={currentStep.title || "Lesson illustration"}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}

                        {/* Content Card / Blocks */}
                        {currentStep.content && (
                            <div className="bg-white rounded-[32px] p-10 w-full max-w-[600px] shadow-[0_8px_40px_rgba(0,0,0,0.04)] text-center border border-slate-50">
                                <p className="text-[18px] text-slate-500 leading-relaxed font-medium">
                                    {currentStep.content}
                                </p>
                            </div>
                        )}

                        {currentStep.contentBlocks && (
                            <div className="flex flex-col gap-6 w-full max-w-[600px]">
                                {currentStep.contentBlocks.map((block, idx) => (
                                    <div key={idx} className="bg-white rounded-[24px] px-8 py-6 shadow-[0_8px_32px_rgba(0,0,0,0.04)] text-center border border-slate-50 animate-slide-up" style={{ animationDelay: `${idx * 100}ms` }}>
                                        <p className="text-[16px] text-[#475569] leading-relaxed font-medium">
                                            {block}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            <TaskFooter
                onBack={handleBack}
                onAction={handleNext}
                actionLabel={showComplete ? "Continue" : (currentStepIndex === steps.length - 1 ? "Complete" : "Next")}
                courseTheme={courseTheme}
            />
        </div>
    );
}
