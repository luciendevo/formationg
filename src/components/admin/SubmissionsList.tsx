import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Calendar,
  User,
  Building2,
  Mail,
  Phone,
  Star,
  Clock,
  CheckCircle,
  Archive,
  AlertCircle
} from 'lucide-react';
import { adminService } from '../../services/adminService';
import { FormSubmission, AdminFilters } from '../../types/admin';

interface SubmissionsListProps {
  onViewSubmission: (id: string) => void;
  onEditSubmission: (id: string) => void;
}

export const SubmissionsList: React.FC<SubmissionsListProps> = ({
  onViewSubmission,
  onEditSubmission
}) => {
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<FormSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSubmissions, setSelectedSubmissions] = useState<string[]>([]);
  
  const [filters, setFilters] = useState<AdminFilters>({
    search: '',
    status: '',
    category: '',
    dateFrom: undefined,
    dateTo: undefined,
    assignedTo: '',
    tags: []
  });

  useEffect(() => {
    loadSubmissions();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [submissions, filters]);

  const loadSubmissions = async () => {
    setIsLoading(true);
    try {
      const data = adminService.getSubmissions();
      setSubmissions(data);
    } catch (error) {
      console.error('Erreur lors du chargement des soumissions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    const filtered = adminService.filterSubmissions(filters);
    setFilteredSubmissions(filtered);
  };

  const handleFilterChange = (key: keyof AdminFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      status: '',
      category: '',
      dateFrom: undefined,
      dateTo: undefined,
      assignedTo: '',
      tags: []
    });
  };

  const handleSelectSubmission = (id: string) => {
    setSelectedSubmissions(prev => 
      prev.includes(id) 
        ? prev.filter(sid => sid !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedSubmissions.length === filteredSubmissions.length) {
      setSelectedSubmissions([]);
    } else {
      setSelectedSubmissions(filteredSubmissions.map(s => s.id));
    }
  };

  const handleBulkStatusUpdate = async (newStatus: FormSubmission['status']) => {
    try {
      for (const id of selectedSubmissions) {
        await adminService.updateSubmission(id, { status: newStatus });
      }
      loadSubmissions();
      setSelectedSubmissions([]);
    } catch (error) {
      console.error('Erreur lors de la mise à jour en lot:', error);
    }
  };

  const handleDeleteSubmission = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette soumission ?')) {
      try {
        await adminService.deleteSubmission(id);
        loadSubmissions();
        setSelectedSubmissions(prev => prev.filter(sid => sid !== id));
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
      }
    }
  };

  const handleExport = async (format: 'csv' | 'xlsx') => {
    try {
      const dataToExport = selectedSubmissions.length > 0 
        ? filteredSubmissions.filter(s => selectedSubmissions.includes(s.id))
        : filteredSubmissions;
      
      const exportUrl = await adminService.exportData({ format, submissions: dataToExport });
      
      // Créer un lien de téléchargement
      const link = document.createElement('a');
      link.href = exportUrl;
      link.download = `submissions_${new Date().toISOString().split('T')[0]}.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Erreur lors de l\'export:', error);
    }
  };

  const getStatusIcon = (status: FormSubmission['status']) => {
    switch (status) {
      case 'nouveau': return <AlertCircle className="w-4 h-4 text-orange-500" />;
      case 'en_cours': return <Clock className="w-4 h-4 text-blue-500" />;
      case 'traite': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'archive': return <Archive className="w-4 h-4 text-gray-500" />;
      default: return null;
    }
  };

  const getStatusLabel = (status: FormSubmission['status']) => {
    switch (status) {
      case 'nouveau': return 'Nouveau';
      case 'en_cours': return 'En cours';
      case 'traite': return 'Traité';
      case 'archive': return 'Archivé';
      default: return status;
    }
  };

  const getCategoryLabel = (category: FormSubmission['testCategory']) => {
    switch (category) {
      case 'excellence': return 'Excellence';
      case 'optimisation': return 'Optimisation';
      case 'reflexion': return 'Réflexion';
      case 'nouveau_depart': return 'Nouveau Départ';
      default: return category;
    }
  };

  const getCategoryColor = (category: FormSubmission['testCategory']) => {
    switch (category) {
      case 'excellence': return 'bg-emerald-100 text-emerald-800';
      case 'optimisation': return 'bg-blue-100 text-blue-800';
      case 'reflexion': return 'bg-amber-100 text-amber-800';
      case 'nouveau_depart': return 'bg-rose-100 text-rose-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-gray-600">Chargement des soumissions...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Soumissions</h1>
          <p className="text-gray-600">
            {filteredSubmissions.length} soumission{filteredSubmissions.length !== 1 ? 's' : ''} 
            {filteredSubmissions.length !== submissions.length && ` sur ${submissions.length}`}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span>Filtres</span>
          </button>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleExport('csv')}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">CSV</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Recherche</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Nom, email, entreprise..."
                  value={filters.search || ''}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
              <select
                value={filters.status || ''}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Tous les statuts</option>
                <option value="nouveau">Nouveau</option>
                <option value="en_cours">En cours</option>
                <option value="traite">Traité</option>
                <option value="archive">Archivé</option>
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
              <select
                value={filters.category || ''}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Toutes les catégories</option>
                <option value="excellence">Excellence</option>
                <option value="optimisation">Optimisation</option>
                <option value="reflexion">Réflexion</option>
                <option value="nouveau_depart">Nouveau Départ</option>
              </select>
            </div>

            {/* Date Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Période</label>
              <input
                type="date"
                value={filters.dateFrom?.toISOString().split('T')[0] || ''}
                onChange={(e) => handleFilterChange('dateFrom', e.target.value ? new Date(e.target.value) : undefined)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Effacer les filtres
            </button>
          </div>
        </div>
      )}

      {/* Bulk Actions */}
      {selectedSubmissions.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-blue-800 font-medium">
              {selectedSubmissions.length} soumission{selectedSubmissions.length !== 1 ? 's' : ''} sélectionnée{selectedSubmissions.length !== 1 ? 's' : ''}
            </span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleBulkStatusUpdate('en_cours')}
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
              >
                Marquer en cours
              </button>
              <button
                onClick={() => handleBulkStatusUpdate('traite')}
                className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
              >
                Marquer traité
              </button>
              <button
                onClick={() => setSelectedSubmissions([])}
                className="px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Submissions Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="w-12 px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedSubmissions.length === filteredSubmissions.length && filteredSubmissions.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Candidat
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Entreprise
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Catégorie
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSubmissions.map((submission) => (
                <tr key={submission.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedSubmissions.includes(submission.id)}
                      onChange={() => handleSelectSubmission(submission.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-medium text-sm mr-3">
                        {submission.firstName[0]}{submission.lastName[0]}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {submission.firstName} {submission.lastName}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Mail className="w-3 h-3 mr-1" />
                          {submission.email}
                        </div>
                        {submission.phone && (
                          <div className="text-sm text-gray-500 flex items-center">
                            <Phone className="w-3 h-3 mr-1" />
                            {submission.phone}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    {submission.company ? (
                      <div>
                        <div className="font-medium text-gray-900 flex items-center">
                          <Building2 className="w-4 h-4 mr-1 text-gray-400" />
                          {submission.company}
                        </div>
                        {submission.position && (
                          <div className="text-sm text-gray-500">{submission.position}</div>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-amber-400 mr-1" />
                      <span className="font-medium">{submission.testScore}/30</span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(submission.testCategory)}`}>
                      {getCategoryLabel(submission.testCategory)}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {getStatusIcon(submission.status)}
                      <span className="ml-2 text-sm font-medium text-gray-900">
                        {getStatusLabel(submission.status)}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {submission.submittedAt.toLocaleDateString('fr-FR')}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => onViewSubmission(submission.id)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Voir les détails"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onEditSubmission(submission.id)}
                        className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Modifier"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteSubmission(submission.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredSubmissions.length === 0 && (
          <div className="text-center py-12">
            <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Aucune soumission trouvée</p>
            {Object.values(filters).some(v => v && (Array.isArray(v) ? v.length > 0 : true)) && (
              <button
                onClick={clearFilters}
                className="mt-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                Effacer les filtres
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};