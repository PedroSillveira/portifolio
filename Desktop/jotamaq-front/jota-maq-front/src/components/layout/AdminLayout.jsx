import React, { useState } from 'react';
import { Button, Card } from '../../components/ui/Index';

// ============================================
// COMPONENTE SIDEBAR
// ============================================
const Sidebar = ({ currentPage, onPageChange, user, onLogout, isCollapsed, onToggleSidebar }) => {
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '📊',
      active: currentPage === 'dashboard'
    },
    {
      id: 'categorias',
      label: 'Categorias',
      icon: '📁',
      active: currentPage === 'categorias'
    },
    {
      id: 'produtos',
      label: 'Produtos',
      icon: '📦',
      active: currentPage === 'produtos'
    },
    {
      id: 'estoque',
      label: 'Estoque',
      icon: '📋',
      active: currentPage === 'estoque'
    },
    {
      id: 'clientes',
      label: 'Clientes',
      icon: '👥',
      active: currentPage === 'clientes'
    },
    {
      id: 'pedidos',
      label: 'Pedidos',
      icon: '🛒',
      active: currentPage === 'pedidos'
    },
    {
      id: 'relatorios',
      label: 'Relatórios',
      icon: '📈',
      active: currentPage === 'relatorios'
    },
    {
      id: 'configuracoes',
      label: 'Configurações',
      icon: '⚙️',
      active: currentPage === 'configuracoes'
    }
  ];

  return (
    <div className={`bg-gray-900 text-white transition-all duration-300 flex flex-col h-full ${
      isCollapsed ? 'w-20' : 'w-64'
    }`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div>
              <h2 className="text-lg font-semibold">Ecommerce João</h2>
              <p className="text-xs text-gray-400">Painel Admin</p>
            </div>
          )}
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
            title={isCollapsed ? 'Expandir menu' : 'Recolher menu'}
          >
            {isCollapsed ? '→' : '←'}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onPageChange(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${
              item.active 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
            title={isCollapsed ? item.label : ''}
          >
            <span className="text-xl">{item.icon}</span>
            {!isCollapsed && (
              <span className="font-medium">{item.label}</span>
            )}
          </button>
        ))}
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-gray-700">
        {!isCollapsed ? (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                <span className="text-lg">👤</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.nome}</p>
                <p className="text-xs text-gray-400 truncate">{user?.cargo_nome || 'Administrador'}</p>
              </div>
            </div>
            <Button
              variant="danger"
              size="sm"
              className="w-full"
              onClick={onLogout}
            >
              🚪 Sair
            </Button>
          </div>
        ) : (
          <button
            onClick={onLogout}
            className="w-full p-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center"
            title="Sair"
          >
            <span className="text-lg">🚪</span>
          </button>
        )}
      </div>
    </div>
  );
};

