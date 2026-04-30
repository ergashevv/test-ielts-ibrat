"use client";
import React, { useState } from "react";
import { CourseTheme } from "@/types";

interface TrueFalseQuestion {
    id: string;
    context: string;
    task: string;
    answer: string;
}

interface TrueFalseProps {
    task?: {
        id: string;
        title: string;
        type: string;
        metadata: {
            instruction: string;
            questions: TrueFalseQuestion[];
        };
    };
    onNext?: () => void;
    onBack?: () => void;
    courseTheme?: CourseTheme;
    progress?: number;
    segments?: { total: number; active: number };
}

import { TaskHeader, TaskFooter, TaskChoice } from "../shared";

export function TaskTrueFalse({
    task = { id: "", title: "", type: "true-false", metadata: { instruction: "", questions: [] } },
    onNext = () => { },
    onBack = () => { },
    courseTheme = {
        primaryColor: "#2D68FF",
        gradient: "linear-gradient(180deg, #779DFF 0%, #2D68FF 100%)",
        shadowColor: "rgba(45, 104, 255, 0.4)",
        lightBg: "#E9F2FF",
        bgGradient: "from-[#E9F2FF] via-white to-white"
    },
    progress: propsProgress,
    segments: propsSegments
}: TrueFalseProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);

    if (!task.metadata?.questions || task.metadata.questions.length === 0) {
        return <div className="p-8 text-center text-slate-500">No questions available</div>;
    }

    const currentQuestion = task.metadata.questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.answer;
    
    // Calculate local progress for Header if props are not provided
    const localProgress = ((currentQuestionIndex + (showFeedback ? 1 : 0)) / task.metadata.questions.length) * 100;

    const displayProgress = propsProgress !== undefined ? propsProgress : localProgress;
    const displaySegments = propsSegments || { 
        total: task.metadata.questions.length, 
        active: currentQuestionIndex + 1 
    };

    const handleSelect = (answer: string) => {
        if (!showFeedback) {
            setSelectedAnswer(answer);
        }
    };

    const handleCheck = () => {
        if (!selectedAnswer) return;
        setShowFeedback(true);
    };

    const handleContinue = () => {
        if (currentQuestionIndex < task.metadata.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null);
            setShowFeedback(false);
        } else {
            onNext();
        }
    };

    return (
        <div className={`w-full min-h-screen flex flex-col bg-gradient-to-br ${courseTheme.bgGradient} font-(family-name:--font-urbanist)`}>
            
            <TaskHeader
                onClose={onBack}
                progress={displayProgress}
                segments={displaySegments}
                showStepCount={true}
                courseTheme={courseTheme}
            />

            {/* Content Area */}
            <div className="flex-1 flex flex-col items-center px-10 pb-32 pt-4">
                <div className="w-full max-w-[600px] flex flex-col gap-4">
                    {/* Main Title - Figma exact: sentence case */}
                    <h2 className="text-[28px] font-bold text-[#0F172A] text-center mb-2">
                        Select True/False
                    </h2>

                    {/* Context Card - Figma Slate/100 */}
                    <div className="flex flex-col gap-2">
                        <div className="bg-[#F1F5F9] rounded-[16px] p-4 border border-[#CBD5E1]">
                            <span className="text-[14px] font-bold text-[#64748B] tracking-tight block mb-2">
                                Context:
                            </span>
                            <p className="text-[16px] font-normal text-[#0F172A] leading-[28px]">
                                {currentQuestion.context}
                            </p>
                        </div>
                    </div>

                    {/* Task Card - themed */}
                    <div className="flex flex-col gap-2">
                        <div
                            className="rounded-[16px] p-4 border"
                            style={{
                                backgroundColor: courseTheme.lightBg,
                                borderColor: `${courseTheme.primaryColor}33`
                            }}
                        >
                            <span
                                className="text-[14px] font-bold tracking-tight block mb-2"
                                style={{ color: courseTheme.primaryColor }}
                            >
                                Task:
                            </span>
                            <p className="text-[16px] font-bold text-[#0F172A] leading-[28px]">
                                {currentQuestion.task}
                            </p>
                        </div>
                    </div>

                    {/* Options - Radio Style Selection */}
                    <div className="flex flex-col gap-3 mt-4">
                        {["True", "False"].map((option) => (
                            <TaskChoice
                                key={option}
                                label={option}
                                isSelected={selectedAnswer === option}
                                isCorrect={option === currentQuestion.answer}
                                showFeedback={showFeedback}
                                onClick={() => handleSelect(option)}
                                disabled={showFeedback}
                                className="!rounded-[20px] !h-[52px]"
                                courseTheme={courseTheme}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <TaskFooter
                onBack={onBack}
                onAction={showFeedback ? handleContinue : handleCheck}
                actionLabel={showFeedback ? "Continue" : "Check"}
                disabled={!selectedAnswer}
                showFeedback={showFeedback}
                isCorrect={isCorrect}
                feedbackTitle={isCorrect ? "Excellent!" : "Incorrect"}
                feedbackSubtitle={isCorrect ? "Great understanding." : `Correct answer: ${currentQuestion.answer}`}
                courseTheme={courseTheme}
            />
        </div>
    );
}
