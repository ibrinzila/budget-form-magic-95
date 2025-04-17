
import { Button } from '@/components/ui/button';
import { ChartBarIcon, ChartPieIcon, BarChart3Icon } from 'lucide-react';

interface ReportFiltersProps {
  selectedReport: 'project' | 'status' | 'threshold';
  setSelectedReport: (report: 'project' | 'status' | 'threshold') => void;
}

export function ReportFilters({ selectedReport, setSelectedReport }: ReportFiltersProps) {
  return (
    <div className="flex flex-col gap-2">
      <Button
        variant={selectedReport === 'project' ? 'default' : 'outline'}
        className="justify-start"
        onClick={() => setSelectedReport('project')}
      >
        <ChartBarIcon className="mr-2 h-4 w-4" />
        Project Spending
      </Button>
      
      <Button
        variant={selectedReport === 'status' ? 'default' : 'outline'}
        className="justify-start"
        onClick={() => setSelectedReport('status')}
      >
        <ChartPieIcon className="mr-2 h-4 w-4" />
        Approval Status
      </Button>
      
      <Button
        variant={selectedReport === 'threshold' ? 'default' : 'outline'}
        className="justify-start" 
        onClick={() => setSelectedReport('threshold')}
      >
        <BarChart3Icon className="mr-2 h-4 w-4" />
        Threshold Analysis
      </Button>
    </div>
  );
}
