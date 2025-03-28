import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import UsersDropdown from "./UsersDropdown";
import InteractiveNavMenu from "../components/InteractiveNavMenu";
import ParallaxBackground from "../components/ParallaxBackground";
import AnimatedPetMascot from "../components/AnimatedPetMascot";

const EntityList = () => {
  const [entities, setEntities] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEntities();
  }, []);

  // Fetch all entities initially
  const fetchEntities = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/entities");
      setEntities(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch entities based on selected user
  const fetchEntitiesByUser = async (userId) => {
    if (!userId) {
      fetchEntities(); // Load all entities if no user is selected
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/entities/${userId}`);
      setEntities(response.data);
    } catch (error) {
      console.error("Error fetching user-specific entities:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete an entity
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/entities/${id}`);
      setEntities(entities.filter((entity) => entity._id !== id));
      setDeleteConfirm(null);
    } catch (error) {
      console.error("Error deleting entity:", error);
    }
  };

  // Generate a random pet emoji
  const getPetEmoji = () => {
    const petEmojis = ["🐶", "🐱", "🐰", "🐹", "🦊", "🐻", "🐨", "🐯", "🦁", "🐮", "🐷", "🐸", "🐵", "🐔", "🐧", "🦄"];
    return petEmojis[Math.floor(Math.random() * petEmojis.length)];
  };

  // Generate a random background color
  const getRandomColor = () => {
    const colors = [
      "linear-gradient(135deg, #ff9a9e, #fad0c4)",
      "linear-gradient(135deg, #a1c4fd, #c2e9fb)",
      "linear-gradient(135deg, #ffecd2, #fcb69f)",
      "linear-gradient(135deg, #d4fc79, #96e6a1)",
      "linear-gradient(135deg, #84fab0, #8fd3f4)",
      "linear-gradient(135deg, #f6d365, #fda085)",
      "linear-gradient(135deg, #fbc2eb, #a6c1ee)",
      "linear-gradient(135deg, #fdcbf1, #e6dee9)"
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      {/* Background */}
      <ParallaxBackground colorScheme="blue" />
      
      {/* Navigation */}
      <div style={{ padding: '20px 40px' }}>
        <InteractiveNavMenu colorScheme="blue" />
      </div>
      
      {/* Pet Mascot */}
      <AnimatedPetMascot 
        petType="cat" 
        colorScheme="blue"
        position="bottom-left"
        message="Here are all your wonderful pets!"
      />
      
      {/* Main Content */}
      <div style={{ 
        padding: "30px 20px", 
        maxWidth: "1200px", 
        margin: "0 auto",
        position: "relative",
        zIndex: 1
      }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center",
            flexWrap: "wrap",
            marginBottom: "30px"
          }}>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ 
                color: "white",
                fontSize: "2.5rem",
                margin: 0,
                textShadow: "0 2px 10px rgba(0,0,0,0.3)"
              }}
            >
              My Pets Collection
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link to="/add-entity">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: "12px 24px",
                    background: "linear-gradient(135deg, #1976d2, #64b5f6)",
                    color: "white",
                    border: "none",
                    borderRadius: "30px",
                    fontSize: "1rem",
                    fontWeight: "bold",
                    cursor: "pointer",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  }}
                >
                  <span style={{ fontSize: "1.2rem" }}>➕</span> Add New Pet
                </motion.button>
              </Link>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            style={{
              background: "rgba(255, 255, 255, 0.9)",
              borderRadius: "15px",
              padding: "20px",
              marginBottom: "30px",
              boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)"
            }}
          >
            <div style={{ 
              display: "flex", 
              alignItems: "center",
              gap: "15px",
              flexWrap: "wrap"
            }}>
              <div style={{ fontWeight: "bold", color: "#1976d2" }}>
                Select User:
              </div>
              <div style={{ flex: 1, maxWidth: "300px" }}>
                <UsersDropdown 
                  onSelectUser={(userId) => {
                    setSelectedUser(userId);
                    fetchEntitiesByUser(userId);
                  }} 
                />
              </div>
              <div style={{ color: "#666", fontSize: "0.9rem" }}>
                {selectedUser ? "Showing pets for selected user" : "Showing all pets"}
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Loading State */}
        {isLoading ? (
          <div style={{ 
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "200px"
          }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                border: "5px solid rgba(255, 255, 255, 0.1)",
                borderTopColor: "white",
                marginRight: "15px"
              }}
            />
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ 
                color: "white",
                fontSize: "1.2rem",
                fontWeight: "bold"
              }}
            >
              Fetching your pets...
            </motion.p>
          </div>
        ) : (
          <>
            {entities.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                style={{
                  background: "rgba(255, 255, 255, 0.9)",
                  borderRadius: "15px",
                  padding: "40px 20px",
                  textAlign: "center",
                  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)"
                }}
              >
                <div style={{ fontSize: "4rem", marginBottom: "20px" }}>
                  🐾
                </div>
                <h2 style={{ color: "#1976d2", marginBottom: "15px" }}>
                  No Pets Found
                </h2>
                <p style={{ color: "#666", maxWidth: "500px", margin: "0 auto 20px" }}>
                  You don&apos;t have any pets yet. Add your first pet to start building your collection!
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/add-entity")}
                  style={{
                    padding: "12px 24px",
                    background: "linear-gradient(135deg, #1976d2, #64b5f6)",
                    color: "white",
                    border: "none",
                    borderRadius: "30px",
                    fontSize: "1rem",
                    fontWeight: "bold",
                    cursor: "pointer",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)"
                  }}
                >
                  Add Your First Pet
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                  gap: "20px"
                }}
              >
                <AnimatePresence>
                  {entities.map((entity, index) => {
                    // Generate consistent pet emoji and color based on entity name
                    const petEmoji = getPetEmoji();
                    const bgColor = getRandomColor();
                    
                    return (
                      <motion.div
                        key={entity._id || index}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        style={{
                          background: "white",
                          borderRadius: "15px",
                          overflow: "hidden",
                          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)"
                        }}
                      >
                        <div style={{ 
                          background: bgColor,
                          padding: "30px 20px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center"
                        }}>
                          <div style={{ 
                            width: "80px",
                            height: "80px",
                            borderRadius: "50%",
                            background: "rgba(255, 255, 255, 0.8)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "3rem",
                            marginBottom: "15px",
                            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)"
                          }}>
                            {petEmoji}
                          </div>
                          <h2 style={{ 
                            margin: "0 0 5px 0",
                            color: "white",
                            textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                            fontSize: "1.5rem"
                          }}>
                            {entity.name}
                          </h2>
                          <p style={{ 
                            margin: 0,
                            color: "rgba(255, 255, 255, 0.9)",
                            textAlign: "center"
                          }}>
                            {entity.description || entity.email || "No description available"}
                          </p>
                        </div>
                        
                        <div style={{ padding: "15px 20px" }}>
                          <div style={{ 
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "15px"
                          }}>
                            <div style={{ color: "#666", fontSize: "0.9rem" }}>
                              <strong>ID:</strong> {entity._id || `temp-${index}`}
                            </div>
                            <div style={{ color: "#666", fontSize: "0.9rem" }}>
                              <strong>User:</strong> {entity.userId || selectedUser || "Unknown"}
                            </div>
                          </div>
                          
                          <div style={{ 
                            display: "flex",
                            justifyContent: "space-between",
                            gap: "10px"
                          }}>
                            <Link to={`/update-entity/${entity._id}`} style={{ flex: 1 }}>
                              <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                style={{
                                  width: "100%",
                                  padding: "10px",
                                  background: "#f0f0f0",
                                  color: "#333",
                                  border: "none",
                                  borderRadius: "8px",
                                  cursor: "pointer",
                                  fontWeight: "bold",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  gap: "5px"
                                }}
                              >
                                <span>✏️</span> Edit
                              </motion.button>
                            </Link>
                            
                            <motion.button
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              onClick={() => setDeleteConfirm(entity._id || `temp-${index}`)}
                              style={{
                                flex: 1,
                                padding: "10px",
                                background: "#ffebee",
                                color: "#d32f2f",
                                border: "none",
                                borderRadius: "8px",
                                cursor: "pointer",
                                fontWeight: "bold",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "5px"
                              }}
                            >
                              <span>🗑️</span> Delete
                            </motion.button>
                          </div>
                        </div>
                        
                        {/* Delete Confirmation */}
                        <AnimatePresence>
                          {deleteConfirm === (entity._id || `temp-${index}`) && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              style={{
                                background: "#ffebee",
                                padding: "15px 20px",
                                borderTop: "1px solid #ffcdd2"
                              }}
                            >
                              <p style={{ 
                                margin: "0 0 15px 0",
                                color: "#d32f2f",
                                fontWeight: "bold",
                                textAlign: "center"
                              }}>
                                Are you sure you want to delete this pet?
                              </p>
                              <div style={{ 
                                display: "flex",
                                gap: "10px"
                              }}>
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => handleDelete(entity._id)}
                                  style={{
                                    flex: 1,
                                    padding: "8px",
                                    background: "#d32f2f",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                    fontWeight: "bold"
                                  }}
                                >
                                  Yes, Delete
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => setDeleteConfirm(null)}
                                  style={{
                                    flex: 1,
                                    padding: "8px",
                                    background: "#f5f5f5",
                                    color: "#333",
                                    border: "none",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                    fontWeight: "bold"
                                  }}
                                >
                                  Cancel
                                </motion.button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EntityList;