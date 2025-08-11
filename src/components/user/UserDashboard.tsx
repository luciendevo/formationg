import React, { useState, useEffect } from 'react';
import { FileText, BookOpen, Clock, CheckCircle, AlertCircle, TrendingUp } from 'react-feather';
import { mockDataService } from '../../services/mockDataService';
import { User, Training, CPFSubmission } from '../../types/formationG';

const UserDashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [cpfProgress, setCpfProgress] = useState(0);

  useEffect(() => {
    // Get current user from localStorage
    const savedUser = localStorage.getItem('formation_g_user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      
      // Find user in mock data
      const users = mockDataService.getUsers();
      const foundUser = users.find(u => u.email === userData.email);
      if (foundUser) {
        setUser(foundUser);
        setCpfProgress(foundUser.cpfFormProgress || 0);
      }
    }

    // Get trainings
    const allTrainings = mockDataService.getTrainings();
    setTrainings(allTrainings.slice(0, 3)); // Show first 3 trainings
  }, []);

  const stats = [
    {
      title: 'Formulaire CPF',
      value: `${cpfProgress}%`,
      icon: FileText,
      color: 'var(--primary-blue)',
      bgColor: 'rgba(47, 128, 237, 0.1)'
    },
    {
      title: 'Formations disponibles',
      value: '50+',
      icon: BookOpen,
      color: 'var(--success-green)',
      bgColor: 'rgba(72, 187, 120, 0.1)'
    },
    {
      title: 'Statut dossier',
      value: user?.status === 'nouveau' ? 'Nouveau' : 'En cours',
      icon: user?.status === 'nouveau' ? Clock : CheckCircle,
      color: user?.status === 'nouveau' ? 'var(--warning-yellow)' : 'var(--success-green)',
      bgColor: user?.status === 'nouveau' ? 'rgba(237, 137, 54, 0.1)' : 'rgba(72, 187, 120, 0.1)'
    }
  ];

  return (
    <div className="animate-fadeIn">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-dark)' }}>
          Bonjour {user?.firstName || 'Utilisateur'} ! 👋
        </h1>
        <p className="text-lg" style={{ color: 'var(--text-light)' }}>
          Bienvenue sur votre espace Formation G. Suivez vos formations et gérez votre dossier CPF.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card">
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium" style={{ color: 'var(--text-light)' }}>
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold mt-1" style={{ color: 'var(--text-dark)' }}>
                      {stat.value}
                    </p>
                  </div>
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: stat.bgColor }}
                  >
                    <Icon className="w-6 h-6" style={{ color: stat.color }} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* CPF Form Progress */}
        <div className="card">
          <div className="card-body">
            <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-dark)' }}>
              Formulaire CPF
            </h3>
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span style={{ color: 'var(--text-light)' }}>Progression</span>
                <span style={{ color: 'var(--text-dark)' }}>{cpfProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${cpfProgress}%`,
                    backgroundColor: 'var(--primary-blue)'
                  }}
                />
              </div>
            </div>
            <p className="text-sm mb-4" style={{ color: 'var(--text-light)' }}>
              {cpfProgress === 100 
                ? 'Formulaire terminé ! Nous traiterons votre dossier sous 48h.'
                : `Il vous reste ${Math.ceil((100 - cpfProgress) / 2)} questions à compléter.`
              }
            </p>
            <button className="btn btn-primary">
              {cpfProgress === 100 ? 'Voir mon dossier' : 'Continuer le formulaire'}
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <div className="card-body">
            <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-dark)' }}>
              Activité récente
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 rounded-lg" style={{ backgroundColor: 'var(--secondary-grey)' }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--primary-blue)' }}>
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium" style={{ color: 'var(--text-dark)' }}>
                    Formulaire CPF mis à jour
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-light)' }}>
                    Il y a 2 heures
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 rounded-lg" style={{ backgroundColor: 'var(--secondary-grey)' }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--success-green)' }}>
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium" style={{ color: 'var(--text-dark)' }}>
                    Compte créé avec succès
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-light)' }}>
                    {user?.registrationDate ? new Date(user.registrationDate).toLocaleDateString('fr-FR') : 'Récemment'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Available Trainings */}
      <div className="card">
        <div className="card-body">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold" style={{ color: 'var(--text-dark)' }}>
              Formations recommandées
            </h3>
            <button className="btn btn-outline">
              Voir toutes les formations
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trainings.map((training) => (
              <div key={training.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow" style={{ borderColor: 'var(--border-light)' }}>
                <div className="flex items-center justify-between mb-3">
                  <span className="badge badge-info">
                    {training.category}
                  </span>
                  <span className="text-sm" style={{ color: 'var(--text-light)' }}>
                    {training.duration}
                  </span>
                </div>
                
                <h4 className="font-semibold mb-2" style={{ color: 'var(--text-dark)' }}>
                  {training.name}
                </h4>
                
                <p className="text-sm mb-3" style={{ color: 'var(--text-light)' }}>
                  {training.city} • {training.startDate.toLocaleDateString('fr-FR')}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold" style={{ color: 'var(--primary-blue)' }}>
                    {training.price}€
                  </span>
                  <button className="btn btn-primary btn-sm">
                    En savoir plus
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
