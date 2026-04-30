"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Course } from "@/types";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const progressColor =
    course.theme === "blue"
      ? "linear-gradient(180deg, #779DFF 0%, #2D68FF 100%)"
      : course.theme === "purple"
        ? "linear-gradient(180deg, #C197FF 0%, #9259E8 100%)"
        : course.theme === "red"
          ? "linear-gradient(180deg, #FFD6CC 0%, #FF8D70 100%)"
          : "linear-gradient(180deg, #B8E6BD 0%, #6BCB77 100%)";

  return (
    <Link href={`/courses/${course.id}`}>
      <div className="flex h-[270px] w-[241px] cursor-pointer flex-col gap-3 overflow-hidden rounded-[16px] border-[1.5px] border-white bg-[#FDFDFD] px-2 pb-3 pt-2 shadow-[0px_32px_64px_rgba(0,0,0,0.08),0px_4px_24px_rgba(8,8,8,0.04),0px_2px_4px_rgba(8,8,8,0.05)] transition-transform duration-200 hover:-translate-y-0.5">
        <div
          className="relative mb-0 flex h-[170px] w-full shrink-0 items-center justify-center overflow-hidden rounded-[12px]"
          style={{ backgroundColor: course.backgroundColor }}
        >
          <div className="relative h-24 w-24 drop-shadow-[0_10px_22px_rgba(15,23,42,0.12)] transition-transform duration-300 hover:scale-[1.03]">
            {course.icon.startsWith('/') ? (
              <Image src={course.icon} alt={course.title} fill className="object-contain" />
            ) : (
              <span className="text-4xl drop-shadow-lg">{course.icon}</span>
            )}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex h-full flex-col justify-between px-2">
          <div className="flex flex-col gap-1">
            <p className="text-[14px] font-normal leading-5 text-[#94A3B8]">
              {course.unitCount} Units
            </p>
            <h3 className="line-clamp-2 text-[18px] font-bold leading-7 text-[#0F172A]">
              {course.title}
            </h3>
          </div>

          <div className="mt-auto flex items-center gap-2 pb-0.5">
            <div className="flex h-3 flex-1 overflow-hidden rounded-[8px] bg-[#E2E8F0]">
              <div
                className="h-full rounded-[42px] transition-all duration-1000"
                style={{
                  width: `${course.progress}%`,
                  background: progressColor,
                }}
              />
            </div>
            <span className="text-[12px] font-normal leading-4 text-[rgba(45,47,50,0.8)]">
              {course.progress}%
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
