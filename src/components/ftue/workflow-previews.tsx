"use client";

import { cn } from "@/lib/utils";
import { ASK_AI_TABS, ASK_AI_MAIL } from "@/lib/data";

// ── Shared browser chrome ────────────────────────────────────────────────────

/** Traffic-light + URL titlebar, matching the inbox preview chrome. */
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

/** White browser card with the Chapter-3 preview tint + titlebar. */
function PreviewCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative w-[570px] max-w-full overflow-hidden rounded-[16px] bg-[linear-gradient(0deg,rgba(247,247,252,0.7),rgba(247,247,252,0.7)),#fff] shadow-[0_0_2px_rgba(20,20,19,0.12),0_6px_24px_rgba(20,20,19,0.12)]",
        className,
      )}
    >
      <TitleBar />
      {children}
    </div>
  );
}

function ArrowLeft({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path
        d="M10 3.5 5.5 8l4.5 4.5"
        stroke="#29323d"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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

// ── Auto Draft preview ───────────────────────────────────────────────────────

export function AutoDraftPreview() {
  return (
    <PreviewCard>
      <div className="flex h-[490px] flex-col gap-4 px-[28px] pt-[52px]">
        <div className="flex items-center gap-4">
          <ArrowLeft className="size-4 shrink-0" />
          <div className="h-[42px] flex-1" />
        </div>

        <div className="relative">
          {/* Conversation box with the focused-message left accent. */}
          <div className="flex flex-col gap-6 rounded-[4px] border-l-[3px] border-[#bec1e4] bg-white px-5 pb-5 pt-[26px] shadow-[0px_0px_9px_rgba(0,0,0,0.15)]">
            <div className="flex flex-col gap-2.5">
              <p className="text-[12px] font-semibold tracking-[-0.15px] text-[#29323d]">
                Maria
              </p>
              <p className="text-[12px] leading-[20px] tracking-[-0.15px] text-ink-subdued">
                Hi – any questions about the proposal?
              </p>
            </div>

            <div className="h-px w-full bg-black/[0.08]" />

            <div className="flex flex-col gap-[10px]">
              <p className="text-[13px] leading-[20px] tracking-[-0.15px]">
                <span className="font-semibold text-[#26a258]">Auto Draft</span>
                <span className="text-[12px] text-[#29323d]"> to Maria</span>
              </p>
              <p className="text-[13px] leading-[20px] tracking-[-0.15px] text-[#29323d]">
                Happy to clarify! Let me know if you&apos;d like to jump on a call.
              </p>
            </div>

            <SendRow />
          </div>

          {/* The drafted reply "pops out" as an elevated highlight card. */}
          <div className="absolute -bottom-2 left-3 right-3 flex flex-col gap-2 rounded-[12px] bg-white px-5 py-3 shadow-[0px_0px_8.6px_rgba(187,187,209,0.7)]">
            <p className="text-[12.9px] leading-[20px] tracking-[-0.15px]">
              <span className="font-bold text-[#26a258]">Auto Draft</span>
              <span className="text-[11.9px] text-[#29323d]"> to Maria</span>
            </p>
            <p className="text-[12.9px] leading-[20px] tracking-[-0.15px] text-[#29323d]">
              Happy to clarify! Let me know if you&apos;d like to jump on a call.
            </p>
          </div>
        </div>
      </div>
    </PreviewCard>
  );
}

// ── Auto Reminder preview ────────────────────────────────────────────────────

export function AutoReminderPreview({ wait }: { wait: string }) {
  return (
    <PreviewCard>
      <div className="flex h-[490px] flex-col gap-4 px-[28px] pt-[52px]">
        <div className="flex items-center gap-4">
          <ArrowLeft className="size-4 shrink-0" />
          <div className="h-[42px] flex-1" />
        </div>

        <div className="relative">
          <div className="flex flex-col gap-5 rounded-[4px] border-l-[3px] border-[#bec1e4] bg-white px-5 pb-5 pt-[26px] shadow-[0px_0px_9px_rgba(0,0,0,0.15)]">
            <div className="flex flex-col gap-2">
              <p className="text-[12px] font-semibold tracking-[-0.15px] text-[#29323d]">
                Maria
              </p>
              <p className="text-[12px] leading-[20px] tracking-[-0.15px] text-ink-subdued">
                Hi! Any chance you&apos;re free for a quick call tomorrow?
              </p>
            </div>

            <div className="h-px w-full bg-black/[0.08]" />

            <div className="flex flex-col gap-2">
              <p className="text-[12px] font-semibold tracking-[-0.15px] text-[#29323d]">
                Me
              </p>
              <p className="text-[12px] leading-[20px] tracking-[-0.15px] text-ink-subdued">
                Happy to connect! I&apos;m free Tuesday 2pm or Thursday morning –
                does either work?
              </p>
            </div>

            <SendRow />
          </div>

          {/* Reminder confirmation banner — the wait reflects the chosen option. */}
          <div className="absolute -bottom-2 left-3 right-3 flex items-center justify-between rounded-[12px] bg-white px-5 py-3 shadow-[0px_0px_8.6px_rgba(187,187,209,0.7)]">
            <p className="text-[12.9px] leading-[20px] tracking-[-0.15px] text-[#29323d]">
              Reminder set:{" "}
              <span className="font-semibold text-[#5f74aa]">{wait}</span> if no
              reply
            </p>
            <span className="text-[12.9px] font-semibold tracking-[-0.15px] text-ink-subdued">
              Undo
            </span>
          </div>
        </div>
      </div>
    </PreviewCard>
  );
}

// ── Ask AI preview ───────────────────────────────────────────────────────────

function Sparkle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 30" fill="none" className={className} aria-hidden>
      <defs>
        <linearGradient id="ai-sparkle" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5cc3fa" />
          <stop offset="55%" stopColor="#a87bf0" />
          <stop offset="100%" stopColor="#fab266" />
        </linearGradient>
      </defs>
      <path
        d="M15 1c.6 5.9 2.1 9.4 4.6 11.4C16.9 14.3 15.6 17.9 15 24c-.6-6.1-1.9-9.7-4.6-11.6C12.9 10.4 14.4 6.9 15 1Z"
        fill="url(#ai-sparkle)"
      />
      <path
        d="M25.5 16c-.3 2.6-1 4.2-2.3 5.1 1.3.8 2 2.4 2.3 5 .3-2.6 1-4.2 2.3-5-1.3-.9-2-2.5-2.3-5.1Z"
        fill="url(#ai-sparkle)"
      />
    </svg>
  );
}

