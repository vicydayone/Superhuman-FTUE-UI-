"use client";

import { useState } from "react";
import { UserPlus, X } from "lucide-react";
import { SEATS_PEOPLE, SEATS_TEAM } from "@/lib/data";
import { cn } from "@/lib/utils";

const SEAT_LIMIT = 5;

/** Gray "no photo" avatar — a soft silhouette, matching the Figma placeholders. */
function Avatar({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#ededed]",
        className,
      )}
    >
      <svg viewBox="0 0 20 20" fill="none" className="size-full" aria-hidden>
        <circle cx="10" cy="7.6" r="3.05" fill="#c4c7ce" />
        <path d="M3.7 17.6c.85-3.15 3.25-4.8 6.3-4.8s5.45 1.65 6.3 4.8" fill="#c4c7ce" />
      </svg>
    </span>
  );
}

/** Seats left column — invite teammates; tracks local invite state. */
export function SeatsLeft({ onContinue }: { onContinue: () => void }) {
  // Which recommended rows were added (by index). Added people leave the
  // recommended list and appear as removable tags under "Your team".
  const [added, setAdded] = useState<Set<number>>(new Set());

  const teamCount = SEATS_TEAM.length + added.size;

  const addPerson = (index: number) => {
    if (teamCount >= SEAT_LIMIT) return;
    setAdded((prev) => new Set(prev).add(index));
  };
  const removePerson = (index: number) => {
    setAdded((prev) => {
      const next = new Set(prev);
      next.delete(index);
      return next;
    });
  };

  const remaining = SEATS_PEOPLE.map((p, i) => ({ ...p, i })).filter(
    (p) => !added.has(p.i),
  );
  const canAddSeats = added.size > 0;

  return (
    <>
      <div className="flex flex-col gap-2.5 text-ink">
        <h1 className="text-[22px] font-semibold leading-normal">
          Bring your team into Superhuman.
        </h1>
        <p className="text-[14px] leading-normal">
          Add your teammates to share conversations, comments, and Snippets.
          Your plan includes 5 people, and you can always add more.
        </p>
      </div>

      <div className="flex min-h-0 flex-1 flex-col justify-center gap-5">
        {/* People to invite */}
        <div className="flex flex-col gap-2.5">
          <p className="text-[14px] text-ink-subdued">
            People to invite
          </p>
          {/* Input bleeds 18px left of the column so its text aligns with the
              labels/list while the box edge sits further out (matches Figma). */}
          <div className="relative -ml-[18px] flex h-10 w-[calc(100%+18px)] items-center rounded-[4px] border border-[#c8ccda] bg-white pl-[18px] pr-3">
            <span className="text-[14px] text-black/40">
              Enter name or email
            </span>
            <span className="absolute inset-y-0 left-0 w-[3px] rounded-l-[4px] bg-[#bec1e4]" />
          </div>
        </div>

        {/* Recommended list — added people drop out (they show under Your team). */}
        {remaining.length > 0 && (
          <div className="flex flex-col">
            <p className="py-[5px] text-[12px] font-semibold tracking-[0.06px] text-[#a6a6a6]">
              Recommended
            </p>
            {remaining.map((person) => (
              <div key={person.i} className="flex items-center py-2">
                <Avatar className="size-5" />
                <div className="flex flex-1 items-center gap-2 pl-3.5">
                  <span className="w-[148px] shrink-0 text-[12px] font-semibold tracking-[0.06px] text-black/85">
                    {person.name}
                  </span>
                  <span className="truncate text-[12px] tracking-[0.06px] text-[#737373]">
                    {person.email}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => addPerson(person.i)}
                  aria-label={`Invite ${person.name}`}
                  className="flex size-5 shrink-0 items-center justify-center text-[#8a8f99] transition-colors hover:text-stepper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stepper/50"
                >
                  <UserPlus className="size-[18px]" strokeWidth={1.6} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Your team — pulled up so the divider sits closer to the last row. */}
        <div className="-mt-3 flex flex-col gap-4 border-t border-[#ededed] pt-4">
          <p className="text-[14px] text-ink">
            Your team ({teamCount}/{SEAT_LIMIT})
          </p>
          <div className="flex flex-wrap gap-2.5">
            {/* Base teammate — not removable. */}
            {SEATS_TEAM.map((t) => (
              <div
                key={t.name}
                className="flex items-center gap-2 rounded-[4px] border border-[#e6e8f0] py-[5px] pl-2.5 pr-2.5"
              >
                <Avatar className="size-6" />
                <span className="text-[14px] text-ink [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
                  {t.name}
                </span>
              </div>
            ))}
            {/* Added teammates — removable via the cancel icon. */}
            {[...added].map((i) => (
              <div
                key={`added-${i}`}
                className="flex items-center gap-2 rounded-[4px] border border-[#e6e8f0] py-[5px] pl-2.5 pr-2"
              >
                <Avatar className="size-6" />
                <span className="text-[14px] text-ink [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
                  {SEATS_PEOPLE[i].name}
                </span>
                <button
                  type="button"
                  onClick={() => removePerson(i)}
                  aria-label={`Remove ${SEATS_PEOPLE[i].name}`}
                  className="flex size-4 shrink-0 items-center justify-center rounded-full text-black/35 transition-colors hover:text-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stepper/50"
                >
                  <X className="size-3.5" strokeWidth={2} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="h-px w-full bg-black/10" />
        <div className="flex items-center justify-end gap-[26px]">
          <button
            type="button"
            onClick={onContinue}
            className="rounded-[2px] px-3 pb-[7px] pt-[9px] text-[14px] font-semibold uppercase leading-4 text-black/40 transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stepper/50"
          >
            I&apos;ll do it later
          </button>
          <button
            type="button"
            onClick={onContinue}
            disabled={!canAddSeats}
            className={cn(
              "rounded-[2px] px-3 pb-[7px] pt-[9px] text-[14px] font-semibold uppercase leading-4 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
              canAddSeats
                ? "bg-primary text-primary-foreground hover:opacity-90"
                : "cursor-not-allowed bg-[#f6f6f6] text-black/15",
            )}
          >
            Add team seats
          </button>
        </div>
      </div>
    </>
  );
}
