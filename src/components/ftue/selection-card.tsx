import { cn } from "@/lib/utils";

/** Gradient pill (shared with the toggle cards) — e.g. the "Recommended" tag. */
function GradientBadge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex shrink-0 items-center rounded-[2px] px-1.5 py-1 text-[10.67px] font-semibold leading-none text-black/75"
      style={{
        backgroundImage:
          "linear-gradient(-82deg, rgb(217, 227, 255) 0%, rgb(255, 232, 255) 100%)",
      }}
    >
      {children}
    </span>
  );
}

/**
 * Radio-style selectable card used on the Auto Archive and Auto Reminder
 * screens. The whole card is the click target; selection shows a filled cobalt
 * radio. `description` is optional (Auto Reminder rows are title-only) and an
 * optional `badge` sits before the radio (e.g. "Recommended").
 */
export function SelectionCard({
  title,
  description,
  badge,
  selected,
  onSelect,
  onHover,
  children,
}: {
  title: string;
  description?: string;
  badge?: string;
  selected: boolean;
  onSelect: () => void;
  onHover?: () => void;
  children?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      onMouseEnter={onHover}
      className={cn(
        "flex w-full items-center gap-2.5 rounded-[6px] border-[0.5px] border-[rgba(236,236,236,0.3)] px-5 py-3.5 text-left transition-all duration-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
        selected
          ? "bg-[rgba(174,177,221,0.1)] shadow-[0px_2px_8px_rgba(0,0,0,0.12)]"
          : "bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.12)] hover:bg-[rgba(174,177,221,0.1)] hover:shadow-[0px_2px_8px_rgba(0,0,0,0.12)]",
      )}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-[5px] text-[14px]">
        <span className="leading-normal text-black">{title}</span>
        {description && (
          <span className="leading-normal text-ink-subdued">{description}</span>
        )}
        {children}
      </div>
      {badge && <GradientBadge>{badge}</GradientBadge>}
      <span
        aria-hidden
        className={cn(
          "relative size-[18px] shrink-0 rounded-full border-[1.4px] border-label-social",
          "after:absolute after:inset-[1.2px] after:rounded-full after:bg-label-social after:transition-opacity",
          selected ? "after:opacity-100" : "after:opacity-0",
        )}
      />
    </button>
  );
}
