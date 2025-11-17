import React, { useState, useEffect } from 'react';
import './Navbar.css';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Define se está no topo
      if (currentScrollY < 50) {
        setScrolled(false);
        setVisible(true);
      } else {
        setScrolled(true);
        
        // Mostra navbar ao rolar para cima, esconde ao rolar para baixo
        if (currentScrollY < lastScrollY) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { name: 'Home', link: '#home' },
    { name: 'Sobre', link: '#about' },
    { name: 'Habilidades', link: '#skills' },
    { name: 'Projetos', link: '#projects' },
    { name: 'Contato', link: '#contact' },
  ];

  return (
    <nav 
      className={`navbar-custom ${scrolled ? 'navbar-scrolled' : 'navbar-top'} ${!visible ? 'navbar-hidden' : ''}`}
    >
      <div className={scrolled ? 'container-scrolled' : 'container-top'}>
        <a href="#home" className="navbar-brand">
          Pedro Silveira
        </a>

        <ul className="navbar-nav">
          {navItems.map((item, index) => (
            <li key={index}>
              <a href={item.link} className="nav-link">
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        <a 
          href="/curriculo-pedro-silveira.pdf" 
          download 
          className="btn-cv"
        >
          Baixar CV
        </a>
      </div>
    </nav>
  );
}

export default Navbar;