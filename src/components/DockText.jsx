import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './DockText.css';

function DockText({ text, down = false, className = '' }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    const container = containerRef.current;
    if (!container) return;

    const letters = container.children;
    const containerRect = container.getBoundingClientRect();
    const mouseX = e.clientX - containerRect.left;

    Array.from(letters).forEach((letter, index) => {
      const letterRect = letter.getBoundingClientRect();
      const letterCenterX = letterRect.left + letterRect.width / 2 - containerRect.left;
      const distance = Math.abs(mouseX - letterCenterX);

      if (distance <= 50) {
        setHoveredIndex(index);
      }
    });
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <motion.h2
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`dock-text ${className}`}
    >
      {text.split('').map((letter, index) => (
        <motion.span
          key={index}
          animate={{
            scaleY:
              hoveredIndex === null
                ? 1
                : Math.max(1, 1.3638 - Math.abs(index - hoveredIndex) * 0.1),
          }}
          transition={{
            type: 'spring',
            stiffness: 150,
            damping: 20,
            mass: 0.5,
          }}
          style={{
            display: 'inline-block',
            transformOrigin: down ? 'top' : 'bottom',
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.h2>
  );
}

export default DockText;