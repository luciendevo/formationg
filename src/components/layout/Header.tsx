import React from 'react';
import { Bell, Search, Settings } from 'react-feather';

const Header: React.FC = () => {
  // Get user from localStorage for demo
  const savedUser = localStorage.getItem('formation_g_user');
  const user = savedUser ? JSON.parse(savedUser) : null;

  if (!user) return null;

  return (
    <div className="saas-header">
      <div className="flex items-center justify-between w-full">
        {/* Page Title */}
        <div>
          <h1 className="text-xl font-semibold" style={{ color: 'var(--text-dark)' }}>
            {user.role === 'admin' ? 'Administration' : 'Mon espace'}
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-light)' }}>
            {user.role === 'admin' 
              ? 'Gérez vos utilisateurs et formations' 
              : 'Suivez vos formations et dossiers CPF'
            }
          </p>
        </div>

        {/* Right side actions */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" 
                    style={{ color: 'var(--text-light)' }} />
            <input
              type="text"
              placeholder="Rechercher..."
              className="pl-10 pr-4 py-2 border rounded-lg text-sm w-64 focus:outline-none focus:ring-2"
              style={{ 
                borderColor: 'var(--border-light)',
                backgroundColor: 'var(--background-white)'
              }}
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Bell className="w-5 h-5" style={{ color: 'var(--text-light)' }} />
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full text-xs flex items-center justify-center"
                  style={{ backgroundColor: 'var(--error-red)', color: 'white' }}>
              3
            </span>
          </button>

          {/* Settings */}
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Settings className="w-5 h-5" style={{ color: 'var(--text-light)' }} />
          </button>

          {/* User Avatar */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium text-white"
                 style={{ backgroundColor: 'var(--primary-blue)' }}>
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
