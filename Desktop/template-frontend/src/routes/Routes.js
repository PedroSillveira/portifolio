import { Routes, Route } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout.jsx';
import ProtectedRoute from '../components/protectRoute/ProtectRoute.jsx';

// Páginas de autenticação
import Login from '../pages/auth/login/Login.jsx';
import Register from '../pages/auth/register/Register.jsx';
import ForgotPassword from '../pages/auth/forgotPassword/ForgotPassword.jsx';
import ResetPassword from '../pages/auth/resetPassword/ResetPassword.jsx';

// Páginas principais
import Home from '../pages/home/Home.jsx';
import Profile from '../pages/profile/Profile.jsx';

export default function AppRoutes() {
  const menuItems = [
    { label: 'Perfil', path: '/profile' }
  ];

  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Rotas Protegidas */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout menuItems={menuItems} />
          </ProtectedRoute>
        }
      >
        <Route path="../pages/home/Home.jsx" element={<Home />} />
        <Route path="../pages/profile/Profile.jsx" element={<Profile />} />
      </Route>
    </Routes>
  );
}