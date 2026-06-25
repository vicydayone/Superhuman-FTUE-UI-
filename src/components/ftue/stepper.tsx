"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FlowStep } from "@/lib/types";

const SEGMENT_TARGETS: Record<2 | 3, (FlowStep | undefined)[]> = {
  2: ["auto-archive", "split-inbox"],
  3: ["auto-draft", "auto-reminder", "ask-ai", "seats", "done"],
};

const STEPS: { label: string; chapterStep?: 2 | 3; doneTarget?: FlowStep }[] = [
  { label: "Connect your account" },
  { label: "Organize your Inbox", chapterStep: 2, doneTarget: "split-inbox" },
  { label: "Accelerate your workflow", chapterStep: 3 },
];

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
  const activeIndex = activeStep === "done" ? STEPS.length : (activeStep as number) - 1;

  return (
    <header
      className={cn(
        "flex w-full items-center justify-center gap-20 bg-white px-[100px] py-4 font-ui",
        className,
      )}
    >
      {STEPS.map((step, i) => {
        const isDone = i < activeIndex;
        const isActive = i === activeIndex;

        // Label — bold-sizer keeps width stable when font-weight changes.
        const label = (
          <span className="relative inline-block whitespace-nowrap text-[14px] tracking-[-0.2px]">
            <span aria-hidden className="invisible font-bold">
              {step.label}
            </span>
            <span
              className={cn(
                "absolute inset-0 transition-colors duration-500",
                isActive
                  ? "font-bold text-stepper"
                  : isDone
                    ? "text-stepper"
                    : "text-ink-subdued",
              )}
            >
              {step.label}
            </span>
          </span>
        );

        const navTarget = isDone ? step.doneTarget : undefined;

        return (
          <div key={step.label} className="relative flex items-center">
            {onNavigate && navTarget ? (
              <button
                type="button"
                onClick={() => onNavigate(navTarget!)}
                className="transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stepper/50"
              >
                {label}
              </button>
            ) : (
              label
            )}

            {/* Checkmark — always rendered; fades in when this step is done. */}
            <span
              className="pointer-events-none absolute left-full top-1/2 ml-2 -translate-y-1/2"
              style={{ opacity: isDone ? 1 : 0, transition: "opacity 500ms ease-out" }}
              aria-hidden
            >
              <Check className="size-3 text-stepper" strokeWidth={2.5} />
            </span>

            {/* Progress bar — always rendered for chapters 2 & 3; fades in when
                this chapter is active. Opacity cross-fades with the checkmark
                above, so the bar disappears as the checkmark appears (and vice
                versa) with no DOM swap or position jump. */}
            {step.chapterStep && (
              <span
                className="pointer-events-none absolute left-full top-1/2 ml-2 -translate-y-1/2 flex items-center gap-0.5"
                style={{ opacity: isActive ? 1 : 0, transition: "opacity 500ms ease-out" }}
                aria-hidden
              >
                {SEGMENT_TARGETS[step.chapterStep].map((target, seg) => {
                  const count = SEGMENT_TARGETS[step.chapterStep!].length;
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
                  if (!onNavigate || !target) {
                    return <span key={seg} className="w-3">{bar}</span>;
                  }
                  return (
                    <button
                      key={seg}
                      type="button"
                      onClick={() => onNavigate(target)}
                      aria-label={`Go to ${target}`}
                      className="pointer-events-auto -my-2 flex w-3 items-center py-2 transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stepper/50"
                    >
                      {bar}
                    </button>
                  );
                })}
              </span>
            )}
          </div>
        );
      })}
    </header>
  );
}
