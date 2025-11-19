import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FaGithub, FaLinkedin, FaWhatsapp, FaInstagram } from 'react-icons/fa';
import Button from '../components/Button';
import Particles from '../components/ui/Particles';
import ScrollHero from '../components/ScrollHero';
import './Hero.css';

function Hero() {
  const socialLinks = [
    { icon: FaGithub, url: 'https://github.com/PedroSillveira', label: 'GitHub', color: 'github' },
    { icon: FaLinkedin, url: 'https://www.linkedin.com/in/pedro-silveira-aaba05186/', label: 'LinkedIn', color: 'linkedin' },
    { icon: FaWhatsapp, url: 'https://wa.me/5551992520889', label: 'WhatsApp', color: 'whatsapp' },
    { icon: FaInstagram, url: 'https://www.instagram.com/pedrosilgabriel/', label: 'Instagram', color: 'instagram' }
  ];

  return (
    <section id="home" className="hero-section">
      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}
        color="#ffffff"
        refresh
      />

      <Container>
        <Row className="text-left">
          <Col lg={8}>
            <motion.h2
              className="subtitle h1 mb-4 text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <TypeAnimation
                sequence={[
                  'Desenvolvedor Frontend',
                  2000,
                  'Desenvolvedor Backend',
                  2000,
                  'Desenvolvedor Full Stack',
                  2000,
                  'Agent Builder',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </motion.h2>

            <motion.p
              className="lead mb-2 text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              style={{ maxWidth: '700px', lineHeight: '1.7' }}
            >
              Desenvolvedor Full Stack especializado em criar aplicações web funcionais
              e escaláveis que solucionam problemas reais, agregam valor e impulsionam
              resultados de negócio.
            </motion.p>

            {/* <motion.div
              className="d-flex gap-3 flex-wrap"
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
            </motion.div> */}

            <motion.div
              className="social-icons"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`social-icon social-icon-${social.color}`}
                  aria-label={social.label}
                >
                  <social.icon />
                </a>
              ))}
            </motion.div>
          </Col>
        </Row>
      </Container>
      <ScrollHero />
    </section>
  );
}

export default Hero;