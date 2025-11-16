import React from 'react';
import './ScrollHero.css';

function ScrollHero() {
  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="scroll-hero" onClick={scrollToNext}>
      <div className="scroll-arrow"></div>
    </div>
  );
}

export default ScrollHero;