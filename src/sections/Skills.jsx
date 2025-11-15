import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { 
  FaHtml5, 
  FaCss3Alt, 
  FaBootstrap, 
  FaReact, 
  FaNodeJs, 
  FaGitAlt 
} from 'react-icons/fa';
import { 
  SiExpress, 
  SiPostgresql, 
  SiJavascript,
  SiJsonwebtokens,
  SiSwagger,
  SiOpenai
} from 'react-icons/si';
import { DiDatabase } from 'react-icons/di';
import { AiOutlineApi } from 'react-icons/ai';
import SectionTitle from '../components/SectionTitle';
import OrbitRotation from '../components/OrbitRotation';
import './Skills.css';

function Skills() {
  const techIcons = [
    { Icon: FaHtml5, color: '#E34F26', name: 'HTML5' },
    { Icon: FaCss3Alt, color: '#1572B6', name: 'CSS3' },
    { Icon: FaBootstrap, color: '#7952B3', name: 'Bootstrap' },
    { Icon: FaReact, color: '#61DAFB', name: 'React' },
    { Icon: SiJavascript, color: '#F7DF1E', name: 'JavaScript' },
    { Icon: FaNodeJs, color: '#339933', name: 'Node.js' },
    { Icon: SiExpress, color: '#000000', name: 'Express' },
    { Icon: SiPostgresql, color: '#4169E1', name: 'PostgreSQL' },
    { Icon: SiJsonwebtokens, color: '#000000', name: 'JWT' },
    { Icon: AiOutlineApi, color: '#FF6C37', name: 'API REST' },
    { Icon: SiSwagger, color: '#85EA2D', name: 'Swagger' },
    { Icon: SiOpenai, color: '#412991', name: 'OpenAI' },
    { Icon: FaGitAlt, color: '#F05032', name: 'Git' },
    { Icon: DiDatabase, color: '#003B57', name: 'Database' },
  ];

  const centerIcon = {
    Icon: () => (
      <div className="center-icon-text">
        <span>PS</span>
      </div>
    ),
    name: 'Pedro Silveira'
  };

  return (
    <section id="skills">
      <Container>
        <div data-aos="fade-up">
          <SectionTitle title="Habilidades" />
        </div>
        
        <Row className="align-items-center">
          {/* Texto à esquerda */}
          <Col lg={5} className="mb-5 mb-lg-0" data-aos="fade-right">
            <div className="skills-content">
              <h3 className="mb-4">Tecnologias & Ferramentas</h3>
              
              <div className="skill-category mb-4">
                <h5 className="text-primary mb-3">Frontend</h5>
                <p className="text-muted">
                  Desenvolvimento de interfaces modernas e responsivas utilizando React.js, 
                  HTML5, CSS3 e Bootstrap. Foco em experiência do usuário e design intuitivo.
                </p>
              </div>

              <div className="skill-category mb-4">
                <h5 className="text-primary mb-3">Backend</h5>
                <p className="text-muted">
                  Criação de APIs robustas e escaláveis com Node.js e Express.js. 
                  Expertise em autenticação JWT, integração de serviços e documentação com Swagger.
                </p>
              </div>

              <div className="skill-category mb-4">
                <h5 className="text-primary mb-3">Banco de Dados</h5>
                <p className="text-muted">
                  Modelagem e otimização de bancos de dados relacionais com PostgreSQL. 
                  Experiência em queries complexas e performance.
                </p>
              </div>

              <div className="skill-category">
                <h5 className="text-primary mb-3">IA & Automação</h5>
                <p className="text-muted">
                  Desenvolvimento de soluções inteligentes utilizando OpenAI e Agent Builder 
                  para automação de processos e otimização de workflows.
                </p>
              </div>
            </div>
          </Col>

          {/* OrbitRotation à direita */}
          <Col lg={7} data-aos="fade-left">
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
        </Row>
      </Container>
    </section>
  );
}

export default Skills;