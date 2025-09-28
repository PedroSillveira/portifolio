// ============================================
// ARQUIVO: src/services/api.js
// SUBSTITUA todo o conteúdo atual por este
// ============================================

const API_BASE_URL = 'http://localhost:4444';

// ============================================
// FUNÇÃO DE DEBUG PARA ANALISAR RESPOSTA
// ============================================
const debugResponse = (response, context) => {
  console.group(`🔍 DEBUG ${context}`);
  console.log('📦 Response completa:', response);
  console.log('🔑 Payload raw:', response?.payload);
  
  if (response?.payload) {
    console.log('📝 Tipo do payload:', typeof response.payload);
    console.log('📏 Tamanho do payload:', response.payload.length);
    console.log('🔢 Primeiros 50 chars:', response.payload.substring(0, 50));
    
    // Verificar se é um JWT válido (deve ter 3 partes separadas por .)
    const parts = response.payload.split('.');
    console.log('🧩 Partes do JWT:', parts.length);
    if (parts.length === 3) {
      console.log('✅ Estrutura JWT válida');
      console.log('📋 Header length:', parts[0].length);
      console.log('📋 Payload length:', parts[1].length);
      console.log('📋 Signature length:', parts[2].length);
    } else {
      console.log('❌ JWT mal formado - deveria ter 3 partes');
    }
  }
  console.groupEnd();
};

// ============================================
// FUNÇÃO DE REQUISIÇÃO MELHORADA
// ============================================
const apiRequest = async (endpoint, data = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  console.log(`🚀 API Request para: ${endpoint}`);
  console.log('📤 Dados enviados:', data);
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    console.log(`📊 Status Response: ${response.status}`);
    
    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }
    
    const jsonResponse = await response.json();
    console.log('📦 Response JSON:', jsonResponse);
    
    return jsonResponse;
  } catch (error) {
    console.error('❌ API Request Error:', error);
    throw error;
  }
};

