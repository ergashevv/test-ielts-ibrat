"use client";
import React from "react";
import Image from "next/image";
import { Promo } from "@/types";

interface PromoCardProps {
  promo: Promo;
}

export function PromoCard({ promo }: PromoCardProps) {
  return (
    <div className="group relative h-[212px] w-[400px] shrink-0 overflow-hidden rounded-[16px] border border-white bg-white p-4 shadow-[0px_32px_64px_rgba(0,0,0,0.08),0px_4px_24px_rgba(8,8,8,0.04),0px_2px_4px_rgba(8,8,8,0.05)]">
      <div className="relative z-10 flex flex-col gap-2">
        <h3 className="max-w-[300px] text-[20px] font-semibold leading-7 text-[#0F172A]">
          {promo.title}
        </h3>
        <p className="max-w-[236px] text-[14px] font-medium leading-5 text-[#64748B]">
          {promo.description}
        </p>
      </div>

      <div className="absolute bottom-4 left-4 z-10">
        <button className="flex h-10 items-center justify-center rounded-[12px] border-2 border-[#8FAFFF] bg-gradient-to-b from-[#779DFF] to-[#2D68FF] px-8 text-[18px] font-semibold leading-6 text-white transition hover:opacity-95 active:scale-[0.98]">
          Use
        </button>
      </div>

      {/* Illustration */}
      <div className="pointer-events-none absolute left-[268px] top-[58px] h-[152px] w-[131px] transition-transform duration-500 group-hover:scale-105">
        <div className="relative w-full h-full">
          <Image
            src={promo.image}
            alt="Promo Illustration"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
