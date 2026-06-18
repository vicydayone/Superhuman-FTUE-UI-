import type { AutoArchiveMail, AutoDraftDemo, MailLabel, SplitMail } from "./types";

// ─────────────────────────────────────────────────────────────────────────────
// Auto Archive dataset (Figma section "chapter 2", frames "all toggle off/on")
//
// 33 messages. 14 carry an auto-label (marketing 3 · news 5 · pitch 4 · social 2);
// the other 19 are unlabelled. Each label toggle archives its mail:
//   • all off            → Inbox 33 · Auto Archive 0
//   • marketing (default) → Inbox 30 · Auto Archive 3
//   • all on             → Inbox 19 · Auto Archive 14
// ─────────────────────────────────────────────────────────────────────────────
export const AUTO_ARCHIVE_MAIL: AutoArchiveMail[] = [
  // 30 JUN
  { sender: "Arlene McCoy", subject: "Application for Product Manager position", date: "JUN 30" },
  { sender: "Savannah Nguyen", subject: "ACME <> Hyperfusion Q2 Review", date: "JUN 30" },
  { sender: "CodeGenius", subject: "Check out your new offer!", date: "JUN 30", label: "marketing" },
  { sender: "TechCrunch", subject: "OpenAI’s new model beats benchmarks across coding, math, and reasoning", date: "JUN 30", label: "news" },
  // 29 JUN
  { sender: "Jenny Wilson", subject: "Your Weekly Highlights", date: "JUN 29" },
  { sender: "Daniel Foster", subject: "Let’s Elevate Your Brand Today!", date: "JUN 29", label: "marketing" },
  { sender: "LinkedIn", subject: "This week in tech – March edition", date: "JUN 29", label: "social" },
  { sender: "Arlene McCoy", subject: "Invitation: Q3 Planning Kickoff @ Fri Jun 19, 2026 10am – 11am…", date: "JUN 29" },
  { sender: "CodeSprint", subject: "Mobile Development Partnership", date: "JUN 29", label: "pitch" },
  // 28 JUN
  { sender: "Kristin Watson", subject: "Final contract signature needed", date: "JUN 28" },
  { sender: "LinkedIn", subject: "Your Weekly Highlights", date: "JUN 28", label: "social" },
  { sender: "Jira", subject: "[JIRA] Petra Vanlund mentioned you on ITHO-91034", date: "JUN 28" },
  // 27 JUN
  { sender: "TechCrunch", subject: "Stripe launches new API for embedded financial products", date: "JUN 27", label: "news" },
  { sender: "Eleanor Bell", subject: "New product launch: GPT for Business Decisions", date: "JUN 27", label: "pitch" },
  { sender: "Maria Howard", subject: "Tentatively Accepted: Product Roadmap Review @ Mon Jun 22, 2026 3pm…", date: "JUN 27" },
  // 26 JUN
  { sender: "Maria Howard", subject: "Sales Contract", date: "JUN 26" },
  { sender: "Lina Morales", subject: "Scale Smarter", date: "JUN 26", label: "pitch" },
  // 25 JUN
  { sender: "United Airlines", subject: "eTicket Itinerary and Receipt for Confirmation CW…", date: "JUN 25" },
  { sender: "Jira", subject: "ITHO-76201 VPN Access Request for New Hire", date: "JUN 25" },
  // 24 JUN
  { sender: "Esther Ruan", subject: "Q3 customer survey results", date: "JUN 24" },
  { sender: "Jenny Wilson", subject: "Updated invitation: Weekly: Team Standup @ Daily from…", date: "JUN 24" },
  // 23 JUN
  { sender: "Medium", subject: "The hidden cost of always-on work culture", date: "JUN 23", label: "news" },
  { sender: "June Chen", subject: "Pre-read: Campaign Narrative", date: "JUN 23" },
  { sender: "Jira", subject: "ITHO-55839 Slack Notifications Not Syncing", date: "JUN 23" },
  // 22 JUN
  { sender: "Hannah Tremblay", subject: "ACME Pilot", date: "JUN 22" },
  { sender: "Savannah Nguyen", subject: "Updated invitation: [Optional] Design Sync @ Weekly from…", date: "JUN 22" },
  // 21 JUN
  { sender: "Alex Martinez", subject: "Supercharge Your Sales", date: "JUN 21", label: "pitch" },
  { sender: "Jira", subject: "ITHO-84512 Password Reset Loop on Login Page", date: "JUN 21" },
  // 20 JUN
  { sender: "New York Times", subject: "Breaking News: Federal Reserve holds interest rates steady for third straight meeting", date: "JUN 20", label: "news" },
  { sender: "Kristin Watson", subject: "Declined: Q3 Planning Kickoff @ Fri Jun 19, 2026 10am – 11am…", date: "JUN 20" },
  // 19 JUN
  { sender: "Morning Brew", subject: "MARKETS: Dow drops 300 points + What’s driving the selloff", date: "JUN 19", label: "news" },
  { sender: "Jira", subject: "[JIRA] Tomás Eriksen mentioned you on ITHO-62477", date: "JUN 19" },
  // 18 JUN
  { sender: "FlowSync", subject: "Unlock Your Next Growth Phase", date: "JUN 18", label: "marketing" },
];

