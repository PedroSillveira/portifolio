import React, { useState } from 'react';
import { Container, Row, Col, Form, Toast } from 'react-bootstrap';
import { FaGithub, FaLinkedin, FaWhatsapp, FaInstagram, FaCheckCircle, FaExclamationCircle, FaInfoCircle } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
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
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });
    const [showToast, setShowToast] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        if (status.message) setStatus({ type: '', message: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus({ type: '', message: '' });

        try {
            await emailjs.send(
                'service_eicivhn',
                'template_bg84urr',
                {
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                },
                'THvXTpKsjvL1Jf3Xc'
                // é apenas a chave publica, dont worry rs
            );

            setStatus({ 
                type: 'success', 
                message: 'Mensagem enviada com sucesso! Responderei em breve.' 
            });
            setFormData({ name: '', email: '', message: '' });
            
            // Mostra o toast após 1 segundo
            setTimeout(() => {
                setShowToast(true);
            }, 1000);
            
            // Remove mensagem de sucesso após 5 segundos
            setTimeout(() => {
                setStatus({ type: '', message: '' });
            }, 5000);
        } catch (error) {
            console.error('Erro ao enviar email:', error);
            setStatus({ 
                type: 'error', 
                message: 'Ops! Algo deu errado. Tente novamente ou use as redes sociais abaixo.' 
            });
        } finally {
            setIsLoading(false);
        }
    };

    const socialLinks = [
        { icon: FaGithub, url: 'https://github.com/PedroSillveira', label: 'GitHub', color: 'github' },
        { icon: FaLinkedin, url: 'https://www.linkedin.com/in/pedro-silveira-aaba05186/', label: 'LinkedIn', color: 'linkedin' },
        { icon: FaWhatsapp, url: 'https://wa.me/5551992520889', label: 'WhatsApp', color: 'whatsapp' },
        { icon: FaInstagram, url: 'https://www.instagram.com/pedrosilgabriel/#', label: 'Instagram', color: 'instagram' }
    ];

    return (
        <section id="contact" className="contact-section">
            {/* Toast Notification */}
            <div
                style={{
                    position: 'fixed',
                    top: '20px',
                    right: '20px',
                    zIndex: 9999
                }}
            >
                <Toast 
                    show={showToast} 
                    onClose={() => setShowToast(false)} 
                    delay={20000} 
                    autohide
                    style={{
                        minWidth: '350px',
                        background: 'rgba(0, 0, 0, 0.95)',
                        border: '1px solid var(--accent-purple)',
                        boxShadow: '0 8px 32px rgba(74, 20, 140, 0.3)'
                    }}
                >
                    <Toast.Header 
                        closeButton={true}
                        style={{
                            background: 'rgba(74, 20, 140, 0.2)',
                            borderBottom: '1px solid var(--accent-purple)',
                            color: 'white'
                        }}
                    >
                        <FaInfoCircle className="me-2" style={{ color: 'var(--accent-purple)' }} />
                        <strong className="me-auto" style={{ color: 'white' }}>Informação Importante</strong>
                    </Toast.Header>
                    <Toast.Body style={{ color: 'white', padding: '1rem' }}>
                        <p style={{ marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                            Sua mensagem não ficará salva em seus "Enviados", mas <strong>recebi seu e-mail com sucesso</strong>!
                        </p>
                        <p style={{ marginBottom: '0', fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                            Não se preocupe, entrarei em contato em breve. Obrigado! 🚀
                        </p>
                    </Toast.Body>
                </Toast>
            </div>

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
                                {status.message && (
                                    <div 
                                        className="alert d-flex align-items-center mb-3"
                                        style={{
                                            background: status.type === 'success' 
                                                ? 'rgba(37, 211, 102, 0.1)' 
                                                : 'rgba(255, 68, 68, 0.1)',
                                            border: `1px solid ${status.type === 'success' ? '#25D366' : '#ff4444'}`,
                                            color: status.type === 'success' ? '#25D366' : '#ff4444',
                                            borderRadius: '0.5rem',
                                            padding: '1rem'
                                        }}
                                    >
                                        {status.type === 'success' ? (
                                            <FaCheckCircle className="me-2" size={20} />
                                        ) : (
                                            <FaExclamationCircle className="me-2" size={20} />
                                        )}
                                        {status.message}
                                    </div>
                                )}

                                <Form.Group className="mb-3">
                                    <Form.Label style={{ color: 'var(--white-color)', fontWeight: '500' }}>
                                        Nome *
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Como você se chama?"
                                        required
                                        disabled={isLoading}
                                        style={{
                                            background: 'rgba(255, 255, 255, 0.1)',
                                            border: '1px solid rgba(255, 255, 255, 0.2)',
                                            color: 'var(--white-color)',
                                            transition: 'all 0.3s ease'
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = 'var(--accent-purple)';
                                            e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                                            e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                                        }}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label style={{ color: 'var(--white-color)', fontWeight: '500' }}>
                                        Email *
                                    </Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="seu.email@exemplo.com"
                                        required
                                        disabled={isLoading}
                                        style={{
                                            background: 'rgba(255, 255, 255, 0.1)',
                                            border: '1px solid rgba(255, 255, 255, 0.2)',
                                            color: 'var(--white-color)',
                                            transition: 'all 0.3s ease'
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = 'var(--accent-purple)';
                                            e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                                            e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                                        }}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label style={{ color: 'var(--white-color)', fontWeight: '500' }}>
                                        Mensagem *
                                    </Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={5}
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Conte-me sobre seu projeto ou oportunidade..."
                                        required
                                        disabled={isLoading}
                                        style={{
                                            background: 'rgba(255, 255, 255, 0.1)',
                                            border: '1px solid rgba(255, 255, 255, 0.2)',
                                            color: 'var(--white-color)',
                                            transition: 'all 0.3s ease',
                                            resize: 'vertical'
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = 'var(--accent-purple)';
                                            e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                                            e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                                        }}
                                    />
                                    <small style={{ color: 'rgba(255, 255, 255, 0.6)', display: 'block', marginTop: '0.5rem' }}>
                                        {formData.message.length}/500 caracteres
                                    </small>
                                </Form.Group>

                                <div className="text-center">
                                    <Button 
                                        type="submit" 
                                        variant="primary" 
                                        size="lg"
                                        disabled={isLoading}
                                        style={{
                                            background: isLoading ? 'var(--gray-600)' : 'var(--white-color)',
                                            color: 'var(--black-color)',
                                            border: `2px solid ${isLoading ? 'var(--gray-600)' : 'var(--white-color)'}`,
                                            minWidth: '200px',
                                            position: 'relative'
                                        }}
                                    >
                                        {isLoading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                Enviando...
                                            </>
                                        ) : (
                                            'Enviar Mensagem'
                                        )}
                                    </Button>
                                </div>
                            </Form>
                        </MagicCard>

                        <div className="text-center mt-5" data-aos="fade-up" data-aos-delay="200">
                            <h5 className="mb-4" style={{ color: 'var(--white-color)' }}>
                                Ou conecte-se comigo:
                            </h5>
                            <div className="d-flex justify-content-center gap-4">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`social-icon social-icon-${social.color}`}
                                        aria-label={social.label}
                                        title={social.label}
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