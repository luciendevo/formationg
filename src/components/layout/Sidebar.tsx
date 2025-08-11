import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Users, 
  BookOpen, 
  BarChart, 
  Settings, 
  User, 
  FileText, 
  Award,
  LogOut
} from 'react-feather';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get user from localStorage for demo
  const savedUser = localStorage.getItem('formation_g_user');
  const user = savedUser ? JSON.parse(savedUser) : null;
  
  const handleLogout = () => {
    localStorage.removeItem('formation_g_user');
    // Use React Router navigation for SPA consistency
    navigate('/login', { replace: true });
  };

  // Admin navigation items
  const adminNavItems = [
    { path: '/admin', icon: BarChart, label: 'Tableau de bord' },
    { path: '/admin/users', icon: Users, label: 'Utilisateurs' },
    { path: '/admin/trainings', icon: BookOpen, label: 'Formations' },
    { path: '/admin/cpf', icon: FileText, label: 'Dossiers CPF' },
    { path: '/admin/settings', icon: Settings, label: 'Paramètres' }
  ];

  // User navigation items
  const userNavItems = [
    { path: '/dashboard', icon: Home, label: 'Accueil' },
    { path: '/cpf-form', icon: FileText, label: 'Formulaire CPF' },
    { path: '/trainings', icon: BookOpen, label: 'Mes formations' },
    { path: '/profile', icon: User, label: 'Mon profil' }
  ];

  const navItems = user?.role === 'admin' ? adminNavItems : userNavItems;

  if (!user) return null;

  return (
    <div className="saas-sidebar">
      {/* Logo */}
      <div className="p-6 border-b" style={{ borderColor: 'var(--border-light)' }}>
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center mr-3" 
               style={{ backgroundColor: 'var(--primary-blue)' }}>
            <Award className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold" style={{ color: 'var(--text-dark)' }}>
              Formation G
            </h1>
            <p className="text-xs" style={{ color: 'var(--text-light)' }}>
              France 2022
            </p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b" style={{ borderColor: 'var(--border-light)' }}>
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3" 
               style={{ backgroundColor: 'var(--secondary-grey)' }}>
            <User className="w-5 h-5" style={{ color: 'var(--primary-blue)' }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate" style={{ color: 'var(--text-dark)' }}>
              {user.name}
            </p>
            <p className="text-xs truncate" style={{ color: 'var(--text-light)' }}>
              {user.role === 'admin' ? 'Administrateur' : 'Utilisateur'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-item ${isActive ? 'active' : ''}`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t" style={{ borderColor: 'var(--border-light)' }}>
        <button
          onClick={handleLogout}
          className="nav-item w-full text-left hover:bg-red-50 hover:text-red-600"
        >
          <LogOut className="w-5 h-5" />
          <span>Déconnexion</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
