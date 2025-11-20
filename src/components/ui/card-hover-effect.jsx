import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Badge } from "react-bootstrap";

export const HoverEffect = ({ items, className }) => {
  let [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="skills-grid">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
          data-aos="fade-up"
          data-aos-delay={idx * 100}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-slate-800-opacity block rounded-2xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.7 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.7, delay: 0.5 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <div className="skill-card-header">
              <div 
                className="skill-icon-wrapper"
              >
                <item.icon 
                  className="skill-icon" 
                  style={{ color: '#f2f2f2' }}
                />
              </div>
              <h5 className="skill-title">{item.title}</h5>
            </div>
            
            <p className="skill-description">{item.description}</p>
            
            <div className="skill-badges">
              {item.techs.map((tech, techIdx) => (
                <Badge 
                  key={techIdx} 
                  className="skill-badge"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};

export const Card = ({ className, children }) => {
  return (
    <div className="skill-card-hover relative ">
      <div className="relative ">
        {children}
      </div>
    </div>
  );
};