import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

// Array of possible greeting messages
const greetings = [
  "Hello there! Welcome to Pet Matchmaker! 🐾",
  "Hi friend! Ready to find your perfect pet match? 🐶",
  "Meow there! Looking for a furry companion? 🐱",
  "Woof! So excited you're here! Let's find your pet soulmate! 🐕",
  "Welcome! I'm your guide to finding the perfect pet! 🦜",
  "Hey there! I can help you discover your ideal pet companion! 🐇",
  "Greetings, pet lover! Let's start matching! 🐠",
  "Hello! I'm your friendly pet matchmaker! How can I help? 🐹",
  "Welcome to our pet paradise! What kind of friend are you looking for? 🦊",
  "Hi there! I'm so happy to help you find your perfect pet match! 🐢"
];

// Pet mascot types with their respective animations and images
const petMascots = {
  dog: {
    emoji: '🐕',
    animations: {
      idle: {
        y: [0, -10, 0],
        rotate: [0, -5, 0, 5, 0],
        transition: {
          y: { repeat: Infinity, duration: 2, ease: 'easeInOut' },
          rotate: { repeat: Infinity, duration: 4, ease: 'easeInOut' }
        }
      },
      excited: {
        y: [0, -20, 0],
        rotate: [0, -10, 0, 10, 0],
        scale: [1, 1.1, 1],
        transition: {
          y: { repeat: Infinity, duration: 0.5, ease: 'easeInOut' },
          rotate: { repeat: Infinity, duration: 0.5, ease: 'easeInOut' },
          scale: { repeat: Infinity, duration: 0.5, ease: 'easeInOut' }
        }
      }
    }
  },
  cat: {
    emoji: '🐈',
    animations: {
      idle: {
        y: [0, -5, 0],
        rotate: [0, 3, 0, -3, 0],
        transition: {
          y: { repeat: Infinity, duration: 3, ease: 'easeInOut' },
          rotate: { repeat: Infinity, duration: 5, ease: 'easeInOut' }
        }
      },
      excited: {
        y: [0, -15, 0],
        rotate: [0, 10, 0, -10, 0],
        scale: [1, 1.05, 1],
        transition: {
          y: { repeat: Infinity, duration: 0.7, ease: 'easeInOut' },
          rotate: { repeat: Infinity, duration: 0.7, ease: 'easeInOut' },
          scale: { repeat: Infinity, duration: 0.7, ease: 'easeInOut' }
        }
      }
    }
  },
  rabbit: {
    emoji: '🐇',
    animations: {
      idle: {
        y: [0, -7, 0],
        rotate: [0, 2, 0, -2, 0],
        transition: {
          y: { repeat: Infinity, duration: 2.5, ease: 'easeInOut' },
          rotate: { repeat: Infinity, duration: 4.5, ease: 'easeInOut' }
        }
      },
      excited: {
        y: [0, -25, 0],
        rotate: [0, 5, 0, -5, 0],
        scale: [1, 1.08, 1],
        transition: {
          y: { repeat: Infinity, duration: 0.6, ease: 'easeInOut' },
          rotate: { repeat: Infinity, duration: 0.6, ease: 'easeInOut' },
          scale: { repeat: Infinity, duration: 0.6, ease: 'easeInOut' }
        }
      }
    }
  }
};

