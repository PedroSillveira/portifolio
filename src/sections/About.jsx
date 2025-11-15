import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';

function About() {
  return (
    <section id="about" className="bg-light">
      <Container>
        <div data-aos="fade-up">
          <SectionTitle title="Sobre Mim" />
        </div>
        <Row className="justify-content-center">
          <Col lg={8}>
            <p className="lead" data-aos="fade-up" data-aos-delay="100">
              Desenvolvedor Full Stack com experiência em criar aplicações web completas e escaláveis. 
              Atualmente, trabalho no Grupo GoX desenvolvendo soluções desde a interface de usuário até 
              APIs backend, seguindo padrões de projetos e metodologias ágeis.
            </p>
            <p className="lead" data-aos="fade-up" data-aos-delay="200">
              Como freelancer, desenvolvo soluções web de negócios, incluindo SaaS escaláveis, automação 
              de processos, sites institucionais e landing pages. Tenho formação como Tecnólogo em Análise 
              e Desenvolvimento de Sistemas e estou constantemente me aprimorando em automação com IA's 
              para otimização de processos e tomada de decisões.
            </p>
            <p className="lead mb-4" data-aos="fade-up" data-aos-delay="300">
              Combino habilidades técnicas sólidas com soft skills como comunicação assertiva, proatividade 
              e resolução de problemas, buscando sempre alinhar soluções tecnológicas às necessidades reais 
              de negócio.
            </p>
            <div className="text-center" data-aos="zoom-in" data-aos-delay="400">
              <Button 
                href="/curriculo-pedro-silveira.pdf" 
                download 
                variant="primary" 
                size="lg"
              >
                Baixar CV
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default About;