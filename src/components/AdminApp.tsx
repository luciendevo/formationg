import React, { useState, useEffect } from 'react';
import { AdminLogin } from './admin/AdminLogin';
import { AdminLayout } from './admin/AdminLayout';
import { AdminDashboard } from './admin/AdminDashboard';
import { SubmissionsList } from './admin/SubmissionsList';
import { AdminUser } from '../types/admin';
import { adminService } from '../services/adminService';

// Composants temporaires pour les pages non encore implémentées
const UsersPage: React.FC = () => (
  <div className="text-center py-12">
    <h2 className="text-2xl font-bold text-gray-900 mb-4">Gestion des Utilisateurs</h2>
    <p className="text-gray-600">Cette page sera bientôt disponible</p>
  </div>
);

const SettingsPage: React.FC = () => (
  <div className="text-center py-12">
    <h2 className="text-2xl font-bold text-gray-900 mb-4">Paramètres</h2>
    <p className="text-gray-600">Cette page sera bientôt disponible</p>
  </div>
);

const ProfilePage: React.FC = () => (
  <div className="text-center py-12">
    <h2 className="text-2xl font-bold text-gray-900 mb-4">Mon Profil</h2>
    <p className="text-gray-600">Cette page sera bientôt disponible</p>
  </div>
);

// Composant modal pour voir les détails d'une soumission
const SubmissionDetailModal: React.FC<{
  submissionId: string;
  onClose: () => void;
}> = ({ submissionId, onClose }) => {
  const submission = adminService.getSubmissionById(submissionId);

  if (!submission) {
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Erreur</h3>
          <p className="text-gray-600">Soumission non trouvée</p>
          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    );
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'excellence': return 'Excellence Professionnelle';
      case 'optimisation': return 'Potentiel d\'Optimisation';
      case 'reflexion': return 'Moment de Réflexion';
      case 'nouveau_depart': return 'Nouveau Départ';
      default: return category;
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">
              Détails de la soumission
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Informations personnelles */}
          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-3">Informations personnelles</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Prénom</label>
                <p className="text-gray-900">{submission.firstName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Nom</label>
                <p className="text-gray-900">{submission.lastName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Email</label>
                <p className="text-gray-900">{submission.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Téléphone</label>
                <p className="text-gray-900">{submission.phone || 'Non renseigné'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Entreprise</label>
                <p className="text-gray-900">{submission.company || 'Non renseignée'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Poste</label>
                <p className="text-gray-900">{submission.position || 'Non renseigné'}</p>
              </div>
            </div>
          </div>

          {/* Résultats du test */}
          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-3">Résultats du test</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <label className="text-sm font-medium text-blue-600">Score total</label>
                <p className="text-2xl font-bold text-blue-900">{submission.testScore}/30</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <label className="text-sm font-medium text-green-600">Catégorie</label>
                <p className="text-green-900 font-medium">{getCategoryLabel(submission.testCategory)}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <label className="text-sm font-medium text-purple-600">Date de soumission</label>
                <p className="text-purple-900">{submission.submittedAt.toLocaleDateString('fr-FR')}</p>
              </div>
            </div>
          </div>

          {/* Détail des réponses */}
          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-3">Détail des réponses</h4>
            <div className="space-y-3">
              {submission.testAnswers.map((answer, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Question {index + 1}</span>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <div
                        key={star}
                        className={`w-4 h-4 rounded-full ${
                          star <= answer ? 'bg-amber-400' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-sm font-medium text-gray-900">{answer}/5</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          {submission.notes && (
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-3">Notes</h4>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <p className="text-gray-700">{submission.notes}</p>
              </div>
            </div>
          )}

          {/* Tags */}
          {submission.tags.length > 0 && (
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-3">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {submission.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Fermer
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Modifier
          </button>
        </div>
      </div>
    </div>
  );
};

export const AdminApp: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<string | null>(null);
  const [editingSubmissionId, setEditingSubmissionId] = useState<string | null>(null);

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté
    const user = adminService.getCurrentAdmin();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleLogin = (user: AdminUser) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('dashboard');
  };

  const handleViewSubmission = (id: string) => {
    setSelectedSubmissionId(id);
  };

  const handleEditSubmission = (id: string) => {
    setEditingSubmissionId(id);
    // TODO: Implémenter la modal d'édition
    console.log('Edit submission:', id);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'submissions':
        return (
          <SubmissionsList
            onViewSubmission={handleViewSubmission}
            onEditSubmission={handleEditSubmission}
          />
        );
      case 'users':
        return <UsersPage />;
      case 'settings':
        return <SettingsPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <AdminDashboard />;
    }
  };

  // Si l'utilisateur n'est pas connecté, afficher la page de connexion
  if (!currentUser) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <>
      <AdminLayout
        currentUser={currentUser}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onLogout={handleLogout}
      >
        {renderCurrentPage()}
      </AdminLayout>

      {/* Modal de détail de soumission */}
      {selectedSubmissionId && (
        <SubmissionDetailModal
          submissionId={selectedSubmissionId}
          onClose={() => setSelectedSubmissionId(null)}
        />
      )}
    </>
  );
};