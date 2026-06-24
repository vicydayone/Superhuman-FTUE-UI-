"use client";

import { ContinueButton } from "./continue-button";
import { ASK_AI_PROMPTS } from "@/lib/data";

const PromptSparkle = () => (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden className="size-4 shrink-0">
    <defs>
      <linearGradient id="pspk-grad" x1="0" y1="0" x2="20" y2="20" gradientUnits="userSpaceOnUse">
        <stop stopColor="#1ca5d7" />
        <stop offset="1" stopColor="#8655d6" />
      </linearGradient>
    </defs>
    <path d="M10 0L11.8 8.2L20 10L11.8 11.8L10 20L8.2 11.8L0 10L8.2 8.2Z" fill="url(#pspk-grad)" />
  </svg>
);

/**
 * Ask AI left column. Hovering a prompt card updates the preview (query chip +
 * AI answer); no persistent selection state.
 */
export function AskAiLeft({
  onHover,
  onContinue,
}: {
  onHover: (index: number) => void;
  onContinue: () => void;
}) {
  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2.5 text-ink">
          <h1 className="text-[22px] font-semibold leading-normal">
            Stop searching, start asking with Ask AI.
          </h1>
          <p className="text-[14px] leading-normal">
            Get work done without having to remember senders or scan subject
            lines. Ask AI will find what you need, and even do the work for you.
          </p>
        </div>

        <div className="flex flex-col gap-[14px]">
          <p className="text-[14px] text-ink-subdued">Try it out:</p>
          {ASK_AI_PROMPTS.map((prompt, i) => (
            <div
              key={prompt}
              onMouseEnter={() => onHover(i)}
              className="flex -ml-5 w-[calc(100%_+_20px)] items-center gap-2.5 rounded-[6px] border-[0.5px] border-[rgba(236,236,236,0.3)] px-5 py-[18px] text-left transition-all duration-300 bg-white shadow-[0px_2px_12px_rgba(0,0,0,0.10)] hover:bg-[rgba(174,177,221,0.1)] hover:shadow-[0px_2px_20px_rgba(0,0,0,0.10)] cursor-default"
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
  );
}
