import { cn } from "@/lib/utils";

/** Primary CONTINUE CTA — lavender fill, 2px radius, per Figma button spec. */
export function ContinueButton({
  onClick,
  children = "CONTINUE",
  className,
}: {
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-[2px] bg-primary px-3 pb-[7px] pt-[9px] text-[14px] font-semibold leading-4 text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
        className,
      )}
    >
      {children}
    </button>
  );
}
