import classNames from 'classnames'
import './Button.css'

function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  type = 'button',
  className,
  disabled = false,
  ...props 
}) {
  const buttonClass = classNames(
    'custom-btn',
    `btn-${variant}`,
    `btn-${size}`,
    className,
    { disabled }
  )

  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button