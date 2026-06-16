"use client";

import { ScreenLayout } from "./screen-layout";
import { ToggleCard } from "./toggle-card";
import { ContinueButton } from "./continue-button";
import { SplitInbox } from "./inbox-preview";
import { SPLIT_MAIL, SPLIT_TABS } from "@/lib/data";
import type { FlowStep, SplitToggles } from "@/lib/types";

export function SplitInboxScreen({
  toggles,
  onToggle,
  onContinue,
  onNavigate,
}: {
  toggles: SplitToggles;
  onToggle: (key: "calendar" | "jira", value: boolean) => void;
  onContinue: () => void;
  onNavigate?: (step: FlowStep) => void;
}) {
  return (
    <ScreenLayout
      activeStep={2}
      progress={2}
      onNavigate={onNavigate}
      left={
        <>
          <div className="flex flex-col gap-2.5 text-ink">
            <h1 className="text-[22px] font-semibold leading-normal">
              Organize your inbox with Split Inbox.
            </h1>
            <p className="text-[14px] leading-normal">
              Based on your patterns, we split your inbox into focused tabs.
              Important stays front and center. Everything else has its place.
            </p>
          </div>

          <div className="flex flex-col gap-[14px]">
            <p className="text-[14px] text-ink-subdued">Choose your Split inboxes:</p>
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

          <div className="flex flex-col gap-5">
            <div className="h-px w-full bg-black/10" />
            <div className="flex justify-end">
              <ContinueButton onClick={onContinue} />
            </div>
          </div>
        </>
      }
      preview={<SplitInbox mails={SPLIT_MAIL} toggles={toggles} />}
    />
  );
}
