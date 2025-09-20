import React, { useEffect, useRef } from 'react';

const StarField: React.FC = () => {
  const starfieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const starfield = starfieldRef.current;
    if (!starfield) return;

    // Clear existing stars
    starfield.innerHTML = '';

    // Create regular stars
    for (let i = 0; i < 200; i++) {
      const star = document.createElement('div');
      star.className = `star ${Math.random() > 0.7 ? 'large' : Math.random() > 0.4 ? 'medium' : 'small'}`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.animationDelay = `${Math.random() * 4}s`;
      starfield.appendChild(star);
    }

    // Create shooting stars
    const createShootingStar = () => {
      const shootingStar = document.createElement('div');
      shootingStar.className = 'shooting-star';
      shootingStar.style.left = `${Math.random() * 100}%`;
      shootingStar.style.top = `${Math.random() * 50}%`;
      shootingStar.style.animationDelay = `${Math.random() * 2}s`;
      starfield.appendChild(shootingStar);

      // Remove after animation
      setTimeout(() => {
        if (shootingStar.parentNode) {
          shootingStar.parentNode.removeChild(shootingStar);
        }
      }, 3000);
    };

    // Create shooting stars periodically
    const shootingStarInterval = setInterval(createShootingStar, 2000 + Math.random() * 3000);

    // Create cosmic particles
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'cosmic-particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.width = `${2 + Math.random() * 4}px`;
      particle.style.height = `${2 + Math.random() * 4}px`;
      particle.style.animationDelay = `${Math.random() * 8}s`;
      particle.style.animationDuration = `${6 + Math.random() * 4}s`;
      starfield.appendChild(particle);
    }

    return () => {
      clearInterval(shootingStarInterval);
    };
  }, []);

  return (
    <div 
      ref={starfieldRef} 
      className="starfield nebula-bg"
      style={{
        background: `
          radial-gradient(ellipse at 20% 50%, hsl(270 75% 70% / 0.1) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 20%, hsl(210 85% 65% / 0.1) 0%, transparent 50%),
          radial-gradient(ellipse at 40% 80%, hsl(320 85% 75% / 0.05) 0%, transparent 50%),
          radial-gradient(ellipse at center, hsl(220 30% 8%) 0%, hsl(220 40% 3%) 100%)
        `
      }}
    />
  );
};

export default StarField;