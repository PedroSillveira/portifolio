import './Card.css'

function Card({ children, className = '', hoverable = true }) {
  return (
    <div className={`custom-card ${hoverable ? 'hoverable' : ''} ${className}`}>
      {children}
    </div>
  )
}

export default Card