// ============================================
// COMPONENTE HEADER
// ============================================
const Header = ({ title, subtitle, actions, breadcrumb }) => {
  return (
    <div className="bg-white shadow-sm border-b">
      <div className="px-6 py-4">
        {breadcrumb && (
          <div className="mb-2">
            <nav className="flex text-sm text-gray-600">
              {breadcrumb.map((item, index) => (
                <span key={index} className="flex items-center">
                  {index > 0 && <span className="mx-2">/</span>}
                  <span className={index === breadcrumb.length - 1 ? 'text-gray-900 font-medium' : ''}>
                    {item}
                  </span>
                </span>
              ))}
            </nav>
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
            {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
          </div>
          {actions && (
            <div className="flex gap-3">
              {actions}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================
// PÁGINA DASHBOARD
// ============================================
const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <Header 
        title="Dashboard" 
        subtitle="Visão geral do seu negócio"
        breadcrumb={['Admin', 'Dashboard']}
      />
      
      <div className="px-6">
        {/* Estatísticas principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Total Produtos</p>
                <p className="text-3xl font-bold text-gray-900">347</p>
                <p className="text-sm text-green-600 mt-1">+12% vs mês anterior</p>
              </div>
              <div className="ml-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">📦</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Clientes Ativos</p>
                <p className="text-3xl font-bold text-gray-900">89</p>
                <p className="text-sm text-green-600 mt-1">+5% vs mês anterior</p>
              </div>
              <div className="ml-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">👥</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Pedidos Hoje</p>
                <p className="text-3xl font-bold text-gray-900">24</p>
                <p className="text-sm text-green-600 mt-1">+8% vs ontem</p>
              </div>
              <div className="ml-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🛒</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">Estoque Baixo</p>
                <p className="text-3xl font-bold text-red-600">7</p>
                <p className="text-sm text-red-600 mt-1">Atenção necessária</p>
              </div>
              <div className="ml-4">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">⚠️</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Seções adicionais */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="Ações Rápidas" className="h-fit">
            <div className="grid grid-cols-2 gap-3">
              <Button variant="primary" className="justify-start">
                <span className="mr-2">+</span>
                Novo Produto
              </Button>
              <Button variant="secondary" className="justify-start">
                <span className="mr-2">📋</span>
                Ver Estoque
              </Button>
              <Button variant="secondary" className="justify-start">
                <span className="mr-2">👥</span>
                Novo Cliente
              </Button>
              <Button variant="secondary" className="justify-start">
                <span className="mr-2">📊</span>
                Relatórios
              </Button>
            </div>
          </Card>

          <Card title="Últimos Pedidos">
            <div className="space-y-3">
              {[
                { id: '#001', cliente: 'João Silva', valor: 'R$ 150,00', status: 'Pendente', color: 'yellow' },
                { id: '#002', cliente: 'Maria Santos', valor: 'R$ 89,90', status: 'Confirmado', color: 'blue' },
                { id: '#003', cliente: 'Pedro Costa', valor: 'R$ 220,00', status: 'Entregue', color: 'green' },
                { id: '#004', cliente: 'Ana Lima', valor: 'R$ 75,50', status: 'Processando', color: 'blue' }
              ].map((pedido) => (
                <div key={pedido.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div>
                    <p className="font-medium text-gray-900">{pedido.id} - {pedido.cliente}</p>
                    <p className="text-sm text-gray-600">{pedido.valor}</p>
                  </div>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    pedido.color === 'green' ? 'bg-green-100 text-green-800' :
                    pedido.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {pedido.status}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <Button variant="secondary" size="sm" className="w-full">
                Ver Todos os Pedidos
              </Button>
            </div>
          </Card>
        </div>

        {/* Alertas importantes */}
        <Card title="⚠️ Alertas Importantes" className="mt-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <span className="text-red-500 text-lg">🔴</span>
              <div>
                <p className="font-medium text-red-800">7 produtos com estoque baixo</p>
                <p className="text-sm text-red-600">Alguns produtos precisam de reposição urgente</p>
              </div>
              <Button variant="danger" size="sm" className="ml-auto">
                Ver Produtos
              </Button>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <span className="text-yellow-500 text-lg">🟡</span>
              <div>
                <p className="font-medium text-yellow-800">3 pedidos aguardando confirmação</p>
                <p className="text-sm text-yellow-600">Pedidos feitos nas últimas 2 horas</p>
              </div>
              <Button variant="secondary" size="sm" className="ml-auto">
                Processar
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

// ============================================
// PÁGINAS PLACEHOLDER
// ============================================
const PlaceholderPage = ({ title, icon, description }) => {
  return (
    <div className="space-y-6">
      <Header 
        title={title}
        subtitle={`Página de ${title.toLowerCase()}`}
        breadcrumb={['Admin', title]}
        actions={
          <Button variant="primary">
            + Novo {title.slice(0, -1)}
          </Button>
        }
      />
      
      <div className="px-6">
        <Card>
          <div className="text-center py-16">
            <div className="text-8xl mb-6">{icon}</div>
            <h3 className="text-2xl font-medium text-gray-900 mb-4">
              {title}
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {description}
            </p>
            <div className="space-y-4">
              <Button variant="primary" size="lg">
                Implementar {title}
              </Button>
              <p className="text-sm text-gray-500">
                Esta funcionalidade será implementada em breve
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

// ============================================
// LAYOUT PRINCIPAL ADMIN
// ============================================
const AdminLayout = ({ user, onLogout }) => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'categorias':
        return (
          <PlaceholderPage 
            title="Categorias" 
            icon="📁"
            description="Aqui você poderá gerenciar todas as categorias dos seus produtos. Organize seu catálogo de forma eficiente."
          />
        );
      case 'produtos':
        return (
          <PlaceholderPage 
            title="Produtos" 
            icon="📦"
            description="Gerencie seu catálogo completo de produtos. Adicione fotos, variações, preços e controle de estoque."
          />
        );
      case 'estoque':
        return (
          <PlaceholderPage 
            title="Estoque" 
            icon="📋"
            description="Controle total do seu estoque. Entradas, saídas, alertas de estoque baixo e relatórios detalhados."
          />
        );
      case 'clientes':
        return (
          <PlaceholderPage 
            title="Clientes" 
            icon="👥"
            description="Gerencie sua base de clientes. Visualize histórico de compras, dados de contato e preferências."
          />
        );
      case 'pedidos':
        return (
          <PlaceholderPage 
            title="Pedidos" 
            icon="🛒"
            description="Acompanhe todos os pedidos do seu ecommerce. Processe vendas, atualize status e gerencie entregas."
          />
        );
      case 'relatorios':
        return (
          <PlaceholderPage 
            title="Relatórios" 
            icon="📈"
            description="Analise o desempenho do seu negócio com relatórios detalhados de vendas, estoque e clientes."
          />
        );
      case 'configuracoes':
        return (
          <PlaceholderPage 
            title="Configurações" 
            icon="⚙️"
            description="Configure os parâmetros do sistema, informações da empresa e preferências gerais."
          />
        );
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        user={user}
        onLogout={onLogout}
        isCollapsed={sidebarCollapsed}
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          {renderCurrentPage()}
        </main>
        
        {/* Footer */}
        <footer className="bg-white border-t px-6 py-3">
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span>© 2024 Ecommerce João - Sistema de Gestão</span>
            <div className="flex items-center gap-4">
              <span>Versão 1.0.0</span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Online
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;