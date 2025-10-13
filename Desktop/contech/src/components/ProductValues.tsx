import { Container, Row } from 'react-bootstrap';
import React from 'react';
import ProductCard from './ProductCard'; // Importa o componente reutilizável

const productsData = [
    { 
        title: "Landing Pages de Alta Conversão", 
        description: "Foco total em UX/UI e dados para maximizar sua captação de leads. Não é só bonito, converte.",
        delay: 3 // Define o delay de animação
    },
    { 
        title: "SaaS e CRUDS Escaláveis", 
        description: "Sistemas robustos (React, Node, Postgres) para gerenciar dados e operações com eficiência e segurança.",
        delay: 4
    },
    { 
        title: "Automação de Atendimento Inteligente", 
        description: "Liberamos sua equipe para o que importa. Automatize visitas, agendamentos e respostas iniciais.",
        delay: 5
    }
];

const ProductsValues: React.FC = () => {
    return (
        <section id="produtos-valores" className="py-5 bg-dark-secondary">
            <Container>
                <h2 className="text-center mb-5 animate-fade-in-up delay-2 fw-bold">
                    O que entregamos: Soluções que geram Retorno
                </h2>
                <Row className="text-center">
                    {/* Mapeia os dados para gerar os ProductCards de forma DRY */}
                    {productsData.map((product, index) => (
                        <ProductCard 
                            key={index}
                            title={product.title}
                            description={product.description}
                            delay={product.delay}
                        />
                    ))}
                </Row>
            </Container>
        </section>
    );
};

export default ProductsValues;