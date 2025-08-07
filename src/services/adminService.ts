import { FormSubmission, DashboardStats, AdminFilters, AdminUser } from '../types/admin';

// Service de simulation pour les données admin (en production, utiliser une vraie API)
class AdminService {
  private readonly STORAGE_KEYS = {
    SUBMISSIONS: 'zen_academy_submissions',
    ADMIN_USERS: 'zen_academy_admin_users',
    CURRENT_ADMIN: 'zen_academy_current_admin'
  };

  // Génération de données de test
  private generateMockData(): FormSubmission[] {
    const mockData: FormSubmission[] = [];
    const companies = ['TechCorp', 'InnovateSA', 'FutureWorks', 'DigitalPro', 'CreativeLab', 'StartupInc'];
    const positions = ['Développeur', 'Manager', 'Designer', 'Consultant', 'Directeur', 'Analyste'];
    const firstNames = ['Marie', 'Pierre', 'Sophie', 'Antoine', 'Camille', 'Thomas', 'Julie', 'Nicolas'];
    const lastNames = ['Martin', 'Bernard', 'Dubois', 'Thomas', 'Robert', 'Richard', 'Petit', 'Durand'];

    for (let i = 0; i < 50; i++) {
      const answers = Array.from({ length: 6 }, () => Math.floor(Math.random() * 5) + 1);
      const score = answers.reduce((sum, answer) => sum + answer, 0);
      
      let category: FormSubmission['testCategory'];
      if (score >= 23) category = 'excellence';
      else if (score >= 18) category = 'optimisation';
      else if (score >= 12) category = 'reflexion';
      else category = 'nouveau_depart';

      const submittedAt = new Date();
      submittedAt.setDate(submittedAt.getDate() - Math.floor(Math.random() * 90));

      mockData.push({
        id: `form_${i + 1}`,
        firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
        lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
        email: `user${i + 1}@example.com`,
        phone: Math.random() > 0.3 ? `06 ${Math.floor(Math.random() * 90) + 10} ${Math.floor(Math.random() * 90) + 10} ${Math.floor(Math.random() * 90) + 10} ${Math.floor(Math.random() * 90) + 10}` : undefined,
        company: Math.random() > 0.2 ? companies[Math.floor(Math.random() * companies.length)] : undefined,
        position: Math.random() > 0.2 ? positions[Math.floor(Math.random() * positions.length)] : undefined,
        testAnswers: answers,
        testScore: score,
        testCategory: category,
        submittedAt,
        status: ['nouveau', 'en_cours', 'traite', 'archive'][Math.floor(Math.random() * 4)] as FormSubmission['status'],
        notes: Math.random() > 0.7 ? 'Notes de suivi ajoutées par l\'équipe' : undefined,
        assignedTo: Math.random() > 0.5 ? ['admin1', 'admin2', 'admin3'][Math.floor(Math.random() * 3)] : undefined,
        followUpDate: Math.random() > 0.6 ? new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000) : undefined,
        tags: Math.random() > 0.5 ? ['priorité', 'suivi', 'intéressé'].filter(() => Math.random() > 0.5) : []
      });
    }

