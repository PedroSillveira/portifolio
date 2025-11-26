import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SectionTitle from '../components/SectionTitle';
// import Button from '../components/Button';
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
                    <div className="about-card-label text-center">Pedro Silveira</div>
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
                Desenvolvedor Full Stack apaixonado por transformar ideias em soluções. Atualmente trabalho no Grupo GoX criando aplicações web e, paralelamente, desenvolvo projetos freelance de SaaS, Landing Page e automação com IA.
              </p>
              <p className="lead mb-3">
                Graduado em Análise e Desenvolvimento de Sistemas, estou sempre buscando formas de usar tecnologia para resolver problemas e otimizar tempo. Gosto de trabalhar em equipe, tenho ótima comunicação e sou proativo.
              </p>
              <p className="lead mb-4">
                Meu objetivo é simples: aprender o máximo possível, entregar resultado, agregar valor e crescer junto com aquelas que confiam no meu trabalho.
              </p>

            </div>
            <div data-aos="zoom-in" data-aos-delay="200" className='button-download'>
              <a
                href="/curriculo-pedro-silveira.pdf"
                download
                className="download-cv-button"
                onClick={(e) => {
                  const button = e.currentTarget;
                  button.classList.add('downloading');
                  setTimeout(() => {
                    button.classList.remove('downloading');
                    button.classList.add('downloaded');
                    setTimeout(() => {
                      button.classList.remove('downloaded');
                    }, 2000);
                  }, 2000);
                }}
              >
                <span className="download-icon">
                  <svg className="icon-download" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  <svg className="icon-check" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
                <span className="download-text" data-normal="Baixar Currículo" data-downloading="Baixando..." data-downloaded="Concluído!">
                  Baixar Currículo
                </span>
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default About;