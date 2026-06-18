"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { LabelChip } from "./label-chip";
import type {
  AutoArchiveMail,
  AutoArchiveToggles,
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

// ── Browser chrome ───────────────────────────────────────────────────────────

function TitleBar() {
  return (
    <div className="absolute inset-x-0 top-0 z-30 flex h-8 items-center rounded-t-[16px] border-b border-black/5 bg-[#f5f5f5]/80 px-3.5 backdrop-blur-xl">
      <div className="flex items-center gap-1.5">
        <span className="block size-[10px] rounded-full border border-[#d0d0d0]" />
        <span className="block size-[10px] rounded-full border border-[#d0d0d0]" />
        <span className="block size-[10px] rounded-full border border-[#d0d0d0]" />
      </div>
      <div className="mx-auto flex h-[19px] w-[339px] items-center justify-center rounded-[2px] border-[0.6px] border-[#edecec] bg-white/40">
        <span className="text-[8px] text-[#999]">sample.inbox@superhuman.com</span>
      </div>
    </div>
  );
}

function PreviewShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex h-[533px] w-[570px] max-w-full flex-col overflow-hidden rounded-[16px] bg-white px-6 pt-16 shadow-[0_0_2px_rgba(20,20,19,0.12),0_6px_24px_rgba(20,20,19,0.12)]">
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
      <p className="w-[120px] shrink-0 truncate text-[11px] font-semibold tracking-[-0.15px] text-mail">
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

      <MenuSkeleton rows={2} />

      {/* Auto Archive — the emphasized destination for archived mail */}
      <div className="flex w-full items-center justify-between leading-5 tracking-[-0.15px] text-black">
        {/* Re-keying on archivedCount remounts the span so the pop animation
            replays each time the archived total changes (no setState effect). */}
        <span
          key={archivedCount}
          style={{ display: "inline-block", animation: archivedCount > 0 ? "label-pop 700ms ease-out 500ms both" : "none" }}
          className="text-[11px] font-semibold"
        >Auto Archived</span>
        <Counter
          value={open ? archivedCount : 0}
          delay={750}
          className="text-[10px] text-[#b5b5b5]"
        />
      </div>

      <MenuSkeleton rows={4} />
    </div>
  );
}

// ── Auto Archive content ──────────────────────────────────────────────────────

