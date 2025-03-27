import { useState } from "react";
import { motion } from "framer-motion";
import ParallaxBackground from "../components/ParallaxBackground";
import AnimatedPetMascot from "../components/AnimatedPetMascot";
import InteractiveNavMenu from "../components/InteractiveNavMenu";

// Personality trait options
const personalityTraits = [
  { id: 1, name: "Adventurous", emoji: "🧗" },
  { id: 2, name: "Calm", emoji: "😌" },
  { id: 3, name: "Creative", emoji: "🎨" },
  { id: 4, name: "Curious", emoji: "🔍" },
  { id: 5, name: "Energetic", emoji: "⚡" },
  { id: 6, name: "Friendly", emoji: "🤝" },
  { id: 7, name: "Funny", emoji: "😂" },
  { id: 8, name: "Intelligent", emoji: "🧠" },
  { id: 9, name: "Loyal", emoji: "🛡️" },
  { id: 10, name: "Mysterious", emoji: "🔮" },
  { id: 11, name: "Outgoing", emoji: "🎭" },
  { id: 12, name: "Playful", emoji: "🎮" },
  { id: 13, name: "Relaxed", emoji: "🧘" },
  { id: 14, name: "Sensitive", emoji: "💗" },
  { id: 15, name: "Shy", emoji: "🙈" },
];

// Pet species options
const petSpecies = [
  { type: "Dog", emoji: "🐕", variants: ["Labrador", "Poodle", "Husky", "Corgi", "Dalmatian", "Beagle", "Golden Retriever"] },
  { type: "Cat", emoji: "🐈", variants: ["Siamese", "Persian", "Maine Coon", "Bengal", "Ragdoll", "Sphynx", "Scottish Fold"] },
  { type: "Rabbit", emoji: "🐇", variants: ["Holland Lop", "Netherland Dwarf", "Rex", "Angora", "Flemish Giant", "Lionhead"] },
  { type: "Bird", emoji: "🦜", variants: ["Parrot", "Canary", "Finch", "Cockatiel", "Lovebird", "Budgie", "Macaw"] },
  { type: "Hamster", emoji: "🐹", variants: ["Syrian", "Dwarf", "Roborovski", "Chinese", "Winter White", "Campbell's"] },
  { type: "Fish", emoji: "🐠", variants: ["Betta", "Goldfish", "Guppy", "Angelfish", "Tetra", "Discus", "Molly"] },
  { type: "Turtle", emoji: "🐢", variants: ["Box", "Red-Eared Slider", "Painted", "Map", "Musk", "Softshell"] },
  { type: "Lizard", emoji: "🦎", variants: ["Gecko", "Chameleon", "Bearded Dragon", "Iguana", "Anole", "Skink"] },
  { type: "Mythical", emoji: "🦄", variants: ["Dragon", "Phoenix", "Unicorn", "Griffin", "Pegasus", "Chimera", "Kraken"] },
];

// Pet colors
const petColors = [
  "Golden", "Silver", "Bronze", "White", "Black", "Gray", "Brown", 
  "Red", "Orange", "Yellow", "Green", "Blue", "Purple", "Pink",
  "Spotted", "Striped", "Speckled", "Marbled", "Ombré", "Iridescent", "Rainbow"
];

// Pet special abilities
const petAbilities = [
  "Telepathy", "Invisibility", "Flight", "Super Speed", "Healing Touch", 
  "Time Manipulation", "Elemental Control", "Shape-Shifting", "Teleportation",
  "Dream Walking", "Empathy", "Illusion Creation", "Weather Control",
  "Bioluminescence", "Dimensional Travel", "Sonic Boom", "Photographic Memory"
];

// Pet hobbies
const petHobbies = [
  "Cloud Watching", "Stargazing", "Painting", "Dancing", "Singing", 
  "Puzzle Solving", "Treasure Hunting", "Gardening", "Cooking", 
  "Storytelling", "Collecting Shiny Objects", "Bubble Blowing",
  "Leaf Chasing", "Sandcastle Building", "Meditation", "Yoga"
];

