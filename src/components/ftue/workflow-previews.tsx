"use client";

import { cn } from "@/lib/utils";
import { ASK_AI_TABS, ASK_AI_MAIL, ASK_AI_PROMPTS, AUTO_DRAFT_DEMOS } from "@/lib/data";
import type { AutoDraftDemo, FlowStep } from "@/lib/types";

// ── Shared browser chrome ────────────────────────────────────────────────────

/** Traffic-light + URL titlebar, matching the inbox preview chrome. */
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

/**
 * White browser card with the Chapter-3 preview tint + titlebar. This shell is
 * shared across Auto Draft / Auto Reminder / Ask AI so the background never
 * reloads as the user moves between those steps — only the children swap.
 */
function PreviewCard({
  children,
  overlay,
}: {
  children: React.ReactNode;
  /** Rendered outside the clipped card surface, so it may extend past the
   *  card edges (e.g. the Ask AI answer card). */
  overlay?: React.ReactNode;
}) {
  return (
    <div className="relative h-[490px] w-[570px] max-w-full">
      {/* Clipped card surface — inbox/panel content is masked to the rounded
          card so nothing spills past its edges. */}
      <div className="absolute inset-0 overflow-hidden rounded-[16px] bg-[rgba(247,247,252,0.7)] shadow-[0_0_2px_rgba(20,20,19,0.12),0_6px_24px_rgba(20,20,19,0.12)]">
        <TitleBar />
        {children}
      </div>
      {overlay}
    </div>
  );
}

function ArrowLeft({ className }: { className?: string }) {
  return (
    // Figma "Arrow (Left)" asset — exact match to design
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="https://www.figma.com/api/mcp/asset/d3e33d3e-4ab9-4b88-a603-6ac3023cf40f"
      alt=""
      aria-hidden
      className={cn("shrink-0", className)}
    />
  );
}

/** Send / Send later / Remind me action row shared by the email mockups. */
function SendRow() {
  return (
    <div className="flex items-center gap-5 text-[12px]">
      <span className="font-semibold text-ink">Send</span>
      <span className="text-[rgba(93,112,137,0.6)]">Send later</span>
      <span className="text-[rgba(93,112,137,0.6)]">Remind me</span>
    </div>
  );
}

// ── Conversation content (Auto Draft + Auto Reminder share this view) ─────────

/** Auto Reminder's fixed exchange — the sent draft, now a "Me" message. */
const REMINDER_INCOMING =
  "Thanks for sending that contract over. The team and I will review and then we can discuss next steps.";
const REMINDER_REPLY =
  "That’s great to hear Maria! I’m available to clarify anything or go over details if needed. Let me know if you’d like to discuss!";

