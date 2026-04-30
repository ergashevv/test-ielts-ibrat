"use client";
import { useState } from "react";
import { Volume2 } from "lucide-react";
import { CourseTheme } from "@/types";
import { TaskHeader, TaskFooter } from "../shared";

export interface VocabularyWord {
    id: string;
    word: string;
    phonetic?: string;
    definition: string;
    audioUrl?: string;
}

interface TaskVocabularyCardProps {
    words: VocabularyWord[];
    onNext?: () => void;
    onBack?: () => void;
    onFinish?: () => void;
    courseTheme?: CourseTheme;
    segments?: { total: number; active: number };
}

const DEFAULT_THEME: CourseTheme = {
    primaryColor: "#FF5C35",
    gradient: "linear-gradient(180deg, #FF8D70 0%, #FF5C35 100%)",
    shadowColor: "rgba(255, 92, 53, 0.4)",
    lightBg: "#FFF5F3",
    bgGradient: "from-[#FFF5F3] via-white to-white"
};

export function TaskVocabularyCard({
    words,
    onNext = () => { },
    onBack = () => { },
    onFinish,
    courseTheme = DEFAULT_THEME,
    segments
}: TaskVocabularyCardProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!words || words.length === 0) return null;

    const total = words.length;
    const word = words[currentIndex];
    const isLast = currentIndex === total - 1;

    const handleNext = () => {
        if (!isLast) {
            setCurrentIndex((prev) => prev + 1);
        } else {
            (onFinish ?? onNext)();
        }
    };

    const handleBack = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
        } else {
            onBack();
        }
    };

    const handlePlayAudio = () => {
        if (typeof window === "undefined") return;
        if (word.audioUrl) {
            const audio = new Audio(word.audioUrl);
            audio.play().catch(() => { });
            return;
        }
        if ("speechSynthesis" in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(word.word);
            utterance.lang = "en-US";
            utterance.rate = 0.9;
            window.speechSynthesis.speak(utterance);
        }
    };

    return (
        <div className={`w-full min-h-screen flex flex-col bg-gradient-to-br ${courseTheme.bgGradient} font-(family-name:--font-urbanist)`}>
            <TaskHeader
                onClose={onBack}
                segments={segments}
                variant="step"
                courseTheme={courseTheme}
            />

            <div className="flex-1 flex items-center justify-center px-6 pb-32">
                <div
                    key={word.id}
                    className="bg-white rounded-[24px] px-12 py-10 w-full max-w-[600px] flex flex-col items-center gap-2 border border-slate-100 shadow-[0_8px_32px_rgba(0,0,0,0.04)] animate-scale-in"
                >
                    <h2 className="text-[26px] font-bold text-[#0F172A] tracking-tight">
                        {word.word}
                    </h2>
                    {word.phonetic && (
                        <p className="text-[15px] text-[#64748B] font-medium">
                            {word.phonetic}
                        </p>
                    )}
                    <p className="text-[16px] text-[#475569] leading-relaxed text-center mt-2">
                        {word.definition}
                    </p>
                    <button
                        type="button"
                        onClick={handlePlayAudio}
                        aria-label={`Play pronunciation of ${word.word}`}
                        className="mt-5 w-12 h-12 rounded-[14px] bg-[#E9F2FF] hover:bg-[#DBE9FF] active:scale-95 transition-all flex items-center justify-center"
                    >
                        <Volume2 size={22} color="#3B82F6" strokeWidth={2.2} />
                    </button>
                </div>
            </div>

            <TaskFooter
                onBack={handleBack}
                onAction={handleNext}
                actionLabel={isLast ? "Continue" : "Next"}
                courseTheme={courseTheme}
            />
        </div>
    );
}
