"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SidebarNav } from "./SidebarNav";

export function GlobalSidebar() {
    return (
        <aside className="w-[280px] bg-white border-r border-[#F1F5F9] hidden lg:flex flex-col h-screen sticky top-0 px-8 py-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
            {/* Logo Section */}
            <div className="flex items-center gap-3 mb-10 px-2 group cursor-pointer">
                <div className="relative w-48 h-10 transition-transform group-hover:scale-[1.02]">
                    <Image
                        src="/Web logo.svg"
                        alt="Ibrat Academy IELTS"
                        fill
                        className="object-contain"
                    />
                </div>
            </div>

            <nav className="flex-1">
                <SidebarNav />
            </nav>

            {/* Bottom Section - Logout */}
            <div className="mt-auto px-2 border-t border-slate-50 pt-8">
                <button className="flex items-center gap-4 text-[#94A3B8] font-bold text-sm hover:text-[#FF4F4F] transition-all group w-full">
                    <div className="size-6 relative opacity-50 group-hover:opacity-100 transition-opacity">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                            <path d="M15 12H3M3 12L7 16M3 12L7 8M9 4H17C18.1046 4 19 4.89543 19 6V18C19 19.1046 18.1046 20 17 20H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <span className="font-black">Log Out</span>
                </button>
            </div>
        </aside>
    );
}
