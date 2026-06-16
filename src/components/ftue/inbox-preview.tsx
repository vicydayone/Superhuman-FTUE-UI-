"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { LabelChip } from "./label-chip";
import { isArchived } from "@/lib/data";
import type {
  AutoArchiveMail,
  SplitCategory,
  SplitMail,
  SplitToggles,
} from "@/lib/types";

// ── Figma icons (rgba(0,0,0,0.3), exact paths from design) ───────────────────

function IconHamburger({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 12" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M0.5 0.5H15.5M0.5 6H15.5M0.5 11.5H15.5" stroke="black" strokeOpacity="0.3" strokeLinecap="round" />
    </svg>
  );
}

function IconClose({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 12.02 12.02" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M6.01 5.303L0.707 0L0 0.707L5.303 6.01L0 11.313L0.707 12.02L6.01 6.717L11.313 12.02L12.02 11.313L6.717 6.01L12.02 0.707L11.313 0L6.01 5.303Z" fill="black" fillOpacity="0.3" />
    </svg>
  );
}

function IconCompose({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 14.0023 13.6374" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M10.0023 0.256267C10.344 -0.0854201 10.8979 -0.0854246 11.2396 0.256267L13.3812 2.39787C13.7228 2.73955 13.7228 3.29348 13.3812 3.63517L3.86366 13.1537L3.65467 13.3627L3.58631 13.4252C3.42027 13.5613 3.21105 13.6361 2.99452 13.6361H0.48475C0.48475 13.6361 0.455773 13.638 0.418344 13.6371L0.301156 13.6244C0.266671 13.6156 0.233182 13.6019 0.202523 13.5844L0.118539 13.5199C0.0681611 13.4696 0.0317447 13.4063 0.0140469 13.3373C-0.00322822 13.2696 0.000232282 13.158 0.000374997 13.1537L0.00135156 10.644C0.00145427 10.3966 0.0998795 10.1587 0.274789 9.98381L0.48475 9.77482L10.0023 0.256267ZM13.5023 12.6361C13.7783 12.6364 14.0023 12.8602 14.0023 13.1361C14.0023 13.4122 13.7783 13.6359 13.5023 13.6361H7.43983C7.16369 13.6361 6.93983 13.4123 6.93983 13.1361C6.93986 12.86 7.16371 12.6361 7.43983 12.6361H13.5023ZM1.19178 10.4819L1.00037 10.6723V12.6361H2.96717L3.15662 12.4467L12.5853 3.01603L10.6205 1.05119L1.19178 10.4819Z" fill="black" fillOpacity="0.3" />
    </svg>
  );
}

function IconSearch({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 13.9989 13.9997" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M5.25 0C8.14949 0 10.5 2.35051 10.5 5.25C10.5 6.5197 10.049 7.68392 9.29883 8.5918L13.8525 13.1455C14.0477 13.3407 14.0476 13.6582 13.8525 13.8535C13.6573 14.0485 13.3407 14.0485 13.1455 13.8535L8.5918 9.29883C7.68392 10.049 6.5197 10.5 5.25 10.5C2.35051 10.5 0 8.14949 0 5.25C0 2.35051 2.35051 0 5.25 0ZM5.25 1C2.90279 1 1 2.90279 1 5.25C1 7.59721 2.90279 9.5 5.25 9.5C7.59721 9.5 9.5 7.59721 9.5 5.25C9.5 2.90279 7.59721 1 5.25 1Z" fill="black" fillOpacity="0.3" />
    </svg>
  );
}

// ── Browser chrome ───────────────────────────────────────────────────────────

function TitleBar() {
  return (
    <div className="absolute inset-x-0 top-0 z-30 flex h-8 items-center rounded-t-[16px] border-b border-black/5 bg-[#f5f5f5]/80 px-3.5 backdrop-blur-xl">
      <div className="flex items-center gap-1.5">
        <span className="block size-[10px] rounded-full bg-[#ff5f57]" />
        <span className="block size-[10px] rounded-full bg-[#febc2e]" />
        <span className="block size-[10px] rounded-full bg-[#28c840]" />
      </div>
      <div className="mx-auto flex h-[19px] w-[339px] items-center justify-center rounded-[2px] border-[0.6px] border-[#edecec] bg-white/40">
        <span className="text-[8px] text-[#999]">sample.inbox@superhuman.com</span>
      </div>
    </div>
  );
}

function PreviewShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex h-[533px] w-[570px] max-w-full flex-col overflow-hidden rounded-[16px] bg-white px-6 pt-10 shadow-[0_0_2px_rgba(20,20,19,0.12),0_6px_24px_rgba(20,20,19,0.12)]">
      <TitleBar />
      {children}
    </div>
  );
}

// ── Mail rows ──────────────────────────────────────────────────────────────

function MailRow({
  sender,
  subject,
  date,
  label,
}: {
  sender: string;
  subject: string;
  date: string;
  label?: AutoArchiveMail["label"];
}) {
  return (
    <div className="flex items-center gap-5 py-2">
      <p className="w-[142px] shrink-0 truncate text-[11px] font-semibold tracking-[-0.15px] text-mail">
        {sender}
      </p>
      <div className="flex min-w-0 flex-1 items-center gap-2">
        {label && <LabelChip label={label} />}
        <p className="min-w-0 flex-1 truncate text-[11px] tracking-[-0.15px] text-mail">
          {subject}
        </p>
      </div>
      <p className="shrink-0 text-right text-[10px] leading-4 text-mail-meta">
        {date}
      </p>
    </div>
  );
}

function PreviewIcons() {
  return (
    <div className="flex items-center gap-2">
      <IconCompose className="size-4" />
      <IconSearch className="size-4" />
    </div>
  );
}

// ── Animated counter ─────────────────────────────────────────────────────────

/**
 * Tweens its rendered integer whenever `value` changes (ease-out cubic, ~600ms).
 * Mounts already showing the target, so it only animates on actual changes —
 * the same logic drives both the forward and the reverse transition. An optional
 * `delay` lets the "arriving" count (Auto Archive) trail the "leaving" one.
 */
function Counter({
  value,
  delay = 0,
  className,
}: {
  value: number;
  delay?: number;
  className?: string;
}) {
  const [display, setDisplay] = useState(value);
  const current = useRef(value);

  useEffect(() => {
    const from = current.current;
    if (from === value) return;

    const duration = 600;
    let rafId = 0;
    let startTs = 0;
    const tick = (ts: number) => {
      if (!startTs) startTs = ts;
      const p = Math.min((ts - startTs) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const next = from + (value - from) * eased;
      current.current = next;
      setDisplay(Math.round(next));
      if (p < 1) rafId = requestAnimationFrame(tick);
      else current.current = value;
    };

    const timer = window.setTimeout(() => {
      rafId = requestAnimationFrame(tick);
    }, delay);

    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(rafId);
    };
  }, [value, delay]);

  return <span className={className}>{display}</span>;
}

// ── Account menu (slides in on "Keep it clean") ──────────────────────────────

/** Generic gray profile silhouette from Figma (node 1695:6183). */
function ProfileAvatar({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.7628 16.3043C19.1616 14.5841 20 12.39 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 12.39 0.838413 14.5841 2.23716 16.3043C2.94072 14.3478 5.47826 10.4348 10 10.4348C14.5217 10.4348 17.0593 14.3478 17.7628 16.3043Z"
        fill="#D9DCE1"
      />
      <path
        d="M2.23716 16.3043C4.07072 18.5593 6.86712 20 10 20C13.1329 20 15.9293 18.5593 17.7628 16.3043C17.0593 14.3478 14.5217 10.4348 10 10.4348C5.47826 10.4348 2.94072 14.3478 2.23716 16.3043Z"
        fill="#E3E5E9"
      />
      <path
        d="M12.8261 5.65217C12.8261 7.21298 11.5608 8.47826 10 8.47826C8.4392 8.47826 7.17391 7.21298 7.17391 5.65217C7.17391 4.09137 8.4392 2.82609 10 2.82609C11.5608 2.82609 12.8261 4.09137 12.8261 5.65217Z"
        fill="#E3E5E9"
      />
    </svg>
  );
}

/** Placeholder nav rows — the menu's other entries shown as skeleton bars. */
function MenuSkeleton({ rows }: { rows: number }) {
  return (
    <div className="flex w-full flex-col gap-[10px]">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-[8px] w-full rounded-[4px] bg-[#f5f5f5]" />
      ))}
    </div>
  );
}

