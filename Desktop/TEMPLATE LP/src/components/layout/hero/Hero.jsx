import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import Button from '../../common/button/Button'
import { FaArrowRight } from 'react-icons/fa'
import './Hero.css'

function Hero({ 
  title, 
  subtitle, 
  ctaText = 'Saiba Mais',
  ctaLink = '/contato',
  image 
}) {
  return (
    <section className="hero-section">
      <Container>
        <Row className="align-items-center">
          <Col lg={6} className="hero-content" data-aos="fade-right">
            <h1 className="hero-title">{title}</h1>
            <p className="hero-subtitle">{subtitle}</p>
            <div className="hero-buttons">
              <Link to={ctaLink}>
                <Button variant="primary" size="lg">
                  {ctaText} <FaArrowRight />
                </Button>
              </Link>
            </div>
          </Col>
          {image && (
            <Col lg={6} className="hero-image" data-aos="fade-left">
              <img src={image} alt={title} />
            </Col>
          )}
        </Row>
      </Container>
    </section>
  )
}

export default Hero