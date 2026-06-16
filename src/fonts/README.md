# Fonts

The design uses two proprietary typefaces:

- **Adelle Sans** — headings & body (`--font-sans`) — ✅ installed
  (`AdelleSans-Regular.otf`, `AdelleSans-SemiBold.otf`, `AdelleSansBold.otf`),
  wired up via `next/font/local` in `src/app/layout.tsx`.
- **SF Pro Text** — the inbox preview UI (`--font-ui`) — not bundled. Currently
  falls back to the system San-Francisco stack (and Adelle Sans elsewhere).

## Adding SF Pro Text

1. Drop the files in here, e.g. `SFProText-Regular.otf`, `SFProText-Bold.otf`.
2. In `src/app/layout.tsx`, add a second `localFont({ variable: "--font-sf-pro", … })`
   and append its `.variable` to the `<html>` `className`.

`globals.css` already maps `--font-sf-pro` → `--font-ui`, so the inbox UI picks
it up automatically once the variable is present.
