/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../../services/authService';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!email) {
      setError('Digite seu email');
      return;
    }

    try {
      setLoading(true);
      const result = await authService.requestPasswordReset(email);
      
      if (result?.boleano) {
        setMessage(result.mensagem || 'Código enviado para seu email');
      } else {
        setError(result?.mensagem || 'Erro ao enviar código');
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
            <h2 className="text-center mb-4">Recuperar Senha</h2>

            {error && <div className="alert alert-danger">{error}</div>}
            {message && <div className="alert alert-success">{message}</div>}

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

              <button 
                type="submit" 
                className="btn btn-primary w-100 mb-3"
                disabled={loading}
              >
                {loading ? 'Enviando...' : 'Enviar Código'}
              </button>

              <div className="text-center">
                <Link to="/">Voltar para login</Link>
                {' | '}
                <Link to="/reset-password">Já tenho o código</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}