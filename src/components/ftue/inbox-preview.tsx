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
    <div
      className="relative flex h-[533px] w-[570px] max-w-full flex-col overflow-hidden rounded-[16px] bg-white px-6 pt-16 shadow-[0_0_2px_rgba(20,20,19,0.12),0_6px_24px_rgba(20,20,19,0.12)]"
      style={{ animation: "screen-enter 420ms ease-out both" }}
    >
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
  pulseLabel = false,
}: {
  sender: string;
  subject: string;
  date: string;
  label?: AutoArchiveMail["label"];
  /** Pulse this row's label chip (matching label card hovered). */
  pulseLabel?: boolean;
}) {
  return (
    <div className="flex items-center py-[10px]">
      <div className="flex w-[175px] shrink-0 items-center pr-6">
        <p className="min-w-0 flex-1 truncate text-[12px] font-semibold leading-4 tracking-[-0.15px] text-mail">
          {sender}
        </p>
      </div>
      <div className="flex min-w-0 flex-1 items-center gap-2 pr-6">
        {label && <LabelChip label={label} pulse={pulseLabel} />}
        <p className="min-w-0 flex-1 truncate text-[12px] leading-4 tracking-[-0.15px] text-mail">
          {subject}
        </p>
      </div>
      <p className="shrink-0 whitespace-nowrap text-right text-[12px] leading-4 tracking-[-0.15px] uppercase text-mail-meta">
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
  // No step-by-step count — when the value changes we just swap to the new
  // number and pop it in (fade + slight rise). Mounts showing the target so
  // only actual changes animate.
  const [display, setDisplay] = useState(value);
  const [animKey, setAnimKey] = useState(0);
  const prev = useRef(value);

  useEffect(() => {
    if (prev.current === value) return;
    prev.current = value;
    const timer = window.setTimeout(() => {
      setDisplay(value);
      setAnimKey((k) => k + 1);
    }, delay);
    return () => window.clearTimeout(timer);
  }, [value, delay]);

  return (
    <span className={className}>
      <span
        key={animKey}
        style={animKey ? { display: "inline-block", animation: "count-pop 450ms ease-out" } : undefined}
      >
        {display}
      </span>
    </span>
  );
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
          style={{ display: "inline-block", animation: archivedCount > 0 ? "label-pop 700ms ease-out 1400ms both" : "none" }}
          className="text-[11px] font-semibold"
        >Auto Archived</span>
        <Counter
          value={open ? archivedCount : 0}
          delay={1400}
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
  closing = false,
  hoverLabel = null,
}: {
  mails: AutoArchiveMail[];
  archivedLabels: AutoArchiveToggles;
  closing?: boolean;
  hoverLabel?: AutoArchiveMail["label"] | null;
}) {
  // Phase 1: menu slides in + content shifts right.
  // Phase 2: marketing mails collapse (starts after menu has settled).
  // Phase 3: "Auto Archived" counter tweens up (after mails are gone).
  const [menuOpen, setMenuOpen] = useState(false);
  const [collapseActive, setCollapseActive] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setMenuOpen(true), 1000);
    const t2 = setTimeout(() => setCollapseActive(true), 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const hasArchivable = Object.values(archivedLabels).some(Boolean);
  // On Continue the menu slides out (content shifts back to x-0) so the Split
  // Inbox can pick up seamlessly — but the archived mails stay collapsed, so
  // nothing reloads: the visible list is identical to Split's opening frame.
  const showMenu = menuOpen && hasArchivable && !closing;

  const { inboxCount, archivedCount } = useMemo(() => ({
    inboxCount: collapseActive
      ? mails.filter((m) => !m.label || !archivedLabels[m.label]).length
      : mails.length,
    archivedCount: collapseActive
      ? mails.filter((m) => !!m.label && !!archivedLabels[m.label]).length
      : 0,
  }), [mails, archivedLabels, collapseActive]);

  return (
    <>
      <AccountMenu open={showMenu} inboxCount={inboxCount} archivedCount={archivedCount} />

      <div
        className={cn(
          "flex h-full flex-col transition-transform duration-700 ease-out",
          showMenu ? "translate-x-[159px]" : "translate-x-0",
        )}
      >
        <div className="mb-10 flex items-center gap-[13px]">
          <IconHamburger
            className={cn(
              "size-4 shrink-0 transition-opacity duration-300",
              showMenu ? "opacity-0" : "opacity-100",
            )}
          />
          <span className="flex items-center gap-[5px] text-[16px] tracking-[-0.15px] text-ink">
            Inbox
            <Counter value={inboxCount} className="text-[16px] text-[rgba(0,0,0,0.4)] tabular-nums" />
          </span>
        </div>

        <div className="flex flex-col pl-[30px]">
          {(() => {
            let archivedSeq = 0;
            return mails.map((m, i) => {
              const collapsed = !!m.label && !!archivedLabels[m.label] && collapseActive;
              const delay = collapsed ? 200 + archivedSeq++ * 120 : 0;
              return (
                <div
                  key={i}
                  style={{ transitionDelay: `${delay}ms` }}
                  className={cn(
                    "overflow-hidden transition-all duration-[900ms] ease-out",
                    collapsed ? "max-h-0 opacity-0" : "max-h-[44px] opacity-100",
                  )}
                >
                  <MailRow {...m} pulseLabel={!!m.label && m.label === hoverLabel} />
                </div>
              );
            });
          })()}
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

// After a brief beat the "Inbox" header cross-fades to the "Important" tab.
const PHASE1_AT = 800;
// Phase offsets from PHASE1_AT: Calendar immediately, then slightly longer for Jira/Other
const PHASE_OFFSETS = [600, 1500, 2400, 2900]; // phases 2→5
const COLLAPSE_STAGGER = 100; // ms between successive mails within a category

function SplitInboxContent({
  mails,
  toggles,
  hovering = false,
  transitioning = false,
  hoverTab = null,
}: {
  mails: SplitMail[];
  toggles: SplitToggles;
  hovering?: boolean;
  transitioning?: boolean;
  hoverTab?: SplitCategory | null;
}) {
  const [active, setActive] = useState<SplitCategory>("important");
  const [noTransition, setNoTransition] = useState(false);
  const [phase, setPhase] = useState<0 | 1 | 2 | 3 | 4 | 5>(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    // Phase 1: "Inbox" cross-fades into the "Important" tab.
    timers.push(setTimeout(() => setPhase(1), PHASE1_AT));
    // Calendar immediately after, Jira + Other with slightly longer pauses
    ([2, 3, 4, 5] as const).forEach((p, i) => {
      timers.push(setTimeout(() => setPhase(p), PHASE1_AT + PHASE_OFFSETS[i]));
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  const animating = phase < 5;

  // If the selected tab's category gets toggled off fall back to Important.
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
      // During animation the Important counter decreases naturally as each
      // category tab appears and claims its mails. Counter tweens smoothly.
      if (tab !== "important") return byCat(mails, tab).length;
      const imp = byCat(mails, "important").length;
      const cal = byCat(mails, "calendar").length;
      const jira = byCat(mails, "jira").length;
      const other = byCat(mails, "other").length;
      if (phase < 2) return imp + cal + jira + other;
      if (phase < 3) return imp + jira + other;
      if (phase < 4) return imp + other;
      return imp;
    },
    [animating, phase, mails, toggles],
  );

  const isCollapsed = useCallback(
    (mail: SplitMail): boolean => {
      if (animating) {
        if (mail.category === "calendar") return phase >= 2;
        if (mail.category === "jira") return phase >= 3;
        if (mail.category === "other") return phase >= 4;
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

  // All mails stay in the DOM during animation; isCollapsed + CSS handle visibility.
  const shown = useMemo(
    () => (animating ? mails : listFor(effectiveActive)),
    [animating, mails, listFor, effectiveActive],
  );

  // Compute per-mail collapse delay: stagger within each category by list order.
  const catIdx: Partial<Record<SplitCategory, number>> = {};
  const mailItems = shown.map((mail) => {
    const collapsed = isCollapsed(mail);
    let delay = 0;
    if (collapsed && animating) {
      const idx = catIdx[mail.category] ?? 0;
      catIdx[mail.category] = idx + 1;
      delay = idx * COLLAPSE_STAGGER;
    }
    return { mail, collapsed, delay };
  });

  // Which phase each tab first enters the DOM.
  const tabPhase = (key: SplitCategory) =>
    key === "important" ? 1 : key === "calendar" ? 2 : key === "jira" ? 3 : 4;

  return (
    <>
      {/* mb-10 matches Auto Archive's header gap so the mail list sits at the
          exact same Y — no vertical jump when switching from Auto Archive. */}
      <div className="mb-10 flex items-center gap-[13px]">
        <IconHamburger className="size-4 shrink-0" />
        {/* "Inbox" cross-fades into the tab bar — both sit at the same left
            edge, so as "Inbox" fades out "Important" fades in over it. */}
        <div className="relative flex flex-1 items-center">
          <div
            className={cn(
              "flex items-center gap-[5px] text-[16px] text-ink",
              phase >= 1 && "pointer-events-none absolute inset-y-0 left-0",
            )}
            style={{ opacity: phase === 0 ? 1 : 0, transition: "opacity 350ms ease-out" }}
          >
            <span>Inbox</span>
            <Counter
              value={mails.length}
              className="tabular-nums text-[16px] text-[rgba(0,0,0,0.4)]"
            />
          </div>

          {phase >= 1 && (
            // Tab bar: flat 16px text — active tab darker (0.9), others 0.4.
            // Fades in over "Inbox"; Calendar/Jira/Other slide in (tab-enter).
            <div
              className="flex flex-1 items-center"
              style={{ animation: "preview-fade 350ms ease-out both" }}
            >
              {TAB_ORDER.map(({ key, label }) => {
                const tp = tabPhase(key);
                if (phase < tp) return null;
                if (!animating && key === "calendar" && !toggles.calendar) return null;
                if (!animating && key === "jira" && !toggles.jira) return null;

                const isActive = animating ? key === "important" : effectiveActive === key;

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleTabChange(key)}
                    style={tp > 1 ? { animation: "tab-enter 500ms ease-out" } : undefined}
                    className={cn(
                      "flex items-center gap-[5px] pr-6 text-[16px] transition-colors",
                      isActive
                        ? "text-ink"
                        : "text-[rgba(0,0,0,0.4)] hover:text-[rgba(0,0,0,0.65)]",
                    )}
                  >
                    {/* Inner wrapper pulses when the matching left card is hovered. */}
                    <span
                      className="flex origin-left items-center gap-[5px]"
                      style={hoverTab === key ? { animation: "tab-pulse 700ms ease-in-out" } : undefined}
                    >
                      <span>{label}</span>
                      <Counter
                        value={countFor(key)}
                        className="tabular-nums text-[16px] text-[rgba(0,0,0,0.4)]"
                      />
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col overflow-hidden pl-[30px]">
        {mailItems.map(({ mail, collapsed, delay }) => {
          const isFeatured = !animating && mail.sender === "Maria Howard" && mail.subject === "Sales Contract";
          return (
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
                      transition: `grid-template-rows 420ms ease-out ${delay}ms, opacity 320ms ease-out ${delay}ms, transform 320ms ease-out ${delay}ms`,
                    }),
              }}
            >
              <div
                style={{ overflow: "hidden", minHeight: 0 }}
                className={cn(
                  // px+(-mx) lets the highlight bleed further left & right than
                  // the mail content without shifting the rows.
                  "-mx-5 rounded-[4px] px-5 transition-colors duration-500",
                  isFeatured && transitioning ? "bg-[rgba(174,177,221,0.28)]" : "",
                  isFeatured && hovering && !transitioning ? "bg-[rgba(174,177,221,0.15)] cursor-pointer" : "",
                )}
              >
                <MailRow sender={mail.sender} subject={mail.subject} date={mail.date} label={mail.label} />
              </div>
            </div>
          );
        })}
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

// Derives a SplitCategory from an AutoArchiveMail so the Split Inbox animation
// can use the exact same mail objects the user just saw in Auto Archive.
function toSplitMail(m: AutoArchiveMail): SplitMail {
  let category: SplitCategory;
  if (m.label) {
    category = "other";
  } else if (m.sender === "Jira") {
    category = "jira";
  } else if (/^(Invitation:|Updated invitation:|Tentatively Accepted:|Declined:)/.test(m.subject)) {
    category = "calendar";
  } else {
    category = "important";
  }
  return { sender: m.sender, subject: m.subject, date: m.date, category, label: m.label };
}

/**
 * Keeps the PreviewShell chrome (card, shadow, titlebar) mounted across the
 * auto-archive → split-inbox transition. Only the inner content swaps on step
 * change, so the white card never flashes or unmounts mid-transition.
 */
export function Chapter2Preview({
  step,
  archivedMails,
  archivedLabels,
  splitMails: _splitMails,
  splits,
  closing = false,
  hovering = false,
  transitioning = false,
  hoverLabel = null,
  hoverTab = null,
}: {
  step: "auto-archive" | "split-inbox";
  archivedMails: AutoArchiveMail[];
  archivedLabels: AutoArchiveToggles;
  splitMails: SplitMail[];
  splits: SplitToggles;
  closing?: boolean;
  hovering?: boolean;
  transitioning?: boolean;
  hoverLabel?: AutoArchiveMail["label"] | null;
  hoverTab?: SplitCategory | null;
}) {
  const animMails = archivedMails
    .filter((m) => !m.label || !archivedLabels[m.label])
    .map(toSplitMail);

  return (
    <div
      style={{
        opacity: transitioning ? 0 : 1,
        transform: transitioning ? "scale(0.97)" : "scale(1)",
        transition: "opacity 400ms ease-out 300ms, transform 400ms ease-out 300ms",
      }}
    >
      <PreviewShell>
        {step === "auto-archive" ? (
          <AutoArchiveContent key="archive" mails={archivedMails} archivedLabels={archivedLabels} closing={closing} hoverLabel={hoverLabel} />
        ) : (
          <SplitInboxContent key="split" mails={animMails} toggles={splits} hovering={hovering} transitioning={transitioning} hoverTab={hoverTab} />
        )}
      </PreviewShell>
    </div>
  );
}

function byCat(mails: SplitMail[], cat: SplitCategory) {
  return mails.filter((m) => m.category === cat);
}
