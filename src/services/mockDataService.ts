import { User, Training, CPFQuestion } from '../types/formationG';

export class MockDataService {
  private readonly STORAGE_KEYS = {
    USERS: 'formation_g_users',
    TRAININGS: 'formation_g_trainings',
    CPF_QUESTIONS: 'formation_g_cpf_questions'
  };

  // Generate 50 mock users
  generateMockUsers(): User[] {
    const firstNames = ['Antoine', 'Marie', 'Pierre', 'Sophie', 'Nicolas', 'Nathalie', 'Thomas', 'Isabelle', 'Alexandre', 'Sylvie'];
    const lastNames = ['Martin', 'Bernard', 'Thomas', 'Petit', 'Robert', 'Richard', 'Durand', 'Dubois', 'Moreau', 'Laurent'];
    const cities = ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice', 'Nantes', 'Montpellier', 'Strasbourg', 'Bordeaux', 'Lille'];
    const trainings = ['Développement Web', 'Data Science', 'Marketing Digital', 'Gestion de Projet', 'Cybersécurité'];
    const statuses: User['status'][] = ['nouveau', 'en_cours', 'accepte', 'refuse', 'termine'];

    return Array.from({ length: 50 }, (_, i) => ({
      id: `user_${i + 1}`,
      firstName: firstNames[i % firstNames.length],
      lastName: lastNames[i % lastNames.length],
      email: `user${i + 1}@email.fr`,
      phone: this.generateFrenchPhone(),
      city: cities[i % cities.length],
      registrationDate: new Date(2022, 11, Math.floor(Math.random() * 31) + 1),
      requestedTraining: trainings[Math.floor(Math.random() * trainings.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      role: 'user',
      cpfFormProgress: Math.floor(Math.random() * 101)
    }));
  }

  // Generate 50 mock trainings
  generateMockTrainings(): Training[] {
    const trainingNames = [
      'Formation Développeur Web Full Stack',
      'Certification Data Scientist',
      'Spécialisation Marketing Digital',
      'Formation Chef de Projet Agile',
      'Expert en Cybersécurité'
    ];
    
    const cities = ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice'];
    const categories = ['Informatique', 'Marketing', 'Management', 'Finance', 'RH'];
    const levels: Training['level'][] = ['débutant', 'intermédiaire', 'avancé'];

    return Array.from({ length: 50 }, (_, i) => {
      const startDate = new Date(2022, 11, 5 + i);
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 14);

      return {
        id: `training_${i + 1}`,
        name: `${trainingNames[i % trainingNames.length]} ${i + 1}`,
        city: cities[i % cities.length],
        startDate,
        endDate,
        capacity: Math.floor(Math.random() * 20) + 10,
        enrolled: Math.floor(Math.random() * 15) + 2,
        price: Math.floor(Math.random() * 3000) + 1500,
        description: 'Formation professionnelle certifiante de haute qualité.',
        category: categories[Math.floor(Math.random() * categories.length)],
        level: levels[Math.floor(Math.random() * levels.length)],
        duration: '2 semaines',
        cpfEligible: true
      };
    });
  }

  // Generate 50 detailed CPF questions
  generateCPFQuestions(): CPFQuestion[] {
    return [
      {
        id: 'profil_1',
        category: 'profil',
        question: 'Décrivez en détail votre situation professionnelle actuelle, en précisant votre poste, vos responsabilités principales, la taille de votre entreprise, votre secteur d\'activité, et votre ancienneté dans ce poste.',
        type: 'textarea',
        required: true,
        placeholder: 'Ex: Je suis actuellement responsable marketing dans une PME de 50 salariés...',
        validation: { minLength: 100, maxLength: 1000 }
      },
      {
        id: 'objectifs_1',
        category: 'objectifs',
        question: 'Décrivez précisément votre projet professionnel à court terme (6-12 mois) : quel poste visez-vous, dans quel secteur, avec quelles responsabilités ?',
        type: 'textarea',
        required: true,
        validation: { minLength: 150, maxLength: 800 }
      }
      // Additional 48 questions would be added here...
    ];
  }

  private generateFrenchPhone(): string {
    const prefixes = ['01', '02', '03', '04', '05', '06', '07'];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const numbers = Array.from({ length: 4 }, () => 
      Math.floor(Math.random() * 100).toString().padStart(2, '0')
    ).join(' ');
    return `${prefix} ${numbers}`;
  }

  // Initialize data in localStorage
  initializeData(): void {
    if (!localStorage.getItem(this.STORAGE_KEYS.USERS)) {
      localStorage.setItem(this.STORAGE_KEYS.USERS, JSON.stringify(this.generateMockUsers()));
    }
    if (!localStorage.getItem(this.STORAGE_KEYS.TRAININGS)) {
      localStorage.setItem(this.STORAGE_KEYS.TRAININGS, JSON.stringify(this.generateMockTrainings()));
    }
    if (!localStorage.getItem(this.STORAGE_KEYS.CPF_QUESTIONS)) {
      localStorage.setItem(this.STORAGE_KEYS.CPF_QUESTIONS, JSON.stringify(this.generateCPFQuestions()));
    }
  }

  getUsers(): User[] {
    const data = localStorage.getItem(this.STORAGE_KEYS.USERS);
    return data ? JSON.parse(data) : [];
  }

  getTrainings(): Training[] {
    const data = localStorage.getItem(this.STORAGE_KEYS.TRAININGS);
    return data ? JSON.parse(data) : [];
  }

  getCPFQuestions(): CPFQuestion[] {
    const data = localStorage.getItem(this.STORAGE_KEYS.CPF_QUESTIONS);
    return data ? JSON.parse(data) : [];
  }
}

export const mockDataService = new MockDataService();
