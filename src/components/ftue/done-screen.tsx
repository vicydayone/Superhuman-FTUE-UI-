"use client";

/** White sparkle that trails the primary CTA label. */
function Sparkle() {
  return (
    <svg viewBox="0 0 14 14" className="size-3.5" fill="none" aria-hidden>
      <path
        d="M7 0c.26 2.7.96 4.4 2.2 5.4C7.84 6.3 7.24 8 7 11c-.26-3-.86-4.7-2.2-5.7C6.04 4.3 6.74 2.6 7 0Z"
        fill="currentColor"
      />
      <path
        d="M11.8 7.6c-.16 1.2-.5 2-1.1 2.4.6.4.94 1.1 1.1 2.4.16-1.3.5-2 1.1-2.4-.6-.4-.94-1.2-1.1-2.4Z"
        fill="currentColor"
      />
    </svg>
  );
}

/**
 * Final completion card — centered glass panel celebrating the finish. The
 * stepper (all three steps checked) is rendered by the persistent shell.
 */
export function DoneCard({ onRestart }: { onRestart: () => void }) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div
        className="flex flex-col items-center gap-12 rounded-[12px] border border-[#e2e2e2] bg-white/60 px-[96px] pb-[56px] pt-[64px] shadow-[0px_0px_55px_rgba(107,72,134,0.1)] backdrop-blur-sm"
        style={{ animation: "screen-enter 420ms ease-out both" }}
      >
        <div className="flex flex-col items-center gap-3">
          <h1
            className="bg-clip-text text-center text-[34px] font-semibold leading-[1.35] text-transparent"
            style={{
              backgroundImage: "linear-gradient(95deg, #1ca5d7 8%, #8655d6 88%)",
            }}
          >
            Everything&rsquo;s set. Let&rsquo;s go!
          </h1>
          <p className="max-w-[420px] text-center text-[14px] leading-normal text-ink-subdued">
            Get started with the most productive email app ever made, or start
            with a 2-minute tutorial to learn to fly through your inbox.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <button
            type="button"
            onClick={onRestart}
            className="flex items-center gap-1 rounded-[2px] bg-primary px-3 pb-[7px] pt-[9px] text-[14px] font-semibold uppercase leading-4 text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          >
            OPEN MY SUPERHUMAN INBOX
            <Sparkle />
          </button>
          <span className="text-[13px] text-black/40">or</span>
          <button
            type="button"
            onClick={onRestart}
            className="rounded-[2px] px-3 pb-[7px] pt-[9px] text-[14px] font-semibold uppercase leading-4 text-black/40 transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stepper/50"
          >
            Start tutorial
          </button>
        </div>
      </div>
    </div>
  );
}
