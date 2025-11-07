import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import { decrypt } from '../../utils/crypto';

export default function Header() {
  const [username, setUsername] = useState('Usuário');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const jwt = sessionStorage.getItem('jwt');
      if (jwt) {
        try {
          const userData = await decrypt(jwt);
          if (userData?.nome_completo) {
            setUsername(userData.nome_completo);
          }
        } catch (error) {
          console.error('Erro ao decifrar token:', error);
        }
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  return (
    <header className="bg-white border-bottom p-3" style={{ marginLeft: '250px' }}>
      <div className="d-flex justify-content-end align-items-center">
        <div className="dropdown" ref={dropdownRef}>
          <button
            className="btn btn-light dropdown-toggle"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {username}
          </button>
          
          {dropdownOpen && (
            <div className="dropdown-menu dropdown-menu-end show">
              <button 
                className="dropdown-item" 
                onClick={() => {
                  navigate('/profile');
                  setDropdownOpen(false);
                }}
              >
                Perfil
              </button>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item" onClick={handleLogout}>
                Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}