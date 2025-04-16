
import { Layout } from "@/components/layout";
import { procurementForms } from "@/data/mockData";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { ThresholdBadge } from "@/components/ui/threshold-badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/formatters";

export default function ApprovalsPage() {
  const pendingForms = procurementForms.filter(form => form.status === 'pending');

  return (
    <Layout>
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Approval Requests</h1>
        <p className="text-muted-foreground">Review and manage procurement approval requests.</p>
      </div>

      <div className="mt-8 space-y-6">
        {pendingForms.length === 0 ? (
          <Card className="p-8 text-center">
            <div className="mb-4 text-muted-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-1">No pending approvals</h3>
            <p className="text-muted-foreground mb-4">
              You don't have any procurement forms awaiting your approval.
            </p>
          </Card>
        ) : (
          pendingForms.map((form) => {
            return (
              <Card key={form.id} className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-grow space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-medium">{form.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {form.description}
                        </p>
                      </div>
                      <StatusBadge status={form.status} />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Project</div>
                        <div className="font-medium">
                          Office Renovation
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Requested By</div>
                        <div className="font-medium">John Doe</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Date</div>
                        <div>{form.createdAt}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Amount</div>
                        <div className="font-bold">{formatCurrency(form.totalAmount)}</div>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="text-sm font-medium mb-2">Items ({form.items.length})</div>
                      <div className="space-y-2">
                        {form.items.map((item) => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span>{item.description}</span>
                            <span className="font-medium">{formatCurrency(item.totalPrice)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:border-l md:pl-6 flex flex-col gap-4 md:w-60">
                    <ThresholdBadge amount={form.totalAmount} className="w-full justify-center" />
                    
                    <div className="space-y-2">
                      <Button className="w-full">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        Approve
                      </Button>
                      <Button variant="outline" className="w-full">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                        Reject
                      </Button>
                      <Button variant="ghost" className="w-full">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                          <polyline points="14 2 14 8 20 8" />
                        </svg>
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </Layout>
  );
}
