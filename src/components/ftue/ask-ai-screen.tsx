"use client";

import { ContinueButton } from "./continue-button";
import { ASK_AI_PROMPTS } from "@/lib/data";

const PromptSparkle = () => (
  <svg viewBox="0 0 13.754 13.754" fill="none" aria-hidden className="size-4 shrink-0" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="star-grad" x1="18.288" y1="14.474" x2="-2.606" y2="0.898" gradientUnits="userSpaceOnUse">
        <stop stopColor="#A87DE8" />
        <stop offset="1" stopColor="#5CC3FA" />
      </linearGradient>
    </defs>
    <path d="M13.7542 6.87711C13.7542 6.99992 13.6314 7.12272 13.5086 7.18413L8.53501 8.53501L7.18413 13.5086C7.12272 13.6314 7.06132 13.7542 6.87711 13.7542C6.6929 13.7542 6.63149 13.6314 6.57009 13.5086L5.21921 8.53501L0.245615 7.18413C0.122807 7.12272 0 7.06132 0 6.87711C0 6.6929 0.122807 6.63149 0.245615 6.57009L5.21921 5.21921L6.57009 0.245615C6.63149 0.122807 6.6929 0 6.87711 0C7.06132 0 7.12272 0.122807 7.18413 0.245615L8.53501 5.21921L13.5086 6.57009C13.6314 6.63149 13.7542 6.7543 13.7542 6.87711Z" fill="url(#star-grad)" />
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
