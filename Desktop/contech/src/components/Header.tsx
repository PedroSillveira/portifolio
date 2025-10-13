import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import useScrollDirection from '../hooks/useScrollDirection';

const Header: React.FC = () => {
    const scrollDirection = useScrollDirection(10);
    const [activeSection, setActiveSection] = useState('#hero');
    const surveyUrl = "/orcamento-personalizado";

    // Mapeia a direção do scroll para classes CSS
    const getScrollClass = () => {
        switch(scrollDirection) {
            case 'down': return 'scroll-down';
            case 'up': return 'scroll-up';
            default: return 'scroll-initial';
        }
    };

    // Detecta a seção ativa baseada no scroll
    useEffect(() => {
        const handleScroll = () => {
            const sections = ['hero', 'produtos-valores', 'diferencial', 'faq'];
            const scrollPosition = window.scrollY + 100;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const offsetTop = element.offsetTop;
                    const offsetHeight = element.offsetHeight;
                    
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(`#${section}`);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <Navbar 
            expand="lg" 
            className={`main-header ${getScrollClass()}`}
            variant="dark"
        >
            <Container>
                <Navbar.Brand href="#hero" className="fw-bold text-light">
                    <span style={{ fontSize: '1.5rem', letterSpacing: '2px' }}>ZETAIE</span>
                </Navbar.Brand>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className="mx-auto me-lg-4">
                        <Nav.Link 
                            href="#hero" 
                            className={activeSection === '#hero' ? 'active-link' : ''}
                        >
                            Home
                        </Nav.Link>
                        
                        <Nav.Link 
                            href="#produtos-valores"
                            className={activeSection === '#produtos-valores' ? 'active-link' : ''}
                        >
                            Produtos
                        </Nav.Link>
                        
                        <Nav.Link 
                            href="#diferencial"
                            className={activeSection === '#diferencial' ? 'active-link' : ''}
                        >
                            Posicionamento
                        </Nav.Link>
                        
                        <Nav.Link 
                            href="#faq"
                            className={activeSection === '#faq' ? 'active-link' : ''}
                        >
                            FAQ
                        </Nav.Link>
                    </Nav>
                    
                    <Button 
                        variant="custom" 
                        href={surveyUrl}
                        className="header-cta"
                    >
                        Solicitar Contato
                    </Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;