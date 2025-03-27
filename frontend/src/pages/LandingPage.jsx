import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ParallaxBackground from "../components/ParallaxBackground";
import AnimatedPetMascot from "../components/AnimatedPetMascot";
import AnimatedCard from "../components/AnimatedCard";
import InteractiveNavMenu from "../components/InteractiveNavMenu";

// Sample featured content data
const featuredContent = [
  {
    id: 1,
    title: "Celebrity Pet Matchmaker",
    description: "Upload a selfie and describe your personality to find your perfect celebrity pet match!",
    image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1498&q=80",
    icon: "🌟",
    colorScheme: "teal",
    link: "/",
  },
  {
    id: 2,
    title: "Pet Fashion Studio",
    description: "Design and dress up pets with accessories and share them in our community gallery.",
    image: "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80",
    icon: "👔",
    colorScheme: "purple",
    link: "/pet-fashion",
  },
  {
    id: 3,
    title: "Mystery Pet Generator",
    description: "Input random personality traits and generate a fictional pet based on your personality.",
    image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1335&q=80",
    icon: "🔮",
    colorScheme: "blue",
    link: "/mystery-pet",
  },
  {
    id: 4,
    title: "Pet Name Lab",
    description: "Our AI suggests unique pet names based on your preferences and personality.",
    image: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-4.0.3&auto=format&fit=crop&w=1287&q=80",
    icon: "🏷️",
    colorScheme: "pink",
    link: "/pet-name-lab",
  },
  {
    id: 5,
    title: "Adoption Stories",
    description: "Read heartwarming tales of pet adoption from our community of animal lovers.",
    image: "https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1288&q=80",
    icon: "📖",
    colorScheme: "green",
    link: "/adoption-stories",
  },
  {
    id: 6,
    title: "Pet Training Simulator",
    description: "Play our mini-game to train your virtual pet with commands and tricks.",
    image: "https://images.unsplash.com/photo-1534361960057-19889db9621e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    icon: "🦮",
    colorScheme: "orange",
    link: "/pet-training",
  },
  {
    id: 7,
    title: "Interactive Pet Map",
    description: "Find adoption centers, pet-friendly parks, and vet clinics near you.",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    icon: "🗺️",
    colorScheme: "teal",
    link: "/pet-map",
  },
];

