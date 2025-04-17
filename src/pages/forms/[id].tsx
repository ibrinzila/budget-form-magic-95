
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { ThresholdBadge } from "@/components/ui/threshold-badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { procurementForms, projects } from "@/data/mockData";
import { formatCurrency } from "@/lib/formatters";

export default function FormDetailPage() {
  const { id } = useParams();
  const form = procurementForms.find(f => f.id === id);
  const project = projects.find(p => form?.projectId === p.id);

  if (!form) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <h2 className="text-2xl font-semibold mb-2">Form Not Found</h2>
          <p className="text-muted-foreground mb-6">The procurement form you're looking for doesn't exist or has been removed.</p>
          <Link to="/forms">
            <Button>Return to Forms</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">{form.title}</h1>
            <StatusBadge status={form.status} />
          </div>
          <p className="text-muted-foreground mt-1">{form.description}</p>
        </div>
        <div className="flex gap-2">
          {form.status === 'draft' && (
            <Button>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Edit Form
            </Button>
          )}
          {form.status === 'pending' && (
            <Button>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Approve
            </Button>
          )}
        </div>
      </div>

      <div className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Amount</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(form.totalAmount)}</div>
              <div className="mt-1">
                <ThresholdBadge amount={form.totalAmount} />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Associated Project</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-medium">{project?.name || 'Unknown Project'}</div>
              <Link to={`/projects/${form.projectId}`} className="text-sm text-primary hover:underline">
                View Project
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Date Created</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-medium">{formatDateString(form.createdAt)}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {form.status === 'pending' && 'Awaiting approval'}
                {form.status === 'approved' && 'Approved on ' + formatDateString(form.createdAt)}
                {form.status === 'rejected' && 'Rejected on ' + formatDateString(form.createdAt)}
                {form.status === 'draft' && 'Draft form'}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-8">
        <Tabs defaultValue="items">
          <TabsList>
            <TabsTrigger value="items">Items</TabsTrigger>
            <TabsTrigger value="attachments">Attachments</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="items" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Procurement Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-muted">
                      <tr>
                        <th className="px-6 py-3">Description</th>
                        <th className="px-6 py-3 text-right">Quantity</th>
                        <th className="px-6 py-3 text-right">Unit Price</th>
                        <th className="px-6 py-3 text-right">Total Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {form.items.map((item) => (
                        <tr key={item.id} className="border-b">
                          <td className="px-6 py-4 font-medium">{item.description}</td>
                          <td className="px-6 py-4 text-right">{item.quantity}</td>
                          <td className="px-6 py-4 text-right">{formatCurrency(item.unitPrice)}</td>
                          <td className="px-6 py-4 text-right font-medium">{formatCurrency(item.totalPrice)}</td>
                        </tr>
                      ))}
                      <tr className="bg-muted/50">
                        <td colSpan={3} className="px-6 py-4 text-right font-bold">Total:</td>
                        <td className="px-6 py-4 text-right font-bold">{formatCurrency(form.totalAmount)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attachments" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Form Attachments</CardTitle>
              </CardHeader>
              <CardContent>
                {form.attachments.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {form.attachments.map((attachment) => (
                      <div key={attachment.id} className="flex items-center gap-3 p-3 border rounded-md">
                        <div className="h-10 w-10 bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                          {attachment.type === 'pdf' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                              <polyline points="14 2 14 8 20 8" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                              <circle cx="9" cy="9" r="2" />
                              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-grow">
                          <p className="text-sm font-medium truncate">{attachment.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {attachment.processed ? 'Processed by AI' : 'Awaiting processing'}
                          </p>
                        </div>
                        <Button variant="ghost" size="icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" x2="12" y1="15" y2="3" />
                          </svg>
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center py-8">
                    <div className="text-muted-foreground mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                    </div>
                    <p className="text-sm text-muted-foreground">No attachments for this form</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="relative border-l border-muted pl-8 ml-4">
                  <div className="mb-8 relative">
                    <div className="absolute -left-12 mt-1.5 h-6 w-6 rounded-full border bg-background flex items-center justify-center">
                      {form.status === 'approved' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      ) : form.status === 'rejected' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 6 6 18" />
                          <path d="m6 6 12 12" />
                        </svg>
                      ) : form.status === 'pending' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      )}
                    </div>
                    <h3 className="text-base font-medium">
                      {form.status === 'approved' && 'Form Approved'}
                      {form.status === 'rejected' && 'Form Rejected'}
                      {form.status === 'pending' && 'Awaiting Approval'}
                      {form.status === 'draft' && 'Draft Created'}
                    </h3>
                    <time className="text-xs text-muted-foreground mb-1 block">{formatDateString(form.createdAt)}</time>
                    <p className="text-sm">
                      {form.status === 'approved' && 'The procurement form has been approved.'}
                      {form.status === 'rejected' && 'The procurement form has been rejected.'}
                      {form.status === 'pending' && 'The procurement form is awaiting approval.'}
                      {form.status === 'draft' && 'The procurement form is in draft state.'}
                    </p>
                  </div>
                  <div className="absolute -left-8 mt-1.5 h-6 w-6 rounded-full border bg-primary flex items-center justify-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  </div>
                  <div className="mb-1">
                    <h3 className="text-base font-medium">Form Created</h3>
                    <time className="text-xs text-muted-foreground">{formatDateString(form.createdAt)}</time>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}

function formatDateString(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
