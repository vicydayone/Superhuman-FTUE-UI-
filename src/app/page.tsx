"use client";

import { useState } from "react";
import { IntroScreen } from "@/components/ftue/intro-screen";
import { AutoArchiveScreen } from "@/components/ftue/auto-archive-screen";
import { SplitInboxScreen } from "@/components/ftue/split-inbox-screen";
import { AutoDraftScreen } from "@/components/ftue/auto-draft-screen";
import { AutoReminderScreen } from "@/components/ftue/auto-reminder-screen";
import { AskAiScreen } from "@/components/ftue/ask-ai-screen";
import { SeatsScreen } from "@/components/ftue/seats-screen";
import { DoneScreen } from "@/components/ftue/done-screen";
import type {
  AutoArchiveToggles,
  AutoDraftToggles,
  FlowStep,
  ReminderChoice,
  SplitToggles,
} from "@/lib/types";

export default function Home() {
  const [step, setStep] = useState<FlowStep>("intro");
  const [archivedLabels, setArchivedLabels] = useState<AutoArchiveToggles>({
    marketing: true,
    news: false,
    pitch: false,
    social: false,
  });
  const [splits, setSplits] = useState<SplitToggles>({
    calendar: true,
    jira: true,
  });
  const [autoDraft, setAutoDraft] = useState<AutoDraftToggles>({
    followUps: true,
    scheduling: true,
  });
  const [reminder, setReminder] = useState<ReminderChoice>("couple-days");

  const restart = () => {
    setArchivedLabels({ marketing: true, news: false, pitch: false, social: false });
    setSplits({ calendar: true, jira: true });
    setAutoDraft({ followUps: true, scheduling: true });
    setReminder("couple-days");
    setStep("intro");
  };

  return (
    <main className="h-screen w-full overflow-hidden bg-white bg-cover bg-center [background-image:url(/background.png)]">
      {/* Fills the viewport responsively; the pastel background wash spans the
          whole screen and the white stepper/left panels sit on top of it. */}
      <div className="h-full w-full">
        {step === "intro" && (
          <IntroScreen onContinue={() => setStep("auto-archive")} />
        )}

        {step === "auto-archive" && (
          <AutoArchiveScreen
            archivedLabels={archivedLabels}
            onToggle={(key) =>
              setArchivedLabels((prev) => ({ ...prev, [key]: !prev[key] }))
            }
            onContinue={() => setStep("split-inbox")}
            onNavigate={setStep}
          />
        )}

        {step === "split-inbox" && (
          <SplitInboxScreen
            toggles={splits}
            onToggle={(key, value) =>
              setSplits((s) => ({ ...s, [key]: value }))
            }
            onContinue={() => setStep("auto-draft")}
            onNavigate={setStep}
          />
        )}

        {step === "auto-draft" && (
          <AutoDraftScreen
            toggles={autoDraft}
            onToggle={(key, value) =>
              setAutoDraft((d) => ({ ...d, [key]: value }))
            }
            onContinue={() => setStep("auto-reminder")}
            onNavigate={setStep}
          />
        )}

        {step === "auto-reminder" && (
          <AutoReminderScreen
            choice={reminder}
            onChoiceChange={setReminder}
            onContinue={() => setStep("ask-ai")}
            onNavigate={setStep}
          />
        )}

        {step === "ask-ai" && (
          <AskAiScreen
            onContinue={() => setStep("seats")}
            onNavigate={setStep}
          />
        )}

        {step === "seats" && (
          <SeatsScreen onContinue={() => setStep("done")} onNavigate={setStep} />
        )}

        {step === "done" && (
          <DoneScreen onRestart={restart} onNavigate={setStep} />
        )}
      </div>
    </main>
  );
}
