"use client";

import { ContinueButton } from "./continue-button";
import { cn } from "@/lib/utils";
import type { AutoArchiveToggles, MailLabel } from "@/lib/types";

const CATEGORIES: {
  key: MailLabel;
  color: string;
  description: string;
}[] = [
  { key: "marketing", color: "#e09f81", description: "Marketing and promotional messages." },
  { key: "news",      color: "#e4c450", description: "News and newsletter messages." },
  { key: "pitch",     color: "#d5a1d7", description: "Cold pitch and outreach messages." },
  { key: "social",    color: "#8da2d8", description: "Social network and online community messages." },
];

function Checkbox({ checked }: { checked: boolean }) {
  return (
    <span
      className={cn(
        "flex size-4 shrink-0 items-center justify-center rounded-[3px] border transition-colors duration-150",
        checked ? "border-[#5f74aa] bg-[#5f74aa]" : "border-[#c5c5c5] bg-white",
      )}
    >
      {checked && (
        <svg viewBox="0 0 10 8" className="size-2.5" fill="none" aria-hidden>
          <path
            d="M1 4L3.8 7L9 1"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </span>
  );
}

/** Auto Archive left column — pick which labelled mail to archive. */
export function AutoArchiveLeft({
  archivedLabels,
  onToggle,
  onContinue,
}: {
  archivedLabels: AutoArchiveToggles;
  onToggle: (key: MailLabel) => void;
  onContinue: () => void;
}) {
  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2.5 text-ink">
          <h1 className="text-[22px] font-semibold leading-normal">
            Clear the clutter with Auto Archive.
          </h1>
          <p className="text-[14px] leading-normal">
            First, let’s decide what skips your inbox to help cut through the
            noise. Everything saved and searchable, just out of your way.
          </p>
        </div>

        <div className="flex flex-col gap-[14px]">
          <p className="text-[14px] text-ink-subdued">
            Which emails do you want to skip your inbox?
          </p>

          {CATEGORIES.map(({ key, color, description }) => {
            const checked = archivedLabels[key];
            return (
              <button
                key={key}
                type="button"
                onClick={() => onToggle(key)}
                className={cn(
                  "flex w-full items-center gap-[10px] rounded-[6px] border-[0.5px] border-[rgba(236,236,236,0.3)] px-5 py-[10px] text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stepper/50",
                  checked
                    ? "bg-[rgba(174,177,221,0.1)] shadow-[0px_2px_8px_rgba(0,0,0,0.12)]"
                    : "bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.12)] hover:bg-[rgba(174,177,221,0.1)] hover:shadow-[0px_2px_8px_rgba(0,0,0,0.12)]",
                )}
              >
                <div className="flex min-w-0 flex-1 flex-col items-start gap-[10px]">
                  <span
                    className="rounded-[4px] px-[5px] text-[11px] font-semibold leading-5 tracking-[-0.15px] text-white"
                    style={{ backgroundColor: color }}
                  >
                    {key}
                  </span>
                  <span className="text-[14px] leading-normal text-[#686868]">
                    {description}
                  </span>
                </div>

                {checked && (
                  <span className="shrink-0 text-[14px] text-[#6276a9]">
                    Auto archived
                  </span>
                )}
                <Checkbox checked={checked} />
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="h-px w-full bg-black/10" />
        <div className="flex justify-end">
          <ContinueButton onClick={onContinue} />
        </div>
      </div>
    </>
  );
}
