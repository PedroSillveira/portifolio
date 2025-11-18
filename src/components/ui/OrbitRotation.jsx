import React from 'react';
import './OrbitRotation.css';

function OrbitRotation({ 
  icons = [], 
  orbitCount = 3, 
  orbitGap = 6, 
  centerIcon = null,
  size = 'md'
}) {
  const iconsPerOrbit = Math.ceil(icons.length / orbitCount);

  const sizeClasses = {
    sm: { container: 64, icon: 24 },
    md: { container: 96, icon: 32 },
    lg: { container: 128, icon: 40 }
  };

  const currentSize = sizeClasses[size];

  return (
    <div className="orbit-rotation-wrapper">
      <div className="orbit-rotation-container">
        {/* Center Icon */}
        {centerIcon && (
          <div 
            className="orbit-center-icon"
            style={{
              width: `${currentSize.container}px`,
              height: `${currentSize.container}px`
            }}
          >
            <centerIcon.Icon 
              style={{ 
                fontSize: `${currentSize.icon}px`,
                color: 'white'
              }} 
            />
          </div>
        )}

        {/* Generate Orbits */}
        {[...Array(orbitCount)].map((_, orbitIdx) => {
          const orbitSize = `${8 + orbitGap * (orbitIdx + 1)}rem`;
          const angleStep = (2 * Math.PI) / iconsPerOrbit;
          const animationDuration = `${12 + orbitIdx * 6}s`;
          const animationDirection = orbitIdx % 2 === 0 ? 'normal' : 'reverse';

          return (
            <div
              key={orbitIdx}
              className="orbit-ring"
              style={{
                width: orbitSize,
                height: orbitSize,
                animation: `orbit-spin ${animationDuration} linear infinite ${animationDirection}`
              }}
            >
              {icons
                .slice(
                  orbitIdx * iconsPerOrbit,
                  orbitIdx * iconsPerOrbit + iconsPerOrbit
                )
                .map((iconConfig, iconIdx) => {
                  const angle = iconIdx * angleStep;
                  const x = 50 + 50 * Math.cos(angle);
                  const y = 50 + 50 * Math.sin(angle);
                  const Icon = iconConfig.Icon;

                  return (
                    <div
                      key={iconIdx}
                      className="orbit-icon-container"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                      title={iconConfig.name}
                    >
                      <div 
                        className="orbit-icon-inner"
                        style={{
                          animation: `counter-spin ${animationDuration} linear infinite ${animationDirection === 'normal' ? 'reverse' : 'normal'}`
                        }}
                      >
                        <Icon 
                          style={{ 
                            fontSize: `${currentSize.icon * 0.7}px`,
                            color: iconConfig.color || '#667eea'
                          }} 
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OrbitRotation;