const MysteryPetGenerator = () => {
  const [selectedTraits, setSelectedTraits] = useState([]);
  const [customTrait, setCustomTrait] = useState("");
  const [generatedPet, setGeneratedPet] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const colorScheme = "blue";

  // Handle trait selection
  const toggleTrait = (trait) => {
    if (selectedTraits.some(t => t.id === trait.id)) {
      setSelectedTraits(selectedTraits.filter(t => t.id !== trait.id));
    } else {
      if (selectedTraits.length < 5) {
        setSelectedTraits([...selectedTraits, trait]);
      }
    }
  };

  // Add custom trait
  const addCustomTrait = () => {
    if (customTrait.trim() && selectedTraits.length < 5) {
      const newTrait = {
        id: `custom-${Date.now()}`,
        name: customTrait.trim(),
        emoji: "✨",
      };
      setSelectedTraits([...selectedTraits, newTrait]);
      setCustomTrait("");
    }
  };

  // Generate a pet based on selected traits
  const generatePet = () => {
    if (selectedTraits.length === 0) return;

    setIsGenerating(true);
    
    // Simulate API call or complex generation
    setTimeout(() => {
      // Select species based on traits
      const speciesIndex = Math.floor(Math.random() * petSpecies.length);
      const species = petSpecies[speciesIndex];
      
      // Select variant
      const variantIndex = Math.floor(Math.random() * species.variants.length);
      const variant = species.variants[variantIndex];
      
      // Select color
      const colorIndex = Math.floor(Math.random() * petColors.length);
      const color = petColors[colorIndex];
      
      // Select abilities (1-3)
      const numAbilities = Math.floor(Math.random() * 3) + 1;
      const abilities = [];
      const usedAbilityIndices = new Set();
      
      for (let i = 0; i < numAbilities; i++) {
        let abilityIndex;
        do {
          abilityIndex = Math.floor(Math.random() * petAbilities.length);
        } while (usedAbilityIndices.has(abilityIndex));
        
        usedAbilityIndices.add(abilityIndex);
        abilities.push(petAbilities[abilityIndex]);
      }
      
      // Select hobbies (1-2)
      const numHobbies = Math.floor(Math.random() * 2) + 1;
      const hobbies = [];
      const usedHobbyIndices = new Set();
      
      for (let i = 0; i < numHobbies; i++) {
        let hobbyIndex;
        do {
          hobbyIndex = Math.floor(Math.random() * petHobbies.length);
        } while (usedHobbyIndices.has(hobbyIndex));
        
        usedHobbyIndices.add(hobbyIndex);
        hobbies.push(petHobbies[hobbyIndex]);
      }
      
      // Generate name based on traits and species
      const namePrefix = selectedTraits[Math.floor(Math.random() * selectedTraits.length)].name.substring(0, 3);
      const nameSuffix = variant.substring(0, 4);
      const name = `${namePrefix}${nameSuffix}`;
      
      // Create pet object
      const pet = {
        name,
        species: species.type,
        variant,
        color,
        emoji: species.emoji,
        abilities,
        hobbies,
        personalityTraits: selectedTraits.map(t => t.name),
      };
      
      setGeneratedPet(pet);
      setIsGenerating(false);
      setShowResults(true);
    }, 2000);
  };

  // Reset the form
  const resetForm = () => {
    setSelectedTraits([]);
    setCustomTrait("");
    setGeneratedPet(null);
    setShowResults(false);
  };

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <div style={{ overflowX: "hidden", minHeight: "100vh" }}>
      {/* Dynamic Background */}
      <ParallaxBackground colorScheme={colorScheme} />

      {/* Navigation Menu */}
      <div style={{ padding: "20px 40px" }}>
        <InteractiveNavMenu colorScheme={colorScheme} />
      </div>

      {/* Animated Pet Mascot */}
      <AnimatedPetMascot
        petType="rabbit"
        colorScheme={colorScheme}
        position="bottom-right"
        size="medium"
      />

      {/* Main Content */}
      <div style={{ padding: "40px 20px" }}>
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            textAlign: "center",
            color: "white",
            marginBottom: "40px",
          }}
        >
          <h1 style={{ 
            fontSize: "3rem", 
            marginBottom: "15px",
            textShadow: "0 2px 10px rgba(0,0,0,0.3)",
          }}>
            Mystery Pet Generator
          </h1>
          <p style={{ 
            fontSize: "1.2rem", 
            maxWidth: "800px", 
            margin: "0 auto",
            textShadow: "0 2px 5px rgba(0,0,0,0.2)",
          }}>
            Select up to 5 personality traits to generate your unique fictional pet companion!
          </p>
        </motion.div>

        {!showResults ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{
              background: "rgba(255, 255, 255, 0.9)",
              padding: "30px",
              borderRadius: "15px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
              maxWidth: "800px",
              margin: "0 auto",
              backdropFilter: "blur(10px)",
            }}
          >
            <motion.h2
              variants={itemVariants}
              style={{
                fontSize: "1.8rem",
                marginBottom: "20px",
                color: "#0d47a1",
                textAlign: "center",
              }}
            >
              Choose Your Personality Traits
            </motion.h2>

            <motion.div
              variants={itemVariants}
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                justifyContent: "center",
                marginBottom: "30px",
              }}
            >
              {personalityTraits.map((trait) => (
                <motion.button
                  key={trait.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleTrait(trait)}
                  style={{
                    padding: "10px 15px",
                    borderRadius: "50px",
                    border: "none",
                    backgroundColor: selectedTraits.some(t => t.id === trait.id)
                      ? "#1565c0"
                      : "#e3f2fd",
                    color: selectedTraits.some(t => t.id === trait.id)
                      ? "white"
                      : "#0d47a1",
                    cursor: "pointer",
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    boxShadow: selectedTraits.some(t => t.id === trait.id)
                      ? "0 4px 10px rgba(0,0,0,0.2)"
                      : "0 2px 5px rgba(0,0,0,0.1)",
                  }}
                >
                  <span>{trait.emoji}</span>
                  {trait.name}
                </motion.button>
              ))}
            </motion.div>

            <motion.div
              variants={itemVariants}
              style={{
                display: "flex",
                gap: "10px",
                marginBottom: "30px",
              }}
            >
              <input
                type="text"
                value={customTrait}
                onChange={(e) => setCustomTrait(e.target.value)}
                placeholder="Add your own trait..."
                style={{
                  flex: 1,
                  padding: "12px 15px",
                  borderRadius: "8px",
                  border: "2px solid #1565c0",
                  fontSize: "1rem",
                }}
              />
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#0d47a1" }}
                whileTap={{ scale: 0.95 }}
                onClick={addCustomTrait}
                disabled={selectedTraits.length >= 5 || !customTrait.trim()}
                style={{
                  padding: "12px 20px",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: selectedTraits.length >= 5 || !customTrait.trim()
                    ? "#90caf9"
                    : "#1565c0",
                  color: "white",
                  cursor: selectedTraits.length >= 5 || !customTrait.trim()
                    ? "not-allowed"
                    : "pointer",
                  fontWeight: "bold",
                }}
              >
                Add
              </motion.button>
            </motion.div>

            <motion.div
              variants={itemVariants}
              style={{
                marginBottom: "30px",
              }}
            >
              <h3 style={{ marginBottom: "10px", color: "#0d47a1" }}>
                Selected Traits ({selectedTraits.length}/5)
              </h3>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                {selectedTraits.map((trait) => (
                  <div
                    key={trait.id}
                    style={{
                      padding: "8px 15px",
                      borderRadius: "50px",
                      backgroundColor: "#1976d2",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <span>{trait.emoji}</span>
                    {trait.name}
                    <button
                      onClick={() => toggleTrait(trait)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "white",
                        cursor: "pointer",
                        marginLeft: "5px",
                        fontSize: "1.2rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
                {selectedTraits.length === 0 && (
                  <div
                    style={{
                      padding: "8px 15px",
                      borderRadius: "8px",
                      backgroundColor: "#e3f2fd",
                      color: "#0d47a1",
                      fontStyle: "italic",
                    }}
                  >
                    No traits selected yet
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "15px",
              }}
            >
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#0d47a1" }}
                whileTap={{ scale: 0.95 }}
                onClick={generatePet}
                disabled={selectedTraits.length === 0 || isGenerating}
                style={{
                  padding: "15px 30px",
                  borderRadius: "8px",
                  border: "none",
                  backgroundColor: selectedTraits.length === 0
                    ? "#90caf9"
                    : "#1565c0",
                  color: "white",
                  cursor: selectedTraits.length === 0 ? "not-allowed" : "pointer",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                {isGenerating ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      style={{
                        width: "20px",
                        height: "20px",
                        border: "3px solid rgba(255,255,255,0.3)",
                        borderTop: "3px solid white",
                        borderRadius: "50%",
                      }}
                    />
                    Generating...
                  </>
                ) : (
                  <>
                    <span>🔮</span>
                    Generate My Mystery Pet
                  </>
                )}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetForm}
                style={{
                  padding: "15px 20px",
                  borderRadius: "8px",
                  border: "2px solid #1565c0",
                  backgroundColor: "transparent",
                  color: "#1565c0",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Reset
              </motion.button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            style={{
              background: "rgba(255, 255, 255, 0.9)",
              padding: "30px",
              borderRadius: "15px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
              maxWidth: "800px",
              margin: "0 auto",
              backdropFilter: "blur(10px)",
            }}
          >
            <motion.h2
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              style={{
                fontSize: "2rem",
                marginBottom: "30px",
                color: "#0d47a1",
                textAlign: "center",
              }}
            >
              Your Mystery Pet Has Been Generated!
            </motion.h2>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "30px",
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: [0, 10, 0, -10, 0] }}
                transition={{ 
                  scale: { delay: 0.3, type: "spring", stiffness: 200, damping: 15 },
                  rotate: { delay: 0.8, duration: 1 }
                }}
                style={{
                  fontSize: "8rem",
                  filter: "drop-shadow(0 5px 15px rgba(0,0,0,0.3))",
                }}
              >
                {generatedPet?.emoji}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                style={{
                  textAlign: "center",
                  marginBottom: "20px",
                }}
              >
                <h3 style={{ 
                  fontSize: "2.5rem", 
                  color: "#0d47a1",
                  marginBottom: "5px",
                }}>
                  {generatedPet?.name}
                </h3>
                <p style={{ 
                  fontSize: "1.2rem", 
                  color: "#1976d2",
                  marginBottom: "20px",
                }}>
                  {generatedPet?.color} {generatedPet?.variant} {generatedPet?.species}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                style={{
                  backgroundColor: "#e3f2fd",
                  padding: "20px",
                  borderRadius: "10px",
                  width: "100%",
                }}
              >
                <h4 style={{ 
                  color: "#0d47a1", 
                  marginBottom: "10px",
                  fontSize: "1.2rem",
                }}>
                  Personality Traits
                </h4>
                <div style={{ 
                  display: "flex", 
                  flexWrap: "wrap", 
                  gap: "8px",
                  marginBottom: "15px",
                }}>
                  {generatedPet?.personalityTraits.map((trait, index) => (
                    <span
                      key={index}
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "#1976d2",
                        color: "white",
                        borderRadius: "20px",
                        fontSize: "0.9rem",
                      }}
                    >
                      {trait}
                    </span>
                  ))}
                </div>

                <h4 style={{ 
                  color: "#0d47a1", 
                  marginBottom: "10px",
                  fontSize: "1.2rem",
                }}>
                  Special Abilities
                </h4>
                <div style={{ 
                  display: "flex", 
                  flexWrap: "wrap", 
                  gap: "8px",
                  marginBottom: "15px",
                }}>
                  {generatedPet?.abilities.map((ability, index) => (
                    <span
                      key={index}
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "#1565c0",
                        color: "white",
                        borderRadius: "20px",
                        fontSize: "0.9rem",
                      }}
                    >
                      {ability}
                    </span>
                  ))}
                </div>

                <h4 style={{ 
                  color: "#0d47a1", 
                  marginBottom: "10px",
                  fontSize: "1.2rem",
                }}>
                  Favorite Hobbies
                </h4>
                <div style={{ 
                  display: "flex", 
                  flexWrap: "wrap", 
                  gap: "8px",
                }}>
                  {generatedPet?.hobbies.map((hobby, index) => (
                    <span
                      key={index}
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "#0d47a1",
                        color: "white",
                        borderRadius: "20px",
                        fontSize: "0.9rem",
                      }}
                    >
                      {hobby}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                style={{
                  marginTop: "20px",
                  display: "flex",
                  gap: "15px",
                }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetForm}
                  style={{
                    padding: "12px 25px",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "#1565c0",
                    color: "white",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                  }}
                >
                  Generate Another Pet
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: "12px 25px",
                    borderRadius: "8px",
                    border: "2px solid #1565c0",
                    backgroundColor: "transparent",
                    color: "#1565c0",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "1rem",
                  }}
                >
                  Save Pet
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MysteryPetGenerator;