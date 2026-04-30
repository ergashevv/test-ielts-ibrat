"use client";
import Image from "next/image";
import { useMe } from "@/hooks/queries/useUser";

export function AppHeader() {
  const { data: user, isLoading } = useMe();

  const fullName = user?.fullName?.trim() || "";
  const avatarSrc = user?.avatarUrl || user?.avatar || "/Avatar.svg";

  return (
    <header className="fixed left-0 top-0 z-50 flex h-[80px] w-full justify-center border-b border-[#E2E8F0] bg-white">
      <div className="flex h-full w-full max-w-[1440px] items-center justify-between px-6 sm:px-10 lg:px-24">
        {/* Logo Section */}
        <div className="flex items-center gap-4">
          <div className="relative h-12 w-[237px]">
            <Image
              src="/Web logo.svg"
              alt="Ibrat Academy IELTS"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* User Section */}
        <div className="flex items-center gap-3">
          <span className="text-[14px] font-normal leading-5 text-[#64748B]">
            {isLoading ? "" : fullName}
          </span>
          <div className="relative size-10 overflow-hidden rounded-full bg-[#F1F5F9]">
            <Image
              src={avatarSrc}
              alt={fullName || "User"}
              fill
              className="object-cover p-1"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
