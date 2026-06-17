/**
 * Chapter 1 — "Connect your account". A linear, progress-bar-free sequence:
 * two branded landing screens, then a recognizable Google OAuth hand-off.
 */
export type Chapter1Step =
  | "welcome"
  | "signin"
  | "google-account"
  | "google-consent"
  | "google-scopes"
  | "signing-in";

export type FlowStep =
  | Chapter1Step
  | "intro"
  | "auto-archive"
  | "split-inbox"
  | "auto-draft"
  | "auto-reminder"
  | "ask-ai"
  | "seats"
  | "done";

/** Auto-label categories that "Keep it clean" routes out of the inbox. */
export type MailLabel = "marketing" | "news" | "pitch" | "social";

/** Split Inbox tab a message belongs to. */
export type SplitCategory = "important" | "calendar" | "jira" | "other";

export interface AutoArchiveMail {
  sender: string;
  subject: string;
  date: string;
  /** Promotional auto-label, if any. Labelled mail is hidden by "Keep it clean". */
  label?: MailLabel;
}

export interface SplitMail {
  sender: string;
  subject: string;
  date: string;
  category: SplitCategory;
  /** Auto-label chip (shown on promotional mail in the "Other" tab). */
  label?: MailLabel;
}

export interface AutoArchiveToggles {
  marketing: boolean;
  news: boolean;
  pitch: boolean;
  social: boolean;
}

export interface SplitToggles {
  calendar: boolean;
  jira: boolean;
}

// ── Chapter 3 — "Accelerate your workflow" ───────────────────────────────────

/** Auto Draft toggles (Responses is always on; these two are user-controlled). */
export interface AutoDraftToggles {
  followUps: boolean;
  scheduling: boolean;
}

/**
 * Which Auto Draft capability is being demonstrated in the preview. Selecting a
 * card on the left swaps the drafted reply shown on the right.
 */
export type AutoDraftDemo = "responses" | "followUps" | "scheduling";

/** How long Auto Reminder waits before nudging when there's no reply. */
export type ReminderChoice = "asap" | "couple-days" | "week";
