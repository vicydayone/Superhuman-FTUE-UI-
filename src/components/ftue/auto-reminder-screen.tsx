"use client";

import { SelectionCard } from "./selection-card";
import { ContinueButton } from "./continue-button";
import { REMINDER_OPTIONS } from "@/lib/data";
import type { ReminderChoice } from "@/lib/types";

/**
 * Auto Reminder left column. Picking an option updates the reminder banner in
 * the preview with that option's wait.
 */
export function AutoReminderLeft({
  choice,
  onChoiceChange,
  onHover,
  onContinue,
}: {
  choice: ReminderChoice;
  onChoiceChange: (choice: ReminderChoice) => void;
  /** Preview the wait for the hovered option; null reverts to the selection. */
  onHover: (choice: ReminderChoice | null) => void;
  onContinue: () => void;
}) {
  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2.5 text-ink">
          <h1 className="text-[22px] font-semibold leading-normal">
            Follow up every time with Auto Reminders.
          </h1>
          <p className="text-[14px] leading-normal">
            If the email you&apos;ve sent needs a response, we&apos;ll remind you
            to follow up. We&apos;ll even write the email for you, so all you
            need to do is hit send.
          </p>
        </div>

        <div
          role="radiogroup"
          className="flex flex-col gap-[14px]"
          onMouseLeave={() => onHover(null)}
        >
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
              onHover={() => onHover(option.key)}
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
