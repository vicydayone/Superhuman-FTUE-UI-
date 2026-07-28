"use client";

import { useEffect, useState } from "react";
import { Stepper } from "@/components/ftue/stepper";
import { IntroScreen } from "@/components/ftue/intro-screen";
import { WelcomeScreen, SignInScreen } from "@/components/ftue/auth-landing";
import {
  GoogleAccountScreen,
  GoogleConsentScreen,
  GoogleScopesScreen,
  SigningInScreen,
} from "@/components/ftue/google-auth";
import { AutoArchiveLeft } from "@/components/ftue/auto-archive-screen";
import { SplitInboxLeft } from "@/components/ftue/split-inbox-screen";
import { AutoDraftLeft } from "@/components/ftue/auto-draft-screen";
import { AutoReminderLeft } from "@/components/ftue/auto-reminder-screen";
import { AskAiLeft } from "@/components/ftue/ask-ai-screen";
import { SeatsLeft } from "@/components/ftue/seats-screen";
import { DoneCard } from "@/components/ftue/done-screen";
import { Chapter2Preview } from "@/components/ftue/inbox-preview";
import { WorkflowPreview, SeatsPreview } from "@/components/ftue/workflow-previews";
import { AUTO_ARCHIVE_MAIL, SPLIT_MAIL, REMINDER_OPTIONS } from "@/lib/data";
import { cn } from "@/lib/utils";
import type {
  AutoArchiveToggles,
  AutoDraftDemo,
  Chapter1Step,
  FlowStep,
  MailLabel,
  ReminderChoice,
  SplitCategory,
  SplitToggles,
} from "@/lib/types";

/** Chapter 1 steps, in order — full-screen, no stepper / progress bar. */
const CHAPTER1: Chapter1Step[] = [
  "welcome",
  "signin",
  "google-account",
  "google-consent",
  "google-scopes",
  "signing-in",
];

/** Which chapter is active + how many progress segments are filled, per step. */
const STEPPER_META: Record<
  Exclude<FlowStep, "intro" | Chapter1Step>,
  { activeStep: 2 | 3 | "done"; progress: number }
> = {
  "auto-archive": { activeStep: 2, progress: 1 },
  "split-inbox": { activeStep: 2, progress: 2 },
  "auto-draft": { activeStep: 3, progress: 1 },
  "auto-reminder": { activeStep: 3, progress: 2 },
  "ask-ai": { activeStep: 3, progress: 3 },
  seats: { activeStep: 3, progress: 4 },
  done: { activeStep: "done", progress: 0 },
};

