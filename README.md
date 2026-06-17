# Superhuman FTUE Prototype — "Organize your Inbox"

An interactive Next.js + shadcn/ui prototype of Chapter 2 of the Superhuman
first-time-user-experience, implemented from
[Figma](https://www.figma.com/design/R6gSyamiEGSG5c3Gz2uXT3/FTUE---End-to-End-Vision?node-id=1659-8526).

## The flow

1. **Intro** — "Connected. Now we make it yours." A pastel-gradient transition
   with a spinner and a checklist that fills in, then auto-advances.
2. **Auto Archive** — choose **Show everything** vs **Keep it clean**. The inbox
   preview reacts live: "Keep it clean" routes labelled mail
   (marketing / news / pitch / social) into an **Auto Archive** folder.
3. **Split Inbox** — toggle **Calendar** and **Jira** splits. The preview's tabs
   and counts update live; turning a split off folds its mail back into the
   Important view.

A top stepper tracks progress: *Connect your account ✓ → Organize your Inbox →
Accelerate your workflow*.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000 — designed at 1440×900
npm run build    # production build
```

## Project structure

```
src/
  app/
    layout.tsx            # Adelle Sans (next/font/local) + metadata
    globals.css           # Tailwind v4 @theme tokens, gradients, fonts
    page.tsx              # flow controller (step + selection state)
  components/ftue/        # stepper, screens, cards, inbox-preview, …
  components/ui/          # shadcn/ui primitives
  lib/
    data.ts               # mock email datasets (Auto Archive + Split Inbox)
    types.ts              # shared types
  fonts/                  # Adelle Sans (.otf) — see fonts/README.md
```

## Notes

- **Fonts**: Adelle Sans is installed for headings/body. SF Pro Text (the inbox
  UI font in Figma) is proprietary and not bundled — it falls back to the system
  San-Francisco stack. See [`src/fonts/README.md`](src/fonts/README.md) to add it.
- **Design tokens** (lavender `#aeb1dd`, label-chip pastels, text colors) live as
  CSS variables in `globals.css` and override shadcn's `--primary`.
- Mock email counts are computed from the datasets so toggling is internally
  consistent; they track the Figma frames' numbers closely.