const LandingPage = () => {
  const [image, setImage] = useState(null);
  const [traits, setTraits] = useState("");
  const [activeColorScheme] = useState("teal");

  // Handle scroll for dynamic effects (removed unused scrollY state)
  // We're keeping the scroll listener for future enhancements
  useEffect(() => {
    const handleScroll = () => {
      // This function will be used in the future to add scroll-based effects
      // Example: Change colors or animations based on scroll position
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log("Uploaded Image:", image);
    console.log("Personality Traits:", traits);
    alert("Matchmaking in progress... 🚀");
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
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
    <div style={{ overflowX: "hidden" }}>
      {/* Dynamic Background */}
      <ParallaxBackground colorScheme={activeColorScheme} />

      {/* Navigation Menu */}
      <div style={{ padding: "20px 40px" }}>
        <InteractiveNavMenu colorScheme={activeColorScheme} />
      </div>

      {/* Animated Pet Mascot */}
      <AnimatedPetMascot
        petType="dog"
        colorScheme={activeColorScheme}
        position="bottom-right"
        size="medium"
      />

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          padding: "40px 20px",
          textAlign: "center",
          position: "relative",
        }}
      >
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{
            fontSize: "3.5rem",
            fontWeight: "bold",
            marginBottom: "20px",
            color: "white",
            textShadow: "0 2px 10px rgba(0,0,0,0.3)",
          }}
        >
          Celebrity Pet Matchmaker
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          style={{
            fontSize: "1.5rem",
            maxWidth: "800px",
            marginBottom: "40px",
            color: "white",
            textShadow: "0 2px 5px rgba(0,0,0,0.2)",
          }}
        >
          Find your perfect celebrity pet match based on your personality and appearance!
        </motion.p>

        {/* Matchmaker Form */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            background: "rgba(255, 255, 255, 0.9)",
            padding: "30px",
            borderRadius: "15px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            width: "100%",
            maxWidth: "600px",
            backdropFilter: "blur(10px)",
          }}
        >
          <motion.h2
            variants={itemVariants}
            style={{
              fontSize: "1.8rem",
              marginBottom: "20px",
              color: "#006064",
            }}
          >
            Start Your Pet Match Journey
          </motion.h2>

          <motion.div variants={itemVariants}>
            <label
              style={{
                display: "inline-block",
                padding: "12px 20px",
                backgroundColor: "#00838f",
                color: "white",
                borderRadius: "8px",
                cursor: "pointer",
                marginBottom: "15px",
                fontWeight: "bold",
                transition: "all 0.3s ease",
              }}
            >
              Upload Your Selfie
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
            </label>
          </motion.div>

          {image && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              style={{ marginBottom: "20px" }}
            >
              <img
                src={image}
                alt="Preview"
                style={{
                  width: "180px",
                  height: "180px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "4px solid #00838f",
                  boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
                }}
              />
            </motion.div>
          )}

          <motion.div variants={itemVariants} style={{ marginBottom: "20px" }}>
            <textarea
              placeholder="Describe your personality traits..."
              value={traits}
              onChange={(e) => setTraits(e.target.value)}
              style={{
                width: "100%",
                height: "120px",
                padding: "15px",
                borderRadius: "8px",
                border: "2px solid #00838f",
                backgroundColor: "#f5f5f5",
                color: "#004d40",
                resize: "none",
                fontSize: "1rem",
                fontFamily: "inherit",
              }}
            />
          </motion.div>

          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.05, backgroundColor: "#005662" }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            style={{
              padding: "15px 25px",
              backgroundColor: "#006064",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "1.1rem",
              fontWeight: "bold",
              cursor: "pointer",
              width: "100%",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            }}
          >
            Find My Celebrity Pet Match
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Featured Content Section */}
      <div
        style={{
          padding: "60px 20px",
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(10px)",
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            fontSize: "2.5rem",
            textAlign: "center",
            marginBottom: "40px",
            color: "#006064",
          }}
        >
          Explore Our Features
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "20px",
            maxWidth: "1400px",
            margin: "0 auto",
          }}
        >
          {featuredContent.map((item, index) => (
            <AnimatedCard
              key={item.id}
              title={item.title}
              description={item.description}
              image={item.image}
              icon={item.icon}
              colorScheme={item.colorScheme}
              link={item.link}
              delay={index * 0.1}
            />
          ))}
        </motion.div>
      </div>

      {/* Call to Action Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        style={{
          padding: "80px 20px",
          textAlign: "center",
          color: "white",
          position: "relative",
        }}
      >
        <motion.h2
          animate={{
            y: [0, -10, 0],
            transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          }}
          style={{
            fontSize: "2.8rem",
            marginBottom: "20px",
            textShadow: "0 2px 10px rgba(0,0,0,0.3)",
          }}
        >
          Ready to Find Your Perfect Pet Match?
        </motion.h2>
        <motion.p
          style={{
            fontSize: "1.3rem",
            maxWidth: "800px",
            margin: "0 auto 30px",
            textShadow: "0 2px 5px rgba(0,0,0,0.2)",
          }}
        >
          Join thousands of happy pet owners who found their perfect companion through our matchmaking service.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.1, boxShadow: "0 8px 20px rgba(0,0,0,0.3)" }}
          whileTap={{ scale: 0.95 }}
          style={{
            padding: "15px 30px",
            fontSize: "1.2rem",
            backgroundColor: "white",
            color: "#006064",
            border: "none",
            borderRadius: "50px",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
          }}
        >
          Get Started Now
        </motion.button>
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        style={{
          padding: "30px 20px",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          color: "white",
          textAlign: "center",
          backdropFilter: "blur(10px)",
        }}
      >
        <p>© 2025 Celebrity Pet Matchmaker. All rights reserved.</p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginTop: "15px",
          }}
        >
          <a href="#" style={{ color: "white", textDecoration: "none" }}>
            Privacy Policy
          </a>
          <a href="#" style={{ color: "white", textDecoration: "none" }}>
            Terms of Service
          </a>
          <a href="#" style={{ color: "white", textDecoration: "none" }}>
            Contact Us
          </a>
        </div>
      </motion.footer>
    </div>
  );
};

export default LandingPage;