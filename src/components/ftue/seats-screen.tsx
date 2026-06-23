"use client";

import { useState } from "react";
import { UserPlus, Check } from "lucide-react";
import { SEATS_PEOPLE, SEATS_TEAM } from "@/lib/data";
import { cn } from "@/lib/utils";

const SEAT_LIMIT = 5;

/** Generic round avatar — soft grey, like the recommended-list placeholders. */
function Avatar({ name, className }: { name: string; className?: string }) {
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#e3e5e9,#d9dce1)] text-[9px] font-semibold text-[#8a8f99]",
        className,
      )}
    >
      {name.charAt(0)}
    </span>
  );
}

/** Seats left column — invite teammates; tracks local invite state. */
export function SeatsLeft({ onContinue }: { onContinue: () => void }) {
  // Start with the one teammate already on the team; invites add more.
  const [team, setTeam] = useState<string[]>(SEATS_TEAM.map((t) => t.name));
  // Track which recommended rows were invited (by index, since names repeat).
  const [invited, setInvited] = useState<Set<number>>(new Set());

  const addPerson = (index: number, name: string) => {
    if (invited.has(index) || team.length >= SEAT_LIMIT) return;
    setInvited((prev) => new Set(prev).add(index));
    setTeam((prev) => [...prev, name]);
  };

  const canAddSeats = team.length > SEATS_TEAM.length;

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
          <p className="pl-[18px] text-[14px] text-ink-subdued">
            People to invite
          </p>
          <div className="relative flex h-10 items-center rounded-[4px] border border-[#c8ccda] bg-white pl-[18px] pr-3">
            <span className="text-[14px] text-black/40">
              Enter name or email
            </span>
            <span className="absolute inset-y-0 left-0 w-[3px] rounded-l-[4px] bg-[#bec1e4]" />
          </div>
        </div>

        {/* Recommended list */}
        <div className="flex flex-col px-[18px]">
          <p className="py-[5px] text-[12px] font-semibold tracking-[0.06px] text-[#a6a6a6]">
            Recommended
          </p>
          {SEATS_PEOPLE.map((person, i) => {
            const added = invited.has(i);
            return (
              <div key={i} className="flex items-center py-2">
                <Avatar name={person.name} className="size-5" />
                <div className="flex flex-1 items-center gap-2 pl-3.5">
                  <span className="w-[140px] shrink-0 text-[12px] font-semibold tracking-[0.06px] text-black/85">
                    {person.name}
                  </span>
                  <span className="truncate text-[12px] tracking-[0.06px] text-[#737373]">
                    {person.email}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => addPerson(i, person.name)}
                  aria-label={`Invite ${person.name}`}
                  className="flex size-5 shrink-0 items-center justify-center text-[#8a8f99] transition-colors hover:text-stepper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stepper/50"
                >
                  {added ? (
                    <Check className="size-[18px] text-stepper" strokeWidth={2.2} />
                  ) : (
                    <UserPlus className="size-[18px]" strokeWidth={1.6} />
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Your team */}
        <div className="flex flex-col gap-4 border-t border-[#ededed] px-[18px] pt-4">
          <p className="text-[14px] text-ink">
            Your team ({team.length}/{SEAT_LIMIT})
          </p>
          <div className="flex flex-wrap gap-2.5">
            {team.map((name, i) => (
              <div
                key={`${name}-${i}`}
                className="flex items-center gap-2 rounded-[4px] border border-[#e6e8f0] px-2.5 py-[5px]"
              >
                <Avatar name={name} className="size-6" />
                <span className="text-[14px] text-ink">{name}</span>
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
