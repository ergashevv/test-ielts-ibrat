"use client";
import React, { useMemo, useState } from "react";
import { Play } from "lucide-react";
import { CourseTheme } from "@/types";
import { TaskHeader, TaskFooter, TaskChoice } from "../shared";

export interface ListenMCQQuestion {
    id: string;
    text: string;
    options: string[];
    answer: string;
}

interface TaskListenMCQProps {
    title?: string;
    questions?: ListenMCQQuestion[];
    audioCurrentLabel?: string;
    audioDurationLabel?: string;
    feedbackTitle?: string;
    feedbackSubtitle?: string;
    onFinish?: () => void;
    onBack?: () => void;
    onClose?: () => void;
    courseTheme?: CourseTheme;
    progress?: number;
    segments?: { total: number; active: number };
}

const DEFAULT_THEME: CourseTheme = {
    primaryColor: "#884DDF",
    gradient: "linear-gradient(180deg, #CCA9FF 0%, #884DDF 100%)",
    shadowColor: "rgba(136, 77, 223, 0.4)",
    lightBg: "#F3ECFF",
    bgGradient: "from-[#F3ECFF] via-white to-white"
};

function Waveform({ color }: { color: string }) {
    const bars = useMemo(
        () => Array.from({ length: 48 }, (_, i) => 30 + Math.abs(Math.sin(i * 0.7)) * 70),
        []
    );
    return (
        <div className="flex items-center gap-[3px] h-9">
            {bars.map((h, i) => (
                <span
                    key={i}
                    className="w-[3px] rounded-full"
                    style={{
                        height: `${h}%`,
                        backgroundColor: color,
                        opacity: 0.6 + (i % 3) * 0.13
                    }}
                />
            ))}
        </div>
    );
}

export function TaskListenMCQ({
    title = "Listen and answer the questions",
    questions = [],
    audioCurrentLabel = "00:30",
    audioDurationLabel = "01:00",
    feedbackTitle = "Great job!",
    feedbackSubtitle = "You picked the right answer.",
    onFinish = () => { },
    onBack = () => { },
    onClose,
    courseTheme = DEFAULT_THEME,
    progress,
    segments
}: TaskListenMCQProps) {
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [showFeedback, setShowFeedback] = useState(false);

    const allAnswered = questions.length > 0 && questions.every((q) => answers[q.id]);
    const allCorrect = questions.every((q) => answers[q.id] === q.answer);

    const handleSelect = (questionId: string, option: string) => {
        if (showFeedback) return;
        setAnswers((prev) => ({ ...prev, [questionId]: option }));
    };

    const handleAction = () => {
        if (!showFeedback) {
            setShowFeedback(true);
        } else {
            onFinish();
        }
    };

    return (
        <div className={`w-full min-h-screen flex flex-col bg-gradient-to-br ${courseTheme.bgGradient} font-(family-name:--font-urbanist)`}>
            <TaskHeader
                onClose={onClose || onBack}
                progress={progress}
                segments={segments}
                courseTheme={courseTheme}
            />

            <div className="flex-1 flex flex-col items-center px-4 md:px-6 pt-12 pb-40">
                <div className="w-full max-w-[600px] flex flex-col gap-6 animate-scale-in">
                    <h2 className="text-[18px] font-bold text-[#0F172A] tracking-tight text-center">
                        {title}
                    </h2>

                    <div
                        className="rounded-[16px] py-4 px-5 border flex items-center gap-3"
                        style={{ background: courseTheme.lightBg, borderColor: `${courseTheme.primaryColor}33` }}
                    >
                        <button
                            type="button"
                            aria-label="Play audio"
                            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                            style={{ background: courseTheme.gradient, boxShadow: `0 6px 16px ${courseTheme.shadowColor}` }}
                        >
                            <Play size={16} className="text-white ml-0.5" fill="white" />
                        </button>
                        <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                            <Waveform color={courseTheme.primaryColor} />
                            <span className="text-[12px] font-medium tabular-nums" style={{ color: courseTheme.primaryColor }}>
                                {audioCurrentLabel} / {audioDurationLabel}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        {questions.map((q, qIdx) => {
                            const userAnswer = answers[q.id];
                            const showNumbers = questions.length > 1;
                            return (
                                <div key={q.id} className="flex flex-col gap-3">
                                    <p className="text-[16px] font-semibold text-[#0F172A] text-center">
                                        {showNumbers ? `${qIdx + 1}. ` : ""}{q.text}
                                    </p>
                                    <div className="flex flex-col gap-2.5">
                                        {q.options.map((option) => {
                                            const isSelected = userAnswer === option;
                                            const isCorrect = option === q.answer;
                                            return (
                                                <TaskChoice
                                                    key={option}
                                                    label={option}
                                                    isSelected={isSelected}
                                                    isCorrect={isCorrect}
                                                    showFeedback={showFeedback}
                                                    onClick={() => handleSelect(q.id, option)}
                                                    disabled={showFeedback}
                                                    courseTheme={courseTheme}
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <TaskFooter
                onBack={onBack}
                onAction={handleAction}
                actionLabel={showFeedback ? "Continue" : "Check"}
                disabled={!allAnswered}
                showFeedback={showFeedback}
                isCorrect={allCorrect}
                feedbackTitle={allCorrect ? feedbackTitle : "Not quite right"}
                feedbackSubtitle={allCorrect ? feedbackSubtitle : "Review the highlighted answers."}
                courseTheme={courseTheme}
            />
        </div>
    );
}
