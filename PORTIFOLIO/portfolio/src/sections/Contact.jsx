import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { FaGithub, FaLinkedin, FaWhatsapp, FaInstagram } from 'react-icons/fa';
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';

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
        // Implementar lógica de envio do formulário
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
        <section id="contact">
            <Container>
                <SectionTitle title="Contato" />
                <Row className="justify-content-center">
                    <Col lg={8}>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Seu nome"
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="seu@email.com"
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Mensagem</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={5}
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Sua mensagem..."
                                    required
                                />
                            </Form.Group>

                            <div className="text-center">
                                <Button type="submit" variant="primary" size="lg">
                                    Enviar Mensagem
                                </Button>
                            </div>
                        </Form>

                        <div className="text-center mt-5">
                            <h5 className="mb-4">Ou entre em contato pelas redes sociais:</h5>
                            <div className="d-flex justify-content-center gap-4">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-dark"
                                        style={{ fontSize: '2rem' }}
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
        </section >
    );
}

export default Contact;