function AccountMenu({
  open,
  inboxCount,
  archivedCount,
}: {
  open: boolean;
  inboxCount: number;
  archivedCount: number;
}) {
  return (
    <div
      aria-hidden={!open}
      className={cn(
        "absolute bottom-0 left-0 top-8 z-20 flex w-[189px] flex-col gap-[21px] rounded-bl-[16px] bg-white px-[13px] py-[14px] font-ui",
        "shadow-[2px_0px_22.9px_0px_rgba(0,0,0,0.06)] transition-transform duration-700 ease-out",
        open ? "translate-x-0" : "-translate-x-full",
      )}
    >
      {/* Profile */}
      <div className="flex w-full items-center gap-[6px]">
        <ProfileAvatar className="size-5 shrink-0" />
        <p className="truncate text-[9px] font-semibold leading-5 tracking-[-0.15px] text-[#636363]">
          sample.inbox@superhuman.com
        </p>
      </div>

      {/* Inbox */}
      <div className="flex w-full items-center justify-between font-semibold leading-5 tracking-[-0.15px] text-[#636363]">
        <span className="text-[10px]">Inbox</span>
        <span className="text-[8px]">{inboxCount}</span>
      </div>

      <MenuSkeleton rows={2} />

      {/* Auto Archive — the emphasized destination for archived mail */}
      <div className="flex w-full items-center justify-between leading-5 tracking-[-0.15px] text-black">
        <span className="text-[11px] font-semibold">Auto Archive</span>
        <Counter
          value={open ? archivedCount : 0}
          delay={550}
          className="text-[12px] font-bold"
        />
      </div>

      <MenuSkeleton rows={4} />
    </div>
  );
}

// ── Auto Archive variant ─────────────────────────────────────────────────────

export function AutoArchiveInbox({
  mails,
  archivedLabels,
}: {
  mails: AutoArchiveMail[];
  archivedLabels: import("@/lib/types").AutoArchiveToggles;
}) {
  const anyArchived = Object.values(archivedLabels).some(Boolean);

  const { inboxCount, archivedCount } = useMemo(
    () => ({
      inboxCount: mails.filter((m) => !m.label || !archivedLabels[m.label]).length,
      archivedCount: mails.filter((m) => !!m.label && archivedLabels[m.label]).length,
    }),
    [mails, archivedLabels],
  );

  return (
    <PreviewShell>
      <AccountMenu
        open={anyArchived}
        inboxCount={inboxCount}
        archivedCount={archivedCount}
      />

      {/* The inbox is pushed right as the menu slides in (and clips on the
          right edge, matching the Figma storyboard). */}
      <div
        className={cn(
          "flex h-full flex-col transition-transform duration-700 ease-out",
          anyArchived ? "translate-x-[175px]" : "translate-x-0",
        )}
      >
        <div className="mb-4 flex items-center gap-4">
          {/* Hamburger cross-fades to a close (X) while the menu is open. */}
          <span className="relative block size-4 shrink-0">
            <IconHamburger
              className={cn(
                "absolute inset-0 size-4 transition-opacity duration-300",
                anyArchived ? "opacity-0" : "opacity-100",
              )}
            />
            <IconClose
              className={cn(
                "absolute inset-0 size-4 transition-opacity duration-300",
                anyArchived ? "opacity-100" : "opacity-0",
              )}
            />
          </span>
          <div className="flex flex-1 items-center justify-between">
            <span className="px-2 text-[12px] tracking-[-0.15px] text-ink">
              Inbox&nbsp;&nbsp;&nbsp;
              <Counter value={anyArchived ? inboxCount : mails.length} />
            </span>
            <PreviewIcons />
          </div>
        </div>

        {/* Every mail stays mounted; labelled rows collapse out (and back in)
            so the list visibly empties into Auto Archive. */}
        <div className="flex flex-col pl-10">
          {mails.map((m, i) => {
            const collapsed = !!m.label && !!archivedLabels[m.label];
            return (
              <div
                key={i}
                style={{ transitionDelay: collapsed ? "350ms" : "0ms" }}
                className={cn(
                  "overflow-hidden transition-all duration-500 ease-out",
                  collapsed ? "max-h-0 opacity-0" : "max-h-[44px] opacity-100",
                )}
              >
                <MailRow {...m} />
              </div>
            );
          })}
        </div>
      </div>
    </PreviewShell>
  );
}

