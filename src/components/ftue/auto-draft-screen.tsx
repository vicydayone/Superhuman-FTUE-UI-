"use client";

import { ScreenLayout } from "./screen-layout";
import { ToggleCard } from "./toggle-card";
import { ContinueButton } from "./continue-button";
import { AutoDraftPreview } from "./workflow-previews";
import { AUTO_DRAFT_CARDS } from "@/lib/data";
import type { AutoDraftToggles, FlowStep } from "@/lib/types";

export function AutoDraftScreen({
  toggles,
  onToggle,
  onContinue,
  onNavigate,
}: {
  toggles: AutoDraftToggles;
  onToggle: (key: "followUps" | "scheduling", value: boolean) => void;
  onContinue: () => void;
  onNavigate?: (step: FlowStep) => void;
}) {
  return (
    <ScreenLayout
      activeStep={3}
      progress={1}
      onNavigate={onNavigate}
      left={
        <>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2.5 text-ink">
              <h1 className="text-[22px] font-semibold leading-normal">
                Respond faster with Auto Drafts.
              </h1>
              <p className="text-[14px] leading-normal">
                Every email that needs a reply has one waiting – written in your
                voice.
              </p>
            </div>

            <div className="flex flex-col gap-[14px]">
              <p className="text-[14px] text-ink-subdued">
                Choose which emails should we draft replies for:
              </p>
              {AUTO_DRAFT_CARDS.map((card) => (
                <ToggleCard
                  key={card.key}
                  title={card.title}
                  description={card.description}
                  badge={card.fixed ? "Default" : undefined}
                  highlighted={card.fixed}
                  toggleable={!card.fixed}
                  checked={
                    card.key === "followUps"
                      ? toggles.followUps
                      : card.key === "scheduling"
                        ? toggles.scheduling
                        : false
                  }
                  onCheckedChange={(value) =>
                    card.key === "followUps" || card.key === "scheduling"
                      ? onToggle(card.key, value)
                      : undefined
                  }
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
      }
      preview={<AutoDraftPreview />}
    />
  );
}
