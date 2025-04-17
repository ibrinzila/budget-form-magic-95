
import { Layout } from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { procurementForms, projects } from "@/data/mockData";
import { formatCurrency } from "@/lib/formatters";
import * as RechartsPrimitive from "recharts";

export default function ReportsPage() {
  // Process data for charts
  const projectSpendingData = projects.map(project => {
    const projectForms = procurementForms.filter(form => form.projectId === project.id);
    const totalSpent = projectForms
      .filter(form => form.status === 'approved')
      .reduce((sum, form) => sum + form.totalAmount, 0);
      
    const pendingAmount = projectForms
      .filter(form => form.status === 'pending')
      .reduce((sum, form) => sum + form.totalAmount, 0);
    
    return {
      name: project.name,
      spent: totalSpent,
      pending: pendingAmount,
      budget: project.budget
    };
  });

  // Approval status data
  const approvalStatusData = [
    { name: 'Approved', value: procurementForms.filter(form => form.status === 'approved').length },
    { name: 'Pending', value: procurementForms.filter(form => form.status === 'pending').length },
    { name: 'Rejected', value: procurementForms.filter(form => form.status === 'rejected').length },
    { name: 'Draft', value: procurementForms.filter(form => form.status === 'draft').length }
  ];

  // Threshold analysis
  const thresholdData = [
    { name: 'Low', value: procurementForms.filter(form => form.totalAmount <= 1000).length },
    { name: 'Medium', value: procurementForms.filter(form => form.totalAmount > 1000 && form.totalAmount <= 5000).length },
    { name: 'High', value: procurementForms.filter(form => form.totalAmount > 5000).length }
  ];

  return (
    <Layout>
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <p className="text-muted-foreground">Analyze your procurement activities and spending</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Procurement by Project</CardTitle>
            <CardDescription>View spending breakdown by project</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ChartContainer
              config={{
                spent: { label: "Spent", color: "#10b981" },
                pending: { label: "Pending", color: "#f59e0b" },
                budget: { label: "Budget", color: "#3b82f6" }
              }}
            >
              <RechartsPrimitive.ResponsiveContainer height="100%" width="100%">
                <RechartsPrimitive.BarChart
                  data={projectSpendingData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
                  <RechartsPrimitive.XAxis dataKey="name" />
                  <RechartsPrimitive.YAxis />
                  <RechartsPrimitive.Tooltip 
                    formatter={(value: number) => formatCurrency(value)}
                  />
                  <RechartsPrimitive.Legend />
                  <RechartsPrimitive.Bar dataKey="spent" stackId="a" fill="#10b981" />
                  <RechartsPrimitive.Bar dataKey="pending" stackId="a" fill="#f59e0b" />
                  <RechartsPrimitive.ReferenceLine y={0} stroke="#000" />
                </RechartsPrimitive.BarChart>
              </RechartsPrimitive.ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Approval Status</CardTitle>
            <CardDescription>Track approval rates and distribution</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ChartContainer
              config={{
                approved: { label: "Approved", color: "#10b981" },
                pending: { label: "Pending", color: "#f59e0b" },
                rejected: { label: "Rejected", color: "#ef4444" },
                draft: { label: "Draft", color: "#6b7280" }
              }}
            >
              <RechartsPrimitive.ResponsiveContainer height="100%" width="100%">
                <RechartsPrimitive.PieChart>
                  <RechartsPrimitive.Pie
                    data={approvalStatusData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={(entry) => entry.name}
                  >
                    {approvalStatusData.map((entry, index) => {
                      const colors = ["#10b981", "#f59e0b", "#ef4444", "#6b7280"];
                      return <RechartsPrimitive.Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                    })}
                  </RechartsPrimitive.Pie>
                  <RechartsPrimitive.Tooltip />
                  <RechartsPrimitive.Legend />
                </RechartsPrimitive.PieChart>
              </RechartsPrimitive.ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Procurement Thresholds</CardTitle>
            <CardDescription>Analysis of spending relative to procurement thresholds</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ChartContainer
              config={{
                low: { label: "Low", color: "#10b981" },
                medium: { label: "Medium", color: "#f59e0b" },
                high: { label: "High", color: "#ef4444" }
              }}
            >
              <RechartsPrimitive.ResponsiveContainer height="100%" width="100%">
                <RechartsPrimitive.BarChart
                  data={thresholdData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
                  <RechartsPrimitive.XAxis dataKey="name" />
                  <RechartsPrimitive.YAxis />
                  <RechartsPrimitive.Tooltip />
                  <RechartsPrimitive.Legend />
                  <RechartsPrimitive.Bar dataKey="value" fill="#8884d8" />
                </RechartsPrimitive.BarChart>
              </RechartsPrimitive.ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
