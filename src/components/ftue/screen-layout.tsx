import { Stepper } from "./stepper";
import type { FlowStep } from "@/lib/types";

/**
 * Shared chrome for the two interactive screens: top stepper, a content column
 * on the left and the inbox preview on the right. Both columns are transparent
 * so the full-screen background wash (set on the canvas) shows through.
 */
export function ScreenLayout({
  activeStep,
  progress,
  left,
  preview,
  onNavigate,
}: {
  activeStep: 2 | 3 | "done";
  progress: number;
  left: React.ReactNode;
  preview: React.ReactNode;
  onNavigate?: (step: FlowStep) => void;
}) {
  return (
    <div className="relative flex h-full w-full">
      <Stepper
        activeStep={activeStep}
        progress={progress}
        onNavigate={onNavigate}
        className="absolute inset-x-0 top-0 z-10"
      />
      {/* Full-height columns; the absolute stepper overlaps their top edge,
          matching the Figma frame's coordinate system. */}
      <div
        className="flex h-full w-1/2 flex-col justify-between bg-white px-[100px] pb-[30px] pt-[100px]"
        style={{ animation: "screen-enter 380ms ease-out both" }}
      >
        {left}
      </div>
      <div
        className="flex h-full w-1/2 flex-col items-center justify-center px-[100px] pb-[100px] pt-[140px]"
        style={{ animation: "screen-enter 380ms ease-out 60ms both" }}
      >
        {preview}
      </div>
    </div>
  );
}
