import type { AutoArchiveMail, AutoDraftDemo, MailLabel, SplitMail } from "./types";

// ─────────────────────────────────────────────────────────────────────────────
// Auto Archive dataset (Figma "design update" section, "show everything" frame
// 1843:27086 — the authoritative full inbox, 33 rows in exact order/date/label).
//
// 33 messages. 14 carry an auto-label (marketing 3 · news 5 · pitch 4 · social 2);
// the other 19 are unlabelled. Each label toggle archives its mail:
//   • all off            → Inbox 33 · Auto Archive 0
//   • marketing (default) → Inbox 30 · Auto Archive 3
//   • all on             → Inbox 19 · Auto Archive 14
//
// Split Inbox derives from this list (cumulative state): after the default
// marketing archive, toSplitMail() yields Important 9 · Calendar 5 · Jira 5 ·
// Other 11. (Figma's static Split badges drift between frames — this master
// list is the single internally-consistent source of truth.)
// ─────────────────────────────────────────────────────────────────────────────
export const AUTO_ARCHIVE_MAIL: AutoArchiveMail[] = [
  // JUN 30
  { sender: "CodeGenius", subject: "Check out your new offer!", date: "JUN 30", label: "marketing" },
  { sender: "Maria Howard", subject: "Sales Contract", date: "JUN 30" },
  { sender: "Arlene McCoy", subject: "Application for Product Manager position", date: "JUN 30" },
  { sender: "TechCrunch", subject: "OpenAI’s new model beats benchmarks across coding, math, and reasoning", date: "JUN 30", label: "news" },
  // JUN 29
  { sender: "Daniel Foster", subject: "Let’s Elevate Your Brand Today!", date: "JUN 29", label: "marketing" },
  { sender: "Savannah Nguyen", subject: "ACME <> Hyperfusion Q2 Review", date: "JUN 29" },
  { sender: "CodeSprint", subject: "Mobile Development Partnership", date: "JUN 29", label: "pitch" },
  { sender: "Jenny Wilson", subject: "Your Weekly Highlights", date: "JUN 29" },
  { sender: "LinkedIn", subject: "This week in tech – March edition", date: "JUN 29", label: "social" },
  // JUN 27
  { sender: "TechCrunch", subject: "Stripe launches new API for embedded financial products", date: "JUN 27", label: "news" },
  // JUN 26
  { sender: "Eleanor Bell", subject: "New product launch: GPT for Business Decisions", date: "JUN 26", label: "pitch" },
  // JUN 25
  { sender: "Kristin Watson", subject: "Final contract signature needed", date: "JUN 25" },
  // JUN 24
  { sender: "FlowSync", subject: "Unlock Your Next Growth Phase", date: "JUN 24", label: "marketing" },
  { sender: "Lina Morales", subject: "Scale Smarter", date: "JUN 24", label: "pitch" },
  { sender: "United Airlines", subject: "eTicket Itinerary and Receipt for Confirmation CW…", date: "JUN 24" },
  // JUN 23
  { sender: "LinkedIn", subject: "Your Weekly Highlights", date: "JUN 23", label: "social" },
  { sender: "Esther Ruan", subject: "Q3 customer survey results", date: "JUN 23" },
  { sender: "Medium", subject: "The hidden cost of always-on work culture", date: "JUN 23", label: "news" },
  // JUN 22
  { sender: "June Chen", subject: "Pre-read: Campaign Narrative", date: "JUN 22" },
  { sender: "Hannah Tremblay", subject: "ACME Pilot", date: "JUN 22" },
  { sender: "Alex Martinez", subject: "Supercharge Your Sales", date: "JUN 22", label: "pitch" },
  // JUN 21
  { sender: "New York Times", subject: "Breaking News: Federal Reserve holds interest rates steady for third straight meeting", date: "JUN 21", label: "news" },
  { sender: "Morning Brew", subject: "MARKETS: Dow drops 300 points + What’s driving the selloff", date: "JUN 21", label: "news" },
  { sender: "Jira", subject: "ITHO-84512 Password Reset Loop on Login Page", date: "JUN 21" },
  { sender: "Jira", subject: "[JIRA] Petra Vanlund mentioned you on ITHO-91034", date: "JUN 21" },
  // JUN 20
  { sender: "Jira", subject: "ITHO-76201 VPN Access Request for New Hire", date: "JUN 20" },
  // JUN 19
  { sender: "Jira", subject: "ITHO-55839 Slack Notifications Not Syncing", date: "JUN 19" },
  { sender: "Jira", subject: "[JIRA] Tomás Eriksen mentioned you on ITHO-62477", date: "JUN 19" },
  // JUN 18
  { sender: "Arlene McCoy", subject: "Invitation: Q3 Planning Kickoff @ Fri Jun 19, 2026 10am – 11am…", date: "JUN 18" },
  { sender: "Maria Howard", subject: "Tentatively Accepted: Product Roadmap Review @ Mon Jun 22, 2026 3pm…", date: "JUN 18" },
  // JUN 17
  { sender: "Jenny Wilson", subject: "Updated invitation: Weekly: Team Standup @ Daily from…", date: "JUN 17" },
  { sender: "Savannah Nguyen", subject: "Updated invitation: [Optional] Design Sync @ Weekly from…", date: "JUN 17" },
  // JUN 16
  { sender: "Kristin Watson", subject: "Declined: Q3 Planning Kickoff @ Fri Jun 19, 2026 10am – 11am…", date: "JUN 16" },
];

