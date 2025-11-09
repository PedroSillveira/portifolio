import { Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Button from '../../common/button/Button'
import { FaArrowRight } from 'react-icons/fa'
import './CTA.css'

function CTA({  
  title = 'Pronto para começar?',
  subtitle = 'Entre em contato e transforme suas ideias em realidade',
  ctaText = 'Fale Conosco',
  ctaLink = '/contato'
}) {
  return (
    <section className="cta-section">
      <Container>
        <div className="cta-content" data-aos="fade-up">
          <h2 className="cta-title">{title}</h2>
          <p className="cta-subtitle">{subtitle}</p>
          <Link to={ctaLink}>
            <Button variant="primary" size="lg">
              {ctaText} <FaArrowRight />
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  )
}

export default CTA