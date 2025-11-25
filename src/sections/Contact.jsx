import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { FaGithub, FaLinkedin, FaWhatsapp, FaInstagram } from 'react-icons/fa';
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';
import Particles from '../components/ui/Particles';
import { MagicCard } from '../components/ui/MagicCard';
import './Contact.css';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        alert('Mensagem enviada! (Implementar backend depois)');
        setFormData({ name: '', email: '', message: '' });
    };

    const socialLinks = [
        { icon: FaGithub, url: 'https://github.com/PedroSillveira', label: 'GitHub' },
        { icon: FaLinkedin, url: 'https://www.linkedin.com/in/pedro-silveira-aaba05186/', label: 'LinkedIn' },
        { icon: FaWhatsapp, url: 'https://wa.me/5551992520889', label: 'WhatsApp' },
        { icon: FaInstagram, url: 'https://www.instagram.com/pedrosilgabriel/#', label: 'Instagram' }
    ];

    return (
        <section id="contact" className="contact-section">
            <Particles
                className="absolute inset-0"
                quantity={100}
                ease={80}
                color="#ffffff"
                refresh
            />

            <Container style={{ position: 'relative', zIndex: 1 }}>
                <div data-aos="fade-up">
                    <SectionTitle title="Contato" />
                </div>
                <Row className="justify-content-center">
                    <Col lg={8}>
                        <MagicCard 
                            gradientColor="#4a148c"
                            gradientFrom="#9E7AFF"
                            gradientTo="#4a148c"
                            className="p-4"
                            style={{ borderRadius: '1rem' }}
                        >
                            <Form onSubmit={handleSubmit} data-aos="fade-up" data-aos-delay="100">
                                <Form.Group className="mb-3">
                                    <Form.Label style={{ color: 'var(--white-color)' }}>Nome</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Seu nome"
                                        required
                                        style={{
                                            background: 'rgba(255, 255, 255, 0.1)',
                                            border: '1px solid rgba(255, 255, 255, 0.2)',
                                            color: 'var(--white-color)'
                                        }}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label style={{ color: 'var(--white-color)' }}>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="seu@email.com"
                                        required
                                        style={{
                                            background: 'rgba(255, 255, 255, 0.1)',
                                            border: '1px solid rgba(255, 255, 255, 0.2)',
                                            color: 'var(--white-color)'
                                        }}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label style={{ color: 'var(--white-color)' }}>Mensagem</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={5}
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Sua mensagem..."
                                        required
                                        style={{
                                            background: 'rgba(255, 255, 255, 0.1)',
                                            border: '1px solid rgba(255, 255, 255, 0.2)',
                                            color: 'var(--white-color)'
                                        }}
                                    />
                                </Form.Group>

                                <div className="text-center">
                                    <Button 
                                        type="submit" 
                                        variant="primary" 
                                        size="lg"
                                        style={{
                                            background: 'var(--white-color)',
                                            color: 'var(--black-color)',
                                            border: '2px solid var(--white-color)'
                                        }}
                                    >
                                        Enviar Mensagem
                                    </Button>
                                </div>
                            </Form>
                        </MagicCard>

                        <div className="text-center mt-5" data-aos="fade-up" data-aos-delay="200">
                            <h5 className="mb-4" style={{ color: 'var(--white-color)' }}>
                                Ou entre em contato pelas redes sociais:
                            </h5>
                            <div className="d-flex justify-content-center gap-4">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ 
                                            fontSize: '2rem',
                                            transition: 'transform 0.3s ease',
                                            color: 'var(--white-color)'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'scale(1.2)';
                                            e.currentTarget.style.color = 'var(--accent-purple)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'scale(1)';
                                            e.currentTarget.style.color = 'var(--white-color)';
                                        }}
                                        aria-label={social.label}
                                    >
                                        <social.icon />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default Contact;