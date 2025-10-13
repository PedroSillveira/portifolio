import { Container, Row, Col } from 'react-bootstrap';
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer id="footer" className="py-4 bg-dark-secondary border-top border-secondary mt-5">
            <Container>
                <Row className="text-center text-md-start">
                    {/* Informações de Contato e Logo */}
                    <Col md={6} className="mb-3 mb-md-0">
                        <h5 className="text-cta-color">[NOME DA EMPRESA]</h5>
                        <p className="small text-muted">Desenvolvimento de software de alta performance.</p>
                    </Col>
                    
                    {/* Links Legais e Contato Secundário */}

                </Row>
                <Row className="text-center mt-3">
                    <Col>
                        <p className="small text-muted mb-0">&copy; {new Date().getFullYear()} [NOME DA EMPRESA]. Todos os direitos reservados.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;