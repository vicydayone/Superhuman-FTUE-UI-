export type FlowStep =
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

/** How long Auto Reminder waits before nudging when there's no reply. */
export type ReminderChoice = "asap" | "couple-days" | "week";
