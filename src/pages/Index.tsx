
import { Layout } from "@/components/layout";
import { DashboardStats } from "@/components/ui/dashboard-stats";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { procurementForms, projects } from "@/data/mockData";
import { StatusBadge } from "@/components/ui/status-badge";
import { ThresholdBadge } from "@/components/ui/threshold-badge";
import { formatCurrency } from "@/lib/formatters";
import { Link } from "react-router-dom";

export default function Index() {
  const pendingApprovals = procurementForms.filter((form) => form.status === 'pending');
  const recentProjects = [...projects].sort((a, b) => 
    new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  ).slice(0, 2);

  return (
    <Layout>
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your procurement management dashboard
        </p>
      </div>

      <div className="mt-6">
        <DashboardStats />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle>Pending Approvals</CardTitle>
              <CardDescription>
                Forms awaiting your approval
              </CardDescription>
            </div>
            <Link to="/approvals">
              <Button variant="ghost" className="text-sm">View all</Button>
            </Link>
          </CardHeader>
          <CardContent>
            {pendingApprovals.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center py-8">
                <div className="text-muted-foreground mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                </div>
                <p className="text-sm text-muted-foreground">No pending approvals</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingApprovals.map((form) => (
                  <div key={form.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div>
                      <div className="font-medium">{form.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {formatCurrency(form.totalAmount)}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ThresholdBadge amount={form.totalAmount} />
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <span className="sr-only">View form</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle>Recent Projects</CardTitle>
              <CardDescription>
                Your newest projects
              </CardDescription>
            </div>
            <Link to="/projects">
              <Button variant="ghost" className="text-sm">View all</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProjects.map((project) => (
                <div key={project.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div>
                    <div className="font-medium">{project.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Budget: {formatCurrency(project.budget)}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <StatusBadge status={project.status} />
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <span className="sr-only">View project</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </Button>
                  </div>
                </div>
              ))}
              <div className="pt-2">
                <Link to="/forms/new">
                  <Button className="w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    New Procurement Form
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