// ============================================
// FUNÇÃO DE DECODIFICAÇÃO ROBUSTA
// ============================================
const decodePayload = (responseData, context = 'Unknown') => {
  console.log(`🔓 Tentando decodificar payload - Context: ${context}`);
  
  if (!responseData) {
    console.error('❌ Response data é null/undefined');
    return null;
  }

  if (!responseData.payload) {
    console.error('❌ Payload não encontrado na response');
    console.log('📦 Response completa:', responseData);
    return null;
  }

  const payload = responseData.payload;
  console.log('🔑 Payload raw:', payload);
  console.log('📝 Tipo:', typeof payload);

  try {
    // Verificar se o payload é uma string válida
    if (typeof payload !== 'string') {
      console.error('❌ Payload não é string:', typeof payload);
      return null;
    }

    // Verificar estrutura JWT (deve ter 3 partes)
    const parts = payload.split('.');
    if (parts.length !== 3) {
      console.error(`❌ JWT mal formado - ${parts.length} partes, esperado 3`);
      console.log('🧩 Partes encontradas:', parts);
      return null;
    }

    // Tentar decodificar a parte do payload (índice 1)
    const base64Url = parts[1];
    console.log('🔤 Base64URL do payload:', base64Url);

    // Substituir caracteres URL-safe
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    
    // Adicionar padding se necessário
    const paddedBase64 = base64 + '='.repeat((4 - base64.length % 4) % 4);
    console.log('🔤 Base64 com padding:', paddedBase64);

    // Decodificar
    const jsonPayload = decodeURIComponent(
      atob(paddedBase64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    
    console.log('📝 JSON payload decodificado:', jsonPayload);
    
    const parsed = JSON.parse(jsonPayload);
    console.log('✅ Payload parseado com sucesso:', parsed);
    
    return parsed;
  } catch (error) {
    console.error('❌ Erro ao decodificar payload:', error);
    console.log('🔍 Payload que causou erro:', payload);
    
    // Tentar métodos alternativos de decodificação
    console.log('🔄 Tentando método alternativo...');
    
    try {
      // Método alternativo: assumir que pode ser JSON direto
      const directParse = JSON.parse(payload);
      console.log('✅ Método alternativo funcionou:', directParse);
      return directParse;
    } catch (altError) {
      console.error('❌ Método alternativo também falhou:', altError);
    }
    
    return null;
  }
};

// ============================================
// SERVIÇO DE AUTENTICAÇÃO MELHORADO
// ============================================
export const authService = {
  loginAdmin: async (user, pass) => {
    console.log('🔐 Iniciando login admin...');
    console.log('👤 Usuário:', user);
    
    try {
      // Codificar dados como o backend espera
      const loginData = { user, pass };
      const payload = btoa(JSON.stringify(loginData));
      
      console.log('📤 Dados de login:', loginData);
      console.log('🔐 Payload codificado:', payload);
      
      const response = await apiRequest('/admin/login', { payload });
      
      // Debug da resposta
      debugResponse(response, 'LOGIN ADMIN');
      
      // Tentar decodificar
      const decoded = decodePayload(response, 'LOGIN_ADMIN');
      
      if (!decoded) {
        console.error('❌ Falha na decodificação');
        return { 
          success: false, 
          message: 'Erro na resposta do servidor (decodificação falhou)' 
        };
      }
      
      console.log('✅ Decoded payload:', decoded);
      
      // Verificar se login foi bem-sucedido
      if (decoded && decoded.boleano) {
        console.log('✅ Login bem-sucedido!');
        
        const userData = decoded.obj?.usuario || decoded.obj;
        console.log('👤 Dados do usuário:', userData);
        
        return { 
          success: true, 
          data: userData, 
          token: response.payload,
          message: decoded.mensagem || 'Login realizado com sucesso'
        };
      } else {
        console.log('❌ Login negado pelo servidor');
        return { 
          success: false, 
          message: decoded?.mensagem || 'Credenciais inválidas' 
        };
      }
      
    } catch (error) {
      console.error('❌ Erro no processo de login:', error);
      
      // Verificar tipo de erro
      if (error.message.includes('fetch')) {
        return { 
          success: false, 
          message: 'Erro de conexão. Verifique se o backend está rodando na porta 4444.' 
        };
      } else if (error.message.includes('jwt')) {
        return { 
          success: false, 
          message: 'Erro na resposta do servidor. Verifique os logs do backend.' 
        };
      } else {
        return { 
          success: false, 
          message: `Erro inesperado: ${error.message}` 
        };
      }
    }
  },

  logout: () => {
    console.log('🚪 Fazendo logout...');
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
  },

  isLoggedIn: () => {
    const token = localStorage.getItem('admin_token');
    const hasToken = !!token;
    console.log('🔍 Verificando se está logado:', hasToken);
    return hasToken;
  },

  getCurrentUser: () => {
    const userData = localStorage.getItem('admin_user');
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        console.log('👤 Usuário atual:', parsed);
        return parsed;
      } catch (error) {
        console.error('❌ Erro ao recuperar dados do usuário:', error);
        localStorage.removeItem('admin_user');
        return null;
      }
    }
    return null;
  }
};

// ============================================
// FUNÇÃO PARA TESTAR BACKEND
// ============================================
export const testBackend = async () => {
  console.group('🧪 TESTE DE BACKEND');
  
  try {
    console.log('📡 Testando conexão com backend...');
    
    const response = await fetch(`${API_BASE_URL}/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        payload: btoa(JSON.stringify({ user: 'teste', pass: 'teste' }))
      }),
    });
    
    console.log('📊 Status da resposta:', response.status);
    console.log('📋 Headers:', Object.fromEntries(response.headers.entries()));
    
    const text = await response.text();
    console.log('📝 Response como texto:', text);
    
    try {
      const json = JSON.parse(text);
      console.log('📦 Response como JSON:', json);
      debugResponse(json, 'TESTE_BACKEND');
    } catch (parseError) {
      console.error('❌ Response não é JSON válido:', parseError);
    }
    
  } catch (error) {
    console.error('❌ Erro no teste de backend:', error);
  }
  
  console.groupEnd();
};

// ============================================
// FUNÇÃO PARA REQUISIÇÕES AUTENTICADAS
// ============================================
const authenticatedRequest = async (endpoint, data = {}) => {
  const token = localStorage.getItem('admin_token');
  
  if (!token) {
    throw new Error('Sessão expirada. Faça login novamente.');
  }

  console.log('🔐 Fazendo requisição autenticada para:', endpoint);
  console.log('🎫 Token:', token.substring(0, 50) + '...');

  const payload = btoa(JSON.stringify({ ...data, payload: token }));
  const response = await apiRequest(endpoint, { payload });
  
  const decoded = decodePayload(response, `AUTH_${endpoint}`);
  return {
    success: decoded?.boleano || false,
    data: decoded?.obj || null,
    message: decoded?.mensagem || 'Erro na requisição'
  };
};

export { authenticatedRequest };