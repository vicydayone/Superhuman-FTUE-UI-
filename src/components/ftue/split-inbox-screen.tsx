"use client";

import { ToggleCard } from "./toggle-card";
import { ContinueButton } from "./continue-button";
import { SPLIT_TABS } from "@/lib/data";
import type { SplitToggles } from "@/lib/types";

/** Split Inbox left column — choose which categories get their own tab. */
export function SplitInboxLeft({
  toggles,
  onToggle,
  onContinue,
}: {
  toggles: SplitToggles;
  onToggle: (key: "calendar" | "jira", value: boolean) => void;
  onContinue: () => void;
}) {
  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2.5 text-ink">
          <h1 className="text-[22px] font-semibold leading-normal">
            Focus on what matters with Split Inbox.
          </h1>
          <p className="text-[14px] leading-normal">
            Next let’s organize your email into focused views, so you can see
            what needs your attention the most.
          </p>
        </div>

        <div className="flex flex-col gap-[14px]">
          <p className="text-[14px] text-ink-subdued">
            Based on your inbox, we’ve made some suggestions:
          </p>
          {SPLIT_TABS.map((tab) => (
            <ToggleCard
              key={tab.key}
              title={tab.label}
              description={tab.description}
              badge={tab.badge}
              toggleable={tab.toggleable}
              checked={
                tab.key === "calendar"
                  ? toggles.calendar
                  : tab.key === "jira"
                    ? toggles.jira
                    : false
              }
              onCheckedChange={(value) =>
                tab.key === "calendar" || tab.key === "jira"
                  ? onToggle(tab.key, value)
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
  );
}
