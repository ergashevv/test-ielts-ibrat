"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Play, RotateCcw, RotateCw, Maximize2 } from "lucide-react";
import { CourseTheme, PresentationTabsData } from "@/types";
import { TaskHeader, TaskFooter } from "../shared";

interface TaskPresentationReadingProps {
    data: PresentationTabsData;
    onFinish?: () => void;
    onBack?: () => void;
    courseTheme?: CourseTheme;
}

type TabKey = "text" | "audio" | "video" | "infographic";

const TABS: { key: TabKey; label: string }[] = [
    { key: "text", label: "Text" },
    { key: "audio", label: "Audio" },
    { key: "video", label: "Video" },
    { key: "infographic", label: "Infographic" }
];

export function TaskPresentationReading({
    data,
    onFinish = () => { },
    onBack,
    courseTheme = {
        primaryColor: "#2D68FF",
        gradient: "linear-gradient(180deg, #779DFF 0%, #2D68FF 100%)",
        shadowColor: "rgba(45, 104, 255, 0.4)",
        lightBg: "#E9F2FF",
        bgGradient: "from-[#E9F2FF] via-white to-white"
    }
}: TaskPresentationReadingProps) {
    const [stage, setStage] = useState<"intro" | "tabs">("intro");
    const [activeTab, setActiveTab] = useState<TabKey>("text");

    const handleNext = () => {
        if (stage === "intro") setStage("tabs");
        else onFinish();
    };

    const handleBack = () => {
        if (stage === "tabs") setStage("intro");
        else if (onBack) onBack();
    };

    return (
        <div className={`w-full min-h-screen flex flex-col bg-gradient-to-br ${courseTheme.bgGradient} font-(family-name:--font-urbanist)`}>
            <TaskHeader
                onClose={onBack || handleBack}
                segments={{ total: 2, active: stage === "intro" ? 1 : 2 }}
                variant="step"
                courseTheme={courseTheme}
            />

            <div className="flex-1 flex flex-col items-center pb-40">
                {stage === "intro" ? (
                    <IntroStage data={data} courseTheme={courseTheme} />
                ) : (
                    <TabsStage
                        data={data}
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                        courseTheme={courseTheme}
                    />
                )}
            </div>

            <TaskFooter
                onBack={handleBack}
                onAction={handleNext}
                actionLabel={stage === "intro" ? "Next" : "Get Started"}
                courseTheme={courseTheme}
            />
        </div>
    );
}

function IntroStage({ data, courseTheme }: { data: PresentationTabsData; courseTheme: CourseTheme }) {
    return (
        <div className="flex-1 w-full flex flex-col items-center justify-center gap-10 animate-scale-in px-6">
            <div className="relative flex items-center justify-center">
                <div
                    className="absolute inset-0 -m-10 rounded-full"
                    style={{ border: `2px solid ${courseTheme.primaryColor}22` }}
                />
                <div
                    className="absolute inset-0 -m-5 rounded-full"
                    style={{ border: `2px solid ${courseTheme.primaryColor}44` }}
                />
                <div
                    className="relative w-[120px] h-[120px] rounded-full flex items-center justify-center shadow-xl"
                    style={{ background: courseTheme.gradient, boxShadow: `0 20px 40px ${courseTheme.shadowColor}` }}
                >
                    <Image
                        src={data.intro.icon}
                        alt={data.intro.title}
                        width={56}
                        height={56}
                        className="brightness-0 invert"
                    />
                </div>
            </div>

            <div className="bg-white rounded-[24px] p-8 w-full max-w-[600px] shadow-[0_8px_40px_rgba(0,0,0,0.04)] border border-slate-100">
                <h1 className="text-[24px] font-bold text-[#0F172A] leading-tight tracking-tight mb-3">
                    {data.intro.title}
                </h1>
                <p className="text-[16px] text-[#64748B] leading-relaxed">
                    {data.intro.description}
                </p>
            </div>
        </div>
    );
}

