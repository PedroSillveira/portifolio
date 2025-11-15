import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Button from '../components/Button';

function Hero() {
  return (
    <section id="home" className="bg-dark text-white d-flex align-items-center">
      <Container>
        <Row className="justify-content-center text-center">
          <Col lg={8}>
            <h1 className="display-3 fw-bold mb-4">Pedro Silveira</h1>
            <h2 className="h3 mb-4">Desenvolvedor Web Full Stack</h2>
            <p className="lead mb-5">Transformando ideias em soluções digitais</p>
            <div className="d-flex gap-3 justify-content-center">
              <Button href="#projects" variant="primary" size="lg">
                Ver Projetos
              </Button>
              <Button href="#contact" variant="outline-light" size="lg">
                Entre em Contato
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Hero;