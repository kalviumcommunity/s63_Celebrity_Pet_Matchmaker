import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InteractiveNavMenu from '../components/InteractiveNavMenu';
import ParallaxBackground from '../components/ParallaxBackground';

const VirtualPet = () => {
  const [petType, setPetType] = useState(null);
  const [petName, setPetName] = useState('');
  const [petStats, setPetStats] = useState({
    hunger: 50,
    happiness: 50,
    energy: 50,
    health: 100,
    xp: 0,
    level: 1
  });
  const [lastAction, setLastAction] = useState(null);
  const [showActionFeedback, setShowActionFeedback] = useState(false);
  const [actionFeedback, setActionFeedback] = useState('');
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [isPetSleeping, setIsPetSleeping] = useState(false);
  const [achievements, setAchievements] = useState([]);
  const [showAchievement, setShowAchievement] = useState(false);
  const [currentAchievement, setCurrentAchievement] = useState(null);

  // Available pet types
  const petTypes = [
    { id: 'dog', name: 'Dog', emoji: '🐕', color: 'blue', sound: 'Woof!' },
    { id: 'cat', name: 'Cat', emoji: '🐈', color: 'purple', sound: 'Meow!' },
    { id: 'rabbit', name: 'Rabbit', emoji: '🐇', color: 'pink', sound: 'Squeak!' },
    { id: 'hamster', name: 'Hamster', emoji: '🐹', color: 'orange', sound: 'Squeak!' },
    { id: 'bird', name: 'Bird', emoji: '🦜', color: 'green', sound: 'Tweet!' },
    { id: 'fish', name: 'Fish', emoji: '🐠', color: 'teal', sound: 'Blub!' }
  ];

  // Available actions
  const petActions = [
    { id: 'feed', name: 'Feed', emoji: '🍖', description: 'Give your pet some food' },
    { id: 'play', name: 'Play', emoji: '🎾', description: 'Play with your pet' },
    { id: 'sleep', name: 'Sleep', emoji: '💤', description: 'Let your pet rest' },
    { id: 'clean', name: 'Clean', emoji: '🧼', description: 'Clean your pet' },
    { id: 'train', name: 'Train', emoji: '🏋️', description: 'Train your pet new tricks' },
    { id: 'pet', name: 'Pet', emoji: '👋', description: 'Show affection to your pet' }
  ];

  // Possible achievements
  const possibleAchievements = [
    { id: 'first-feed', name: 'First Meal', description: 'Fed your pet for the first time', icon: '🍽️' },
    { id: 'play-time', name: 'Play Time', description: 'Played with your pet 5 times', icon: '🎮', requirement: { action: 'play', count: 5 } },
    { id: 'well-fed', name: 'Well Fed', description: 'Kept your pet\'s hunger above 80', icon: '🍗', requirement: { stat: 'hunger', value: 80 } },
    { id: 'happy-pet', name: 'Happy Pet', description: 'Kept your pet\'s happiness above 80', icon: '😄', requirement: { stat: 'happiness', value: 80 } },
    { id: 'level-up', name: 'Level Up', description: 'Reached level 2 with your pet', icon: '⬆️', requirement: { stat: 'level', value: 2 } },
    { id: 'healthy-pet', name: 'Healthy Pet', description: 'Maintained perfect health for your pet', icon: '❤️', requirement: { stat: 'health', value: 100 } }
  ];

  // Action counters
  const [actionCounts, setActionCounts] = useState({
    feed: 0,
    play: 0,
    sleep: 0,
    clean: 0,
    train: 0,
    pet: 0
  });

  // Load pet data from localStorage on component mount
  useEffect(() => {
    const savedPet = localStorage.getItem('virtualPet');
    if (savedPet) {
      const petData = JSON.parse(savedPet);
      setPetType(petData.type);
      setPetName(petData.name);
      setPetStats(petData.stats);
      setActionCounts(petData.actionCounts || actionCounts);
      setAchievements(petData.achievements || []);
    }
  }, []);

  // Save pet data to localStorage when it changes
  useEffect(() => {
    if (petType && petName) {
      localStorage.setItem('virtualPet', JSON.stringify({
        type: petType,
        name: petName,
        stats: petStats,
        actionCounts,
        achievements
      }));
    }
  }, [petType, petName, petStats, actionCounts, achievements]);

  // Passive stat changes over time
  useEffect(() => {
    if (!petType) return;

    const interval = setInterval(() => {
      setPetStats(prevStats => {
        // Don't decrease stats if pet is sleeping
        if (isPetSleeping) {
          return {
            ...prevStats,
            energy: Math.min(prevStats.energy + 5, 100)
          };
        }

        return {
          ...prevStats,
          hunger: Math.max(prevStats.hunger - 1, 0),
          happiness: Math.max(prevStats.happiness - 0.5, 0),
          energy: Math.max(prevStats.energy - 0.5, 0)
        };
      });
    }, 10000); // Every 10 seconds

    return () => clearInterval(interval);
  }, [petType, isPetSleeping]);

  // Health calculation based on other stats
  useEffect(() => {
    if (!petType) return;

    setPetStats(prevStats => {
      const avgStats = (prevStats.hunger + prevStats.happiness + prevStats.energy) / 3;
      const newHealth = Math.max(Math.min(avgStats * 1.5, 100), 0);
      
      return {
        ...prevStats,
        health: Math.round(newHealth)
      };
    });
  }, [petStats.hunger, petStats.happiness, petStats.energy, petType]);

  // Check for achievements
  useEffect(() => {
    if (!petType) return;

    possibleAchievements.forEach(achievement => {
      // Skip if already achieved
      if (achievements.some(a => a.id === achievement.id)) return;

      let achieved = false;

      if (achievement.requirement) {
        if (achievement.requirement.action && actionCounts[achievement.requirement.action] >= achievement.requirement.count) {
          achieved = true;
        } else if (achievement.requirement.stat && petStats[achievement.requirement.stat] >= achievement.requirement.value) {
          achieved = true;
        }
      } else if (achievement.id === 'first-feed' && actionCounts.feed > 0) {
        achieved = true;
      }

      if (achieved) {
        const newAchievement = { ...achievement, date: new Date().toISOString() };
        setAchievements(prev => [...prev, newAchievement]);
        setCurrentAchievement(newAchievement);
        setShowAchievement(true);
        
        // Hide achievement notification after 3 seconds
        setTimeout(() => {
          setShowAchievement(false);
        }, 3000);
        
        // Add XP for achievement
        setPetStats(prev => ({
          ...prev,
          xp: prev.xp + 20
        }));
      }
    });
  }, [petStats, actionCounts, achievements, petType]);

  // Level up based on XP
  useEffect(() => {
    if (!petType) return;

    const xpThreshold = petStats.level * 100;
    if (petStats.xp >= xpThreshold) {
      setPetStats(prev => ({
        ...prev,
        level: prev.level + 1,
        xp: prev.xp - xpThreshold
      }));
      
      setActionFeedback(`${petName} leveled up to level ${petStats.level + 1}!`);
      setShowActionFeedback(true);
      setTimeout(() => setShowActionFeedback(false), 2000);
    }
  }, [petStats.xp, petStats.level, petName, petType]);

  // Handle pet selection
  const selectPet = (pet) => {
    setPetType(pet);
    setIsNameModalOpen(true);
  };

  // Handle pet naming
  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (petName.trim()) {
      setIsNameModalOpen(false);
    }
  };

  // Handle pet actions
  const performAction = (action) => {
    if (isPetSleeping && action.id !== 'sleep') {
      setActionFeedback(`${petName} is sleeping. Wake them up first!`);
      setShowActionFeedback(true);
      setTimeout(() => setShowActionFeedback(false), 2000);
      return;
    }

    setLastAction(action.id);
    
    // Update action counts
    setActionCounts(prev => ({
      ...prev,
      [action.id]: prev[action.id] + 1
    }));

    // Different effects based on action
    switch (action.id) {
      case 'feed':
        setPetStats(prev => ({
          ...prev,
          hunger: Math.min(prev.hunger + 20, 100),
          energy: Math.min(prev.energy + 5, 100),
          xp: prev.xp + 5
        }));
        setActionFeedback(`${petName} enjoyed the meal!`);
        break;
      case 'play':
        setPetStats(prev => ({
          ...prev,
          happiness: Math.min(prev.happiness + 20, 100),
          hunger: Math.max(prev.hunger - 10, 0),
          energy: Math.max(prev.energy - 15, 0),
          xp: prev.xp + 10
        }));
        setActionFeedback(`${petName} had fun playing!`);
        break;
      case 'sleep':
        if (isPetSleeping) {
          setIsPetSleeping(false);
          setActionFeedback(`${petName} woke up!`);
        } else {
          setIsPetSleeping(true);
          setActionFeedback(`${petName} is now sleeping...`);
        }
        break;
      case 'clean':
        setPetStats(prev => ({
          ...prev,
          health: Math.min(prev.health + 10, 100),
          happiness: Math.min(prev.happiness + 5, 100),
          xp: prev.xp + 5
        }));
        setActionFeedback(`${petName} is now clean!`);
        break;
      case 'train':
        setPetStats(prev => ({
          ...prev,
          xp: prev.xp + 15,
          energy: Math.max(prev.energy - 20, 0),
          hunger: Math.max(prev.hunger - 10, 0)
        }));
        setActionFeedback(`${petName} learned something new!`);
        break;
      case 'pet':
        setPetStats(prev => ({
          ...prev,
          happiness: Math.min(prev.happiness + 10, 100),
          xp: prev.xp + 3
        }));
        setActionFeedback(`${petName} feels loved!`);
        break;
      default:
        break;
    }

    setShowActionFeedback(true);
    setTimeout(() => setShowActionFeedback(false), 2000);
  };

  // Get the selected pet object
  const selectedPet = petType ? petTypes.find(p => p.id === petType) : null;
  
  // Get color scheme based on pet type
  const colorScheme = selectedPet ? selectedPet.color : 'teal';

  // Get status message based on pet stats
  const getStatusMessage = () => {
    if (petStats.health < 30) return `${petName} is sick!`;
    if (petStats.hunger < 20) return `${petName} is starving!`;
    if (petStats.happiness < 20) return `${petName} is sad!`;
    if (petStats.energy < 20) return `${petName} is exhausted!`;
    if (petStats.hunger > 80 && petStats.happiness > 80) return `${petName} is thriving!`;
    return `${petName} is doing okay.`;
  };

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      {/* Background */}
      <ParallaxBackground colorScheme={colorScheme} />
      
      {/* Navigation */}
      <div style={{ padding: '20px 40px' }}>
        <InteractiveNavMenu colorScheme={colorScheme} />
      </div>
      
      {/* Main Content */}
      <div style={{ 
        padding: '20px', 
        maxWidth: '1000px', 
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Pet Selection */}
        {!petType && (
          <>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{ 
                textAlign: 'center', 
                color: 'white',
                fontSize: '2.5rem',
                marginBottom: '30px',
                textShadow: '0 2px 10px rgba(0,0,0,0.3)'
              }}
            >
              Adopt Your Virtual Pet
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ 
                textAlign: 'center', 
                color: 'white',
                fontSize: '1.2rem',
                marginBottom: '40px',
                maxWidth: '600px',
                margin: '0 auto 40px',
                textShadow: '0 2px 5px rgba(0,0,0,0.2)'
              }}
            >
              Choose a pet to adopt, care for, and watch grow!
            </motion.p>
            
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap',
              gap: '20px',
              justifyContent: 'center'
            }}>
              {petTypes.map((pet, index) => (
                <motion.div
                  key={pet.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: '0 10px 25px rgba(0,0,0,0.2)' 
                  }}
                  onClick={() => selectPet(pet.id)}
                  style={{
                    width: '180px',
                    height: '220px',
                    background: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '15px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    padding: '20px',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                  }}
                >
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, -5, 5, 0] }}
                    transition={{ duration: 0.5 }}
                    style={{ fontSize: '5rem', marginBottom: '15px' }}
                  >
                    {pet.emoji}
                  </motion.div>
                  <h3 style={{ margin: '0', color: '#333' }}>{pet.name}</h3>
                  <p style={{ margin: '5px 0 0', color: '#666', fontSize: '0.9rem' }}>
                    Says: &quot;{pet.sound}&quot;
                  </p>
                </motion.div>
              ))}
            </div>
          </>
        )}
        
        {/* Pet Interface */}
        {petType && selectedPet && (
          <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            {/* Pet Status Bar */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                width: '100%',
                background: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '15px',
                padding: '15px 20px',
                marginBottom: '20px',
                boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ 
                  width: '50px', 
                  height: '50px', 
                  borderRadius: '50%',
                  background: `var(--${colorScheme}-primary, #006064)`,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '1.8rem'
                }}>
                  {selectedPet.emoji}
                </div>
                <div>
                  <h3 style={{ margin: '0', fontSize: '1.2rem' }}>{petName}</h3>
                  <p style={{ margin: '0', fontSize: '0.9rem', color: '#666' }}>
                    Level {petStats.level} {selectedPet.name}
                  </p>
                </div>
              </div>
              
              <div style={{ 
                display: 'flex', 
                gap: '15px',
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>Health</div>
                  <div style={{ 
                    width: '100px', 
                    height: '10px', 
                    background: '#eee',
                    borderRadius: '5px',
                    overflow: 'hidden'
                  }}>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${petStats.health}%` }}
                      transition={{ duration: 0.5 }}
                      style={{ 
                        height: '100%', 
                        background: petStats.health > 50 ? '#4caf50' : petStats.health > 20 ? '#ff9800' : '#f44336',
                      }}
                    />
                  </div>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>XP</div>
                  <div style={{ 
                    width: '100px', 
                    height: '10px', 
                    background: '#eee',
                    borderRadius: '5px',
                    overflow: 'hidden'
                  }}>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(petStats.xp / (petStats.level * 100)) * 100}%` }}
                      transition={{ duration: 0.5 }}
                      style={{ 
                        height: '100%', 
                        background: '#9c27b0',
                      }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Pet Display */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{
                width: '100%',
                background: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '15px',
                padding: '30px',
                marginBottom: '20px',
                boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Status Message */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  background: `var(--${colorScheme}-light, #e0f7fa)`,
                  color: `var(--${colorScheme}-primary, #006064)`,
                  padding: '8px 15px',
                  borderRadius: '20px',
                  marginBottom: '20px',
                  fontWeight: 'bold'
                }}
              >
                {getStatusMessage()}
              </motion.div>
              
              {/* Pet Animation */}
              <motion.div
                animate={
                  isPetSleeping 
                    ? { rotate: 0, y: [0, 5, 0] } 
                    : lastAction === 'play' 
                      ? { rotate: [0, -10, 10, -5, 5, 0], scale: [1, 1.1, 1], x: [0, -20, 20, -10, 10, 0] }
                      : { rotate: [0, -3, 3, -1, 1, 0], y: [0, -10, 0] }
                }
                transition={{ 
                  duration: isPetSleeping ? 2 : lastAction === 'play' ? 0.8 : 1.5, 
                  repeat: Infinity,
                  repeatType: 'loop'
                }}
                style={{
                  fontSize: '8rem',
                  marginBottom: '20px',
                  filter: 'drop-shadow(0 5px 15px rgba(0,0,0,0.2))',
                  position: 'relative'
                }}
              >
                {selectedPet.emoji}
                
                {/* Sleep indicator */}
                {isPetSleeping && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                      position: 'absolute',
                      top: '-20px',
                      right: '-20px',
                      fontSize: '2rem'
                    }}
                  >
                    💤
                  </motion.div>
                )}
                
                {/* Action feedback */}
                <AnimatePresence>
                  {showActionFeedback && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      style={{
                        position: 'absolute',
                        top: '-40px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'white',
                        padding: '5px 10px',
                        borderRadius: '10px',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {actionFeedback}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              
              {/* Pet Stats */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-around',
                width: '100%',
                maxWidth: '500px',
                marginBottom: '20px'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '5px' }}>Hunger</div>
                  <div style={{ 
                    width: '100px', 
                    height: '10px', 
                    background: '#eee',
                    borderRadius: '5px',
                    overflow: 'hidden'
                  }}>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${petStats.hunger}%` }}
                      transition={{ duration: 0.5 }}
                      style={{ 
                        height: '100%', 
                        background: '#ff9800',
                      }}
                    />
                  </div>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '5px' }}>Happiness</div>
                  <div style={{ 
                    width: '100px', 
                    height: '10px', 
                    background: '#eee',
                    borderRadius: '5px',
                    overflow: 'hidden'
                  }}>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${petStats.happiness}%` }}
                      transition={{ duration: 0.5 }}
                      style={{ 
                        height: '100%', 
                        background: '#e91e63',
                      }}
                    />
                  </div>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '5px' }}>Energy</div>
                  <div style={{ 
                    width: '100px', 
                    height: '10px', 
                    background: '#eee',
                    borderRadius: '5px',
                    overflow: 'hidden'
                  }}>
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${petStats.energy}%` }}
                      transition={{ duration: 0.5 }}
                      style={{ 
                        height: '100%', 
                        background: '#2196f3',
                      }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Pet Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              style={{
                width: '100%',
                background: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '15px',
                padding: '20px',
                boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
              }}
            >
              <h3 style={{ margin: '0 0 15px 0', textAlign: 'center' }}>Actions</h3>
              
              <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap',
                gap: '15px',
                justifyContent: 'center'
              }}>
                {petActions.map((action) => (
                  <motion.button
                    key={action.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => performAction(action)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      padding: '15px',
                      borderRadius: '10px',
                      border: 'none',
                      background: action.id === 'sleep' && isPetSleeping 
                        ? '#f5f5f5' 
                        : 'white',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                      cursor: 'pointer',
                      width: '100px',
                      height: '100px'
                    }}
                  >
                    <span style={{ fontSize: '2rem', marginBottom: '5px' }}>{action.emoji}</span>
                    <span style={{ fontWeight: 'bold' }}>
                      {action.id === 'sleep' && isPetSleeping ? 'Wake Up' : action.name}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
            
            {/* Achievements */}
            {achievements.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '15px',
                  padding: '20px',
                  marginTop: '20px',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                }}
              >
                <h3 style={{ margin: '0 0 15px 0', textAlign: 'center' }}>Achievements</h3>
                
                <div style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap',
                  gap: '10px',
                  justifyContent: 'center'
                }}>
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 12px',
                        borderRadius: '20px',
                        background: `var(--${colorScheme}-light, #e0f7fa)`,
                        color: `var(--${colorScheme}-primary, #006064)`,
                      }}
                    >
                      <span>{achievement.icon}</span>
                      <span>{achievement.name}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>
      
      {/* Name Modal */}
      <AnimatePresence>
        {isNameModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1000
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              style={{
                background: 'white',
                borderRadius: '15px',
                padding: '30px',
                width: '90%',
                maxWidth: '400px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
              }}
            >
              <h2 style={{ margin: '0 0 20px 0', textAlign: 'center' }}>Name Your Pet</h2>
              
              <form onSubmit={handleNameSubmit}>
                <input
                  type="text"
                  value={petName}
                  onChange={(e) => setPetName(e.target.value)}
                  placeholder="Enter a name..."
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    borderRadius: '8px',
                    border: '2px solid #ddd',
                    fontSize: '1rem',
                    marginBottom: '20px'
                  }}
                  autoFocus
                />
                
                <button
                  type="submit"
                  disabled={!petName.trim()}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: 'none',
                    background: petName.trim() ? `var(--${colorScheme}-primary, #006064)` : '#ccc',
                    color: 'white',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: petName.trim() ? 'pointer' : 'not-allowed'
                  }}
                >
                  Start Caring For Your Pet
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Achievement Notification */}
      <AnimatePresence>
        {showAchievement && currentAchievement && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            style={{
              position: 'fixed',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'white',
              borderRadius: '10px',
              padding: '15px 20px',
              boxShadow: '0 5px 20px rgba(0,0,0,0.2)',
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              zIndex: 1000
            }}
          >
            <div style={{ 
              fontSize: '2rem',
              background: `var(--${colorScheme}-light, #e0f7fa)`,
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              {currentAchievement.icon}
            </div>
            <div>
              <h4 style={{ margin: '0 0 5px 0', color: `var(--${colorScheme}-primary, #006064)` }}>
                Achievement Unlocked!
              </h4>
              <p style={{ margin: 0, fontWeight: 'bold' }}>{currentAchievement.name}</p>
              <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem', color: '#666' }}>
                {currentAchievement.description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VirtualPet;