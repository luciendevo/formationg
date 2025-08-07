import { FormSubmission, DashboardStats, AdminFilters, AdminUser } from '../types/admin';

// Service de simulation pour les données admin (en production, utiliser une vraie API)
class AdminService {
  private readonly STORAGE_KEYS = {
    SUBMISSIONS: 'zen_academy_submissions',
    ADMIN_USERS: 'zen_academy_admin_users',
    CURRENT_ADMIN: 'zen_academy_current_admin'
  };

  // Génération de données de test réalistes - 200 clients fictifs 2024
  private generateMockData(): FormSubmission[] {
    const mockData: FormSubmission[] = [];
    
    // Données réalistes françaises
    const companies = [
      // Grandes entreprises
      'Orange', 'BNP Paribas', 'Carrefour', 'Peugeot', 'Renault', 'L\'Oréal', 'Danone', 'Michelin',
      'Société Générale', 'Crédit Agricole', 'EDF', 'SNCF', 'La Poste', 'Bouygues', 'Vinci',
      // PME/ETI réalistes
      'TechnoConseil', 'InnovDigital', 'DataSolutions', 'WebFactory', 'SmartSystems', 'DigitalCorp',
      'ConseilPlus', 'ExpertiseRH', 'FormationPro', 'GestionMax', 'OptimServices', 'ProActive',
      'BusinessFlow', 'TalentBoost', 'SkillsUp', 'CareerPath', 'WorkSmart', 'TeamExpert',
      'ProcessPro', 'QualityFirst', 'EfficiencePlus', 'PerformanceMax', 'SuccessPartner',
      // Startups/Scale-ups
      'NextLevel', 'FutureWork', 'InnovateLab', 'TechVision', 'DigitalFirst', 'SmartFlow',
      'AgileTeam', 'CloudExperts', 'DataDriven', 'AIConsulting', 'GrowthHacker', 'ScaleUp',
      // Secteurs variés
      'MedicalCare', 'EcoSolutions', 'GreenTech', 'FinanceConseil', 'LegalExperts', 'ArchitectPlus',
      'DesignStudio', 'MarketingPro', 'CommunicationMax', 'EventsPro', 'TravelExperts', 'FoodTech'
    ];

    const positions = [
      // Management
      'Directeur Général', 'Directeur Commercial', 'Directeur Marketing', 'Directeur RH', 'Directeur Technique',
      'Manager d\'équipe', 'Chef de projet', 'Responsable commercial', 'Responsable marketing', 'Responsable RH',
      'Team Lead', 'Product Manager', 'Project Manager', 'Account Manager', 'Sales Manager',
      // Technique
      'Développeur Full Stack', 'Développeur Frontend', 'Développeur Backend', 'DevOps Engineer', 'Data Scientist',
      'UX/UI Designer', 'Product Designer', 'Graphic Designer', 'Architecte logiciel', 'Tech Lead',
      'Ingénieur logiciel', 'Consultant technique', 'Expert cybersécurité', 'Administrateur système',
      // Commercial/Marketing
      'Commercial B2B', 'Commercial B2C', 'Business Developer', 'Key Account Manager', 'Inside Sales',
      'Marketing Manager', 'Digital Marketing Specialist', 'Content Manager', 'SEO Specialist', 'Social Media Manager',
      'Growth Hacker', 'Brand Manager', 'Communication Manager', 'Event Manager',
      // RH/Formation
      'Consultant RH', 'Recruteur', 'Talent Acquisition', 'Formation Manager', 'Learning & Development',
      'HR Business Partner', 'Compensation & Benefits', 'Employee Experience', 'Change Manager',
      // Autres métiers
      'Consultant en stratégie', 'Analyste financier', 'Contrôleur de gestion', 'Auditeur', 'Juriste',
      'Chef comptable', 'Assistant de direction', 'Office Manager', 'Customer Success Manager',
      'Support Client', 'Quality Assurance', 'Business Analyst', 'Data Analyst', 'Freelance'
    ];

    const firstNames = [
      // Prénoms masculins français populaires
      'Antoine', 'Pierre', 'Nicolas', 'Thomas', 'Alexandre', 'Julien', 'David', 'Sébastien', 'Christophe',
      'Laurent', 'Olivier', 'Frédéric', 'Vincent', 'Stéphane', 'Jérôme', 'Philippe', 'Fabrice', 'Maxime',
      'Benjamin', 'Romain', 'Florian', 'Mathieu', 'Damien', 'Kevin', 'Yann', 'Loïc', 'Clément', 'Aurélien',
      'Raphaël', 'Guillaume', 'Adrien', 'Quentin', 'Hugo', 'Lucas', 'Théo', 'Louis', 'Gabriel', 'Arthur',
      // Prénoms féminins français populaires  
      'Marie', 'Sophie', 'Nathalie', 'Isabelle', 'Sylvie', 'Catherine', 'Françoise', 'Valérie', 'Christine',
      'Sandrine', 'Stéphanie', 'Céline', 'Martine', 'Karine', 'Aurélie', 'Laetitia', 'Émilie', 'Julie',
      'Amélie', 'Camille', 'Charlotte', 'Manon', 'Clara', 'Léa', 'Sarah', 'Laura', 'Pauline', 'Marion',
      'Anaïs', 'Lucie', 'Chloé', 'Emma', 'Inès', 'Jade', 'Louise', 'Alice', 'Juliette', 'Élise'
    ];

    const lastNames = [
      'Martin', 'Bernard', 'Thomas', 'Petit', 'Robert', 'Richard', 'Durand', 'Dubois', 'Moreau', 'Laurent',
      'Simon', 'Michel', 'Lefebvre', 'Leroy', 'Roux', 'David', 'Bertrand', 'Morel', 'Fournier', 'Girard',
      'Bonnet', 'Dupont', 'Lambert', 'Fontaine', 'Rousseau', 'Vincent', 'Muller', 'Lefevre', 'Faure', 'Andre',
      'Mercier', 'Blanc', 'Guerin', 'Boyer', 'Garnier', 'Chevalier', 'Francois', 'Legrand', 'Gauthier', 'Garcia',
      'Perrin', 'Robin', 'Clement', 'Morin', 'Nicolas', 'Henry', 'Roussel', 'Matthieu', 'Gautier', 'Masson',
      'Marchand', 'Duval', 'Denis', 'Dumont', 'Marie', 'Lemaire', 'Noel', 'Meyer', 'Dufour', 'Meunier',
      'Brun', 'Blanchard', 'Giraud', 'Joly', 'Riviere', 'Lucas', 'Brunet', 'Gaillard', 'Barbier', 'Arnaud'
    ];

    // Domaines email réalistes
    const emailDomains = [
      'gmail.com', 'outlook.fr', 'hotmail.fr', 'yahoo.fr', 'orange.fr', 'free.fr', 'sfr.fr', 'wanadoo.fr',
      'laposte.net', 'club-internet.fr', 'numericable.fr', 'bbox.fr', 'aliceadsl.fr', 'neuf.fr'
    ];

    // Générer 200 clients fictifs
    for (let i = 0; i < 200; i++) {
      const answers = Array.from({ length: 6 }, () => Math.floor(Math.random() * 5) + 1);
      const score = answers.reduce((sum, answer) => sum + answer, 0);
      
      let category: FormSubmission['testCategory'];
      if (score >= 23) category = 'excellence';
      else if (score >= 18) category = 'optimisation';
      else if (score >= 12) category = 'reflexion';
      else category = 'nouveau_depart';

      // Génération de dates réalistes pour 2024 avec horaires cohérents
      const submittedAt = this.generateRealisticDate();
      
      // Génération d'identité cohérente
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const emailDomain = emailDomains[Math.floor(Math.random() * emailDomains.length)];
      
      // Email réaliste basé sur le nom
      const emailPrefix = this.generateEmailPrefix(firstName, lastName, i);
      const email = `${emailPrefix}@${emailDomain}`;
      
      // Téléphone français réaliste
      const phone = Math.random() > 0.15 ? this.generateFrenchPhone() : undefined;
      
      // Entreprise et poste cohérents
      const company = Math.random() > 0.1 ? companies[Math.floor(Math.random() * companies.length)] : undefined;
      const position = Math.random() > 0.05 ? positions[Math.floor(Math.random() * positions.length)] : undefined;
      
      // Statut basé sur la date (plus récent = plus de chance d'être nouveau)
      const daysSinceSubmission = Math.floor((Date.now() - submittedAt.getTime()) / (1000 * 60 * 60 * 24));
      let status: FormSubmission['status'];
      if (daysSinceSubmission < 7) {
        status = Math.random() > 0.3 ? 'nouveau' : 'en_cours';
      } else if (daysSinceSubmission < 30) {
        status = ['nouveau', 'en_cours', 'traite'][Math.floor(Math.random() * 3)] as FormSubmission['status'];
      } else {
        status = Math.random() > 0.7 ? 'archive' : 'traite';
      }
      
      // Notes réalistes basées sur le statut et la catégorie
      const notes = this.generateRealisticNotes(status, category, firstName);
      
      // Assignation plus réaliste
      const assignedTo = status !== 'nouveau' && Math.random() > 0.4 ? 
        ['admin1', 'admin2', 'admin3'][Math.floor(Math.random() * 3)] : undefined;
      
      // Date de suivi future cohérente
      const followUpDate = (status === 'en_cours' || (status === 'traite' && Math.random() > 0.6)) ?
        new Date(Date.now() + Math.random() * 21 * 24 * 60 * 60 * 1000) : undefined;
      
      // Tags réalistes basés sur le profil
      const tags = this.generateRealisticTags(category, score, company);

      mockData.push({
        id: `form_${Date.now()}_${i.toString().padStart(3, '0')}_${Math.random().toString(36).substr(2, 5)}`,
        firstName,
        lastName,
        email,
        phone,
        company,
        position,
        testAnswers: answers,
        testScore: score,
        testCategory: category,
        submittedAt,
        status,
        notes,
        assignedTo,
        followUpDate,
        tags
      });
    }

    return mockData;
  }

