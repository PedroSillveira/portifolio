/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../../services/authService';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !senha) {
      setError('Preencha todos os campos');
      return;
    }

    try {
      setLoading(true);
      const result = await authService.login(email, senha);
      
      if (result?.boleano) {
        navigate('/home');
      } else {
        setError(result?.mensagem || 'Erro ao fazer login');
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
            <h2 className="text-center mb-4">Login</h2>
            
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Senha</label>
                <input
                  type="password"
                  className="form-control"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  disabled={loading}
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary w-100 mb-3"
                disabled={loading}
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </button>

              <div className="text-center">
                <Link to="/register">Criar conta</Link>
                {' | '}
                <Link to="/forgot-password">Esqueci a senha</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}