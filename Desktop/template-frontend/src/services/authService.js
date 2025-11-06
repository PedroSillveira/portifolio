import axios from 'axios';
import { encrypt, decrypt } from '../utils/crypto';
import { API_ENDPOINTS } from '../config/api';

export const authService = {
  async login(email, senha) {
    const encrypted = await encrypt({ email, senha });
    const response = await axios.post(API_ENDPOINTS.LOGIN, { payload: encrypted });
    const decrypted = await decrypt(response.data.payload);
    
    if (decrypted?.boleano) {
      sessionStorage.setItem('jwt', response.data.payload);
    }
    
    return decrypted;
  },

  async register(nome_completo, email, senha, cpf, telefone, data_nascimento, sexo) {
    const encrypted = await encrypt({ 
      nome_completo, 
      email, 
      senha, 
      cpf, 
      telefone, 
      data_nascimento, 
      sexo 
    });
    const response = await axios.post(API_ENDPOINTS.REGISTER, { payload: encrypted });
    return await decrypt(response.data.payload);
  },

  async requestPasswordReset(email) {
    const encrypted = await encrypt({ email });
    const response = await axios.post(API_ENDPOINTS.REQUEST_PASSWORD_RESET, { payload: encrypted });
    return await decrypt(response.data.payload);
  },

  async resetPassword(email, token, nova_senha) {
    const encrypted = await encrypt({ email, token, nova_senha });
    const response = await axios.post(API_ENDPOINTS.RESET_PASSWORD, { payload: encrypted });
    return await decrypt(response.data.payload);
  },

  async verifyToken() {
    const jwt = sessionStorage.getItem('jwt');
    if (!jwt) return null;
    
    try {
      const decrypted = await decrypt(jwt);
      return decrypted;
    } catch {
      return null;
    }
  },

  logout() {
    sessionStorage.clear();
  },

  async getProfile() {
    const jwt = sessionStorage.getItem('jwt');
    if (!jwt) throw new Error('Token ausente');
    
    const response = await axios.post(API_ENDPOINTS.GET_PROFILE, { payload: jwt });
    return await decrypt(response.data.payload);
  },

  async updateProfile(nome_completo, telefone, data_nascimento, sexo) {
    const jwt = sessionStorage.getItem('jwt');
    if (!jwt) throw new Error('Token ausente');
    
    const userData = await decrypt(jwt);
    const encrypted = await encrypt({ 
      usuario_id: userData.usuario_id,
      nome_completo, 
      telefone, 
      data_nascimento, 
      sexo 
    });
    
    const response = await axios.post(API_ENDPOINTS.UPDATE_PROFILE, { payload: encrypted });
    return await decrypt(response.data.payload);
  },

  async changePassword(senha_atual, nova_senha) {
    const jwt = sessionStorage.getItem('jwt');
    if (!jwt) throw new Error('Token ausente');
    
    const encrypted = await encrypt({ senha_atual, nova_senha });
    const response = await axios.post(API_ENDPOINTS.CHANGE_PASSWORD, { payload: encrypted });
    return await decrypt(response.data.payload);
  }
};