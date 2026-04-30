"use client";
import React, { useMemo, useState } from "react";
import { CourseTheme } from "@/types";
import { TaskHeader, TaskFooter } from "../shared";

interface TaskDragFillProps {
    onFinish?: () => void;
    onBack?: () => void;
    onClose?: () => void;
    instruction?: string;
    template?: string;
    answers?: string[];
    distractors?: string[];
    feedbackTitle?: string;
    feedbackSubtitle?: string;
    courseTheme?: CourseTheme;
    progress?: number;
    segments?: { total: number; active: number };
}

const DEFAULT_THEME: CourseTheme = {
    primaryColor: "#54B741",
    gradient: "linear-gradient(180deg, #71CC5E 0%, #54B741 100%)",
    shadowColor: "rgba(84, 183, 65, 0.4)",
    lightBg: "#F0F9F0",
    bgGradient: "from-[#F0F9F0] via-white to-white"
};

function shuffle<T>(arr: T[]): T[] {
    const out = [...arr];
    for (let i = out.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
}

export function TaskDragFill({
    onFinish = () => { },
    onBack = () => { },
    onClose,
    instruction = "Drag the correct phrases to complete the overview.",
    template = "",
    answers = [],
    distractors = [],
    feedbackTitle = "Excellent!",
    feedbackSubtitle = "All blanks filled correctly.",
    courseTheme = DEFAULT_THEME,
    progress,
    segments
}: TaskDragFillProps) {
    const blanks = useMemo(() => template.split("___"), [template]);
    const expectedCount = Math.max(blanks.length - 1, 0);

    const initialChips = useMemo(
        () => shuffle([...answers, ...distractors]).map((word, i) => ({ id: `chip-${i}`, word })),
        [answers, distractors]
    );

    const [filled, setFilled] = useState<Array<string | null>>(
        () => Array(expectedCount).fill(null)
    );
    const [usedChipIds, setUsedChipIds] = useState<Record<string, boolean>>({});
    const [showFeedback, setShowFeedback] = useState(false);

    const allFilled = filled.every((f) => f !== null);
    const isCorrect = filled.every((word, idx) => word === answers[idx]);

    const placeChip = (chip: { id: string; word: string }) => {
        if (showFeedback) return;
        const nextBlank = filled.findIndex((f) => f === null);
        if (nextBlank === -1) return;
        const updated = [...filled];
        updated[nextBlank] = chip.word;
        setFilled(updated);
        setUsedChipIds((prev) => ({ ...prev, [chip.id]: true }));
    };

    const clearBlank = (idx: number) => {
        if (showFeedback) return;
        const word = filled[idx];
        if (!word) return;
        const updated = [...filled];
        updated[idx] = null;
        setFilled(updated);
        const chip = initialChips.find((c) => c.word === word && usedChipIds[c.id]);
        if (chip) {
            setUsedChipIds((prev) => {
                const next = { ...prev };
                delete next[chip.id];
                return next;
            });
        }
    };

    const handleCheck = () => setShowFeedback(true);
    const handleContinue = () => onFinish();

    return (
        <div className={`w-full min-h-screen flex flex-col bg-gradient-to-br ${courseTheme.bgGradient} font-(family-name:--font-urbanist)`}>
            <TaskHeader
                onClose={onClose || onBack}
                progress={progress}
                segments={segments}
                courseTheme={courseTheme}
            />

            <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-6 pb-40">
                <div className="w-full max-w-[680px] flex flex-col gap-8 animate-scale-in">
                    <h2 className="text-[20px] font-bold text-[#0F172A] tracking-tight text-center">
                        {instruction}
                    </h2>

                    <div className="text-[16px] leading-[2.4] text-[#0F172A] text-center font-medium">
                        {blanks.map((segment, i) => {
                            const blankIdx = i;
                            const isLast = i === blanks.length - 1;
                            const filledWord = filled[blankIdx];
                            const isWrong = showFeedback && filledWord !== null && filledWord !== answers[blankIdx];
                            const isRight = showFeedback && filledWord !== null && filledWord === answers[blankIdx];
                            return (
                                <React.Fragment key={i}>
                                    <span>{segment}</span>
                                    {!isLast && (
                                        <button
                                            type="button"
                                            onClick={() => clearBlank(blankIdx)}
                                            disabled={showFeedback}
                                            className={`
                                                inline-flex items-center justify-center align-middle
                                                min-w-[110px] h-[34px] px-3 mx-1 rounded-[10px] text-[14px] font-semibold transition-colors
                                                ${filledWord
                                                    ? isWrong
                                                        ? "bg-[#FEE2E2] border border-[#FCA5A5] text-[#B91C1C]"
                                                        : isRight
                                                            ? "bg-[#DCFCE7] border border-[#86EFAC] text-[#166534]"
                                                            : "bg-white border border-[#CBD5E1] text-[#0F172A] hover:border-[#94A3B8]"
                                                    : "bg-[#F1F5F9] border border-[#E2E8F0] text-[#94A3B8]"
                                                }
                                            `}
                                        >
                                            {filledWord || ""}
                                        </button>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                        {initialChips.map((chip) => {
                            const used = usedChipIds[chip.id];
                            return (
                                <button
                                    key={chip.id}
                                    type="button"
                                    onClick={() => placeChip(chip)}
                                    disabled={used || showFeedback}
                                    className={`
                                        h-[34px] px-4 rounded-full text-[14px] font-semibold transition-all
                                        ${used
                                            ? "bg-[#F1F5F9] border border-[#E2E8F0] text-[#CBD5E1] cursor-not-allowed"
                                            : "bg-white border border-[#CBD5E1] text-[#0F172A] shadow-sm hover:border-[#94A3B8] active:scale-95"
                                        }
                                    `}
                                >
                                    {chip.word}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            <TaskFooter
                onBack={onBack}
                onAction={showFeedback ? handleContinue : handleCheck}
                actionLabel={showFeedback ? "Continue" : "Check"}
                disabled={!allFilled}
                showFeedback={showFeedback}
                isCorrect={isCorrect}
                feedbackTitle={feedbackTitle}
                feedbackSubtitle={isCorrect ? feedbackSubtitle : "Some answers don't match. Review the highlighted blanks."}
                courseTheme={courseTheme}
            />
        </div>
    );
}
