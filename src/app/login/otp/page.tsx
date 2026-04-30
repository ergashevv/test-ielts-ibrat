"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

import { AuthShell } from "@/components/layout/AuthShell";
import { useSendOtp, useVerifyOtp } from "@/hooks/queries/useAuth";
import { ApiError } from "@/lib/api/errors";

function OTPPageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const phone = searchParams.get("phone") ?? "";

    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [timer, setTimer] = useState(119);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const inputRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];

    const verifyOtp = useVerifyOtp();
    const sendOtp = useSendOtp();

    useEffect(() => {
        if (!phone) {
            router.replace("/login");
        }
    }, [phone, router]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    const phoneTail = phone.slice(-4) || "****";

    const handleChange = (index: number, value: string) => {
        if (value.length > 1) value = value[value.length - 1];
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputRefs[index + 1].current?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs[index - 1].current?.focus();
        }
        if (e.key === "Enter") {
            handleVerify();
        }
    };

    const handleVerify = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (otp.some(val => val === "")) return;
        if (!phone) return;

        setErrorMessage(null);

        const code = otp.join("");
        verifyOtp.mutate(
            { phone, code },
            {
                onSuccess: () => {
                    router.push("/courses");
                },
                onError: (err) => {
                    setErrorMessage(
                        err instanceof ApiError
                          ? err.message
                          : "Invalid code. Please try again.",
                    );
                },
            },
        );
    };

    const { executeRecaptcha } = useGoogleReCaptcha();

    const handleResend = async () => {
        if (!phone || timer > 0 || sendOtp.isPending) return;

        if (!executeRecaptcha) {
            setErrorMessage("reCAPTCHA is not ready.");
            return;
        }

        setErrorMessage(null);

        try {
            const captchaToken = await executeRecaptcha("resend_otp");
            sendOtp.mutate(
                { phone, captcha: captchaToken },
                {
                    onSuccess: () => setTimer(119),
                    onError: (err) => {
                        setErrorMessage(
                            err instanceof ApiError
                                ? err.message
                                : "Failed to resend code.",
                        );
                    },
                },
            );
        } catch (error) {
            setErrorMessage("reCAPTCHA execution failed.");
        }
    };

    const verifying = verifyOtp.isPending;
    const resending = sendOtp.isPending;
    const canResend = timer === 0 && !resending;

    return (
        <AuthShell title="Close verification">
            <div className="animate-scale-in flex w-full max-w-[420px] flex-col items-center gap-6">
                <h1 className="w-full text-center text-[24px] font-semibold leading-8 text-[#040D19]">
                    Confirm your phone number
                </h1>

                <p className="w-full text-center text-[16px] font-normal leading-6 text-[#64748B]">
                    We&apos;ve sent a 6-digit verification code to your phone number ending in ****{phoneTail}.
                </p>

                <form onSubmit={handleVerify} className="flex w-full flex-col items-center gap-6">
                    <div className="flex items-start gap-4">
                        {otp.map((digit, idx) => (
                            <input
                                key={idx}
                                ref={inputRefs[idx]}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(idx, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(idx, e)}
                                disabled={verifying}
                                className="size-[56px] rounded-[16px] border-[1.5px] border-[#E2E8F0] bg-[#FDFDFD] text-center text-[24px] font-semibold text-[#0F172A] outline-none transition focus:border-[#8FAFFF] focus:ring-2 focus:ring-[#D9E8FF] disabled:opacity-60"
                            />
                        ))}
                    </div>

                    {errorMessage && (
                        <p className="w-full text-center text-[14px] font-medium leading-5 text-[#DC2626]">
                            {errorMessage}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={verifying || otp.some(val => val === "")}
                        className="flex h-12 w-full items-center justify-center rounded-[16px] border-2 border-[#8FAFFF] bg-gradient-to-b from-[#779DFF] to-[#2D68FF] text-[18px] font-semibold leading-6 text-white transition hover:opacity-95 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {verifying ? (
                            <div className="size-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        ) : (
                            "Verify"
                        )}
                    </button>

                    <button
                        type="button"
                        className="flex h-12 w-full items-center justify-center rounded-[16px] border-[1.5px] border-white bg-[#FDFDFD] text-[18px] font-semibold leading-6 text-[#1E78FE] shadow-[0px_32px_64px_rgba(0,0,0,0.08),0px_4px_24px_rgba(8,8,8,0.04),0px_2px_4px_rgba(8,8,8,0.05)] transition hover:bg-white active:scale-[0.99]"
                    >
                        Enter Via Telegram Bot
                    </button>

                    {canResend ? (
                        <button
                            type="button"
                            onClick={handleResend}
                            disabled={resending}
                            className="text-[16px] font-semibold leading-6 text-[#1E78FE] hover:underline disabled:opacity-60"
                        >
                            {resending ? "Resending..." : "Resend code"}
                        </button>
                    ) : (
                        <p className="text-center text-[16px] leading-6">
                            <span className="font-medium text-[#64748B]">Send code again </span>
                            <span className="font-semibold text-[#0F172A]">{formatTime(timer)}</span>
                        </p>
                    )}
                </form>
            </div>
        </AuthShell>
    );
}

export default function OTPPage() {
    return (
        <Suspense fallback={null}>
            <OTPPageContent />
        </Suspense>
    );
}
