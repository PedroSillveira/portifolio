import React, { useState, useEffect } from 'react';
import { Button, Input, Card } from '../../components/ui/Index';
import { authService } from '../../config/api';

const AdminLogin = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({ user: '', pass: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Verificar se já está logado
  useEffect(() => {
    if (authService.isLoggedIn()) {
      onLoginSuccess(authService.getCurrentUser());
    }
  }, [onLoginSuccess]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.user.trim()) newErrors.user = 'Usuário é obrigatório';
    if (!formData.pass.trim()) newErrors.pass = 'Senha é obrigatória';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    setLoginError('');
    if (!validateForm()) return;

    setLoading(true);
    try {
      const result = await authService.loginAdmin(formData.user, formData.pass);
      
      if (result.success) {
        localStorage.setItem('admin_token', result.token);
        localStorage.setItem('admin_user', JSON.stringify(result.data));
        onLoginSuccess(result.data);
      } else {
        setLoginError(result.message);
      }
    } catch (error) {
      setLoginError('Erro de conexão. Verifique se o backend está rodando na porta 4444.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Card className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Ecommerce João</h1>
            <p className="text-gray-600 mt-2">Painel Administrativo</p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {loginError}
            </div>
          )}

          <div className="space-y-4">
            <Input
              label="Usuário"
              value={formData.user}
              onChange={(e) => handleInputChange('user', e.target.value)}
              error={errors.user}
              required
              disabled={loading}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            />

            <Input
              label="Senha"
              type="password"
              value={formData.pass}
              onChange={(e) => handleInputChange('pass', e.target.value)}
              error={errors.pass}
              required
              disabled={loading}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            />

            <Button
              variant="primary"
              className="w-full"
              loading={loading}
              onClick={handleSubmit}
            >
              Entrar
            </Button>
          </div>

          <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded">
            <p className="text-xs text-blue-600">
              <strong>💡 Para testar:</strong> Use as credenciais do seu banco de dados.
              Backend deve estar rodando na porta 4444.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;