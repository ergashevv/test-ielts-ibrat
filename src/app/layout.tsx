import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ibrat IELTS",
  description: "Ibrat Academy IELTS web app",
};

import { CourseProgressProvider } from "@/context/CourseProgressContext";
import { StreakProvider } from "@/context/StreakContext";
import { QueryProvider } from "@/providers/QueryProvider";
import { GoogleAuthProvider } from "@/providers/GoogleAuthProvider";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ToastProvider } from "@/components/ui/Toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${urbanist.variable} antialiased`}>
        <ErrorBoundary>
          <QueryProvider>
            <ToastProvider>
              <GoogleAuthProvider>
                <CourseProgressProvider>
                  <StreakProvider>
                    {children}
                  </StreakProvider>
                </CourseProgressProvider>
              </GoogleAuthProvider>
            </ToastProvider>
          </QueryProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}

