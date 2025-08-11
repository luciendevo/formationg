import React, { useState, useEffect } from 'react';
import { 
  Users, 
  BookOpen, 
  FileText, 
  TrendingUp, 
  Award,
  BarChart,
  Calendar,
  Download,
  Eye,
  Edit,
  Trash2,
  Clock,
  CheckCircle,
  Star
} from 'react-feather';
import { mockDataService } from '../../services/mockDataService';
import { User, Training } from '../../types/formationG';

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [recentUsers, setRecentUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load data from mock service
        const allUsers = mockDataService.getUsers();
        const allTrainings = mockDataService.getTrainings();
        
        setUsers(allUsers);
        setTrainings(allTrainings);
        
        // Get recent users (last 10)
        const recent = allUsers
          .sort((a, b) => new Date(b.registrationDate).getTime() - new Date(a.registrationDate).getTime())
          .slice(0, 10);
        setRecentUsers(recent);
        
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <span style={{ color: 'var(--text-light)' }}>Chargement des données...</span>
        </div>
      </div>
    );
  }

  // Calculate stats from data
  const totalUsers = users.length;
  const totalTrainings = trainings.length;
  const activeUsers = users.filter(u => u.status === 'active').length;
  const completedTrainings = users.reduce((acc, user) => acc + user.completedTrainings, 0);

  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-dark)' }}>
          Tableau de Bord Admin
        </h1>
        <p style={{ color: 'var(--text-light)' }}>
          Vue d'ensemble de la plateforme Formation G
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Users */}
        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-light)' }}>
                  Total Utilisateurs
                </p>
                <p className="text-3xl font-bold" style={{ color: 'var(--text-dark)' }}>
                  {totalUsers}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" 
                   style={{ backgroundColor: 'var(--primary-blue)' }}>
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Active Users */}
        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-light)' }}>
                  Utilisateurs Actifs
                </p>
                <p className="text-3xl font-bold" style={{ color: 'var(--text-dark)' }}>
                  {activeUsers}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" 
                   style={{ backgroundColor: 'var(--success-green)' }}>
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Total Trainings */}
        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-light)' }}>
                  Formations Disponibles
                </p>
                <p className="text-3xl font-bold" style={{ color: 'var(--text-dark)' }}>
                  {totalTrainings}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" 
                   style={{ backgroundColor: 'var(--warning-yellow)' }}>
                <BookOpen className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Completed Trainings */}
        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-light)' }}>
                  Formations Terminées
                </p>
                <p className="text-3xl font-bold" style={{ color: 'var(--text-dark)' }}>
                  {completedTrainings}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" 
                   style={{ backgroundColor: 'var(--accent-orange)' }}>
                <Award className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Users */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold flex items-center">
              <Users className="w-5 h-5 mr-2" style={{ color: 'var(--primary-blue)' }} />
              Utilisateurs Récents
            </h3>
          </div>
          <div className="card-body">
            <div className="space-y-4">
              {recentUsers.slice(0, 5).map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 rounded-lg" 
                     style={{ backgroundColor: 'var(--background-light)' }}>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                         style={{ backgroundColor: 'var(--primary-blue)' }}>
                      <span className="text-white font-medium">
                        {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium" style={{ color: 'var(--text-dark)' }}>
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-sm" style={{ color: 'var(--text-light)' }}>
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`badge ${user.status === 'active' ? 'badge-success' : 'badge-secondary'}`}>
                      {user.status === 'active' ? 'Actif' : 'Inactif'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="card-footer">
            <button className="btn btn-outline w-full">
              <Eye className="w-4 h-4 mr-2" />
              Voir tous les utilisateurs
            </button>
          </div>
        </div>

        {/* Popular Trainings */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold flex items-center">
              <BookOpen className="w-5 h-5 mr-2" style={{ color: 'var(--success-green)' }} />
              Formations Populaires
            </h3>
          </div>
          <div className="card-body">
            <div className="space-y-4">
              {trainings.slice(0, 5).map((training) => (
                <div key={training.id} className="flex items-center justify-between p-3 rounded-lg" 
                     style={{ backgroundColor: 'var(--background-light)' }}>
                  <div>
                    <p className="font-medium mb-1" style={{ color: 'var(--text-dark)' }}>
                      {training.title}
                    </p>
                    <p className="text-sm" style={{ color: 'var(--text-light)' }}>
                      {training.category} • {training.duration}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 mb-1">
                      <Star className="w-4 h-4" style={{ color: 'var(--warning-yellow)' }} />
                      <span className="text-sm font-medium" style={{ color: 'var(--text-dark)' }}>
                        {training.rating}
                      </span>
                    </div>
                    <p className="text-xs" style={{ color: 'var(--text-light)' }}>
                      {training.enrolledCount} inscrits
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="card-footer">
            <button className="btn btn-outline w-full">
              <BookOpen className="w-4 h-4 mr-2" />
              Gérer les formations
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" style={{ color: 'var(--accent-orange)' }} />
              Actions Rapides
            </h3>
          </div>
          <div className="card-body">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="btn btn-primary flex items-center justify-center">
                <Users className="w-4 h-4 mr-2" />
                Ajouter un utilisateur
              </button>
              
              <button className="btn btn-secondary flex items-center justify-center">
                <BookOpen className="w-4 h-4 mr-2" />
                Créer une formation
              </button>
              
              <button className="btn btn-outline flex items-center justify-center">
                <Download className="w-4 h-4 mr-2" />
                Exporter les données
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'excellence': return 'Excellence Professionnelle';
      case 'optimisation': return 'Potentiel d\'Optimisation';
      case 'reflexion': return 'Moment de Réflexion';
      case 'nouveau_depart': return 'Nouveau Départ';
      default: return category;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'excellence': return 'from-emerald-500 to-teal-600';
      case 'optimisation': return 'from-blue-500 to-indigo-600';
      case 'reflexion': return 'from-amber-500 to-orange-600';
      case 'nouveau_depart': return 'from-rose-500 to-pink-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Tableau de Bord</h1>
        <p className="text-gray-600">Vue d'ensemble des soumissions et statistiques</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Submissions */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Soumissions</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalSubmissions}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* New Submissions */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Nouvelles (30j)</p>
              <p className="text-3xl font-bold text-gray-900">{stats.newSubmissions}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Processed Submissions */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Traitées</p>
              <p className="text-3xl font-bold text-gray-900">{stats.processedSubmissions}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Average Score */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Score Moyen</p>
              <p className="text-3xl font-bold text-gray-900">{stats.averageScore}/30</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Submissions by Category */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <BarChart className="w-5 h-5 mr-2 text-blue-600" />
            Répartition par Catégorie
          </h3>
          <div className="space-y-4">
            {Object.entries(stats.submissionsByCategory).map(([category, count]) => {
              const percentage = (count / stats.totalSubmissions) * 100;
              return (
                <div key={category}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      {getCategoryLabel(category)}
                    </span>
                    <span className="text-sm text-gray-500">{count} ({percentage.toFixed(1)}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full bg-gradient-to-r ${getCategoryColor(category)}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Submissions by Month */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-green-600" />
            Évolution Mensuelle
          </h3>
          <div className="space-y-4">
            {stats.submissionsByMonth.map((item, index) => {
              const maxCount = Math.max(...stats.submissionsByMonth.map(m => m.count));
              const percentage = (item.count / maxCount) * 100;
              return (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{item.month}</span>
                    <span className="text-sm text-gray-500">{item.count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-600"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top Companies */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Building2 className="w-5 h-5 mr-2 text-purple-600" />
          Top Entreprises
        </h3>
        {stats.topCompanies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {stats.topCompanies.map((company, index) => (
              <div key={company.company} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-2 text-white font-bold text-sm">
                  {index + 1}
                </div>
                <p className="font-medium text-gray-900 text-sm">{company.company}</p>
                <p className="text-xs text-gray-500">{company.count} soumissions</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">Aucune donnée d'entreprise disponible</p>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
          Actions Rapides
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h4 className="font-medium text-gray-900 mb-2">Nouvelles Soumissions</h4>
            <p className="text-sm text-gray-600 mb-3">
              {stats.newSubmissions} nouvelles soumissions nécessitent votre attention
            </p>
            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
              Voir les détails →
            </button>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h4 className="font-medium text-gray-900 mb-2">Suivi Requis</h4>
            <p className="text-sm text-gray-600 mb-3">
              Plusieurs candidats nécessitent un suivi personnalisé
            </p>
            <button className="text-green-600 hover:text-green-700 font-medium text-sm">
              Gérer le suivi →
            </button>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h4 className="font-medium text-gray-900 mb-2">Rapports</h4>
            <p className="text-sm text-gray-600 mb-3">
              Générer des rapports détaillés pour l'analyse
            </p>
            <button className="text-purple-600 hover:text-purple-700 font-medium text-sm">
              Créer un rapport →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;