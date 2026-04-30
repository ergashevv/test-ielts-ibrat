"use client";
import React from "react";
import { CheckCircle2, Circle, Lock } from "lucide-react";
import { Section } from "@/types";

interface CourseSidebarProps {
    sections: Section[];
    currentSectionId?: string;
}

export function CourseSidebar({ sections, currentSectionId }: CourseSidebarProps) {
    return (
        <aside className="w-80 border-l border-slate-100 bg-white h-[calc(100vh-80px)] overflow-y-auto sticky top-20 p-8 hidden xl:block">
            <h2 className="text-xl font-black text-slate-900 mb-8 px-2">Course Sections</h2>

            <div className="space-y-10">
                {sections.map((section) => (
                    <div key={section.id} className="relative">
                        <div className="flex items-center gap-3 mb-4 px-2">
                            <div className="size-2 rounded-full bg-ielts-blue animate-pulse" />
                            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">{section.title}</h3>
                        </div>

                        <div className="space-y-2">
                            {section.tasks.map((task, idx) => {
                                const isCompleted = false; // Mock
                                const isCurrent = task.id === currentSectionId;
                                const isLocked = false; // Mock

                                return (
                                    <div
                                        key={task.id}
                                        className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${isCurrent
                                                ? "border-ielts-blue bg-blue-50/50 shadow-sm"
                                                : "border-transparent hover:bg-slate-50"
                                            } ${isLocked ? "opacity-50 grayscale" : "cursor-pointer"}`}
                                    >
                                        <div className="flex-shrink-0">
                                            {isCompleted ? (
                                                <CheckCircle2 size={20} className="text-green-500" strokeWidth={2.5} />
                                            ) : isLocked ? (
                                                <Lock size={20} className="text-slate-400" />
                                            ) : (
                                                <Circle size={20} className={isCurrent ? "text-ielts-blue" : "text-slate-300"} strokeWidth={2.5} />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className={`text-sm font-bold truncate ${isCurrent ? "text-slate-900" : "text-slate-500"}`}>
                                                {task.title}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </aside>
    );
}
