import { useState } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const AnimatedCard = ({
  title,
  description,
  image,
  icon,
  colorScheme = 'teal',
  onClick,
  link,
  size = 'medium',
  delay = 0
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Color schemes for different cards
  const colorSchemes = {
    teal: {
      primary: '#006064',
      secondary: '#00838f',
      tertiary: '#0097a7',
      light: '#e0f7fa',
      gradient: 'linear-gradient(135deg, #006064 0%, #00838f 100%)',
    },
    purple: {
      primary: '#4a148c',
      secondary: '#6a1b9a',
      tertiary: '#7b1fa2',
      light: '#f3e5f5',
      gradient: 'linear-gradient(135deg, #4a148c 0%, #6a1b9a 100%)',
    },
    orange: {
      primary: '#e65100',
      secondary: '#ef6c00',
      tertiary: '#f57c00',
      light: '#fff3e0',
      gradient: 'linear-gradient(135deg, #e65100 0%, #ef6c00 100%)',
    },
    green: {
      primary: '#1b5e20',
      secondary: '#2e7d32',
      tertiary: '#388e3c',
      light: '#e8f5e9',
      gradient: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)',
    },
    blue: {
      primary: '#0d47a1',
      secondary: '#1565c0',
      tertiary: '#1976d2',
      light: '#e3f2fd',
      gradient: 'linear-gradient(135deg, #0d47a1 0%, #1565c0 100%)',
    },
    pink: {
      primary: '#880e4f',
      secondary: '#ad1457',
      tertiary: '#c2185b',
      light: '#fce4ec',
      gradient: 'linear-gradient(135deg, #880e4f 0%, #ad1457 100%)',
    },
  };

  const colors = colorSchemes[colorScheme] || colorSchemes.teal;

  // Size variations
  const sizes = {
    small: { width: '250px', height: '300px', fontSize: '0.9rem' },
    medium: { width: '300px', height: '350px', fontSize: '1rem' },
    large: { width: '350px', height: '400px', fontSize: '1.1rem' },
  };

  const sizeStyle = sizes[size] || sizes.medium;

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (link) {
      window.location.href = link;
    }
  };

  return (
    <motion.div
      className="animated-card"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: delay,
        type: 'spring',
        stiffness: 100,
        damping: 15
      }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
      style={{
        width: sizeStyle.width,
        height: sizeStyle.height,
        borderRadius: '15px',
        overflow: 'hidden',
        backgroundColor: 'white',
        boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        cursor: onClick || link ? 'pointer' : 'default',
        position: 'relative',
        margin: '15px',
        fontSize: sizeStyle.fontSize,
      }}
    >
      {/* Card Header with Image */}
      <div 
        className="card-image-container"
        style={{
          height: '50%',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <motion.div
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.5 }}
          style={{
            width: '100%',
            height: '100%',
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        {/* Overlay gradient */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '50%',
            background: `linear-gradient(to top, ${colors.primary}CC, transparent)`,
          }}
        />
        
        {/* Icon badge */}
        {icon && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              delay: delay + 0.3,
              type: 'spring',
              stiffness: 200,
              damping: 15
            }}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: colors.gradient,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
              fontSize: '1.5rem',
              boxShadow: '0 3px 10px rgba(0,0,0,0.2)',
            }}
          >
            {icon}
          </motion.div>
        )}
      </div>
      
      {/* Card Content */}
      <div 
        className="card-content"
        style={{
          padding: '20px',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <motion.h3
          animate={{ color: isHovered ? colors.secondary : colors.primary }}
          transition={{ duration: 0.3 }}
          style={{
            margin: '0 0 10px 0',
            fontSize: '1.3em',
          }}
        >
          {title}
        </motion.h3>
        
        <p style={{ 
          margin: '0',
          color: '#555',
          flex: 1,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
        }}>
          {description}
        </p>
        
        {/* Card Footer */}
        <motion.div
          animate={{ 
            y: isHovered ? 0 : 5,
            opacity: isHovered ? 1 : 0.7,
          }}
          transition={{ duration: 0.3 }}
          style={{
            marginTop: '15px',
            textAlign: 'right',
            color: colors.secondary,
            fontWeight: 'bold',
          }}
        >
          {onClick || link ? 'Learn More →' : ''}
        </motion.div>
      </div>
      
      {/* Animated border effect on hover */}
      <motion.div
        animate={{ 
          opacity: isHovered ? 1 : 0,
          height: isHovered ? '100%' : '0%',
        }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          boxShadow: `inset 0 0 0 3px ${colors.secondary}`,
          borderRadius: '15px',
        }}
      />
    </motion.div>
  );
};

AnimatedCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string,
  icon: PropTypes.node,
  colorScheme: PropTypes.oneOf(['teal', 'purple', 'orange', 'green', 'blue', 'pink']),
  onClick: PropTypes.func,
  link: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  delay: PropTypes.number
};

export default AnimatedCard;