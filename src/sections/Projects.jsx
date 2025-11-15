import React from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';

function Projects() {
  const projects = [
    {
      id: 1,
      title: 'xTalents - Sistema de Recrutamento',
      description: 'Sistema de gerenciamento de processos seletivos e gestão de candidaturas com cálculo de compatibilidade entre vaga e candidato, acompanhamento de etapas e banco de talentos.',
      image: '/images/project1.png', // Adicionar imagem depois
      technologies: ['React.js', 'Node.js', 'Express.js', 'PostgreSQL'],
      demoLink: 'https://xtalents.goxsolucoes.com/',
      githubLink: '#' // Adicionar link GitHub
    },
    {
      id: 2,
      title: 'Projeto 2',
      description: 'Descrição breve do projeto 2. Adicione detalhes sobre funcionalidades e objetivo.',
      image: '/images/project2.png', // Adicionar imagem depois
      technologies: ['React.js', 'Bootstrap', 'Node.js'],
      demoLink: '#',
      githubLink: '#'
    },
    {
      id: 3,
      title: 'Projeto 3',
      description: 'Descrição breve do projeto 3. Adicione detalhes sobre funcionalidades e objetivo.',
      image: '/images/project3.png', // Adicionar imagem depois
      technologies: ['HTML', 'CSS', 'JavaScript'],
      demoLink: '#',
      githubLink: '#'
    }
  ];

  return (
    <section id="projects" className="bg-light">
      <Container>
        <SectionTitle title="Projetos" />
        <Row>
          {projects.map((project) => (
            <Col key={project.id} md={6} lg={4} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Img 
                  variant="top" 
                  src={project.image} 
                  alt={project.title}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{project.title}</Card.Title>
                  <Card.Text className="flex-grow-1">
                    {project.description}
                  </Card.Text>
                  <div className="mb-3">
                    {project.technologies.map((tech, index) => (
                      <Badge key={index} bg="secondary" className="me-2 mb-2">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="d-flex gap-2">
                    <Button 
                      href={project.demoLink} 
                      target="_blank" 
                      variant="primary" 
                      size="sm"
                      className="flex-grow-1"
                    >
                      Ver Demo
                    </Button>
                    <Button 
                      href={project.githubLink} 
                      target="_blank" 
                      variant="outline-dark" 
                      size="sm"
                      className="flex-grow-1"
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