export default function Home() {
  const [step, setStep] = useState<FlowStep>("welcome");
  const [archivedLabels, setArchivedLabels] = useState<AutoArchiveToggles>({
    marketing: true,
    news: false,
    pitch: false,
    social: false,
  });
  // Snapshot of the user's archive selections at the moment they click
  // Continue, so Split Inbox's filter stays stable even if archivedLabels
  // changes later (e.g. navigating back to Auto Archive and tweaking it).
  const [savedArchivedLabels, setSavedArchivedLabels] = useState<AutoArchiveToggles>({
    marketing: true,
    news: false,
    pitch: false,
    social: false,
  });
  const [splits, setSplits] = useState<SplitToggles>({
    calendar: true,
    jira: true,
  });
  // Which left-column card is hovered → pulse the matching tag / tab in preview.
  const [archiveHoverLabel, setArchiveHoverLabel] = useState<MailLabel | null>(null);
  const [splitHoverTab, setSplitHoverTab] = useState<SplitCategory | null>(null);
  const [splitHovering, setSplitHovering] = useState(false);
  const [splitTransitioning, setSplitTransitioning] = useState(false);
  const [draftDemo, setDraftDemo] = useState<AutoDraftDemo>("responses");
  const [reminder, setReminder] = useState<ReminderChoice>("couple-days");
  const [reminderHover, setReminderHover] = useState<ReminderChoice | null>(null);
  const [askDemo, setAskDemo] = useState(0);
  // Team Seats has two variants: seats pre-purchased (default) vs. no seats
  // purchased (teammates billed as added). Toggled via the prototype switch
  // on the Seats screen.
  const [noSeats, setNoSeats] = useState(false);
  // Experiment: 3 alternate entrance treatments for Auto Archive, switchable
  // live via the prototype control on that screen (for demoing side by side
  // in a meeting). All 3 replay from scratch on variant change or Replay.
  //   V1 — dramatic: layout collapses so the preview is alone, dead-center,
  //        then the whole frame + stepper "pop" in together once the
  //        preview's own build animation is fully done + a 2s beat.
  //   V2 — quiet: position never moves (matches the Split Inbox treatment);
  //        only the left column's options wait for the build animation.
  //   V3 — no preview at all: the left content shows alone, centered on
  //        screen in a card.
  const [archiveDemoVariant, setArchiveDemoVariant] = useState<1 | 2 | 3>(1);
  const [archiveReplayKey, setArchiveReplayKey] = useState(0);
  const [archiveReveal, setArchiveReveal] = useState(false);

  // AutoArchiveContent's own build animation (mail collapsing into "Auto
  // Archived"): collapseActive fires at 900ms, then the 3 marketing-labelled
  // mails collapse in sequence at +200/+320/+440ms with a 900ms transition
  // each — the last one finishes at 900+440+900 = 2240ms after mount.
  const AUTO_ARCHIVE_BUILD_MS = 2240;

  useEffect(() => {
    if (step !== "auto-archive") return;
    if (archiveDemoVariant === 3) {
      // No preview, nothing to wait on — show the centered card right away.
      setArchiveReveal(true);
      return;
    }
    setArchiveReveal(false);
    const revealAt =
      archiveDemoVariant === 1
        ? AUTO_ARCHIVE_BUILD_MS + 2000 // V1: full build animation + a 2s beat
        : AUTO_ARCHIVE_BUILD_MS + 300; // V2: right after, just a breath of room
    const t = setTimeout(() => setArchiveReveal(true), revealAt);
    return () => clearTimeout(t);
  }, [step, archiveDemoVariant, archiveReplayKey]);

  // Split Inbox now gets the same V1 dramatic treatment as Auto Archive:
  // layout collapses so the preview is alone, dead-center, then the whole
  // frame + left content pop in together once the preview's own tab
  // build-up animation (Chapter2Preview's phase 0→5, see PHASE_OFFSETS in
  // inbox-preview.tsx — finishes at 4900ms) is fully done + a 2s beat.
  const SPLIT_BUILD_MS = 4900;
  const [splitLeftReady, setSplitLeftReady] = useState(false);

  useEffect(() => {
    if (step !== "split-inbox") return;
    setSplitLeftReady(false);
    const t = setTimeout(() => setSplitLeftReady(true), SPLIT_BUILD_MS + 2000);
    return () => clearTimeout(t);
  }, [step]);

  const restart = () => {
    setArchivedLabels({ marketing: true, news: false, pitch: false, social: false });
    setSavedArchivedLabels({ marketing: true, news: false, pitch: false, social: false });
    setSplits({ calendar: true, jira: true });
    setDraftDemo("responses");
    setReminder("couple-days");
    setAskDemo(0);
    setNoSeats(false);
    setArchiveHoverLabel(null);
    setSplitHoverTab(null);
    setSplitHovering(false);
    setSplitTransitioning(false);
    setStep("welcome");
  };

  // Hovering an option previews its wait; falls back to the selected choice.
  const reminderWait =
    REMINDER_OPTIONS.find((o) => o.key === (reminderHover ?? reminder))?.wait ??
    "2 days later";

  // ── Left-column content per step ──────────────────────────────────────────
  const leftFor = () => {
    switch (step) {
      case "auto-archive":
        return (
          <AutoArchiveLeft
            archivedLabels={archivedLabels}
            onToggle={(key) =>
              setArchivedLabels((prev) => ({ ...prev, [key]: !prev[key] }))
            }
            onHover={setArchiveHoverLabel}
            onContinue={() => {
              // Snapshot the user's selection for the Split filter.
              setSavedArchivedLabels({ ...archivedLabels });
              setStep("split-inbox");
            }}
          />
        );
      case "split-inbox":
        return (
          <SplitInboxLeft
            toggles={splits}
            onToggle={(key, value) => setSplits((s) => ({ ...s, [key]: value }))}
            onHover={setSplitHoverTab}
            onContinue={() => {
              setSplitHovering(true);
              setTimeout(() => {
                setSplitHovering(false);
                setSplitTransitioning(true);
                setTimeout(() => setStep("auto-draft"), 800);
              }, 1400);
            }}
          />
        );
      case "auto-draft":
        return (
          <AutoDraftLeft
            onHover={setDraftDemo}
            onContinue={() => setStep("auto-reminder")}
          />
        );
      case "auto-reminder":
        return (
          <AutoReminderLeft
            choice={reminder}
            onChoiceChange={setReminder}
            onHover={setReminderHover}
            onContinue={() => setStep("ask-ai")}
          />
        );
      case "ask-ai":
        return (
          <AskAiLeft
            onHover={setAskDemo}
            onContinue={() => setStep("seats")}
          />
        );
      case "seats":
        // key={noSeats} remounts the column on toggle so the invite state
        // (added teammates) resets cleanly between the two variants.
        return <SeatsLeft key={String(noSeats)} noSeats={noSeats} onContinue={() => setStep("done")} />;
      default:
        return null;
    }
  };

  // ── Preview per step. Chapter 2 (auto-archive + split-inbox) shares one
  //    <Chapter2Preview> and Chapter 3 shares one <WorkflowPreview>, so each
  //    chapter's browser card + titlebar stay mounted (no flash on Continue). ─
  const previewFor = () => {
    switch (step) {
      case "auto-archive":
      case "split-inbox":
        return (
          <Chapter2Preview
            step={step}
            archivedMails={AUTO_ARCHIVE_MAIL}
            archivedLabels={step === "split-inbox" ? savedArchivedLabels : archivedLabels}
            splitMails={SPLIT_MAIL}
            splits={splits}
            hovering={splitHovering}
            transitioning={splitTransitioning}
            hoverLabel={archiveHoverLabel}
            hoverTab={splitHoverTab}
            archiveReplayKey={archiveReplayKey}
          />
        );
      case "auto-draft":
      case "auto-reminder":
      case "ask-ai":
        return (
          <WorkflowPreview
            step={step}
            draftDemo={draftDemo}
            reminderWait={reminderWait}
            askDemo={askDemo}
          />
        );
      case "seats":
        return <SeatsPreview />;
      default:
        return null;
    }
  };

  // ── Chapter 1 — full-screen, no stepper. Linear click-through to Chapter 2. ──
  const renderChapter1 = () => {
    switch (step) {
      case "welcome":
        return (
          <WelcomeScreen
            onContinue={() => setStep("intro")}
            onPrototypeSignIn={() => setStep("signin")}
          />
        );
      case "signin":
        return <SignInScreen onContinue={() => setStep("google-account")} />;
      case "google-account":
        return <GoogleAccountScreen onContinue={() => setStep("google-consent")} />;
      case "google-consent":
        return (
          <GoogleConsentScreen
            onContinue={() => setStep("google-scopes")}
            onCancel={() => setStep("google-account")}
          />
        );
      case "google-scopes":
        return (
          <GoogleScopesScreen
            onContinue={() => setStep("signing-in")}
            onCancel={() => setStep("google-consent")}
          />
        );
      case "signing-in":
        return <SigningInScreen onContinue={() => setStep("intro")} />;
      default:
        return null;
    }
  };

  const isChapter1 = (CHAPTER1 as string[]).includes(step);

  // Linear order for the prototype nav arrows. The whole auth mockup
  // (signin, google-account/consent/scopes/signing-in) is intentionally left
  // out — it's a hidden side path reachable only via the "Sign in prototype"
  // link on the Welcome screen, so the default forward/back flow always
  // skips straight from "welcome" to "intro" and never surfaces those screens.
  const FLOW_ORDER: FlowStep[] = [
    "welcome",
    "intro",
    "auto-archive",
    "split-inbox",
    "auto-draft",
    "auto-reminder",
    "ask-ai",
    "seats",
    "done",
  ];
  const flowIdx = FLOW_ORDER.indexOf(step);
  const goTo = (i: number) => {
    if (i < 0 || i >= FLOW_ORDER.length) return;
    setSplitHovering(false);
    setSplitTransitioning(false);
    setStep(FLOW_ORDER[i]);
  };

  const meta =
    isChapter1 || step === "intro"
      ? null
      : STEPPER_META[step as Exclude<FlowStep, "intro" | Chapter1Step>];

  const isArchiveV1 = step === "auto-archive" && archiveDemoVariant === 1;
  const isArchiveV2 = step === "auto-archive" && archiveDemoVariant === 2;
  const isArchiveV3 = step === "auto-archive" && archiveDemoVariant === 3;
  const isSplitInbox = step === "split-inbox";
  // Split Inbox now shares Auto Archive's V1 dramatic mechanic (grid
  // curtain + frame pop) instead of its old quieter fixed-position fade.
  const usesV1Mechanic = isArchiveV1 || isSplitInbox;

  // True while the left column's content should stay invisible: Auto
  // Archive's V1/V2 entrance holds, or Split Inbox's "wait for the preview
  // to finish sorting" hold.
  const leftContentHidden =
    ((isArchiveV1 || isArchiveV2) && !archiveReveal) || (isSplitInbox && !splitLeftReady);

  return (
    <main className="h-screen w-full overflow-hidden bg-white bg-cover bg-center [background-image:url(/background.png)]">
      <div className="relative h-full w-full">
        {isChapter1 ? (
          <div className="relative h-full w-full">
            {renderChapter1()}
          </div>
        ) : step === "intro" ? (
          // Intro/welcome is a loading screen — no progress bar.
          <div className="relative h-full w-full">
            <IntroScreen onContinue={() => setStep("auto-archive")} />
          </div>
        ) : (
          <div className="relative flex h-full w-full">
            {/* Persistent stepper — stays mounted across every non-intro step,
                so the progress bar holds its position and only the fill moves.
                Stays visible even during Auto Archive's V1 preview-focus
                window (without it the centered preview reads as floating too
                far down with nothing to anchor it against up top). */}
            <Stepper
              activeStep={meta!.activeStep}
              progress={meta!.progress}
              onNavigate={(s) => { setSplitHovering(false); setSplitTransitioning(false); setStep(s as FlowStep); }}
              className="absolute inset-x-0 top-0 z-10"
            />

            {/* Prototype switch — Auto Archive's 3 demo variants, swap live
                for the meeting walkthrough. Replay re-runs whichever is
                selected from scratch. */}
            {step === "auto-archive" && (
              <div className="absolute right-6 top-[60px] z-20 flex items-center gap-2 rounded-full border border-black/10 bg-white/90 p-1 shadow-[0_1px_3px_rgba(0,0,0,0.12)] backdrop-blur-sm">
                {([1, 2, 3] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => {
                      setArchiveDemoVariant(v);
                      setArchiveReplayKey((k) => k + 1);
                    }}
                    className={cn(
                      "rounded-full px-3 py-1 text-[12px] font-medium transition-colors",
                      archiveDemoVariant === v
                        ? "bg-primary text-primary-foreground"
                        : "text-[#5f6368] hover:text-black",
                    )}
                  >
                    V{v}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setArchiveReplayKey((k) => k + 1)}
                  className="rounded-full px-3 py-1 text-[12px] font-medium text-[#5f6368] hover:text-black"
                >
                  ↻ Replay
                </button>
              </div>
            )}

            {/* Prototype switch — only on the Seats screen. Toggles between the
                "seats purchased" and "no seats purchased" variants. Sits just
                below the progress bar, top-right. */}
            {step === "seats" && (
              <div className="absolute right-6 top-[60px] z-20 flex items-center gap-2 rounded-full border border-black/10 bg-white/90 p-1 shadow-[0_1px_3px_rgba(0,0,0,0.12)] backdrop-blur-sm">
                <button
                  type="button"
                  onClick={() => setNoSeats(false)}
                  className={cn(
                    "rounded-full px-3 py-1 text-[12px] font-medium transition-colors",
                    !noSeats ? "bg-primary text-primary-foreground" : "text-[#5f6368] hover:text-black",
                  )}
                >
                  Seats purchased
                </button>
                <button
                  type="button"
                  onClick={() => setNoSeats(true)}
                  className={cn(
                    "rounded-full px-3 py-1 text-[12px] font-medium transition-colors",
                    noSeats ? "bg-primary text-primary-foreground" : "text-[#5f6368] hover:text-black",
                  )}
                >
                  No seats
                </button>
              </div>
            )}

            {step === "done" ? (
              <DoneCard onRestart={restart} />
            ) : isArchiveV3 ? (
              // V3 — no preview at all. Left content shown alone, centered
              // on screen in its own card.
              <div className="flex h-full w-full items-center justify-center pt-[140px] pb-[100px]">
                <div
                  key={archiveReplayKey}
                  className="w-full max-w-[720px] rounded-[8px] bg-white px-[56px] py-10 shadow-[0_24px_70px_rgba(30,24,70,0.16)]"
                  style={{ animation: "highlight-pop 850ms ease-out both" }}
                >
                  <div className="flex min-h-0 flex-col justify-between">
                    {leftFor()}
                  </div>
                </div>
              </div>
            ) : (
              // Grid (not flex) so the left column's width itself can animate
              // from 0 to 1fr — a true "curtain" reveal, not just a content
              // fade. While collapsed, the right column naturally fills the
              // whole row, so the preview sits dead-center on screen.
              <div
                className="grid w-full"
                style={{
                  // Reserve the stepper's own height (measured ~53px) up
                  // top so "centered" means between the progress bar and
                  // the bottom of the screen — not the full viewport height,
                  // which would sit noticeably higher than the stepper.
                  marginTop: 53,
                  height: "calc(100% - 53px)",
                  // Without an explicit row height, the grid's single
                  // implicit row sizes to its tallest child's content
                  // (padding + card) instead of stretching to fill the
                  // grid's own height, quietly pushing "centered" content
                  // low. minmax(0,1fr) pins the row to the container.
                  gridTemplateRows: "minmax(0,1fr)",
                  // minmax(0, ...) — not plain 1fr — so the tracks ignore
                  // each column's content-driven min-width (the preview
                  // card + its padding are wider than a bare 50% share) and
                  // always split by the fr ratio alone, same as a plain
                  // flex w-1/2 pair would if it didn't overflow.
                  gridTemplateColumns:
                    usesV1Mechanic && leftContentHidden
                      ? "minmax(0,0fr) minmax(0,1fr)"
                      : "minmax(0,1fr) minmax(0,1fr)",
                  // V1 gets a springy overshoot on the curtain itself — the
                  // frame's own growth "pops" instead of just gliding open.
                  transition: usesV1Mechanic
                    ? "grid-template-columns 950ms cubic-bezier(0.34,1.56,0.64,1)"
                    : "grid-template-columns 900ms ease-out",
                }}
              >
                {/* Left column — outer cell clips while its width animates;
                    inner panel keeps a fixed half-viewport width so its
                    content never reflows/squishes mid-animation. */}
                <div className="h-full overflow-hidden bg-white">
                  <div className="flex h-full w-[50vw] flex-col px-[100px] pb-[30px] pt-[100px]">
                    <div
                      key={`${step}-${archiveReplayKey}`}
                      className={cn(
                        "flex min-h-0 flex-1 flex-col justify-between",
                        usesV1Mechanic
                          ? leftContentHidden && "opacity-0"
                          : cn(
                              "transition-all duration-700 ease-out",
                              leftContentHidden ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100",
                            ),
                      )}
                      style={
                        usesV1Mechanic
                          ? leftContentHidden
                            ? undefined
                            : { animation: "highlight-pop 850ms ease-out both" }
                          : { transitionDelay: leftContentHidden ? "0ms" : "350ms" }
                      }
                    >
                      {leftFor()}
                    </div>
                  </div>
                </div>

                {/* Right column — preview area (transparent over the wash).
                    Symmetric top/bottom padding so the card sits truly
                    vertically centered (was pt-140/pb-100, ~20px low). */}
                <div className="flex h-full flex-col items-center justify-center px-[100px] pb-[100px] pt-[100px]">
                  {previewFor()}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Prototype nav arrows — top-left overlay, available on every screen
            so you can step forward/back through the whole flow quickly. */}
        <div className="absolute left-4 top-4 z-50 flex gap-1.5">
          <button
            type="button"
            onClick={() => goTo(flowIdx - 1)}
            disabled={flowIdx <= 0}
            aria-label="Previous screen"
            className="flex size-8 items-center justify-center rounded-full border border-black/10 bg-white/85 text-[#5f6368] shadow-[0_1px_3px_rgba(0,0,0,0.12)] backdrop-blur-sm transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-30"
          >
            <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => goTo(flowIdx + 1)}
            // flowIdx is -1 while on a hidden Google mockup screen (it's not
            // in FLOW_ORDER) — disable rather than let +1 wrap to "welcome".
            disabled={flowIdx < 0 || flowIdx >= FLOW_ORDER.length - 1}
            aria-label="Next screen"
            className="flex size-8 items-center justify-center rounded-full border border-black/10 bg-white/85 text-[#5f6368] shadow-[0_1px_3px_rgba(0,0,0,0.12)] backdrop-blur-sm transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-30"
          >
            <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </main>
  );
}
