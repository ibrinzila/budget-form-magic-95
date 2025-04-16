
import { THRESHOLD_LEVELS, ThresholdLevel } from "@/types";
import { cn } from "@/lib/utils";

interface ThresholdBadgeProps {
  amount: number;
  className?: string;
}

export function ThresholdBadge({ amount, className }: ThresholdBadgeProps) {
  let threshold: ThresholdLevel;
  if (amount <= THRESHOLD_LEVELS.low) {
    threshold = 'low';
  } else if (amount <= THRESHOLD_LEVELS.medium) {
    threshold = 'medium';
  } else {
    threshold = 'high';
  }

  const thresholdClasses = {
    low: "bg-green-100 text-success border-success/20",
    medium: "bg-yellow-100 text-warning border-warning/20",
    high: "bg-red-100 text-danger border-danger/20"
  };

  const thresholdLabels = {
    low: "Low",
    medium: "Medium",
    high: "High"
  };

  return (
    <div
      className={cn(
        "px-2 py-1 rounded-md border inline-flex items-center text-xs font-medium",
        thresholdClasses[threshold],
        className
      )}
    >
      <span>{thresholdLabels[threshold]} Threshold</span>
    </div>
  );
}
