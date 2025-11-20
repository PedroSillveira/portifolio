import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { 
  FaHtml5, 
  FaCss3Alt, 
  FaBootstrap, 
  FaReact, 
  FaNodeJs, 
  FaGitAlt,
  FaGithub,
  FaDocker,
  FaNpm,
  FaPython,
  FaCode,
  FaRobot,
  FaLaptopCode,
  FaServer,
  FaDatabase,
  FaJs,
  FaVuejs,
  FaSass,
  FaMarkdown,
  FaLinux,
  FaAws,
  FaTrello,
  FaFigma,
} from 'react-icons/fa';
import SectionTitle from '../components/SectionTitle';
import OrbitRotation from '../components/ui/OrbitRotation';
import Particles from '../components/ui/Particles';
import { HoverEffect } from '../components/ui/card-hover-effect';
import './Skills.css';

function Skills() {
  const techIcons = [
    // Órbita 1 - Frontend (8 ícones)
    { Icon: FaReact, color: '#61DAFB', name: 'React.js' },
    { Icon: FaJs, color: '#F7DF1E', name: 'JavaScript' },
    { Icon: FaHtml5, color: '#E34F26', name: 'HTML5' },
    { Icon: FaCss3Alt, color: '#1572B6', name: 'CSS3' },
    { Icon: FaBootstrap, color: '#7225e4ff', name: 'Bootstrap' },
    { Icon: FaSass, color: '#CC6699', name: 'Sass' },
    { Icon: FaVuejs, color: '#4FC08D', name: 'Vue.js' },
    
    // Órbita 2 - Backend + Database + IA (12 ícones)
    { Icon: FaNodeJs, color: '#339933', name: 'Node.js' },
    { Icon: FaDatabase, color: '#2f5ee9ff', name: 'PostgreSQL' },
    { Icon: FaDatabase, color: '#4479A1', name: 'MySQL' },
    { Icon: FaDatabase, color: '#47A248', name: 'MongoDB' },
    { Icon: FaCode, color: '#FF6C37', name: 'API REST' },
    { Icon: FaRobot, color: '#401bb9ff', name: 'OpenAI' },
    { Icon: FaPython, color: '#3776AB', name: 'Python' },
    { Icon: FaCode, color: '#85EA2D', name: 'Clean Code' },
    { Icon: FaMarkdown, color: '#000000', name: 'Markdown' },
    
    // Órbita 3 - Ferramentas + DevOps (8 ícones)
    { Icon: FaGitAlt, color: '#F05032', name: 'Git' },
    { Icon: FaGithub, color: '#ffffffff', name: 'GitHub' },
    { Icon: FaDocker, color: '#2496ED', name: 'Docker' },
    { Icon: FaNpm, color: '#CB3837', name: 'NPM' },
    { Icon: FaLinux, color: '#FCC624', name: 'Linux' },
    { Icon: FaAws, color: '#ffa011ff', name: 'AWS' },
    { Icon: FaFigma, color: '#a22fa4ff', name: 'Figma' },
    { Icon: FaTrello, color: '#0052CC', name: 'Trello' },
  ];

  const centerIcon = {
    Icon: () => (
      <div className="center-icon-text">
        
          <FaCode />
        
      </div>
    ),
    name: 'Pedro Silveira'
  };

  const skillCategories = [
    {
      icon: FaLaptopCode,
      title: 'Frontend',
      color: '#000000',
      description: 'Interfaces modernas e responsivas com foco em experiência do usuário.',
      techs: ['React.js', 'JavaScript', 'Bootstrap',]
    },
    {
      icon: FaServer,
      title: 'Backend',
      color: '#000000',
      description: 'APIs robustas e escaláveis com autenticação e documentação completa.',
      techs: ['Node.js', 'Express.js', 'Python' ]
    },
    {
      icon: FaDatabase,
      title: 'Banco de Dados',
      color: '#000000',
      description: 'Modelagem e otimização de dados com queries complexas.',
      techs: ['PostgreSQL', 'MySQL', 'MongoDB']
    },
    {
      icon: FaRobot,
      title: 'IA & Automação',
      color: '#000000',
      description: 'Soluções inteligentes para automação e otimização de processos.',
      techs: ['OpenAI', 'Agent Builder', 'N8N']
    }
  ];

  return (
    <section id="skills" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Particles Background */}
      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}
        color="#ffffff"
        refresh
      />
      
      <Container style={{ position: 'relative', zIndex: 1 }}>
        <div data-aos="fade-up">
          <SectionTitle title="Habilidades" />
        </div>
        
        <Row className="align-items-center">
          <Col lg={6} className="mb-5 mb-lg-0" data-aos="fade-right">
            <div className="orbit-wrapper-container">
              <OrbitRotation
                icons={techIcons}
                orbitCount={3}
                orbitGap={8}
                centerIcon={centerIcon}
                size="md"
                speed="medium"
              />
            </div>
          </Col>

          <Col lg={6} data-aos="fade-left">
            <HoverEffect items={skillCategories} />
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Skills;