import { Container, Row, Col } from 'react-bootstrap'
import SEO from '../../components/common/SEO/SEO'
import Hero from '../../components/sections/Hero/Hero'
import Team from '../../components/sections/Team/Team'
import Stats from '../../components/sections/Stats/Stats'
import CTA from '../../components/sections/CTA/CTA'
import { COMPANY_INFO } from '../../utils/constants'
import './About.css'

function About() {
  return (
    <>
      <SEO 
        title={`Sobre - ${COMPANY_INFO.name}`}
        description={`Conheça mais sobre ${COMPANY_INFO.name}, nossa história, missão e valores.`}
      />
      
      <Hero 
        title="Sobre Nós"
        subtitle={`Conheça a história e os valores da ${COMPANY_INFO.name}`}
      />

      <section className="about-content">
        <Container>
          <Row className="align-items-center mb-5">
            <Col lg={6} data-aos="fade-right">
              <h2>Nossa História</h2>
              <p>
                Fundada com o propósito de transformar ideias em soluções digitais inovadoras,
                a {COMPANY_INFO.name} nasceu da paixão por tecnologia e do compromisso com a excelência.
              </p>
              <p>
                Ao longo dos anos, construímos uma trajetória de sucesso, baseada em confiança,
                inovação e resultados extraordinários para nossos clientes.
              </p>
            </Col>
            <Col lg={6} data-aos="fade-left">
              <div className="about-image">
                <img src="https://via.placeholder.com/600x400" alt="Nossa História" />
              </div>
            </Col>
          </Row>

          <Row className="values-section">
            <Col md={4} className="mb-4" data-aos="fade-up">
              <div className="value-card">
                <h3>Missão</h3>
                <p>
                  Transformar negócios através de soluções tecnológicas inovadoras,
                  agregando valor e impulsionando o crescimento dos nossos clientes.
                </p>
              </div>
            </Col>
            <Col md={4} className="mb-4" data-aos="fade-up" data-aos-delay="100">
              <div className="value-card">
                <h3>Visão</h3>
                <p>
                  Ser referência em inovação tecnológica, reconhecidos pela qualidade
                  dos nossos serviços e impacto positivo nos negócios dos clientes.
                </p>
              </div>
            </Col>
            <Col md={4} className="mb-4" data-aos="fade-up" data-aos-delay="200">
              <div className="value-card">
                <h3>Valores</h3>
                <ul>
                  <li>Inovação Constante</li>
                  <li>Excelência</li>
                  <li>Transparência</li>
                  <li>Compromisso</li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Stats />
      
      <Team />
      
      <CTA 
        title="Quer fazer parte do nosso time?"
        subtitle="Estamos sempre em busca de talentos"
        ctaText="Entre em Contato"
      />
    </>
  )
}

export default About