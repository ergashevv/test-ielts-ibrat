"use client";
import { useEffect, useMemo, useState } from "react";
import { CourseTheme, MatchPair, TaskMatchingMetadata } from "@/types";
import { TaskHeader, TaskFooter } from "../shared";

interface TaskMatchingProps {
    instruction?: string;
    pairs?: MatchPair[];
    task?: {
        id: string;
        title: string;
        type: string;
        metadata: TaskMatchingMetadata;
    };
    onNext?: () => void;
    onBack?: () => void;
    onFinish?: () => void;
    courseTheme?: CourseTheme;
    segments?: { total: number; active: number };
    progress?: number;
}

const DEFAULT_THEME: CourseTheme = {
    primaryColor: "#FF5C35",
    gradient: "linear-gradient(180deg, #FF8D70 0%, #FF5C35 100%)",
    shadowColor: "rgba(255, 92, 53, 0.4)",
    lightBg: "#FFF5F3",
    bgGradient: "from-[#FFF5F3] via-white to-white"
};

const FLASH_DURATION = 700;

type FlashState = { left: string; right: string; correct: boolean } | null;

export function TaskMatching({
    instruction = "Match each word with its definition",
    pairs: pairsProp,
    task,
    onNext = () => { },
    onBack = () => { },
    onFinish,
    courseTheme = DEFAULT_THEME,
    segments,
    progress = 12
}: TaskMatchingProps) {
    const pairs: MatchPair[] = useMemo(
        () => pairsProp ?? task?.metadata?.pairs ?? [],
        [pairsProp, task?.metadata?.pairs]
    );

    const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
    const [matchedLeft, setMatchedLeft] = useState<Set<string>>(new Set());
    const [matchedRight, setMatchedRight] = useState<Set<string>>(new Set());
    const [correctCount, setCorrectCount] = useState(0);
    const [flash, setFlash] = useState<FlashState>(null);
    const [rightItems, setRightItems] = useState<{ id: string; text: string; label: string }[]>([]);

    useEffect(() => {
        const shuffled = [...pairs.map((p, idx) => ({
            id: p.id,
            text: p.right,
            label: String.fromCharCode(65 + idx)
        }))].sort(() => Math.random() - 0.5);
        setRightItems(shuffled);
        setSelectedLeft(null);
        setMatchedLeft(new Set());
        setMatchedRight(new Set());
        setCorrectCount(0);
        setFlash(null);
    }, [pairs]);

    if (pairs.length === 0) {
        return <div className="p-8 text-center text-slate-500">No matching pairs available</div>;
    }

    const allDone = matchedLeft.size === pairs.length;
    const allCorrect = correctCount === pairs.length;

    const handleLeftClick = (id: string) => {
        if (flash) return;
        if (matchedLeft.has(id)) return;
        setSelectedLeft(id);
    };

    const handleRightClick = (rightId: string) => {
        if (flash) return;
        if (matchedRight.has(rightId)) return;
        if (!selectedLeft) return;

        const correct = selectedLeft === rightId;
        const flashLeft = selectedLeft;
        setFlash({ left: flashLeft, right: rightId, correct });

        setTimeout(() => {
            setMatchedLeft((prev) => {
                const next = new Set(prev);
                next.add(flashLeft);
                return next;
            });
            setMatchedRight((prev) => {
                const next = new Set(prev);
                next.add(rightId);
                return next;
            });
            if (correct) setCorrectCount((c) => c + 1);
            setFlash(null);
            setSelectedLeft(null);
        }, FLASH_DURATION);
    };

    const isLeftFlashing = (id: string) => flash !== null && flash.left === id;
    const isRightFlashing = (id: string) => flash !== null && flash.right === id;

    const handleContinue = () => {
        if (onFinish) onFinish();
        else onNext();
    };

    const renderRow = (
        side: "left" | "right",
        item: { id: string; text: string; label: string },
        isFocused: boolean,
        isMatched: boolean,
        flashing: boolean,
        flashCorrect: boolean | undefined
    ) => {
        const baseClasses = "w-full px-5 py-4 rounded-[14px] border text-left text-[15px] font-medium transition-all duration-200 flex items-center gap-2";

        let stateClasses = "";
        let inlineStyle: React.CSSProperties = {};

        if (flashing) {
            stateClasses = flashCorrect
                ? "border-[#22C55E] bg-[#F0FDF4] text-[#166534]"
                : "border-[#EF4444] bg-[#FEF2F2] text-[#991B1B]";
        } else if (isMatched) {
            stateClasses = "border-slate-100 bg-white text-slate-300 cursor-default";
        } else if (isFocused) {
            stateClasses = "bg-white";
            inlineStyle = {
                borderColor: courseTheme.primaryColor,
                color: courseTheme.primaryColor,
                boxShadow: `0 0 0 1px ${courseTheme.primaryColor}`
            };
        } else {
            stateClasses = "border-slate-200 bg-white text-[#0F172A] hover:border-slate-300 cursor-pointer";
        }

        const onClick = side === "left"
            ? () => handleLeftClick(item.id)
            : () => handleRightClick(item.id);

        return (
            <button
                key={item.id}
                type="button"
                onClick={onClick}
                disabled={isMatched || flashing}
                className={`${baseClasses} ${stateClasses}`}
                style={inlineStyle}
            >
                <span className="shrink-0">{item.label}.</span>
                <span className="truncate">{item.text}</span>
            </button>
        );
    };

    return (
        <div className={`w-full min-h-screen flex flex-col bg-gradient-to-br ${courseTheme.bgGradient} font-(family-name:--font-urbanist)`}>
            <TaskHeader
                onClose={onBack}
                progress={segments ? undefined : progress}
                segments={segments}
                courseTheme={courseTheme}
            />

            <div className="flex-1 flex flex-col items-center px-6 pt-8 pb-32">
                <div className="w-full max-w-[680px] flex flex-col gap-8">
                    <h2 className="text-[18px] font-bold text-[#0F172A] text-center">
                        {instruction}
                    </h2>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="flex flex-col gap-3">
                            <p className="text-[14px] font-semibold text-[#0F172A] mb-1">Words</p>
                            {pairs.map((p, idx) => {
                                const item = { id: p.id, text: p.left, label: String(idx + 1) };
                                return renderRow(
                                    "left",
                                    item,
                                    selectedLeft === item.id,
                                    matchedLeft.has(item.id),
                                    isLeftFlashing(item.id),
                                    flash?.correct
                                );
                            })}
                        </div>

                        <div className="flex flex-col gap-3">
                            <p className="text-[14px] font-semibold text-[#0F172A] mb-1">Definition</p>
                            {rightItems.map((item) =>
                                renderRow(
                                    "right",
                                    item,
                                    false,
                                    matchedRight.has(item.id),
                                    isRightFlashing(item.id),
                                    flash?.correct
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <TaskFooter
                onBack={onBack}
                onAction={handleContinue}
                actionLabel="Continue"
                disabled={!allDone}
                showFeedback={allDone}
                isCorrect={allCorrect}
                feedbackTitle={allCorrect ? "Excellent" : `${correctCount}/${pairs.length} correct`}
                courseTheme={courseTheme}
            />
        </div>
    );
}
