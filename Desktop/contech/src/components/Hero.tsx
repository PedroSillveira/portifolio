import { Container, Button } from 'react-bootstrap';
import React from 'react';
import '../styles/Hero.css';

const Hero: React.FC = () => {
    const surveyUrl = "/orcamento-personalizado";

    return (
        <section id="hero" className="d-flex align-items-center justify-content-center text-center">
            {/* Vídeo de Background */}
            <div className="video-background">
                <iframe 
                    src="https://www.youtube.com/embed/HXJEakm65FI?autoplay=1&mute=1&loop=1&playlist=HXJEakm65FI&controls=0&showinfo=0&rel=0&modestbranding=1"
                    title="Background Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>

            {/* Overlay escuro para legibilidade */}
            <div className="video-overlay"></div>

            <Container className="hero-container p-4">
                <h1 className="animate-fade-in-up">
                    Transformamos sua Visão em Liderança Digital.
                </h1>
                
                <p className="lead animate-fade-in-up delay-1">
                    Desenvolvemos o Diferencial que o Seu Negócio Precisa para Otimizar e Dominar o Mercado.
                </p>
                
                <Button 
                    variant="custom"
                    href={surveyUrl}
                    size="lg"
                    className="btn-cta-primary animate-fade-in-up delay-2"
                >
                    Quero um Orçamento Personalizado
                </Button>
            </Container>
        </section>
    );
};

export default Hero;