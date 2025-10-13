// components/ProductCard.tsx
import { Col } from 'react-bootstrap';
import React from 'react';

interface ProductCardProps {
    title: string;
    description: string;
    delay: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, description, delay }) => {
    // Aplica o delay de animação como uma classe dinâmica
    const animationClass = `animate-fade-in-up delay-${delay}`;
    
    return (
        <Col md={4} className={`mb-4 ${animationClass}`}>
            <div className="p-3">
                <h3 className="text-cta-color mb-3">{title}</h3> 
                <p>{description}</p>
            </div>
        </Col>
    );
};

export default ProductCard;