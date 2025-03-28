import { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { AuthContext } from '../context/authContext';

const InteractiveNavMenu = ({ colorScheme = 'teal' }) => {
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);
  const [hoveredItem, setHoveredItem] = useState(null);

  // Color schemes for different pages
  const colorSchemes = {
    teal: {
      primary: '#006064',
      secondary: '#00838f',
      tertiary: '#0097a7',
      light: '#e0f7fa',
      text: 'white',
      hover: '#004d40',
    },
    purple: {
      primary: '#4a148c',
      secondary: '#6a1b9a',
      tertiary: '#7b1fa2',
      light: '#f3e5f5',
      text: 'white',
      hover: '#3e2723',
    },
    orange: {
      primary: '#e65100',
      secondary: '#ef6c00',
      tertiary: '#f57c00',
      light: '#fff3e0',
      text: 'white',
      hover: '#bf360c',
    },
    green: {
      primary: '#1b5e20',
      secondary: '#2e7d32',
      tertiary: '#388e3c',
      light: '#e8f5e9',
      text: 'white',
      hover: '#1b3b36',
    },
    blue: {
      primary: '#0d47a1',
      secondary: '#1565c0',
      tertiary: '#1976d2',
      light: '#e3f2fd',
      text: 'white',
      hover: '#0a2351',
    },
    pink: {
      primary: '#880e4f',
      secondary: '#ad1457',
      tertiary: '#c2185b',
      light: '#fce4ec',
      text: 'white',
      hover: '#5d0a35',
    },
  };

  const colors = colorSchemes[colorScheme] || colorSchemes.teal;

  // Navigation items with icons
  const navItems = [
    { 
      path: '/', 
      label: 'Home', 
      icon: '🏠',
      description: 'Return to the main page'
    },
    { 
      path: '/entities', 
      label: 'My Pets', 
      icon: '🐾',
      description: 'View and manage your pets'
    },
    { 
      path: '/add-entity', 
      label: 'Add Pet', 
      icon: '➕',
      description: 'Add a new pet to your collection'
    },
    { 
      path: '/mystery-pet', 
      label: 'Mystery Pet', 
      icon: '🔮',
      description: 'Generate a pet based on your personality'
    },
    { 
      path: '/pet-quiz', 
      label: 'Pet Quiz', 
      icon: '❓',
      description: 'Take fun pet-related quizzes'
    },
    { 
      path: '/pet-gallery', 
      label: 'Pet Gallery', 
      icon: '🖼️',
      description: 'Browse user-uploaded pet photos'
    },
    { 
      path: '/virtual-pet', 
      label: 'Virtual Pet', 
      icon: '🎮',
      description: 'Adopt and interact with a virtual pet'
    },
    { 
      path: '/ar-mode', 
      label: 'AR Mode', 
      icon: '📱',
      description: 'See virtual pets in your surroundings'
    },
    { 
      path: '/leaderboard', 
      label: 'Leaderboard', 
      icon: '🏆',
      description: 'View top pet owners and achievements'
    },
    { 
      path: '/adoption', 
      label: 'Adopt a Pet', 
      icon: '💖',
      description: 'Find real pets in need of a home'
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
      },
    },
  };

  const iconVariants = {
    normal: { scale: 1, rotate: 0 },
    hovered: { scale: 1.2, rotate: [0, -10, 10, -5, 5, 0], transition: { duration: 0.5 } },
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{
        background: colors.primary,
        padding: '10px 20px',
        borderRadius: '8px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        margin: '10px 0',
        position: 'relative',
        zIndex: 100,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          const isHovered = hoveredItem === index;

          return (
            <motion.div
              key={item.path}
              variants={itemVariants}
              onHoverStart={() => setHoveredItem(index)}
              onHoverEnd={() => setHoveredItem(null)}
              style={{ position: 'relative' }}
            >
              <Link
                to={item.path}
                style={{ textDecoration: 'none' }}
              >
                <motion.div
                  whileHover={{ 
                    backgroundColor: colors.hover,
                    y: -5,
                    boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
                  }}
                  animate={{
                    backgroundColor: isActive ? colors.secondary : colors.primary,
                    scale: isActive ? 1.05 : 1,
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px 15px',
                    borderRadius: '8px',
                    color: colors.text,
                    fontWeight: isActive ? 'bold' : 'normal',
                    transition: 'background-color 0.3s, transform 0.3s',
                  }}
                >
                  <motion.span
                    variants={iconVariants}
                    animate={isHovered ? 'hovered' : 'normal'}
                    style={{ 
                      marginRight: '8px',
                      fontSize: '1.2em',
                    }}
                  >
                    {item.icon}
                  </motion.span>
                  {item.label}
                </motion.div>
              </Link>

              {/* Tooltip description */}
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ 
                  opacity: isHovered ? 1 : 0,
                  y: isHovered ? 0 : 10,
                  scale: isHovered ? 1 : 0.9,
                }}
                transition={{ duration: 0.2 }}
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: 'white',
                  color: colors.primary,
                  padding: '5px 10px',
                  borderRadius: '5px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                  whiteSpace: 'nowrap',
                  zIndex: 1000,
                  pointerEvents: 'none',
                  marginTop: '5px',
                  fontWeight: 'normal',
                  fontSize: '0.9em',
                }}
              >
                {item.description}
              </motion.div>
            </motion.div>
          );
        })}

        {/* Authentication buttons */}
        <motion.div
          variants={itemVariants}
          style={{
            marginLeft: 'auto',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ 
                  color: colors.text,
                  fontWeight: 'bold',
                }}
              >
                Welcome, {user}
              </motion.span>
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: colors.hover,
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  logout();
                  // Redirect to login page after logout
                  window.location.href = '/login';
                }}
                style={{
                  backgroundColor: colors.secondary,
                  color: colors.text,
                  border: 'none',
                  padding: '8px 15px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                }}
              >
                <motion.span
                  animate={{ rotate: [0, 5, 0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  👋
                </motion.span>
                Logout
              </motion.button>
            </div>
          ) : (
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: colors.hover,
                }}
                whileTap={{ scale: 0.95 }}
                style={{
                  backgroundColor: colors.secondary,
                  color: colors.text,
                  border: 'none',
                  padding: '8px 15px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                }}
              >
                <motion.span
                  animate={{ rotate: [0, 10, 0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🔑
                </motion.span>
                Login
              </motion.button>
            </Link>
          )}
        </motion.div>
      </div>
    </motion.nav>
  );
};

InteractiveNavMenu.propTypes = {
  colorScheme: PropTypes.oneOf(['teal', 'purple', 'orange', 'green', 'blue', 'pink'])
};

export default InteractiveNavMenu;