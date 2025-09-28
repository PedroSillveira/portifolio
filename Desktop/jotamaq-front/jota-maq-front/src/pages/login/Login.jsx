import React, { useState } from 'react';

// ============================================
// COMPONENTES BASE (iguais aos anteriores)
// ============================================

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'base', 
  loading = false, 
  disabled = false, 
  onClick,
  type = 'button',
  className = '',
  ...props 
}) => {
  const baseClass = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 cursor-pointer border-none gap-2';
  
  const variants = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500',
    secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-gray-500',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    base: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };
  
  const disabledClass = disabled || loading ? 'opacity-60 cursor-not-allowed' : '';
  const focusClass = 'focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  return (
    <button
      type={type}
      className={`${baseClass} ${variants[variant]} ${sizes[size]} ${focusClass} ${disabledClass} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
          Carregando...
        </>
      ) : children}
    </button>
  );
};

const Input = ({ 
  label, 
  error, 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  required = false,
  disabled = false,
  className = '',
  ...props 
}) => {
  const inputClass = `w-full px-3 py-2 border rounded-lg transition-colors duration-200 
    ${error 
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
    } 
    focus:outline-none focus:ring-2 focus:ring-opacity-20
    ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={inputClass}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>
      {children}
    </div>
  );
};

// ============================================
// SERVIÇO DE AUTENTICAÇÃO SIMPLIFICADO
// ============================================

