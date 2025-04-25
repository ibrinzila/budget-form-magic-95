import { Project, ProcurementForm, User, BudgetLine, Activity } from '@/types';

// Sample users
export const users: User[] = [
  {
    id: 'user1',
    name: 'John Doe',
    role: 'requester'
  },
  {
    id: 'user2',
    name: 'Jane Smith',
    role: 'approver'
  },
  {
    id: 'user3',
    name: 'Admin User',
    role: 'admin'
  }
];

// Sample projects
export const projects: Project[] = [
  {
    id: 'project1',
    name: 'Office Renovation',
    description: 'Renovating the main office space',
    budget: 50000,
    startDate: '2025-01-01',
    endDate: '2025-06-30',
    status: 'active'
  },
  {
    id: 'project2',
    name: 'IT Equipment Upgrade',
    description: 'Upgrading computers and networking equipment',
    budget: 25000,
    startDate: '2025-02-15',
    endDate: '2025-04-15',
    status: 'active'
  },
  {
    id: 'project3',
    name: 'Marketing Campaign',
    description: 'Q2 marketing activities',
    budget: 15000,
    startDate: '2025-04-01',
    endDate: '2025-06-30',
    status: 'active'
  }
];

export const budgetLines: BudgetLine[] = [
  {
    id: 'bl1',
    projectId: 'project1',
    name: 'Office Furniture',
    amount: 20000,
    remainingAmount: 15000
  },
  {
    id: 'bl2',
    projectId: 'project1',
    name: 'Construction Materials',
    amount: 30000,
    remainingAmount: 28000
  },
  {
    id: 'bl3',
    projectId: 'project2',
    name: 'Hardware',
    amount: 15000,
    remainingAmount: 12000
  },
  {
    id: 'bl4',
    projectId: 'project2',
    name: 'Software Licenses',
    amount: 10000,
    remainingAmount: 8000
  }
];

export const activities: Activity[] = [
  {
    id: 'act1',
    projectId: 'project1',
    name: 'Office Layout Planning',
    description: 'Planning and designing office space layout',
    startDate: '2025-01-15',
    endDate: '2025-02-15'
  },
  {
    id: 'act2',
    projectId: 'project1',
    name: 'Furniture Installation',
    description: 'Installing new office furniture',
    startDate: '2025-02-16',
    endDate: '2025-03-15'
  },
  {
    id: 'act3',
    projectId: 'project2',
    name: 'Hardware Setup',
    description: 'Setting up new computer hardware',
    startDate: '2025-02-20',
    endDate: '2025-03-10'
  }
];

// Sample procurement forms
export const procurementForms: ProcurementForm[] = [
  {
    id: 'form1',
    projectId: 'project1',
    title: 'Office Furniture',
    description: 'Purchase of desks and chairs',
    items: [
      {
        id: 'item1',
        description: 'Ergonomic Office Chair',
        quantity: 10,
        unitPrice: 250,
        totalPrice: 2500
      },
      {
        id: 'item2',
        description: 'Adjustable Standing Desk',
        quantity: 10,
        unitPrice: 400,
        totalPrice: 4000
      }
    ],
    totalAmount: 6500,
    createdAt: '2025-01-15',
    status: 'approved',
    attachments: [
      {
        id: 'att1',
        name: 'furniture_quote.pdf',
        type: 'pdf',
        url: '#',
        processed: true
      }
    ]
  },
  {
    id: 'form2',
    projectId: 'project2',
    title: 'Laptops Purchase',
    description: 'New laptops for the development team',
    items: [
      {
        id: 'item3',
        description: 'Developer Laptop',
        quantity: 5,
        unitPrice: 1200,
        totalPrice: 6000
      },
      {
        id: 'item4',
        description: 'Laptop Accessories Bundle',
        quantity: 5,
        unitPrice: 200,
        totalPrice: 1000
      }
    ],
    totalAmount: 7000,
    createdAt: '2025-02-20',
    status: 'pending',
    attachments: [
      {
        id: 'att2',
        name: 'laptop_specs.pdf',
        type: 'pdf',
        url: '#',
        processed: false
      }
    ]
  },
  {
    id: 'form3',
    projectId: 'project3',
    title: 'Digital Advertising',
    description: 'Social media ad campaign',
    items: [
      {
        id: 'item5',
        description: 'Facebook Ads',
        quantity: 1,
        unitPrice: 3000,
        totalPrice: 3000
      },
      {
        id: 'item6',
        description: 'Google Ads',
        quantity: 1,
        unitPrice: 3500,
        totalPrice: 3500
      }
    ],
    totalAmount: 6500,
    createdAt: '2025-04-05',
    status: 'draft',
    attachments: []
  }
];
