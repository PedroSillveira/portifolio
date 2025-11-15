import React from 'react';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import SectionTitle from '../components/SectionTitle';

function Skills() {
  const skillsData = {
    frontend: ['HTML', 'CSS', 'Bootstrap', 'React.js'],
    backend: ['Node.js', 'Express.js', 'PostgreSQL', 'JWT', 'Nodemailer'],
    tools: ['Axios', 'Swagger', 'SMTP', 'AES-256', 'Hashing MD5'],
    ai: ['Agent Builder (OpenAI)', 'Automação com IA'],
    soft: ['Comunicação assertiva', 'Proatividade', 'Resolução de problemas', 'Dedicação']
  };

  const SkillCategory = ({ title, skills }) => (
    <Col md={6} lg={4} className="mb-4">
      <h4 className="mb-3">{title}</h4>
      <div className="d-flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <Badge key={index} bg="primary" className="p-2">
            {skill}
          </Badge>
        ))}
      </div>
    </Col>
  );

  return (
    <section id="skills">
      <Container>
        <SectionTitle title="Habilidades" />
        <Row>
          <SkillCategory title="Frontend" skills={skillsData.frontend} />
          <SkillCategory title="Backend" skills={skillsData.backend} />
          <SkillCategory title="Ferramentas" skills={skillsData.tools} />
          <SkillCategory title="IA & Automação" skills={skillsData.ai} />
          <SkillCategory title="Soft Skills" skills={skillsData.soft} />
        </Row>
      </Container>
    </section>
  );
}

export default Skills;