import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

/** Gradient "Default / Top category / Frequent notifications" pill. */
function GradientBadge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center rounded-[2px] px-1.5 py-1 text-[10.67px] font-semibold leading-none text-black/75"
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
 * Card used on the Split Inbox and Auto Draft screens. Toggleable categories
 * show a Switch; fixed ones show only the badge. Hovering applies a consistent
 * lavender tint across all settings cards; `highlighted` forces that tint
 * statically (e.g. a pre-selected default). Pass `onMouseEnter` to drive
 * preview content from the parent on hover.
 */
export function ToggleCard({
  title,
  description,
  badge,
  toggleable = false,
  highlighted = false,
  checked = false,
  onCheckedChange,
  onMouseEnter,
}: {
  title: string;
  description: string;
  badge?: string;
  toggleable?: boolean;
  highlighted?: boolean;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  onMouseEnter?: () => void;
}) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      className={cn(
        "flex w-full items-center gap-2.5 rounded-[6px] border-[0.5px] border-[rgba(236,236,236,0.3)] px-5 py-3.5 transition-all duration-300",
        highlighted
          ? "bg-[rgba(174,177,221,0.1)] shadow-[0px_2px_8px_rgba(0,0,0,0.12)]"
          : "bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.12)] hover:bg-[rgba(174,177,221,0.1)] hover:shadow-[0px_2px_8px_rgba(0,0,0,0.12)]",
      )}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-[5px] text-[14px]">
        <span className="leading-normal text-black">{title}</span>
        <span className="leading-normal text-ink-subdued">{description}</span>
      </div>
      {badge && <GradientBadge>{badge}</GradientBadge>}
      {toggleable && (
        <Switch
          checked={checked}
          onCheckedChange={onCheckedChange}
          aria-label={`Enable ${title}`}
          className="data-[state=checked]:bg-label-social"
        />
      )}
    </div>
  );
}
