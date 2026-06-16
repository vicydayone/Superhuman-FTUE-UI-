"use client";

import { ScreenLayout } from "./screen-layout";
import { ContinueButton } from "./continue-button";
import { AskAiPreview } from "./workflow-previews";
import { ASK_AI_PROMPTS } from "@/lib/data";
import type { FlowStep } from "@/lib/types";

/** Small AI sparkle, gradient-filled to match the Ask AI accent. */
function PromptSparkle() {
  return (
    <svg viewBox="0 0 16 16" className="size-4 shrink-0" fill="none" aria-hidden>
      <defs>
        <linearGradient id="prompt-sparkle" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5cc3fa" />
          <stop offset="55%" stopColor="#a87bf0" />
          <stop offset="100%" stopColor="#fab266" />
        </linearGradient>
      </defs>
      <path
        d="M8 0c.3 3.1 1.1 5 2.5 6.1C9 7.1 8.3 9 8 12c-.3-3-1-4.9-2.5-6C7 5 7.7 3.1 8 0Z"
        fill="url(#prompt-sparkle)"
      />
      <path
        d="M13.5 9c-.2 1.4-.6 2.3-1.3 2.8.7.4 1.1 1.3 1.3 2.7.2-1.4.6-2.3 1.3-2.7-.7-.5-1.1-1.4-1.3-2.8Z"
        fill="url(#prompt-sparkle)"
      />
    </svg>
  );
}

export function AskAiScreen({
  onContinue,
  onNavigate,
}: {
  onContinue: () => void;
  onNavigate?: (step: FlowStep) => void;
}) {
  return (
    <ScreenLayout
      activeStep={3}
      progress={3}
      onNavigate={onNavigate}
      left={
        <>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2.5 text-ink">
              <h1 className="text-[22px] font-semibold leading-normal">
                Stop searching, start asking with Ask AI.
              </h1>
              <p className="text-[14px] leading-normal">
                Use Ask AI to find, write, schedule, or ask anything. What took
                minutes now takes seconds.
              </p>
            </div>

            <div className="flex flex-col gap-[14px]">
              <p className="text-[14px] text-ink-subdued">Try it out:</p>
              {ASK_AI_PROMPTS.map((prompt) => (
                <div
                  key={prompt}
                  className="flex w-full items-center gap-2.5 rounded-[6px] border-[0.5px] border-[rgba(236,236,236,0.3)] bg-white px-5 py-[18px] drop-shadow-[0px_2px_4px_rgba(0,0,0,0.12)]"
                >
                  <PromptSparkle />
                  <span className="text-[14px] leading-normal text-black/75">
                    &ldquo;{prompt}&rdquo;
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="h-px w-full bg-black/10" />
            <div className="flex justify-end">
              <ContinueButton onClick={onContinue} />
            </div>
          </div>
        </>
      }
      preview={<AskAiPreview />}
    />
  );
}
