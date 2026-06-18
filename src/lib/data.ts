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
  { sender: "Arlene McCoy", subject: "Application for Product Manager position", date: "30 JUN" },
  { sender: "Savannah Nguyen", subject: "ACME <> Hyperfusion Q2 Review", date: "30 JUN" },
  { sender: "TechCrunch", subject: "OpenAI’s new model beats benchmarks across coding, math, and reasoning", date: "30 JUN", label: "news" },
  // 29 JUN
  { sender: "Jenny Wilson", subject: "Your Weekly Highlights", date: "29 JUN" },
  { sender: "Arlene McCoy", subject: "Invitation: Q3 Planning Kickoff @ Fri Jun 19, 2026 10am – 11am…", date: "29 JUN" },
  { sender: "CodeSprint", subject: "Mobile Development Partnership", date: "29 JUN", label: "pitch" },
  // 28 JUN
  { sender: "Kristin Watson", subject: "Final contract signature needed", date: "28 JUN" },
  { sender: "Jira", subject: "[JIRA] Petra Vanlund mentioned you on ITHO-91034", date: "28 JUN" },
  { sender: "TechCrunch", subject: "Stripe launches new API for embedded financial products", date: "27 JUN", label: "news" },
  // 27 JUN
  { sender: "Eleanor Bell", subject: "New product launch: GPT for Business Decisions", date: "27 JUN", label: "pitch" },
  { sender: "Maria Howard", subject: "Tentatively Accepted: Product Roadmap Review @ Mon Jun 22, 2026 3pm…", date: "27 JUN" },
  // 26 JUN
  { sender: "Maria Howard", subject: "Sales Contract", date: "26 JUN" },
  { sender: "Lina Morales", subject: "Scale Smarter", date: "26 JUN", label: "pitch" },
  // 25 JUN
  { sender: "Daniel Foster", subject: "Let’s Elevate Your Brand Today!", date: "25 JUN", label: "marketing" },
  { sender: "United Airlines", subject: "eTicket Itinerary and Receipt for Confirmation CW…", date: "25 JUN" },
  { sender: "Jira", subject: "ITHO-76201 VPN Access Request for New Hire", date: "25 JUN" },
  // 24 JUN
  { sender: "LinkedIn", subject: "This week in tech – March edition", date: "24 JUN", label: "social" },
  { sender: "Esther Ruan", subject: "Q3 customer survey results", date: "24 JUN" },
  { sender: "Jenny Wilson", subject: "Updated invitation: Weekly: Team Standup @ Daily from…", date: "24 JUN" },
  // 23 JUN
  { sender: "Medium", subject: "The hidden cost of always-on work culture", date: "23 JUN", label: "news" },
  { sender: "June Chen", subject: "Pre-read: Campaign Narrative", date: "23 JUN" },
  { sender: "Jira", subject: "ITHO-55839 Slack Notifications Not Syncing", date: "23 JUN" },
  // 22 JUN
  { sender: "LinkedIn", subject: "Your Weekly Highlights", date: "22 JUN", label: "social" },
  { sender: "Hannah Tremblay", subject: "ACME Pilot", date: "22 JUN" },
  { sender: "Savannah Nguyen", subject: "Updated invitation: [Optional] Design Sync @ Weekly from…", date: "22 JUN" },
  // 21 JUN
  { sender: "Alex Martinez", subject: "Supercharge Your Sales", date: "21 JUN", label: "pitch" },
  { sender: "Jira", subject: "ITHO-84512 Password Reset Loop on Login Page", date: "21 JUN" },
  // 20 JUN
  { sender: "New York Times", subject: "Breaking News: Federal Reserve holds interest rates steady for third straight meeting", date: "20 JUN", label: "news" },
  { sender: "Kristin Watson", subject: "Declined: Q3 Planning Kickoff @ Fri Jun 19, 2026 10am – 11am…", date: "20 JUN" },
  // 19 JUN
  { sender: "Morning Brew", subject: "MARKETS: Dow drops 300 points + What’s driving the selloff", date: "19 JUN", label: "news" },
  { sender: "Jira", subject: "[JIRA] Tomás Eriksen mentioned you on ITHO-62477", date: "19 JUN" },
  // 18 JUN
  { sender: "FlowSync", subject: "Unlock Your Next Growth Phase", date: "18 JUN", label: "marketing" },
  // 17 JUN
  { sender: "CodeGenius", subject: "Check out your new offer!", date: "17 JUN", label: "marketing" },
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
  { sender: "Arlene McCoy", subject: "Application for Product Manager position", date: "30 JUN", category: "important" },
  { sender: "Savannah Nguyen", subject: "ACME <> Hyperfusion Q2 Review", date: "29 JUN", category: "important" },
  { sender: "Arlene McCoy", subject: "Invitation: Q3 Planning Kickoff @ Fri Jun 19, 2026 10am – 11am…", date: "18 JUN", category: "calendar" },
  { sender: "Jenny Wilson", subject: "Your Weekly Highlights", date: "29 JUN", category: "important" },
  { sender: "Jira", subject: "[JIRA] Petra Vanlund mentioned you on ITHO-91034", date: "21 JUN", category: "jira" },
  { sender: "Kristin Watson", subject: "Final contract signature needed", date: "25 JUN", category: "important" },
  { sender: "Maria Howard", subject: "Tentatively Accepted: Product Roadmap Review @ Mon Jun 22, 2026 3pm…", date: "18 JUN", category: "calendar" },
  { sender: "Maria Howard", subject: "Sales Contract", date: "25 JUN", category: "important" },
  { sender: "Jira", subject: "ITHO-76201 VPN Access Request for New Hire", date: "20 JUN", category: "jira" },
  { sender: "United Airlines", subject: "eTicket Itinerary and Receipt for Confirmation CW…", date: "24 JUN", category: "important" },
  { sender: "Jenny Wilson", subject: "Updated invitation: Weekly: Team Standup @ Daily from…", date: "17 JUN", category: "calendar" },
  { sender: "Esther Ruan", subject: "Q3 customer survey results", date: "23 JUN", category: "important" },
  { sender: "Jira", subject: "ITHO-55839 Slack Notifications Not Syncing", date: "19 JUN", category: "jira" },
  { sender: "June Chen", subject: "Pre-read: Campaign Narrative", date: "22 JUN", category: "important" },
  { sender: "Savannah Nguyen", subject: "Updated invitation: [Optional] Design Sync @ Weekly from…", date: "17 JUN", category: "calendar" },
  { sender: "Hannah Tremblay", subject: "ACME Pilot", date: "22 JUN", category: "important" },
  { sender: "Kristin Watson", subject: "Declined: Q3 Planning Kickoff @ Fri Jun 19, 2026 10am – 11am…", date: "16 JUN", category: "calendar" },
  { sender: "Jira", subject: "[JIRA] Tomás Eriksen mentioned you on ITHO-62477", date: "19 JUN", category: "jira" },
  // Other (9 — promotional/labelled mail)
  { sender: "CodeGenius", subject: "Check out your new offer!", date: "30 JUN", category: "other", label: "marketing" },
  { sender: "CodeSprint", subject: "Mobile Development Partnership", date: "29 JUN", category: "other", label: "pitch" },
  { sender: "Daniel Foster", subject: "Let’s Elevate Your Brand Today!", date: "29 JUN", category: "other", label: "marketing" },
  { sender: "LinkedIn", subject: "This week in tech – March edition", date: "29 JUN", category: "other", label: "social" },
  { sender: "TechCrunch", subject: "Stripe launches new API for embedded financial products", date: "27 JUN", category: "other", label: "news" },
  { sender: "Eleanor Bell", subject: "New product launch: GPT for Business Decisions", date: "26 JUN", category: "other", label: "pitch" },
  { sender: "FlowSync", subject: "Unlock Your Next Growth Phase", date: "24 JUN", category: "other", label: "marketing" },
  { sender: "Medium", subject: "The hidden cost of always-on work culture", date: "23 JUN", category: "other", label: "news" },
  { sender: "Alex Martinez", subject: "Supercharge Your Sales", date: "22 JUN", category: "other", label: "pitch" },
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
  { sender: "Arlene McCoy", subject: "Application for Product Manager position", date: "30 JUN" },
  { sender: "Savannah Nguyen", subject: "ACME <> Hyperfusion Q2 Review", date: "29 JUN" },
  { sender: "Jenny Wilson", subject: "Your Weekly Highlights", date: "29 JUN" },
  { sender: "Kristin Watson", subject: "Final contract signature needed", date: "25 JUN" },
  { sender: "Maria Howard", subject: "Sales Contract", date: "25 JUN" },
  { sender: "United Airlines", subject: "eTicket Itinerary and Receipt for Confirmation CW…", date: "24 JUN" },
  { sender: "Esther Ruan", subject: "Q3 customer survey results", date: "23 JUN" },
  { sender: "June Chen", subject: "Pre-read: Campaign Narrative", date: "22 JUN" },
  { sender: "Hannah Tremblay", subject: "ACME Pilot", date: "22 JUN" },
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
