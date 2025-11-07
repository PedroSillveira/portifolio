/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../../services/authService';

export default function Register() {
  const [formData, setFormData] = useState({
    nome_completo: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    cpf: '',
    telefone: '',
    data_nascimento: '',
    sexo: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.nome_completo || !formData.email || !formData.senha) {
      setError('Preencha os campos obrigatórios');
      return;
    }

    if (formData.senha !== formData.confirmarSenha) {
      setError('As senhas não coincidem');
      return;
    }

    if (formData.senha.length < 6) {
      setError('Senha deve ter pelo menos 6 caracteres');
      return;
    }

    try {
      setLoading(true);
      const result = await authService.register(
        formData.nome_completo,
        formData.email,
        formData.senha,
        formData.cpf || null,
        formData.telefone || null,
        formData.data_nascimento || null,
        formData.sexo || null
      );

      if (result?.boleano) {
        setSuccess('Conta criada com sucesso! Redirecionando...');
        setTimeout(() => navigate('/'), 2000);
      } else {
        setError(result?.mensagem || 'Erro ao criar conta');
      }
    } catch (err) {
      setError('Erro ao comunicar com servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-6">
          <div className="card p-4">
            <h2 className="text-center mb-4">Criar Conta</h2>

            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Nome Completo *</label>
                <input
                  type="text"
                  name="nome_completo"
                  className="form-control"
                  value={formData.nome_completo}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email *</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Senha *</label>
                  <input
                    type="password"
                    name="senha"
                    className="form-control"
                    value={formData.senha}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Confirmar Senha *</label>
                  <input
                    type="password"
                    name="confirmarSenha"
                    className="form-control"
                    value={formData.confirmarSenha}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">CPF</label>
                  <input
                    type="text"
                    name="cpf"
                    className="form-control"
                    value={formData.cpf}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Telefone</label>
                  <input
                    type="tel"
                    name="telefone"
                    className="form-control"
                    value={formData.telefone}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Data de Nascimento</label>
                  <input
                    type="date"
                    name="data_nascimento"
                    className="form-control"
                    value={formData.data_nascimento}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Sexo</label>
                  <select
                    name="sexo"
                    className="form-select"
                    value={formData.sexo}
                    onChange={handleChange}
                    disabled={loading}
                  >
                    <option value="">Selecione</option>
                    <option value="M">Masculino</option>
                    <option value="F">Feminino</option>
                    <option value="O">Outro</option>
                  </select>
                </div>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary w-100 mb-3"
                disabled={loading}
              >
                {loading ? 'Criando conta...' : 'Criar Conta'}
              </button>

              <div className="text-center">
                <Link to="/">Já tenho conta</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}