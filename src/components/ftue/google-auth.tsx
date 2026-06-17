"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";

// ── Brand marks ───────────────────────────────────────────────────────────────

/** The four-colour Google "G". */
function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden xmlns="http://www.w3.org/2000/svg">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

/** Superhuman app mark — black tile with a layered cyan/violet glyph. */
function SuperhumanMark({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center justify-center rounded-[7px] bg-[#0d0d0f]", className)}>
      <svg viewBox="0 0 24 24" className="size-[58%]" aria-hidden xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3.5 L20.5 8 L12 12.5 L3.5 8 Z" fill="#7fd6e8" />
        <path d="M3.5 12 L12 16.5 L20.5 12 L12 16.5 Z" fill="none" stroke="#8b9bff" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M3.5 15.5 L12 20 L20.5 15.5" fill="none" stroke="#6f7fe0" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

/** Circular initials avatar (stands in for the Google profile photo). */
function Avatar({ tone, className }: { tone: "teal" | "rose"; className?: string }) {
  const bg = tone === "teal" ? "from-[#3aa6a0] to-[#2b7a86]" : "from-[#c98a9e] to-[#9a5a78]";
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-[11px] font-medium text-white",
        bg,
        className,
      )}
    >
      NS
    </span>
  );
}

// ── Google chrome (header + card + footer) ────────────────────────────────────

function GoogleChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full w-full items-center justify-center overflow-auto bg-[#f0f1f3] p-4 sm:p-8">
      <div className="flex w-full max-w-[880px] flex-col">
        <div className="overflow-hidden rounded-[8px] bg-white shadow-[0_1px_2px_rgba(60,64,67,0.1),0_2px_6px_rgba(60,64,67,0.08)]">
          {/* Title bar */}
          <div className="flex items-center gap-2.5 border-b border-[#ebebeb] px-5 py-3 sm:px-7">
            <GoogleG className="size-4" />
            <span className="text-[12px] text-[#5f6368]">Sign in with Google</span>
          </div>
          {/* Body */}
          <div className="px-6 py-9 sm:px-12 sm:py-12">{children}</div>
        </div>
        {/* Footer */}
        <div className="flex items-center justify-between px-1 py-4 text-[12px] text-[#5f6368]">
          <span className="flex items-center gap-1.5">
            English (United States)
            <svg viewBox="0 0 10 6" className="size-2.5" fill="none" aria-hidden>
              <path d="M1 1l4 4 4-4" stroke="#5f6368" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <div className="flex gap-5 sm:gap-6">
            <span>Help</span>
            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Two-column layout used by every consent-style Google screen. */
function GoogleColumns({
  title,
  account,
  children,
}: {
  title: React.ReactNode;
  account?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-9 md:flex-row md:gap-14">
      <div className="md:w-[44%]">
        <SuperhumanMark className="mb-5 size-9" />
        <h1 className="text-[26px] font-normal leading-[1.25] text-[#202124] sm:text-[28px]">
          {title}
        </h1>
        {account}
      </div>
      <div className="flex-1 text-[14px] leading-[1.5] text-[#3c4043]">{children}</div>
    </div>
  );
}

/** Pill account chip with a dropdown caret (consent screens). */
function AccountChip() {
  return (
    <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#dadce0] py-1.5 pl-1.5 pr-3">
      <Avatar tone="rose" className="size-6" />
      <span className="text-[13px] text-[#3c4043]">sample.inbox@superhuman.com</span>
      <svg viewBox="0 0 10 6" className="size-2.5" fill="none" aria-hidden>
        <path d="M1 1l4 4 4-4" stroke="#5f6368" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

const linkClass = "text-[#1a73e8] hover:underline";

/** Outlined / filled pill buttons (Google's Cancel + Continue). */
function GoogleActions({
  onContinue,
  onCancel,
}: {
  onContinue: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="mt-9 flex justify-end gap-3">
      <button
        type="button"
        onClick={onCancel}
        className="rounded-[4px] px-5 py-2 text-[14px] font-medium text-[#1a73e8] transition-colors hover:bg-[#1a73e8]/[0.06]"
      >
        Cancel
      </button>
      <button
        type="button"
        onClick={onContinue}
        className="rounded-[4px] bg-[#1a73e8] px-6 py-2 text-[14px] font-medium text-white transition-colors hover:bg-[#1b66c9]"
      >
        Continue
      </button>
    </div>
  );
}

// ── Screen 3 — Choose an account ──────────────────────────────────────────────

function AccountRow({
  tone,
  name,
  email,
  onClick,
}: {
  tone: "teal" | "rose";
  name: string;
  email: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-4 border-b border-[#ebebeb] py-3 text-left transition-colors hover:bg-black/[0.02]"
    >
      <Avatar tone={tone} className="size-8" />
      <div className="min-w-0">
        <p className="truncate text-[14px] font-medium text-[#202124]">{name}</p>
        <p className="truncate text-[13px] text-[#5f6368]">{email}</p>
      </div>
    </button>
  );
}

export function GoogleAccountScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <GoogleChrome>
      <GoogleColumns
        title="Choose an account"
        account={
          <p className="mt-2 text-[14px] text-[#3c4043]">
            to continue to <span className="text-[#1a73e8]">Superhuman</span>
          </p>
        }
      >
        <AccountRow tone="teal" name="Name Surname" email="sample.inbox@superhuman.com" onClick={onContinue} />
        <AccountRow tone="rose" name="Name Surname" email="sample.inbox@superhuman.com" onClick={onContinue} />
        <button
          type="button"
          onClick={onContinue}
          className="flex w-full items-center gap-4 border-b border-[#ebebeb] py-3 text-left transition-colors hover:bg-black/[0.02]"
        >
          <span className="flex size-8 items-center justify-center rounded-full text-[#5f6368]">
            <svg viewBox="0 0 24 24" className="size-6" fill="none" aria-hidden>
              <circle cx="12" cy="9" r="3.2" stroke="#5f6368" strokeWidth="1.5" />
              <path d="M5 19c1.2-3 4-4.5 7-4.5s5.8 1.5 7 4.5" stroke="#5f6368" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </span>
          <span className="text-[14px] font-medium text-[#202124]">Use another account</span>
        </button>
        <p className="mt-6 text-[12px] leading-[1.6] text-[#5f6368]">
          Before using this app, you can review Superhuman&rsquo;s{" "}
          <span className={linkClass}>Privacy Policy</span> and{" "}
          <span className={linkClass}>Terms of Service</span>.
        </p>
      </GoogleColumns>
    </GoogleChrome>
  );
}

// ── Screen 4 — Sign in to Superhuman (info disclosure) ────────────────────────

function InfoRow({
  icon,
  title,
  sub,
}: {
  icon: React.ReactNode;
  title: string;
  sub: string;
}) {
  return (
    <div className="flex items-center gap-4 py-2.5">
      <span className="flex size-6 shrink-0 items-center justify-center text-[#5f6368]">{icon}</span>
      <div>
        <p className="text-[14px] text-[#202124]">{title}</p>
        <p className="text-[13px] text-[#5f6368]">{sub}</p>
      </div>
    </div>
  );
}

export function GoogleConsentScreen({
  onContinue,
  onCancel,
}: {
  onContinue: () => void;
  onCancel: () => void;
}) {
  return (
    <GoogleChrome>
      <GoogleColumns title="Sign in to Superhuman" account={<AccountChip />}>
        <p className="text-[16px] text-[#202124]">
          Google will allow Superhuman to access this info about you
        </p>
        <div className="mt-3">
          <InfoRow
            icon={
              <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden>
                <circle cx="12" cy="8.5" r="3.4" stroke="#5f6368" strokeWidth="1.5" />
                <path d="M5 19c1.2-3 4-4.6 7-4.6s5.8 1.6 7 4.6" stroke="#5f6368" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            }
            title="Name Surname"
            sub="Name and profile picture"
          />
          <InfoRow
            icon={
              <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden>
                <rect x="3" y="5.5" width="18" height="13" rx="2" stroke="#5f6368" strokeWidth="1.5" />
                <path d="M4 7l8 6 8-6" stroke="#5f6368" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            }
            title="sample.inbox@superhuman.com"
            sub="Email address"
          />
        </div>
        <div className="mt-3 space-y-3 text-[13px] leading-[1.6] text-[#5f6368]">
          <p>
            Review Superhuman&rsquo;s <span className={linkClass}>Privacy Policy</span> and{" "}
            <span className={linkClass}>Terms of Service</span> to understand how Superhuman will
            process and protect your data.
          </p>
          <p>
            To make changes at any time, go to your <span className={linkClass}>Google Account</span>.
          </p>
          <p>
            Learn more about <span className={linkClass}>Sign in with Google</span>.
          </p>
        </div>
        <GoogleActions onContinue={onContinue} onCancel={onCancel} />
      </GoogleColumns>
    </GoogleChrome>
  );
}

// ── Screen 5 — Superhuman wants access (scopes) ───────────────────────────────

function ScopeIcon({ variant }: { variant: "gmail" | "contacts" | "calendar" | "directory" }) {
  if (variant === "gmail") {
    return (
      <svg viewBox="0 0 24 24" className="size-[18px]" aria-hidden>
        <path d="M3 6.5A1.5 1.5 0 014.5 5H6v14H4.5A1.5 1.5 0 013 17.5v-11z" fill="#4285F4" />
        <path d="M18 5h1.5A1.5 1.5 0 0121 6.5v11a1.5 1.5 0 01-1.5 1.5H18V5z" fill="#34A853" />
        <path d="M6 5l6 4.5L18 5v3l-6 4.5L6 8V5z" fill="#EA4335" />
        <path d="M6 5l6 4.5L18 5" fill="none" stroke="#fff" strokeWidth="0" />
      </svg>
    );
  }
  if (variant === "calendar") {
    return (
      <svg viewBox="0 0 24 24" className="size-[18px]" aria-hidden>
        <rect x="4" y="5" width="16" height="15" rx="2" fill="#fff" stroke="#4285F4" strokeWidth="1.4" />
        <path d="M4 9h16" stroke="#4285F4" strokeWidth="1.4" />
        <rect x="7" y="2.8" width="1.6" height="3.4" rx="0.8" fill="#4285F4" />
        <rect x="15.4" y="2.8" width="1.6" height="3.4" rx="0.8" fill="#4285F4" />
        <text x="12" y="17" textAnchor="middle" fontSize="6" fill="#4285F4" fontWeight="700">31</text>
      </svg>
    );
  }
  if (variant === "directory") {
    return <span className="block size-2 rounded-full bg-[#4285F4]" />;
  }
  // contacts
  return (
    <svg viewBox="0 0 24 24" className="size-[18px]" aria-hidden>
      <rect x="4" y="4" width="16" height="16" rx="2" fill="#4285F4" />
      <circle cx="12" cy="10" r="2.6" fill="#fff" />
      <path d="M7.5 17c.8-2 2.5-3 4.5-3s3.7 1 4.5 3" fill="#fff" />
    </svg>
  );
}

const SCOPES: { variant: "gmail" | "contacts" | "calendar" | "directory"; text: string }[] = [
  { variant: "gmail", text: "Read, compose, send, and permanently delete all your email from Gmail." },
  { variant: "gmail", text: "See, edit, create, or change your email settings and filters in Gmail." },
  { variant: "contacts", text: "See and download contact info automatically saved in your “Other contacts”." },
  { variant: "contacts", text: "See, edit, download, and permanently delete your contacts." },
  { variant: "calendar", text: "See, edit, share, and permanently delete all the calendars you can access using Google Calendar." },
  { variant: "directory", text: "See and download your organization's Google Workspace directory." },
];

function ScopeCheck({ checked }: { checked: boolean }) {
  return (
    <span
      className={cn(
        "flex size-[18px] shrink-0 items-center justify-center rounded-[3px] border",
        checked ? "border-[#1a73e8] bg-[#1a73e8]" : "border-[#5f6368] bg-white",
      )}
    >
      {checked && (
        <svg viewBox="0 0 10 8" className="size-2.5" fill="none" aria-hidden>
          <path d="M1 4L3.8 7L9 1" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </span>
  );
}

export function GoogleScopesScreen({
  onContinue,
  onCancel,
}: {
  onContinue: () => void;
  onCancel: () => void;
}) {
  return (
    <GoogleChrome>
      <GoogleColumns
        title={
          <>
            Superhuman wants access to your Google Account
          </>
        }
        account={
          <div className="mt-5 inline-flex items-center gap-2">
            <Avatar tone="rose" className="size-6" />
            <span className="text-[13px] text-[#3c4043]">sample.inbox@superhuman.com</span>
          </div>
        }
      >
        <p className="text-[16px] text-[#202124]">
          Select what <span className="text-[#1a73e8]">Superhuman</span> can access
        </p>

        <label className="mt-3 flex items-center gap-3 border-b border-[#ebebeb] py-3">
          <ScopeCheck checked />
          <span className="text-[14px] text-[#202124]">Select all</span>
        </label>

        {SCOPES.map((scope, i) => (
          <div key={i} className="flex items-start gap-3 border-b border-[#ebebeb] py-3">
            <span className="mt-0.5 flex w-[18px] shrink-0 justify-center">
              <ScopeIcon variant={scope.variant} />
            </span>
            <p className="flex-1 text-[13px] leading-[1.5] text-[#3c4043]">
              {scope.text} <span className={linkClass}>Learn more</span>
            </p>
            <ScopeCheck checked />
          </div>
        ))}

        <p className="mt-6 text-[16px] text-[#202124]">Make sure you trust Superhuman</p>
        <p className="mt-2 text-[13px] leading-[1.6] text-[#5f6368]">
          You may be sharing sensitive info with this site or app. Learn about how Superhuman will
          handle your data by reviewing its <span className={linkClass}>privacy policies</span>.
        </p>

        <GoogleActions onContinue={onContinue} onCancel={onCancel} />
      </GoogleColumns>
    </GoogleChrome>
  );
}

// ── Screen 6 — Signing in (hand-off to Chapter 2) ─────────────────────────────

export function SigningInScreen({ onContinue }: { onContinue: () => void }) {
  // Auto-advance into Chapter 2 once "sign-in" completes; clicking skips ahead.
  useEffect(() => {
    const id = setTimeout(onContinue, 1900);
    return () => clearTimeout(id);
  }, [onContinue]);

  return (
    <button
      type="button"
      onClick={onContinue}
      aria-label="Continue"
      className="relative flex h-full w-full cursor-pointer items-center justify-center overflow-hidden"
    >
      {/* Dimmed mountain backdrop */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(/auth-bg.png)" }} />
      <div className="absolute inset-0 bg-[#1a1730]/55 backdrop-blur-[2px]" />

      {/* Sign-in card */}
      <div className="relative z-10 flex flex-col items-center gap-5 rounded-[14px] bg-white/95 px-12 py-10 shadow-[0_24px_70px_rgba(20,18,50,0.35)]">
        <div
          aria-hidden
          className="animate-spin"
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            background:
              "conic-gradient(from 90deg, #7ba4d8 0%, #b8a8e0 30%, rgba(212,184,232,0) 86%, rgba(212,184,232,0) 100%)",
            WebkitMask:
              "radial-gradient(circle, transparent 15px, black 15.5px, black 20px, transparent 20.5px)",
            mask: "radial-gradient(circle, transparent 15px, black 15.5px, black 20px, transparent 20.5px)",
            animationDuration: "1.2s",
            animationTimingFunction: "linear",
          }}
        />
        <p className="text-[15px] font-medium text-ink">Signing you in&hellip;</p>
      </div>
    </button>
  );
}
