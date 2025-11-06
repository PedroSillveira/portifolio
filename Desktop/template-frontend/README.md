# Template Frontend React + Vite

Template frontend completo com autenticação, rotas protegidas e componentes reutilizáveis.

## 🚀 Tecnologias

- React 18
- Vite
- React Router DOM
- Bootstrap 5
- Axios
- Jose (JWT)
- React Icons

## 📁 Estrutura de Pastas
```
src/
├── components/
│   ├── common/          # Componentes reutilizáveis (Modal, Toast, Loading, etc)
│   ├── forms/           # Componentes de formulário (Input, Button)
│   └── layout/          # Componentes de layout (Sidebar, Header, MainLayout)
├── config/
│   └── api.js          # Configuração de endpoints da API
├── pages/
│   ├── auth/           # Páginas de autenticação (Login, Register, etc)
│   ├── home/           # Página inicial
│   └── profile/        # Página de perfil
├── routes/
│   └── routes.jsx      # Configuração de rotas
├── services/
│   └── authService.js  # Serviços de autenticação
├── styles/
│   ├── variables.css   # Variáveis CSS (cores, espaçamentos, etc)
│   └── global.css      # Estilos globais
├── utils/
│   └── crypto.js       # Funções de criptografia JWT
├── App.jsx
└── main.jsx
```

## ⚙️ Instalação

1. Clone o repositório
```bash
git clone [seu-repositorio]
cd template-frontend
```

2. Instale as dependências
```bash
npm install
```

3. Configure as variáveis de ambiente
```bash
cp .env.example .env
```
Edite o arquivo `.env` com a URL da sua API.

4. Inicie o servidor de desenvolvimento
```bash
npm run dev
```

## 🔐 Sistema de Autenticação

O template inclui sistema completo de autenticação:

- **Login** - `/`
- **Registro** - `/register`
- **Recuperar Senha** - `/forgot-password`
- **Redefinir Senha** - `/reset-password`
- **Home** - `/home` (protegida)
- **Perfil** - `/profile` (protegida)

### Como funciona:

1. Token JWT é armazenado no `sessionStorage`
2. Todas as requisições são criptografadas usando Jose
3. Rotas protegidas verificam autenticação automaticamente
4. Logout limpa o sessionStorage

## 🧩 Componentes Disponíveis

### Common Components
- **Modal** - Modal reutilizável
- **Toast** - Notificações (success, error, warning, info)
- **Loading** - Spinner de carregamento (inline ou fullscreen)
- **Card** - Container para conteúdo
- **Table** - Tabela responsiva

### Form Components
- **Input** - Input com label e erro
- **Button** - Botão com variantes e loading state

### Layout Components
- **Sidebar** - Menu lateral
- **Header** - Cabeçalho com dropdown de usuário
- **MainLayout** - Layout completo (Sidebar + Header + Content)

## 📝 Como Adicionar Novas Páginas

1. Crie o componente da página em `src/pages/`
```jsx
// src/pages/exemplo/Exemplo.jsx
export default function Exemplo() {
  return <div>Nova Página</div>;
}
```

2. Adicione a rota em `src/routes/routes.jsx`
```jsx
import Exemplo from '../pages/exemplo/Exemplo';

// Dentro do elemento ProtectedRoute
<Route path="/exemplo" element={<Exemplo />} />
```

3. (Opcional) Adicione ao menu do Sidebar
```jsx
const menuItems = [
  { label: 'Perfil', path: '/profile' },
  { label: 'Exemplo', path: '/exemplo' } // Nova entrada
];
```

## 🎨 Personalização de Estilos

Edite `src/styles/variables.css` para alterar:

- Cores principais
- Espaçamentos
- Bordas
- Sombras
```css
:root {
  --color-primary: #2f2f2f;
  --color-secondary: #dadada;
  --color-background: #f4f4f4;
  /* ... */
}
```

## 🔧 Integração com Backend

O template está configurado para se comunicar com a API do backend.

### Endpoints configurados:
- `POST /auth/login`
- `POST /auth/registro`
- `POST /auth/solicitar-recuperacao`
- `POST /auth/redefinir-senha`
- `POST /auth/verificar-token`
- `POST /auth/perfil`
- `POST /auth/atualizar-perfil`
- `POST /auth/alterar-senha`

### Como adicionar novos endpoints:

1. Adicione em `src/config/api.js`:
```javascript
export const API_ENDPOINTS = {
  // ... endpoints existentes
  NOVO_ENDPOINT: `${API_BASE_URL}/caminho/novo`,
};
```

2. Crie/atualize o service em `src/services/`:
```javascript
export const meuService = {
  async metodo() {
    const jwt = sessionStorage.getItem('jwt');
    const encrypted = await encrypt({ dados });
    const response = await axios.post(API_ENDPOINTS.NOVO_ENDPOINT, { payload: encrypted });
    return await decrypt(response.data.payload);
  }
};
```

## 📦 Build para Produção
```bash
npm run build
```

Os arquivos otimizados serão gerados em `dist/`.

## 🤝 Boas Práticas Implementadas

- ✅ Componentes reutilizáveis e isolados
- ✅ Separação de responsabilidades (components, services, utils)
- ✅ Criptografia de dados sensíveis
- ✅ Proteção de rotas
- ✅ Tratamento de erros
- ✅ Loading states
- ✅ Feedback visual (Toast)
- ✅ Responsive design (Bootstrap)
- ✅ Variáveis CSS centralizadas

## 📄 Licença

MIT