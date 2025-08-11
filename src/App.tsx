import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Home, Users, BookOpen, BarChart, Settings, User, FileText, Award, Target, Briefcase } from 'react-feather';
import { mockDataService } from './services/mockDataService';
import { AuthUser } from './types/formationG';

// Components
import LoginPage from './components/auth/LoginPage';
import AdminDashboard from './components/admin/AdminDashboard';
import UserDashboard from './components/user/UserDashboard';
import LandingPage from './components/landing/LandingPage';
import CPFForm from './components/forms/CPFForm';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';

// Authentication context
const AuthContext = React.createContext<{
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}>({ user: null, login: async () => false, logout: () => {} });

// Auth Provider Component
const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('formation_g_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    if (email === 'admin@formationg.fr' && password === 'Admin@2022') {
      const adminUser: AuthUser = {
        email,
        role: 'admin',
        name: 'Administrateur Formation G'
      };
      setUser(adminUser);
      localStorage.setItem('formation_g_user', JSON.stringify(adminUser));
      return true;
    } else if (email === 'user@formationg.fr' && password === 'User@2022') {
      const normalUser: AuthUser = {
        email,
        role: 'user',
        name: 'Utilisateur Test'
      };
      setUser(normalUser);
      localStorage.setItem('formation_g_user', JSON.stringify(normalUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('formation_g_user');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode; requiredRole?: 'admin' | 'user' }> = ({ 
  children, 
  requiredRole 
}) => {
  const { user } = React.useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} replace />;
  }

  return <>{children}</>;
};

// Main Layout Component
const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = React.useContext(AuthContext);
  
  if (!user) {
    return <>{children}</>;
  }

  return (
    <div className="saas-layout">
      <Sidebar />
      <div className="saas-main">
        <Header />
        <div className="saas-content">
          {children}
        </div>
      </div>
    </div>
  );
};

function App() {
  useEffect(() => {
    // Initialize mock data
    mockDataService.initializeData();
  }, []);

  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/landing/:pageId" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute requiredRole="user">
                <MainLayout>
                  <UserDashboard />
                </MainLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/cpf-form" element={
              <ProtectedRoute requiredRole="user">
                <MainLayout>
                  <CPFForm />
                </MainLayout>
              </ProtectedRoute>
            } />
            
            {/* Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute requiredRole="admin">
                <MainLayout>
                  <AdminDashboard />
                </MainLayout>
              </ProtectedRoute>
            } />
            
            {/* Redirect based on user role */}
            <Route path="/app" element={
              <ProtectedRoute>
                <Navigate to="/dashboard" replace />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;