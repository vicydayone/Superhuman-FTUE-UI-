"use client";

import { useEffect, useState } from "react";
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
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className={cn("shrink-0", className)}>
      <path d="M7.99995 14.5L1.5 8.00005L8.00005 1.5M1.5 8.00005L14.4999 7.99995" stroke="black" strokeOpacity="0.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
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

// ── Conversation content (Auto Draft + Auto Reminder) ─────────────────────────

/** Auto Reminder's sent draft, now shown as a "Me" message. */
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

      {isReminder ? (
        // AUTO REMINDER — compose draft "Me to Maria" + reminder highlight +
        // send row (matches updated Figma node 1917:2663).
        <div className="flex w-[436px] max-w-full flex-col items-center gap-[30px] rounded-[4px] border-l-[3px] border-[#bec1e4] bg-white px-5 py-[30px] shadow-[0_0_4.5px_rgba(0,0,0,0.15)]">
          <div
            className="flex w-full flex-col items-start gap-2.5"
            style={{ animation: "reply-rise 500ms ease-out 200ms both" }}
          >
            <p className="text-[12px] font-semibold leading-4 text-[#29323d]">Me to Maria</p>
            <p className="text-[12px] leading-4 text-[rgba(0,0,0,0.55)]">
              Absolutely! Can you please set up a meeting to discuss as a group later this week? There are a few remaining open questions I&apos;d like to go over.
            </p>
          </div>
          <div
            className="flex w-[467px] max-w-none items-center gap-[11px] self-center rounded-[4px] bg-white px-5 py-3 shadow-[0px_0px_8.6px_rgba(187,187,209,0.7)]"
            style={{ animation: "highlight-pop 450ms ease-out 720ms both" }}
          >
            <Sparkle className="size-[17px] shrink-0" />
            <p className="text-[12px] leading-4 text-[rgba(0,0,0,0.75)]">
              We&apos;ll remind you{" "}
              <span
                className="bg-clip-text font-semibold text-transparent"
                style={{ backgroundImage: "linear-gradient(97.6deg, rgb(28, 165, 215) 23%, rgb(134, 85, 214) 88%)" }}
              >
                {reminderWait}
              </span>{" "}
              if no reply
            </p>
          </div>
          <SendRow />
        </div>
      ) : (
        // AUTO DRAFT — incoming mail + drafted reply highlight + send row,
        // stacked with an even 30px gap (no divider, no fixed-height void;
        // matches Figma node 1928:4693).
        <div className="flex w-[436px] max-w-full flex-col gap-[30px] rounded-[4px] border-l-[3px] border-[#bec1e4] bg-white px-5 py-[30px]">
          {/* Incoming email */}
          <div className="flex w-full flex-col items-start gap-2.5">
            <div className="flex items-center gap-2.5">
              <p className="text-[12px] font-semibold leading-4 text-[#29323d]">
                {demo.incoming.sender}
              </p>
              {demo.incoming.badge && (
                <span className="text-[12px] font-bold leading-4 text-[#29323d]">
                  {demo.incoming.badge}
                </span>
              )}
            </div>
            <p className="w-full text-[12px] leading-4 text-[rgba(0,0,0,0.55)]">
              {demo.incoming.body}
            </p>
          </div>

          {/* Drafted reply highlight */}
          <div
            key={draftDemo}
            className="flex w-[467px] max-w-none flex-col gap-[11px] self-center rounded-[4px] bg-white px-5 py-3 shadow-[0px_0px_8.6px_rgba(187,187,209,0.7)]"
            style={{ animation: "highlight-pop 380ms ease-out both" }}
          >
            <p className="leading-4">
              <span
                className="bg-clip-text text-[12px] font-semibold text-transparent"
                style={{ backgroundImage: "linear-gradient(91.75deg, rgb(28, 165, 215) 7.86%, rgb(134, 85, 214) 87.96%)" }}
              >
                Auto Draft
              </span>
              <span className="text-[12px] text-[#29323d]"> to Maria</span>
            </p>
            <p className="text-[12px] leading-4 text-[#29323d]">
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

          {/* Send row */}
          <SendRow />
        </div>
      )}
    </div>
  );
}

// ── Ask AI content ────────────────────────────────────────────────────────────

