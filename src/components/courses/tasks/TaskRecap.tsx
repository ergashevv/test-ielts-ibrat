"use client";
import React from "react";
import Image from "next/image";
import { Clock, Star, Target } from "lucide-react";
import { CourseTheme } from "@/types";
import { TaskFooter } from "../shared";

interface TaskRecapProps {
    onFinish?: () => void;
    stats?: {
        score: number;
        total: number;
        time: string;
        accuracy: number;
    };
    courseTheme?: CourseTheme;
    title?: string;
    badge?: string;
}

export function TaskRecap({
    onFinish = () => { },
    stats = {
        score: 0,
        total: 0,
        time: "0:00",
        accuracy: 0
    },
    title = "Lesson completed!",
    badge = "Congratulations!",
    courseTheme = {
        primaryColor: "#2D68FF",
        gradient: "linear-gradient(180deg, #779DFF 0%, #2D68FF 100%)",
        shadowColor: "rgba(45, 104, 255, 0.4)",
        lightBg: "#E9F2FF",
        bgGradient: "from-[#E9F2FF] via-white to-white"
    },
}: TaskRecapProps) {
    return (
        <div
            className={`w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-gradient-to-br ${courseTheme.bgGradient} font-(family-name:--font-urbanist)`}
        >
            <div className="flex flex-col items-center animate-scale-in pb-32">
                {/* Success icon */}
                <div className="relative w-[320px] h-[320px] flex items-center justify-center mb-[-80px]">
                    <Image
                        src="/Success.svg"
                        alt="Success"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>

                {/* Congratulations Badge */}
                <div
                    className="inline-flex items-center justify-center rounded-full text-[16px] font-bold text-[#047857] z-10 mb-[16px]"
                    style={{
                        backgroundColor: "#ECFDF5",
                        padding: "10px 18px",
                        border: "1.5px solid #D1FAE5"
                    }}
                >
                    {badge}
                </div>

                <div className="text-center mb-[20px] max-w-[390px] z-10">
                    <h2 className="text-[32px] font-bold text-[#0F172A] mb-[8px] leading-tight tracking-tight">
                        {title}
                    </h2>
                    <p className="text-[18px] text-[#64748B] font-medium">
                        You earn <span className="font-bold" style={{ color: courseTheme.primaryColor }}>{stats.score}</span> points
                    </p>
                </div>

                {/* Statistics Card */}
                <div className="w-[600px] bg-white rounded-[24px] border border-[#F1F5F9] shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col px-4 py-1 z-10">
                    {[
                        {
                            id: "time",
                            label: "Time",
                            value: stats.time,
                            icon: <Clock size={20} strokeWidth={2.5} className="text-white" />
                        },
                        {
                            id: "point",
                            label: "Point",
                            value: String(stats.score),
                            icon: <Star size={20} fill="white" strokeWidth={2} className="text-white" />
                        },
                        {
                            id: "accuracy",
                            label: "Accuracy",
                            value: `${stats.accuracy}%`,
                            icon: <Target size={20} strokeWidth={2.5} className="text-white" />
                        }
                    ].map((item, index) => (
                        <div
                            key={item.id}
                            className={`flex items-center justify-between py-4 ${index > 0 ? "border-t border-[#F1F5F9]" : ""}`}
                        >
                            <div className="flex items-center gap-4">
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                                    style={{ backgroundColor: courseTheme.primaryColor }}
                                >
                                    {item.icon}
                                </div>
                                <span className="text-[18px] font-medium text-[#475569]">{item.label}</span>
                            </div>
                            <span className="text-[18px] font-bold text-[#0F172A]">{item.value}</span>
                        </div>
                    ))}
                </div>
            </div>

            <TaskFooter
                onAction={onFinish}
                actionLabel="Continue"
                courseTheme={courseTheme}
            />
        </div>
    );
}