function ConversationContent({
  step,
  draftDemo,
  reminderWait,
}: {
  step: "auto-draft" | "auto-reminder";
  draftDemo: AutoDraftDemo;
  reminderWait: string;
}) {
  const isReminder = step === "auto-reminder";
  const demo = AUTO_DRAFT_DEMOS[draftDemo];

  const sender = isReminder ? "Maria" : demo.incoming.sender;
  const incomingBody = isReminder ? REMINDER_INCOMING : demo.incoming.body;
  const badge = isReminder ? undefined : demo.incoming.badge;

  return (
    <div
      className="flex h-[490px] flex-col items-center gap-4 px-[25px] pt-[40px]"
      style={{ animation: "screen-enter 420ms ease-out both" }}
    >
      {/* Back-arrow row */}
      <div className="flex w-[512px] max-w-full items-center gap-4">
        <ArrowLeft className="size-4 shrink-0" />
        <div className="h-[50px] flex-1" />
      </div>

      {/* Conversation box — fixed height so the send row and highlight card
          are always at the same vertical position regardless of which card is
          hovered. flex-1 spacer absorbs the variable height of the incoming section. */}
      <div
        className="flex w-[436px] max-w-full flex-col rounded-[4px] border-l-[3px] border-[#bec1e4] bg-white px-5 pt-[30px] pb-5 transition-[height] duration-500 ease-out"
        style={{ height: isReminder ? "auto" : 290 }}
      >
        {/* Incoming email — always anchored at the top */}
        <div className="flex w-full shrink-0 flex-col items-start gap-2.5">
          <div className="flex items-center gap-2.5">
            <p className="text-[12px] font-semibold leading-[20px] tracking-[-0.15px] text-[#29323d]">
              {sender}
            </p>
            {/* Figma design: "Auto Reminder returned" is bold text inline, not a pill badge */}
            {badge && (
              <span className="text-[12px] font-bold leading-[20px] tracking-[-0.15px] text-[#29323d]">
                {badge}
              </span>
            )}
          </div>
          <p className="text-[12px] leading-[20px] tracking-[-0.15px] text-[rgba(0,0,0,0.55)]">
            {incomingBody}
          </p>
        </div>

        {/* Divider — always immediately after incoming, visible on every variant */}
        <div className="mt-6 h-px w-full shrink-0 bg-black/[0.08]" />

        {/* Spacer — only for Auto Draft to keep highlight card at consistent Y as demos switch */}
        {!isReminder && <div className="flex-1" />}

        {/* AUTO REMINDER: sent "Me" reply thread + reminder confirmation */}
        {isReminder && (
          <div className="flex w-full shrink-0 flex-col gap-[16px] mt-6">
            <div
              className="flex w-full flex-col items-start gap-2.5"
              style={{ animation: "reply-rise 500ms ease-out 200ms both" }}
            >
              <p className="text-[12px] font-semibold leading-[20px] tracking-[-0.15px] text-[#29323d]">
                Me
              </p>
              <p className="text-[12px] leading-[20px] tracking-[-0.15px] text-[rgba(0,0,0,0.55)]">
                {REMINDER_REPLY}
              </p>
            </div>
            <div
              className="flex w-[467px] max-w-none self-center items-center gap-2 rounded-[12px] bg-white px-5 py-3 shadow-[0px_0px_8.6px_rgba(187,187,209,0.7)]"
              style={{ animation: "highlight-pop 450ms ease-out 720ms both" }}
            >
              <Sparkle className="size-4 shrink-0" />
              <p className="text-[13px] leading-[20px] tracking-[-0.15px] text-[rgba(0,0,0,0.75)]">
                We’ll remind you{" "}
                <span className="font-semibold text-[#4a7fd0]">
                  {reminderWait}
                </span>{" "}
                if no reply
              </p>
            </div>
          </div>
        )}

        {/* AUTO DRAFT: drafted reply highlight — anchored at consistent distance from bottom */}
        {!isReminder && (
          <div
            key={draftDemo}
            className="flex w-[467px] max-w-none self-center shrink-0 flex-col gap-[10px] rounded-[4px] bg-white px-5 py-3 shadow-[0px_0px_8.6px_rgba(187,187,209,0.7)]"
            style={{ animation: "highlight-pop 380ms ease-out both" }}
          >
            <p className="leading-[20px] tracking-[-0.15px]">
              <span
                className="text-[12.9px] font-bold tracking-[0.1px] bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(91.75deg, rgb(28, 165, 215) 7.86%, rgb(134, 85, 214) 87.96%)" }}
              >
                Auto Draft
              </span>
              <span className="text-[11.9px] text-[#29323d]"> to Maria</span>
            </p>
            <p className="text-[12.9px] leading-[20px] tracking-[-0.15px] text-[#29323d]">
              {demo.reply.map((seg, i) =>
                seg.highlight ? (
                  <span key={i} className="font-medium text-[#4a7fd0]">
                    {seg.text}
                  </span>
                ) : (
                  <span key={i}>{seg.text}</span>
                ),
              )}
            </p>
          </div>
        )}

        {/* Send row — always at the bottom, fixed position via pb-5 on the box */}
        <div className="mt-4 w-full shrink-0">
          <SendRow />
        </div>
      </div>
    </div>
  );
}

