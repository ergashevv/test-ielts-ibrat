"use client";

import type { ReactNode } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const RECAPTCHA_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

export function CaptchaProvider({ children }: { children: ReactNode }) {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_KEY}>
      {children}
    </GoogleReCaptchaProvider>
  );
}