  // Méthodes utilitaires pour générer des données réalistes

  private generateRealisticDate(): Date {
    // Dates entre janvier 2024 et aujourd'hui avec horaires de bureau réalistes
    const startDate = new Date('2024-01-02'); // Après les fêtes
    const endDate = new Date();
    const diffTime = endDate.getTime() - startDate.getTime();
    
    // Date aléatoire dans la période
    const randomTime = Math.random() * diffTime;
    const date = new Date(startDate.getTime() + randomTime);
    
    // Éviter les weekends pour 80% des soumissions
    if (Math.random() > 0.2) {
      const dayOfWeek = date.getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        // Si weekend, décaler au lundi suivant
        date.setDate(date.getDate() + (8 - dayOfWeek));
      }
    }
    
    // Horaires de bureau réalistes (8h-19h, avec pics à 10h, 14h, 16h)
    const hourWeights = [0, 0, 0, 0, 0, 0, 0, 0, 2, 4, 8, 6, 4, 2, 6, 4, 8, 6, 4, 2, 1, 0, 0, 0];
    let hour = 0;
    const rand = Math.random() * hourWeights.reduce((a, b) => a + b, 0);
    let sum = 0;
    for (let i = 0; i < hourWeights.length; i++) {
      sum += hourWeights[i];
      if (rand <= sum) {
        hour = i;
        break;
      }
    }
    
