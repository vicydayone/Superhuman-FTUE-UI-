"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  "Getting to know your inbox",
  "Picking up on your patterns",
  "Drafting a setup that fits",
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
    const advance = setTimeout(onContinue, 700 * STEPS.length + 900);
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
            "conic-gradient(from 90deg, #7ba4d8 0%, #b8a8e0 30%, rgba(212,184,232,0) 86%, rgba(212,184,232,0) 100%)",
          WebkitMask:
            "radial-gradient(circle, transparent 26px, black 26.5px, black 32.5px, transparent 33px)",
          mask: "radial-gradient(circle, transparent 26px, black 26.5px, black 32.5px, transparent 33px)",
          animationDuration: "1.4s",
          animationTimingFunction: "linear",
        }}
      />

      {/* Gradient heading — lavender → stepper-blue */}
      <h1
        className="text-[34px] font-semibold leading-tight"
        style={{
          background: "linear-gradient(135deg, #aeb1dd 0%, #5f74aa 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        Connected.
        <br />
        Now we make it yours.
      </h1>

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
              <span>{label}</span>
              <Check
                className={cn(
                  "size-3.5 shrink-0 text-stepper transition-opacity duration-300",
                  complete ? "opacity-100" : "opacity-0",
                )}
                strokeWidth={2.5}
              />
            </div>
          );
        })}
      </div>
    </button>
  );
}
