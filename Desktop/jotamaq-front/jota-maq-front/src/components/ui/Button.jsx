import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'base', 
  loading = false, 
  disabled = false, 
  onClick,
  className = '',
  ...props 
}) => {
  const baseClass = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 cursor-pointer border-none gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500',
    secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-gray-500',
    success: 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-500',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    base: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };
  
  const disabledClass = disabled || loading ? 'opacity-60 cursor-not-allowed' : '';
  
  return (
    <button
      className={`${baseClass} ${variants[variant]} ${sizes[size]} ${disabledClass} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
          Carregando...
        </>
      ) : children}
    </button>
  );
};

export default Button;