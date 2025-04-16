
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: 'draft' | 'pending' | 'approved' | 'rejected' | string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const statusConfig = {
    draft: {
      class: "bg-gray-100 text-gray-800 border-gray-200",
      label: "Draft"
    },
    pending: {
      class: "bg-yellow-100 text-yellow-800 border-yellow-200",
      label: "Pending Approval"
    },
    approved: {
      class: "bg-green-100 text-green-800 border-green-200",
      label: "Approved"
    },
    rejected: {
      class: "bg-red-100 text-red-800 border-red-200",
      label: "Rejected"
    },
    active: {
      class: "bg-blue-100 text-blue-800 border-blue-200",
      label: "Active"
    },
    completed: {
      class: "bg-purple-100 text-purple-800 border-purple-200",
      label: "Completed"
    },
    "on-hold": {
      class: "bg-orange-100 text-orange-800 border-orange-200",
      label: "On Hold"
    }
  };

  const config = statusConfig[status] || statusConfig.draft;

  return (
    <div
      className={cn(
        "px-2 py-1 rounded-md border inline-flex items-center text-xs font-medium",
        config.class,
        className
      )}
    >
      <span>{config.label}</span>
    </div>
  );
}
