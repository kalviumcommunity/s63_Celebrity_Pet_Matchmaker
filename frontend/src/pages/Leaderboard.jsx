import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InteractiveNavMenu from '../components/InteractiveNavMenu';
import ParallaxBackground from '../components/ParallaxBackground';

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState('leaderboard');
  const [category, setCategory] = useState('overall');
  const [users, setUsers] = useState([]);
  const [badges, setBadges] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [showBadgeDetails, setShowBadgeDetails] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Sample user data
  const sampleUsers = [
    {
      id: 'user1',
      name: 'PetLover123',
      avatar: '👧',
      level: 8,
      xp: 780,
      totalXP: 3780,
      badges: ['pet-collector', 'quiz-master', 'ar-explorer', 'virtual-pet-pro', 'photo-enthusiast'],
      stats: {
        petsAdded: 12,
        quizzesTaken: 24,
        arPhotos: 18,
        virtualPetLevel: 5,
        galleryLikes: 87
      },
      joinDate: '2024-12-15T12:00:00Z',
      lastActive: '2025-03-27T14:30:00Z',
      weeklyXP: 320,
      monthlyXP: 980
    },
    {
      id: 'user2',
      name: 'AnimalWhisperer',
      avatar: '👨',
      level: 10,
      xp: 450,
      totalXP: 4950,
      badges: ['pet-collector', 'quiz-master', 'ar-explorer', 'virtual-pet-pro', 'photo-enthusiast', 'community-leader'],
      stats: {
        petsAdded: 18,
        quizzesTaken: 32,
        arPhotos: 25,
        virtualPetLevel: 7,
        galleryLikes: 124
      },
      joinDate: '2024-11-20T09:15:00Z',
      lastActive: '2025-03-28T09:45:00Z',
      weeklyXP: 450,
      monthlyXP: 1250
    },
    {
      id: 'user3',
      name: 'PawsomeTrainer',
      avatar: '👩',
      level: 7,
      xp: 320,
      totalXP: 2820,
      badges: ['pet-collector', 'quiz-master', 'virtual-pet-pro'],
      stats: {
        petsAdded: 8,
        quizzesTaken: 19,
        arPhotos: 7,
        virtualPetLevel: 6,
        galleryLikes: 53
      },
      joinDate: '2025-01-05T16:20:00Z',
      lastActive: '2025-03-26T18:10:00Z',
      weeklyXP: 180,
      monthlyXP: 720
    },
    {
      id: 'user4',
      name: 'FurryFriend',
      avatar: '🧑',
      level: 5,
      xp: 150,
      totalXP: 1650,
      badges: ['pet-collector', 'virtual-pet-pro'],
      stats: {
        petsAdded: 5,
        quizzesTaken: 8,
        arPhotos: 3,
        virtualPetLevel: 4,
        galleryLikes: 27
      },
      joinDate: '2025-02-10T11:30:00Z',
      lastActive: '2025-03-25T20:45:00Z',
      weeklyXP: 150,
      monthlyXP: 480
    },
    {
      id: 'user5',
      name: 'PetPalExtraordinaire',
      avatar: '👦',
      level: 9,
      xp: 840,
      totalXP: 4340,
      badges: ['pet-collector', 'quiz-master', 'ar-explorer', 'virtual-pet-pro', 'community-leader'],
      stats: {
        petsAdded: 15,
        quizzesTaken: 27,
        arPhotos: 22,
        virtualPetLevel: 6,
        galleryLikes: 96
      },
      joinDate: '2024-12-01T14:45:00Z',
      lastActive: '2025-03-28T08:20:00Z',
      weeklyXP: 380,
      monthlyXP: 1120
    },
    {
      id: 'current',
      name: 'You',
      avatar: '😎',
      level: 6,
      xp: 250,
      totalXP: 2250,
      badges: ['pet-collector', 'quiz-master', 'ar-explorer'],
      stats: {
        petsAdded: 7,
        quizzesTaken: 15,
        arPhotos: 12,
        virtualPetLevel: 3,
        galleryLikes: 42
      },
      joinDate: '2025-01-15T10:00:00Z',
      lastActive: '2025-03-28T10:15:00Z',
      weeklyXP: 250,
      monthlyXP: 680
    }
  ];

  // Badge definitions
  const badgeDefinitions = [
    {
      id: 'pet-collector',
      name: 'Pet Collector',
      icon: '🏆',
      description: 'Add at least 5 pets to your collection',
      requirement: 'Add 5 pets',
      color: '#ff9800',
      levels: [
        { level: 1, requirement: 'Add 5 pets', icon: '🥉' },
        { level: 2, requirement: 'Add 10 pets', icon: '🥈' },
        { level: 3, requirement: 'Add 20 pets', icon: '🥇' }
      ]
    },
    {
      id: 'quiz-master',
      name: 'Quiz Master',
      icon: '🧠',
      description: 'Complete at least 10 pet quizzes',
      requirement: 'Complete 10 quizzes',
      color: '#9c27b0',
      levels: [
        { level: 1, requirement: 'Complete 10 quizzes', icon: '🥉' },
        { level: 2, requirement: 'Complete 20 quizzes', icon: '🥈' },
        { level: 3, requirement: 'Complete 30 quizzes', icon: '🥇' }
      ]
    },
    {
      id: 'ar-explorer',
      name: 'AR Explorer',
      icon: '📱',
      description: 'Take at least 10 AR photos with virtual pets',
      requirement: 'Take 10 AR photos',
      color: '#2196f3',
      levels: [
        { level: 1, requirement: 'Take 10 AR photos', icon: '🥉' },
        { level: 2, requirement: 'Take 20 AR photos', icon: '🥈' },
        { level: 3, requirement: 'Take 30 AR photos', icon: '🥇' }
      ]
    },
    {
      id: 'virtual-pet-pro',
      name: 'Virtual Pet Pro',
      icon: '🎮',
      description: 'Reach level 3 with your virtual pet',
      requirement: 'Reach pet level 3',
      color: '#4caf50',
      levels: [
        { level: 1, requirement: 'Reach pet level 3', icon: '🥉' },
        { level: 2, requirement: 'Reach pet level 5', icon: '🥈' },
        { level: 3, requirement: 'Reach pet level 7', icon: '🥇' }
      ]
    },
    {
      id: 'photo-enthusiast',
      name: 'Photo Enthusiast',
      icon: '📸',
      description: 'Get 50 likes on your pet gallery photos',
      requirement: 'Get 50 gallery likes',
      color: '#e91e63',
      levels: [
        { level: 1, requirement: 'Get 50 gallery likes', icon: '🥉' },
        { level: 2, requirement: 'Get 100 gallery likes', icon: '🥈' },
        { level: 3, requirement: 'Get 200 gallery likes', icon: '🥇' }
      ]
    },
    {
      id: 'community-leader',
      name: 'Community Leader',
      icon: '👑',
      description: 'Reach the top 3 on the leaderboard',
      requirement: 'Reach top 3 rank',
      color: '#ffc107',
      levels: [
        { level: 1, requirement: 'Reach top 3 rank', icon: '🥉' },
        { level: 2, requirement: 'Reach top 2 rank', icon: '🥈' },
        { level: 3, requirement: 'Reach top 1 rank', icon: '🥇' }
      ]
    }
  ];

  // Recent achievements
  const sampleAchievements = [
    {
      id: 'ach1',
      userId: 'user2',
      userName: 'AnimalWhisperer',
      userAvatar: '👨',
      badgeId: 'community-leader',
      badgeName: 'Community Leader',
      badgeIcon: '👑',
      level: 3,
      timestamp: '2025-03-28T08:30:00Z'
    },
    {
      id: 'ach2',
      userId: 'user5',
      userName: 'PetPalExtraordinaire',
      userAvatar: '👦',
      badgeId: 'virtual-pet-pro',
      badgeName: 'Virtual Pet Pro',
      badgeIcon: '🎮',
      level: 2,
      timestamp: '2025-03-27T19:15:00Z'
    },
    {
      id: 'ach3',
      userId: 'current',
      userName: 'You',
      userAvatar: '😎',
      badgeId: 'ar-explorer',
      badgeName: 'AR Explorer',
      badgeIcon: '📱',
      level: 1,
      timestamp: '2025-03-27T14:45:00Z'
    },
    {
      id: 'ach4',
      userId: 'user1',
      userName: 'PetLover123',
      userAvatar: '👧',
      badgeId: 'photo-enthusiast',
      badgeName: 'Photo Enthusiast',
      badgeIcon: '📸',
      level: 1,
      timestamp: '2025-03-26T16:20:00Z'
    },
    {
      id: 'ach5',
      userId: 'user3',
      userName: 'PawsomeTrainer',
      userAvatar: '👩',
      badgeId: 'quiz-master',
      badgeName: 'Quiz Master',
      badgeIcon: '🧠',
      level: 1,
      timestamp: '2025-03-26T11:10:00Z'
    }
  ];

  // Load data on component mount
  useEffect(() => {
    // Simulate loading data
    setIsLoading(true);
    setTimeout(() => {
      setUsers(sampleUsers);
      setBadges(badgeDefinitions);
      setAchievements(sampleAchievements);
      setCurrentUser(sampleUsers.find(user => user.id === 'current'));
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter users based on time frame
  const getFilteredUsers = () => {
    let filteredUsers = [...users];
    
    // Sort based on category
    switch (category) {
      case 'overall':
        filteredUsers.sort((a, b) => b.totalXP - a.totalXP);
        break;
      case 'weekly':
        filteredUsers.sort((a, b) => b.weeklyXP - a.weeklyXP);
        break;
      case 'monthly':
        filteredUsers.sort((a, b) => b.monthlyXP - a.monthlyXP);
        break;
      case 'badges':
        filteredUsers.sort((a, b) => b.badges.length - a.badges.length);
        break;
      case 'pets':
        filteredUsers.sort((a, b) => b.stats.petsAdded - a.stats.petsAdded);
        break;
      default:
        filteredUsers.sort((a, b) => b.totalXP - a.totalXP);
    }
    
    return filteredUsers;
  };

  // Get user rank
  const getUserRank = (userId) => {
    const filteredUsers = getFilteredUsers();
    return filteredUsers.findIndex(user => user.id === userId) + 1;
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    
    if (diffDays > 0) {
      return diffDays === 1 ? 'Yesterday' : `${diffDays} days ago`;
    } else if (diffHours > 0) {
      return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
    } else if (diffMinutes > 0) {
      return `${diffMinutes} ${diffMinutes === 1 ? 'minute' : 'minutes'} ago`;
    } else {
      return 'Just now';
    }
  };

  // Calculate XP needed for next level
  const getXPForNextLevel = (level) => {
    return level * 500;
  };

  // Calculate progress percentage
  const getProgressPercentage = (xp, level) => {
    const xpNeeded = getXPForNextLevel(level);
    return (xp / xpNeeded) * 100;
  };

  // Get badge level for a user
  const getBadgeLevel = (userId, badgeId) => {
    const user = users.find(u => u.id === userId);
    if (!user) return 0;
    
    const hasBadge = user.badges.includes(badgeId);
    if (!hasBadge) return 0;
    
    // Determine level based on stats
    const badge = badges.find(b => b.id === badgeId);
    if (!badge) return 0;
    
    switch (badgeId) {
      case 'pet-collector':
        return user.stats.petsAdded >= 20 ? 3 : user.stats.petsAdded >= 10 ? 2 : 1;
      case 'quiz-master':
        return user.stats.quizzesTaken >= 30 ? 3 : user.stats.quizzesTaken >= 20 ? 2 : 1;
      case 'ar-explorer':
        return user.stats.arPhotos >= 30 ? 3 : user.stats.arPhotos >= 20 ? 2 : 1;
      case 'virtual-pet-pro':
        return user.stats.virtualPetLevel >= 7 ? 3 : user.stats.virtualPetLevel >= 5 ? 2 : 1;
      case 'photo-enthusiast':
        return user.stats.galleryLikes >= 200 ? 3 : user.stats.galleryLikes >= 100 ? 2 : 1;
      case 'community-leader': {
        const rank = getUserRank(userId);
        return rank === 1 ? 3 : rank === 2 ? 2 : 1;
      }
      default:
        return 1;
    }
  };

  // Get badge icon based on level
  const getBadgeIcon = (badgeId, userId) => {
    const badge = badges.find(b => b.id === badgeId);
    if (!badge) return '🏅';
    
    const level = getBadgeLevel(userId, badgeId);
    const levelInfo = badge.levels.find(l => l.level === level);
    
    return levelInfo ? levelInfo.icon : badge.icon;
  };

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      {/* Background */}
      <ParallaxBackground colorScheme="orange" />
      
      {/* Navigation */}
      <div style={{ padding: '20px 40px' }}>
        <InteractiveNavMenu colorScheme="orange" />
      </div>
      
      {/* Main Content */}
      <div style={{ 
        padding: '20px', 
        maxWidth: '1200px', 
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ 
            textAlign: 'center', 
            color: 'white',
            fontSize: '2.5rem',
            marginBottom: '10px',
            textShadow: '0 2px 10px rgba(0,0,0,0.3)'
          }}
        >
          Pet Matchmaker Leaderboard
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ 
            textAlign: 'center', 
            color: 'white',
            fontSize: '1.2rem',
            marginBottom: '30px',
            maxWidth: '700px',
            margin: '0 auto 30px',
            textShadow: '0 2px 5px rgba(0,0,0,0.2)'
          }}
        >
          Compete with other pet lovers and earn badges, XP, and achievements!
        </motion.p>
        
        {/* Loading State */}
        {isLoading ? (
          <div style={{ 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '300px'
          }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                border: '5px solid rgba(255, 255, 255, 0.1)',
                borderTopColor: 'white',
                marginRight: '15px'
              }}
            />
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ 
                color: 'white',
                fontSize: '1.2rem',
                fontWeight: 'bold'
              }}
            >
              Loading leaderboard data...
            </motion.p>
          </div>
        ) : (
          <>
            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '20px',
                gap: '10px'
              }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab('leaderboard')}
                style={{
                  padding: '10px 20px',
                  borderRadius: '30px',
                  border: 'none',
                  background: activeTab === 'leaderboard' ? '#e65100' : 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  boxShadow: activeTab === 'leaderboard' ? '0 5px 15px rgba(0,0,0,0.2)' : 'none'
                }}
              >
                Leaderboard
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab('badges')}
                style={{
                  padding: '10px 20px',
                  borderRadius: '30px',
                  border: 'none',
                  background: activeTab === 'badges' ? '#e65100' : 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  boxShadow: activeTab === 'badges' ? '0 5px 15px rgba(0,0,0,0.2)' : 'none'
                }}
              >
                Badges
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab('achievements')}
                style={{
                  padding: '10px 20px',
                  borderRadius: '30px',
                  border: 'none',
                  background: activeTab === 'achievements' ? '#e65100' : 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  boxShadow: activeTab === 'achievements' ? '0 5px 15px rgba(0,0,0,0.2)' : 'none'
                }}
              >
                Recent Achievements
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab('profile')}
                style={{
                  padding: '10px 20px',
                  borderRadius: '30px',
                  border: 'none',
                  background: activeTab === 'profile' ? '#e65100' : 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  boxShadow: activeTab === 'profile' ? '0 5px 15px rgba(0,0,0,0.2)' : 'none'
                }}
              >
                Your Profile
              </motion.button>
            </motion.div>
            
            {/* Leaderboard Tab */}
            {activeTab === 'leaderboard' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {/* Filters */}
                <div style={{ 
                  display: 'flex',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  gap: '10px',
                  flexWrap: 'wrap'
                }}>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={{
                      padding: '8px 15px',
                      borderRadius: '20px',
                      border: 'none',
                      background: 'rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="overall">Overall XP</option>
                    <option value="weekly">Weekly XP</option>
                    <option value="monthly">Monthly XP</option>
                    <option value="badges">Most Badges</option>
                    <option value="pets">Most Pets</option>
                  </select>
                </div>
                
                {/* Leaderboard Table */}
                <div style={{ 
                  background: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '15px',
                  overflow: 'hidden',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                  marginBottom: '20px'
                }}>
                  {/* Table Header */}
                  <div style={{ 
                    display: 'grid',
                    gridTemplateColumns: '80px 1fr 120px 120px',
                    padding: '15px 20px',
                    background: '#e65100',
                    color: 'white',
                    fontWeight: 'bold'
                  }}>
                    <div>Rank</div>
                    <div>User</div>
                    <div style={{ textAlign: 'center' }}>Level</div>
                    <div style={{ textAlign: 'right' }}>
                      {category === 'overall' ? 'Total XP' : 
                       category === 'weekly' ? 'Weekly XP' : 
                       category === 'monthly' ? 'Monthly XP' : 
                       category === 'badges' ? 'Badges' : 
                       'Pets'}
                    </div>
                  </div>
                  
                  {/* Table Rows */}
                  {getFilteredUsers().map((user, index) => {
                    const isCurrentUser = user.id === 'current';
                    const rank = index + 1;
                    
                    return (
                      <motion.div
                        key={user.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        style={{ 
                          display: 'grid',
                          gridTemplateColumns: '80px 1fr 120px 120px',
                          padding: '15px 20px',
                          borderBottom: index < users.length - 1 ? '1px solid #eee' : 'none',
                          background: isCurrentUser ? 'rgba(255, 152, 0, 0.1)' : 'transparent'
                        }}
                      >
                        {/* Rank */}
                        <div style={{ 
                          display: 'flex',
                          alignItems: 'center'
                        }}>
                          <div style={{ 
                            width: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            background: rank <= 3 ? 
                              ['#ffd700', '#c0c0c0', '#cd7f32'][rank - 1] : 
                              '#e0e0e0',
                            color: rank <= 3 ? '#fff' : '#333',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontWeight: 'bold'
                          }}>
                            {rank}
                          </div>
                        </div>
                        
                        {/* User */}
                        <div style={{ 
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px'
                        }}>
                          <div style={{ 
                            width: '35px',
                            height: '35px',
                            borderRadius: '50%',
                            background: '#f5f5f5',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: '1.2rem'
                          }}>
                            {user.avatar}
                          </div>
                          <div>
                            <div style={{ 
                              fontWeight: 'bold',
                              color: isCurrentUser ? '#e65100' : '#333'
                            }}>
                              {user.name} {isCurrentUser && '(You)'}
                            </div>
                            <div style={{ 
                              fontSize: '0.8rem',
                              color: '#666',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '5px',
                              flexWrap: 'wrap'
                            }}>
                              {user.badges.slice(0, 3).map((badgeId) => (
                                <span key={badgeId} title={badges.find(b => b.id === badgeId)?.name}>
                                  {getBadgeIcon(badgeId, user.id)}
                                </span>
                              ))}
                              {user.badges.length > 3 && (
                                <span>+{user.badges.length - 3}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {/* Level */}
                        <div style={{ 
                          textAlign: 'center',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}>
                          <div style={{ fontWeight: 'bold', color: '#e65100' }}>
                            Level {user.level}
                          </div>
                          <div style={{ 
                            width: '80px',
                            height: '6px',
                            background: '#eee',
                            borderRadius: '3px',
                            overflow: 'hidden',
                            marginTop: '5px'
                          }}>
                            <div style={{ 
                              height: '100%',
                              width: `${getProgressPercentage(user.xp, user.level)}%`,
                              background: '#e65100'
                            }} />
                          </div>
                        </div>
                        
                        {/* XP/Badges/Pets */}
                        <div style={{ 
                          textAlign: 'right',
                          fontWeight: 'bold',
                          color: '#e65100'
                        }}>
                          {category === 'overall' ? user.totalXP.toLocaleString() : 
                           category === 'weekly' ? user.weeklyXP.toLocaleString() : 
                           category === 'monthly' ? user.monthlyXP.toLocaleString() : 
                           category === 'badges' ? user.badges.length : 
                           user.stats.petsAdded}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
            
            {/* Badges Tab */}
            {activeTab === 'badges' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div style={{ 
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                  gap: '20px'
                }}>
                  {badges.map((badge, index) => (
                    <motion.div
                      key={badge.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      onClick={() => setShowBadgeDetails(badge)}
                      style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        borderRadius: '15px',
                        overflow: 'hidden',
                        boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ 
                        padding: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '15px'
                      }}>
                        <div style={{ 
                          width: '60px',
                          height: '60px',
                          borderRadius: '50%',
                          background: badge.color,
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          fontSize: '2rem',
                          color: 'white',
                          boxShadow: '0 3px 10px rgba(0,0,0,0.1)'
                        }}>
                          {badge.icon}
                        </div>
                        
                        <div style={{ flex: 1 }}>
                          <h3 style={{ margin: '0 0 5px 0', color: '#e65100' }}>
                            {badge.name}
                          </h3>
                          <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
                            {badge.description}
                          </p>
                        </div>
                      </div>
                      
                      <div style={{ 
                        padding: '10px 20px',
                        background: '#f5f5f5',
                        borderTop: '1px solid #eee',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <div style={{ 
                          display: 'flex',
                          gap: '10px'
                        }}>
                          {badge.levels.map((level) => (
                            <div 
                              key={level.level}
                              style={{
                                opacity: currentUser && getBadgeLevel(currentUser.id, badge.id) >= level.level ? 1 : 0.3
                              }}
                            >
                              {level.icon}
                            </div>
                          ))}
                        </div>
                        
                        <div style={{ 
                          fontSize: '0.8rem',
                          color: '#666'
                        }}>
                          {currentUser && currentUser.badges.includes(badge.id) ? (
                            <span style={{ color: '#4caf50', fontWeight: 'bold' }}>
                              Earned (Level {getBadgeLevel(currentUser.id, badge.id)})
                            </span>
                          ) : (
                            <span>Not earned yet</span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
            
            {/* Achievements Tab */}
            {activeTab === 'achievements' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '15px',
                  padding: '20px',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
                }}
              >
                <h2 style={{ margin: '0 0 20px 0', color: '#e65100' }}>
                  Recent Achievements
                </h2>
                
                <div style={{ 
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '15px'
                }}>
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '15px',
                        padding: '15px',
                        background: achievement.userId === 'current' ? 'rgba(255, 152, 0, 0.1)' : '#f9f9f9',
                        borderRadius: '10px'
                      }}
                    >
                      <div style={{ 
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: '#f5f5f5',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: '1.2rem'
                      }}>
                        {achievement.userAvatar}
                      </div>
                      
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 'bold' }}>
                          {achievement.userName} {achievement.userId === 'current' && '(You)'}
                        </div>
                        <div style={{ 
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                          color: '#666'
                        }}>
                          earned the <span style={{ fontWeight: 'bold', color: '#e65100' }}>{achievement.badgeName}</span> badge
                          <span style={{ 
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '3px'
                          }}>
                            {achievement.badgeIcon} (Level {achievement.level})
                          </span>
                        </div>
                      </div>
                      
                      <div style={{ 
                        fontSize: '0.8rem',
                        color: '#888'
                      }}>
                        {formatDate(achievement.timestamp)}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
            
            {/* Profile Tab */}
            {activeTab === 'profile' && currentUser && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {/* Profile Header */}
                <div style={{ 
                  background: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '15px',
                  padding: '30px',
                  marginBottom: '20px',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '30px'
                }}>
                  {/* Left side - Avatar and basic info */}
                  <div style={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minWidth: '200px'
                  }}>
                    <div style={{ 
                      width: '100px',
                      height: '100px',
                      borderRadius: '50%',
                      background: '#f5f5f5',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontSize: '3rem',
                      marginBottom: '15px',
                      boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
                    }}>
                      {currentUser.avatar}
                    </div>
                    
                    <h2 style={{ margin: '0 0 5px 0', color: '#e65100' }}>
                      {currentUser.name}
                    </h2>
                    
                    <div style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      color: '#666',
                      marginBottom: '15px'
                    }}>
                      <span>Rank #{getUserRank(currentUser.id)}</span>
                      <span>•</span>
                      <span>Joined {new Date(currentUser.joinDate).toLocaleDateString()}</span>
                    </div>
                    
                    <div style={{ 
                      display: 'flex',
                      gap: '10px',
                      flexWrap: 'wrap',
                      justifyContent: 'center'
                    }}>
                      {currentUser.badges.map((badgeId) => {
                        const badge = badges.find(b => b.id === badgeId);
                        if (!badge) return null;
                        
                        const level = getBadgeLevel(currentUser.id, badgeId);
                        const levelInfo = badge.levels.find(l => l.level === level);
                        
                        return (
                          <div 
                            key={badgeId}
                            style={{
                              width: '40px',
                              height: '40px',
                              borderRadius: '50%',
                              background: badge.color,
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              fontSize: '1.2rem',
                              color: 'white',
                              position: 'relative'
                            }}
                            title={`${badge.name} (Level ${level})`}
                          >
                            {levelInfo ? levelInfo.icon : badge.icon}
                            <div style={{ 
                              position: 'absolute',
                              bottom: '-3px',
                              right: '-3px',
                              background: 'white',
                              borderRadius: '50%',
                              width: '18px',
                              height: '18px',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              fontSize: '0.7rem',
                              fontWeight: 'bold',
                              color: badge.color,
                              border: `2px solid ${badge.color}`
                            }}>
                              {level}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* Right side - Stats */}
                  <div style={{ flex: 1, minWidth: '300px' }}>
                    <div style={{ marginBottom: '20px' }}>
                      <div style={{ 
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '10px'
                      }}>
                        <h3 style={{ margin: 0, color: '#e65100' }}>
                          Level {currentUser.level}
                        </h3>
                        <div style={{ color: '#666' }}>
                          {currentUser.xp} / {getXPForNextLevel(currentUser.level)} XP
                        </div>
                      </div>
                      
                      <div style={{ 
                        width: '100%',
                        height: '10px',
                        background: '#eee',
                        borderRadius: '5px',
                        overflow: 'hidden'
                      }}>
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${getProgressPercentage(currentUser.xp, currentUser.level)}%` }}
                          transition={{ duration: 1 }}
                          style={{ 
                            height: '100%',
                            background: '#e65100'
                          }}
                        />
                      </div>
                    </div>
                    
                    <div style={{ 
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                      gap: '15px'
                    }}>
                      <div style={{ 
                        background: '#f5f5f5',
                        borderRadius: '10px',
                        padding: '15px',
                        textAlign: 'center'
                      }}>
                        <div style={{ fontSize: '2rem', marginBottom: '5px' }}>
                          {currentUser.totalXP.toLocaleString()}
                        </div>
                        <div style={{ color: '#666', fontSize: '0.9rem' }}>
                          Total XP
                        </div>
                      </div>
                      
                      <div style={{ 
                        background: '#f5f5f5',
                        borderRadius: '10px',
                        padding: '15px',
                        textAlign: 'center'
                      }}>
                        <div style={{ fontSize: '2rem', marginBottom: '5px' }}>
                          {currentUser.badges.length}
                        </div>
                        <div style={{ color: '#666', fontSize: '0.9rem' }}>
                          Badges Earned
                        </div>
                      </div>
                      
                      <div style={{ 
                        background: '#f5f5f5',
                        borderRadius: '10px',
                        padding: '15px',
                        textAlign: 'center'
                      }}>
                        <div style={{ fontSize: '2rem', marginBottom: '5px' }}>
                          {currentUser.stats.petsAdded}
                        </div>
                        <div style={{ color: '#666', fontSize: '0.9rem' }}>
                          Pets Added
                        </div>
                      </div>
                      
                      <div style={{ 
                        background: '#f5f5f5',
                        borderRadius: '10px',
                        padding: '15px',
                        textAlign: 'center'
                      }}>
                        <div style={{ fontSize: '2rem', marginBottom: '5px' }}>
                          {currentUser.stats.quizzesTaken}
                        </div>
                        <div style={{ color: '#666', fontSize: '0.9rem' }}>
                          Quizzes Taken
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Activity Stats */}
                <div style={{ 
                  background: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '15px',
                  padding: '20px',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
                }}>
                  <h3 style={{ margin: '0 0 20px 0', color: '#e65100' }}>
                    Activity Stats
                  </h3>
                  
                  <div style={{ 
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: '20px'
                  }}>
                    <div>
                      <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                        Virtual Pet Level
                      </div>
                      <div style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                      }}>
                        <div style={{ 
                          width: '100%',
                          height: '8px',
                          background: '#eee',
                          borderRadius: '4px',
                          overflow: 'hidden'
                        }}>
                          <div style={{ 
                            height: '100%',
                            width: `${(currentUser.stats.virtualPetLevel / 10) * 100}%`,
                            background: '#4caf50'
                          }} />
                        </div>
                        <div style={{ 
                          fontWeight: 'bold',
                          color: '#4caf50'
                        }}>
                          {currentUser.stats.virtualPetLevel}/10
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                        AR Photos Taken
                      </div>
                      <div style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                      }}>
                        <div style={{ 
                          width: '100%',
                          height: '8px',
                          background: '#eee',
                          borderRadius: '4px',
                          overflow: 'hidden'
                        }}>
                          <div style={{ 
                            height: '100%',
                            width: `${(currentUser.stats.arPhotos / 30) * 100}%`,
                            background: '#2196f3'
                          }} />
                        </div>
                        <div style={{ 
                          fontWeight: 'bold',
                          color: '#2196f3'
                        }}>
                          {currentUser.stats.arPhotos}/30
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                        Gallery Likes
                      </div>
                      <div style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                      }}>
                        <div style={{ 
                          width: '100%',
                          height: '8px',
                          background: '#eee',
                          borderRadius: '4px',
                          overflow: 'hidden'
                        }}>
                          <div style={{ 
                            height: '100%',
                            width: `${(currentUser.stats.galleryLikes / 200) * 100}%`,
                            background: '#e91e63'
                          }} />
                        </div>
                        <div style={{ 
                          fontWeight: 'bold',
                          color: '#e91e63'
                        }}>
                          {currentUser.stats.galleryLikes}/200
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                        Quizzes Completed
                      </div>
                      <div style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                      }}>
                        <div style={{ 
                          width: '100%',
                          height: '8px',
                          background: '#eee',
                          borderRadius: '4px',
                          overflow: 'hidden'
                        }}>
                          <div style={{ 
                            height: '100%',
                            width: `${(currentUser.stats.quizzesTaken / 30) * 100}%`,
                            background: '#9c27b0'
                          }} />
                        </div>
                        <div style={{ 
                          fontWeight: 'bold',
                          color: '#9c27b0'
                        }}>
                          {currentUser.stats.quizzesTaken}/30
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>
      
      {/* Badge Details Modal */}
      <AnimatePresence>
        {showBadgeDetails && (
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
              background: 'rgba(0, 0, 0, 0.7)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1000,
              padding: '20px',
              backdropFilter: 'blur(5px)'
            }}
            onClick={() => setShowBadgeDetails(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              style={{
                background: 'white',
                borderRadius: '15px',
                width: '100%',
                maxWidth: '500px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Badge Header */}
              <div style={{ 
                background: showBadgeDetails.color,
                padding: '30px 20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                color: 'white',
                position: 'relative'
              }}>
                <div style={{ 
                  fontSize: '4rem',
                  marginBottom: '10px'
                }}>
                  {showBadgeDetails.icon}
                </div>
                
                <h2 style={{ margin: '0 0 5px 0' }}>
                  {showBadgeDetails.name}
                </h2>
                
                <p style={{ margin: 0, opacity: 0.9 }}>
                  {showBadgeDetails.description}
                </p>
                
                {/* Close button */}
                <button
                  onClick={() => setShowBadgeDetails(null)}
                  style={{
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                    background: 'rgba(0, 0, 0, 0.2)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    fontSize: '1rem'
                  }}
                >
                  ✕
                </button>
              </div>
              
              {/* Badge Levels */}
              <div style={{ padding: '20px' }}>
                <h3 style={{ margin: '0 0 15px 0', color: showBadgeDetails.color }}>
                  Badge Levels
                </h3>
                
                <div style={{ 
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '15px'
                }}>
                  {showBadgeDetails.levels.map((level) => {
                    const isEarned = currentUser && getBadgeLevel(currentUser.id, showBadgeDetails.id) >= level.level;
                    
                    return (
                      <div 
                        key={level.level}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '15px',
                          padding: '15px',
                          background: isEarned ? `${showBadgeDetails.color}10` : '#f5f5f5',
                          borderRadius: '10px',
                          borderLeft: `4px solid ${isEarned ? showBadgeDetails.color : '#ddd'}`
                        }}
                      >
                        <div style={{ 
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          background: isEarned ? showBadgeDetails.color : '#ddd',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          color: 'white',
                          fontSize: '1.2rem'
                        }}>
                          {level.icon}
                        </div>
                        
                        <div style={{ flex: 1 }}>
                          <div style={{ 
                            fontWeight: 'bold',
                            color: isEarned ? showBadgeDetails.color : '#666'
                          }}>
                            Level {level.level}
                          </div>
                          <div style={{ color: '#666' }}>
                            {level.requirement}
                          </div>
                        </div>
                        
                        {isEarned && (
                          <div style={{ 
                            color: '#4caf50',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px'
                          }}>
                            <span style={{ fontSize: '1.2rem' }}>✓</span>
                            Earned
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Users with this badge */}
              <div style={{ 
                padding: '0 20px 20px',
                borderTop: '1px solid #eee',
                marginTop: '10px',
                paddingTop: '20px'
              }}>
                <h3 style={{ margin: '0 0 15px 0', color: showBadgeDetails.color }}>
                  Users with this Badge
                </h3>
                
                <div style={{ 
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '10px'
                }}>
                  {users
                    .filter(user => user.badges.includes(showBadgeDetails.id))
                    .map(user => (
                      <div 
                        key={user.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                          background: '#f5f5f5',
                          padding: '5px 10px',
                          borderRadius: '20px',
                          fontSize: '0.9rem'
                        }}
                      >
                        <span>{user.avatar}</span>
                        <span>{user.name}</span>
                        <span style={{ 
                          background: showBadgeDetails.color,
                          color: 'white',
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          fontSize: '0.7rem',
                          fontWeight: 'bold'
                        }}>
                          {getBadgeLevel(user.id, showBadgeDetails.id)}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Leaderboard;