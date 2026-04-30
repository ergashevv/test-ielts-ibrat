"use client";
import React from "react";
import Image from "next/image";
import { CourseTheme } from "@/types";
import { TaskHeader, TaskFooter } from "../shared";

interface LearningPoint {
    icon: string;
    iconColor?: string;
    title: string;
    description: string;
}

interface TaskIntroProps {
    onNext?: () => void;
    onBack?: () => void;
    title?: string;
    content?: string;
    buttonLabel?: string;
    showOutcomes?: boolean;
    learningPoints?: LearningPoint[];
    courseTheme?: CourseTheme;
    outcomesTitle?: string;
    outcomesSubtitle?: string;
    centerIcon?: string;
    hideIcon?: boolean;
    badge?: string;
    progress?: number;
    segments?: { total: number; active: number };
}

export function TaskIntro({
    onNext = () => { },
    onBack = () => { },
    title = "Welcome",
    content = "Let's get started!",
    buttonLabel = "Start The Session",
    showOutcomes = false,
    learningPoints = [],
    courseTheme = {
        primaryColor: "#2D68FF",
        gradient: "linear-gradient(180deg, #779DFF 0%, #2D68FF 100%)",
        shadowColor: "rgba(45, 104, 255, 0.4)",
        lightBg: "#E9F2FF",
        bgGradient: "from-[#E9F2FF] via-white to-white"
    },
    outcomesTitle = "Learning outcomes",
    outcomesSubtitle = "By the end of this session, you will be able to ...",
    centerIcon = "/icons/lesson-steps/lead-in-icon.svg",
    hideIcon = false,
    badge,
    progress,
    segments
}: TaskIntroProps) {
    
    // Learning Outcomes View (Figma Screen 1)
    if (showOutcomes && learningPoints.length > 0) {
        return (
            <div className={`w-full min-h-screen flex flex-col bg-gradient-to-br ${courseTheme.bgGradient} font-(family-name:--font-urbanist)`}>
                <TaskHeader
                    onClose={onBack}
                    title={outcomesTitle}
                    courseTheme={courseTheme}
                />

                <div className="flex-1 flex flex-col items-center w-full px-4 pt-8 pb-24">
                    <div className="w-[536px]">
                        <h2 className="text-[18px] font-normal text-[#64748B] mb-10 text-left">
                            {outcomesSubtitle}
                        </h2>
                    </div>

                    <div className="relative flex flex-col gap-6 w-[536px]">
                        <div className="absolute left-[42px] top-[50px] bottom-[50px] w-[2px] border-l-2 border-dashed border-slate-300 z-0" />

                        {learningPoints.map((point, index) => {
                            const bgColor = point.iconColor || (index === 0 ? "#3B82F6" : index === 1 ? "#22C55E" : "#F97316");
                            const ringColor = index === 0 ? "rgba(59, 130, 246, 0.2)" : index === 1 ? "rgba(34, 197, 94, 0.2)" : "rgba(249, 115, 22, 0.2)";
                            const arrowColor = index === 0 ? "#3B82F6" : index === 1 ? "#22C55E" : "#F97316";

                            return (
                                <div key={index} className="relative flex items-start gap-6 z-10">
                                    <div className="relative shrink-0">
                                        <div className="absolute inset-0 w-[84px] h-[84px] rounded-full" style={{ backgroundColor: ringColor }} />
                                        <div className="absolute inset-[8px] w-[68px] h-[68px] rounded-full" style={{ backgroundColor: ringColor, opacity: 0.6 }} />
                                        <div className="relative w-[84px] h-[84px] flex items-center justify-center">
                                            <div className="w-[52px] h-[52px] rounded-full flex items-center justify-center text-white text-[24px] font-bold shadow-lg" style={{ backgroundColor: bgColor }}>
                                                {point.icon}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-1 bg-white rounded-[16px] px-6 py-5 shadow-sm border border-slate-100 relative mt-3">
                                        <div className="absolute top-5 right-5 w-3 h-3 border-t-[2.5px] border-r-[2.5px] rounded-tr-[8px]" style={{ borderColor: arrowColor }} />
                                        <h3 className="text-[16px] font-bold text-[#0F172A] mb-1.5">{point.title}</h3>
                                        <p className="text-[14px] text-[#94A3B8] leading-relaxed">{point.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <TaskFooter
                    onBack={onBack}
                    onAction={onNext}
                    actionLabel={buttonLabel}
                    courseTheme={courseTheme}
                />
            </div>
        );
    }

    // Default Intro View
    const showHeader = segments !== undefined || progress !== undefined;
    return (
        <div className={`w-full min-h-screen flex flex-col bg-gradient-to-br ${courseTheme.bgGradient} font-(family-name:--font-urbanist)`}>
            {showHeader && (
                <TaskHeader
                    onClose={onBack}
                    progress={progress}
                    segments={segments}
                    variant="step"
                    courseTheme={courseTheme}
                />
            )}
            <div className="flex-1 flex flex-col items-center justify-center w-full px-6 pb-32 pt-12 gap-12">
                {!hideIcon && (
                    <div className="relative w-[180px] h-[180px] flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full border-[1.5px]" style={{ borderColor: courseTheme.primaryColor, opacity: 0.1 }} />
                        <div className="absolute inset-4 rounded-full border-[1.5px]" style={{ borderColor: courseTheme.primaryColor, opacity: 0.2 }} />
                        <div className="absolute inset-8 rounded-full border-[1.5px]" style={{ borderColor: courseTheme.primaryColor, opacity: 0.3 }} />
                        <div className="absolute inset-0 rounded-full animate-[pulse_3s_ease-in-out_infinite]" style={{ backgroundColor: courseTheme.primaryColor, opacity: 0.05 }} />

                        <div
                            className="relative w-[110px] h-[110px] rounded-full flex items-center justify-center shadow-2xl z-10 border-[5px] border-white"
                            style={{
                                backgroundColor: courseTheme.primaryColor,
                                boxShadow: `0 25px 50px -12px ${courseTheme.shadowColor}`
                            }}
                        >
                            <div className="relative w-[52px] h-[52px]">
                                <Image
                                    src={centerIcon}
                                    alt="Icon"
                                    fill
                                    className="object-contain invert brightness-0"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                )}

                {hideIcon && title && (
                    <h1 className="text-[36px] font-bold text-[#0F172A] tracking-tight text-center">
                        {title}
                    </h1>
                )}

                <div className="bg-white rounded-[32px] p-10 w-full max-w-[600px] shadow-[0_8px_40px_rgba(0,0,0,0.04)] text-center flex flex-col items-center gap-4 border border-slate-50 animate-scale-in">
                    {badge && (
                        <div
                            className="inline-flex items-center justify-center rounded-full text-[14px] font-bold mb-2 px-4 py-2 border-[1.5px]"
                            style={{
                                color: courseTheme.primaryColor,
                                backgroundColor: courseTheme.lightBg,
                                borderColor: `${courseTheme.primaryColor}33`
                            }}
                        >
                            {badge}
                        </div>
                    )}
                    {!hideIcon && (
                        <h2 className="text-[32px] font-bold text-[#0F172A] tracking-tight">{title}</h2>
                    )}
                    <p className="text-[18px] text-slate-500 leading-relaxed font-medium whitespace-pre-line">
                        {content}
                    </p>
                </div>
            </div>

            <TaskFooter
                onBack={onBack}
                onAction={onNext}
                actionLabel={buttonLabel}
                courseTheme={courseTheme}
            />
        </div>
    );
}
