
import { useMemo } from 'react';
import { procurementForms, projects } from '@/data/mockData';
import { THRESHOLD_LEVELS } from '@/types';

export function useReportData(dateRange: [Date | undefined, Date | undefined]) {
  const [startDate, endDate] = dateRange;
  
  // Filter forms by date range
  const filteredForms = useMemo(() => {
    return procurementForms.filter(form => {
      if (!startDate || !endDate) return true;
      
      const formDate = new Date(form.createdAt);
      return formDate >= startDate && formDate <= endDate;
    });
  }, [startDate, endDate, procurementForms]);

  // Process project spending data
  const projectSpendingData = useMemo(() => {
    return projects.map(project => {
      const projectForms = filteredForms.filter(form => form.projectId === project.id);
      
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
  }, [filteredForms, projects]);

  // Process approval status data
  const approvalStatusData = useMemo(() => {
    return [
      { name: 'Approved', value: filteredForms.filter(form => form.status === 'approved').length },
      { name: 'Pending', value: filteredForms.filter(form => form.status === 'pending').length },
      { name: 'Rejected', value: filteredForms.filter(form => form.status === 'rejected').length },
      { name: 'Draft', value: filteredForms.filter(form => form.status === 'draft').length }
    ];
  }, [filteredForms]);

  // Process threshold data
  const thresholdData = useMemo(() => {
    return [
      { name: 'Low', value: filteredForms.filter(form => form.totalAmount <= THRESHOLD_LEVELS.low).length },
      { name: 'Medium', value: filteredForms.filter(form => form.totalAmount > THRESHOLD_LEVELS.low && form.totalAmount <= THRESHOLD_LEVELS.medium).length },
      { name: 'High', value: filteredForms.filter(form => form.totalAmount > THRESHOLD_LEVELS.medium).length }
    ];
  }, [filteredForms]);

  return {
    projectSpendingData,
    approvalStatusData,
    thresholdData,
    filteredForms
  };
}
