// Types pour le système d'administration

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'super_admin' | 'admin' | 'viewer';
  lastLogin: Date;
  createdAt: Date;
}

export interface FormSubmission {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  position?: string;
  testAnswers: number[];
  testScore: number;
  testCategory: 'excellence' | 'optimisation' | 'reflexion' | 'nouveau_depart';
  submittedAt: Date;
  status: 'nouveau' | 'en_cours' | 'traite' | 'archive';
  notes?: string;
  assignedTo?: string;
  followUpDate?: Date;
  tags: string[];
}

export interface DashboardStats {
  totalSubmissions: number;
  newSubmissions: number;
  processedSubmissions: number;
  averageScore: number;
  submissionsByCategory: Record<string, number>;
  submissionsByMonth: Array<{
    month: string;
    count: number;
  }>;
  topCompanies: Array<{
    company: string;
    count: number;
  }>;
}

export interface AdminFilters {
  status?: string;
  category?: string;
  dateFrom?: Date;
  dateTo?: Date;
  search?: string;
  assignedTo?: string;
  tags?: string[];
}

export interface ExportOptions {
  format: 'csv' | 'xlsx' | 'pdf';
  fields: string[];
  filters: AdminFilters;
  includeAnswers: boolean;
}