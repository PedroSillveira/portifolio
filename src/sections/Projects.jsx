import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';
import './Projects.css';

function Projects() {
  const projects = [
    {
      id: 1,
      title: 'X-talents - Sistema de Recrutamento',
      description: 'Sistema de gerenciamento de processos seletivos e gestão de candidaturas com cálculo de compatibilidade entre vaga e candidato, acompanhamento de etapas e banco de talentos.',
      image: `${process.env.PUBLIC_URL}/images/projeto_xtalent_desktop.jpeg`,
      technologies: ['React.js', 'Node.js', 'PostgreSQL'],
      demoLink: 'https://xtalents.goxsolucoes.com/home',
      githubLink: '#'
    },
    {
      id: 2,
      title: 'Shopping Maq - Ecommerce & ERP',
      description: 'Sistema web para venda online de peças e acessórios de máquinas de costura, com gestão centralizada de estoque, controle de ordens de serviço de manutenção e integração com Mercado Pago e Correios.',
      image: `${process.env.PUBLIC_URL}/images/projeto_desenvolvimento.jpg`,
      technologies: ['React.js', 'Bootstrap', 'Node.js'],
      demoLink: '#',
      githubLink: '#'
    },
    {
      id: 3,
      title: 'Landing Page & Automação pré-venda',
      description: 'Landing page com redirecionamento para WhatsApp e mensagens pré-configuradas, atendimento automatizado por agentes de pré-venda para esclarecer dúvidas, apresentação de valores e condições comerciais.',
      image: `${process.env.PUBLIC_URL}/images/projeto_desenvolvimento.jpg`,
      technologies: ['Agent Builder', 'React', 'Python'],
      demoLink: '#',
      githubLink: '#'
    }
  ];

  return (
    <section id="projects">
      <Container>
        <div data-aos="fade-up">
          <SectionTitle title="Projetos" />
        </div>
        <Row>
          {projects.map((project) => (
            <Col key={project.id} md={6} lg={4} className="mb-4" data-aos="fade-up">
              <Card className="project-card h-100">
                <Card.Img 
                  variant="top" 
                  src={project.image} 
                  alt={project.title}
                  className="project-image"
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{project.title}</Card.Title>
                  <Card.Text className="flex-grow-1 mb-5">{project.description}</Card.Text>
                  
                  {/* <div className="mb-3">
                    {project.technologies.map((tech, index) => (
                      <Badge key={index} bg="" className="me-2 mb-2">
                        {tech}
                      </Badge>
                    ))}
                  </div> */}
                  
                  <div className="d-flex gap-2">
                    <Button 
                      href={project.demoLink} 
                      target="_blank" 
                      size="sm"
                      className="flex-grow-1"
                    >
                      Ver
                    </Button>
                    <Button 
                      href={project.githubLink} 
                      target="_blank" 
                      size="sm"
                      className="flex-grow-1 btn-outline"
                    >
                      GitHub
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default Projects;