"use client";
import { useEffect } from "react";

interface TaskStreakRewardProps {
    count: number;
    onDismiss: () => void;
    autoDismissMs?: number;
}

export function TaskStreakReward({ count, onDismiss, autoDismissMs = 2200 }: TaskStreakRewardProps) {
    useEffect(() => {
        const t = setTimeout(onDismiss, autoDismissMs);
        return () => clearTimeout(t);
    }, [onDismiss, autoDismissMs]);

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-auto bg-white/70 backdrop-blur-sm animate-fade-in">
            <button
                onClick={onDismiss}
                aria-label="Dismiss reward"
                className="absolute inset-0 cursor-default"
            />
            <div className="relative flex flex-col items-center gap-6 animate-scale-in">
                <div className="relative w-[180px] h-[180px] flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #FFA726 0%, transparent 70%)" }} />
                    <div className="absolute inset-2 rounded-full animate-[pulse_1.6s_ease-in-out_infinite]" style={{ background: "radial-gradient(circle, #FFB72D 0%, transparent 70%)", opacity: 0.4 }} />
                    <div
                        className="relative w-[140px] h-[140px] rounded-full flex items-center justify-center shadow-2xl"
                        style={{
                            background: "linear-gradient(180deg, #FFCD55 0%, #FF7A1F 100%)",
                            boxShadow: "0 25px 50px -12px rgba(255,138,32,0.55)"
                        }}
                    >
                        <FireIcon />
                    </div>
                </div>

                <div className="flex flex-col items-center gap-1">
                    <span className="text-[44px] font-extrabold tracking-tight" style={{ color: "#FF7A1F" }}>
                        {count} in a row!
                    </span>
                    <p className="text-[16px] font-medium text-[#475569]">
                        Keep going — you&apos;re on fire!
                    </p>
                </div>
            </div>
        </div>
    );
}

function FireIcon() {
    return (
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M32 6c2 6-2 10-6 14-5 5-10 11-10 20a16 16 0 0 0 32 0c0-6-3-10-6-14 1 6-2 8-4 8 1-10-3-20-6-28z"
                fill="white"
            />
            <path
                d="M32 22c1 4-1 7-3 9-3 3-5 6-5 11a8 8 0 0 0 16 0c0-4-2-6-4-9 1 4-2 5-3 5 0-6-1-12-1-16z"
                fill="#FF7A1F"
                opacity="0.5"
            />
        </svg>
    );
}
