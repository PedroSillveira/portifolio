import { Container, Row, Col } from 'react-bootstrap'
import SEO from '../../components/common/SEO/SEO'
import Hero from '../../components/sections/Hero/Hero'
import ContactForm from '../../components/forms/ContactForm/ContactForm'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa'
import { COMPANY_INFO } from '../../utils/constants'
import './Contact.css'

function Contact() {
  return (
    <>
      <SEO 
        title={`Contato - ${COMPANY_INFO.name}`}
        description={`Entre em contato com ${COMPANY_INFO.name}. Estamos prontos para atender você!`}
      />
      
      <Hero 
        title="Entre em Contato"
        subtitle="Estamos prontos para transformar suas ideias em realidade"
      />

      <section className="contact-section">
        <Container>
          <Row>
            <Col lg={6} className="mb-4" data-aos="fade-right">
              <h3 className="mb-4">Envie sua mensagem</h3>
              <ContactForm />
            </Col>

            <Col lg={6} className="mb-4" data-aos="fade-left">
              <h3 className="mb-4">Informações de Contato</h3>
              
              <div className="contact-info">
                <div className="info-item">
                  <div className="info-icon">
                    <FaEnvelope />
                  </div>
                  <div className="info-content">
                    <h5>Email</h5>
                    <a href={`mailto:${COMPANY_INFO.email}`}>{COMPANY_INFO.email}</a>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <FaPhone />
                  </div>
                  <div className="info-content">
                    <h5>Telefone</h5>
                    <a href={`tel:+${COMPANY_INFO.phoneRaw}`}>{COMPANY_INFO.phone}</a>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <FaMapMarkerAlt />
                  </div>
                  <div className="info-content">
                    <h5>Endereço</h5>
                    <p>{COMPANY_INFO.address.full}</p>
                  </div>
                </div>

                <div className="info-item whatsapp-item">
                  <div className="info-icon whatsapp">
                    <FaWhatsapp />
                  </div>
                  <div className="info-content">
                    <h5>WhatsApp</h5>
                    <a 
                      href={COMPANY_INFO.whatsapp.link()} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="whatsapp-link"
                    >
                      {COMPANY_INFO.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="business-hours">
                <h5>Horário de Atendimento</h5>
                <p>{COMPANY_INFO.businessHours.weekdays}</p>
                <p>{COMPANY_INFO.businessHours.weekend}</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default Contact