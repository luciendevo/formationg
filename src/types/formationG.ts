// Types pour Formation G CRM SaaS

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  registrationDate: Date;
  requestedTraining: string;
  status: 'nouveau' | 'en_cours' | 'accepte' | 'refuse' | 'termine';
  adminNotes?: string;
  cpfFormProgress?: number;
  cpfFormCompleted?: boolean;
  cpfAnswers?: CPFAnswer[];
  role: 'user' | 'admin';
  lastLogin?: Date;
}

export interface Training {
  id: string;
  name: string;
  city: string;
  startDate: Date;
  endDate: Date;
  capacity: number;
  enrolled: number;
  price: number;
  description: string;
  category: string;
  level: 'débutant' | 'intermédiaire' | 'avancé';
  duration: string; // "5 jours", "2 semaines", etc.
  cpfEligible: boolean;
}

export interface CPFQuestion {
  id: string;
  category: 'profil' | 'objectifs' | 'competences' | 'contraintes' | 'financement' | 'motivation';
  question: string;
  type: 'text' | 'textarea' | 'select' | 'multiselect' | 'radio' | 'checkbox' | 'file';
  options?: string[];
  required: boolean;
  placeholder?: string;
  helpText?: string;
  conditionalOn?: {
    questionId: string;
    value: string | string[];
  };
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
}

export interface CPFAnswer {
  questionId: string;
  answer: string | string[] | File[];
  answeredAt: Date;
}

export interface CPFSubmission {
  id: string;
  userId: string;
  answers: CPFAnswer[];
  progress: number;
  status: 'brouillon' | 'soumis' | 'en_traitement' | 'valide' | 'rejete';
  submittedAt?: Date;
  lastSavedAt: Date;
  adminNotes?: string;
  score?: number;
  recommendedTrainings?: string[];
}

export interface DashboardStats {
  totalUsers: number;
  newUsersThisMonth: number;
  totalTrainings: number;
  totalCPFSubmissions: number;
  pendingCPFSubmissions: number;
  completedCPFSubmissions: number;
  averageScore: number;
  usersByStatus: Record<string, number>;
  submissionsByMonth: Array<{ month: string; count: number }>;
  topTrainings: Array<{ training: string; requests: number }>;
  topCities: Array<{ city: string; users: number }>;
}

export interface AuthUser {
  email: string;
  role: 'admin' | 'user';
  name: string;
  token?: string;
}

export interface AdminFilters {
  status?: string;
  city?: string;
  training?: string;
  dateFrom?: Date;
  dateTo?: Date;
  search?: string;
}

export interface LandingPageData {
  id: string;
  title: string;
  subtitle: string;
  heroImage: string;
  features: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  testimonials: Array<{
    name: string;
    role: string;
    company: string;
    text: string;
    rating: number;
  }>;
  ctaText: string;
  ctaLink: string;
}
