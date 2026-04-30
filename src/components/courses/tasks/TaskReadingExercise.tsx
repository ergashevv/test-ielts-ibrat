"use client";
import React, { useState } from "react";
import { CourseTheme } from "@/types";
import { useStreak } from "@/context/StreakContext";
import { TaskStreakReward } from "./TaskStreakReward";

interface ReadingExerciseQuestion {
    id: string;
    text: string;
    type?: "multiple-choice" | "select-paragraph" | "short-answer";
    options?: string[];
    answer: string;
    placeholder?: string;
}

interface ReadingExerciseProps {
    onFinish?: (answers: Record<string, string>) => void;
    onBack?: () => void;
    onClose?: () => void;
    passage: {
        title?: string;
        paragraphs: { id: string; title: string; text: string }[];
    };
    questions: ReadingExerciseQuestion[];
    instruction?: string;
    courseTheme?: CourseTheme;
    progress?: number;
    segments?: { total: number; active: number };
}

import { TaskHeader, TaskFooter, TaskChoice } from "../shared";

export function TaskReadingExercise({
    onFinish = () => { },
    onBack,
    onClose,
    passage,
    questions,
    instruction = "Read the passage and complete the tasks.",
    courseTheme = {
        primaryColor: "#2D68FF",
        gradient: "linear-gradient(180deg, #779DFF 0%, #2D68FF 100%)",
        shadowColor: "rgba(45, 104, 255, 0.4)",
        lightBg: "#E9F2FF",
        bgGradient: "from-[#E9F2FF] via-white to-white"
    },
    progress,
    segments
}: ReadingExerciseProps) {
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const { pendingReward, registerCorrect, registerIncorrect, dismissReward } = useStreak();

    const handleSelect = (questionId: string, option: string) => {
        setAnswers(prev => ({ ...prev, [questionId]: option }));
    };

    const isAllAnswered = questions.every(q => answers[q.id]);

    const handleCheck = () => {
        if (!isAllAnswered) return;
        questions.forEach((q) => {
            const ans = (answers[q.id] || "").toLowerCase().trim();
            const correct = q.answer.toLowerCase().trim();
            if (ans === correct) {
                registerCorrect();
            } else {
                registerIncorrect();
            }
        });
        onFinish(answers);
    };

    return (
        <div className={`w-full min-h-screen flex flex-col bg-gradient-to-br ${courseTheme?.bgGradient || "from-[#E9F2FF] via-[#F8FAFC] to-[#F8FAFC]"} font-(family-name:--font-urbanist)`}>
            {pendingReward !== null && (
                <TaskStreakReward count={pendingReward} onDismiss={dismissReward} />
            )}

            <TaskHeader
                onClose={onClose || onBack}
                progress={progress !== undefined ? progress : 10}
                segments={segments}
                courseTheme={courseTheme}
            />

            {/* Main Content Split View - Wrapped in Container */}
            <div className="flex-1 w-full overflow-hidden">
                <div className="content-container h-full flex overflow-hidden">
                    {/* Left Side: Passage (Scrollable) */}
                    <div className="w-[50%] h-full overflow-y-auto pr-10 pt-6 pb-32 scrollbar-hide">
                        {passage.paragraphs.map((p) => (
                            <div key={p.id} className="mb-12">
                                <h3 className="text-[22px] font-bold text-[#0F172A] mb-5">{p.title}</h3>
                                <p className="text-[18px] text-[#475569] leading-[30px] font-normal">
                                    {p.text}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Right Side: Questions (Scrollable) */}
                    <div className="w-[50%] h-full overflow-y-auto px-10 pt-6 pb-32">
                        <div className="max-w-[540px]">
                            <h2 className="text-[24px] font-bold text-[#0F172A] leading-tight mb-12">
                                {instruction}
                            </h2>

                            <div className="flex flex-col gap-12">
                                {questions.map((q) => (
                                     <div key={q.id} className="flex flex-col gap-5">
                                        <h4 className="text-[18px] font-medium text-[#1E293B] leading-relaxed">
                                            {q.text}
                                        </h4>
                                        
                                        {/* Question Types Handling */}
                                        {q.type === "short-answer" ? (
                                            <div className="w-full">
                                                <input
                                                    type="text"
                                                    value={answers[q.id] || ""}
                                                    onChange={(e) => handleSelect(q.id, e.target.value)}
                                                    placeholder={q.placeholder || "Write your answer"}
                                                    className="w-full h-[52px] px-5 rounded-[16px] border border-[#E2E8F0] text-[16px] text-[#475569] focus:outline-none transition-all bg-white shadow-sm"
                                                    style={{ outline: "none" }}
                                                    onFocus={(e) => { e.currentTarget.style.borderColor = courseTheme.primaryColor; }}
                                                    onBlur={(e) => { e.currentTarget.style.borderColor = "#E2E8F0"; }}
                                                />
                                            </div>
                                        ) : q.type === "select-paragraph" ? (
                                            <div className="relative">
                                                <select
                                                    value={answers[q.id] || ""}
                                                    onChange={(e) => handleSelect(q.id, e.target.value)}
                                                    className="w-full h-[52px] px-5 rounded-[16px] border border-[#E2E8F0] text-[16px] text-[#475569] focus:outline-none transition-all bg-white shadow-sm appearance-none cursor-pointer"
                                                    onFocus={(e) => { e.currentTarget.style.borderColor = courseTheme.primaryColor; }}
                                                    onBlur={(e) => { e.currentTarget.style.borderColor = "#E2E8F0"; }}
                                                >
                                                    <option value="" disabled>{q.placeholder || "Select paragraph"}</option>
                                                    {q.options?.map(opt => (
                                                        <option key={opt} value={opt}>{opt}</option>
                                                    ))}
                                                </select>
                                                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                                                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M1 1L6 6L11 1" stroke="#64748B" strokeWidth="2" strokeLinecap="round"/>
                                                    </svg>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col gap-3">
                                                {q.options?.map((option) => (
                                                    <TaskChoice
                                                        key={option}
                                                        label={option}
                                                        isSelected={answers[q.id] === option}
                                                        onClick={() => handleSelect(q.id, option)}
                                                        className="!h-[52px] !rounded-[16px]"
                                                        courseTheme={courseTheme}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <TaskFooter
                onAction={handleCheck}
                actionLabel="Check"
                disabled={!isAllAnswered}
                maxWidth="1140px"
                courseTheme={courseTheme}
            />
        </div>
    );
}
