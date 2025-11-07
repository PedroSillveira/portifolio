import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { authService } from '../services/authService';
import Loading from './common/Loading';

export default function ProtectedRoute({ children }) {
  const [authState, setAuthState] = useState({
    loading: true,
    isAuthenticated: false
  });

  useEffect(() => {
    const validateAuth = async () => {
      try {
        const userData = await authService.verifyToken();
        
        if (userData) {
          setAuthState({
            loading: false,
            isAuthenticated: true
          });
        } else {
          setAuthState({
            loading: false,
            isAuthenticated: false
          });
        }
      } catch (error) {
        console.error('Erro ao validar autenticação:', error);
        setAuthState({
          loading: false,
          isAuthenticated: false
        });
      }
    };

    validateAuth();
  }, []);

  if (authState.loading) {
    return <Loading fullScreen />;
  }

  if (!authState.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}