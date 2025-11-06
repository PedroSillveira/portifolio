/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { authService } from '../../services/authService';
import Card from '../../components/common/Card';
import Input from '../../components/forms/Input';
import Button from '../../components/forms/Button';
import Toast from '../../components/common/Toast';
import Loading from '../../components/common/Loading';
import Modal from '../../components/common/Modal';

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  
  const [formData, setFormData] = useState({
    nome_completo: '',
    telefone: '',
    data_nascimento: '',
    sexo: ''
  });

  const [passwordData, setPasswordData] = useState({
    senha_atual: '',
    nova_senha: '',
    confirmar_senha: ''
  });

  const [toast, setToast] = useState({ message: '', type: '' });
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const result = await authService.getProfile();
      
      if (result?.boleano && result.obj) {
        setUserData(result.obj);
        setFormData({
          nome_completo: result.obj.nome_completo || '',
          telefone: result.obj.telefone || '',
          data_nascimento: result.obj.data_nascimento || '',
          sexo: result.obj.sexo || ''
        });
      }
    } catch (error) {
      console.error('Erro ao carregar perfil:', error);
      setToast({ message: 'Erro ao carregar perfil', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    
    if (!formData.nome_completo) {
      setToast({ message: 'Nome completo é obrigatório', type: 'error' });
      return;
    }

    try {
      setLoadingUpdate(true);
      const result = await authService.updateProfile(
        formData.nome_completo,
        formData.telefone,
        formData.data_nascimento,
        formData.sexo
      );

      if (result?.boleano) {
        setToast({ message: 'Perfil atualizado com sucesso!', type: 'success' });
        setEditMode(false);
        await loadProfile();
      } else {
        setToast({ message: result?.mensagem || 'Erro ao atualizar perfil', type: 'error' });
      }
    } catch (error) {
      setToast({ message: 'Erro ao comunicar com servidor', type: 'error' });
    } finally {
      setLoadingUpdate(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!passwordData.senha_atual || !passwordData.nova_senha || !passwordData.confirmar_senha) {
      setToast({ message: 'Preencha todos os campos', type: 'error' });
      return;
    }

    if (passwordData.nova_senha !== passwordData.confirmar_senha) {
      setToast({ message: 'As senhas não coincidem', type: 'error' });
      return;
    }

    if (passwordData.nova_senha.length < 6) {
      setToast({ message: 'Nova senha deve ter pelo menos 6 caracteres', type: 'error' });
      return;
    }

    try {
      setLoadingPassword(true);
      const result = await authService.changePassword(
        passwordData.senha_atual,
        passwordData.nova_senha
      );

      if (result?.boleano) {
        setToast({ message: 'Senha alterada com sucesso!', type: 'success' });
        setShowPasswordModal(false);
        setPasswordData({ senha_atual: '', nova_senha: '', confirmar_senha: '' });
      } else {
        setToast({ message: result?.mensagem || 'Erro ao alterar senha', type: 'error' });
      }
    } catch (error) {
      setToast({ message: 'Erro ao comunicar com servidor', type: 'error' });
    } finally {
      setLoadingPassword(false);
    }
  };

  if (loading) return <Loading fullScreen />;

  return (
    <div className="container">
      <Toast 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast({ message: '', type: '' })}
      />

      <h1 className="mb-4">Meu Perfil</h1>

      <div className="row">
        <div className="col-md-8">
          <Card title="Informações Pessoais">
            {!editMode ? (
              <>
                <div className="mb-3">
                  <strong>Nome Completo:</strong>
                  <p className="mb-0">{userData?.nome_completo}</p>
                </div>

                <div className="mb-3">
                  <strong>Email:</strong>
                  <p className="mb-0">{userData?.email}</p>
                </div>

                <div className="mb-3">
                  <strong>CPF:</strong>
                  <p className="mb-0">{userData?.cpf || 'Não informado'}</p>
                </div>

                <div className="mb-3">
                  <strong>Telefone:</strong>
                  <p className="mb-0">{userData?.telefone || 'Não informado'}</p>
                </div>

                <div className="mb-3">
                  <strong>Data de Nascimento:</strong>
                  <p className="mb-0">{userData?.data_nascimento || 'Não informado'}</p>
                </div>

                <div className="mb-3">
                  <strong>Sexo:</strong>
                  <p className="mb-0">
                    {userData?.sexo === 'M' ? 'Masculino' : userData?.sexo === 'F' ? 'Feminino' : userData?.sexo === 'O' ? 'Outro' : 'Não informado'}
                  </p>
                </div>

                <Button onClick={() => setEditMode(true)}>
                  Editar Perfil
                </Button>
              </>
            ) : (
              <form onSubmit={handleUpdateProfile}>
                <Input
                  label="Nome Completo"
                  name="nome_completo"
                  value={formData.nome_completo}
                  onChange={handleChange}
                  required
                />

                <Input
                  label="Telefone"
                  name="telefone"
                  type="tel"
                  value={formData.telefone}
                  onChange={handleChange}
                />

                <Input
                  label="Data de Nascimento"
                  name="data_nascimento"
                  type="date"
                  value={formData.data_nascimento}
                  onChange={handleChange}
                />

                <div className="mb-3">
                  <label className="form-label">Sexo</label>
                  <select
                    name="sexo"
                    className="form-select"
                    value={formData.sexo}
                    onChange={handleChange}
                  >
                    <option value="">Selecione</option>
                    <option value="M">Masculino</option>
                    <option value="F">Feminino</option>
                    <option value="O">Outro</option>
                  </select>
                </div>

                <div className="d-flex gap-2">
                  <Button type="submit" loading={loadingUpdate}>
                    Salvar
                  </Button>
                  <Button 
                    variant="secondary" 
                    onClick={() => {
                      setEditMode(false);
                      setFormData({
                        nome_completo: userData?.nome_completo || '',
                        telefone: userData?.telefone || '',
                        data_nascimento: userData?.data_nascimento || '',
                        sexo: userData?.sexo || ''
                      });
                    }}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            )}
          </Card>
        </div>

        <div className="col-md-4">
          <Card title="Segurança">
            <p className="text-muted mb-3">
              Altere sua senha regularmente para manter sua conta segura.
            </p>
            <Button 
              variant="warning" 
              fullWidth
              onClick={() => setShowPasswordModal(true)}
            >
              Alterar Senha
            </Button>
          </Card>

          <Card title="Conta" className="mt-3">
            <p className="mb-1">
              <strong>ID:</strong> {userData?.id}
            </p>
            <p className="mb-1">
              <strong>Cadastro:</strong> {userData?.data_cadastro ? new Date(userData.data_cadastro).toLocaleDateString('pt-BR') : 'N/A'}
            </p>
            <p className="mb-0">
              <strong>Status:</strong> <span className="badge bg-success">Ativo</span>
            </p>
          </Card>
        </div>
      </div>

      <Modal
        isOpen={showPasswordModal}
        onClose={() => {
          setShowPasswordModal(false);
          setPasswordData({ senha_atual: '', nova_senha: '', confirmar_senha: '' });
        }}
        title="Alterar Senha"
      >
        <form onSubmit={handleChangePassword}>
          <Input
            label="Senha Atual"
            name="senha_atual"
            type="password"
            value={passwordData.senha_atual}
            onChange={handlePasswordChange}
            required
          />

          <Input
            label="Nova Senha"
            name="nova_senha"
            type="password"
            value={passwordData.nova_senha}
            onChange={handlePasswordChange}
            required
          />

          <Input
            label="Confirmar Nova Senha"
            name="confirmar_senha"
            type="password"
            value={passwordData.confirmar_senha}
            onChange={handlePasswordChange}
            required
          />

          <div className="d-flex gap-2 mt-3">
            <Button type="submit" loading={loadingPassword} fullWidth>
              Alterar Senha
            </Button>
            <Button 
              variant="secondary" 
              fullWidth
              onClick={() => {
                setShowPasswordModal(false);
                setPasswordData({ senha_atual: '', nova_senha: '', confirmar_senha: '' });
              }}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}