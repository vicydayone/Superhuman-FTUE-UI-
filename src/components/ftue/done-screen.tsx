"use client";

/**
 * Final "You're all set!" screen — full-bleed mountain background, centered
 * white card with gradient headline + two CTAs. Matches Figma node 1928:11489.
 */
export function DoneCard({ onRestart }: { onRestart: () => void }) {
  return (
    // Full-bleed mountain background (same photo as Chapter 1 auth screens).
    // pt-14 clears the absolute-positioned Stepper bar (~56px).
    <div
      className="flex h-full w-full items-center justify-center bg-cover bg-center pt-14"
      style={{ backgroundImage: "url(/auth-bg.png)" }}
    >
      <div
        className="flex flex-col items-center gap-10 rounded-[12px] border border-[#e2e2e2] bg-white px-[80px] pb-[60px] pt-[70px] shadow-[0px_0px_27.6px_rgba(107,72,134,0.1)]"
        style={{ animation: "screen-enter 420ms ease-out both" }}
      >
        {/* Headline + subtitle */}
        <div className="flex flex-col items-center gap-3 text-center">
          <h1
            className="bg-clip-text text-[40px] font-semibold leading-[60px] text-transparent"
            style={{ backgroundImage: "linear-gradient(93deg, #1ca5d7 8%, #8655d6 88%)" }}
          >
            You&rsquo;re all set!
          </h1>
          <p className="whitespace-nowrap text-[16px] leading-6 text-ink">
            Now let&rsquo;s take a two-minute tutorial to learn how to fly through your inbox.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col items-center gap-[10px]">
          <button
            type="button"
            onClick={onRestart}
            className="flex items-center gap-1 rounded-[2px] bg-primary px-3 pb-[7px] pt-[9px] text-[14px] font-semibold uppercase leading-4 text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          >
            START TUTORIAL ✨
          </button>
          <span className="text-[14px] leading-normal text-[#686868]">or</span>
          <button
            type="button"
            onClick={onRestart}
            className="rounded-[2px] px-3 pb-[7px] pt-[9px] text-[14px] font-semibold uppercase leading-4 text-black/40 transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stepper/50"
          >
            GO TO MY INBOX
          </button>
        </div>
      </div>
    </div>
  );
}
