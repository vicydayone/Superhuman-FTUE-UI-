"use client";

import { useState } from "react";
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
import type {
  AutoArchiveToggles,
  AutoDraftDemo,
  Chapter1Step,
  FlowStep,
  ReminderChoice,
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
  // Snapshot of the user's archive selections at the moment they click Continue —
  // archivedLabels gets reset to all-false to animate the menu closing, so we
  // need a separate copy that persists into the Split Inbox filter.
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
  const [archiveClosing, setArchiveClosing] = useState(false);
  const [splitHovering, setSplitHovering] = useState(false);
  const [splitTransitioning, setSplitTransitioning] = useState(false);
  const [draftDemo, setDraftDemo] = useState<AutoDraftDemo>("responses");
  const [reminder, setReminder] = useState<ReminderChoice>("couple-days");
  const [reminderHover, setReminderHover] = useState<ReminderChoice | null>(null);
  const [askDemo, setAskDemo] = useState(0);

  const restart = () => {
    setArchivedLabels({ marketing: true, news: false, pitch: false, social: false });
    setSavedArchivedLabels({ marketing: true, news: false, pitch: false, social: false });
    setSplits({ calendar: true, jira: true });
    setDraftDemo("responses");
    setReminder("couple-days");
    setAskDemo(0);
    setArchiveClosing(false);
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
            onContinue={() => {
              // Snapshot the user's selection for the Split filter.
              setSavedArchivedLabels({ ...archivedLabels });
              // Slide the menu out (content shifts back to x-0) WITHOUT
              // un-archiving — the visible mails stay exactly as configured,
              // so the Split Inbox picks up seamlessly with no reload.
              setArchiveClosing(true);
              setTimeout(() => setStep("split-inbox"), 750);
            }}
          />
        );
      case "split-inbox":
        return (
          <SplitInboxLeft
            toggles={splits}
            onToggle={(key, value) => setSplits((s) => ({ ...s, [key]: value }))}
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
        return <SeatsLeft onContinue={() => setStep("done")} />;
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
            closing={archiveClosing}
            hovering={splitHovering}
            transitioning={splitTransitioning}
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
        return <WelcomeScreen onContinue={() => setStep("signin")} />;
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

  // Full linear order across the whole onboarding, so the prototype nav arrows
  // can step forward/back through every screen (resetting transient transition
  // state so jumps land cleanly).
  const FLOW_ORDER: FlowStep[] = [
    ...CHAPTER1,
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
    setArchiveClosing(false);
    setSplitHovering(false);
    setSplitTransitioning(false);
    setStep(FLOW_ORDER[i]);
  };

  const meta =
    isChapter1 || step === "intro"
      ? null
      : STEPPER_META[step as Exclude<FlowStep, "intro" | Chapter1Step>];

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
                so the progress bar holds its position and only the fill moves. */}
            <Stepper
              activeStep={meta!.activeStep}
              progress={meta!.progress}
              onNavigate={(s) => { setArchiveClosing(false); setSplitHovering(false); setSplitTransitioning(false); setStep(s as FlowStep); }}
              className="absolute inset-x-0 top-0 z-10"
            />

            {step === "done" ? (
              <DoneCard onRestart={restart} />
            ) : (
              <>
                {/* Left column — white panel persists; inner content transitions. */}
                <div className="flex h-full w-1/2 flex-col bg-white px-[100px] pb-[30px] pt-[100px]">
                  <div
                    key={step}
                    className="flex min-h-0 flex-1 flex-col justify-between"
                    style={{ animation: "screen-enter 360ms ease-out both" }}
                  >
                    {leftFor()}
                  </div>
                </div>

                {/* Right column — preview area (transparent over the wash). */}
                <div className="flex h-full w-1/2 flex-col items-center justify-center px-[100px] pb-[100px] pt-[140px]">
                  {previewFor()}
                </div>
              </>
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
            disabled={flowIdx >= FLOW_ORDER.length - 1}
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