    date.setHours(hour, Math.floor(Math.random() * 60), Math.floor(Math.random() * 60));
    return date;
  }

  private generateEmailPrefix(firstName: string, lastName: string, index: number): string {
    const patterns = [
      `${firstName.toLowerCase()}.${lastName.toLowerCase()}`,
      `${firstName.toLowerCase()}${lastName.toLowerCase()}`,
      `${firstName.charAt(0).toLowerCase()}${lastName.toLowerCase()}`,
      `${firstName.toLowerCase()}.${lastName.charAt(0).toLowerCase()}`,
      `${firstName.toLowerCase()}${lastName.charAt(0).toLowerCase()}`,
      `${firstName.toLowerCase()}_${lastName.toLowerCase()}`,
      `${firstName.toLowerCase()}-${lastName.toLowerCase()}`,
      `${firstName.toLowerCase()}${Math.floor(Math.random() * 99) + 1}`,
      `${firstName.toLowerCase()}.${lastName.toLowerCase()}${Math.floor(Math.random() * 999) + 1}`
    ];
    
    // Normaliser les caractères spéciaux français
    let pattern = patterns[Math.floor(Math.random() * patterns.length)];
    pattern = pattern
      .replace(/[àáâãäå]/g, 'a')
      .replace(/[èéêë]/g, 'e')
      .replace(/[ìíîï]/g, 'i')
      .replace(/[òóôõö]/g, 'o')
      .replace(/[ùúûü]/g, 'u')
      .replace(/[ç]/g, 'c')
      .replace(/[ñ]/g, 'n')
      .replace(/[ÿ]/g, 'y');
    
    return pattern;
  }

  private generateFrenchPhone(): string {
    // Numéros français réalistes
    const prefixes = ['01', '02', '03', '04', '05', '06', '07', '09'];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    
    const generatePair = () => Math.floor(Math.random() * 90) + 10;
    
    return `${prefix} ${generatePair()} ${generatePair()} ${generatePair()} ${generatePair()}`;
  }

  private generateRealisticNotes(status: FormSubmission['status'], category: FormSubmission['testCategory'], firstName: string): string | undefined {
    if (Math.random() > 0.4) return undefined;
    
    const noteTemplates = {
      nouveau: [
        `Nouveau contact de ${firstName}, profil ${category}. À recontacter rapidement.`,
        `Soumission récente, score intéressant. Planifier un premier appel.`,
        `Candidat potentiel identifié. Vérifier disponibilité pour un entretien.`,
        `Profil correspondant à nos critères. Prévoir une présentation de nos services.`
      ],
      en_cours: [
        `Entretien téléphonique réalisé avec ${firstName}. Très motivé(e), à suivre.`,
        `Premier contact établi. Envoyer la documentation complémentaire.`,
        `RDV fixé pour la semaine prochaine. Préparer le dossier client.`,
        `Échange constructif. Attente de validation du manager pour la suite.`,
        `Devis envoyé le ${new Date(Date.now() - Math.random() * 14 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR')}. Relancer si pas de retour.`
      ],
      traite: [
        `Dossier finalisé avec ${firstName}. Client satisfait de notre accompagnement.`,
        `Formation programmée. Envoyer les documents de préparation.`,
        `Contrat signé. Démarrage prévu pour le mois prochain.`,
        `Bilan de compétences validé. Planifier les sessions de suivi.`,
        `Objectifs définis ensemble. Mise en place du plan d'action personnalisé.`
      ],
      archive: [
        `Dossier clôturé. Client non intéressé par nos services actuellement.`,
        `Formation terminée avec succès. Évaluation très positive.`,
        `Accompagnement finalisé. ${firstName} a trouvé un nouveau poste.`,
        `Projet reporté sine die. Garder le contact pour opportunités futures.`
      ]
    };
    
    const templates = noteTemplates[status];
    return templates[Math.floor(Math.random() * templates.length)];
  }

  private generateRealisticTags(category: FormSubmission['testCategory'], score: number, company?: string): string[] {
    const allTags = {
      priority: ['priorité haute', 'urgent', 'à traiter rapidement'],
      status: ['nouveau contact', 'en négociation', 'relance nécessaire', 'suivi programmé'],
      profile: ['profil senior', 'junior', 'management', 'technique', 'commercial'],
      interest: ['très motivé', 'intéressé', 'à convaincre', 'prospect chaud'],
      company: ['grande entreprise', 'startup', 'PME', 'secteur public'],
      skills: ['reconversion', 'évolution', 'formation', 'coaching', 'bilan compétences']
    };
    
    const tags: string[] = [];
    
    // Tags basés sur la catégorie
    if (category === 'excellence') {
      if (Math.random() > 0.6) tags.push('profil senior');
      if (Math.random() > 0.7) tags.push('évolution');
    } else if (category === 'nouveau_depart') {
      if (Math.random() > 0.5) tags.push('reconversion');
      if (Math.random() > 0.6) tags.push('priorité haute');
    }
    
    // Tags basés sur le score
    if (score >= 25) {
      if (Math.random() > 0.7) tags.push('prospect chaud');
    } else if (score <= 12) {
      if (Math.random() > 0.6) tags.push('à convaincre');
    }
    
    // Tags basés sur l'entreprise
    if (company) {
      const bigCompanies = ['Orange', 'BNP Paribas', 'Carrefour', 'Peugeot', 'Renault', 'L\'Oréal'];
      if (bigCompanies.includes(company) && Math.random() > 0.7) {
        tags.push('grande entreprise');
      }
    }
    
    // Ajouter quelques tags aléatoires
    const randomTags = [
      ...allTags.status,
      ...allTags.interest,
      ...allTags.skills
    ];
    
    while (tags.length < 3 && Math.random() > 0.4) {
      const randomTag = randomTags[Math.floor(Math.random() * randomTags.length)];
      if (!tags.includes(randomTag)) {
        tags.push(randomTag);
      }
    }
    
    return tags;
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

  // Méthode pour forcer la régénération des données (200 clients)
  public regenerateData(): void {
    localStorage.removeItem(this.STORAGE_KEYS.SUBMISSIONS);
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
    
    return JSON.parse(data).map((submission: FormSubmission) => ({
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
    
    return JSON.parse(data).map((user: AdminUser) => ({
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