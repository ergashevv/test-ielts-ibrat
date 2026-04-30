"use client";
import React, { useState } from "react";
import { CourseTheme } from "@/types";
import { TaskHeader, TaskFooter, TaskChoice } from "../shared";

export interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    answer: string;
}

interface TaskQuizProps {
    task?: {
        id: string;
        title: string;
        questions: QuizQuestion[];
    };
    onNext?: () => void;
    onBack?: () => void;
    courseTheme?: CourseTheme;
}

export function TaskQuiz({
    task = { id: "", title: "", questions: [] },
    onNext = () => { },
    onBack = () => { },
    courseTheme = {
        primaryColor: "#2D68FF",
        gradient: "linear-gradient(180deg, #779DFF 0%, #2D68FF 100%)",
        shadowColor: "rgba(45, 104, 255, 0.4)",
        lightBg: "#E9F2FF",
        bgGradient: "from-[#E9F2FF] via-white to-white"
    }
}: TaskQuizProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selections, setSelections] = useState<Record<string, string>>({});
    const [showFeedback, setShowFeedback] = useState(false);

    if (!task.questions || task.questions.length === 0) {
        return <div className="p-8 text-center text-slate-500">No quiz questions available</div>;
    }

    const currentQuestion = task.questions[currentQuestionIndex];
    const selectedAnswer = selections[currentQuestion.id];
    const isCorrect = selectedAnswer === currentQuestion.answer;
    
    // Progress calculation for continuous bar
    const progress = ((currentQuestionIndex + (showFeedback ? 1 : 0)) / task.questions.length) * 100;

    const handleSelect = (option: string) => {
        if (!showFeedback) {
            setSelections({ ...selections, [currentQuestion.id]: option });
        }
    };

    const handleCheck = () => {
        setShowFeedback(true);
    };

    const handleContinue = () => {
        if (currentQuestionIndex < task.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setShowFeedback(false);
        } else {
            onNext();
        }
    };

    return (
        <div className={`w-full min-h-screen flex flex-col bg-gradient-to-br ${courseTheme.bgGradient} font-(family-name:--font-urbanist)`}>
            
            <TaskHeader 
                onClose={onBack}
                progress={progress}
                segments={{ total: task.questions.length, active: currentQuestionIndex + 1 }}
                showStepCount={true}
                variant="exercise"
            />

            <div className="flex-1 flex flex-col items-center justify-center px-8 pb-32">
                <div className="w-full max-w-[800px] bg-white rounded-[32px] p-12 shadow-[0_32px_80px_-16px_rgba(15,23,42,0.12)] border border-slate-50 animate-scale-in">
                    <p className="text-sm font-bold uppercase tracking-wide mb-3" style={{ color: courseTheme.primaryColor }}>
                        Quiz Question {currentQuestionIndex + 1}
                    </p>
                    <h2 className="text-[28px] font-black text-[#0F172A] tracking-tight mb-8">
                        {currentQuestion.question}
                    </h2>

                    <div className="space-y-4">
                        {currentQuestion.options.map((option: string) => (
                            <TaskChoice
                                key={option}
                                label={option}
                                isSelected={selectedAnswer === option}
                                isCorrect={showFeedback ? option === currentQuestion.answer : null}
                                showFeedback={showFeedback}
                                onClick={() => handleSelect(option)}
                                disabled={showFeedback}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <TaskFooter
                onBack={onBack}
                onAction={showFeedback ? handleContinue : handleCheck}
                actionLabel={showFeedback ? (currentQuestionIndex === task.questions.length - 1 ? "Finish" : "Continue") : "Check"}
                disabled={!selectedAnswer}
                showFeedback={showFeedback}
                isCorrect={isCorrect}
                feedbackTitle={isCorrect ? "Excellent!" : "Check Again"}
                feedbackSubtitle={isCorrect ? "Great understanding." : `The correct answer is ${currentQuestion.answer}`}
                courseTheme={courseTheme}
            />
        </div>
    );
}
