"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FlowStep } from "@/lib/types";

/**
 * Which screens each active step's progress segments map to, so the bars
 * double as navigation. Chapter 2 has 2 segments, Chapter 3 has 5.
 */
const SEGMENT_TARGETS: Record<2 | 3, (FlowStep | undefined)[]> = {
  2: ["auto-archive", "split-inbox"],
  3: ["auto-draft", "auto-reminder", "ask-ai", "seats", "done"],
};

const STEPS: { label: string; doneTarget?: FlowStep }[] = [
  { label: "Connect your account" },
  { label: "Organize your Inbox", doneTarget: "split-inbox" },
  { label: "Accelerate your workflow" },
];

// Duration of the fade-out phase before content swaps, and the fade-in after.
const FADE_MS = 280;

/**
 * Top onboarding stepper with smooth cross-fade between chapters.
 *
 * When `activeStep` changes, the addons (progress bars / checkmark) first fade
 * out over FADE_MS, then the content swaps and fades back in. Label colors
 * transition continuously via CSS so the text never snaps.
 */
export function Stepper({
  activeStep,
  progress = 0,
  onNavigate,
  className,
}: {
  activeStep: 2 | 3 | "done";
  progress?: number;
  onNavigate?: (step: FlowStep) => void;
  className?: string;
}) {
  // `displayed` lags behind `activeStep` during a chapter transition so we can
  // fade the old addons out before swapping content.
  const [displayed, setDisplayed] = useState<2 | 3 | "done">(activeStep);
  // 0 = stable, 1 = fading-out (old content), 2 = fading-in (new content)
  const [phase, setPhase] = useState<0 | 1 | 2>(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (activeStep === displayed) return;
    // Clear any in-flight timers from a rapid step change.
    timers.current.forEach(clearTimeout);
    timers.current = [];

    setPhase(1); // fade out current addons
    timers.current.push(
      setTimeout(() => {
        setDisplayed(activeStep); // swap content
        setPhase(2);              // fade in new addons
      }, FADE_MS),
    );
    timers.current.push(
      setTimeout(() => setPhase(0), FADE_MS * 2), // settled
    );
    return () => timers.current.forEach(clearTimeout);
  }, [activeStep]); // eslint-disable-line react-hooks/exhaustive-deps

  // Addon opacity: fade out on phase 1, fade in on phase 2+.
  const addonOpacity = phase === 1 ? 0 : 1;

  const activeIndex = displayed === "done" ? STEPS.length : displayed - 1;

  return (
    <header
      className={cn(
        "flex w-full items-center justify-center gap-20 bg-white px-[100px] py-4 font-ui",
        className,
      )}
    >
      {STEPS.map((step, i) => {
        // State is derived from `displayed` (not `activeStep`) so it doesn't
        // jump ahead while the fade-out is still playing.
        const state =
          i < activeIndex ? "done" : i === activeIndex ? "active" : "upcoming";

        const label = (
          <span className="relative inline-block whitespace-nowrap text-[14px] tracking-[-0.2px]">
            {/* Invisible bold copy keeps the container width constant so
                nothing shifts when the active weight changes. */}
            <span aria-hidden className="invisible font-bold">
              {step.label}
            </span>
            <span
              className={cn(
                "absolute inset-0 transition-colors duration-500",
                state === "active"
                  ? "font-bold text-stepper"
                  : state === "done"
                    ? "text-stepper"
                    : "text-ink-subdued",
              )}
            >
              {step.label}
            </span>
          </span>
        );

        let addon: React.ReactNode = null;
        if (state === "done") {
          addon = <Check className="size-3 text-stepper" strokeWidth={2.5} />;
        } else if (state === "active") {
          const targets = SEGMENT_TARGETS[displayed as 2 | 3];
          const count = targets.length;
          addon = (
            <div className="flex items-center gap-0.5">
              {targets.map((target, seg) => {
                const filled = seg < progress;
                const bar = (
                  <span
                    className={cn(
                      "block h-[5px] w-full transition-colors duration-300",
                      seg === 0 && "rounded-l-[3px] rounded-r-[1px]",
                      seg > 0 && seg < count - 1 && "rounded-[1px]",
                      seg === count - 1 && "rounded-l-[1px] rounded-r-[3px]",
                      filled
                        ? seg === 0
                          ? "bg-stepper/90"
                          : "bg-stepper-mid"
                        : "bg-[#e5e5e5]",
                    )}
                  />
                );
                if (!onNavigate || !target) return <span key={seg} className="w-3">{bar}</span>;
                return (
                  <button
                    key={seg}
                    type="button"
                    onClick={() => onNavigate(target)}
                    aria-label={`Go to ${target}`}
                    className="-my-2 flex w-3 items-center py-2 transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stepper/50"
                  >
                    {bar}
                  </button>
                );
              })}
            </div>
          );
        }

        const navTarget = state === "done" ? step.doneTarget : undefined;

        return (
          <div key={step.label} className="relative flex items-center">
            {onNavigate && navTarget ? (
              <button
                type="button"
                onClick={() => onNavigate(navTarget)}
                className="transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stepper/50"
              >
                {label}
              </button>
            ) : (
              label
            )}
            {addon && (
              <span
                className="absolute left-full top-1/2 ml-2 flex -translate-y-1/2 items-center"
                style={{
                  opacity: addonOpacity,
                  transition: `opacity ${FADE_MS}ms ease-out`,
                }}
              >
                {addon}
              </span>
            )}
          </div>
        );
      })}
    </header>
  );
}