// eslint-disable-next-line @next/next/no-img-element
const Sparkle = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 29.998 30" fill="none" aria-hidden className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="stars-grad" x1="39.886" y1="31.5705" x2="-5.686" y2="1.961" gradientUnits="userSpaceOnUse">
        <stop stopColor="#A87DE8" />
        <stop offset="1" stopColor="#5CC3FA" />
      </linearGradient>
    </defs>
    <path d="M12.0039 5.99219C12.3253 5.99229 12.4329 6.20659 12.54 6.4209L14.8975 15.1025L23.5791 17.46C23.7934 17.5672 24.0078 17.7818 24.0078 17.9961C24.0078 18.2104 23.7934 18.425 23.5791 18.5322L14.8975 20.8896L12.54 29.5713C12.4329 29.7856 12.3253 29.9999 12.0039 30C11.6825 30 11.5749 29.7856 11.4678 29.5713L9.11035 20.8896L0.428711 18.5322C0.214362 18.4251 1.18677e-05 18.3176 0 17.9961C0 17.6746 0.214356 17.5671 0.428711 17.46L9.11035 15.1025L11.4678 6.4209C11.5749 6.20659 11.6824 5.99219 12.0039 5.99219ZM23.1211 0C23.3051 0.000119025 23.3664 0.123346 23.4277 0.246094L24.7783 5.21875L29.752 6.57031C29.8747 6.63169 29.9979 6.7542 29.998 6.87695C29.998 6.99976 29.8748 7.12317 29.752 7.18457L24.7783 8.53516L23.4277 13.5088C23.3664 13.6315 23.305 13.7538 23.1211 13.7539C22.9369 13.7539 22.8749 13.6316 22.8135 13.5088L21.4629 8.53516L16.4893 7.18457C16.3665 7.12317 16.2441 7.06116 16.2441 6.87695C16.2442 6.69294 16.3665 6.63167 16.4893 6.57031L21.4629 5.21875L22.8135 0.246094C22.8749 0.123286 22.9369 0 23.1211 0Z" fill="black" fillOpacity="0.4" />
    <path d="M12.0039 5.99219C12.3253 5.99229 12.4329 6.20659 12.54 6.4209L14.8975 15.1025L23.5791 17.46C23.7934 17.5672 24.0078 17.7818 24.0078 17.9961C24.0078 18.2104 23.7934 18.425 23.5791 18.5322L14.8975 20.8896L12.54 29.5713C12.4329 29.7856 12.3253 29.9999 12.0039 30C11.6825 30 11.5749 29.7856 11.4678 29.5713L9.11035 20.8896L0.428711 18.5322C0.214362 18.4251 1.18677e-05 18.3176 0 17.9961C0 17.6746 0.214356 17.5671 0.428711 17.46L9.11035 15.1025L11.4678 6.4209C11.5749 6.20659 11.6824 5.99219 12.0039 5.99219ZM23.1211 0C23.3051 0.000119025 23.3664 0.123346 23.4277 0.246094L24.7783 5.21875L29.752 6.57031C29.8747 6.63169 29.9979 6.7542 29.998 6.87695C29.998 6.99976 29.8748 7.12317 29.752 7.18457L24.7783 8.53516L23.4277 13.5088C23.3664 13.6315 23.305 13.7538 23.1211 13.7539C22.9369 13.7539 22.8749 13.6316 22.8135 13.5088L21.4629 8.53516L16.4893 7.18457C16.3665 7.12317 16.2441 7.06116 16.2441 6.87695C16.2442 6.69294 16.3665 6.63167 16.4893 6.57031L21.4629 5.21875L22.8135 0.246094C22.8749 0.123286 22.9369 0 23.1211 0Z" fill="url(#stars-grad)" />
  </svg>
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

