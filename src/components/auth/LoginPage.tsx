import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Eye, EyeOff } from 'react-feather';

// Import AuthContext from App.tsx instead of creating a duplicate
// const AuthContext = React.createContext<{
//   user: any;
//   login: (email: string, password: string) => Promise<boolean>;
// }>({ user: null, login: async () => false });

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Get auth context (this will work when integrated with main App)
  // const authContext = useContext(AuthContext);
  
  // Simple login function for demo
  const handleLogin = async (email: string, password: string) => {
    console.log('🔐 Tentative de connexion:', { email, password });
    console.log('🔍 Email exact:', `"${email}"`);
    console.log('🔍 Password exact:', `"${password}"`);
    
    // Trim whitespace and normalize
    const cleanEmail = email.trim();
    const cleanPassword = password.trim();
    
    console.log('🧹 Après nettoyage:', { cleanEmail, cleanPassword });
    
    if (cleanEmail === 'admin@formationg.fr' && cleanPassword === 'Admin@2022') {
      console.log('✅ Connexion admin réussie');
      localStorage.setItem('formation_g_user', JSON.stringify({
        email: cleanEmail,
        role: 'admin',
        name: 'Administrateur Formation G'
      }));
      return true;
    } else if (cleanEmail === 'user@formationg.fr' && cleanPassword === 'User@2022') {
      console.log('✅ Connexion utilisateur réussie');
      localStorage.setItem('formation_g_user', JSON.stringify({
        email: cleanEmail,
        role: 'user',
        name: 'Utilisateur Test'
      }));
      return true;
    }
    
    console.log('❌ Identifiants incorrects');
    console.log('Expected admin:', 'admin@formationg.fr', 'Admin@2022');
    console.log('Expected user:', 'user@formationg.fr', 'User@2022');
    return false;
  };

  // Check if already logged in and redirect accordingly
  useEffect(() => {
    const savedUser = localStorage.getItem('formation_g_user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      const redirectPath = user.role === 'admin' ? '/admin' : '/dashboard';
      // Small delay to ensure DOM is ready and avoid throttling
      setTimeout(() => {
        navigate(redirectPath, { replace: true });
      }, 50);
    }
  }, [navigate]); // Re-run if navigate changes (which it shouldn't, but for safety)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Direct authentication logic - simplified
      const success = await handleLogin(email, password);
      
      if (success) {
        // Success! The useEffect will handle redirection automatically
        // when it detects the updated localStorage
        console.log('🎉 Connexion réussie - redirection automatique en cours...');
      } else {
        setError('Identifiants incorrects');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Une erreur est survenue lors de la connexion');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background-light)' }}>
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold" style={{ color: 'var(--primary-blue)' }}>
              Formation G
            </h1>
            <span className="ml-2 text-sm text-gray-500">France 2022</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="card">
            <div className="card-body">
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" 
                     style={{ backgroundColor: 'var(--secondary-grey)' }}>
                  <LogIn className="w-8 h-8" style={{ color: 'var(--primary-blue)' }} />
                </div>
                <h2 className="text-2xl font-bold" style={{ color: 'var(--text-dark)' }}>
                  Connexion
                </h2>
                <p className="text-sm mt-2" style={{ color: 'var(--text-light)' }}>
                  Accédez à votre espace Formation G
                </p>
              </div>

              {error && (
                <div className="mb-6 p-4 rounded-lg" style={{ 
                  backgroundColor: 'rgba(245, 101, 101, 0.1)', 
                  color: 'var(--error-red)',
                  border: '1px solid rgba(245, 101, 101, 0.2)'
                }}>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Adresse email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                    placeholder="votre@email.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password" className="form-label">
                    Mot de passe
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-input pr-12"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-primary w-full"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Connexion...
                    </div>
                  ) : (
                    'Se connecter'
                  )}
                </button>
              </form>

              {/* Demo Credentials */}
              <div className="mt-8 pt-6 border-t" style={{ borderColor: 'var(--border-light)' }}>
                <h3 className="text-sm font-medium mb-3" style={{ color: 'var(--text-dark)' }}>
                  Comptes de démonstration :
                </h3>
                <div className="space-y-2 text-xs" style={{ color: 'var(--text-light)' }}>
                  <div className="p-2 rounded" style={{ backgroundColor: 'var(--secondary-grey)' }}>
                    <strong>Admin:</strong> admin@formationg.fr / Admin@2022
                  </div>
                  <div className="p-2 rounded" style={{ backgroundColor: 'var(--secondary-grey)' }}>
                    <strong>Utilisateur:</strong> user@formationg.fr / User@2022
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