/** Labels surfaced on the "Keep it clean" card. */
export const ARCHIVED_LABELS: MailLabel[] = ["marketing", "news", "pitch", "social"];

export const isArchived = (mail: AutoArchiveMail): boolean => mail.label !== undefined;

// ─────────────────────────────────────────────────────────────────────────────
// Split Inbox dataset — full categorization of AUTO_ARCHIVE_MAIL (master order).
//
// NOTE: This is reference data. The live Split Inbox preview does NOT consume
// this list — Chapter2Preview derives its mails from AUTO_ARCHIVE_MAIL via
// toSplitMail() so Split starts from the exact post-archive (cumulative) state.
// Kept in sync here for documentation/handoff clarity only.
//
// Full categorization (nothing archived): Important 9 · Calendar 5 · Jira 5 ·
// Other 14. After the default marketing archive the Other tab shows 11.
// ─────────────────────────────────────────────────────────────────────────────
export const SPLIT_MAIL: SplitMail[] = [
  // Important (9)
  { sender: "Maria Howard", subject: "Sales Contract", date: "JUN 30", category: "important" },
  { sender: "Arlene McCoy", subject: "Application for Product Manager position", date: "JUN 30", category: "important" },
  { sender: "Savannah Nguyen", subject: "ACME <> Hyperfusion Q2 Review", date: "JUN 29", category: "important" },
  { sender: "Jenny Wilson", subject: "Your Weekly Highlights", date: "JUN 29", category: "important" },
  { sender: "Kristin Watson", subject: "Final contract signature needed", date: "JUN 25", category: "important" },
  { sender: "United Airlines", subject: "eTicket Itinerary and Receipt for Confirmation CW…", date: "JUN 24", category: "important" },
  { sender: "Esther Ruan", subject: "Q3 customer survey results", date: "JUN 23", category: "important" },
  { sender: "June Chen", subject: "Pre-read: Campaign Narrative", date: "JUN 22", category: "important" },
  { sender: "Hannah Tremblay", subject: "ACME Pilot", date: "JUN 22", category: "important" },
  // Calendar (5)
  { sender: "Arlene McCoy", subject: "Invitation: Q3 Planning Kickoff @ Fri Jun 19, 2026 10am – 11am…", date: "JUN 18", category: "calendar" },
  { sender: "Maria Howard", subject: "Tentatively Accepted: Product Roadmap Review @ Mon Jun 22, 2026 3pm…", date: "JUN 18", category: "calendar" },
  { sender: "Jenny Wilson", subject: "Updated invitation: Weekly: Team Standup @ Daily from…", date: "JUN 17", category: "calendar" },
  { sender: "Savannah Nguyen", subject: "Updated invitation: [Optional] Design Sync @ Weekly from…", date: "JUN 17", category: "calendar" },
  { sender: "Kristin Watson", subject: "Declined: Q3 Planning Kickoff @ Fri Jun 19, 2026 10am – 11am…", date: "JUN 16", category: "calendar" },
  // Jira (5)
  { sender: "Jira", subject: "ITHO-84512 Password Reset Loop on Login Page", date: "JUN 21", category: "jira" },
  { sender: "Jira", subject: "[JIRA] Petra Vanlund mentioned you on ITHO-91034", date: "JUN 21", category: "jira" },
  { sender: "Jira", subject: "ITHO-76201 VPN Access Request for New Hire", date: "JUN 20", category: "jira" },
  { sender: "Jira", subject: "ITHO-55839 Slack Notifications Not Syncing", date: "JUN 19", category: "jira" },
  { sender: "Jira", subject: "[JIRA] Tomás Eriksen mentioned you on ITHO-62477", date: "JUN 19", category: "jira" },
  // Other (14 — promotional/labelled mail; 11 remain after the marketing archive)
  { sender: "CodeGenius", subject: "Check out your new offer!", date: "JUN 30", category: "other", label: "marketing" },
  { sender: "TechCrunch", subject: "OpenAI’s new model beats benchmarks across coding, math, and reasoning", date: "JUN 30", category: "other", label: "news" },
  { sender: "Daniel Foster", subject: "Let’s Elevate Your Brand Today!", date: "JUN 29", category: "other", label: "marketing" },
  { sender: "CodeSprint", subject: "Mobile Development Partnership", date: "JUN 29", category: "other", label: "pitch" },
  { sender: "LinkedIn", subject: "This week in tech – March edition", date: "JUN 29", category: "other", label: "social" },
  { sender: "TechCrunch", subject: "Stripe launches new API for embedded financial products", date: "JUN 27", category: "other", label: "news" },
  { sender: "Eleanor Bell", subject: "New product launch: GPT for Business Decisions", date: "JUN 26", category: "other", label: "pitch" },
  { sender: "FlowSync", subject: "Unlock Your Next Growth Phase", date: "JUN 24", category: "other", label: "marketing" },
  { sender: "Lina Morales", subject: "Scale Smarter", date: "JUN 24", category: "other", label: "pitch" },
  { sender: "LinkedIn", subject: "Your Weekly Highlights", date: "JUN 23", category: "other", label: "social" },
  { sender: "Medium", subject: "The hidden cost of always-on work culture", date: "JUN 23", category: "other", label: "news" },
  { sender: "Alex Martinez", subject: "Supercharge Your Sales", date: "JUN 22", category: "other", label: "pitch" },
  { sender: "New York Times", subject: "Breaking News: Federal Reserve holds interest rates steady for third straight meeting", date: "JUN 21", category: "other", label: "news" },
  { sender: "Morning Brew", subject: "MARKETS: Dow drops 300 points + What’s driving the selloff", date: "JUN 21", category: "other", label: "news" },
];

