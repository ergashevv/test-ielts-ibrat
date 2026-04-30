"use client";
import React, { useState } from "react";
import { CourseTheme } from "@/types";
import { useStreak } from "@/context/StreakContext";
import { TaskStreakReward } from "./TaskStreakReward";

export interface PracticeQuestion {
    id: string;
    question: string;
    type: "multiple-choice" | "fill-blank" | "short-answer" | "fill-blank-choice";
    options?: string[];
    answer: string;
    explanation?: string;
    taskLabel?: string;
    context?: string;
    cardLabel?: string;
    audioClue?: string;
}

interface TaskPracticeProps {
    onFinish?: (answers?: Record<string, string>) => void;
    steps?: PracticeQuestion[];
    courseTheme?: CourseTheme;
    onBack?: () => void;
    onClose?: () => void;
    progress?: number;
    segments?: { total: number; active: number };
}

import { TaskHeader, TaskFooter, TaskChoice } from "../shared";

export function TaskPractice({
    onFinish = () => { },
    steps = [],
    onBack,
    onClose,
    progress: propsProgress,
    segments: propsSegments,
    courseTheme = {
        primaryColor: "#2D68FF",
        gradient: "linear-gradient(180deg, #779DFF 0%, #2D68FF 100%)",
        shadowColor: "rgba(45, 104, 255, 0.4)",
        lightBg: "#E9F2FF",
        bgGradient: "from-[#E9F2FF] via-white to-white"
    }
}: TaskPracticeProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState("");
    const [showFeedback, setShowFeedback] = useState(false);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const { pendingReward, registerCorrect, registerIncorrect, dismissReward } = useStreak();

    if (!steps || steps.length === 0) {
        return <div className="p-8 text-center text-slate-500">No practice questions available</div>;
    }

    const currentQuestion = steps[currentQuestionIndex];
    const isCorrect = userAnswer.toLowerCase().trim() === currentQuestion.answer.toLowerCase().trim();

    // Calculate progress for Header
    const localProgress = ((currentQuestionIndex + (showFeedback ? 1 : 0)) / steps.length) * 100;
    const displayProgress = propsProgress !== undefined ? propsProgress : localProgress;
    const displaySegments = propsSegments || {
        total: steps.length,
        active: currentQuestionIndex + 1
    };

    const handleCheck = () => {
        setShowFeedback(true);
        if (isCorrect) {
            registerCorrect();
        } else {
            registerIncorrect();
        }
    };

    const handleNext = () => {
        const updatedAnswers = {
            ...answers,
            [currentQuestion.id]: userAnswer,
        };
        setAnswers(updatedAnswers);

        if (currentQuestionIndex < steps.length - 1) {
            const nextIdx = currentQuestionIndex + 1;
            const nextQuestion = steps[nextIdx];
            setCurrentQuestionIndex(nextIdx);
            setUserAnswer(updatedAnswers[nextQuestion.id] ?? "");
            setShowFeedback(false);
            window.scrollTo(0, 0);
        } else {
            onFinish(updatedAnswers);
        }
    };

    const handleBack = () => {
        if (currentQuestionIndex > 0) {
            const prevIdx = currentQuestionIndex - 1;
            const prevQuestion = steps[prevIdx];
            setCurrentQuestionIndex(prevIdx);
            setUserAnswer(answers[prevQuestion.id] ?? "");
            setShowFeedback(false);
            window.scrollTo(0, 0);
        } else if (onBack) {
            onBack();
        }
    };

    const renderFillBlankQuestion = () => {
        const parts = currentQuestion.question.split("_________");
        return (
            <div className="text-[17px] font-medium text-[#0F172A] leading-relaxed">
                {parts[0]}
                <span className="inline-block border-b-2 border-[#94A3B8] min-w-[120px] mx-1 text-center font-semibold text-[#0F172A]">
                    {userAnswer || " "}
                </span>
                {parts.length > 1 ? parts[1] : ""}
            </div>
        );
    };

    return (
        <div className={`w-full min-h-screen flex flex-col bg-gradient-to-br ${courseTheme.bgGradient} font-(family-name:--font-urbanist)`}>
            {pendingReward !== null && (
                <TaskStreakReward count={pendingReward} onDismiss={dismissReward} />
            )}

            <TaskHeader
                onClose={onClose || handleBack}
                progress={displayProgress}
                segments={displaySegments}
                courseTheme={courseTheme}
            />

            <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-6 pb-40">
                <div className="w-full max-w-[600px] flex flex-col gap-6 animate-scale-in">

                    {/* Header: Title */}
                    <div className="text-center mb-2">
                        <h2 className="text-[20px] font-bold text-[#0F172A] tracking-tight">
                            {currentQuestion.taskLabel || "Choose the correct answer"}
                        </h2>
                    </div>

                    {/* Context and Question Cards */}
                    <div className="flex flex-col gap-4">
                        {currentQuestion.context && (
                            <div className="bg-[#F8FAFC] rounded-[16px] p-6 border border-[#E2E8F0]">
                                <span className="text-[#64748B] text-[13px] font-[800] uppercase tracking-[0.05em] mb-2.5 block text-left">Context:</span>
                                <p className="text-[17px] text-[#475569] leading-relaxed font-medium text-left">
                                    {currentQuestion.context}
                                </p>
                            </div>
                        )}

                        {currentQuestion.audioClue ? (
                            <button
                                type="button"
                                aria-label="Play audio clue"
                                className="rounded-[16px] p-5 border bg-[#EFF6FF] border-[#BFDBFE] flex items-center gap-4 text-left hover:bg-[#E0EBFF] transition-colors"
                            >
                                <span className="w-[44px] h-[44px] rounded-full bg-white border border-[#BFDBFE] flex items-center justify-center shrink-0">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                        <path d="M11 5L6 9H2v6h4l5 4V5z" fill="#2563EB" stroke="#2563EB" strokeWidth="1.5" strokeLinejoin="round" />
                                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" />
                                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                </span>
                                <p className="text-[17px] font-medium leading-relaxed text-[#0F172A]">
                                    {currentQuestion.audioClue}
                                </p>
                            </button>
                        ) : (
                            <div className="rounded-[16px] p-6 border bg-[#EFF6FF] border-[#BFDBFE]">
                                <span className="text-[#2563EB] text-[15px] font-semibold mb-2 block text-left">
                                    {currentQuestion.cardLabel ?? (currentQuestion.type === "fill-blank" || currentQuestion.type === "fill-blank-choice" ? "Sentence:" : "Question:")}
                                </span>
                                <div className="text-left">
                                    {currentQuestion.type === "fill-blank-choice" ? (
                                        renderFillBlankQuestion()
                                    ) : (
                                        <p className="text-[17px] font-medium leading-relaxed text-[#0F172A] text-left">
                                            {currentQuestion.question}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Options Grid/List */}
                    {(currentQuestion.type === "multiple-choice" || currentQuestion.type === "fill-blank-choice") && currentQuestion.options ? (
                        <div className="flex flex-col gap-3 w-full">
                            {currentQuestion.options.map((option, idx) => (
                                <TaskChoice
                                    key={idx}
                                    label={option}
                                    isSelected={userAnswer === option}
                                    isCorrect={option === currentQuestion.answer}
                                    showFeedback={showFeedback}
                                    onClick={() => !showFeedback && setUserAnswer(option)}
                                    disabled={showFeedback}
                                    courseTheme={courseTheme}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="mb-6 w-full">
                            <input
                                type="text"
                                value={userAnswer}
                                onChange={(e) => !showFeedback && setUserAnswer(e.target.value)}
                                disabled={showFeedback}
                                placeholder="Type your answer here..."
                                className="w-full p-5 rounded-2xl border-2 border-slate-200 text-lg font-medium focus:outline-none focus:border-slate-400 transition-all disabled:bg-slate-50 disabled:cursor-not-allowed"
                            />
                        </div>
                    )}

                    {/* Explanation Box */}
                    {showFeedback && (
                        <div className={`p-6 rounded-2xl w-full animate-fade-in ${isCorrect ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
                            <p className={`font-semibold flex items-center gap-2 mb-2 ${isCorrect ? "text-green-800" : "text-red-800"}`}>
                                {isCorrect ? "Correct! Well done!" : `Not quite. The correct answer is: ${currentQuestion.answer}`}
                            </p>
                            {currentQuestion.explanation && (
                                <p className="text-sm text-slate-700 leading-relaxed">{currentQuestion.explanation}</p>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <TaskFooter
                onBack={handleBack}
                onAction={showFeedback ? handleNext : handleCheck}
                actionLabel={showFeedback ? (currentQuestionIndex === steps.length - 1 ? "Continue" : "Next") : "Check"}
                disabled={!userAnswer}
                showFeedback={showFeedback}
                isCorrect={isCorrect}
                courseTheme={courseTheme}
            />
        </div>
    );
}
