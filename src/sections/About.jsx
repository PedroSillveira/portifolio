import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';
import { CometCard } from '../components/ui/comet-card';
import './About.css';

function About() {
  return (
    <section id="about" className="bg-light">
      <Container>
        <Row className="align-items-center">
          {/* Imagem à esquerda com efeito 3D */}
          <Col lg={5} className="mb-4 mb-lg-0" data-aos="fade-right">
            <div className="about-image-wrapper">
              <CometCard>
                <div className="about-card">
                  <div className="about-image-container">
                    <img
                      src={`${process.env.PUBLIC_URL}/images/profile.png`}
                      alt="Pedro Silveira"
                      className="about-image"
                      onLoad={() => console.log('Imagem carregada com sucesso!')}
                      onError={(e) => {
                        console.error('Erro ao carregar imagem:', e.target.src);
                        // Tenta caminho alternativo
                        if (e.target.src.includes('profile.png')) {
                          e.target.src = './images/profile.png';
                        } else {
                          e.target.src = 'https://via.placeholder.com/400x600/667eea/ffffff?text=Pedro+Silveira';
                        }
                      }}
                    />
                  </div>
                  <div className="about-card-footer d-flex align-items-center justify-content-center">
                    <div className="about-card-label ">Pedro Silveira - Desenvolvedor Full Stack</div>
                    {/* <div className="about-card-id">#DEV</div> */}
                  </div>
                </div>
              </CometCard>
            </div>
          </Col>

          {/* Texto à direita */}
          <Col lg={7} data-aos="fade-left">
            <div data-aos="fade-up">
              <SectionTitle title="Sobre Mim" />
            </div>
            <div className="about-content">
              <p className="lead mb-3">
                Desenvolvedor Full Stack com experiência em criar aplicações web completas e escaláveis.
                Atualmente, trabalho no Grupo GoX desenvolvendo soluções desde a interface de usuário até
                APIs backend, seguindo padrões de projetos e metodologias ágeis.
              </p>
              <p className="lead mb-3">
                Como freelancer, desenvolvo soluções web de negócios, incluindo SaaS escaláveis, automação
                de processos, sites institucionais e landing pages. Tenho formação como Tecnólogo em Análise
                e Desenvolvimento de Sistemas e estou constantemente me aprimorando em automação com IA's
                para otimização de processos e tomada de decisões.
              </p>
              <p className="lead mb-4">
                Combino habilidades técnicas sólidas com soft skills como comunicação assertiva, proatividade
                e resolução de problemas, buscando sempre alinhar soluções tecnológicas às necessidades reais
                de negócio.
              </p>

            </div>
            <div data-aos="zoom-in" data-aos-delay="200" className='button-download'>
              <Button
                href="/curriculo-pedro-silveira.pdf"
                download
                variant="primary"
                size="lg"
              >
                Baixar currículo
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default About;