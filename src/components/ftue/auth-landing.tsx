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
      {/* Lake Wanaka dusk photo. Swap this file (public/auth-bg.png) for the
          new purple-toned shot — no code change needed. */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/auth-bg.png)" }}
      />
      {/* Soft top-down darkening for wordmark contrast (image is already tinted). */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/12 via-black/5 to-transparent" />

      {/* Content column */}
      <div className="relative z-10 flex w-full max-w-[460px] flex-col items-center gap-7 px-6 sm:gap-9">
        {/* SUPERHUMAN MAIL wordmark (white). */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/superhuman-logo.svg"
          alt="SUPERHUMAN MAIL"
          className="h-[12px] w-[190px] sm:h-[13px] sm:w-[205px]"
        />

        <div className="w-full rounded-[6px] bg-white px-7 py-7 shadow-[0_24px_70px_rgba(30,24,70,0.22)] sm:px-[48px] sm:py-10">
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
        "h-[46px] w-full rounded-[6px] bg-[#8797cd] text-[15px] font-semibold text-white",
        "shadow-[0px_12px_23px_rgba(0,0,0,0.15)] transition-colors duration-200",
        "hover:bg-[#7888c4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:h-[52px] sm:text-[16px]",
      )}
    >
      {children}
    </button>
  );
}

const HEADING = "The most productive email app ever made.";

const headingClass =
  "text-center text-[20px] font-normal leading-[1.15] text-black/60 sm:text-[26px]";

/** Screen 1 — welcome. Single "Get Started Now" CTA + a download link. */
export function WelcomeScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <AuthLanding>
      <div className="flex flex-col items-center gap-6 sm:gap-8">
        <h1 className={headingClass}>{HEADING}</h1>
        <div className="flex w-full max-w-[340px] flex-col items-center gap-4">
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

/**
 * Screen 2 — sign in. Google / Microsoft provider buttons skip straight to
 * the Welcome Loading screen by default. A hidden "Sign in prototype" link
 * (bottom-right) is the only way to walk through the full Google auth
 * mockup (account picker → consent → scopes → signing-in).
 */
export function SignInScreen({
  onContinue,
  onPrototypeSignIn,
}: {
  onContinue: () => void;
  onPrototypeSignIn?: () => void;
}) {
  return (
    <AuthLanding>
      <div className="flex flex-col items-center gap-6 sm:gap-8">
        <h1 className={headingClass}>{HEADING}</h1>
        <div className="flex w-full max-w-[340px] flex-col gap-[13px]">
          <AuthButton onClick={onContinue}>Sign in with Google</AuthButton>
          <AuthButton onClick={onContinue}>Sign in with Microsoft</AuthButton>
        </div>
      </div>
      {onPrototypeSignIn && (
        <button
          type="button"
          onClick={onPrototypeSignIn}
          className="absolute bottom-2 right-2 text-[10px] text-black/10 transition-colors hover:text-black/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        >
          Sign in prototype
        </button>
      )}
    </AuthLanding>
  );
}
