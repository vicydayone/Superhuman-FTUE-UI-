"use client";

import { cn } from "@/lib/utils";

/**
 * Chapter 1 landing template (Figma node 1747:15515 "for buildung"). A
 * full-bleed Lake Wanaka photo with a soft blue→violet wash, the SUPERHUMAN
 * MAIL wordmark, and a white card. The welcome and sign-in screens share this
 * shell and only swap the card body — matching the two Figma frames exactly.
 */
function AuthLanding({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      {/* Mountain photo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/auth-bg.png)" }}
      />
      {/* Blue→violet wash (Figma: linear 180deg #1d5e9a/.5 → #9226e8/.1) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1d5e9a]/45 via-[#6a5bb5]/20 to-[#9226e8]/15" />

      {/* Content column */}
      <div className="relative z-10 flex w-full max-w-[560px] flex-col items-center gap-9 px-6 sm:gap-11">
        {/* SUPERHUMAN MAIL wordmark (white). Dimensions pinned to the Figma
            271.64 × 16.85 ratio — the SVG declares width/height 100% so an
            auto dimension won't track the viewBox reliably. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/superhuman-logo.svg"
          alt="SUPERHUMAN MAIL"
          className="h-[14px] w-[226px] sm:h-[15px] sm:w-[242px]"
        />

        <div className="w-full rounded-[6px] bg-white px-8 py-8 shadow-[0_24px_70px_rgba(30,24,70,0.22)] sm:px-[60px] sm:py-12">
          {children}
        </div>
      </div>
    </div>
  );
}

/** Solid lavender pill button shared by both landing screens. */
function AuthButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-[54px] w-full rounded-[6px] bg-[#8797cd] text-[16px] font-semibold text-white",
        "shadow-[0px_12px_23px_rgba(0,0,0,0.15)] transition-colors duration-200",
        "hover:bg-[#7888c4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:h-[62px] sm:text-[18px]",
      )}
    >
      {children}
    </button>
  );
}

const HEADING = "The most productive email app ever made.";

const headingClass =
  "text-center text-[23px] font-normal leading-[1.15] text-black/60 sm:text-[31px]";

/** Screen 1 — welcome. Single "Get Started Now" CTA + a download link. */
export function WelcomeScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <AuthLanding>
      <div className="flex flex-col items-center gap-8 sm:gap-10">
        <h1 className={headingClass}>{HEADING}</h1>
        <div className="flex w-full max-w-[407px] flex-col items-center gap-4">
          <AuthButton onClick={onContinue}>Get Started Now</AuthButton>
          <button
            type="button"
            onClick={onContinue}
            className="text-[13px] text-black/45 transition-colors hover:text-black/60"
          >
            Want native? <span className="text-[#8797cd]">Download here</span>
          </button>
        </div>
      </div>
    </AuthLanding>
  );
}

/** Screen 2 — sign in. Google / Microsoft provider buttons. */
export function SignInScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <AuthLanding>
      <div className="flex flex-col items-center gap-8 sm:gap-10">
        <h1 className={headingClass}>{HEADING}</h1>
        <div className="flex w-full max-w-[407px] flex-col gap-[15px]">
          <AuthButton onClick={onContinue}>Sign in with Google</AuthButton>
          <AuthButton onClick={onContinue}>Sign in with Microsoft</AuthButton>
        </div>
      </div>
    </AuthLanding>
  );
}
