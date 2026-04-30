"use client";

import React from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export function AuthShell({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const router = useRouter();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F8FAFC] font-[family-name:var(--font-urbanist)]">
      <div className="pointer-events-none absolute left-1/2 top-[-190px] h-[300px] w-[1610px] -translate-x-1/2 rounded-[999px] bg-[radial-gradient(ellipse_at_center,_rgba(214,228,255,0.95)_0%,_rgba(214,228,255,0.6)_35%,_rgba(248,250,252,0)_72%)]" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-[1440px] flex-col px-6 sm:px-10 lg:px-[120px]">
        <header className="flex h-16 items-end">
          <button
            type="button"
            aria-label={title}
            onClick={() => router.back()}
            className="mb-3 inline-flex size-6 items-center justify-center text-[#0F172A] transition-opacity hover:opacity-70"
          >
            <X size={24} strokeWidth={1.7} />
          </button>
        </header>

        <main className="flex flex-1 items-center justify-center pb-16">
          {children}
        </main>
      </div>
    </div>
  );
}
