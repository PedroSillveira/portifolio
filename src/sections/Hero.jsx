import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import Button from '../components/Button';
import DockText from '../components/DockText';
import './Hero.css';

function Hero() {
  return (
    <section id="home" className="hero-section d-flex align-items-center">
      <Container>
        <Row className="justify-content-center text-center">
          <Col lg={8}>
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <DockText text="PEDRO SILVEIRA" className="hero-title text-white" />
            </motion.div>
            
            <motion.h2 
              className="h3 mb-4 text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <TypeAnimation
                sequence={[
                  'Desenvolvedor Web Full Stack',
                  2000,
                  'Desenvolvedor Frontend',
                  2000,
                  'Desenvolvedor Backend',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </motion.h2>
            
            <motion.p 
              className="lead mb-5 text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Transformando ideias em soluções digitais
            </motion.p>
            
            <motion.div 
              className="d-flex gap-3 justify-content-center flex-wrap"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              <Button href="#projects" variant="light" size="lg">
                Ver Projetos
              </Button>
              <Button href="#contact" variant="outline-light" size="lg">
                Entre em Contato
              </Button>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Hero;