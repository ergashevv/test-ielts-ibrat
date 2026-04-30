"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { courseCatalog } from "@/data/courseCatalog";
import type { CourseId } from "@/types";

const modules: { id: CourseId; title: string; icon: string; href: string }[] = [
    { id: "reading", title: "Reading", icon: "/reading.svg", href: "/courses/reading" },
    { id: "writing", title: "Writing", icon: "/writing.svg", href: "/courses/writing" },
    { id: "speaking", title: "Speaking", icon: "/speaking.svg", href: "/courses/speaking" },
    { id: "listening", title: "Listening", icon: "/listening.svg", href: "/courses/listening" },
];

export function CourseModuleSidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const currentCourse = modules.find(m => pathname.startsWith(m.href));
    const courseTitle = currentCourse?.title || "Reading";

    return (
        <aside className="w-full flex flex-col">
            {/* Back button */}
            <button
                onClick={() => router.push("/courses")}
                className="flex items-center gap-1 text-[#1E1E1E] font-bold text-[15px] mb-[24px] transition-opacity w-fit hover:opacity-80"
            >
                <ChevronLeft size={18} strokeWidth={2.5} />
                <span>{courseTitle}</span>
            </button>

            {/* Module tabs - active uses the course's own theme color */}
            <div className="flex flex-col gap-[8px]">
                {modules.map((module) => {
                    const isActive = pathname.startsWith(module.href);
                    const theme = courseCatalog[module.id].theme;
                    return (
                        <Link
                            key={module.id}
                            href={module.href}
                            className="flex items-center gap-[12px] px-[16px] py-[12px] rounded-[12px] border transition-all duration-200"
                            style={{
                                backgroundColor: isActive ? theme.lightBg : "#FFFFFF",
                                borderColor: isActive ? theme.primaryColor : "#E8ECF0"
                            }}
                        >
                            <div className="relative w-[20px] h-[20px] shrink-0">
                                <Image
                                    src={module.icon}
                                    alt={module.title}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span
                                className="font-semibold text-[15px]"
                                style={{ color: isActive ? "#0F172A" : "#646464" }}
                            >
                                {module.title}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </aside>
    );
}
