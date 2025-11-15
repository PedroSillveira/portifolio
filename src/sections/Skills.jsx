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

  const SkillCategory = ({ title, skills, delay }) => (
    <Col md={6} lg={4} className="mb-4" data-aos="fade-up" data-aos-delay={delay}>
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
        <div data-aos="fade-up">
          <SectionTitle title="Habilidades" />
        </div>
        <Row>
          <SkillCategory title="Frontend" skills={skillsData.frontend} delay="0" />
          <SkillCategory title="Backend" skills={skillsData.backend} delay="100" />
          <SkillCategory title="Ferramentas" skills={skillsData.tools} delay="200" />
          <SkillCategory title="IA & Automação" skills={skillsData.ai} delay="300" />
          <SkillCategory title="Soft Skills" skills={skillsData.soft} delay="400" />
        </Row>
      </Container>
    </section>
  );
}

export default Skills;