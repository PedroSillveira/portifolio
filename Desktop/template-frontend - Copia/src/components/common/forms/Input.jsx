export default function Input({ 
  label, 
  type = 'text', 
  name, 
  value, 
  onChange, 
  error, 
  placeholder,
  disabled = false,
  required = false,
  className = ''
}) {
  return (
    <div className={`mb-3 ${className}`}>
      {label && (
        <label className="form-label">
          {label}
          {required && <span className="text-danger"> *</span>}
        </label>
      )}
      
      <input
        type={type}
        name={name}
        className={`form-control ${error ? 'is-invalid' : ''}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
      />
      
      {error && (
        <div className="invalid-feedback d-block">
          {error}
        </div>
      )}
    </div>
  );
}