const AnimatedPetMascot = ({ 
  petType = 'dog', 
  colorScheme = 'teal',
  position = 'bottom-right',
  size = 'medium'
}) => {
  const [greeting, setGreeting] = useState('');
  const [isExcited, setIsExcited] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);

  // Color schemes for different pages
  const colorSchemes = {
    teal: {
      primary: '#006064',
      secondary: '#00838f',
      tertiary: '#0097a7',
      light: '#e0f7fa',
    },
    purple: {
      primary: '#4a148c',
      secondary: '#6a1b9a',
      tertiary: '#7b1fa2',
      light: '#f3e5f5',
    },
    orange: {
      primary: '#e65100',
      secondary: '#ef6c00',
      tertiary: '#f57c00',
      light: '#fff3e0',
    },
    green: {
      primary: '#1b5e20',
      secondary: '#2e7d32',
      tertiary: '#388e3c',
      light: '#e8f5e9',
    },
    blue: {
      primary: '#0d47a1',
      secondary: '#1565c0',
      tertiary: '#1976d2',
      light: '#e3f2fd',
    },
    pink: {
      primary: '#880e4f',
      secondary: '#ad1457',
      tertiary: '#c2185b',
      light: '#fce4ec',
    },
  };

  const colors = colorSchemes[colorScheme] || colorSchemes.teal;
  const mascot = petMascots[petType] || petMascots.dog;
  
  // Size variations
  const sizes = {
    small: { fontSize: '3rem', bubbleWidth: '200px' },
    medium: { fontSize: '4rem', bubbleWidth: '250px' },
    large: { fontSize: '5rem', bubbleWidth: '300px' },
  };
  
  const sizeStyle = sizes[size] || sizes.medium;
  
  // Position variations
  const positions = {
    'bottom-right': { bottom: '20px', right: '20px' },
    'bottom-left': { bottom: '20px', left: '20px' },
    'top-right': { top: '20px', right: '20px' },
    'top-left': { top: '20px', left: '20px' },
  };
  
  const positionStyle = positions[position] || positions['bottom-right'];

  // Set a random greeting on initial load
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * greetings.length);
    setGreeting(greetings[randomIndex]);
    
    // Show greeting after a short delay
    const timer = setTimeout(() => {
      setShowGreeting(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Change greeting when clicked
  const handleClick = () => {
    const randomIndex = Math.floor(Math.random() * greetings.length);
    setGreeting(greetings[randomIndex]);
    setIsExcited(true);
    setShowGreeting(true);
    
    // Reset to idle animation after a short time
    setTimeout(() => {
      setIsExcited(false);
    }, 2000);
  };

  return (
    <div 
      className="mascot-container"
      style={{
        position: 'fixed',
        ...positionStyle,
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Speech bubble with greeting */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: 20 }}
        animate={{ 
          opacity: showGreeting ? 1 : 0, 
          scale: showGreeting ? 1 : 0.5,
          y: showGreeting ? 0 : 20
        }}
        transition={{ duration: 0.5 }}
        style={{
          background: colors.light,
          color: colors.primary,
          padding: '15px',
          borderRadius: '20px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          marginBottom: '10px',
          position: 'relative',
          width: sizeStyle.bubbleWidth,
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '1rem',
        }}
      >
        {greeting}
        {/* Speech bubble pointer */}
        <div
          style={{
            position: 'absolute',
            bottom: '-10px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '20px',
            height: '20px',
            background: colors.light,
            clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
          }}
        />
      </motion.div>

      {/* 3D Pet Mascot */}
      <motion.div
        className="pet-mascot"
        whileHover={{ scale: 1.1 }}
        animate={isExcited ? mascot.animations.excited : mascot.animations.idle}
        onClick={handleClick}
        style={{
          fontSize: sizeStyle.fontSize,
          cursor: 'pointer',
          filter: 'drop-shadow(0 5px 15px rgba(0,0,0,0.3))',
          transformStyle: 'preserve-3d',
          transform: 'perspective(500px) rotateX(10deg)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '1.2em',
          height: '1.2em',
          borderRadius: '50%',
          background: `radial-gradient(circle at 30% 30%, ${colors.light}, ${colors.tertiary})`,
        }}
      >
        <span style={{ fontSize: '0.8em' }}>{mascot.emoji}</span>
      </motion.div>
    </div>
  );
};

AnimatedPetMascot.propTypes = {
  petType: PropTypes.oneOf(['dog', 'cat', 'rabbit']),
  colorScheme: PropTypes.oneOf(['teal', 'purple', 'orange', 'green', 'blue', 'pink']),
  position: PropTypes.oneOf(['bottom-right', 'bottom-left', 'top-right', 'top-left']),
  size: PropTypes.oneOf(['small', 'medium', 'large'])
};

export default AnimatedPetMascot;