
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { projects, procurementForms } from "@/data/mockData";
import { formatCurrency } from "@/lib/formatters";

type StatCardProps = {
  title: string;
  value: string;
  icon: React.ReactNode;
  description?: string;
}

export function StatCard({ title, value, icon, description }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        <div className="text-primary h-5 w-5">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      </CardContent>
    </Card>
  );
}

export function DashboardStats() {
  // Calculate stats from data
  const totalProjects = projects.length;
  
  const totalBudget = projects
    .filter(p => p.status === 'active')
    .reduce((sum, project) => sum + project.budget, 0);
  
  const pendingApprovals = procurementForms
    .filter(form => form.status === 'pending').length;
  
  const totalSpent = procurementForms
    .filter(form => form.status === 'approved')
    .reduce((sum, form) => sum + form.totalAmount, 0);
  
  const budgetPercentage = Math.round((totalSpent / totalBudget) * 100);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Projects"
        value={totalProjects.toString()}
        icon={(
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 17a5 5 0 0 0 5 5c2.76 0 5-2.24 5-5s-2.24-5-5-5a5 5 0 0 0-5 5Z" />
            <path d="M12 17a5 5 0 0 0 5 5c2.76 0 5-2.24 5-5s-2.24-5-5-5a5 5 0 0 0-5 5Z" />
            <path d="M12 5a5 5 0 1 1 0 .01" />
          </svg>
        )}
      />
      <StatCard
        title="Active Budget"
        value={formatCurrency(totalBudget)}
        icon={(
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
            <path d="M12 18V6" />
          </svg>
        )}
      />
      <StatCard
        title="Pending Approvals"
        value={pendingApprovals.toString()}
        icon={(
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <path d="M14 2v6h6" />
            <path d="M16 13H8" />
            <path d="M16 17H8" />
            <path d="M10 9H8" />
          </svg>
        )}
      />
      <StatCard
        title="Total Procurements"
        value={formatCurrency(totalSpent)}
        icon={(
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <path d="M2 10h20" />
          </svg>
        )}
        description={`${budgetPercentage}% of total budget`}
      />
    </div>
  );
}