    return mockData;
  }

  // Initialisation des données de test
  private initializeMockData(): void {
    if (!localStorage.getItem(this.STORAGE_KEYS.SUBMISSIONS)) {
      const mockData = this.generateMockData();
      localStorage.setItem(this.STORAGE_KEYS.SUBMISSIONS, JSON.stringify(mockData));
    }

    if (!localStorage.getItem(this.STORAGE_KEYS.ADMIN_USERS)) {
      const adminUsers: AdminUser[] = [
        {
          id: 'admin1',
          email: 'admin@zenacademy.com',
          name: 'Administrateur Principal',
          role: 'super_admin',
          lastLogin: new Date(),
          createdAt: new Date('2024-01-01')
        },
        {
          id: 'admin2',
          email: 'manager@zenacademy.com',
          name: 'Manager RH',
          role: 'admin',
          lastLogin: new Date(),
          createdAt: new Date('2024-01-15')
        }
      ];
      localStorage.setItem(this.STORAGE_KEYS.ADMIN_USERS, JSON.stringify(adminUsers));
    }
  }

  constructor() {
    this.initializeMockData();
  }

  // Authentification
  async login(email: string, password: string): Promise<AdminUser | null> {
    // Simulation d'authentification (en production, utiliser une vraie API)
    if (email === 'admin@zenacademy.com' && password === 'admin123') {
      const adminUsers = this.getAdminUsers();
      const user = adminUsers.find(u => u.email === email);
      if (user) {
        user.lastLogin = new Date();
        localStorage.setItem(this.STORAGE_KEYS.CURRENT_ADMIN, JSON.stringify(user));
        return user;
      }
    }
    return null;
  }

  getCurrentAdmin(): AdminUser | null {
    const adminData = localStorage.getItem(this.STORAGE_KEYS.CURRENT_ADMIN);
    return adminData ? JSON.parse(adminData) : null;
  }

  logout(): void {
    localStorage.removeItem(this.STORAGE_KEYS.CURRENT_ADMIN);
  }

  // Gestion des soumissions
  getSubmissions(): FormSubmission[] {
    const data = localStorage.getItem(this.STORAGE_KEYS.SUBMISSIONS);
    if (!data) return [];
    
    return JSON.parse(data).map((submission: any) => ({
      ...submission,
      submittedAt: new Date(submission.submittedAt),
      followUpDate: submission.followUpDate ? new Date(submission.followUpDate) : undefined
    }));
  }

  getSubmissionById(id: string): FormSubmission | null {
    const submissions = this.getSubmissions();
    return submissions.find(s => s.id === id) || null;
  }

  updateSubmission(id: string, updates: Partial<FormSubmission>): FormSubmission | null {
    const submissions = this.getSubmissions();
    const index = submissions.findIndex(s => s.id === id);
    
    if (index === -1) return null;
    
    submissions[index] = { ...submissions[index], ...updates };
    localStorage.setItem(this.STORAGE_KEYS.SUBMISSIONS, JSON.stringify(submissions));
    
    return submissions[index];
  }

  deleteSubmission(id: string): boolean {
    const submissions = this.getSubmissions();
    const filteredSubmissions = submissions.filter(s => s.id !== id);
    
    if (filteredSubmissions.length === submissions.length) return false;
    
    localStorage.setItem(this.STORAGE_KEYS.SUBMISSIONS, JSON.stringify(filteredSubmissions));
    return true;
  }

  // Filtrage et recherche
  filterSubmissions(filters: AdminFilters): FormSubmission[] {
    let submissions = this.getSubmissions();

    if (filters.status) {
      submissions = submissions.filter(s => s.status === filters.status);
    }

    if (filters.category) {
      submissions = submissions.filter(s => s.testCategory === filters.category);
    }

    if (filters.dateFrom) {
      submissions = submissions.filter(s => s.submittedAt >= filters.dateFrom!);
    }

    if (filters.dateTo) {
      submissions = submissions.filter(s => s.submittedAt <= filters.dateTo!);
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      submissions = submissions.filter(s => 
        s.firstName.toLowerCase().includes(searchLower) ||
        s.lastName.toLowerCase().includes(searchLower) ||
        s.email.toLowerCase().includes(searchLower) ||
        (s.company && s.company.toLowerCase().includes(searchLower)) ||
        (s.position && s.position.toLowerCase().includes(searchLower))
      );
    }

    if (filters.assignedTo) {
      submissions = submissions.filter(s => s.assignedTo === filters.assignedTo);
    }

    if (filters.tags && filters.tags.length > 0) {
      submissions = submissions.filter(s => 
        filters.tags!.some(tag => s.tags.includes(tag))
      );
    }

    return submissions;
  }

  // Statistiques du tableau de bord
  getDashboardStats(): DashboardStats {
    const submissions = this.getSubmissions();
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const newSubmissions = submissions.filter(s => 
      s.status === 'nouveau' && s.submittedAt >= thirtyDaysAgo
    ).length;

    const processedSubmissions = submissions.filter(s => 
      s.status === 'traite'
    ).length;

    const averageScore = submissions.reduce((sum, s) => sum + s.testScore, 0) / submissions.length;

    const submissionsByCategory = submissions.reduce((acc, s) => {
      acc[s.testCategory] = (acc[s.testCategory] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const submissionsByMonth = this.getSubmissionsByMonth(submissions);
    const topCompanies = this.getTopCompanies(submissions);

    return {
      totalSubmissions: submissions.length,
      newSubmissions,
      processedSubmissions,
      averageScore: Math.round(averageScore * 10) / 10,
      submissionsByCategory,
      submissionsByMonth,
      topCompanies
    };
  }

  private getSubmissionsByMonth(submissions: FormSubmission[]) {
    const monthCounts: Record<string, number> = {};
    
    submissions.forEach(s => {
      const monthKey = s.submittedAt.toISOString().slice(0, 7); // YYYY-MM
      monthCounts[monthKey] = (monthCounts[monthKey] || 0) + 1;
    });

    return Object.entries(monthCounts)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-6) // Derniers 6 mois
      .map(([month, count]) => ({
        month: new Date(month + '-01').toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' }),
        count
      }));
  }

  private getTopCompanies(submissions: FormSubmission[]) {
    const companyCounts: Record<string, number> = {};
    
    submissions.forEach(s => {
      if (s.company) {
        companyCounts[s.company] = (companyCounts[s.company] || 0) + 1;
      }
    });

    return Object.entries(companyCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([company, count]) => ({ company, count }));
  }

  // Ajout d'une nouvelle soumission (depuis le formulaire public)
  addSubmission(submission: Omit<FormSubmission, 'id' | 'submittedAt' | 'status' | 'tags'>): FormSubmission {
    const submissions = this.getSubmissions();
    const newSubmission: FormSubmission = {
      ...submission,
      id: `form_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      submittedAt: new Date(),
      status: 'nouveau',
      tags: []
    };

    submissions.push(newSubmission);
    localStorage.setItem(this.STORAGE_KEYS.SUBMISSIONS, JSON.stringify(submissions));
    
    return newSubmission;
  }

  private getAdminUsers(): AdminUser[] {
    const data = localStorage.getItem(this.STORAGE_KEYS.ADMIN_USERS);
    if (!data) return [];
    
    return JSON.parse(data).map((user: any) => ({
      ...user,
      lastLogin: new Date(user.lastLogin),
      createdAt: new Date(user.createdAt)
    }));
  }

  // Export des données (simulation)
  async exportData(options: { format: 'csv' | 'xlsx'; submissions: FormSubmission[] }): Promise<string> {
    const { format, submissions } = options;
    
    if (format === 'csv') {
      return this.exportToCSV(submissions);
    }
    
    // Pour xlsx, on simule juste le retour d'une URL
    return 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,mock_data';
  }

  private exportToCSV(submissions: FormSubmission[]): string {
    const headers = [
      'ID', 'Prénom', 'Nom', 'Email', 'Téléphone', 'Entreprise', 'Poste',
      'Score', 'Catégorie', 'Status', 'Date soumission', 'Notes'
    ];
    
    const csvContent = [
      headers.join(','),
      ...submissions.map(s => [
        s.id,
        s.firstName,
        s.lastName,
        s.email,
        s.phone || '',
        s.company || '',
        s.position || '',
        s.testScore,
        s.testCategory,
        s.status,
        s.submittedAt.toLocaleDateString('fr-FR'),
        (s.notes || '').replace(/,/g, ';')
      ].join(','))
    ].join('\n');

    return `data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`;
  }
}

export const adminService = new AdminService();