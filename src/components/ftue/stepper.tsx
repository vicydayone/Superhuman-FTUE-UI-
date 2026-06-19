import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FlowStep } from "@/lib/types";

/**
 * Which screens each active step's progress segments map to, so the bars
 * double as navigation. Chapter 2 has 2 segments, Chapter 3 has 5.
 */
const SEGMENT_TARGETS: Record<2 | 3, (FlowStep | undefined)[]> = {
  // Chapter 2 = 2 steps: Auto Archive, then Split Inbox. (The "Welcome" intro
  // is a loading screen and shows no progress bar.)
  2: ["auto-archive", "split-inbox"],
  3: ["auto-draft", "auto-reminder", "ask-ai", "seats", "done"],
};

const STEPS: { label: string; doneTarget?: FlowStep }[] = [
  { label: "Connect your account" },
  { label: "Organize your Inbox", doneTarget: "split-inbox" },
  { label: "Accelerate your workflow" },
];

/**
 * Top onboarding stepper:
 *   Connect your account ✓ — Organize your Inbox — Accelerate your workflow
 *
 * `activeStep` says which chapter is in progress (2 = Organize, 3 = Accelerate,
 * "done" = everything finished). The active step shows progress segments —
 * three for chapter 2, five for chapter 3 — and `progress` drives how many
 * are filled. Completed steps collapse to a checkmark; clicking a filled
 * segment (or a navigable completed step) jumps to the matching screen.
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
  // 0-based index of the active step; "done" sits past the last step so all
  // three render as completed.
  const activeIndex = activeStep === "done" ? STEPS.length : activeStep - 1;

  return (
    <header
      className={cn(
        "flex w-full items-center justify-center gap-20 bg-white px-[100px] py-4 font-ui",
        className,
      )}
    >
      {STEPS.map((step, i) => {
        const state =
          i < activeIndex ? "done" : i === activeIndex ? "active" : "upcoming";

        if (state === "done") {
          const target = step.doneTarget;
          const inner = (
            <>
              <span className="text-[14px] tracking-[-0.2px] text-stepper">
                {step.label}
              </span>
              <Check className="size-3 text-stepper" strokeWidth={2.5} />
            </>
          );
          return onNavigate && target ? (
            <button
              key={step.label}
              type="button"
              onClick={() => onNavigate(target)}
              className="flex items-center gap-1.5 transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stepper/50"
            >
              {inner}
            </button>
          ) : (
            <div key={step.label} className="flex items-center gap-1.5">
              {inner}
            </div>
          );
        }

        if (state === "upcoming") {
          return (
            <div key={step.label} className="flex items-center">
              <span className="text-[14px] tracking-[-0.2px] text-ink-subdued">
                {step.label}
              </span>
            </div>
          );
        }

        // Active step — bold label + progress segments.
        const targets = SEGMENT_TARGETS[activeStep as 2 | 3];
        const count = targets.length;

        return (
          <div key={step.label} className="flex items-center gap-2.5">
            <span className="text-[14px] font-bold tracking-[-0.2px] text-stepper">
              {step.label}
            </span>
            <div className="flex w-[68px] items-center gap-0.5">
              {targets.map((target, seg) => {
                const filled = seg < progress;
                const bar = (
                  <span
                    className={cn(
                      "block h-[5px] w-full",
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

                if (!onNavigate || !target) return <span key={seg} className="flex-1">{bar}</span>;

                return (
                  <button
                    key={seg}
                    type="button"
                    onClick={() => onNavigate(target)}
                    aria-label={`Go to ${target}`}
                    className="-my-2 flex flex-1 items-center py-2 transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stepper/50"
                  >
                    {bar}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </header>
  );
}
