"use client";

import { ScreenLayout } from "./screen-layout";
import { SelectionCard } from "./selection-card";
import { ContinueButton } from "./continue-button";
import { AutoReminderPreview } from "./workflow-previews";
import { REMINDER_OPTIONS } from "@/lib/data";
import type { FlowStep, ReminderChoice } from "@/lib/types";

export function AutoReminderScreen({
  choice,
  onChoiceChange,
  onContinue,
  onNavigate,
}: {
  choice: ReminderChoice;
  onChoiceChange: (choice: ReminderChoice) => void;
  onContinue: () => void;
  onNavigate?: (step: FlowStep) => void;
}) {
  const wait =
    REMINDER_OPTIONS.find((o) => o.key === choice)?.wait ?? "2 days later";

  return (
    <ScreenLayout
      activeStep={3}
      progress={2}
      onNavigate={onNavigate}
      left={
        <>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2.5 text-ink">
              <h1 className="text-[22px] font-semibold leading-normal">
                Follow up on time with Auto Reminders.
              </h1>
              <p className="text-[14px] leading-normal">
                If your email needs a response, we&apos;ll remind you to follow
                up. You&apos;ll never drop the ball again.
              </p>
            </div>

            <div role="radiogroup" className="flex flex-col gap-[14px]">
              <p className="text-[14px] text-ink-subdued">
                Remind me if I don&apos;t hear back:
              </p>
              {REMINDER_OPTIONS.map((option) => (
                <SelectionCard
                  key={option.key}
                  title={option.label}
                  badge={option.recommended ? "Recommended" : undefined}
                  selected={choice === option.key}
                  onSelect={() => onChoiceChange(option.key)}
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
      preview={<AutoReminderPreview wait={wait} />}
    />
  );
}
