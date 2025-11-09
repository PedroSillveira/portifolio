import { Spinner } from 'react-bootstrap'
import './Loading.css'

function Loading({ size = 'md', text = 'Carregando...' }) {
  return (
    <div className="loading-container">
      <Spinner animation="border" variant="primary" size={size} />
      {text && <p className="loading-text">{text}</p>}
    </div>
  )
}

export default Loading