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

        // Label keeps a constant width (a hidden bold copy is the sizer) so it
        // never shifts when the weight changes between active and done.
        const label = (
          <span className="relative inline-block whitespace-nowrap text-[14px] tracking-[-0.2px]">
            <span aria-hidden className="invisible font-bold">
              {step.label}
            </span>
            <span
              className={cn(
                "absolute inset-0",
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

        // Add-on (checkmark or progress segments) sits ABSOLUTELY to the right
        // of the label, so it never pushes the label out of position.
        let addon: React.ReactNode = null;
        if (state === "done") {
          addon = <Check className="size-3 text-stepper" strokeWidth={2.5} />;
        } else if (state === "active") {
          const targets = SEGMENT_TARGETS[activeStep as 2 | 3];
          const count = targets.length;
          addon = (
            <div className="flex items-center gap-0.5">
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
              <span className="absolute left-full top-1/2 ml-2 flex -translate-y-1/2 items-center">
                {addon}
              </span>
            )}
          </div>
        );
      })}
    </header>
  );
}
