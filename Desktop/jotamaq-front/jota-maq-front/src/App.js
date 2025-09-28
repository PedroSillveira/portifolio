// ============================================
// ARQUIVO: src/App.js
// SUBSTITUA todo o conteúdo atual por este
// ============================================

import React, { useState, useEffect } from 'react';
import AdminLogin from './pages/admin/Login';
import AdminLayout from './components/layout/AdminLayout'; // NOVO IMPORT
import { authService } from './config/api';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se já está logado ao carregar
    if (authService.isLoggedIn()) {
      setCurrentUser(authService.getCurrentUser());
    }
    setLoading(false);
  }, []);

  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
  };

  const handleLogout = () => {
    if (window.confirm('Tem certeza que deseja sair?')) {
      authService.logout();
      setCurrentUser(null);
    }
  };

  // Tela de loading inicial
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando aplicação...</p>
        </div>
      </div>
    );
  }

  // Se logado, mostrar layout admin; senão, mostrar login
  return currentUser ? (
    <AdminLayout user={currentUser} onLogout={handleLogout} />
  ) : (
    <AdminLogin onLoginSuccess={handleLoginSuccess} />
  );
};

export default App;