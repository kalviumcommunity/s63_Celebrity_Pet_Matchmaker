import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import UsersDropdown from "./UsersDropdown";
import InteractiveNavMenu from "../components/InteractiveNavMenu";
import ParallaxBackground from "../components/ParallaxBackground";
import AnimatedPetMascot from "../components/AnimatedPetMascot";

function AddEntity() {
  const [formData, setFormData] = useState({ name: "", email: "", type: "dog", color: "", age: "" });
  const [submittedData, setSubmittedData] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  // Pet types with emojis
  const petTypes = [
    { value: "dog", label: "Dog", emoji: "🐶" },
    { value: "cat", label: "Cat", emoji: "🐱" },
    { value: "rabbit", label: "Rabbit", emoji: "🐰" },
    { value: "hamster", label: "Hamster", emoji: "🐹" },
    { value: "bird", label: "Bird", emoji: "🐦" },
    { value: "fish", label: "Fish", emoji: "🐠" },
    { value: "turtle", label: "Turtle", emoji: "🐢" },
    { value: "other", label: "Other", emoji: "🦄" }
  ];

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // Handle User Selection
  const handleUserSelect = (userId) => {
    setSelectedUser(userId);
    if (errors.user) {
      setErrors({ ...errors, user: "" });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Pet name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!selectedUser) {
      newErrors.user = "Please select a user";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      // Store data with selected user
      const newPet = { ...formData, userId: selectedUser, id: Date.now() };
      setSubmittedData([...submittedData, newPet]);
      
      // Reset form
      setFormData({ name: "", email: "", type: "dog", color: "", age: "" });
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }, 1000);
  };

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      {/* Background */}
      <ParallaxBackground colorScheme="green" />
      
      {/* Navigation */}
      <div style={{ padding: '20px 40px' }}>
        <InteractiveNavMenu colorScheme="green" />
      </div>
      
      {/* Pet Mascot */}
      <AnimatedPetMascot 
        petType="dog" 
        colorScheme="green"
        position="bottom-left"
        message="Add a new pet to your collection!"
      />
      
      {/* Main Content */}
      <div style={{ 
        padding: "30px 20px", 
        maxWidth: "800px", 
        margin: "0 auto",
        position: "relative",
        zIndex: 1
      }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ 
              color: "white",
              fontSize: "2.5rem",
              margin: "0 0 20px 0",
              textAlign: "center",
              textShadow: "0 2px 10px rgba(0,0,0,0.3)"
            }}
          >
            Add a New Pet
          </motion.h1>
        </motion.div>
        
        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            background: "rgba(255, 255, 255, 0.9)",
            borderRadius: "15px",
            padding: "30px",
            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
            marginBottom: "30px"
          }}
        >
          {/* Success Message */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                style={{
                  background: "rgba(76, 175, 80, 0.1)",
                  border: "1px solid #4caf50",
                  borderRadius: "8px",
                  padding: "15px",
                  marginBottom: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                }}
              >
                <span style={{ fontSize: "1.5rem" }}>✅</span>
                <div>
                  <p style={{ 
                    margin: 0,
                    color: "#2e7d32",
                    fontWeight: "bold"
                  }}>
                    Pet added successfully!
                  </p>
                  <p style={{ 
                    margin: "5px 0 0 0",
                    color: "#388e3c",
                    fontSize: "0.9rem"
                  }}>
                    Your new pet has been added to your collection.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <form onSubmit={handleSubmit}>
            {/* User Selection */}
            <div style={{ marginBottom: "25px" }}>
              <label 
                style={{ 
                  display: "block", 
                  marginBottom: "8px", 
                  fontWeight: "bold",
                  color: "#2e7d32"
                }}
              >
                Select User:
              </label>
              <UsersDropdown onSelectUser={handleUserSelect} />
              {errors.user && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ 
                    color: "#d32f2f", 
                    margin: "5px 0 0 0",
                    fontSize: "0.9rem"
                  }}
                >
                  {errors.user}
                </motion.p>
              )}
            </div>
            
            {/* Pet Type Selection */}
            <div style={{ marginBottom: "25px" }}>
              <label 
                style={{ 
                  display: "block", 
                  marginBottom: "8px", 
                  fontWeight: "bold",
                  color: "#2e7d32"
                }}
              >
                Pet Type:
              </label>
              <div style={{ 
                display: "flex",
                flexWrap: "wrap",
                gap: "10px"
              }}>
                {petTypes.map((type) => (
                  <motion.div
                    key={type.value}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFormData({ ...formData, type: type.value })}
                    style={{
                      padding: "10px 15px",
                      borderRadius: "30px",
                      border: `2px solid ${formData.type === type.value ? "#2e7d32" : "#e0e0e0"}`,
                      background: formData.type === type.value ? "rgba(46, 125, 50, 0.1)" : "white",
                      color: formData.type === type.value ? "#2e7d32" : "#666",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      fontWeight: formData.type === type.value ? "bold" : "normal"
                    }}
                  >
                    <span style={{ fontSize: "1.2rem" }}>{type.emoji}</span>
                    {type.label}
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Pet Name */}
            <div style={{ marginBottom: "25px" }}>
              <label 
                htmlFor="name" 
                style={{ 
                  display: "block", 
                  marginBottom: "8px", 
                  fontWeight: "bold",
                  color: "#2e7d32"
                }}
              >
                Pet Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your pet's name"
                style={{
                  width: "100%",
                  padding: "12px 15px",
                  borderRadius: "8px",
                  border: errors.name ? "2px solid #d32f2f" : "2px solid #e0e0e0",
                  fontSize: "1rem",
                  outline: "none",
                  transition: "all 0.3s ease",
                  boxSizing: "border-box"
                }}
                onFocus={(e) => e.target.style.borderColor = "#2e7d32"}
                onBlur={(e) => e.target.style.borderColor = errors.name ? "#d32f2f" : "#e0e0e0"}
              />
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ 
                    color: "#d32f2f", 
                    margin: "5px 0 0 0",
                    fontSize: "0.9rem"
                  }}
                >
                  {errors.name}
                </motion.p>
              )}
            </div>
            
            {/* Pet Email */}
            <div style={{ marginBottom: "25px" }}>
              <label 
                htmlFor="email" 
                style={{ 
                  display: "block", 
                  marginBottom: "8px", 
                  fontWeight: "bold",
                  color: "#2e7d32"
                }}
              >
                Contact Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter contact email for this pet"
                style={{
                  width: "100%",
                  padding: "12px 15px",
                  borderRadius: "8px",
                  border: errors.email ? "2px solid #d32f2f" : "2px solid #e0e0e0",
                  fontSize: "1rem",
                  outline: "none",
                  transition: "all 0.3s ease",
                  boxSizing: "border-box"
                }}
                onFocus={(e) => e.target.style.borderColor = "#2e7d32"}
                onBlur={(e) => e.target.style.borderColor = errors.email ? "#d32f2f" : "#e0e0e0"}
              />
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ 
                    color: "#d32f2f", 
                    margin: "5px 0 0 0",
                    fontSize: "0.9rem"
                  }}
                >
                  {errors.email}
                </motion.p>
              )}
            </div>
            
            {/* Additional Fields Row */}
            <div style={{ 
              display: "flex",
              gap: "20px",
              marginBottom: "30px",
              flexWrap: "wrap"
            }}>
              {/* Pet Color */}
              <div style={{ flex: 1, minWidth: "200px" }}>
                <label 
                  htmlFor="color" 
                  style={{ 
                    display: "block", 
                    marginBottom: "8px", 
                    fontWeight: "bold",
                    color: "#2e7d32"
                  }}
                >
                  Pet Color (optional):
                </label>
                <input
                  type="text"
                  id="color"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  placeholder="e.g., Brown, Black, White"
                  style={{
                    width: "100%",
                    padding: "12px 15px",
                    borderRadius: "8px",
                    border: "2px solid #e0e0e0",
                    fontSize: "1rem",
                    outline: "none",
                    transition: "all 0.3s ease",
                    boxSizing: "border-box"
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#2e7d32"}
                  onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
                />
              </div>
              
              {/* Pet Age */}
              <div style={{ flex: 1, minWidth: "200px" }}>
                <label 
                  htmlFor="age" 
                  style={{ 
                    display: "block", 
                    marginBottom: "8px", 
                    fontWeight: "bold",
                    color: "#2e7d32"
                  }}
                >
                  Pet Age (optional):
                </label>
                <input
                  type="text"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="e.g., 2 years, 6 months"
                  style={{
                    width: "100%",
                    padding: "12px 15px",
                    borderRadius: "8px",
                    border: "2px solid #e0e0e0",
                    fontSize: "1rem",
                    outline: "none",
                    transition: "all 0.3s ease",
                    boxSizing: "border-box"
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#2e7d32"}
                  onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
                />
              </div>
            </div>
            
            {/* Submit Button */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isSubmitting}
                style={{
                  padding: "15px 40px",
                  background: "linear-gradient(135deg, #2e7d32, #66bb6a)",
                  color: "white",
                  border: "none",
                  borderRadius: "30px",
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                  opacity: isSubmitting ? 0.7 : 1,
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                }}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        border: "3px solid rgba(255, 255, 255, 0.3)",
                        borderTopColor: "white"
                      }}
                    />
                    Adding Pet...
                  </>
                ) : (
                  <>
                    <span style={{ fontSize: "1.2rem" }}>🐾</span>
                    Add Pet
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
        
        {/* Submitted Pets */}
        {submittedData.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              background: "rgba(255, 255, 255, 0.9)",
              borderRadius: "15px",
              padding: "25px",
              boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)"
            }}
          >
            <h2 style={{ 
              color: "#2e7d32",
              margin: "0 0 20px 0",
              textAlign: "center",
              fontSize: "1.5rem"
            }}>
              Recently Added Pets
            </h2>
            
            <div style={{ 
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: "15px"
            }}>
              <AnimatePresence>
                {submittedData.map((pet, index) => {
                  const petType = petTypes.find(t => t.value === pet.type) || petTypes[0];
                  
                  return (
                    <motion.div
                      key={pet.id || index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      style={{
                        background: "white",
                        borderRadius: "10px",
                        padding: "15px",
                        boxShadow: "0 3px 10px rgba(0, 0, 0, 0.1)",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px"
                      }}
                    >
                      <div style={{ 
                        display: "flex",
                        alignItems: "center",
                        gap: "10px"
                      }}>
                        <div style={{ 
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          background: "rgba(46, 125, 50, 0.1)",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          fontSize: "1.5rem"
                        }}>
                          {petType.emoji}
                        </div>
                        <div>
                          <h3 style={{ 
                            margin: 0,
                            color: "#2e7d32",
                            fontSize: "1.1rem"
                          }}>
                            {pet.name}
                          </h3>
                          <p style={{ 
                            margin: 0,
                            color: "#666",
                            fontSize: "0.9rem"
                          }}>
                            {petType.label}
                          </p>
                        </div>
                      </div>
                      
                      <div style={{ 
                        fontSize: "0.9rem",
                        color: "#666"
                      }}>
                        <p style={{ margin: "0 0 5px 0" }}>
                          <strong>Email:</strong> {pet.email}
                        </p>
                        {pet.color && (
                          <p style={{ margin: "0 0 5px 0" }}>
                            <strong>Color:</strong> {pet.color}
                          </p>
                        )}
                        {pet.age && (
                          <p style={{ margin: "0 0 5px 0" }}>
                            <strong>Age:</strong> {pet.age}
                          </p>
                        )}
                        <p style={{ margin: "0 0 5px 0" }}>
                          <strong>User ID:</strong> {pet.userId}
                        </p>
                      </div>
                      
                      <div style={{ 
                        marginTop: "auto",
                        display: "flex",
                        justifyContent: "flex-end"
                      }}>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => navigate("/entities")}
                          style={{
                            padding: "8px 15px",
                            background: "rgba(46, 125, 50, 0.1)",
                            color: "#2e7d32",
                            border: "none",
                            borderRadius: "20px",
                            fontSize: "0.9rem",
                            fontWeight: "bold",
                            cursor: "pointer"
                          }}
                        >
                          View All Pets
                        </motion.button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default AddEntity;