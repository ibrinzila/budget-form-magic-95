
export type Project = {
  id: string;
  name: string;
  description: string;
  budget: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'on-hold';
};

export type ProcurementForm = {
  id: string;
  projectId: string;
  title: string;
  description: string;
  items: PurchaseItem[];
  totalAmount: number;
  createdAt: string;
  status: 'draft' | 'pending' | 'approved' | 'rejected';
  attachments: Attachment[];
};

export type PurchaseItem = {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
};

export type Attachment = {
  id: string;
  name: string;
  type: 'pdf' | 'image';
  url: string;
  processed: boolean;
};

export type ThresholdLevel = 'low' | 'medium' | 'high';

export const THRESHOLD_LEVELS = {
  low: 1000,
  medium: 5000,
  high: 10000
};

export type User = {
  id: string;
  name: string;
  role: 'requester' | 'approver' | 'admin';
};
