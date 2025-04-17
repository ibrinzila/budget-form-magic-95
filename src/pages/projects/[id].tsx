
import { useParams } from "react-router-dom";
import { Layout } from "@/components/layout";
import { projects, procurementForms } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatusBadge } from "@/components/ui/status-badge";
import { ProcurementCard } from "@/components/forms/procurement-card";
import { formatCurrency } from "@/lib/formatters";
import { ChartContainer } from "@/components/ui/chart";
import * as RechartsPrimitive from "recharts";
import { Link } from "react-router-dom";

export default function ProjectDetailPage() {
  const { id } = useParams();
  const project = projects.find(p => p.id === id);
  const projectForms = procurementForms.filter(form => form.projectId === id);
  
  if (!project) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <h2 className="text-2xl font-semibold mb-2">Project Not Found</h2>
          <p className="text-muted-foreground mb-6">The project you're looking for doesn't exist or has been removed.</p>
          <Link to="/projects">
            <Button>Return to Projects</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  // Calculate project metrics
  const totalSpent = projectForms
    .filter(form => form.status === 'approved')
    .reduce((sum, form) => sum + form.totalAmount, 0);
  
  const pendingAmount = projectForms
    .filter(form => form.status === 'pending')
    .reduce((sum, form) => sum + form.totalAmount, 0);
  
  const budgetRemaining = project.budget - totalSpent;
  const budgetUsedPercentage = Math.round((totalSpent / project.budget) * 100);

  return (
    <Layout>
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
            <StatusBadge status={project.status} />
          </div>
          <p className="text-muted-foreground mt-1">{project.description}</p>
        </div>
        <Link to="/forms/new">
          <Button>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="12" y1="18" x2="12" y2="12" />
              <line x1="9" y1="15" x2="15" y2="15" />
            </svg>
            New Procurement Form
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(project.budget)}</div>
            <p className="text-xs text-muted-foreground mt-1">Total project budget</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalSpent)}</div>
            <div className="flex items-center mt-1">
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${budgetUsedPercentage > 90 ? 'bg-red-500' : budgetUsedPercentage > 70 ? 'bg-yellow-500' : 'bg-green-500'}`}
                  style={{ width: `${Math.min(budgetUsedPercentage, 100)}%` }}
                ></div>
              </div>
              <span className="text-xs text-muted-foreground ml-2">{budgetUsedPercentage}%</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Remaining</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${budgetRemaining < 0 ? 'text-red-500' : ''}`}>
              {formatCurrency(budgetRemaining)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {budgetRemaining < 0 ? 'Over budget' : 'Available budget'}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Tabs defaultValue="forms">
          <TabsList>
            <TabsTrigger value="forms">Procurement Forms</TabsTrigger>
            <TabsTrigger value="overview">Budget Overview</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
          </TabsList>
          
          <TabsContent value="forms" className="mt-6">
            {projectForms.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {projectForms.map(form => (
                  <ProcurementCard key={form.id} form={form} />
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center">
                <div className="mb-4 text-muted-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-1">No procurement forms yet</h3>
                <p className="text-muted-foreground mb-4">
                  Create your first procurement form for this project.
                </p>
                <div className="flex justify-center">
                  <Link to="/forms/new">
                    <Button>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                      New Procurement Form
                    </Button>
                  </Link>
                </div>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Budget Utilization</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <ChartContainer
                    config={{
                      spent: { label: "Spent", color: "#10b981" },
                      pending: { label: "Pending", color: "#f59e0b" },
                      remaining: { label: "Remaining", color: "#e2e8f0" },
                    }}
                  >
                    <RechartsPrimitive.PieChart>
                      <RechartsPrimitive.Pie
                        data={[
                          { name: "spent", value: totalSpent },
                          { name: "pending", value: pendingAmount },
                          { name: "remaining", value: Math.max(0, budgetRemaining - pendingAmount) },
                        ]}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius="70%"
                        outerRadius="90%"
                        paddingAngle={2}
                      >
                        {[
                          { name: "spent", color: "#10b981" },
                          { name: "pending", color: "#f59e0b" },
                          { name: "remaining", color: "#e2e8f0" },
                        ].map((entry, index) => (
                          <RechartsPrimitive.Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </RechartsPrimitive.Pie>
                      <RechartsPrimitive.Tooltip />
                      <RechartsPrimitive.Legend />
                    </RechartsPrimitive.PieChart>
                  </ChartContainer>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Project Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm text-muted-foreground">Start Date:</div>
                      <div className="text-sm font-medium">{formatDateString(project.startDate)}</div>
                      
                      <div className="text-sm text-muted-foreground">End Date:</div>
                      <div className="text-sm font-medium">{formatDateString(project.endDate)}</div>
                      
                      <div className="text-sm text-muted-foreground">Total Budget:</div>
                      <div className="text-sm font-medium">{formatCurrency(project.budget)}</div>
                      
                      <div className="text-sm text-muted-foreground">Total Spent:</div>
                      <div className="text-sm font-medium">{formatCurrency(totalSpent)}</div>
                      
                      <div className="text-sm text-muted-foreground">Pending Amount:</div>
                      <div className="text-sm font-medium">{formatCurrency(pendingAmount)}</div>
                      
                      <div className="text-sm text-muted-foreground">Budget Remaining:</div>
                      <div className={`text-sm font-medium ${budgetRemaining < 0 ? 'text-red-500' : ''}`}>
                        {formatCurrency(budgetRemaining)}
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <h4 className="text-sm font-medium mb-2">Project Progress</h4>
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div 
                          className="bg-primary h-2.5 rounded-full"
                          style={{ width: `${getBudgetProgress(project)}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>Start: {formatDateString(project.startDate)}</span>
                        <span>End: {formatDateString(project.endDate)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="timeline" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="relative border-l border-muted pl-8 ml-4">
                  {projectForms.map((form, index) => (
                    <div key={form.id} className="mb-8 relative">
                      <div className="absolute -left-12 mt-1.5 h-6 w-6 rounded-full border bg-background flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                          <polyline points="14 2 14 8 20 8" />
                        </svg>
                      </div>
                      <h3 className="text-base font-medium">{form.title}</h3>
                      <time className="text-xs text-muted-foreground mb-1 block">{formatDateString(form.createdAt)}</time>
                      <p className="text-sm">{form.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <StatusBadge status={form.status} />
                        <span className="text-sm font-semibold">{formatCurrency(form.totalAmount)}</span>
                      </div>
                    </div>
                  ))}
                  <div className="absolute -left-8 mt-1.5 h-6 w-6 rounded-full border bg-primary flex items-center justify-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                  </div>
                  <div className="mb-1">
                    <h3 className="text-base font-medium">Project Created</h3>
                    <time className="text-xs text-muted-foreground">{formatDateString(project.startDate)}</time>
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

function getBudgetProgress(project: any) {
  const startDate = new Date(project.startDate).getTime();
  const endDate = new Date(project.endDate).getTime();
  const currentDate = new Date().getTime();
  
  if (currentDate <= startDate) return 0;
  if (currentDate >= endDate) return 100;
  
  const totalDuration = endDate - startDate;
  const elapsedDuration = currentDate - startDate;
  
  return Math.round((elapsedDuration / totalDuration) * 100);
}
