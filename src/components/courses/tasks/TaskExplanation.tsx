"use client";
import { CourseTheme } from "@/types";
import { TaskHeader, TaskFooter } from "../shared";

interface ExplanationOption {
    label: string;
    description: string;
}

interface TaskExplanationProps {
    title?: string;
    question: string;
    listIntro?: string;
    options: ExplanationOption[];
    buttonLabel?: string;
    onNext?: () => void;
    onBack?: () => void;
    onClose?: () => void;
    courseTheme?: CourseTheme;
    progress?: number;
    segments?: { total: number; active: number };
}

export function TaskExplanation({
    title = "Explanation",
    question,
    listIntro = "Select:",
    options,
    buttonLabel = "Get Started",
    onNext = () => { },
    onBack,
    onClose,
    courseTheme = {
        primaryColor: "#2D68FF",
        gradient: "linear-gradient(180deg, #779DFF 0%, #2D68FF 100%)",
        shadowColor: "rgba(45, 104, 255, 0.4)",
        lightBg: "#E9F2FF",
        bgGradient: "from-[#E9F2FF] via-white to-white"
    },
    progress,
    segments
}: TaskExplanationProps) {
    const showHeader = segments !== undefined || progress !== undefined;

    return (
        <div className={`w-full min-h-screen flex flex-col bg-gradient-to-br ${courseTheme.bgGradient} font-(family-name:--font-urbanist)`}>
            {showHeader && (
                <TaskHeader
                    onClose={onClose || onBack}
                    progress={progress}
                    segments={segments}
                    variant="step"
                    courseTheme={courseTheme}
                />
            )}

            <div className="flex-1 flex flex-col items-center justify-center w-full px-6 pb-32 pt-12 gap-10">
                <h1 className="text-[36px] font-bold text-[#0F172A] tracking-tight text-center">
                    {title}
                </h1>

                <div className="bg-white rounded-[24px] px-10 py-8 w-full max-w-[640px] shadow-[0_8px_32px_rgba(0,0,0,0.04)] border border-slate-100">
                    <p className="text-[18px] font-bold text-[#0F172A] leading-relaxed mb-6">
                        {question}
                    </p>
                    <p className="text-[17px] text-[#475569] mb-2">
                        {listIntro}
                    </p>
                    <ul className="flex flex-col gap-1">
                        {options.map((opt, idx) => (
                            <li key={idx} className="text-[17px] text-[#475569] leading-relaxed">
                                <span className="font-bold text-[#0F172A]">{opt.label}</span>{" "}
                                {opt.description}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <TaskFooter
                onBack={onBack}
                onAction={onNext}
                actionLabel={buttonLabel}
                courseTheme={courseTheme}
            />
        </div>
    );
}