const authService = {
  loginAdmin: async (user, pass) => {
    // Simulação da API - substitua pela sua URL
    try {
      const API_URL = 'http://localhost:4444';
      
      // Codificar dados como o backend espera
      const payload = btoa(JSON.stringify({ user, pass }));
      
      const response = await fetch(`${API_URL}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ payload })
      });

      if (!response.ok) {
        throw new Error('Erro na requisição');
      }

      const data = await response.json();
      
      // Decodificar resposta do backend
      if (data.payload) {
        const base64Url = data.payload.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
        const decoded = JSON.parse(jsonPayload);
        
        if (decoded.boleano) {
          // Salvar token no localStorage
          localStorage.setItem('admin_token', data.payload);
          localStorage.setItem('admin_user', JSON.stringify(decoded.obj));
          
          return { 
            success: true, 
            data: decoded.obj, 
            message: decoded.mensagem 
          };
        }
        
        return { 
          success: false, 
          message: decoded.mensagem || 'Credenciais inválidas' 
        };
      }
      
      return { success: false, message: 'Resposta inválida do servidor' };
      
    } catch (error) {
      console.error('Erro no login:', error);
      return { 
        success: false, 
        message: 'Erro de conexão com o servidor' 
      };
    }
  },

  logout: () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
  },

  isLoggedIn: () => {
    return !!localStorage.getItem('admin_token');
  },

  getCurrentUser: () => {
    const userData = localStorage.getItem('admin_user');
    return userData ? JSON.parse(userData) : null;
  }
};

// ============================================
// COMPONENTE DE RECUPERAÇÃO DE SENHA
// ============================================

const ForgotPasswordForm = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setMessage('');

    if (!email) {
      setError('Email é obrigatório');
      setLoading(false);
      return;
    }

    try {
      // Aqui você implementaria a chamada para recuperação de senha
      // const result = await authService.recuperarSenha(email, 'admin');
      
      // Simulação
      await new Promise(resolve => setTimeout(resolve, 2000));
      setMessage('Instruções enviadas para seu email!');
      
    } catch (error) {
      setError('Erro ao enviar email de recuperação');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Recuperar Senha</h2>
        <p className="text-gray-600 mt-2">
          Digite seu email para receber as instruções
        </p>
      </div>

      <div className="space-y-4">
        <Input
          label="Email"
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error}
          required
          onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
        />

        {message && (
          <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            {message}
          </div>
        )}

        <div className="space-y-3">
          <Button
            variant="primary"
            className="w-full"
            loading={loading}
            onClick={handleSubmit}
          >
            Enviar Instruções
          </Button>

          <Button
            variant="secondary"
            className="w-full"
            onClick={onBack}
          >
            Voltar ao Login
          </Button>
        </div>
      </div>
    </div>
  );
};

// ============================================
// DASHBOARD SIMPLES (APÓS LOGIN)
// ============================================

const AdminDashboard = ({ user, onLogout }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                Dashboard Admin - Ecommerce João
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Olá, <strong>{user.nome}</strong>
              </span>
              <Button variant="secondary" size="sm" onClick={onLogout}>
                Sair
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Cards de estatísticas */}
          <Card className="p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Total Produtos</p>
                <p className="text-2xl font-bold text-gray-900">150</p>
              </div>
              <div className="ml-4">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  📦
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Clientes</p>
                <p className="text-2xl font-bold text-gray-900">89</p>
              </div>
              <div className="ml-4">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  👥
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Pedidos Hoje</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
              <div className="ml-4">
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                  🛒
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Estoque Baixo</p>
                <p className="text-2xl font-bold text-red-600">5</p>
              </div>
              <div className="ml-4">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                  ⚠️
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Menu de ações rápidas */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="primary" className="justify-start">
              + Novo Produto
            </Button>
            <Button variant="secondary" className="justify-start">
              📋 Gerenciar Categorias
            </Button>
            <Button variant="secondary" className="justify-start">
              👥 Ver Clientes
            </Button>
            <Button variant="secondary" className="justify-start">
              📊 Relatórios
            </Button>
          </div>
        </Card>

        {/* Informações do usuário */}
        <Card className="p-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Suas Informações</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Nome</p>
              <p className="font-medium">{user.nome}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Cargo</p>
              <p className="font-medium">{user.cargo_nome || 'Administrador'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {user.ativo ? 'Ativo' : 'Inativo'}
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

// ============================================
// COMPONENTE PRINCIPAL - LOGIN ADMIN
// ============================================

const AdminLoginPage = () => {
  const [formData, setFormData] = useState({
    user: '',
    pass: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  // Verificar se já está logado ao carregar o componente
  React.useEffect(() => {
    if (authService.isLoggedIn()) {
      setCurrentUser(authService.getCurrentUser());
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.user.trim()) {
      newErrors.user = 'Usuário é obrigatório';
    }

    if (!formData.pass.trim()) {
      newErrors.pass = 'Senha é obrigatória';
    } else if (formData.pass.length < 3) {
      newErrors.pass = 'Senha deve ter pelo menos 3 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    setLoginError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const result = await authService.loginAdmin(formData.user, formData.pass);
      
      if (result.success) {
        setCurrentUser(result.data);
        // Resetar form
        setFormData({ user: '', pass: '' });
        setErrors({});
      } else {
        setLoginError(result.message);
      }
    } catch (error) {
      setLoginError('Erro de conexão com o servidor');
      console.error('Erro no login:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Limpar erro do campo quando usuário começar a digitar
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
    setFormData({ user: '', pass: '' });
    setErrors({});
    setLoginError('');
  };

  // Se já estiver logado, mostrar dashboard
  if (currentUser) {
    return <AdminDashboard user={currentUser} onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Card className="p-8">
          {showForgotPassword ? (
            <ForgotPasswordForm 
              onBack={() => setShowForgotPassword(false)} 
            />
          ) : (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900">
                  Ecommerce João
                </h1>
                <p className="text-gray-600 mt-2">
                  Painel Administrativo
                </p>
              </div>

              {/* Erro geral de login */}
              {loginError && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {loginError}
                </div>
              )}

              {/* Formulário */}
              <div className="space-y-4">
                <Input
                  label="Usuário"
                  type="text"
                  placeholder="Digite seu usuário"
                  value={formData.user}
                  onChange={(e) => handleInputChange('user', e.target.value)}
                  error={errors.user}
                  required
                  onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                />

                <Input
                  label="Senha"
                  type="password"
                  placeholder="Digite sua senha"
                  value={formData.pass}
                  onChange={(e) => handleInputChange('pass', e.target.value)}
                  error={errors.pass}
                  required
                  onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                />

                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    className="text-sm text-blue-600 hover:text-blue-500"
                    onClick={() => setShowForgotPassword(true)}
                  >
                    Esqueceu a senha?
                  </button>
                </div>

                <Button
                  variant="primary"
                  className="w-full"
                  loading={loading}
                  onClick={handleSubmit}
                >
                  Entrar
                </Button>
              </div>

              {/* Dica para teste */}
              <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded">
                <p className="text-xs text-blue-600">
                  <strong>💡 Para testar:</strong> Use as credenciais configuradas no seu banco de dados.
                  Se não tiver nenhuma, crie um usuário admin via SQL.
                </p>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default AdminLoginPage;