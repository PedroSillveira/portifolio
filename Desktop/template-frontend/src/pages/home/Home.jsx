import { useState, useEffect } from 'react';
import { decrypt } from '../../utils/crypto';
import Card from '../../components/common/Card';
import Loading from '../../components/common/Loading';

export default function Home() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const jwt = sessionStorage.getItem('jwt');
        if (jwt) {
          const data = await decrypt(jwt);
          setUserData(data);
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <Loading fullScreen />;

  return (
    <div className="container-fluid">
      <h1 className="mb-4">Dashboard</h1>

      <div className="row">
        <div className="col-md-4 mb-4">
          <Card title="Bem-vindo">
            <p className="mb-0">Olá, {userData?.nome_completo || 'Usuário'}!</p>
            <small className="text-muted">{userData?.email}</small>
          </Card>
        </div>

        <div className="col-md-4 mb-4">
          <Card title="Informações">
            <p className="mb-1">
              <strong>ID:</strong> {userData?.id || userData?.usuario_id}
            </p>
            <p className="mb-0">
              <strong>Email:</strong> {userData?.email}
            </p>
          </Card>
        </div>

        <div className="col-md-4 mb-4">
          <Card title="Status">
            <p className="mb-0">
              <span className="badge bg-success">Ativo</span>
            </p>
          </Card>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <Card title="Estatísticas">
            <p className="text-muted">Adicione suas estatísticas personalizadas aqui.</p>
          </Card>
        </div>
      </div>
    </div>
  );
}