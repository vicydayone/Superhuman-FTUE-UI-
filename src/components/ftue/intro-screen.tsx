"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** Gradient checkmark (cyan → violet) matching the Figma loading-step check. */
function GradientCheck({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <defs>
        <linearGradient id="intro-check-grad" x1="3" y1="6" x2="21" y2="18" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1ca5d7" />
          <stop offset="1" stopColor="#8655d6" />
        </linearGradient>
      </defs>
      <path
        d="M5 12.5l4.2 4.2L19 7"
        stroke="url(#intro-check-grad)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const STEPS = [
  "Sorting your email",
  "Learning your patterns",
  "Personalizing your setup",
];

/**
 * Transition screen — "Connected. Now we make it yours." Items check off in
 * sequence, then the flow auto-advances. Clicking anywhere skips ahead.
 */
export function IntroScreen({ onContinue }: { onContinue: () => void }) {
  const [done, setDone] = useState(0);

  useEffect(() => {
    const timers = STEPS.map((_, i) =>
      setTimeout(() => setDone((d) => Math.max(d, i + 1)), 700 * (i + 1)),
    );
    const advance = setTimeout(onContinue, 5000);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(advance);
    };
  }, [onContinue]);

  return (
    <button
      type="button"
      onClick={onContinue}
      aria-label="Continue"
      className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-8 text-center"
    >
      {/*
        Arc spinner — conic-gradient ring so gradient follows the arc path.
        from 90deg = starts at 3 o'clock (head, solid blue).
        86% ≈ 310°/360° — arc coverage before the gap turns transparent.
        Mask punches out the ring shape: 27–33px from center = 6px stroke.
      */}
      <div
        aria-hidden
        className="animate-spin"
        style={{
          width: 72,
          height: 72,
          borderRadius: "50%",
          background:
            "conic-gradient(from 90deg, #1ca5d7 0%, #8655d6 35%, rgba(134,85,214,0) 86%, rgba(134,85,214,0) 100%)",
          WebkitMask:
            "radial-gradient(circle, transparent 26px, black 26.5px, black 32.5px, transparent 33px)",
          mask: "radial-gradient(circle, transparent 26px, black 26.5px, black 32.5px, transparent 33px)",
          animationDuration: "1.4s",
          animationTimingFunction: "linear",
        }}
      />

      {/* Gradient heading — lavender → stepper-blue */}
      <div className="flex flex-col items-center gap-3">
        <h1
          className="text-[34px] font-semibold leading-tight"
          style={{
            // Exact Figma gradient (node 1838:12704) — vibrant cyan → violet.
            background: "linear-gradient(95.71deg, rgb(28, 165, 215) 7.86%, rgb(134, 85, 214) 87.96%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Welcome, let’s set up your inbox.
        </h1>
        <p className="whitespace-nowrap text-[15px] leading-normal text-ink-subdued">
          Now that your account is connected, we’ll help you get organized.
        </p>
      </div>

      {/* Checklist pills */}
      <div className="flex flex-col gap-2.5">
        {STEPS.map((label, i) => {
          const complete = i < done;
          return (
            <div
              key={label}
              className={cn(
                "flex items-center justify-between gap-3 rounded-[10px] border border-black/8 bg-white/60 px-4 py-2.5 text-[13px] font-ui backdrop-blur-sm transition-all duration-500",
                complete ? "text-ink" : "text-ink-subdued opacity-60",
              )}
            >
              <span>{label}…</span>
              <GradientCheck
                className={cn(
                  "size-[18px] shrink-0 transition-opacity duration-300",
                  complete ? "opacity-100" : "opacity-0",
                )}
              />
            </div>
          );
        })}
      </div>
    </button>
  );
}
