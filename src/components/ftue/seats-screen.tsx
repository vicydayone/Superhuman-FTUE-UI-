"use client";

import { useState } from "react";
import { Info, UserPlus, X } from "lucide-react";
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

/** Seats left column — invite teammates; tracks local invite state.
 *
 * Two variants, switched by `noSeats`:
 *  - false (default): the user pre-purchased 5 seats. A base teammate (Emily)
 *    is already on the team, the count shows "Your team (N/5)", and there's a
 *    hard 5-seat limit.
 *  - true: no seats purchased up front. No base teammate, no limit, the count
 *    shows "Your team: N", and once the first person is added a billing notice
 *    appears (seats are added — and billed — automatically). */
export function SeatsLeft({
  onContinue,
  noSeats = false,
}: {
  onContinue: () => void;
  noSeats?: boolean;
}) {
  // Which recommended rows were added (by index). Added people leave the
  // recommended list and appear as removable tags under "Your team".
  const [added, setAdded] = useState<Set<number>>(new Set());

  // No-seats mode has no pre-existing teammate and no upper bound.
  const baseTeam = noSeats ? [] : SEATS_TEAM;
  const teamCount = baseTeam.length + added.size;

  const addPerson = (index: number) => {
    if (!noSeats && teamCount >= SEAT_LIMIT) return;
    setAdded((prev) => new Set(prev).add(index));
  };
  const removePerson = (index: number) => {
    setAdded((prev) => {
      const next = new Set(prev);
      next.delete(index);
      return next;
    });
  };

  // Always show 4 suggestions: picking one drops it out and the next pool
  // member slides up into its place, so the list height never changes.
  const visible = SEATS_PEOPLE.map((p, i) => ({ ...p, i }))
    .filter((p) => !added.has(p.i))
    .slice(0, 4);
  const canAddSeats = added.size > 0;

  return (
    <>
      <div className="flex flex-col gap-2.5 text-ink">
        <h1 className="text-[22px] font-semibold leading-normal">
          Bring your team into Superhuman.
        </h1>
        <p className="min-h-[44px] text-[14px] leading-normal">
          {noSeats
            ? "Invite teammates now. Seats will be added automatically for everyone you bring in."
            : "Add your teammates to share conversations, comments, and Snippets. Your plan includes 5 people, and you can always add more."}
        </p>
      </div>

      <div className="flex min-h-0 flex-1 flex-col justify-between">
        {/* Top block: People to invite + Recommended — fixed at top of middle area */}
        <div className="flex flex-col gap-5">
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

        {/* Recommended list — always 4; a picked row is replaced by the next
            pool member sliding up, so nothing below shifts. */}
        {visible.length > 0 && (
          <div className="flex flex-col">
            <p className="py-[5px] text-[12px] font-semibold tracking-[0.06px] text-[#a6a6a6]">
              Recommended
            </p>
            {visible.map((person) => (
              <div
                key={person.i}
                className="flex items-center py-2"
                style={{ animation: "reply-rise 320ms ease-out both" }}
              >
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
        </div>{/* end top block */}

        {/* Your team — always rendered so the layout height stays stable and
            "People to invite" doesn't shift between variants. In no-seats mode
            the section is invisible (takes space) until the first person is
            added, at which point it becomes visible (matches Figma flow). */}
        <div className={`-mt-3 flex flex-col gap-4 border-t border-[#ededed] pt-4 ${noSeats && added.size === 0 ? "invisible" : ""}`}>
          {/* Count line — "(N/5)" with a hard limit when seats are purchased,
              "Your team: N" + billing notice when they're not. */}
          {noSeats ? (
            <div className="flex items-center gap-4">
              <p className="text-[14px] text-ink">
                Your team: <span className="font-semibold">{teamCount}</span>
              </p>
              <span className="flex h-6 items-center gap-2.5 rounded-[4px] bg-[#54acdc] px-2.5 text-[14px] leading-none text-white [text-box-edge:cap_alphabetic] [text-box-trim:trim-both]">
                <Info className="size-4 shrink-0" strokeWidth={2} />
                You will be billed for each teammate who joins.
              </span>
            </div>
          ) : (
            <p className="text-[14px] text-ink">
              Your team ({teamCount}/{SEAT_LIMIT})
            </p>
          )}
          {/* Reserve two rows so the layout doesn't shift as tags wrap. */}
          <div className="flex min-h-[78px] flex-wrap content-start gap-2.5">
            {/* Base teammate — not removable. */}
            {baseTeam.map((t) => (
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
