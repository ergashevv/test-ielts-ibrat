"use client";
import { SidebarNav } from "@/components/layout/SidebarNav";
import { AppHeader } from "@/components/layout/AppHeader";
import { CourseCard } from "@/components/courses/CourseCard";
import { PromoCard } from "@/components/courses/PromoCard";
import { useCourses } from "@/hooks/queries";
import { mockPromos } from "@/data/mock";

export default function CoursesPage() {
  const { data: courses = [], isLoading } = useCourses();

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-[family-name:var(--font-urbanist)]">
      <AppHeader />

      <div className="mx-auto flex w-full max-w-[1440px] gap-6 px-6 pb-12 pt-36 sm:px-10 lg:px-24">
        <aside className="w-[294px] shrink-0">
          <SidebarNav />
        </aside>

        <main className="flex flex-1 items-start gap-6">
          <div className="grid w-[506px] shrink-0 grid-cols-2 gap-6">
            {isLoading && courses.length === 0 ? (
              Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className="h-[270px] w-[241px] animate-pulse rounded-[16px] border-[1.5px] border-white bg-[#FDFDFD] shadow-[0px_32px_64px_rgba(0,0,0,0.08),0px_4px_24px_rgba(8,8,8,0.04),0px_2px_4px_rgba(8,8,8,0.05)]"
                />
              ))
            ) : courses.length === 0 ? (
              <div className="col-span-2 flex h-[270px] items-center justify-center rounded-[16px] border border-[#E2E8F0] bg-[#FDFDFD] px-6 text-center text-[14px] font-medium text-[#64748B]">
                No courses returned from API.
              </div>
            ) : (
              courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))
            )}
          </div>

          <aside className="w-[400px] shrink-0">
            <PromoCard promo={mockPromos[0]} />
          </aside>
        </main>
      </div>
    </div>
  );
}
