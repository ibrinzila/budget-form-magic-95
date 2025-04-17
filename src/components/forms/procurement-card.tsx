
import { ProcurementForm } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { ThresholdBadge } from "@/components/ui/threshold-badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/formatters";
import { projects } from "@/data/mockData";
import { Link } from "react-router-dom";

interface ProcurementCardProps {
  form: ProcurementForm;
}

export function ProcurementCard({ form }: ProcurementCardProps) {
  const project = projects.find(p => p.id === form.projectId);
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-medium">{form.title}</CardTitle>
          <StatusBadge status={form.status} />
        </div>
        <p className="text-xs text-muted-foreground">
          {project?.name || "Unknown Project"}
        </p>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm text-muted-foreground">Total Amount:</div>
          <div className="text-md font-semibold">{formatCurrency(form.totalAmount)}</div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-muted-foreground">Created:</div>
          <div className="text-sm">{formatDateString(form.createdAt)}</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">Items:</div>
          <div className="text-sm">{form.items.length}</div>
        </div>
        <div className="mt-4">
          <ThresholdBadge amount={form.totalAmount} className="w-full justify-center" />
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <div className="flex justify-between w-full">
          <Link to={`/forms/${form.id}`}>
            <Button variant="outline" size="sm">View Details</Button>
          </Link>
          {form.status === 'pending' && (
            <Button variant="default" size="sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                <polyline points="22 12 18 8 14 12" />
                <path d="M18 8v5.5a2.5 2.5 0 0 1-5 0V8" />
                <path d="M2 12h10" />
              </svg>
              Approve
            </Button>
          )}
          {form.status === 'draft' && (
            <Button variant="default" size="sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Edit
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}

function formatDateString(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
