// components/Hero.tsx
import { Container, Button } from 'react-bootstrap';
import React from 'react';

const Hero: React.FC = () => {
    // URL simulada para a página de pesquisa de orçamento
    const surveyUrl = "/orcamento-personalizado";

    return (
        <section id="hero" className="d-flex align-items-center justify-content-center text-center bg-dark-primary text-light vh-100">
            <Container className="p-4">
                {/* HEADLINE */}
                <h1 className="display-3 fw-bold animate-fade-in-up">
                    Transformamos sua Visão em Liderança Digital.
                </h1>
                
                {/* SUB-HEADLINE */}
                <p className="lead mt-3 mb-5 animate-fade-in-up delay-1">
                    Desenvolvemos o Diferencial que o Seu Negócio Precisa para Otimizar e Dominar o Mercado.
                </p>
                
                {/* CTA PRIMÁRIO - Foco Total */}
                <Button 
                    variant="custom" // Usamos "custom" e aplicamos a classe CSS
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