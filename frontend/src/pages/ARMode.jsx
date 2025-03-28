import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InteractiveNavMenu from '../components/InteractiveNavMenu';

const ARMode = () => {
  const [isARActive, setIsARActive] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [petPosition, setPetPosition] = useState({ x: 50, y: 50 });
  const [petSize, setPetSize] = useState(100);
  const [isCameraPermissionGranted, setIsCameraPermissionGranted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [petRotation, setPetRotation] = useState(0);
  const [isTakingPhoto, setIsTakingPhoto] = useState(false);
  const [capturedPhotos, setCapturedPhotos] = useState([]);
  const [showGallery, setShowGallery] = useState(false);
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  
  // Available pets
  const availablePets = [
    { id: 'dog', name: 'Dog', emoji: '🐕', sound: 'Woof!' },
    { id: 'cat', name: 'Cat', emoji: '🐈', sound: 'Meow!' },
    { id: 'rabbit', name: 'Rabbit', emoji: '🐇', sound: 'Squeak!' },
    { id: 'hamster', name: 'Hamster', emoji: '🐹', sound: 'Squeak!' },
    { id: 'bird', name: 'Bird', emoji: '🦜', sound: 'Tweet!' },
    { id: 'fish', name: 'Fish', emoji: '🐠', sound: 'Blub!' },
    { id: 'dragon', name: 'Dragon', emoji: '🐉', sound: 'Roar!' },
    { id: 'unicorn', name: 'Unicorn', emoji: '🦄', sound: 'Neigh!' }
  ];

  // Load captured photos from localStorage
  useEffect(() => {
    const savedPhotos = localStorage.getItem('arCapturedPhotos');
    if (savedPhotos) {
      setCapturedPhotos(JSON.parse(savedPhotos));
    }
  }, []);

  // Save captured photos to localStorage
  useEffect(() => {
    if (capturedPhotos.length > 0) {
      localStorage.setItem('arCapturedPhotos', JSON.stringify(capturedPhotos));
    }
  }, [capturedPhotos]);

  // Start camera when AR is activated
  useEffect(() => {
    if (isARActive && !isCameraPermissionGranted) {
      startCamera();
    } else if (!isARActive && isCameraPermissionGranted) {
      stopCamera();
    }
  }, [isARActive, isCameraPermissionGranted]);

  // Start camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraPermissionGranted(true);
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      alert('Camera access is required for AR mode. Please allow camera access and try again.');
      setIsARActive(false);
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  // Handle pet selection
  const handlePetSelect = (pet) => {
    setSelectedPet(pet);
    setShowInstructions(false);
  };

  // Handle touch/click to position pet
  const handleScreenTap = (e) => {
    if (!selectedPet || !isARActive) return;
    
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    
    // Calculate position as percentage of container
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setPetPosition({ x, y });
  };

  // Increase pet size
  const increasePetSize = () => {
    setPetSize(prevSize => Math.min(prevSize + 20, 300));
  };

  // Decrease pet size
  const decreasePetSize = () => {
    setPetSize(prevSize => Math.max(prevSize - 20, 40));
  };

  // Rotate pet
  const rotatePet = () => {
    setPetRotation(prevRotation => prevRotation + 45);
  };

  // Take a photo
  const takePhoto = () => {
    if (!canvasRef.current || !videoRef.current) return;
    
    setIsTakingPhoto(true);
    
    // Create a canvas to capture the image
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');
    
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Draw pet on canvas
    const petX = (petPosition.x / 100) * canvas.width;
    const petY = (petPosition.y / 100) * canvas.height;
    const fontSize = petSize / 100 * Math.min(canvas.width, canvas.height) / 5;
    
    context.save();
    context.translate(petX, petY);
    context.rotate(petRotation * Math.PI / 180);
    context.font = `${fontSize}px Arial`;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(selectedPet.emoji, 0, 0);
    context.restore();
    
    // Get image data URL
    const imageDataURL = canvas.toDataURL('image/png');
    
    // Add to captured photos
    const newPhoto = {
      id: Date.now().toString(),
      imageUrl: imageDataURL,
      petType: selectedPet.id,
      petEmoji: selectedPet.emoji,
      timestamp: new Date().toISOString()
    };
    
    setCapturedPhotos(prevPhotos => [newPhoto, ...prevPhotos]);
    
    // Show capture animation
    setTimeout(() => {
      setIsTakingPhoto(false);
    }, 500);
  };

  // Delete a photo
  const deletePhoto = (photoId) => {
    setCapturedPhotos(prevPhotos => prevPhotos.filter(photo => photo.id !== photoId));
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      position: 'relative',
      background: isARActive ? '#000' : 'linear-gradient(135deg, #0d47a1 0%, #1565c0 50%, #1976d2 100%)',
      overflow: 'hidden'
    }}>
      {/* Navigation */}
      <div style={{ 
        padding: '20px 40px',
        position: 'relative',
        zIndex: 10
      }}>
        <InteractiveNavMenu colorScheme="blue" />
      </div>
      
      {/* AR View */}
      <div style={{ 
        position: 'relative',
        height: 'calc(100vh - 100px)',
        overflow: 'hidden'
      }}>
        {/* Video feed */}
        {isARActive && (
          <div 
            style={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              overflow: 'hidden'
            }}
            onClick={handleScreenTap}
          >
            <video 
              ref={videoRef}
              autoPlay 
              playsInline
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
            
            {/* Pet overlay */}
            {selectedPet && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                style={{
                  position: 'absolute',
                  left: `${petPosition.x}%`,
                  top: `${petPosition.y}%`,
                  transform: `translate(-50%, -50%) rotate(${petRotation}deg)`,
                  fontSize: `${petSize}px`,
                  filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.5))',
                  pointerEvents: 'none'
                }}
              >
                {selectedPet.emoji}
              </motion.div>
            )}
            
            {/* Photo flash effect */}
            <AnimatePresence>
              {isTakingPhoto && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'white',
                    pointerEvents: 'none'
                  }}
                />
              )}
            </AnimatePresence>
          </div>
        )}
        
        {/* Canvas for capturing photos (hidden) */}
        <canvas 
          ref={canvasRef} 
          style={{ display: 'none' }}
        />
        
        {/* Welcome screen */}
        {!isARActive && !showGallery && (
          <div style={{ 
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px'
          }}>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{ 
                color: 'white',
                fontSize: '2.5rem',
                marginBottom: '20px',
                textAlign: 'center',
                textShadow: '0 2px 10px rgba(0,0,0,0.3)'
              }}
            >
              AR Pet Mode
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ 
                color: 'white',
                fontSize: '1.2rem',
                marginBottom: '40px',
                maxWidth: '600px',
                textAlign: 'center',
                textShadow: '0 2px 5px rgba(0,0,0,0.2)'
              }}
            >
              See virtual pets in your surroundings using augmented reality!
            </motion.p>
            
            <div style={{ 
              display: 'flex',
              gap: '20px',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsARActive(true)}
                style={{
                  padding: '15px 30px',
                  borderRadius: '30px',
                  border: 'none',
                  background: 'white',
                  color: '#0d47a1',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>📱</span>
                Start AR Mode
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowGallery(true)}
                style={{
                  padding: '15px 30px',
                  borderRadius: '30px',
                  border: 'none',
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>🖼️</span>
                View AR Gallery
              </motion.button>
            </div>
          </div>
        )}
        
        {/* Photo Gallery */}
        {showGallery && (
          <div style={{ 
            height: '100%',
            padding: '20px',
            overflowY: 'auto'
          }}>
            <div style={{ 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                style={{ 
                  color: 'white',
                  margin: 0,
                  textShadow: '0 2px 5px rgba(0,0,0,0.2)'
                }}
              >
                AR Photo Gallery
              </motion.h2>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowGallery(false)}
                style={{
                  padding: '10px 15px',
                  borderRadius: '20px',
                  border: 'none',
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Back
              </motion.button>
            </div>
            
            {capturedPhotos.length === 0 ? (
              <div style={{ 
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '15px',
                padding: '30px',
                textAlign: 'center',
                color: 'white'
              }}>
                <span style={{ fontSize: '3rem', marginBottom: '15px', display: 'block' }}>📷</span>
                <h3 style={{ margin: '0 0 10px 0' }}>No AR photos yet</h3>
                <p style={{ margin: 0 }}>
                  Start AR mode and take some photos with virtual pets!
                </p>
              </div>
            ) : (
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '20px'
              }}>
                {capturedPhotos.map((photo, index) => (
                  <motion.div
                    key={photo.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '15px',
                      overflow: 'hidden',
                      boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                      position: 'relative'
                    }}
                  >
                    <div style={{ position: 'relative' }}>
                      <img 
                        src={photo.imageUrl} 
                        alt="AR Pet Photo" 
                        style={{
                          width: '100%',
                          aspectRatio: '4/3',
                          objectFit: 'cover',
                          display: 'block'
                        }}
                      />
                      
                      <div style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'rgba(0, 0, 0, 0.5)',
                        borderRadius: '50%',
                        width: '30px',
                        height: '30px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer',
                        color: 'white',
                        fontSize: '1rem'
                      }}
                      onClick={() => deletePhoto(photo.id)}
                      >
                        ✕
                      </div>
                      
                      <div style={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '10px',
                        background: 'rgba(0, 0, 0, 0.5)',
                        borderRadius: '20px',
                        padding: '5px 10px',
                        color: 'white',
                        fontSize: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}>
                        <span>{photo.petEmoji}</span>
                        <span>{availablePets.find(p => p.id === photo.petType)?.name || 'Pet'}</span>
                      </div>
                    </div>
                    
                    <div style={{ padding: '10px', color: 'white' }}>
                      <div style={{ 
                        fontSize: '0.8rem',
                        opacity: 0.8
                      }}>
                        {formatDate(photo.timestamp)}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {/* Pet selection overlay */}
        <AnimatePresence>
          {isARActive && showInstructions && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0, 0, 0, 0.8)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px',
                zIndex: 20
              }}
            >
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ 
                  color: 'white',
                  marginBottom: '20px',
                  textAlign: 'center'
                }}
              >
                Choose a Pet
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{ 
                  color: 'white',
                  marginBottom: '30px',
                  maxWidth: '600px',
                  textAlign: 'center'
                }}
              >
                Select a virtual pet to place in your surroundings
              </motion.p>
              
              <div style={{ 
                display: 'flex',
                flexWrap: 'wrap',
                gap: '15px',
                justifyContent: 'center',
                maxWidth: '600px'
              }}>
                {availablePets.map((pet, index) => (
                  <motion.div
                    key={pet.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handlePetSelect(pet)}
                    style={{
                      width: '80px',
                      height: '80px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '15px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      cursor: 'pointer',
                      padding: '10px'
                    }}
                  >
                    <span style={{ fontSize: '2rem' }}>{pet.emoji}</span>
                    <span style={{ 
                      color: 'white',
                      fontSize: '0.8rem',
                      marginTop: '5px'
                    }}>
                      {pet.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Controls */}
        {isARActive && selectedPet && (
          <>
            {/* Top controls */}
            <div style={{ 
              position: 'absolute',
              top: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '10px',
              zIndex: 10
            }}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowControls(!showControls)}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: 'none',
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  fontSize: '1.2rem',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                  backdropFilter: 'blur(5px)'
                }}
              >
                {showControls ? '✕' : '⚙️'}
              </motion.button>
            </div>
            
            {/* Bottom controls */}
            <div style={{ 
              position: 'absolute',
              bottom: '20px',
              left: '0',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              gap: '20px',
              zIndex: 10
            }}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedPet(null);
                  setShowInstructions(true);
                }}
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  border: 'none',
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  fontSize: '1.5rem',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                  backdropFilter: 'blur(5px)'
                }}
              >
                🔄
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={takePhoto}
                style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '50%',
                  border: '3px solid rgba(255, 255, 255, 0.5)',
                  background: 'rgba(255, 255, 255, 0.3)',
                  color: 'white',
                  fontSize: '2rem',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                  backdropFilter: 'blur(5px)'
                }}
              >
                📸
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setIsARActive(false);
                  setSelectedPet(null);
                }}
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  border: 'none',
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  fontSize: '1.5rem',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                  backdropFilter: 'blur(5px)'
                }}
              >
                ✕
              </motion.button>
            </div>
            
            {/* Pet controls panel */}
            <AnimatePresence>
              {showControls && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    position: 'absolute',
                    top: '70px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'rgba(0, 0, 0, 0.7)',
                    borderRadius: '15px',
                    padding: '15px',
                    display: 'flex',
                    gap: '10px',
                    backdropFilter: 'blur(5px)',
                    zIndex: 10
                  }}
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={decreasePetSize}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      border: 'none',
                      background: 'rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      fontSize: '1.2rem',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    -
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={increasePetSize}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      border: 'none',
                      background: 'rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      fontSize: '1.2rem',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    +
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={rotatePet}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      border: 'none',
                      background: 'rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      fontSize: '1.2rem',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    🔄
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  );
};

export default ARMode;