/** Labels surfaced on the "Keep it clean" card. */
export const ARCHIVED_LABELS: MailLabel[] = ["marketing", "news", "pitch", "social"];

export const isArchived = (mail: AutoArchiveMail): boolean => mail.label !== undefined;

// ─────────────────────────────────────────────────────────────────────────────
// Split Inbox dataset (Figma section "chapter 2": splits / calendar / jira / other)
//
// 27 messages across 4 categories → Important 9 · Calendar 5 · Jira 4 · Other 9.
// Calendar & Jira are toggleable: turning one off hides its tab and folds that
// mail back into Important (e.g. Calendar off → Important 14; both off → 18).
// "Other" holds the promotional/labelled mail and is always shown. (The Figma
// "other" frame draws 7 of the 9; CodeSprint + Medium fill it to the count of 9.)
// ─────────────────────────────────────────────────────────────────────────────
export const SPLIT_MAIL: SplitMail[] = [
  // Important, Calendar and Jira are interleaved so the split animation
  // scatters mails from across the list rather than only the bottom.
  { sender: "Arlene McCoy", subject: "Application for Product Manager position", date: "JUN 30", category: "important" },
  { sender: "Savannah Nguyen", subject: "ACME <> Hyperfusion Q2 Review", date: "JUN 29", category: "important" },
  { sender: "Arlene McCoy", subject: "Invitation: Q3 Planning Kickoff @ Fri Jun 19, 2026 10am – 11am…", date: "JUN 18", category: "calendar" },
  { sender: "Jenny Wilson", subject: "Your Weekly Highlights", date: "JUN 29", category: "important" },
  { sender: "Jira", subject: "[JIRA] Petra Vanlund mentioned you on ITHO-91034", date: "JUN 21", category: "jira" },
  { sender: "Kristin Watson", subject: "Final contract signature needed", date: "JUN 25", category: "important" },
  { sender: "Maria Howard", subject: "Tentatively Accepted: Product Roadmap Review @ Mon Jun 22, 2026 3pm…", date: "JUN 18", category: "calendar" },
  { sender: "Maria Howard", subject: "Sales Contract", date: "JUN 25", category: "important" },
  { sender: "Jira", subject: "ITHO-76201 VPN Access Request for New Hire", date: "JUN 20", category: "jira" },
  { sender: "United Airlines", subject: "eTicket Itinerary and Receipt for Confirmation CW…", date: "JUN 24", category: "important" },
  { sender: "Jenny Wilson", subject: "Updated invitation: Weekly: Team Standup @ Daily from…", date: "JUN 17", category: "calendar" },
  { sender: "Esther Ruan", subject: "Q3 customer survey results", date: "JUN 23", category: "important" },
  { sender: "Jira", subject: "ITHO-55839 Slack Notifications Not Syncing", date: "JUN 19", category: "jira" },
  { sender: "June Chen", subject: "Pre-read: Campaign Narrative", date: "JUN 22", category: "important" },
  { sender: "Savannah Nguyen", subject: "Updated invitation: [Optional] Design Sync @ Weekly from…", date: "JUN 17", category: "calendar" },
  { sender: "Hannah Tremblay", subject: "ACME Pilot", date: "JUN 22", category: "important" },
  { sender: "Kristin Watson", subject: "Declined: Q3 Planning Kickoff @ Fri Jun 19, 2026 10am – 11am…", date: "JUN 16", category: "calendar" },
  { sender: "Jira", subject: "[JIRA] Tomás Eriksen mentioned you on ITHO-62477", date: "JUN 19", category: "jira" },
  // Other (9 — promotional/labelled mail)
  { sender: "CodeGenius", subject: "Check out your new offer!", date: "JUN 30", category: "other", label: "marketing" },
  { sender: "CodeSprint", subject: "Mobile Development Partnership", date: "JUN 29", category: "other", label: "pitch" },
  { sender: "Daniel Foster", subject: "Let’s Elevate Your Brand Today!", date: "JUN 29", category: "other", label: "marketing" },
  { sender: "LinkedIn", subject: "This week in tech – March edition", date: "JUN 29", category: "other", label: "social" },
  { sender: "TechCrunch", subject: "Stripe launches new API for embedded financial products", date: "JUN 27", category: "other", label: "news" },
  { sender: "Eleanor Bell", subject: "New product launch: GPT for Business Decisions", date: "JUN 26", category: "other", label: "pitch" },
  { sender: "FlowSync", subject: "Unlock Your Next Growth Phase", date: "JUN 24", category: "other", label: "marketing" },
  { sender: "Medium", subject: "The hidden cost of always-on work culture", date: "JUN 23", category: "other", label: "news" },
  { sender: "Alex Martinez", subject: "Supercharge Your Sales", date: "JUN 22", category: "other", label: "pitch" },
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
  { key: "asap", label: "As soon as possible", wait: "1 day later" },
  { key: "couple-days", label: "2 days later", wait: "2 days later", recommended: true },
  { key: "week", label: "Within a week", wait: "5 days later" },
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
  { label: "Jira", count: 4 },
  { label: "Other", count: 9 },
];

