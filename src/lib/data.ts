import type { AutoArchiveMail, MailLabel, SplitMail } from "./types";

// ─────────────────────────────────────────────────────────────────────────────
// Auto Archive dataset (Figma frame "auto archive - show everything")
//
// 8 labelled (promotional) messages are routed to Auto Archive by "Keep it
// clean"; the 11 unlabelled ones stay in the inbox. → Inbox 11 · Auto Archive 8.
// ─────────────────────────────────────────────────────────────────────────────
export const AUTO_ARCHIVE_MAIL: AutoArchiveMail[] = [
  { sender: "LinkedIn", subject: "You have 3 new connection requests", date: "30 MAR", label: "social" },
  { sender: "Anna Williams", subject: "Re: Project handover next week", date: "30 MAR" },
  { sender: "Morning Brew", subject: "5 stories you shouldn't miss today", date: "29 MAR", label: "news" },
  { sender: "Creative Agency", subject: "We help brands like yours grow faster", date: "29 MAR", label: "pitch" },
  { sender: "IT Support", subject: "Your VPN access has been renewed", date: "28 MAR" },
  { sender: "Shopify", subject: "Don't miss our summer deals", date: "28 MAR", label: "marketing" },
  { sender: "TechCrunch", subject: "This week in tech – March edition", date: "27 MAR", label: "news" },
  { sender: "Team Lead", subject: "Can you take a look at the Q2 report?", date: "27 MAR" },
  { sender: "GrowthLab", subject: "Just checking in", date: "27 MAR", label: "pitch" },
  { sender: "Twitter / X", subject: "Your post reached 2,400 impressions", date: "26 MAR", label: "social" },
  { sender: "Sarah Chen", subject: "Offsite Information for June", date: "26 MAR" },
  { sender: "Mailchimp", subject: "Your June campaign is live", date: "26 MAR", label: "marketing" },
  { sender: "Product Development", subject: "Prototype Testing Phase Begins", date: "27 MAR" },
  { sender: "Corporate Communications", subject: "Annual Report Draft Ready for Review", date: "26 MAR" },
  { sender: "Customer Service", subject: "New Chatbot Deployment", date: "26 MAR" },
  { sender: "Calendly", subject: "Reminder: Call with Felix tomorrow at 10:00", date: "26 MAR" },
  { sender: "Finance", subject: "Q2 expense report due Friday", date: "25 MAR" },
  { sender: "HR", subject: "Open enrollment starts Monday", date: "25 MAR" },
  { sender: "Notion", subject: "Your workspace was updated", date: "24 MAR" },
];

/** Labels surfaced on the "Keep it clean" card. */
export const ARCHIVED_LABELS: MailLabel[] = ["marketing", "news", "pitch", "social"];

export const isArchived = (mail: AutoArchiveMail): boolean => mail.label !== undefined;

// ─────────────────────────────────────────────────────────────────────────────
// Split Inbox dataset (Figma frames "split inbox - toggle on/off")
//
// 19 messages across 4 categories → Important 6 · Calendar 4 · Jira 3 · Other 6.
// Turning a split off folds that category back into the main (Important) view.
// ─────────────────────────────────────────────────────────────────────────────
export const SPLIT_MAIL: SplitMail[] = [
  { sender: "Anna Williams", subject: "Re: Project handover next week", date: "30 MAR", category: "important" },
  { sender: "IT Support", subject: "Your VPN access has been renewed", date: "28 MAR", category: "important" },
  { sender: "Team Lead", subject: "Can you take a look at the Q2 report?", date: "27 MAR", category: "important" },
  { sender: "Calendly", subject: "Reminder: Call with Felix tomorrow at 10:00", date: "26 MAR", category: "calendar" },
  { sender: "Jira", subject: "[PROJ-412] Bug assigned to you: Nav breaks on mobile", date: "26 MAR", category: "jira" },
  { sender: "Google Calendar", subject: "Reminder: Design Review tomorrow at 2:00 PM", date: "26 MAR", category: "calendar" },
  { sender: "Sarah Chen", subject: "Offsite Information for June", date: "26 MAR", category: "important" },
  { sender: "Product Development", subject: "Prototype Testing Phase Begins", date: "25 MAR", category: "important" },
  { sender: "Slack", subject: "You were mentioned in #design-feedback", date: "25 MAR", category: "other" },
  { sender: "GitHub", subject: "Pull request #88 is ready for your review", date: "25 MAR", category: "other" },
  { sender: "Jira", subject: "Sprint 24 starts today – 6 issues in your backlog", date: "24 MAR", category: "jira" },
  { sender: "Lucas Becker", subject: "Call tomorrow", date: "24 MAR", category: "important" },
  { sender: "Google Calendar", subject: "Reminder: Project Handover at 10:00 AM", date: "23 MAR", category: "calendar" },
  { sender: "Calendly", subject: "Reminder: 1:1 with Maria at 3:00 PM", date: "23 MAR", category: "calendar" },
  { sender: "Jira", subject: "[PROJ-389] Code review requested", date: "23 MAR", category: "jira" },
  { sender: "Notion", subject: "New comment on your roadmap page", date: "25 MAR", category: "other" },
  { sender: "Figma", subject: "Lucas shared a file with you", date: "24 MAR", category: "other" },
  { sender: "Zoom", subject: "Your meeting recording is ready", date: "24 MAR", category: "other" },
  { sender: "Linear", subject: "3 issues updated in your project", date: "23 MAR", category: "other" },
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

/** Auto Reminder radio options. `wait` reads back into the preview banner. */
export const REMINDER_OPTIONS: {
  key: import("./types").ReminderChoice;
  label: string;
  wait: string;
  recommended?: boolean;
}[] = [
  { key: "asap", label: "As soon as possible", wait: "1 day later" },
  { key: "couple-days", label: "Within a couple days", wait: "2 days later", recommended: true },
  { key: "week", label: "Within a week", wait: "1 week later" },
];

/** Example prompts shown on the Ask AI screen. */
export const ASK_AI_PROMPTS = [
  "Where is the upcoming offsite?",
  "Summarize each company I'm meeting today.",
  "Schedule a 30-min coffee chat with @Lily and draft a welcome email.",
];

/** Tabs + counts shown in the Ask AI preview inbox (static illustration). */
export const ASK_AI_TABS = [
  { label: "Important", count: 8, active: true },
  { label: "Calendar", count: 12 },
  { label: "Jira", count: 7 },
  { label: "News", count: 18 },
  { label: "Other", count: 11 },
];

export const ASK_AI_MAIL = [
  { sender: "Anna Williams", subject: "Re: Project handover next week", date: "30 MAR" },
  { sender: "IT Support", subject: "Your VPN access has been renewed", date: "28 MAR" },
  { sender: "Team Lead", subject: "Can you take a look at the Q2 report?", date: "27 MAR" },
  { sender: "Sarah Chen", subject: "Offsite Information for June", date: "26 MAR" },
  { sender: "Product Development", subject: "Prototype Testing Phase Begins", date: "25 MAR" },
  { sender: "Lucas Becker", subject: "Call tomorrow", date: "24 MAR" },
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
