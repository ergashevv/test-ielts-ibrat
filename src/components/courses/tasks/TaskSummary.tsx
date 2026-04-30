"use client";
import React, { useState } from "react";
import { Lightbulb } from "lucide-react";
import { CourseTheme } from "@/types";
import { TaskHeader, TaskFooter } from "../shared";

export interface SummaryPoint {
    id: string;
    title: string;
    description: string;
    icon?: string;
}

interface TaskSummaryProps {
    onFinish?: () => void;
    onBack?: () => void;
    steps?: SummaryPoint[];
    courseTheme?: CourseTheme;
}

export function TaskSummary({
    onFinish = () => { },
    onBack = () => { },
    steps = [],
    courseTheme = {
        primaryColor: "#2D68FF",
        gradient: "linear-gradient(180deg, #779DFF 0%, #2D68FF 100%)",
        shadowColor: "rgba(45, 104, 255, 0.4)",
        lightBg: "#E9F2FF",
        bgGradient: "from-[#E9F2FF] via-white to-white"
    }
}: TaskSummaryProps) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    if (!steps || steps.length === 0) {
        return <div className="p-8 text-center text-slate-500">No summary points available</div>;
    }

    const currentStep = steps[currentStepIndex];

    const handleNext = () => {
        if (currentStepIndex < steps.length - 1) {
            setCurrentStepIndex(currentStepIndex + 1);
        } else {
            onFinish();
        }
    };

    const handlePrevious = () => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex(currentStepIndex - 1);
        } else {
            onBack();
        }
    };

    return (
        <div className={`w-full min-h-screen flex flex-col bg-gradient-to-br ${courseTheme.bgGradient} font-(family-name:--font-urbanist)`}>
            
            <TaskHeader
                onClose={onBack}
                segments={{ total: steps.length, active: currentStepIndex + 1 }}
                variant="step"
                courseTheme={courseTheme}
            />

            <div className="flex-1 flex flex-col items-center justify-center px-8 pb-32">
                <div className="w-full max-w-[800px] bg-white rounded-[32px] p-12 shadow-[0_32px_80px_-16px_rgba(15,23,42,0.12)] border border-slate-50 animate-scale-in">
                    <div className="flex items-center gap-3 mb-6">
                        <div
                            className="size-14 rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: courseTheme.lightBg }}
                        >
                            {currentStep.icon ? (
                                <img src={currentStep.icon} alt={currentStep.title} className="w-7 h-7" />
                            ) : (
                                <Lightbulb size={28} style={{ color: courseTheme.primaryColor }} strokeWidth={2.5} />
                            )}
                        </div>
                        <p className="text-sm font-bold uppercase tracking-wide" style={{ color: courseTheme.primaryColor }}>
                            Key Point {currentStepIndex + 1}
                        </p>
                    </div>

                    <h2 className="text-[32px] font-black text-[#0F172A] tracking-tight mb-6">
                        {currentStep.title}
                    </h2>

                    <p className="text-[17px] text-slate-700 leading-relaxed whitespace-pre-line">
                        {currentStep.description}
                    </p>
                </div>
            </div>

            <TaskFooter
                onBack={handlePrevious}
                onAction={handleNext}
                actionLabel={currentStepIndex === steps.length - 1 ? "Finish" : "Next"}
                courseTheme={courseTheme}
            />
        </div>
    );
}
