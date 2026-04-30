"use client";
import React from "react";
import { ArrowRight, Check, X } from "lucide-react";
import { CourseTheme } from "@/types";

interface TaskFooterProps {
    onBack?: () => void;
    onAction: () => void;
    actionLabel: string;
    disabled?: boolean;
    showFeedback?: boolean;
    isCorrect?: boolean;
    feedbackTitle?: string;
    feedbackSubtitle?: string;
    maxWidth?: string;
    courseTheme?: CourseTheme;
}

const DEFAULT_THEME: CourseTheme = {
    primaryColor: "#2D68FF",
    gradient: "linear-gradient(180deg, #779DFF 0%, #2D68FF 100%)",
    shadowColor: "rgba(45, 104, 255, 0.22)",
    lightBg: "#E9F2FF",
    bgGradient: "from-[#E9F2FF] via-white to-white"
};

export function TaskFooter({
    onBack,
    onAction,
    actionLabel,
    disabled = false,
    showFeedback = false,
    isCorrect = false,
    feedbackTitle,
    feedbackSubtitle,
    maxWidth = "1200px",
    courseTheme = DEFAULT_THEME,
}: TaskFooterProps) {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 py-6 px-6 flex items-center justify-center z-50">
            <div
                className={`w-full flex items-center gap-4 ${showFeedback ? "justify-between" : "justify-end"}`}
                style={{ maxWidth }}
            >
                {showFeedback && (
                    <div className="flex-1 flex items-center gap-3 animate-slide-up">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isCorrect ? "bg-[#58BB44]" : "bg-[#FF2C2C]"}`}>
                            {isCorrect ? (
                                <Check size={24} className="text-white" strokeWidth={3} />
                            ) : (
                                <X size={24} className="text-white" strokeWidth={3} />
                            )}
                        </div>
                        <div className="flex flex-col">
                            <p className={`text-[16px] font-bold leading-tight ${isCorrect ? "text-[#58BB44]" : "text-[#FF2C2C]"}`}>
                                {feedbackTitle || (isCorrect ? "Excellent!" : "Not quite")}
                            </p>
                            {feedbackSubtitle && (
                                <p className={`text-[14px] font-medium mt-0.5 ${isCorrect ? "text-[#58BB44]/80" : "text-[#FF2C2C]/80"}`}>
                                    {feedbackSubtitle}
                                </p>
                            )}
                        </div>
                    </div>
                )}

                <div className="flex items-center gap-3">
                    {onBack && !showFeedback && (
                        <button
                            onClick={onBack}
                            className="text-[#0F172A] font-bold text-[16px] px-6 py-3 hover:bg-slate-50 rounded-xl transition-colors"
                        >
                            Back
                        </button>
                    )}

                    <button
                        onClick={onAction}
                        disabled={disabled}
                        className={`
                            h-12 px-8 rounded-2xl font-bold text-[18px] transition-all flex items-center justify-center gap-2 active:scale-95 group whitespace-nowrap
                            ${disabled
                                ? "bg-[#F1F5F9] text-[#CBD5E1] cursor-not-allowed shadow-none"
                                : `text-white border-b-[2.5px] border-black/10 hover:brightness-105`
                            }
                        `}
                        style={{
                            background: disabled
                                ? ""
                                : showFeedback && !isCorrect
                                    ? "linear-gradient(180deg, #FF5757 0%, #FF2C2C 100%)"
                                    : courseTheme.gradient,
                            boxShadow: disabled
                                ? "none"
                                : showFeedback && !isCorrect
                                    ? "0 8px 20px rgba(244,63,94,0.22)"
                                    : `0 8px 20px ${courseTheme.shadowColor}`
                        }}
                    >
                        {actionLabel}
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
                    </button>
                </div>
            </div>
        </div>
    );
}
