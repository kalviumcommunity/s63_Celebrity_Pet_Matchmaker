import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InteractiveNavMenu from '../components/InteractiveNavMenu';
import ParallaxBackground from '../components/ParallaxBackground';

const Adoption = () => {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [filters, setFilters] = useState({
    type: 'all',
    age: 'all',
    size: 'all',
    gender: 'all',
    location: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [activeTab, setActiveTab] = useState('available');
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationData, setApplicationData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    experience: '',
    homeType: 'house',
    hasYard: 'yes',
    otherPets: '',
    reason: ''
  });
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Sample pet data
  const samplePets = [
    {
      id: 'pet1',
      name: 'Buddy',
      type: 'dog',
      breed: 'Golden Retriever',
      age: 3,
      size: 'large',
      gender: 'male',
      description: 'Buddy is a friendly and energetic Golden Retriever who loves to play fetch and go for long walks. He\'s great with children and other pets.',
      images: ['https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&auto=format&fit=crop&w=912&q=80'],
      location: 'New York, NY',
      distance: 5.2,
      shelterName: 'Happy Tails Rescue',
      shelterContact: 'contact@happytails.org',
      shelterPhone: '(555) 123-4567',
      medicalInfo: 'Neutered, vaccinated, microchipped',
      goodWith: ['children', 'dogs', 'cats'],
      activityLevel: 'high',
      specialNeeds: false,
      trained: true,
      story: 'Buddy was found as a stray wandering near a park. He was thin and scared but has since blossomed into a confident and loving dog. He\'s been in foster care for 3 months and is ready for his forever home.'
    },
    {
      id: 'pet2',
      name: 'Whiskers',
      type: 'cat',
      breed: 'Domestic Shorthair',
      age: 2,
      size: 'medium',
      gender: 'female',
      description: 'Whiskers is a sweet and gentle cat who loves to curl up in laps and purr. She\'s quiet and would do well in an apartment.',
      images: ['https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'],
      location: 'Boston, MA',
      distance: 3.8,
      shelterName: 'Feline Friends Rescue',
      shelterContact: 'adopt@felinefriends.org',
      shelterPhone: '(555) 987-6543',
      medicalInfo: 'Spayed, vaccinated, microchipped',
      goodWith: ['seniors', 'cats'],
      activityLevel: 'low',
      specialNeeds: false,
      trained: true,
      story: 'Whiskers was surrendered when her previous owner had to move to a care facility. She\'s a gentle soul who loves quiet environments and gentle pets.'
    },
    {
      id: 'pet3',
      name: 'Rex',
      type: 'dog',
      breed: 'German Shepherd',
      age: 5,
      size: 'large',
      gender: 'male',
      description: 'Rex is a loyal and intelligent German Shepherd who would make an excellent companion. He\'s well-trained and responds to basic commands.',
      images: ['https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?ixlib=rb-4.0.3&auto=format&fit=crop&w=1335&q=80'],
      location: 'Chicago, IL',
      distance: 7.1,
      shelterName: 'Second Chance Shelter',
      shelterContact: 'info@secondchance.org',
      shelterPhone: '(555) 456-7890',
      medicalInfo: 'Neutered, vaccinated, microchipped, heartworm negative',
      goodWith: ['adults', 'dogs'],
      activityLevel: 'medium',
      specialNeeds: false,
      trained: true,
      story: 'Rex was surrendered by a military family who was deployed overseas. He\'s a loyal companion who bonds deeply with his humans and is looking for a forever home.'
    },
    {
      id: 'pet4',
      name: 'Fluffy',
      type: 'rabbit',
      breed: 'Holland Lop',
      age: 1,
      size: 'small',
      gender: 'female',
      description: 'Fluffy is an adorable Holland Lop rabbit with floppy ears and a gentle temperament. She enjoys being petted and eating fresh vegetables.',
      images: ['https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80'],
      location: 'Seattle, WA',
      distance: 2.3,
      shelterName: 'Small Paws Rescue',
      shelterContact: 'adopt@smallpaws.org',
      shelterPhone: '(555) 234-5678',
      medicalInfo: 'Spayed, vaccinated',
      goodWith: ['children', 'adults'],
      activityLevel: 'low',
      specialNeeds: false,
      trained: false,
      story: 'Fluffy was part of a rescue from a hoarding situation. She\'s sweet and gentle, and would make a wonderful pet for a first-time rabbit owner.'
    },
    {
      id: 'pet5',
      name: 'Charlie',
      type: 'dog',
      breed: 'Beagle Mix',
      age: 4,
      size: 'medium',
      gender: 'male',
      description: 'Charlie is a friendly Beagle mix with a lot of energy. He loves to explore and would be perfect for an active family.',
      images: ['https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'],
      location: 'Austin, TX',
      distance: 4.5,
      shelterName: 'Paws and Claws Rescue',
      shelterContact: 'info@pawsandclaws.org',
      shelterPhone: '(555) 345-6789',
      medicalInfo: 'Neutered, vaccinated, microchipped',
      goodWith: ['children', 'adults', 'dogs'],
      activityLevel: 'high',
      specialNeeds: false,
      trained: true,
      story: 'Charlie was found as a stray in a rural area. He\'s curious and energetic, with a nose that\'s always sniffing out new adventures.'
    },
    {
      id: 'pet6',
      name: 'Mittens',
      type: 'cat',
      breed: 'Maine Coon Mix',
      age: 7,
      size: 'large',
      gender: 'female',
      description: 'Mittens is a beautiful Maine Coon mix with a fluffy coat and gentle personality. She\'s a lap cat who loves to be brushed.',
      images: ['https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=1335&q=80'],
      location: 'Denver, CO',
      distance: 6.7,
      shelterName: 'Mountain Cat Rescue',
      shelterContact: 'adopt@mountaincat.org',
      shelterPhone: '(555) 567-8901',
      medicalInfo: 'Spayed, vaccinated, microchipped, dental work completed',
      goodWith: ['seniors', 'adults', 'cats'],
      activityLevel: 'low',
      specialNeeds: true,
      specialNeedsDetails: 'Requires daily brushing and special diet for sensitive stomach',
      trained: true,
      story: 'Mittens was surrendered when her elderly owner passed away. She\'s a gentle soul who loves quiet companionship and would make a wonderful friend for a calm household.'
    },
    {
      id: 'pet7',
      name: 'Max',
      type: 'dog',
      breed: 'Labrador Retriever',
      age: 1,
      size: 'large',
      gender: 'male',
      description: 'Max is a playful Labrador puppy full of energy and love. He\'s learning basic commands and is eager to please.',
      images: ['https://images.unsplash.com/photo-1605897472359-85e4b94c703a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1287&q=80'],
      location: 'Portland, OR',
      distance: 3.2,
      shelterName: 'Northwest Dog Rescue',
      shelterContact: 'adopt@nwdogrescue.org',
      shelterPhone: '(555) 678-9012',
      medicalInfo: 'Neutered, vaccinated, microchipped',
      goodWith: ['children', 'adults', 'dogs'],
      activityLevel: 'very high',
      specialNeeds: false,
      trained: false,
      story: 'Max was surrendered by a family who didn\'t realize how much energy a Lab puppy would have. He\'s smart and eager to learn, but needs an active family who can keep up with him.'
    },
    {
      id: 'pet8',
      name: 'Daisy',
      type: 'cat',
      breed: 'Siamese Mix',
      age: 3,
      size: 'medium',
      gender: 'female',
      description: 'Daisy is a vocal Siamese mix who loves to chat with her humans. She\'s playful and affectionate.',
      images: ['https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1287&q=80'],
      location: 'San Francisco, CA',
      distance: 5.9,
      shelterName: 'Bay Area Cat Rescue',
      shelterContact: 'info@baycats.org',
      shelterPhone: '(555) 789-0123',
      medicalInfo: 'Spayed, vaccinated, microchipped',
      goodWith: ['adults', 'seniors'],
      activityLevel: 'medium',
      specialNeeds: false,
      trained: true,
      story: 'Daisy was found as a pregnant stray and gave birth in foster care. Now that her kittens have all been adopted, it\'s her turn to find a forever home.'
    }
  ];

  // Success stories
  const successStories = [
    {
      id: 'story1',
      petName: 'Luna',
      petType: 'dog',
      petImage: 'https://images.unsplash.com/photo-1600804340584-c7db2eacf0bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1287&q=80',
      adopter: 'The Johnson Family',
      adopterImage: 'https://images.unsplash.com/photo-1612213467906-20440d15bdb8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1287&q=80',
      story: 'Luna was a shy rescue dog who had been at the shelter for over a year. The Johnson family fell in love with her gentle nature and decided to give her a chance. Today, Luna is thriving with her new family, enjoying beach trips and cuddles on the couch. &quot;She&apos;s completed our family in ways we never imagined,&quot; says Sarah Johnson.',
      date: '2 months ago'
    },
    {
      id: 'story2',
      petName: 'Oliver',
      petType: 'cat',
      petImage: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1315&q=80',
      adopter: 'Mark Wilson',
      adopterImage: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&auto=format&fit=crop&w=1331&q=80',
      story: 'Oliver was found as a stray with a broken leg that had healed improperly. After surgery and rehabilitation, he was ready for adoption. Mark, who lives alone, was looking for a companion and instantly connected with Oliver. &quot;He greets me at the door every day and sleeps on my pillow every night. He&apos;s my best friend,&quot; Mark shares.',
      date: '5 months ago'
    },
    {
      id: 'story3',
      petName: 'Bella',
      petType: 'rabbit',
      petImage: 'https://images.unsplash.com/photo-1535241749838-299277b6305f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1287&q=80',
      adopter: 'Emma and Lisa',
      adopterImage: 'https://images.unsplash.com/photo-1566616213894-2d4e1baee5d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1311&q=80',
      story: 'Bella was surrendered when her previous owners developed allergies. Emma and Lisa had never owned a rabbit before but were willing to learn. Now Bella has a custom-built habitat and enjoys supervised time hopping around their apartment. &quot;She has so much personality! We&apos;ve learned so much about rabbit care and couldn&apos;t imagine life without her,&quot; they say.',
      date: '1 year ago'
    }
  ];

  // Load data on component mount
  useEffect(() => {
    // Simulate loading data
    setIsLoading(true);
    setTimeout(() => {
      setPets(samplePets);
      setFilteredPets(samplePets);
      // Load favorites from localStorage
      const savedFavorites = localStorage.getItem('adoptionFavorites');
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
      setIsLoading(false);
    }, 1000);
  }, []);

  // Save favorites to localStorage when they change
  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem('adoptionFavorites', JSON.stringify(favorites));
    }
  }, [favorites]);

  // Apply filters and search
  useEffect(() => {
    let result = [...pets];
    
    // Apply type filter
    if (filters.type !== 'all') {
      result = result.filter(pet => pet.type === filters.type);
    }
    
    // Apply age filter
    if (filters.age !== 'all') {
      switch (filters.age) {
        case 'baby':
          result = result.filter(pet => pet.age < 1);
          break;
        case 'young':
          result = result.filter(pet => pet.age >= 1 && pet.age <= 3);
          break;
        case 'adult':
          result = result.filter(pet => pet.age > 3 && pet.age <= 8);
          break;
        case 'senior':
          result = result.filter(pet => pet.age > 8);
          break;
        default:
          break;
      }
    }
    
    // Apply size filter
    if (filters.size !== 'all') {
      result = result.filter(pet => pet.size === filters.size);
    }
    
    // Apply gender filter
    if (filters.gender !== 'all') {
      result = result.filter(pet => pet.gender === filters.gender);
    }
    
    // Apply location filter
    if (filters.location) {
      result = result.filter(pet => 
        pet.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(pet => 
        pet.name.toLowerCase().includes(query) ||
        pet.breed.toLowerCase().includes(query) ||
        pet.description.toLowerCase().includes(query)
      );
    }
    
    // Apply tab filter
    if (activeTab === 'favorites') {
      result = result.filter(pet => favorites.includes(pet.id));
    }
    
    setFilteredPets(result);
  }, [filters, pets, searchQuery, activeTab, favorites]);

  // Toggle favorite status
  const toggleFavorite = (petId) => {
    if (favorites.includes(petId)) {
      setFavorites(favorites.filter(id => id !== petId));
    } else {
      setFavorites([...favorites, petId]);
    }
  };

  // Handle filter changes
  const handleFilterChange = (filterName, value) => {
    setFilters({
      ...filters,
      [filterName]: value
    });
  };

  // Handle application form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApplicationData({
      ...applicationData,
      [name]: value
    });
  };

  // Handle application form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send the data to a backend
    console.log('Application submitted:', applicationData);
    setApplicationSubmitted(true);
    
    // Reset form after submission
    setTimeout(() => {
      setShowApplicationForm(false);
      setApplicationSubmitted(false);
      setApplicationData({
        name: '',
        email: '',
        phone: '',
        address: '',
        experience: '',
        homeType: 'house',
        hasYard: 'yes',
        otherPets: '',
        reason: ''
      });
    }, 3000);
  };

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      {/* Background */}
      <ParallaxBackground colorScheme="pink" />
      
      {/* Navigation */}
      <div style={{ padding: '20px 40px' }}>
        <InteractiveNavMenu colorScheme="pink" />
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
          Pet Adoption Center
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
          Find your perfect companion and give a loving home to a pet in need
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
              Finding adoptable pets near you...
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
                onClick={() => setActiveTab('available')}
                style={{
                  padding: '10px 20px',
                  borderRadius: '30px',
                  border: 'none',
                  background: activeTab === 'available' ? '#880e4f' : 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  boxShadow: activeTab === 'available' ? '0 5px 15px rgba(0,0,0,0.2)' : 'none'
                }}
              >
                Available Pets
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab('favorites')}
                style={{
                  padding: '10px 20px',
                  borderRadius: '30px',
                  border: 'none',
                  background: activeTab === 'favorites' ? '#880e4f' : 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  boxShadow: activeTab === 'favorites' ? '0 5px 15px rgba(0,0,0,0.2)' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                <span>Favorites</span>
                {favorites.length > 0 && (
                  <span style={{
                    background: 'white',
                    color: '#880e4f',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                  }}>
                    {favorites.length}
                  </span>
                )}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab('success')}
                style={{
                  padding: '10px 20px',
                  borderRadius: '30px',
                  border: 'none',
                  background: activeTab === 'success' ? '#880e4f' : 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  boxShadow: activeTab === 'success' ? '0 5px 15px rgba(0,0,0,0.2)' : 'none'
                }}
              >
                Success Stories
              </motion.button>
            </motion.div>
            
            {/* Search and Filters */}
            {(activeTab === 'available' || activeTab === 'favorites') && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '15px',
                  padding: '20px',
                  marginBottom: '20px',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
                }}
              >
                {/* Search Bar */}
                <div style={{ 
                  display: 'flex',
                  marginBottom: '20px'
                }}>
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    background: 'white',
                    borderRadius: '30px',
                    border: '2px solid #fce4ec',
                    padding: '5px 15px',
                    flex: 1
                  }}>
                    <span style={{ color: '#880e4f', marginRight: '10px', fontSize: '1.2rem' }}>🔍</span>
                    <input
                      type="text"
                      placeholder="Search by name, breed, or description..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{
                        border: 'none',
                        outline: 'none',
                        width: '100%',
                        padding: '8px 0',
                        fontSize: '1rem'
                      }}
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: '#888'
                        }}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>
                
                {/* Filters */}
                <div style={{ 
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '15px'
                }}>
                  {/* Pet Type Filter */}
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#880e4f' }}>
                      Pet Type
                    </label>
                    <select
                      value={filters.type}
                      onChange={(e) => handleFilterChange('type', e.target.value)}
                      style={{
                        padding: '8px 15px',
                        borderRadius: '8px',
                        border: '2px solid #fce4ec',
                        background: 'white',
                        minWidth: '150px'
                      }}
                    >
                      <option value="all">All Types</option>
                      <option value="dog">Dogs</option>
                      <option value="cat">Cats</option>
                      <option value="rabbit">Rabbits</option>
                      <option value="bird">Birds</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  {/* Age Filter */}
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#880e4f' }}>
                      Age
                    </label>
                    <select
                      value={filters.age}
                      onChange={(e) => handleFilterChange('age', e.target.value)}
                      style={{
                        padding: '8px 15px',
                        borderRadius: '8px',
                        border: '2px solid #fce4ec',
                        background: 'white',
                        minWidth: '150px'
                      }}
                    >
                      <option value="all">All Ages</option>
                      <option value="baby">Baby (&lt; 1 year)</option>
                      <option value="young">Young (1-3 years)</option>
                      <option value="adult">Adult (4-8 years)</option>
                      <option value="senior">Senior (8+ years)</option>
                    </select>
                  </div>
                  
                  {/* Size Filter */}
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#880e4f' }}>
                      Size
                    </label>
                    <select
                      value={filters.size}
                      onChange={(e) => handleFilterChange('size', e.target.value)}
                      style={{
                        padding: '8px 15px',
                        borderRadius: '8px',
                        border: '2px solid #fce4ec',
                        background: 'white',
                        minWidth: '150px'
                      }}
                    >
                      <option value="all">All Sizes</option>
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                    </select>
                  </div>
                  
                  {/* Gender Filter */}
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#880e4f' }}>
                      Gender
                    </label>
                    <select
                      value={filters.gender}
                      onChange={(e) => handleFilterChange('gender', e.target.value)}
                      style={{
                        padding: '8px 15px',
                        borderRadius: '8px',
                        border: '2px solid #fce4ec',
                        background: 'white',
                        minWidth: '150px'
                      }}
                    >
                      <option value="all">All Genders</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  
                  {/* Location Filter */}
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#880e4f' }}>
                      Location
                    </label>
                    <input
                      type="text"
                      placeholder="City, State"
                      value={filters.location}
                      onChange={(e) => handleFilterChange('location', e.target.value)}
                      style={{
                        padding: '8px 15px',
                        borderRadius: '8px',
                        border: '2px solid #fce4ec',
                        background: 'white',
                        minWidth: '150px'
                      }}
                    />
                  </div>
                  
                  {/* Reset Filters */}
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'flex-end'
                  }}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setFilters({
                          type: 'all',
                          age: 'all',
                          size: 'all',
                          gender: 'all',
                          location: ''
                        });
                        setSearchQuery('');
                      }}
                      style={{
                        padding: '8px 15px',
                        borderRadius: '8px',
                        border: 'none',
                        background: '#f5f5f5',
                        color: '#880e4f',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}
                    >
                      <span>Reset Filters</span>
                      <span>🔄</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Pet Grid - Available Pets and Favorites */}
            {(activeTab === 'available' || activeTab === 'favorites') && (
              <>
                {filteredPets.length === 0 ? (
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
                    <span style={{ fontSize: '3rem', marginBottom: '15px', display: 'block' }}>
                      {activeTab === 'favorites' ? '❤️' : '🔍'}
                    </span>
                    <h3 style={{ margin: '0 0 10px 0', color: '#880e4f' }}>
                      {activeTab === 'favorites' 
                        ? 'No favorites yet' 
                        : 'No pets found matching your criteria'}
                    </h3>
                    <p style={{ margin: 0, color: '#666' }}>
                      {activeTab === 'favorites' 
                        ? 'Click the heart icon on any pet to add them to your favorites.' 
                        : 'Try adjusting your filters or search terms to see more pets.'}
                    </p>
                  </motion.div>
                ) : (
                  <div style={{ 
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '20px'
                  }}>
                    {filteredPets.map((pet, index) => (
                      <motion.div
                        key={pet.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        style={{
                          background: 'rgba(255, 255, 255, 0.9)',
                          borderRadius: '15px',
                          overflow: 'hidden',
                          boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                        }}
                      >
                        {/* Pet Image */}
                        <div 
                          style={{
                            height: '200px',
                            background: `url(${pet.images[0]}) center/cover no-repeat`,
                            position: 'relative',
                            cursor: 'pointer'
                          }}
                          onClick={() => setSelectedPet(pet)}
                        >
                          {/* Favorite Button */}
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(pet.id);
                            }}
                            style={{
                              position: 'absolute',
                              top: '10px',
                              right: '10px',
                              width: '36px',
                              height: '36px',
                              borderRadius: '50%',
                              background: 'rgba(255, 255, 255, 0.9)',
                              border: 'none',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              fontSize: '1.2rem',
                              color: favorites.includes(pet.id) ? '#e91e63' : '#888',
                              cursor: 'pointer',
                              boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                            }}
                          >
                            {favorites.includes(pet.id) ? '❤️' : '🤍'}
                          </motion.button>
                          
                          {/* Pet Type Badge */}
                          <div style={{
                            position: 'absolute',
                            bottom: '10px',
                            left: '10px',
                            background: 'rgba(255, 255, 255, 0.9)',
                            borderRadius: '20px',
                            padding: '5px 10px',
                            fontSize: '0.9rem',
                            fontWeight: 'bold',
                            color: '#880e4f',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            textTransform: 'capitalize'
                          }}>
                            <span>
                              {pet.type === 'dog' ? '🐕' : 
                               pet.type === 'cat' ? '🐈' : 
                               pet.type === 'rabbit' ? '🐇' : 
                               pet.type === 'bird' ? '🦜' : '🐾'}
                            </span>
                            <span>{pet.type}</span>
                          </div>
                          
                          {/* Distance Badge */}
                          <div style={{
                            position: 'absolute',
                            bottom: '10px',
                            right: '10px',
                            background: 'rgba(255, 255, 255, 0.9)',
                            borderRadius: '20px',
                            padding: '5px 10px',
                            fontSize: '0.9rem',
                            color: '#666',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px'
                          }}>
                            <span>📍</span>
                            <span>{pet.distance} miles</span>
                          </div>
                        </div>
                        
                        {/* Pet Info */}
                        <div style={{ padding: '15px' }}>
                          <div style={{ 
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '5px'
                          }}>
                            <h3 style={{ margin: 0, color: '#880e4f' }}>{pet.name}</h3>
                            <div style={{ 
                              display: 'flex',
                              alignItems: 'center',
                              gap: '5px',
                              color: '#666',
                              fontSize: '0.9rem'
                            }}>
                              <span>{pet.age} {pet.age === 1 ? 'year' : 'years'}</span>
                              <span>•</span>
                              <span style={{ textTransform: 'capitalize' }}>{pet.gender}</span>
                            </div>
                          </div>
                          
                          <p style={{ 
                            margin: '0 0 10px 0',
                            color: '#666',
                            fontSize: '0.9rem'
                          }}>
                            {pet.breed}
                          </p>
                          
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
                            {pet.description}
                          </p>
                          
                          <div style={{ 
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}>
                            <div style={{ 
                              color: '#666',
                              fontSize: '0.9rem'
                            }}>
                              {pet.location}
                            </div>
                            
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setSelectedPet(pet)}
                              style={{
                                padding: '8px 15px',
                                borderRadius: '20px',
                                border: 'none',
                                background: '#880e4f',
                                color: 'white',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                fontSize: '0.9rem'
                              }}
                            >
                              View Details
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </>
            )}
            
            {/* Success Stories Tab */}
            {activeTab === 'success' && (
              <div style={{ 
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}>
                {successStories.map((story, index) => (
                  <motion.div
                    key={story.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    style={{
                      background: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: '15px',
                      overflow: 'hidden',
                      boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                      display: 'flex',
                      flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
                      flexWrap: 'wrap'
                    }}
                  >
                    {/* Story Images */}
                    <div style={{ 
                      flex: '1 1 300px',
                      display: 'flex',
                      flexDirection: 'column'
                    }}>
                      <div style={{ 
                        flex: 2,
                        background: `url(${story.petImage}) center/cover no-repeat`,
                        minHeight: '200px'
                      }} />
                      <div style={{ 
                        flex: 1,
                        background: `url(${story.adopterImage}) center/cover no-repeat`,
                        minHeight: '100px'
                      }} />
                    </div>
                    
                    {/* Story Content */}
                    <div style={{ 
                      flex: '1 1 300px',
                      padding: '20px',
                      display: 'flex',
                      flexDirection: 'column'
                    }}>
                      <div style={{ 
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '10px'
                      }}>
                        <h3 style={{ margin: 0, color: '#880e4f' }}>
                          {story.petName}&apos;s New Home
                        </h3>
                        <div style={{ 
                          background: '#fce4ec',
                          color: '#880e4f',
                          padding: '5px 10px',
                          borderRadius: '20px',
                          fontSize: '0.8rem',
                          fontWeight: 'bold'
                        }}>
                          {story.date}
                        </div>
                      </div>
                      
                      <p style={{ 
                        margin: '0 0 15px 0',
                        color: '#666',
                        fontSize: '0.9rem',
                        flex: 1
                      }}>
                        {story.story}
                      </p>
                      
                      <div style={{ 
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <div style={{ 
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px'
                        }}>
                          <span style={{ 
                            color: '#880e4f',
                            fontWeight: 'bold'
                          }}>
                            Adopted by:
                          </span>
                          <span>{story.adopter}</span>
                        </div>
                        
                        <div style={{ 
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                          color: '#666',
                          fontSize: '0.9rem',
                          textTransform: 'capitalize'
                        }}>
                          <span>
                            {story.petType === 'dog' ? '🐕' : 
                             story.petType === 'cat' ? '🐈' : 
                             story.petType === 'rabbit' ? '🐇' : 
                             story.petType === 'bird' ? '🦜' : '🐾'}
                          </span>
                          <span>{story.petType}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {/* Share Your Story CTA */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  style={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '15px',
                    padding: '30px',
                    textAlign: 'center',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                    marginTop: '20px'
                  }}
                >
                  <h3 style={{ margin: '0 0 15px 0', color: '#880e4f' }}>
                    Have an Adoption Success Story?
                  </h3>
                  <p style={{ margin: '0 0 20px 0', color: '#666' }}>
                    We&apos;d love to hear how your adopted pet has changed your life! Share your story and inspire others to adopt.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      padding: '10px 20px',
                      borderRadius: '30px',
                      border: 'none',
                      background: '#880e4f',
                      color: 'white',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      fontSize: '1rem'
                    }}
                  >
                    Share Your Story
                  </motion.button>
                </motion.div>
              </div>
            )}
          </>
        )}
      </div>
      
      {/* Pet Detail Modal */}
      <AnimatePresence>
        {selectedPet && (
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
            onClick={() => setSelectedPet(null)}
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
                onClick={() => setSelectedPet(null)}
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
                  flex: '1 1 40%',
                  minWidth: '300px',
                  background: `url(${selectedPet.images[0]}) center/cover no-repeat`,
                  minHeight: '300px',
                  position: 'relative'
                }}>
                  {/* Favorite Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleFavorite(selectedPet.id)}
                    style={{
                      position: 'absolute',
                      bottom: '15px',
                      right: '15px',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.9)',
                      border: 'none',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontSize: '1.2rem',
                      color: favorites.includes(selectedPet.id) ? '#e91e63' : '#888',
                      cursor: 'pointer',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                    }}
                  >
                    {favorites.includes(selectedPet.id) ? '❤️' : '🤍'}
                  </motion.button>
                </div>
                
                {/* Right side - Details */}
                <div style={{ 
                  flex: '1 1 60%',
                  minWidth: '300px',
                  display: 'flex',
                  flexDirection: 'column',
                  maxHeight: '90vh',
                  overflow: 'auto'
                }}>
                  {/* Header */}
                  <div style={{ padding: '20px', borderBottom: '1px solid #eee' }}>
                    <div style={{ 
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '10px'
                    }}>
                      <h2 style={{ margin: 0, color: '#880e4f' }}>{selectedPet.name}</h2>
                      <div style={{
                        background: '#fce4ec',
                        borderRadius: '20px',
                        padding: '5px 10px',
                        fontSize: '0.9rem',
                        fontWeight: 'bold',
                        color: '#880e4f',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        textTransform: 'capitalize'
                      }}>
                        <span>
                          {selectedPet.type === 'dog' ? '🐕' : 
                           selectedPet.type === 'cat' ? '🐈' : 
                           selectedPet.type === 'rabbit' ? '🐇' : 
                           selectedPet.type === 'bird' ? '🦜' : '🐾'}
                        </span>
                        <span>{selectedPet.type}</span>
                      </div>
                    </div>
                    
                    <p style={{ margin: '0 0 15px 0', color: '#666' }}>
                      {selectedPet.breed}
                    </p>
                    
                    <div style={{ 
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '10px',
                      marginBottom: '15px'
                    }}>
                      <div style={{ 
                        background: '#f5f5f5',
                        borderRadius: '20px',
                        padding: '5px 10px',
                        fontSize: '0.9rem',
                        color: '#666',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}>
                        <span>🎂</span>
                        <span>{selectedPet.age} {selectedPet.age === 1 ? 'year' : 'years'} old</span>
                      </div>
                      
                      <div style={{ 
                        background: '#f5f5f5',
                        borderRadius: '20px',
                        padding: '5px 10px',
                        fontSize: '0.9rem',
                        color: '#666',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        textTransform: 'capitalize'
                      }}>
                        <span>{selectedPet.gender === 'male' ? '♂️' : '♀️'}</span>
                        <span>{selectedPet.gender}</span>
                      </div>
                      
                      <div style={{ 
                        background: '#f5f5f5',
                        borderRadius: '20px',
                        padding: '5px 10px',
                        fontSize: '0.9rem',
                        color: '#666',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        textTransform: 'capitalize'
                      }}>
                        <span>📏</span>
                        <span>{selectedPet.size} size</span>
                      </div>
                      
                      <div style={{ 
                        background: '#f5f5f5',
                        borderRadius: '20px',
                        padding: '5px 10px',
                        fontSize: '0.9rem',
                        color: '#666',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}>
                        <span>📍</span>
                        <span>{selectedPet.location}</span>
                      </div>
                    </div>
                    
                    <p style={{ margin: '0', color: '#555' }}>
                      {selectedPet.description}
                    </p>
                  </div>
                  
                  {/* Details Sections */}
                  <div style={{ padding: '20px' }}>
                    {/* Medical Info */}
                    <div style={{ marginBottom: '20px' }}>
                      <h3 style={{ margin: '0 0 10px 0', color: '#880e4f' }}>
                        Medical Information
                      </h3>
                      <p style={{ margin: 0, color: '#666' }}>
                        {selectedPet.medicalInfo}
                      </p>
                    </div>
                    
                    {/* Good With */}
                    <div style={{ marginBottom: '20px' }}>
                      <h3 style={{ margin: '0 0 10px 0', color: '#880e4f' }}>
                        Good With
                      </h3>
                      <div style={{ 
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '10px'
                      }}>
                        {selectedPet.goodWith.map((item) => (
                          <div 
                            key={item}
                            style={{
                              background: '#fce4ec',
                              borderRadius: '20px',
                              padding: '5px 10px',
                              fontSize: '0.9rem',
                              color: '#880e4f',
                              textTransform: 'capitalize'
                            }}
                          >
                            {item === 'children' ? '👶 Children' : 
                             item === 'dogs' ? '🐕 Dogs' : 
                             item === 'cats' ? '🐈 Cats' : 
                             item === 'seniors' ? '👵 Seniors' : 
                             item === 'adults' ? '👨 Adults' : item}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Activity Level */}
                    <div style={{ marginBottom: '20px' }}>
                      <h3 style={{ margin: '0 0 10px 0', color: '#880e4f' }}>
                        Activity Level
                      </h3>
                      <div style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                      }}>
                        <div style={{ 
                          width: '200px',
                          height: '8px',
                          background: '#eee',
                          borderRadius: '4px',
                          overflow: 'hidden'
                        }}>
                          <div style={{ 
                            height: '100%',
                            width: selectedPet.activityLevel === 'low' ? '25%' : 
                                  selectedPet.activityLevel === 'medium' ? '50%' : 
                                  selectedPet.activityLevel === 'high' ? '75%' : '100%',
                            background: '#880e4f'
                          }} />
                        </div>
                        <div style={{ 
                          fontWeight: 'bold',
                          color: '#880e4f',
                          textTransform: 'capitalize'
                        }}>
                          {selectedPet.activityLevel}
                        </div>
                      </div>
                    </div>
                    
                    {/* Special Needs */}
                    {selectedPet.specialNeeds && (
                      <div style={{ marginBottom: '20px' }}>
                        <h3 style={{ margin: '0 0 10px 0', color: '#880e4f' }}>
                          Special Needs
                        </h3>
                        <p style={{ margin: 0, color: '#666' }}>
                          {selectedPet.specialNeedsDetails}
                        </p>
                      </div>
                    )}
                    
                    {/* Pet's Story */}
                    <div style={{ marginBottom: '20px' }}>
                      <h3 style={{ margin: '0 0 10px 0', color: '#880e4f' }}>
                        {selectedPet.name}&apos;s Story
                      </h3>
                      <p style={{ margin: 0, color: '#666' }}>
                        {selectedPet.story}
                      </p>
                    </div>
                    
                    {/* Shelter Info */}
                    <div style={{ marginBottom: '20px' }}>
                      <h3 style={{ margin: '0 0 10px 0', color: '#880e4f' }}>
                        Shelter Information
                      </h3>
                      <p style={{ margin: '0 0 5px 0', color: '#666' }}>
                        <strong>Name:</strong> {selectedPet.shelterName}
                      </p>
                      <p style={{ margin: '0 0 5px 0', color: '#666' }}>
                        <strong>Email:</strong> {selectedPet.shelterContact}
                      </p>
                      <p style={{ margin: '0', color: '#666' }}>
                        <strong>Phone:</strong> {selectedPet.shelterPhone}
                      </p>
                    </div>
                    
                    {/* Adoption Button */}
                    <div style={{ 
                      display: 'flex',
                      justifyContent: 'center',
                      marginTop: '20px'
                    }}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setSelectedPet(null);
                          setShowApplicationForm(true);
                        }}
                        style={{
                          padding: '12px 30px',
                          borderRadius: '30px',
                          border: 'none',
                          background: '#880e4f',
                          color: 'white',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          fontSize: '1.1rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px'
                        }}
                      >
                        <span>Start Adoption Process</span>
                        <span>❤️</span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Application Form Modal */}
      <AnimatePresence>
        {showApplicationForm && (
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
            onClick={() => !applicationSubmitted && setShowApplicationForm(false)}
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
                maxWidth: '600px',
                maxHeight: '90vh',
                overflow: 'auto',
                padding: '30px',
                position: 'relative'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {applicationSubmitted ? (
                <div style={{ textAlign: 'center' }}>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      background: '#4caf50',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      margin: '0 auto 20px',
                      color: 'white',
                      fontSize: '2rem'
                    }}
                  >
                    ✓
                  </motion.div>
                  
                  <h2 style={{ color: '#4caf50', margin: '0 0 10px 0' }}>
                    Application Submitted!
                  </h2>
                  
                  <p style={{ margin: '0 0 20px 0', color: '#666' }}>
                    Thank you for your interest in adoption. The shelter will review your application and contact you soon.
                  </p>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setShowApplicationForm(false);
                      setApplicationSubmitted(false);
                    }}
                    style={{
                      padding: '10px 20px',
                      borderRadius: '30px',
                      border: 'none',
                      background: '#880e4f',
                      color: 'white',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    Close
                  </motion.button>
                </div>
              ) : (
                <>
                  {/* Close button */}
                  <button
                    onClick={() => setShowApplicationForm(false)}
                    style={{
                      position: 'absolute',
                      top: '15px',
                      right: '15px',
                      background: 'none',
                      color: '#888',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '1.2rem'
                    }}
                  >
                    ✕
                  </button>
                  
                  <h2 style={{ margin: '0 0 20px 0', color: '#880e4f', textAlign: 'center' }}>
                    Adoption Application
                  </h2>
                  
                  <p style={{ margin: '0 0 20px 0', color: '#666', textAlign: 'center' }}>
                    Please fill out this form to begin the adoption process. The shelter will review your application and contact you.
                  </p>
                  
                  <form onSubmit={handleSubmit}>
                    {/* Personal Information */}
                    <h3 style={{ margin: '0 0 15px 0', color: '#880e4f' }}>
                      Personal Information
                    </h3>
                    
                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#666' }}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={applicationData.name}
                        onChange={handleInputChange}
                        required
                        style={{
                          width: '100%',
                          padding: '10px',
                          borderRadius: '8px',
                          border: '2px solid #fce4ec',
                          fontSize: '1rem'
                        }}
                      />
                    </div>
                    
                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#666' }}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={applicationData.email}
                        onChange={handleInputChange}
                        required
                        style={{
                          width: '100%',
                          padding: '10px',
                          borderRadius: '8px',
                          border: '2px solid #fce4ec',
                          fontSize: '1rem'
                        }}
                      />
                    </div>
                    
                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#666' }}>
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={applicationData.phone}
                        onChange={handleInputChange}
                        required
                        style={{
                          width: '100%',
                          padding: '10px',
                          borderRadius: '8px',
                          border: '2px solid #fce4ec',
                          fontSize: '1rem'
                        }}
                      />
                    </div>
                    
                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#666' }}>
                        Home Address *
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={applicationData.address}
                        onChange={handleInputChange}
                        required
                        style={{
                          width: '100%',
                          padding: '10px',
                          borderRadius: '8px',
                          border: '2px solid #fce4ec',
                          fontSize: '1rem'
                        }}
                      />
                    </div>
                    
                    {/* Home Environment */}
                    <h3 style={{ margin: '20px 0 15px 0', color: '#880e4f' }}>
                      Home Environment
                    </h3>
                    
                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#666' }}>
                        Type of Home *
                      </label>
                      <select
                        name="homeType"
                        value={applicationData.homeType}
                        onChange={handleInputChange}
                        required
                        style={{
                          width: '100%',
                          padding: '10px',
                          borderRadius: '8px',
                          border: '2px solid #fce4ec',
                          fontSize: '1rem'
                        }}
                      >
                        <option value="house">House</option>
                        <option value="apartment">Apartment</option>
                        <option value="condo">Condo</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#666' }}>
                        Do you have a yard? *
                      </label>
                      <select
                        name="hasYard"
                        value={applicationData.hasYard}
                        onChange={handleInputChange}
                        required
                        style={{
                          width: '100%',
                          padding: '10px',
                          borderRadius: '8px',
                          border: '2px solid #fce4ec',
                          fontSize: '1rem'
                        }}
                      >
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                    
                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#666' }}>
                        Do you have other pets? If yes, please describe.
                      </label>
                      <textarea
                        name="otherPets"
                        value={applicationData.otherPets}
                        onChange={handleInputChange}
                        style={{
                          width: '100%',
                          padding: '10px',
                          borderRadius: '8px',
                          border: '2px solid #fce4ec',
                          fontSize: '1rem',
                          minHeight: '80px',
                          resize: 'vertical'
                        }}
                      />
                    </div>
                    
                    {/* Experience & Motivation */}
                    <h3 style={{ margin: '20px 0 15px 0', color: '#880e4f' }}>
                      Experience & Motivation
                    </h3>
                    
                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#666' }}>
                        Previous Pet Experience *
                      </label>
                      <textarea
                        name="experience"
                        value={applicationData.experience}
                        onChange={handleInputChange}
                        required
                        style={{
                          width: '100%',
                          padding: '10px',
                          borderRadius: '8px',
                          border: '2px solid #fce4ec',
                          fontSize: '1rem',
                          minHeight: '80px',
                          resize: 'vertical'
                        }}
                        placeholder="Please describe your experience with pets."
                      />
                    </div>
                    
                    <div style={{ marginBottom: '25px' }}>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#666' }}>
                        Why do you want to adopt this pet? *
                      </label>
                      <textarea
                        name="reason"
                        value={applicationData.reason}
                        onChange={handleInputChange}
                        required
                        style={{
                          width: '100%',
                          padding: '10px',
                          borderRadius: '8px',
                          border: '2px solid #fce4ec',
                          fontSize: '1rem',
                          minHeight: '100px',
                          resize: 'vertical'
                        }}
                        placeholder="Please tell us why you're interested in adopting this pet and what kind of home you can provide."
                      />
                    </div>
                    
                    {/* Submit Button */}
                    <div style={{ textAlign: 'center' }}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        style={{
                          padding: '12px 30px',
                          borderRadius: '30px',
                          border: 'none',
                          background: '#880e4f',
                          color: 'white',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          fontSize: '1.1rem'
                        }}
                      >
                        Submit Application
                      </motion.button>
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Adoption;