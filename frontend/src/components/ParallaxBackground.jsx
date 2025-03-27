import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

// Pet animation assets
const petAnimations = [
  { id: 1, type: 'dog', position: { x: 10, y: 20 }, image: '🐕' },
  { id: 2, type: 'cat', position: { x: 80, y: 15 }, image: '🐈' },
  { id: 3, type: 'rabbit', position: { x: 40, y: 70 }, image: '🐇' },
  { id: 4, type: 'hamster', position: { x: 70, y: 60 }, image: '🐹' },
  { id: 5, type: 'bird', position: { x: 20, y: 30 }, image: '🦜' },
  { id: 6, type: 'fish', position: { x: 60, y: 40 }, image: '🐠' },
];

const ParallaxBackground = ({ colorScheme = 'teal' }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  // Color schemes for different pages
  const colorSchemes = {
    teal: {
      primary: '#006064',
      secondary: '#00838f',
      tertiary: '#0097a7',
      light: '#e0f7fa',
      gradient: 'linear-gradient(135deg, #006064 0%, #00838f 50%, #0097a7 100%)',
    },
    purple: {
      primary: '#4a148c',
      secondary: '#6a1b9a',
      tertiary: '#7b1fa2',
      light: '#f3e5f5',
      gradient: 'linear-gradient(135deg, #4a148c 0%, #6a1b9a 50%, #7b1fa2 100%)',
    },
    orange: {
      primary: '#e65100',
      secondary: '#ef6c00',
      tertiary: '#f57c00',
      light: '#fff3e0',
      gradient: 'linear-gradient(135deg, #e65100 0%, #ef6c00 50%, #f57c00 100%)',
    },
    green: {
      primary: '#1b5e20',
      secondary: '#2e7d32',
      tertiary: '#388e3c',
      light: '#e8f5e9',
      gradient: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 50%, #388e3c 100%)',
    },
    blue: {
      primary: '#0d47a1',
      secondary: '#1565c0',
      tertiary: '#1976d2',
      light: '#e3f2fd',
      gradient: 'linear-gradient(135deg, #0d47a1 0%, #1565c0 50%, #1976d2 100%)',
    },
    pink: {
      primary: '#880e4f',
      secondary: '#ad1457',
      tertiary: '#c2185b',
      light: '#fce4ec',
      gradient: 'linear-gradient(135deg, #880e4f 0%, #ad1457 50%, #c2185b 100%)',
    },
  };

  const colors = colorSchemes[colorScheme] || colorSchemes.teal;

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Calculate parallax effect based on mouse position
  const calculateParallax = (depth) => {
    const x = (mousePosition.x / windowSize.width - 0.5) * depth;
    const y = (mousePosition.y / windowSize.height - 0.5) * depth;
    return { x, y };
  };

  return (
    <div 
      className="parallax-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: -1,
        background: colors.gradient,
      }}
    >
      {/* Background layers */}
      <motion.div
        className="parallax-layer layer-1"
        animate={{
          x: calculateParallax(20).x,
          y: calculateParallax(20).y,
        }}
        transition={{ type: 'spring', stiffness: 60, damping: 30 }}
        style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '80%',
          height: '80%',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.tertiary}22 0%, transparent 70%)`,
          filter: 'blur(40px)',
        }}
      />
      
      <motion.div
        className="parallax-layer layer-2"
        animate={{
          x: calculateParallax(-30).x,
          y: calculateParallax(-30).y,
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 30 }}
        style={{
          position: 'absolute',
          top: '30%',
          left: '20%',
          width: '60%',
          height: '60%',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.secondary}33 0%, transparent 70%)`,
          filter: 'blur(30px)',
        }}
      />

      {/* Pet animations */}
      {petAnimations.map((pet) => (
        <motion.div
          key={pet.id}
          className={`pet-animation ${pet.type}`}
          initial={{ 
            x: `${pet.position.x}vw`, 
            y: `${pet.position.y}vh`,
            opacity: 0.8,
          }}
          animate={{
            x: [
              `${pet.position.x}vw`,
              `${pet.position.x + (Math.random() * 10 - 5)}vw`,
              `${pet.position.x}vw`,
            ],
            y: [
              `${pet.position.y}vh`,
              `${pet.position.y + (Math.random() * 10 - 5)}vh`,
              `${pet.position.y}vh`,
            ],
            rotate: [0, Math.random() * 10 - 5, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          style={{
            position: 'absolute',
            fontSize: '3rem',
            filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.3))',
            zIndex: 1,
          }}
        >
          {pet.image}
        </motion.div>
      ))}

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="floating-particle"
          initial={{
            x: `${Math.random() * 100}vw`,
            y: `${Math.random() * 100}vh`,
            opacity: Math.random() * 0.5 + 0.1,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: [`${Math.random() * 100}vh`, `${Math.random() * 100}vh`],
            x: [`${Math.random() * 100}vw`, `${Math.random() * 100}vw`],
            opacity: [Math.random() * 0.5 + 0.1, Math.random() * 0.3 + 0.1],
          }}
          transition={{
            duration: 10 + Math.random() * 20,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`,
            borderRadius: '50%',
            background: `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`,
            boxShadow: `0 0 ${Math.random() * 10 + 5}px rgba(255, 255, 255, 0.3)`,
          }}
        />
      ))}
    </div>
  );
};

ParallaxBackground.propTypes = {
  colorScheme: PropTypes.oneOf(['teal', 'purple', 'orange', 'green', 'blue', 'pink'])
};

export default ParallaxBackground;