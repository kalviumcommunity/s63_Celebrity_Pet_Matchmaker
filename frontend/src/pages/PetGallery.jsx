import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InteractiveNavMenu from '../components/InteractiveNavMenu';
import ParallaxBackground from '../components/ParallaxBackground';

const PetGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('');
  const [description, setDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const fileInputRef = useRef(null);

  // Pet types for dropdown
  const petTypes = [
    { value: 'dog', label: 'Dog 🐕' },
    { value: 'cat', label: 'Cat 🐈' },
    { value: 'bird', label: 'Bird 🦜' },
    { value: 'rabbit', label: 'Rabbit 🐇' },
    { value: 'hamster', label: 'Hamster 🐹' },
    { value: 'fish', label: 'Fish 🐠' },
    { value: 'reptile', label: 'Reptile 🦎' },
    { value: 'other', label: 'Other 🐾' }
  ];

  // Sample users for comments and likes
  const sampleUsers = [
    { id: 'user1', name: 'Alex', avatar: '👨' },
    { id: 'user2', name: 'Taylor', avatar: '👩' },
    { id: 'user3', name: 'Jordan', avatar: '🧑' },
    { id: 'user4', name: 'Casey', avatar: '👧' },
    { id: 'user5', name: 'Morgan', avatar: '👦' }
  ];

  // Current user (would come from auth context in a real app)
  const currentUser = { id: 'current', name: 'You', avatar: '😎' };

  // Load photos from localStorage on component mount
  useEffect(() => {
    const savedPhotos = localStorage.getItem('petGallery');
    if (savedPhotos) {
      setPhotos(JSON.parse(savedPhotos));
    } else {
      // Sample photos if none exist
      const samplePhotos = [
        {
          id: 'sample1',
          imageUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1',
          petName: 'Max',
          petType: 'dog',
          description: 'My golden retriever enjoying the park!',
          uploadDate: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
          owner: sampleUsers[0],
          likes: [sampleUsers[1], sampleUsers[2]],
          comments: [
            { id: 'c1', user: sampleUsers[1], text: 'Such a cute dog!', timestamp: new Date(Date.now() - 3600000).toISOString() },
            { id: 'c2', user: sampleUsers[3], text: 'I love golden retrievers!', timestamp: new Date(Date.now() - 1800000).toISOString() }
          ]
        },
        {
          id: 'sample2',
          imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba',
          petName: 'Whiskers',
          petType: 'cat',
          description: 'My cat being mysterious as always.',
          uploadDate: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
          owner: sampleUsers[2],
          likes: [sampleUsers[0], sampleUsers[3], sampleUsers[4]],
          comments: [
            { id: 'c3', user: sampleUsers[0], text: 'Those eyes! 😍', timestamp: new Date(Date.now() - 7200000).toISOString() }
          ]
        },
        {
          id: 'sample3',
          imageUrl: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca',
          petName: 'Tweety',
          petType: 'bird',
          description: 'My colorful parakeet singing in the morning.',
          uploadDate: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
          owner: sampleUsers[4],
          likes: [sampleUsers[1]],
          comments: []
        }
      ];
      setPhotos(samplePhotos);
      localStorage.setItem('petGallery', JSON.stringify(samplePhotos));
    }
  }, []);

  // Save photos to localStorage when they change
  useEffect(() => {
    if (photos.length > 0) {
      localStorage.setItem('petGallery', JSON.stringify(photos));
    }
  }, [photos]);

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!uploadedImage || !petName || !petType) {
      alert('Please fill in all required fields and upload an image.');
      return;
    }
    
    setIsUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      const newPhoto = {
        id: `photo_${Date.now()}`,
        imageUrl: uploadedImage,
        petName,
        petType,
        description,
        uploadDate: new Date().toISOString(),
        owner: currentUser,
        likes: [],
        comments: []
      };
      
      setPhotos([newPhoto, ...photos]);
      
      // Reset form
      setUploadedImage(null);
      setPetName('');
      setPetType('');
      setDescription('');
      setIsUploading(false);
      setShowUploadForm(false);
      
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }, 1500);
  };

  // Toggle like on a photo
  const toggleLike = (photoId) => {
    setPhotos(photos.map(photo => {
      if (photo.id === photoId) {
        const userLiked = photo.likes.some(user => user.id === currentUser.id);
        
        if (userLiked) {
          // Unlike
          return {
            ...photo,
            likes: photo.likes.filter(user => user.id !== currentUser.id)
          };
        } else {
          // Like
          return {
            ...photo,
            likes: [...photo.likes, currentUser]
          };
        }
      }
      return photo;
    }));
  };

  // Add comment to a photo
  const addComment = (photoId) => {
    if (!newComment.trim()) return;
    
    const comment = {
      id: `comment_${Date.now()}`,
      user: currentUser,
      text: newComment,
      timestamp: new Date().toISOString()
    };
    
    setPhotos(photos.map(photo => {
      if (photo.id === photoId) {
        return {
          ...photo,
          comments: [...photo.comments, comment]
        };
      }
      return photo;
    }));
    
    setNewComment('');
  };

  // Format date for display
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

  // Filter and sort photos
  const filteredPhotos = photos
    .filter(photo => {
      // Filter by pet type
      if (activeFilter !== 'all' && photo.petType !== activeFilter) {
        return false;
      }
      
      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          photo.petName.toLowerCase().includes(query) ||
          photo.description.toLowerCase().includes(query) ||
          photo.petType.toLowerCase().includes(query)
        );
      }
      
      return true;
    })
    .sort((a, b) => {
      // Sort by selected criteria
      switch (sortBy) {
        case 'newest':
          return new Date(b.uploadDate) - new Date(a.uploadDate);
        case 'oldest':
          return new Date(a.uploadDate) - new Date(b.uploadDate);
        case 'mostLiked':
          return b.likes.length - a.likes.length;
        case 'mostComments':
          return b.comments.length - a.comments.length;
        default:
          return 0;
      }
    });

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      {/* Background */}
      <ParallaxBackground colorScheme="green" />
      
      {/* Navigation */}
      <div style={{ padding: '20px 40px' }}>
        <InteractiveNavMenu colorScheme="green" />
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
          Pet Gallery
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
          Share photos of your pets and discover adorable pets from other users!
        </motion.p>
        
        {/* Controls Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '15px',
            padding: '15px 20px',
            marginBottom: '20px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
            gap: '10px'
          }}
        >
          {/* Left side - Filters */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: '10px',
            flexWrap: 'wrap'
          }}>
            <span style={{ fontWeight: 'bold', color: '#1b5e20' }}>Filter:</span>
            <select
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
              style={{
                padding: '8px 12px',
                borderRadius: '8px',
                border: '2px solid #e8f5e9',
                background: 'white',
                color: '#1b5e20'
              }}
            >
              <option value="all">All Pets</option>
              {petTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            
            <span style={{ fontWeight: 'bold', color: '#1b5e20', marginLeft: '10px' }}>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '8px 12px',
                borderRadius: '8px',
                border: '2px solid #e8f5e9',
                background: 'white',
                color: '#1b5e20'
              }}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="mostLiked">Most Liked</option>
              <option value="mostComments">Most Comments</option>
            </select>
          </div>
          
          {/* Right side - Search and Upload */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: '10px',
            flexWrap: 'wrap'
          }}>
            <div style={{ 
              display: 'flex',
              alignItems: 'center',
              background: 'white',
              borderRadius: '8px',
              border: '2px solid #e8f5e9',
              padding: '5px 10px',
              width: '200px'
            }}>
              <span style={{ color: '#1b5e20', marginRight: '5px' }}>🔍</span>
              <input
                type="text"
                placeholder="Search pets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  border: 'none',
                  outline: 'none',
                  width: '100%',
                  padding: '3px 0'
                }}
              />
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowUploadForm(!showUploadForm)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '8px 15px',
                borderRadius: '8px',
                border: 'none',
                background: '#1b5e20',
                color: 'white',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              {showUploadForm ? '✕ Cancel' : '📷 Upload Pet Photo'}
            </motion.button>
          </div>
        </motion.div>
        
        {/* Upload Form */}
        <AnimatePresence>
          {showUploadForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '15px',
                padding: '20px',
                marginBottom: '20px',
                boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                overflow: 'hidden'
              }}
            >
              <h3 style={{ margin: '0 0 15px 0', color: '#1b5e20' }}>Upload a New Pet Photo</h3>
              
              <form onSubmit={handleSubmit}>
                <div style={{ 
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '20px',
                  marginBottom: '20px'
                }}>
                  {/* Left side - Image upload */}
                  <div style={{ flex: '1', minWidth: '300px' }}>
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      style={{
                        border: '2px dashed #1b5e20',
                        borderRadius: '10px',
                        padding: '20px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        height: '200px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        background: uploadedImage ? `url(${uploadedImage}) center/cover no-repeat` : '#f5f5f5',
                        position: 'relative'
                      }}
                    >
                      {!uploadedImage && (
                        <>
                          <span style={{ fontSize: '2rem', marginBottom: '10px' }}>📷</span>
                          <span>Click to upload a photo</span>
                        </>
                      )}
                      
                      {uploadedImage && (
                        <div style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: 'rgba(0,0,0,0.3)',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          color: 'white',
                          fontWeight: 'bold',
                          borderRadius: '8px'
                        }}>
                          Click to change
                        </div>
                      )}
                      
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        style={{ display: 'none' }}
                      />
                    </div>
                  </div>
                  
                  {/* Right side - Form fields */}
                  <div style={{ flex: '1', minWidth: '300px' }}>
                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#1b5e20' }}>
                        Pet Name *
                      </label>
                      <input
                        type="text"
                        value={petName}
                        onChange={(e) => setPetName(e.target.value)}
                        placeholder="Enter your pet's name"
                        required
                        style={{
                          width: '100%',
                          padding: '10px',
                          borderRadius: '8px',
                          border: '2px solid #e8f5e9',
                          fontSize: '1rem'
                        }}
                      />
                    </div>
                    
                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#1b5e20' }}>
                        Pet Type *
                      </label>
                      <select
                        value={petType}
                        onChange={(e) => setPetType(e.target.value)}
                        required
                        style={{
                          width: '100%',
                          padding: '10px',
                          borderRadius: '8px',
                          border: '2px solid #e8f5e9',
                          fontSize: '1rem'
                        }}
                      >
                        <option value="">Select pet type</option>
                        {petTypes.map(type => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#1b5e20' }}>
                        Description
                      </label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Tell us about your pet..."
                        style={{
                          width: '100%',
                          padding: '10px',
                          borderRadius: '8px',
                          border: '2px solid #e8f5e9',
                          fontSize: '1rem',
                          minHeight: '80px',
                          resize: 'vertical'
                        }}
                      />
                    </div>
                  </div>
                </div>
                
                <div style={{ textAlign: 'right' }}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={isUploading}
                    style={{
                      padding: '10px 20px',
                      borderRadius: '8px',
                      border: 'none',
                      background: '#1b5e20',
                      color: 'white',
                      fontWeight: 'bold',
                      cursor: isUploading ? 'not-allowed' : 'pointer',
                      opacity: isUploading ? 0.7 : 1,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    {isUploading ? (
                      <>
                        <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>🔄</span>
                        Uploading...
                      </>
                    ) : (
                      <>
                        📤 Upload Photo
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Photo Grid */}
        {filteredPhotos.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              background: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '15px',
              padding: '30px',
              textAlign: 'center',
              boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
            }}
          >
            <span style={{ fontSize: '3rem', marginBottom: '15px', display: 'block' }}>🔍</span>
            <h3 style={{ margin: '0 0 10px 0', color: '#1b5e20' }}>No pets found</h3>
            <p style={{ margin: 0, color: '#666' }}>
              {searchQuery 
                ? `No results for "${searchQuery}". Try a different search term.` 
                : activeFilter !== 'all' 
                  ? `No ${activeFilter} pets found. Try a different filter.`
                  : 'Upload your first pet photo to get started!'}
            </p>
          </motion.div>
        ) : (
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (index % 10) }}
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '15px',
                  overflow: 'hidden',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                }}
              >
                {/* Photo */}
                <div 
                  style={{
                    height: '200px',
                    background: `url(${photo.imageUrl}) center/cover no-repeat`,
                    position: 'relative',
                    cursor: 'pointer'
                  }}
                  onClick={() => setSelectedPhoto(photo)}
                >
                  {/* Pet type badge */}
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '20px',
                    padding: '5px 10px',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    color: '#1b5e20',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}>
                    {petTypes.find(type => type.value === photo.petType)?.label || 'Pet'}
                  </div>
                </div>
                
                {/* Content */}
                <div style={{ padding: '15px' }}>
                  <div style={{ 
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '10px'
                  }}>
                    <h3 style={{ margin: 0, color: '#1b5e20' }}>{photo.petName}</h3>
                    <span style={{ color: '#666', fontSize: '0.8rem' }}>
                      {formatDate(photo.uploadDate)}
                    </span>
                  </div>
                  
                  <p style={{ 
                    margin: '0 0 15px 0',
                    color: '#555',
                    fontSize: '0.9rem',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    height: '40px'
                  }}>
                    {photo.description}
                  </p>
                  
                  {/* Owner */}
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    fontSize: '0.9rem',
                    color: '#666',
                    marginBottom: '15px'
                  }}>
                    <span>{photo.owner.avatar}</span>
                    <span>{photo.owner.name}</span>
                  </div>
                  
                  {/* Actions */}
                  <div style={{ 
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderTop: '1px solid #eee',
                    paddingTop: '15px'
                  }}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleLike(photo.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: photo.likes.some(user => user.id === currentUser.id) ? '#e91e63' : '#666',
                        fontWeight: photo.likes.some(user => user.id === currentUser.id) ? 'bold' : 'normal',
                      }}
                    >
                      {photo.likes.some(user => user.id === currentUser.id) ? '❤️' : '🤍'} {photo.likes.length}
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedPhoto(photo)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#666',
                      }}
                    >
                      💬 {photo.comments.length}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      
      {/* Photo Detail Modal */}
      <AnimatePresence>
        {selectedPhoto && (
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
              background: 'rgba(0, 0, 0, 0.8)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1000,
              padding: '20px',
              backdropFilter: 'blur(5px)'
            }}
            onClick={() => setSelectedPhoto(null)}
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
                maxWidth: '900px',
                maxHeight: '90vh',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  background: 'rgba(0, 0, 0, 0.5)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '30px',
                  height: '30px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                  zIndex: 10,
                  fontSize: '1rem'
                }}
              >
                ✕
              </button>
              
              <div style={{ 
                display: 'flex', 
                flexDirection: 'row',
                height: '100%',
                maxHeight: '90vh',
                flexWrap: 'wrap'
              }}>
                {/* Left side - Photo */}
                <div style={{ 
                  flex: '1 1 50%',
                  minWidth: '300px',
                  background: `url(${selectedPhoto.imageUrl}) center/cover no-repeat`,
                  minHeight: '300px'
                }} />
                
                {/* Right side - Details and Comments */}
                <div style={{ 
                  flex: '1 1 50%',
                  minWidth: '300px',
                  display: 'flex',
                  flexDirection: 'column',
                  maxHeight: '90vh'
                }}>
                  {/* Header */}
                  <div style={{ padding: '20px', borderBottom: '1px solid #eee' }}>
                    <div style={{ 
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '10px'
                    }}>
                      <h2 style={{ margin: 0, color: '#1b5e20' }}>{selectedPhoto.petName}</h2>
                      <div style={{
                        background: '#e8f5e9',
                        borderRadius: '20px',
                        padding: '5px 10px',
                        fontSize: '0.9rem',
                        fontWeight: 'bold',
                        color: '#1b5e20',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}>
                        {petTypes.find(type => type.value === selectedPhoto.petType)?.label || 'Pet'}
                      </div>
                    </div>
                    
                    <p style={{ margin: '0 0 15px 0', color: '#555' }}>
                      {selectedPhoto.description}
                    </p>
                    
                    {/* Owner and date */}
                    <div style={{ 
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '0.9rem',
                      color: '#666'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <span>{selectedPhoto.owner.avatar}</span>
                        <span>{selectedPhoto.owner.name}</span>
                      </div>
                      <span>{formatDate(selectedPhoto.uploadDate)}</span>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div style={{ 
                    display: 'flex',
                    padding: '10px 20px',
                    borderBottom: '1px solid #eee',
                    gap: '20px'
                  }}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleLike(selectedPhoto.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: selectedPhoto.likes.some(user => user.id === currentUser.id) ? '#e91e63' : '#666',
                        fontWeight: selectedPhoto.likes.some(user => user.id === currentUser.id) ? 'bold' : 'normal',
                      }}
                    >
                      {selectedPhoto.likes.some(user => user.id === currentUser.id) ? '❤️' : '🤍'} {selectedPhoto.likes.length} {selectedPhoto.likes.length === 1 ? 'Like' : 'Likes'}
                    </motion.button>
                    
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      color: '#666',
                    }}>
                      💬 {selectedPhoto.comments.length} {selectedPhoto.comments.length === 1 ? 'Comment' : 'Comments'}
                    </div>
                  </div>
                  
                  {/* Comments */}
                  <div style={{ 
                    flex: 1,
                    overflowY: 'auto',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px'
                  }}>
                    {selectedPhoto.comments.length === 0 ? (
                      <div style={{ 
                        textAlign: 'center',
                        color: '#666',
                        padding: '20px 0'
                      }}>
                        No comments yet. Be the first to comment!
                      </div>
                    ) : (
                      selectedPhoto.comments.map(comment => (
                        <div key={comment.id} style={{ 
                          display: 'flex',
                          gap: '10px'
                        }}>
                          <div style={{ 
                            width: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            background: '#f5f5f5',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: '1.2rem'
                          }}>
                            {comment.user.avatar}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ 
                              background: '#f5f5f5',
                              borderRadius: '10px',
                              padding: '10px',
                              position: 'relative'
                            }}>
                              <div style={{ 
                                fontWeight: 'bold',
                                marginBottom: '5px',
                                fontSize: '0.9rem'
                              }}>
                                {comment.user.name}
                              </div>
                              <div style={{ fontSize: '0.95rem' }}>
                                {comment.text}
                              </div>
                            </div>
                            <div style={{ 
                              fontSize: '0.8rem',
                              color: '#888',
                              marginTop: '5px',
                              paddingLeft: '5px'
                            }}>
                              {formatDate(comment.timestamp)}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  
                  {/* Comment input */}
                  <div style={{ 
                    padding: '15px 20px',
                    borderTop: '1px solid #eee',
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'center'
                  }}>
                    <div style={{ 
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      background: '#e8f5e9',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontSize: '1.2rem'
                    }}>
                      {currentUser.avatar}
                    </div>
                    <input
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add a comment..."
                      style={{
                        flex: 1,
                        padding: '10px 15px',
                        borderRadius: '20px',
                        border: '1px solid #ddd',
                        outline: 'none',
                        fontSize: '0.95rem'
                      }}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && newComment.trim()) {
                          addComment(selectedPhoto.id);
                        }
                      }}
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => addComment(selectedPhoto.id)}
                      disabled={!newComment.trim()}
                      style={{
                        background: '#1b5e20',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '36px',
                        height: '36px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: newComment.trim() ? 'pointer' : 'not-allowed',
                        opacity: newComment.trim() ? 1 : 0.5
                      }}
                    >
                      ➤
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PetGallery;