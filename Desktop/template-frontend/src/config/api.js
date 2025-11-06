const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3333';

export const API_ENDPOINTS = {
  // Auth
  LOGIN: `${API_BASE_URL}/auth/login`,
  REGISTER: `${API_BASE_URL}/auth/registro`,
  REQUEST_PASSWORD_RESET: `${API_BASE_URL}/auth/solicitar-recuperacao`,
  VERIFY_RESET_TOKEN: `${API_BASE_URL}/auth/verificar-token-recuperacao`,
  RESET_PASSWORD: `${API_BASE_URL}/auth/redefinir-senha`,
  VERIFY_TOKEN: `${API_BASE_URL}/auth/verificar-token`,
  
  // User
  GET_PROFILE: `${API_BASE_URL}/auth/perfil`,
  UPDATE_PROFILE: `${API_BASE_URL}/auth/atualizar-perfil`,
  CHANGE_PASSWORD: `${API_BASE_URL}/auth/alterar-senha`,
};

export default API_BASE_URL;