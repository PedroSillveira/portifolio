export default function Button({ 
  children, 
  type = 'button', 
  variant = 'primary', 
  onClick, 
  disabled = false,
  loading = false,
  className = '',
  fullWidth = false
}) {
  const variantClass = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    danger: 'btn-danger',
    success: 'btn-success',
    warning: 'btn-warning',
    info: 'btn-info',
    light: 'btn-light',
    dark: 'btn-dark'
  }[variant] || 'btn-primary';

  return (
    <button
      type={type}
      className={`btn ${variantClass} ${fullWidth ? 'w-100' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <>
          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
          Carregando...
        </>
      ) : (
        children
      )}
    </button>
  );
}