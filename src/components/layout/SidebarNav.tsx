"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function SidebarNav() {
  const pathname = usePathname();

  const menuItems = [
    { id: "courses", label: "Courses", icon: "/courses-icon.svg", href: "/courses" },
    { id: "profile", label: "Profile", icon: "/profile-icon.svg", href: "/profile" },
  ];

  return (
    <div className="flex flex-col gap-4">
      {menuItems.map((item) => {
        const isActive = pathname.startsWith(item.href);
        return (
          <Link
            key={item.id}
            href={item.href}
            className={`flex h-12 w-[294px] items-center gap-2 rounded-[16px] border-[1.5px] px-6 py-3 text-[18px] font-semibold leading-6 transition-all ${
              isActive
                ? "border-[#8FAFFF] bg-[#E9F2FF] text-[#0F172A]"
                : "border-white bg-[#FDFDFD] text-[#0F172A] shadow-[0px_32px_64px_rgba(0,0,0,0.08),0px_4px_24px_rgba(8,8,8,0.04),0px_2px_4px_rgba(8,8,8,0.05)]"
            }`}
          >
            <div className="relative w-5 h-5 flex-shrink-0">
              <Image src={item.icon} alt={item.label} fill className="object-contain" />
            </div>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