// ── Split Inbox variant ──────────────────────────────────────────────────────

const TAB_ORDER: { key: SplitCategory; label: string }[] = [
  { key: "important", label: "Important" },
  { key: "calendar", label: "Calendar" },
  { key: "jira", label: "Jira" },
  { key: "other", label: "Other" },
];

export function SplitInbox({
  mails,
  toggles,
}: {
  mails: SplitMail[];
  toggles: SplitToggles;
}) {
  const [active, setActive] = useState<SplitCategory>("important");
  // Suppress CSS transitions for one frame on tab switch so emails snap
  // to their correct collapsed/expanded state without animating.
  const [noTransition, setNoTransition] = useState(false);

  function handleTabChange(tab: SplitCategory) {
    setNoTransition(true);
    setActive(tab);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => setNoTransition(false)),
    );
  }

  // All emails that could ever appear in a given tab — ignores toggles so we
  // always have every row mounted and can animate them in/out via CSS.
  const listFor = useCallback(
    (tab: SplitCategory): SplitMail[] => {
      if (tab === "calendar") return byCat(mails, "calendar");
      if (tab === "jira") return byCat(mails, "jira");
      if (tab === "other") return byCat(mails, "other");
      // Important shows its own mail plus the two toggleable categories so
      // their rows can fold in/out without unmounting.
      return mails.filter(
        (m) =>
          m.category === "important" ||
          m.category === "calendar" ||
          m.category === "jira",
      );
    },
    [mails],
  );

  // Actual counts shown in the tab pills (respects toggle state).
  const countFor = useCallback(
    (tab: SplitCategory): number => {
      if (tab === "calendar") return toggles.calendar ? byCat(mails, "calendar").length : 0;
      if (tab === "jira") return toggles.jira ? byCat(mails, "jira").length : 0;
      if (tab === "other") return byCat(mails, "other").length;
      return mails.filter(
        (m) =>
          m.category === "important" ||
          (m.category === "calendar" && !toggles.calendar) ||
          (m.category === "jira" && !toggles.jira),
      ).length;
    },
    [mails, toggles],
  );

  // Whether a specific row should be collapsed in the current tab view.
  const isCollapsed = useCallback(
    (mail: SplitMail): boolean => {
      if (active === "calendar") return !toggles.calendar;
      if (active === "jira") return !toggles.jira;
      if (active === "important") {
        // Fold calendar/jira emails back out when their toggle is ON
        // (they live in their own tab then, not in Important).
        if (mail.category === "calendar") return toggles.calendar;
        if (mail.category === "jira") return toggles.jira;
      }
      return false;
    },
    [active, toggles],
  );

  const shown = listFor(active);

  return (
    <PreviewShell>
      <div className="mb-4 flex items-center gap-4">
        <IconHamburger className="size-4 shrink-0" />
        <div className="flex flex-1 items-center gap-2">
          {TAB_ORDER.map(({ key, label }) => {
            const isActive = active === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => handleTabChange(key)}
                className={cn(
                  "flex items-center gap-1 rounded-[6px] px-2.5 py-1.5 text-[12px] transition-colors",
                  isActive
                    ? "bg-white text-black drop-shadow-[0px_2px_4px_rgba(0,0,0,0.12)]"
                    : "text-[#999] hover:bg-black/[0.03]",
                )}
              >
                <span>{label}</span>
                <Counter
                  value={countFor(key)}
                  delay={key === "important" ? 250 : 0}
                  className="inline-block w-4 text-right tabular-nums text-[10px] text-[#b5b5b5]"
                />
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex flex-1 flex-col overflow-hidden pl-10">
        {shown.map((mail) => {
          const collapsed = isCollapsed(mail);
          return (
            <div
              key={`${mail.sender}-${mail.subject}`}
              style={{ transitionDelay: collapsed ? "0ms" : "200ms" }}
              className={cn(
                "overflow-hidden",
                !noTransition && "transition-all duration-500 ease-out",
                collapsed ? "max-h-0 opacity-0" : "max-h-[44px] opacity-100",
              )}
            >
              <MailRow sender={mail.sender} subject={mail.subject} date={mail.date} />
            </div>
          );
        })}
      </div>
    </PreviewShell>
  );
}

function byCat(mails: SplitMail[], cat: SplitCategory) {
  return mails.filter((m) => m.category === cat);
}
