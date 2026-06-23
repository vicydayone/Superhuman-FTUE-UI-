import { cn } from "@/lib/utils";
import type { MailLabel } from "@/lib/types";

const LABEL_BG: Record<MailLabel, string> = {
  marketing: "bg-label-marketing",
  news: "bg-label-news",
  pitch: "bg-label-pitch",
  social: "bg-label-social",
};

/** Small colored auto-label pill (marketing / news / pitch / social). */
export function LabelChip({
  label,
  pulse = false,
  className,
}: {
  label: MailLabel;
  /** Briefly grow + brighten (when the matching label card is hovered). */
  pulse?: boolean;
  className?: string;
}) {
  return (
    <span
      style={pulse ? { animation: "tag-pulse 700ms ease-in-out" } : undefined}
      className={cn(
        "inline-flex items-center justify-center rounded-[4px] px-[5px] text-[11px] font-semibold leading-5 tracking-[-0.15px] text-white",
        LABEL_BG[label],
        className,
      )}
    >
      {label}
    </span>
  );
}
