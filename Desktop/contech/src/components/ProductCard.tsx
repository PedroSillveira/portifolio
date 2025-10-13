import { Col } from 'react-bootstrap';
import React from 'react';

interface ProductCardProps {
    title: string;
    description: string;
    delay: number;
    icon?: string; // Opcional: pode adicionar ícones depois
}

const ProductCard: React.FC<ProductCardProps> = ({ title, description, delay }) => {
    const animationClass = `animate-fade-in-up delay-${delay}`;
    
    return (
        <Col md={4} className={`mb-4 ${animationClass}`}>
            <div className="product-card h-100">
                <div className="card-icon mb-3">
                    <div 
                        style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '12px',
                            background: 'linear-gradient(135deg, var(--cta-color), var(--roxo-primary))',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto'
                        }}
                    >
                        <span style={{ fontSize: '1.8rem' }}>✨</span>
                    </div>
                </div>
                
                <h3 className="text-cta-color mb-3 fw-bold text-center" style={{ fontSize: '1.3rem' }}>
                    {title}
                </h3>
                
                <p className="text-light text-center" style={{ lineHeight: '1.7' }}>
                    {description}
                </p>
            </div>
        </Col>
    );
};

export default ProductCard;