function AskAiContent({ askDemo, entered }: { askDemo: number; entered: boolean }) {
  return (
    <div className="relative h-[490px] overflow-hidden pt-8">
      {/* Ask AI side panel — slides in from the left (like the Auto Archive
          account menu) and pushes the inbox to the right. Once settled it stays
          put, so the prompt cards on the left can be hovered. */}
      <div
        className="absolute bottom-0 left-0 top-8 z-20 flex w-[237px] flex-col gap-[18px] border-r-[0.5px] border-[#edecec] bg-white px-5 pb-[31px] pt-[17px]"
        style={{
          transform: entered ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 700ms ease-out",
        }}
      >
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

      {/* Inbox behind — full width at first, then pushed right + dimmed as the
          panel slides in. Spacing mirrors Split Inbox: tabs 64px from card top,
          40px gap to the list. */}
      <div
        className="flex flex-col gap-10 pl-6 pr-[25px] pt-8"
        style={{
          transform: entered ? "translateX(253px)" : "translateX(0)",
          opacity: entered ? 0.8 : 1,
          transition: "transform 700ms ease-out, opacity 700ms ease-out",
        }}
      >
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
      className="absolute left-[-20px] z-30 w-[214px] rounded-[4px] bg-white p-[18px] shadow-[0px_0px_8.6px_rgba(187,187,209,0.7)] flex flex-col gap-[12px]"
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
  // Ask AI entry: the inbox fades in full-width, then the side panel slides in
  // from the left and pushes it right. `entered` drives the slide; `settled`
  // gates the floating answer card so it only pops once the panel has arrived.
  const [entered, setEntered] = useState(false);
  const [settled, setSettled] = useState(false);
  useEffect(() => {
    if (step !== "ask-ai") {
      setEntered(false);
      setSettled(false);
      return;
    }
    setEntered(false);
    setSettled(false);
    const t1 = setTimeout(() => setEntered(true), 800);
    const t2 = setTimeout(() => setSettled(true), 1600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [step]);

  return (
    <PreviewCard
      overlay={step === "ask-ai" && settled ? <AskAiAnswerCard askDemo={askDemo} /> : undefined}
    >
      {step === "ask-ai" ? (
        <div key="askai">
          <AskAiContent askDemo={askDemo} entered={entered} />
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

/** Frosted comment bubble with a real teammate photo + gradient text. */
function SeatBubble({
  text,
  avatar,
  className,
}: {
  text: string;
  avatar: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "absolute flex items-center gap-2 rounded-[8px] border border-white/50 bg-white/85 px-2.5 py-2 backdrop-blur-md",
        "shadow-[0px_13px_39px_rgba(104,212,235,0.3),0px_6.6px_33px_rgba(226,138,226,0.4),0px_0.6px_2.6px_rgba(0,0,0,0.3)]",
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={avatar} alt="" className="size-[28px] shrink-0 rounded-full object-cover" />
      <span
        className="whitespace-nowrap bg-clip-text text-[14px] font-semibold text-transparent"
        style={{ backgroundImage: "linear-gradient(90deg,#6eacf4,#9e6ee5)" }}
      >
        {text}
      </span>
    </div>
  );
}

/** Live-collaboration scene — a frosted draft with teammates reacting. */
export function SeatsPreview() {
  return (
    <div
      className="relative h-[520px] w-[570px] max-w-full"
      style={{ animation: "screen-enter 420ms ease-out both" }}
    >
      {/* Frosted compose card — semi-transparent so the wash shows through
          (no opaque white block). The whole card (background + text) fades out
          toward the right edge via a horizontal mask, so the draft dissolves
          into the wash exactly like the Figma mockup. Sized wider than its
          visible area so the body lines run off into the fade. */}
      <div
        className="absolute left-[40px] top-[60px] w-[520px] rounded-[10px] border border-white/40 bg-white/45 px-7 pb-9 pt-6 backdrop-blur-md shadow-[0px_13px_38px_rgba(104,212,235,0.25),0px_6.5px_32px_rgba(226,138,226,0.3),0px_0.6px_2.6px_rgba(0,0,0,0.22)]"
        style={{
          WebkitMaskImage: "linear-gradient(to right, black 0%, black 52%, transparent 92%)",
          maskImage: "linear-gradient(to right, black 0%, black 52%, transparent 92%)",
        }}
      >
        <p
          className="bg-clip-text text-[21px] font-semibold text-transparent"
          style={{ backgroundImage: "linear-gradient(90deg,#5cc3fa,#fa75f8 46%,#fab266)" }}
        >
          New message
        </p>
        <div className="my-4 h-px w-full bg-black/10" />
        <p className="text-[18px] leading-[36px] text-[rgba(93,112,137,0.55)]">
          Hi team,
        </p>
        <p className="mt-2 text-[18px] leading-[36px] text-[rgba(93,112,137,0.55)]">
          I am thrilled about our recent product launch! As you all know,
          ProductHunt is a great platform for tapping into the tech community and
          gaining exposure for our product. However, we can&apos;t do it alone.
          That&apos;s why I&apos;m reaching out to ask for your help.
        </p>
      </div>

      {/* Teammates reacting in real time. */}
      <SeatBubble text="How do these edits look?" avatar="/seats-av-edits.png" className="right-[16px] top-[40px]" />
      <SeatBubble text="I added the attachments." avatar="/seats-av-attach.png" className="left-[6px] bottom-[150px]" />
      <SeatBubble text="Looks good to me!" avatar="/seats-av-looks.png" className="right-[44px] bottom-[64px]" />
    </div>
  );
}
