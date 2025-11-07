/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { authService } from '../../services/authService';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const emailFromUrl = searchParams.get('email') || '';
  
  const [formData, setFormData] = useState({
    email: emailFromUrl,
    token: '',
    nova_senha: '',
    confirmarSenha: ''
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

    if (!formData.email || !formData.token || !formData.nova_senha) {
      setError('Preencha todos os campos');
      return;
    }

    if (formData.nova_senha !== formData.confirmarSenha) {
      setError('As senhas não coincidem');
      return;
    }

    if (formData.nova_senha.length < 6) {
      setError('Senha deve ter pelo menos 6 caracteres');
      return;
    }

    try {
      setLoading(true);
      const result = await authService.resetPassword(
        formData.email,
        formData.token,
        formData.nova_senha
      );

      if (result?.boleano) {
        setSuccess('Senha alterada com sucesso! Redirecionando...');
        setTimeout(() => navigate('/'), 2000);
      } else {
        setError(result?.mensagem || 'Erro ao redefinir senha');
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
        <div className="col-md-5">
          <div className="card p-4">
            <h2 className="text-center mb-4">Redefinir Senha</h2>

            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Código</label>
                <input
                  type="text"
                  name="token"
                  className="form-control"
                  value={formData.token}
                  onChange={handleChange}
                  disabled={loading}
                  placeholder="Código recebido por email"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Nova Senha</label>
                <input
                  type="password"
                  name="nova_senha"
                  className="form-control"
                  value={formData.nova_senha}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Confirmar Nova Senha</label>
                <input
                  type="password"
                  name="confirmarSenha"
                  className="form-control"
                  value={formData.confirmarSenha}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary w-100 mb-3"
                disabled={loading}
              >
                {loading ? 'Redefinindo...' : 'Redefinir Senha'}
              </button>

              <div className="text-center">
                <Link to="/">Voltar para login</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}