// The Important list from Split Inbox, shown dimmed behind the Ask AI panel.
export const ASK_AI_MAIL = [
  { sender: "Arlene McCoy", subject: "Application for Product Manager position", date: "JUN 30" },
  { sender: "Savannah Nguyen", subject: "ACME <> Hyperfusion Q2 Review", date: "JUN 29" },
  { sender: "Jenny Wilson", subject: "Your Weekly Highlights", date: "JUN 29" },
  { sender: "Kristin Watson", subject: "Final contract signature needed", date: "JUN 25" },
  { sender: "Maria Howard", subject: "Sales Contract", date: "JUN 25" },
  { sender: "United Airlines", subject: "eTicket Itinerary and Receipt for Confirmation CW…", date: "JUN 24" },
  { sender: "Esther Ruan", subject: "Q3 customer survey results", date: "JUN 23" },
  { sender: "June Chen", subject: "Pre-read: Campaign Narrative", date: "JUN 22" },
  { sender: "Hannah Tremblay", subject: "ACME Pilot", date: "JUN 22" },
];

/** Recommended teammates on the Seats screen. */
export const SEATS_PEOPLE = [
  { name: "Gertrude Smith", email: "gertrude@superhuman.com" },
  { name: "Teresa Man", email: "averylongemailaddress@sprh.mn" },
  { name: "Conrad Irwin", email: "conrad@superhuman.com" },
  { name: "Emuye Reynolds", email: "emuye@superhuman.com" },
  { name: "Teresa Man", email: "averylongemailaddress@sprh.mn" },
  { name: "Gertrude Smith", email: "gertrude@superhuman.com" },
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