function AutoArchiveContent({
  mails,
  archivedLabels,
}: {
  mails: AutoArchiveMail[];
  archivedLabels: AutoArchiveToggles;
}) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setReady(true), 700);
    return () => clearTimeout(id);
  }, []);

  const effective = useMemo(
    () => ready ? archivedLabels : { marketing: false, news: false, pitch: false, social: false },
    [ready, archivedLabels],
  );
  const anyArchived = Object.values(effective).some(Boolean);

  const { inboxCount, archivedCount } = useMemo(
    () => ({
      inboxCount: mails.filter((m) => !m.label || !effective[m.label]).length,
      archivedCount: mails.filter((m) => !!m.label && effective[m.label]).length,
    }),
    [mails, effective],
  );

  return (
    <>
      <AccountMenu
        open={anyArchived}
        inboxCount={inboxCount}
        archivedCount={archivedCount}
      />

      {/* When the menu slides in, the whole inbox (header + list) shifts right
          to sit in the content area beside the menu (clipping on the right edge,
          matching the Figma storyboard). The "Inbox" title is padded to share the
          mail list's left edge so the two stay left-aligned in both states. */}
      <div
        className={cn(
          "flex h-full flex-col transition-transform duration-700 ease-out",
          anyArchived ? "translate-x-[135px]" : "translate-x-0",
        )}
      >
        <div className="mb-4 flex items-center">
          <IconHamburger
            className={cn(
              "size-3 shrink-0 transition-opacity duration-300",
              anyArchived ? "opacity-0" : "opacity-100",
            )}
          />
          <span className="flex items-baseline gap-1.5 pl-[28px] text-[13px] tracking-[-0.15px] text-ink">
            Inbox
            <Counter value={anyArchived ? inboxCount : mails.length} className="text-[10px] text-[#b5b5b5] tabular-nums" />
          </span>
        </div>

        {/* Every mail stays mounted; labelled rows collapse out (and back in)
            so the list visibly empties into Auto Archive. */}
        <div className="flex flex-col pl-10">
          {mails.map((m, i) => {
            const collapsed = !!m.label && !!effective[m.label];
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
    </>
  );
}

/** Standalone Auto Archive inbox — wraps AutoArchiveContent in its own shell. */
export function AutoArchiveInbox({
  mails,
  archivedLabels,
}: {
  mails: AutoArchiveMail[];
  archivedLabels: AutoArchiveToggles;
}) {
  return (
    <PreviewShell>
      <AutoArchiveContent mails={mails} archivedLabels={archivedLabels} />
    </PreviewShell>
  );
}

// ── Split Inbox content ──────────────────────────────────────────────────────

const TAB_ORDER: { key: SplitCategory; label: string }[] = [
  { key: "important", label: "Important" },
  { key: "calendar", label: "Calendar" },
  { key: "jira", label: "Jira" },
  { key: "other", label: "Other" },
];

// Entrance phases (Important view stays active throughout):
// 0 = Important tab only, full list (important + calendar + jira rows visible)
// 1 = Calendar tab slides in, calendar emails collapse
// 2 = Jira tab slides in, jira emails collapse
// 3 = Other tab slides in
// 4 = animation done — normal interactive state
const ENTRANCE_DELAYS = [500, 1100, 1700, 2400]; // ms for phases 1–4

function SplitInboxContent({
  mails,
  toggles,
}: {
  mails: SplitMail[];
  toggles: SplitToggles;
}) {
  const [active, setActive] = useState<SplitCategory>("important");
  const [noTransition, setNoTransition] = useState(false);
  const [phase, setPhase] = useState<0 | 1 | 2 | 3 | 4>(0);

  useEffect(() => {
    const timers = ENTRANCE_DELAYS.map((delay, i) =>
      setTimeout(() => setPhase((i + 1) as 1 | 2 | 3 | 4), delay),
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const animating = phase < 4;

  // If the selected tab's category gets toggled off (its tab disappears),
  // fall back to Important — derived in render so there's no setState effect.
  const effectiveActive: SplitCategory =
    (active === "calendar" && !toggles.calendar) ||
    (active === "jira" && !toggles.jira)
      ? "important"
      : active;

  function handleTabChange(tab: SplitCategory) {
    if (animating) return;
    setNoTransition(true);
    setActive(tab);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => setNoTransition(false)),
    );
  }

  const listFor = useCallback(
    (tab: SplitCategory): SplitMail[] => {
      if (tab === "calendar") return byCat(mails, "calendar");
      if (tab === "jira") return byCat(mails, "jira");
      if (tab === "other") return byCat(mails, "other");
      // Important includes calendar+jira rows so they can animate in/out.
      return mails.filter(
        (m) =>
          m.category === "important" ||
          m.category === "calendar" ||
          m.category === "jira",
      );
    },
    [mails],
  );

  const countFor = useCallback(
    (tab: SplitCategory): number => {
      if (!animating) {
        if (tab === "calendar") return toggles.calendar ? byCat(mails, "calendar").length : 0;
        if (tab === "jira") return toggles.jira ? byCat(mails, "jira").length : 0;
        if (tab === "other") return byCat(mails, "other").length;
        return mails.filter(
          (m) =>
            m.category === "important" ||
            (m.category === "calendar" && !toggles.calendar) ||
            (m.category === "jira" && !toggles.jira),
        ).length;
      }
      // During animation the Important counter ticks down as tabs claim emails.
      if (tab === "important") {
        const imp = byCat(mails, "important").length;
        const cal = byCat(mails, "calendar").length;
        const jira = byCat(mails, "jira").length;
        const other = byCat(mails, "other").length;
        if (phase === 0) return imp + cal + jira + other;
        if (phase === 1) return imp + jira + other;
        if (phase === 2) return imp + other;
        return imp; // phase 3+
      }
      if (tab === "calendar") return byCat(mails, "calendar").length;
      if (tab === "jira") return byCat(mails, "jira").length;
      return byCat(mails, "other").length;
    },
    [animating, phase, mails, toggles],
  );

  const isCollapsed = useCallback(
    (mail: SplitMail): boolean => {
      if (animating) {
        // Collapse a row the moment its tab has appeared and claimed it.
        if (mail.category === "calendar") return phase >= 1;
        if (mail.category === "jira") return phase >= 2;
        if (mail.category === "other") return phase >= 3;
        return false;
      }
      if (effectiveActive === "calendar") return !toggles.calendar;
      if (effectiveActive === "jira") return !toggles.jira;
      if (effectiveActive === "important") {
        if (mail.category === "calendar") return toggles.calendar;
        if (mail.category === "jira") return toggles.jira;
      }
      return false;
    },
    [animating, phase, effectiveActive, toggles],
  );

  // During animation: phase 0 shows ALL non-archived mails (important + calendar
  // + jira + other) so the inbox looks identical to the end of the Auto Archive
  // step. Tabs then claim their mails one by one. After phase 4 the user can
  // switch freely.
  const shown = useMemo(() => {
    if (!animating) return listFor(effectiveActive);
    const base = mails.filter(
      (m) =>
        m.category === "important" ||
        m.category === "calendar" ||
        m.category === "jira",
    );
    // Include other mails until the Other tab appears and claims them (phase 3).
    if (phase < 3) return [...base, ...byCat(mails, "other")];
    return base;
  }, [animating, phase, mails, listFor, effectiveActive]);

  // Pre-compute collapse state + stagger delays in render order so that
  // collapsing rows cascade out one-by-one rather than all at once.
  let collapseOrder = 0;
  const mailItems = shown.map((mail) => {
    const collapsed = isCollapsed(mail);
    const delay = collapsed ? collapseOrder++ * 22 : 50;
    return { mail, collapsed, delay };
  });

  // Which phase a tab first enters the DOM (and plays its slide-in animation).
  const tabPhaseFor = (key: SplitCategory) =>
    key === "important" ? 0 : key === "calendar" ? 1 : key === "jira" ? 2 : 3;

  return (
    <>
      <div className="mb-4 flex items-center gap-4">
        <IconHamburger className="size-3 shrink-0" />
        <div className="flex flex-1 items-center gap-2">
          {TAB_ORDER.map(({ key, label }) => {
            const tp = tabPhaseFor(key);
            // Tabs are not in the DOM until their phase is reached — this
            // prevents invisible elements from occupying horizontal space.
            if (phase < tp) return null;
            // After animation, hide tabs whose category is toggled off.
            if (!animating && key === "calendar" && !toggles.calendar) return null;
            if (!animating && key === "jira" && !toggles.jira) return null;

            const isActive = animating ? key === "important" : effectiveActive === key;
            // Only Calendar/Jira/Other animate in; Important is always present.
            const enterAnim = tp > 0 ? "tab-enter 500ms ease-out" : undefined;

            return (
              <button
                key={key}
                type="button"
                onClick={() => handleTabChange(key)}
                style={{ animation: enterAnim }}
                className={cn(
                  "flex items-center gap-1 rounded-[6px] px-2.5 py-1.5 text-[12px]",
                  isActive
                    ? "bg-white text-black drop-shadow-[0px_2px_4px_rgba(0,0,0,0.12)]"
                    : "text-[#999] hover:bg-black/[0.03]",
                )}
              >
                <span>{label}</span>
                <Counter
                  value={countFor(key)}
                  className="inline-block w-4 text-right tabular-nums text-[10px] text-[#b5b5b5]"
                />
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex flex-1 flex-col overflow-hidden pl-10">
        {mailItems.map(({ mail, collapsed, delay }) => (
          <div
            key={`${mail.sender}-${mail.subject}`}
            style={{
              display: "grid",
              gridTemplateRows: collapsed ? "0fr" : "1fr",
              opacity: collapsed ? 0 : 1,
              transform: collapsed ? "translateY(-4px)" : "translateY(0)",
              ...(noTransition
                ? {}
                : {
                    transition: `grid-template-rows 380ms ease ${delay}ms, opacity 280ms ease ${delay}ms, transform 280ms ease ${delay}ms`,
                  }),
            }}
          >
            <div style={{ overflow: "hidden", minHeight: 0 }}>
              <MailRow sender={mail.sender} subject={mail.subject} date={mail.date} label={mail.label} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/** Standalone Split Inbox preview — wraps SplitInboxContent in its own shell. */
export function SplitInbox({
  mails,
  toggles,
}: {
  mails: SplitMail[];
  toggles: SplitToggles;
}) {
  return (
    <PreviewShell>
      <SplitInboxContent mails={mails} toggles={toggles} />
    </PreviewShell>
  );
}

// ── Chapter 2 persistent shell ────────────────────────────────────────────────

/**
 * Keeps the PreviewShell chrome (card, shadow, titlebar) mounted across the
 * auto-archive → split-inbox transition. Only the inner content swaps on step
 * change, so the white card never flashes or unmounts mid-transition.
 */
export function Chapter2Preview({
  step,
  archivedMails,
  archivedLabels,
  splitMails,
  splits,
}: {
  step: "auto-archive" | "split-inbox";
  archivedMails: AutoArchiveMail[];
  archivedLabels: AutoArchiveToggles;
  splitMails: SplitMail[];
  splits: SplitToggles;
}) {
  // Strip out mails whose archive label is currently active — so the Split Inbox
  // only shows mail that survived the Auto Archive step the user just configured.
  const visibleSplitMails = splitMails.filter(
    (m) => !m.label || !archivedLabels[m.label],
  );

  return (
    <PreviewShell>
      {step === "auto-archive" ? (
        <AutoArchiveContent key="archive" mails={archivedMails} archivedLabels={archivedLabels} />
      ) : (
        <SplitInboxContent key="split" mails={visibleSplitMails} toggles={splits} />
      )}
    </PreviewShell>
  );
}

function byCat(mails: SplitMail[], cat: SplitCategory) {
  return mails.filter((m) => m.category === cat);
}
