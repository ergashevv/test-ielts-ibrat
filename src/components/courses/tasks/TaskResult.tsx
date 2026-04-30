"use client";
import React from "react";
import { X } from "lucide-react";
import Image from "next/image";
import { CourseTheme } from "@/types";

interface TaskResultProps {
    onNext?: () => void;
    onBack?: () => void;
    stats?: {
        score: number;
        total: number;
    };
    incorrectAnswers?: {
        question: string;
        userAnswer: string;
        correctAnswer: string;
    }[];
    courseTheme?: CourseTheme;
    badge?: string;
    title?: string;
}

export function TaskResult({
    onNext = () => { },
    stats = { score: 8, total: 10 },
    incorrectAnswers = [],
    badge = "Great job on completing",
    title = "Your Test Result",
    courseTheme = {
        primaryColor: "#2D68FF",
        gradient: "linear-gradient(180deg, #779DFF 0%, #2D68FF 100%)",
        shadowColor: "rgba(45, 104, 255, 0.4)",
        lightBg: "#E9F2FF",
        bgGradient: "from-[#E9F2FF] via-white to-white"
    }
}: TaskResultProps) {
    return (
        <div className={`w-full min-h-screen flex flex-col items-center bg-gradient-to-br ${courseTheme.bgGradient} font-(family-name:--font-urbanist) overflow-x-hidden`}>
            <div className="flex-1 flex flex-col items-center w-full pt-[80px] pb-40 px-6">
                <div className="flex flex-col items-center w-full max-w-[600px] animate-scale-in">
                    
                    {/* Icon with Rays Background - Exact Figma 440x440 */}
                    <div className="relative w-[440px] h-[440px] flex items-center justify-center">
                        <Image 
                            src="/presantition-complate-image.svg" 
                            alt="Success" 
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>

                    {/* Completion Badge - Figma Overlap */}
                    <div
                        className="inline-flex items-center justify-center rounded-full text-[14px] font-bold z-20 mb-[38px] px-6 py-[9px] border-[1.2px] tracking-tight mt-[-153px]"
                        style={{
                            color: courseTheme.primaryColor,
                            backgroundColor: courseTheme.lightBg,
                            borderColor: `${courseTheme.primaryColor}33`
                        }}
                    >
                        {badge}
                    </div>

                    <div className="text-center mb-[36px] z-10 w-full">
                        <h2 className="text-[32px] font-bold text-[#0F172A] mb-2 leading-tight tracking-tight">
                            {title}
                        </h2>
                        <p className="text-[16px] text-[#64748B] font-medium opacity-80">
                            {stats.score}/{stats.total} correct answers
                        </p>
                    </div>

                    {/* Incorrect Answers List - Figma 600px Width */}
                    <div className="w-full flex flex-col gap-5 z-10">
                        {incorrectAnswers.length > 0 ? incorrectAnswers.map((item, idx) => (
                            <div key={idx} className="bg-white rounded-[24px] border border-[#F1F5F9] shadow-[0_8px_40px_rgba(15,23,42,0.03)] overflow-hidden">
                                <div className="px-8 py-7">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-[22px] h-[22px] rounded-full bg-[#EF4444] flex items-center justify-center">
                                            <X size={12} className="text-white" strokeWidth={4} />
                                        </div>
                                        <span className="text-[#EF4444] font-bold text-[14px] tracking-tight">Incorrect</span>
                                    </div>
                                    <p className="text-[17px] text-[#0F172A] font-medium leading-relaxed mb-5">
                                        {item.question}
                                    </p>
                                    <div className="pt-5 border-t border-dashed border-[#F1F5F9] border-t-[1.2px] flex flex-col gap-2">
                                        <p className="text-[15px] text-[#64748B]">
                                            Answer: <span className="text-[#0F172A] font-bold">{item.userAnswer}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )) : (
                             <div className="bg-white rounded-[24px] p-8 text-center border border-[#F1F5F9] shadow-[0_8px_40px_rgba(15,23,42,0.03)]">
                                <p className="text-[#64748B] font-medium">Perfect score! No incorrect answers.</p>
                             </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Bottom Button Bar */}
            <div className="fixed bottom-0 left-0 right-0 h-[100px] bg-white border-t border-[#F1F5F9] flex items-center justify-center z-50">
                <div className="content-container flex justify-end">
                    <button
                        onClick={onNext}
                        className="text-white h-[52px] px-12 rounded-[18px] font-bold text-[18px] transition-all flex items-center gap-3 active:scale-[0.97] hover:brightness-105 border-b-[2.5px] border-black/10"
                        style={{
                            background: courseTheme.gradient,
                            boxShadow: `0 8px 20px ${courseTheme.shadowColor}`
                        }}
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
}
