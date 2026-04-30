"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const skillItems = [
    { id: "reading", label: "Reading", icon: "/reading.svg", color: "#4F81FF", href: "/courses/reading" },
    { id: "writing", label: "Writing", icon: "/writing.svg", color: "#FF5C35", href: "/courses/writing" },
    { id: "speaking", label: "Speaking", icon: "/speaking.svg", color: "#6BCB77", href: "/courses/speaking" },
    { id: "listening", label: "Listening", icon: "/listening.svg", color: "#B186FF", href: "/courses/listening" },
];

export function CourseDetailSidebar() {
    const pathname = usePathname();

    return (
        <div className="flex flex-col gap-3 w-[294px]">
            {skillItems.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                    <Link
                        key={item.id}
                        href={item.href}
                        className={`flex items-center gap-4 px-5 h-[54px] rounded-[16px] transition-all border-[1.5px] shadow-sm ${isActive
                            ? "bg-[#E9F2FF] text-[#4F81FF] border-[#D0E4FF] font-extrabold"
                            : "bg-white text-slate-600 border-[#F1F5F9] hover:bg-slate-50 font-bold"
                            }`}
                    >
                        <div className="relative w-6 h-6 flex-shrink-0">
                            <Image src={item.icon} alt={item.label} fill className="object-contain" />
                        </div>
                        <span className="text-[15px]">{item.label}</span>
                    </Link>
                );
            })}
        </div>
    );
}