function TabsStage({
    data,
    activeTab,
    onTabChange,
    courseTheme
}: {
    data: PresentationTabsData;
    activeTab: TabKey;
    onTabChange: (t: TabKey) => void;
    courseTheme: CourseTheme;
}) {
    return (
        <div className="w-full max-w-[1000px] flex flex-col items-center px-6 pt-2 animate-scale-in">
            <div className="flex items-center justify-center gap-12 w-full border-b border-slate-200 mb-10">
                {TABS.map((tab) => {
                    const isActive = tab.key === activeTab;
                    return (
                        <button
                            key={tab.key}
                            onClick={() => onTabChange(tab.key)}
                            className="relative pb-4 pt-2 text-[16px] font-semibold transition-colors"
                            style={{ color: isActive ? courseTheme.primaryColor : "#94A3B8" }}
                        >
                            {tab.label}
                            {isActive && (
                                <span
                                    className="absolute -bottom-px left-0 right-0 h-[2px] rounded-full"
                                    style={{ background: courseTheme.primaryColor }}
                                />
                            )}
                        </button>
                    );
                })}
            </div>

            {activeTab === "text" && <TextTab data={data} />}
            {activeTab === "audio" && <AudioTab data={data} courseTheme={courseTheme} />}
            {activeTab === "video" && <VideoTab data={data} courseTheme={courseTheme} />}
            {activeTab === "infographic" && <InfographicTab data={data} />}
        </div>
    );
}