export interface SplitTabDefinition {
  key: import("./types").SplitCategory;
  label: string;
  description: string;
  badge: string;
  /** Whether this split can be toggled on/off (Important & Other are fixed). */
  toggleable: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Chapter 3 — "Accelerate your workflow"
// ─────────────────────────────────────────────────────────────────────────────

/** Auto Draft cards (left column of the Auto Draft screen). */
export const AUTO_DRAFT_CARDS = [
  {
    key: "responses" as const,
    title: "Responses",
    description: "We draft replies for emails that need your input.",
    fixed: true,
  },
  {
    key: "followUps" as const,
    title: "Follow-ups",
    description: "We draft a reply when a reminder returns and needs a follow up.",
    fixed: false,
  },
  {
    key: "scheduling" as const,
    title: "Scheduling",
    description: "We draft a reply when someone wants to meet.",
    fixed: false,
  },
];

/**
 * Per-card preview content for Auto Draft. Selecting a card on the left swaps
 * the incoming message + drafted reply shown in the preview. Reply segments
 * with `highlight` render in the cobalt accent (the scheduling time slots).
 */
export const AUTO_DRAFT_DEMOS: Record<
  AutoDraftDemo,
  {
    incoming: { sender: string; badge?: string; body: string };
    reply: { text: string; highlight?: boolean }[];
  }
> = {
  responses: {
    incoming: {
      sender: "Maria",
      body: "Thanks for sending that contract over. The team and I will review and then we can discuss next steps.",
    },
    reply: [
      {
        text: "That’s great to hear Maria! I’m available to clarify anything or go over details if needed. Let me know if you’d like to discuss!",
      },
    ],
  },
  followUps: {
    incoming: {
      sender: "Me",
      badge: "Auto Reminder returned",
      body: "Hi Maria, did you get a chance to review the contract that I sent over? Let me know if you wanted to chat through any open details.",
    },
    reply: [
      {
        text: "I wanted to quickly follow up on my previous email. Do you have any open questions about your contract that I can help out with?",
      },
    ],
  },
  scheduling: {
    incoming: {
      sender: "Me",
      body: "Hi Maria, did you get a chance to review the contract that I sent over? Let me know if you wanted to chat through any open details.",
    },
    reply: [
      { text: "Awesome! Let’s set up a meeting to discuss later this week? I’m free " },
      { text: "Thursday at 2PM", highlight: true },
      { text: " or " },
      { text: "Friday at 10AM", highlight: true },
      { text: " – does either time work for you?" },
    ],
  },
};

/** Auto Reminder radio options. `wait` reads back into the preview banner. */
export const REMINDER_OPTIONS: {
  key: import("./types").ReminderChoice;
  label: string;
  wait: string;
  recommended?: boolean;
}[] = [
  { key: "asap", label: "Next business day", wait: "the next business day" },
  { key: "couple-days", label: "In a couple days", wait: "2 days later", recommended: true },
  { key: "week", label: "Within a week", wait: "in a week" },
];

/** Example prompts shown on the Ask AI screen (also drive the preview answer). */
export const ASK_AI_PROMPTS = [
  "Where is the upcoming offsite?",
  "Summarize each company I’m meeting today.",
  "Schedule a 30-min coffee chat with @Lily and draft a welcome email.",
];

// Tabs + counts shown in the Ask AI preview inbox — mirrors the finished Split
// Inbox state (Important active) so the inbox the user just organized carries
// through. (Figma section node 1762-21338.)
export const ASK_AI_TABS = [
  { label: "Important", count: 9, active: true },
  { label: "Calendar", count: 5 },
  { label: "Jira", count: 5 },
  { label: "Other", count: 11 },
];

// The Important list from Split Inbox, shown dimmed behind the Ask AI panel.
// Mirrors the 9 important mails derived from AUTO_ARCHIVE_MAIL (master order).
export const ASK_AI_MAIL = [
  { sender: "Maria Howard", subject: "Sales Contract", date: "JUN 30" },
  { sender: "Arlene McCoy", subject: "Application for Product Manager position", date: "JUN 30" },
  { sender: "Savannah Nguyen", subject: "ACME <> Hyperfusion Q2 Review", date: "JUN 29" },
  { sender: "Jenny Wilson", subject: "Your Weekly Highlights", date: "JUN 29" },
  { sender: "Kristin Watson", subject: "Final contract signature needed", date: "JUN 25" },
  { sender: "United Airlines", subject: "eTicket Itinerary and Receipt for Confirmation CW…", date: "JUN 24" },
  { sender: "Esther Ruan", subject: "Q3 customer survey results", date: "JUN 23" },
  { sender: "June Chen", subject: "Pre-read: Campaign Narrative", date: "JUN 22" },
  { sender: "Hannah Tremblay", subject: "ACME Pilot", date: "JUN 22" },
];

/** Recommended teammates on the Seats screen. */
// Pool of suggestions — the list always shows the first 4 not-yet-added, so
// picking one pulls the next up from below (the visible count stays at 4).
export const SEATS_PEOPLE = [
  { name: "Gertrude Smith", email: "gertrude@superhuman.com" },
  { name: "Teresa Man", email: "averylongemailaddress@sprh.mn" },
  { name: "Conrad Irwin", email: "conrad@superhuman.com" },
  { name: "Emuye Reynolds", email: "emuye@superhuman.com" },
  { name: "Marcus Chen", email: "marcus@superhuman.com" },
  { name: "Priya Patel", email: "priya@superhuman.com" },
  { name: "Jordan Lee", email: "jordan@superhuman.com" },
  { name: "Sofia Rossi", email: "sofia@superhuman.com" },
];

/** Teammate already on the user's team (the "Your team (1/5)" chip). */
export const SEATS_TEAM = [{ name: "Emily Johnson" }];

export const SPLIT_TABS: SplitTabDefinition[] = [
  {
    key: "important",
    label: "Important",
    description: "Only high-priority emails that need your attention",
    badge: "Default",
    toggleable: false,
  },
  {
    key: "calendar",
    label: "Calendar",
    description: "Your calendar updates and reminders",
    badge: "Top category",
    toggleable: true,
  },
  {
    key: "jira",
    label: "Jira",
    description: "Jira updates and issue activity",
    badge: "Frequent notifications",
    toggleable: true,
  },
  {
    key: "other",
    label: "Other",
    description: "Everything else",
    badge: "Default",
    toggleable: false,
  },
];
