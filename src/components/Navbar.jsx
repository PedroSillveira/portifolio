import React, { useState, useEffect } from 'react';
import './Navbar.css';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 50) {
        setScrolled(false);
        setVisible(true);
      } else {
        setScrolled(true);
        
        if (currentScrollY < lastScrollY) {
          setVisible(true);
        } else {
          setVisible(false);
          setMenuOpen(false); // Fecha menu ao rolar para baixo
        }
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Previne scroll quando menu está aberto
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  const navItems = [
    { name: 'Home', link: '#home' },
    { name: 'Sobre', link: '#about' },
    { name: 'Habilidades', link: '#skills' },
    { name: 'Projetos', link: '#projects' },
    { name: 'Contato', link: '#contact' },
  ];

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <nav 
        className={`navbar-custom ${scrolled ? 'navbar-scrolled' : 'navbar-top'} ${!visible ? 'navbar-hidden' : ''}`}
      >
        <div className={scrolled ? 'container-scrolled' : 'container-top'}>
          <a href="#home" className="navbar-brand" onClick={() => setMenuOpen(false)}>
            Pedro Silveira
          </a>

          {/* Menu Desktop */}
          <ul className="navbar-nav navbar-desktop">
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
            className="btn-cv btn-cv-desktop"
          >
            Baixar CV
          </a>

          {/* Menu Hambúrguer Mobile */}
          <button 
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`hamburger ${menuOpen ? 'open' : ''}`}></span>
            <span className={`hamburger ${menuOpen ? 'open' : ''}`}></span>
            <span className={`hamburger ${menuOpen ? 'open' : ''}`}></span>
          </button>
        </div>
      </nav>

      {/* Menu Mobile Overlay */}
      <div className={`mobile-menu-overlay ${menuOpen ? 'open' : ''}`} onClick={handleNavClick}></div>

      {/* Menu Mobile */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav">
          {navItems.map((item, index) => (
            <li key={index}>
              <a 
                href={item.link} 
                className="mobile-nav-link"
                onClick={handleNavClick}
              >
                {item.name}
              </a>
            </li>
          ))}
          <li className="mobile-cv-item">
            <a 
              href="/curriculo-pedro-silveira.pdf" 
              download 
              className="btn-cv btn-cv-mobile"
              onClick={handleNavClick}
            >
              Baixar CV
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;