export function AskAiPreview() {
  return (
    <PreviewCard>
      <div className="flex h-[452px] gap-4 pt-8">
        {/* Ask AI side panel */}
        <div className="flex w-[200px] shrink-0 flex-col gap-[18px] border-r-[0.5px] border-[#edecec] bg-white px-5 pb-[31px] pt-[17px]">
          <p className="text-[13px] font-semibold tracking-[-0.14px] text-[#29323d]">
            Ask AI
          </p>
          <div className="flex flex-col items-center gap-4">
            <Sparkle className="size-[30px]" />
            <p className="text-center text-[10px] leading-[18px] tracking-[-0.14px] text-ink-subdued">
              Find, write, schedule, or ask anything...
            </p>
            <div className="relative flex w-full items-center rounded-[3px] border-[0.7px] border-[#c8ccda] bg-white px-3 py-[7px]">
              <span className="text-[11px] text-ink-subdued">Type here..</span>
              <span className="absolute inset-y-0 left-0 w-[2px] rounded-l-[3px] bg-[#bec1e4]" />
            </div>
          </div>
        </div>

        {/* Inbox behind, slightly dimmed (the inbox keeps running) */}
        <div className="flex flex-1 flex-col gap-4 pt-2.5 opacity-80">
          <div className="flex items-center gap-2 overflow-hidden">
            {ASK_AI_TABS.map((tab) => (
              <div
                key={tab.label}
                className={cn(
                  "flex shrink-0 items-center gap-0.5 rounded-[6px] px-2.5 py-2 text-[12px]",
                  tab.active
                    ? "bg-[#fbfbfe] text-black drop-shadow-[0px_2px_4px_rgba(0,0,0,0.12)]"
                    : "text-[#999]",
                )}
              >
                <span>{tab.label}</span>
                <span className="text-[10px] text-[#b5b5b5]">{tab.count}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col pl-10">
            {ASK_AI_MAIL.map((m, i) => (
              <div key={i} className="flex items-center gap-5 py-2">
                <p className="w-[120px] shrink-0 truncate text-[11px] font-semibold tracking-[-0.15px] text-[#262626]">
                  {m.sender}
                </p>
                <p className="min-w-0 flex-1 truncate text-[11px] tracking-[-0.15px] text-[#262626]">
                  {m.subject}
                </p>
                <p className="shrink-0 text-[10px] text-[#999]">{m.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PreviewCard>
  );
}

// ── Seats preview ────────────────────────────────────────────────────────────

/** Small frosted comment bubble with a gradient avatar + gradient text. */
function CommentBubble({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "absolute flex items-center gap-2 rounded-[8px] border border-white/40 bg-white/85 px-2.5 py-2 backdrop-blur-md",
        "shadow-[0px_13px_39px_rgba(104,212,235,0.3),0px_6.6px_33px_rgba(226,138,226,0.4),0px_0.6px_2.6px_rgba(0,0,0,0.3)]",
        className,
      )}
    >
      <span className="size-[22px] shrink-0 rounded-full bg-[linear-gradient(135deg,#f6b8c8,#b48ce0)]" />
      <span
        className="whitespace-nowrap bg-clip-text text-[14px] font-semibold text-transparent"
        style={{ backgroundImage: "linear-gradient(90deg,#6eacf4,#9e6ee5)" }}
      >
        {text}
      </span>
    </div>
  );
}

export function SeatsPreview() {
  return (
    <div className="relative h-[520px] w-[570px] max-w-full">
      {/* Composed email card, tucked behind the bubbles. */}
      <div className="absolute left-[40px] top-[70px] w-[430px] overflow-hidden rounded-[10px] border border-white/40 bg-white/95 px-7 py-6 shadow-[0px_13px_38px_rgba(104,212,235,0.3),0px_6.5px_32px_rgba(226,138,226,0.4),0px_0.6px_2.6px_rgba(0,0,0,0.3)]">
        <p
          className="bg-clip-text text-[21px] font-semibold text-transparent"
          style={{ backgroundImage: "linear-gradient(90deg,#5cc3fa,#fa75f8 46%,#fab266)" }}
        >
          New message
        </p>
        <div className="my-4 h-px w-full bg-black/10" />
        <p className="text-[15px] leading-[28px] text-[rgba(93,112,137,0.6)]">
          Hi team,
        </p>
        <p className="mt-3 text-[15px] leading-[28px] text-[rgba(93,112,137,0.6)]">
          I am thrilled about our recent product launch! As you all know,
          ProductHunt is a great platform for tapping into the tech community and
          gaining exposure. If you haven&apos;t already, please take a moment to
          upvote our launch — it only takes a few clicks. Thank you for your
          support, and let&apos;s keep up the great work.
        </p>
        <p className="mt-3 text-[15px] leading-[28px] text-[rgba(93,112,137,0.6)]">
          Best,
          <br />
          Nicole
        </p>
      </div>

      {/* Live collaboration — teammates reacting in real time. */}
      <CommentBubble text="How do these edits look?" className="right-[20px] top-[40px]" />
      <CommentBubble text="I added the attachments." className="left-[10px] bottom-[120px]" />
      <CommentBubble text="Looks good to me!" className="right-[60px] bottom-[60px]" />
    </div>
  );
}
