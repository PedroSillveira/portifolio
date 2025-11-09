import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'
import { COMPANY_INFO, NAV_LINKS } from '../../../utils/constants'
import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <Container>
        <Row className="footer-content">
          {/* Coluna 1: Sobre */}
          <Col lg={4} md={6} className="mb-4">
            <h5>{COMPANY_INFO.name}</h5>
            <p className="footer-description">
              {COMPANY_INFO.description}
            </p>
          </Col>

          {/* Coluna 2: Links Rápidos */}
          <Col lg={2} md={6} className="mb-4">
            <h5>Links Rápidos</h5>
            <ul className="footer-links">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link to={link.path}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </Col>

          {/* Coluna 3: Contato */}
          <Col lg={3} md={6} className="mb-4">
            <h5>Contato</h5>
            <ul className="footer-contact">
              <li>
                <FaEnvelope />
                <a href={`mailto:${COMPANY_INFO.email}`}>
                  {COMPANY_INFO.email}
                </a>
              </li>
              <li>
                <FaPhone />
                <a href={`tel:+${COMPANY_INFO.phoneRaw}`}>
                  {COMPANY_INFO.phone}
                </a>
              </li>
              <li>
                <FaMapMarkerAlt />
                <span>{COMPANY_INFO.address.city}, {COMPANY_INFO.address.state}</span>
              </li>
            </ul>
          </Col>

          {/* Coluna 4: Redes Sociais */}
          <Col lg={3} md={6} className="mb-4">
            <h5>Redes Sociais</h5>
            <div className="footer-social">
              <a href={COMPANY_INFO.social.facebook} target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </a>
              <a href={COMPANY_INFO.social.instagram} target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
              <a href={COMPANY_INFO.social.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </a>
              <a href={COMPANY_INFO.social.twitter} target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
            </div>
            <a 
              href={COMPANY_INFO.whatsapp.link()} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              <FaWhatsapp /> WhatsApp
            </a>
          </Col>
        </Row>

        {/* Copyright */}
        <div className="footer-bottom">
          <p>
            © {currentYear} {COMPANY_INFO.name}. Todos os direitos reservados.
          </p>
        </div>
      </Container>
    </footer>
  )
}

export default Footer