// ── Ask AI content ────────────────────────────────────────────────────────────

// eslint-disable-next-line @next/next/no-img-element
const Sparkle = ({ className }: { className?: string }) => (
  <img
    src="https://www.figma.com/api/mcp/asset/1780fee4-0e80-4e96-af2a-1658ddd3e092"
    alt=""
    aria-hidden
    className={className}
  />
);

function IconHamburger({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path d="M2 4h12M2 8h12M2 12h12" stroke="#999" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

const U = ({ children }: { children: React.ReactNode }) => (
  <span className="underline decoration-from-font">{children}</span>
);
const B = ({ children }: { children: React.ReactNode }) => (
  <span className="font-semibold">{children}</span>
);

/** The floating AI answer for each example prompt. */
function AskAiAnswer({ index }: { index: number }) {
  if (index === 1) {
    return (
      <div className="flex flex-col gap-3 text-[13px] leading-[19px] tracking-[-0.15px] text-[#29323d]">
        <p>3 Meetings today:</p>
        <div className="flex flex-col">
          <p>
            🗓 <B>Acme Corp</B>
          </p>
          <p>
            <U>9am</U> - enterprise deal chat.
          </p>
        </div>
        <div className="flex flex-col">
          <p>
            🗓 <B>Stripe</B>
          </p>
          <p>
            <U>1pm</U> - partnership discussion.
          </p>
        </div>
        <div className="flex flex-col">
          <p>
            🗓 <B>Linear</B>
          </p>
          <p>
            <U>4pm</U> - product demo request.
          </p>
        </div>
      </div>
    );
  }
  if (index === 2) {
    return (
      <div className="flex flex-col gap-2 text-[13px] leading-[23px] tracking-[-0.15px] text-[#29323d]">
        <p>Done. ✅</p>
        <p>
          Coffee chat with Lily scheduled for <U>Thursday, 2pm</U>.
        </p>
        <p>Draft welcome email ready in your drafts.</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-2 text-[13px] leading-[23px] tracking-[-0.15px] text-[#29323d]">
      <p>
        📍 Your offsite is at <B>Ace Hotel Brooklyn</B>, <U>June 12-13</U>.
      </p>
      <p>
        Sarah’s email from <U>March 26</U> has the full agenda and room
        assignments.
      </p>
    </div>
  );
}

function AskAiContent({ askDemo }: { askDemo: number }) {
  return (
    <div className="relative flex h-[490px] gap-4 pr-[25px] pt-8">
      {/* Ask AI side panel */}
      <div className="flex w-[237px] shrink-0 flex-col gap-[18px] border-r-[0.5px] border-[#edecec] bg-white px-5 pb-[31px] pt-[17px]">
        <p className="text-[13px] font-semibold tracking-[-0.14px] text-[#29323d]">
          Ask AI
        </p>
        <div className="flex flex-col items-center gap-4">
          <Sparkle className="size-[30px]" />
          <p className="text-center text-[10px] leading-[18px] tracking-[-0.14px] text-[rgba(0,0,0,0.55)]">
            Find, write, schedule, or ask anything...
          </p>
          {/* The selected prompt echoed as the submitted query. */}
          <div
            key={askDemo}
            className="w-full rounded-[3px] bg-[#f3f4fc] px-3 py-[10px]"
            style={{ animation: "preview-fade 300ms ease-out both" }}
          >
            <p className="text-[11px] leading-[16px] text-[rgba(0,0,0,0.9)]">
              {ASK_AI_PROMPTS[askDemo]}
            </p>
          </div>
        </div>
      </div>

      {/* Inbox behind, slightly dimmed (the inbox keeps running). Spacing
          mirrors Split Inbox: tabs 64px from card top, 40px gap to the list. */}
      <div className="flex flex-1 flex-col gap-10 pt-8 opacity-80">
        <div className="flex items-center gap-[13px] overflow-hidden">
          <IconHamburger className="size-4 shrink-0" />
          {ASK_AI_TABS.map((tab) => (
            <div
              key={tab.label}
              className={cn(
                "flex shrink-0 items-center gap-[5px] text-[16px]",
                tab.active ? "text-ink" : "text-[rgba(0,0,0,0.4)]",
              )}
            >
              <span>{tab.label}</span>
              <span className="tabular-nums text-[16px] text-[rgba(0,0,0,0.4)]">{tab.count}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col pl-[30px]">
          {ASK_AI_MAIL.map((m, i) => (
            <div key={i} className="flex items-center py-[10px]">
              <p className="w-[175px] shrink-0 truncate pr-6 text-[12px] font-semibold leading-4 tracking-[-0.15px] text-mail">
                {m.sender}
              </p>
              <p className="min-w-0 flex-1 truncate pr-6 text-[12px] leading-4 tracking-[-0.15px] text-mail">
                {m.subject}
              </p>
              <p className="shrink-0 whitespace-nowrap text-right text-[12px] leading-4 tracking-[-0.15px] uppercase text-mail-meta">
                {m.date}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Floating AI answer card. Rendered as the PreviewCard overlay (outside the
 * clipped surface) so it may extend past the card edges, while the inbox
 * content behind it stays clipped to the card.
 */
function AskAiAnswerCard({ askDemo }: { askDemo: number }) {
  // The query card in the panel grows one 16px line per prompt (demo 0/1/2 =
  // 1/2/3 lines), so push the answer down by the same amount to keep a
  // constant gap between the two cards across all three options.
  const top = 224 + askDemo * 16;
  return (
    <div
      key={askDemo}
      className="absolute left-[-20px] w-[214px] rounded-[4px] bg-white p-[18px] shadow-[0px_0px_8.6px_rgba(187,187,209,0.7)] flex flex-col gap-[12px]"
      style={{ top, animation: "highlight-pop 420ms ease-out both" }}
    >
      <AskAiAnswer index={askDemo} />
      <p className="text-[11px] font-semibold leading-[23px] text-[rgba(0,0,0,0.4)]">Sources</p>
    </div>
  );
}

// ── Unified workflow preview ──────────────────────────────────────────────────

/**
 * Single preview shell for the three Chapter-3 workflow steps. Rendering this
 * one component across auto-draft → auto-reminder → ask-ai keeps the PreviewCard
 * (tint + titlebar) mounted, so its background never reloads; only the inner
 * content transitions.
 */
export function WorkflowPreview({
  step,
  draftDemo,
  reminderWait,
  askDemo,
}: {
  step: FlowStep;
  draftDemo: AutoDraftDemo;
  reminderWait: string;
  askDemo: number;
}) {
  return (
    <PreviewCard overlay={step === "ask-ai" ? <AskAiAnswerCard askDemo={askDemo} /> : undefined}>
      {step === "ask-ai" ? (
        <div key="askai" style={{ animation: "preview-fade 360ms ease-out both" }}>
          <AskAiContent askDemo={askDemo} />
        </div>
      ) : (
        <ConversationContent
          step={step as "auto-draft" | "auto-reminder"}
          draftDemo={draftDemo}
          reminderWait={reminderWait}
        />
      )}
    </PreviewCard>
  );
}

// ── Seats preview ────────────────────────────────────────────────────────────

/** Live-collaboration scene — Figma export (draft + teammates reacting). */
export function SeatsPreview() {
  return (
    <div
      className="flex w-[560px] max-w-full items-center justify-center"
      style={{ animation: "screen-enter 420ms ease-out both" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/seats-preview.png"
        alt="Teammates collaborating on a draft in real time"
        className="h-auto w-full"
      />
    </div>
  );
}
