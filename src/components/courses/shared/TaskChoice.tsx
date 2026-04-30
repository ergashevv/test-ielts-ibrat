"use client";
import React from "react";
import { Check, X } from "lucide-react";
import { CourseTheme } from "@/types";

interface TaskChoiceProps {
    label: string;
    isSelected: boolean;
    isCorrect?: boolean | null;
    showFeedback?: boolean;
    onClick: () => void;
    disabled?: boolean;
    className?: string;
    courseTheme?: CourseTheme;
}

const DEFAULT_PRIMARY = "#3B82F6";

export function TaskChoice({
    label,
    isSelected,
    isCorrect = null,
    showFeedback = false,
    onClick,
    disabled = false,
    className = "",
    courseTheme,
}: TaskChoiceProps) {
    const isFinalCorrect = showFeedback && isCorrect === true;
    const isFinalWrong = showFeedback && isSelected && isCorrect === false;

    const themePrimary = courseTheme?.primaryColor || DEFAULT_PRIMARY;
    const themeBg = courseTheme?.lightBg || "#F0F6FF";

    const baseClasses = "border-slate-100 bg-white text-[#475569] shadow-[0_4px_16px_rgba(0,0,0,0.04)]";
    const correctClasses = "border-green-500 bg-green-50 text-green-900 shadow-none";
    const wrongClasses = "border-red-500 bg-red-50 text-red-900 shadow-none";

    let stateClasses = baseClasses;
    let inlineStyle: React.CSSProperties | undefined;

    if (showFeedback) {
        if (isCorrect === true) stateClasses = correctClasses;
        else if (isSelected && isCorrect === false) stateClasses = wrongClasses;
    } else if (isSelected) {
        stateClasses = "shadow-none";
        inlineStyle = {
            borderColor: themePrimary,
            backgroundColor: themeBg,
            color: themePrimary
        };
    }

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`w-full p-4 rounded-[16px] border-2 transition-all text-left font-medium text-[16px] flex items-center gap-4 group ${stateClasses} ${
                !showFeedback ? "hover:scale-[1.01] active:scale-[0.99]" : ""
            } ${disabled ? "cursor-default" : "cursor-pointer"} ${className}`}
            style={inlineStyle}
        >
            {/* Radio Circle - Figma Styled */}
            <div
                className={`w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center shrink-0 transition-all ${
                    isFinalCorrect
                        ? "border-green-500 bg-white"
                        : isFinalWrong
                        ? "border-red-500 bg-white"
                        : isSelected
                        ? "bg-white"
                        : "border-[#CBD5E1] bg-white"
                }`}
                style={!isFinalCorrect && !isFinalWrong && isSelected ? { borderColor: themePrimary } : undefined}
            >
                {(isSelected || isFinalCorrect) && (
                    <div
                        className={`w-2.5 h-2.5 rounded-full ${
                            isFinalCorrect ? "bg-green-500" : isFinalWrong ? "bg-red-500" : ""
                        }`}
                        style={!isFinalCorrect && !isFinalWrong ? { backgroundColor: themePrimary } : undefined}
                    />
                )}
            </div>

            <span className="flex-1">{label}</span>

            {isFinalCorrect && (
                <Check size={20} className="text-green-600 shrink-0" strokeWidth={3} />
            )}
            {isFinalWrong && (
                <X size={20} className="text-red-600 shrink-0" strokeWidth={3} />
            )}
        </button>
    );
}
