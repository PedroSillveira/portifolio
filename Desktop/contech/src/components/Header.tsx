import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import React from 'react';
import useScrollDirection from '../hooks/useScrollDirection'; 
// 🛑 IMPORTAÇÃO DO MÓDULO CSS 🛑
import styles from '../styles/Header.css'; 

const Header: React.FC = () => {
    const scrollDirection = useScrollDirection(10); 
    const surveyUrl = "/orcamento-personalizado";
    const activeSection = "#hero"; 

    // Mapeia a direção do scroll para a classe CSS do MÓDULO
    let scrollClass;
    if (scrollDirection === 'down') {
        scrollClass = styles.scrollDown;
    } else if (scrollDirection === 'up') {
        scrollClass = styles.scrollUp;
    } else {
        scrollClass = styles.scrollInitial;
    }

    // Combina a classe base do módulo com a classe de scroll
    const headerClass = `${styles.mainHeader} ${scrollClass}`;

    return (
        <Navbar 
            expand="lg" 
            className={headerClass} /* Usa a classe combinada do Módulo */
            variant="dark"
        >
            <Container> 
                <Navbar.Brand href="#hero" className="fw-bold text-light">
                    <span style={{ fontSize: '1.5rem' }}>ZETAIE</span>
                </Navbar.Brand>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className="mx-auto me-lg-4"> 
                        <Nav.Link 
                            href="#hero" 
                            // Usa a classe do MÓDULO
                            className={activeSection === "#hero" ? styles.activeLink : ""}
                        >Home</Nav.Link>
                        
                        <Nav.Link href="#produtos-valores">Produtos</Nav.Link>
                        
                        <Nav.Link href="#diferencial">Posicionamento</Nav.Link>
                        
                        <Nav.Link href="#faq">FAQ</Nav.Link>
                    </Nav>
                    
                    <Button 
                        variant="custom" 
                        href={surveyUrl}
                        // Usa a classe do MÓDULO
                        className={styles.headerCta} 
                    >
                        Solicitar Contato
                    </Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;