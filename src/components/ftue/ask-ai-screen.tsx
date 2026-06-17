"use client";

import { ContinueButton } from "./continue-button";
import { ASK_AI_PROMPTS } from "@/lib/data";

// eslint-disable-next-line @next/next/no-img-element
const PromptSparkle = () => (
  <img
    src="https://www.figma.com/api/mcp/asset/90c1ebdb-8b22-4a90-9f3c-0d905786ec36"
    alt=""
    aria-hidden
    className="size-4 shrink-0"
  />
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
            Use Ask AI to find, write, schedule, or ask anything. What took
            minutes now takes seconds.
          </p>
        </div>

        <div className="flex flex-col gap-[14px]">
          <p className="text-[14px] text-ink-subdued">Try it out:</p>
          {ASK_AI_PROMPTS.map((prompt, i) => (
            <div
              key={prompt}
              onMouseEnter={() => onHover(i)}
              className="flex w-full items-center gap-2.5 rounded-[6px] border-[0.5px] border-[rgba(236,236,236,0.3)] px-5 py-[18px] text-left transition-all duration-300 bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.12)] hover:bg-[rgba(174,177,221,0.1)] hover:shadow-[0px_2px_8px_rgba(0,0,0,0.12)] cursor-default"
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
