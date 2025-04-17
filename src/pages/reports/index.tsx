
import { useState } from "react";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { procurementForms, projects } from "@/data/mockData";
import { formatCurrency } from "@/lib/formatters";
import { 
  ChartBarIcon,
  ChartPieIcon,
  ArrowDownToLineIcon,
  FilterIcon, 
  FileTextIcon,
  ListFilterIcon,
  DownloadIcon
} from "lucide-react";
import * as RechartsPrimitive from "recharts";
import { DateRange } from "@/components/reports/date-range";
import { ReportFilters } from "@/components/reports/report-filters";
import { useReportData } from "@/hooks/use-report-data";

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState<[Date | undefined, Date | undefined]>([
    new Date(new Date().setMonth(new Date().getMonth() - 1)),
    new Date()
  ]);
  
  const [activeView, setActiveView] = useState<'charts' | 'table'>('charts');
  const [selectedReport, setSelectedReport] = useState<'project' | 'status' | 'threshold'>('project');
  
  // Get report data from our new hook
  const { 
    projectSpendingData, 
    approvalStatusData, 
    thresholdData,
    filteredForms
  } = useReportData(dateRange);

  // Handler for exporting report data
  const handleExport = () => {
    const reportData = selectedReport === 'project' 
      ? projectSpendingData 
      : selectedReport === 'status' 
        ? approvalStatusData 
        : thresholdData;
    
    // Create CSV content
    const headers = Object.keys(reportData[0] || {}).join(',');
    const rows = reportData.map(item => Object.values(item).join(',')).join('\n');
    const csvContent = `data:text/csv;charset=utf-8,${headers}\n${rows}`;
    
    // Create download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `procurement_${selectedReport}_report.csv`);
    document.body.appendChild(link);
    
    // Trigger download
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <Layout>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground">Analyze your procurement activities and spending</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setActiveView('charts')} 
            className={activeView === 'charts' ? 'bg-muted' : ''}>
            <ChartBarIcon className="mr-2 h-4 w-4" />
            Charts
          </Button>
          <Button variant="outline" onClick={() => setActiveView('table')} 
            className={activeView === 'table' ? 'bg-muted' : ''}>
            <FileTextIcon className="mr-2 h-4 w-4" />
            Table
          </Button>
          <Button onClick={handleExport}>
            <DownloadIcon className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
            <CardDescription>Refine your report data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Date Range</h3>
                <DateRange dateRange={dateRange} setDateRange={setDateRange} />
              </div>
              
              <div className="pt-4">
                <h3 className="text-sm font-medium mb-2">Report Type</h3>
                <ReportFilters 
                  selectedReport={selectedReport} 
                  setSelectedReport={setSelectedReport} 
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="md:col-span-3">
          {activeView === 'charts' ? (
            <>
              {selectedReport === 'project' && (
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
                        </RechartsPrimitive.BarChart>
                      </RechartsPrimitive.ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              )}

              {selectedReport === 'status' && (
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
                            outerRadius={100}
                            label={entry => `${entry.name}: ${entry.value}`}
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
              )}

              {selectedReport === 'threshold' && (
                <Card>
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
              )}
            </>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Procurement Forms Data</CardTitle>
                <CardDescription>Detailed view of all procurement forms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Project</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredForms.map((form) => {
                        const project = projects.find(p => p.id === form.projectId);
                        return (
                          <TableRow key={form.id}>
                            <TableCell className="font-medium">{form.title}</TableCell>
                            <TableCell>{project?.name || 'Unknown'}</TableCell>
                            <TableCell>
                              <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                                form.status === 'approved' ? 'bg-green-100 text-green-700' :
                                form.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                form.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                'bg-gray-100 text-gray-700'
                              }`}>
                                {form.status.charAt(0).toUpperCase() + form.status.slice(1)}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">{formatCurrency(form.totalAmount)}</TableCell>
                            <TableCell>{new Date(form.createdAt).toLocaleDateString()}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
}
