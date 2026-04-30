"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";

import { AuthShell } from "@/components/layout/AuthShell";
import { useGoogleSignIn, useSendOtp } from "@/hooks/queries/useAuth";
import { ApiError } from "@/lib/api/errors";

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";

export default function LoginPage() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const sendOtp = useSendOtp();
  const googleSignIn = useGoogleSignIn();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const rawDigits = phoneNumber.replace(/\D/g, "");
    if (rawDigits.length !== 9) return;

    setErrorMessage(null);
    const phone = `+998${rawDigits}`;

    sendOtp.mutate(
      { phone },
      {
        onSuccess: () => {
          router.push(`/login/otp?phone=${encodeURIComponent(phone)}`);
        },
        onError: (err) => {
          setErrorMessage(
            err instanceof ApiError
              ? err.message
              : "Failed to send OTP. Please try again.",
          );
        },
      },
    );
  };

  const handleGoogleSuccess = (response: CredentialResponse) => {
    const idToken = response.credential;
    if (!idToken) {
      setErrorMessage("Google sign-in returned no credential.");
      return;
    }
    setErrorMessage(null);
    googleSignIn.mutate(
      { idToken },
      {
        onSuccess: () => router.push("/courses"),
        onError: (err) => {
          setErrorMessage(
            err instanceof ApiError
              ? err.message
              : "Google sign-in failed. Please try again.",
          );
        },
      },
    );
  };

  const handleGoogleError = () => {
    setErrorMessage("Google sign-in was cancelled or failed.");
  };

  const loading = sendOtp.isPending;

  return (
    <AuthShell title="Close login">
      <div className="animate-scale-in flex w-full max-w-[420px] flex-col items-center gap-6">
        <h1 className="w-full text-[24px] font-semibold leading-8 text-[#040D19]">
          Log in to IELTS
        </h1>

        <form onSubmit={handleLogin} className="flex w-full flex-col gap-6">
          <div className="flex w-full items-center gap-2">
            <div className="flex h-12 items-center gap-2 rounded-[16px] border border-[#E2E8F0] bg-white px-4">
              <span className="text-[18px] leading-none">🇺🇿</span>
              <span className="text-[16px] font-medium leading-6 text-[#94A3B8]">+998</span>
            </div>

            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => {
                let value = e.target.value.replace(/\D/g, "");
                if (value.length > 9) value = value.slice(0, 9);

                let formattedValue = value;
                if (value.length > 2) {
                  formattedValue = `${value.slice(0, 2)} ${value.slice(2)}`;
                }
                if (value.length > 5) {
                  formattedValue = `${value.slice(0, 2)} ${value.slice(2, 5)} ${value.slice(5)}`;
                }
                if (value.length > 7) {
                  formattedValue = `${value.slice(0, 2)} ${value.slice(2, 5)} ${value.slice(5, 7)} ${value.slice(7)}`;
                }

                setPhoneNumber(formattedValue);
              }}
              placeholder="Phone number"
              className="h-12 min-w-0 flex-1 rounded-[16px] border border-[#E2E8F0] bg-white px-4 text-[16px] font-medium leading-6 text-[#0F172A] outline-none transition focus:border-[#8FAFFF] focus:ring-2 focus:ring-[#D9E8FF] placeholder:text-[#94A3B8]"
              required
            />
          </div>

          <div className="flex flex-col gap-4">
            {errorMessage && (
              <p className="text-[14px] font-medium leading-5 text-[#DC2626]">
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || phoneNumber.replace(/\D/g, "").length !== 9}
              className="flex h-12 w-full items-center justify-center rounded-[16px] border-2 border-[#8FAFFF] bg-gradient-to-b from-[#779DFF] to-[#2D68FF] text-[18px] font-semibold leading-6 text-white transition hover:opacity-95 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <div className="size-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              ) : (
                "Continue"
              )}
            </button>

            <div className="flex items-center gap-[15px]">
              <div className="h-px flex-1 bg-[#E2E8F0]" />
              <span className="text-[16px] font-medium leading-6 text-[#64748B]">or</span>
              <div className="h-px flex-1 bg-[#E2E8F0]" />
            </div>

            <div className="relative h-12 w-full">
              <button
                type="button"
                disabled={!GOOGLE_CLIENT_ID || googleSignIn.isPending}
                className="flex h-12 w-full items-center justify-center gap-3 rounded-[16px] border border-[#E2E8F0] bg-white text-[18px] font-semibold leading-6 text-[#0F172A] transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <svg className="size-6" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Continue With Google
              </button>

              {GOOGLE_CLIENT_ID && !googleSignIn.isPending && (
                <div className="absolute inset-0 cursor-pointer opacity-0 [&>div]:!h-full [&>div]:!w-full [&_iframe]:!h-full [&_iframe]:!w-full">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                    size="large"
                    width="380"
                  />
                </div>
              )}
            </div>
          </div>
        </form>

        <p className="w-full text-center text-[14px] font-medium leading-5 text-[#64748B]">
          <span>By continuing, you agree to our </span>
          <a href="#" className="text-[#1E78FE] hover:underline">Terms of Use</a>
          <span> and </span>
          <a href="#" className="text-[#1E78FE] hover:underline">Privacy Policy.</a>
        </p>
      </div>
    </AuthShell>
  );
}