function TextTab({ data }: { data: PresentationTabsData }) {
    return (
        <div className="w-full max-w-[640px] mx-auto text-left animate-fade-in">
            <h2 className="text-[22px] font-bold text-[#0F172A] leading-tight mb-3">
                {data.contentTitle}
            </h2>
            {data.text.intro && (
                <p className="text-[15px] font-bold text-[#0F172A] mb-4">
                    {data.text.intro}
                </p>
            )}

            <div className="flex flex-col gap-4">
                {data.text.sections.map((section, idx) => (
                    <div key={idx} className="flex flex-col gap-2">
                        {section.heading && (
                            <p className="text-[15px] font-bold text-[#0F172A]">
                                {section.heading}
                            </p>
                        )}
                        {section.paragraphs?.map((p, i) => (
                            <p key={i} className="text-[15px] text-[#475569] leading-relaxed">
                                {p}
                            </p>
                        ))}
                        {section.bullets && (
                            <ul className="flex flex-col gap-1">
                                {section.bullets.map((b, i) => (
                                    <li key={i} className="text-[15px] text-[#475569] leading-relaxed">
                                        -{b}
                                    </li>
                                ))}
                            </ul>
                        )}
                        {idx < data.text.sections.length - 1 && (
                            <div className="border-t border-dashed border-slate-200 mt-3" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

function AudioTab({ data, courseTheme }: { data: PresentationTabsData; courseTheme: CourseTheme }) {
    return (
        <div className="w-full flex flex-col items-center gap-8 animate-fade-in pt-4">
            <div className="w-[300px] h-[300px] rounded-3xl overflow-hidden">
                {data.audio.coverImage ? (
                    <Image
                        src={data.audio.coverImage}
                        alt="Audio cover"
                        width={300}
                        height={300}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-[#FCE8DA] flex items-center justify-center">
                        <VinylRecord />
                    </div>
                )}
            </div>

            <div className="w-full max-w-[500px] flex flex-col items-center gap-3">
                <div className="w-full flex items-center gap-3">
                    <span className="text-[12px] font-medium" style={{ color: courseTheme.primaryColor }}>
                        {data.audio.currentLabel ?? "00:00"}
                    </span>
                    <div className="flex-1 h-[3px] bg-slate-200 rounded-full relative">
                        <div
                            className="absolute left-0 top-0 h-full rounded-full"
                            style={{ width: "8%", background: courseTheme.primaryColor }}
                        />
                        <div
                            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
                            style={{ left: "calc(8% - 6px)", background: courseTheme.primaryColor }}
                        />
                    </div>
                    <span className="text-[12px] font-medium text-[#94A3B8]">
                        {data.audio.durationLabel ?? "00:00"}
                    </span>
                </div>

                <div className="flex items-center gap-6 mt-2">
                    <button className="text-[14px] font-bold" style={{ color: courseTheme.primaryColor }}>
                        1X
                    </button>
                    <button
                        className="w-9 h-9 rounded-full border-2 flex items-center justify-center"
                        style={{ borderColor: courseTheme.primaryColor, color: courseTheme.primaryColor }}
                    >
                        <RotateCcw size={16} strokeWidth={2.5} />
                    </button>
                    <button
                        className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                        style={{ background: courseTheme.gradient, boxShadow: `0 8px 20px ${courseTheme.shadowColor}` }}
                    >
                        <Play size={22} className="text-white ml-0.5" fill="white" />
                    </button>
                    <button
                        className="w-9 h-9 rounded-full border-2 flex items-center justify-center"
                        style={{ borderColor: courseTheme.primaryColor, color: courseTheme.primaryColor }}
                    >
                        <RotateCw size={16} strokeWidth={2.5} />
                    </button>
                </div>
            </div>
        </div>
    );
}

function VideoTab({ data, courseTheme }: { data: PresentationTabsData; courseTheme: CourseTheme }) {
    return (
        <div className="w-full flex flex-col items-center gap-6 animate-fade-in pt-4">
            <div className="w-[500px] h-[280px] rounded-2xl overflow-hidden relative flex items-center justify-center bg-gradient-to-br from-[#1f1233] via-[#3b1d5c] to-[#0f2a3a]">
                {data.video.poster && (
                    <Image
                        src={data.video.poster}
                        alt="Video poster"
                        fill
                        className="object-cover"
                    />
                )}
                <button
                    className="relative w-16 h-16 rounded-full flex items-center justify-center shadow-2xl"
                    style={{ background: courseTheme.gradient, boxShadow: `0 12px 28px ${courseTheme.shadowColor}` }}
                >
                    <Play size={28} className="text-white ml-1" fill="white" />
                </button>
            </div>

            <div className="w-full max-w-[500px] flex flex-col items-center gap-3">
                <div className="w-full flex items-center gap-3">
                    <span className="text-[12px] font-medium" style={{ color: courseTheme.primaryColor }}>
                        {data.video.currentLabel ?? "00:00"}
                    </span>
                    <div className="flex-1 h-[3px] bg-slate-200 rounded-full relative">
                        <div
                            className="absolute left-0 top-0 h-full rounded-full"
                            style={{ width: "8%", background: courseTheme.primaryColor }}
                        />
                        <div
                            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
                            style={{ left: "calc(8% - 6px)", background: courseTheme.primaryColor }}
                        />
                    </div>
                    <span className="text-[12px] font-medium text-[#94A3B8]">
                        {data.video.durationLabel ?? "00:00"}
                    </span>
                </div>

                <div className="flex items-center gap-6 mt-2">
                    <button className="text-[14px] font-bold" style={{ color: courseTheme.primaryColor }}>
                        1X
                    </button>
                    <button
                        className="w-9 h-9 rounded-full border-2 flex items-center justify-center"
                        style={{ borderColor: courseTheme.primaryColor, color: courseTheme.primaryColor }}
                    >
                        <RotateCcw size={16} strokeWidth={2.5} />
                    </button>
                    <button
                        className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                        style={{ background: courseTheme.gradient, boxShadow: `0 8px 20px ${courseTheme.shadowColor}` }}
                    >
                        <Play size={22} className="text-white ml-0.5" fill="white" />
                    </button>
                    <button
                        className="w-9 h-9 rounded-full border-2 flex items-center justify-center"
                        style={{ borderColor: courseTheme.primaryColor, color: courseTheme.primaryColor }}
                    >
                        <RotateCw size={16} strokeWidth={2.5} />
                    </button>
                    <button
                        className="w-9 h-9 rounded-full border-2 flex items-center justify-center"
                        style={{ borderColor: courseTheme.primaryColor, color: courseTheme.primaryColor }}
                    >
                        <Maximize2 size={14} strokeWidth={2.5} />
                    </button>
                </div>
            </div>
        </div>
    );
}

function InfographicTab({ data }: { data: PresentationTabsData }) {
    return (
        <div className="w-full flex flex-col items-center animate-fade-in pt-4">
            <div className="w-[520px] max-w-full aspect-[16/10] rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-[0_8px_32px_rgba(0,0,0,0.06)] flex items-center justify-center">
                <Image
                    src={data.infographic.image}
                    alt={data.infographic.alt ?? "Infographic"}
                    width={520}
                    height={325}
                    className="object-contain"
                />
            </div>
        </div>
    );
}

function VinylRecord() {
    return (
        <svg width="220" height="220" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="110" cy="110" r="110" fill="#0F0F0F" />
            <circle cx="110" cy="110" r="100" stroke="#1F1F1F" strokeWidth="1" />
            <circle cx="110" cy="110" r="85" stroke="#1F1F1F" strokeWidth="1" />
            <circle cx="110" cy="110" r="70" stroke="#1F1F1F" strokeWidth="1" />
            <circle cx="110" cy="110" r="55" stroke="#1F1F1F" strokeWidth="1" />
            <circle cx="110" cy="110" r="42" fill="#FCE8DA" />
            <path d="M110 68 A 42 42 0 0 1 152 110 L 110 110 Z" fill="#F9C7A1" />
            <circle cx="110" cy="110" r="6" fill="#0F0F0F" />
        </svg>
    );
}
