import { useEffect } from 'react';

export default function Toast({ message, type = 'info', onClose, duration = 4000 }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration, onClose]);

  if (!message) return null;

  const bgClass = {
    success: 'bg-success',
    error: 'bg-danger',
    warning: 'bg-warning',
    info: 'bg-info'
  }[type] || 'bg-info';

  return (
    <div 
      className="position-fixed top-0 end-0 p-3" 
      style={{ zIndex: 9999 }}
    >
      <div className={`toast show ${bgClass} text-white`} role="alert">
        <div className="toast-header">
          <strong className="me-auto">
            {type === 'success' && 'Sucesso'}
            {type === 'error' && 'Erro'}
            {type === 'warning' && 'Aviso'}
            {type === 'info' && 'Informação'}
          </strong>
          <button 
            type="button" 
            className="btn-close" 
            onClick={onClose}
          ></button>
        </div>
        <div className="toast-body">
          {message}
        </div>
      </div>
    </div>
  );
}