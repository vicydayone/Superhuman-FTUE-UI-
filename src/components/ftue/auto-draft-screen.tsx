"use client";

import { useState } from "react";
import { ToggleCard } from "./toggle-card";
import { ContinueButton } from "./continue-button";
import { AUTO_DRAFT_CARDS } from "@/lib/data";
import type { AutoDraftDemo } from "@/lib/types";

/**
 * Auto Draft left column. Hovering a card updates the preview for that variant;
 * the toggles are independent and control which categories are enabled.
 */
export function AutoDraftLeft({
  onHover,
  onContinue,
}: {
  onHover: (demo: AutoDraftDemo) => void;
  onContinue: () => void;
}) {
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    responses: true,
    followUps: true,
    scheduling: true,
  });

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2.5 text-ink">
          <h1 className="text-[22px] font-semibold leading-normal">
            Respond faster with Auto Drafts.
          </h1>
          <p className="text-[14px] leading-normal">
            With everything organized, we can take action on what matters most.
            Every email that needs a reply has one waiting — written in your
            voice.
          </p>
        </div>

        <div className="flex flex-col gap-[14px]">
          <p className="text-[14px] text-ink-subdued">
            Choose which emails we draft replies for:
          </p>
          {AUTO_DRAFT_CARDS.map((card) => (
            <ToggleCard
              key={card.key}
              title={card.title}
              description={card.description}
              badge={card.fixed ? "Default" : undefined}
              toggleable={!card.fixed}
              checked={toggles[card.key]}
              onCheckedChange={(value) =>
                setToggles((t) => ({ ...t, [card.key]: value }))
              }
              onMouseEnter={() => onHover(card.key)}
            />
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
