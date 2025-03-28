import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../context/authContext";
import ParallaxBackground from "../components/ParallaxBackground";
import AnimatedPetMascot from "../components/AnimatedPetMascot";
import InteractiveNavMenu from "../components/InteractiveNavMenu";

function Login() {
    const { login } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [shake, setShake] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username.trim()) {
            setShake(true);
            setTimeout(() => setShake(false), 500);
            return;
        }
        
        setIsLoading(true);
        try {
            await login(username);
        } catch (error) {
            console.error("Login error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const pawPrints = [
        { x: "10%", y: "20%", delay: 0, rotate: 15 },
        { x: "25%", y: "35%", delay: 0.2, rotate: -10 },
        { x: "15%", y: "65%", delay: 0.5, rotate: 20 },
        { x: "85%", y: "15%", delay: 0.3, rotate: -15 },
        { x: "75%", y: "45%", delay: 0.7, rotate: 10 },
        { x: "80%", y: "75%", delay: 0.1, rotate: -5 }
    ];

    return (
        <div style={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}>
            {/* Background */}
            <ParallaxBackground colorScheme="purple" />
            
            {/* Navigation */}
            <div style={{ padding: '20px 40px' }}>
                <InteractiveNavMenu colorScheme="purple" />
            </div>
            
            {/* Paw Print Decorations */}
            {pawPrints.map((paw, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                        opacity: [0, 1, 0], 
                        scale: [0, 1, 0.8] 
                    }}
                    transition={{ 
                        duration: 4,
                        delay: paw.delay,
                        repeat: Infinity,
                        repeatDelay: 3
                    }}
                    style={{
                        position: "absolute",
                        left: paw.x,
                        top: paw.y,
                        transform: `rotate(${paw.rotate}deg)`,
                        zIndex: 0
                    }}
                >
                    <div style={{ fontSize: "2.5rem", color: "rgba(255, 255, 255, 0.3)" }}>
                        🐾
                    </div>
                </motion.div>
            ))}
            
            {/* Pet Mascot */}
            <AnimatedPetMascot 
                petType="dog" 
                colorScheme="purple"
                position="bottom-left"
                message="Please login to continue your pet adventure!"
            />
            
            {/* Login Form */}
            <div style={{ 
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "calc(100vh - 100px)",
                zIndex: 1
            }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{
                        background: "rgba(255, 255, 255, 0.9)",
                        borderRadius: "20px",
                        padding: "40px",
                        width: "90%",
                        maxWidth: "400px",
                        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                        textAlign: "center"
                    }}
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ 
                            type: "spring", 
                            stiffness: 260, 
                            damping: 20,
                            delay: 0.2
                        }}
                        style={{ 
                            margin: "0 auto 30px",
                            width: "100px",
                            height: "100px",
                            borderRadius: "50%",
                            background: "linear-gradient(135deg, #9c27b0, #673ab7)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "3rem"
                        }}
                    >
                        🐶
                    </motion.div>
                    
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        style={{ 
                            color: "#6a1b9a",
                            marginBottom: "30px",
                            fontSize: "2rem"
                        }}
                    >
                        Welcome Back!
                    </motion.h1>
                    
                    <form onSubmit={handleSubmit}>
                        <motion.div
                            animate={{ x: shake ? [-10, 10, -10, 10, 0] : 0 }}
                            transition={{ duration: 0.4 }}
                            style={{ marginBottom: "25px" }}
                        >
                            <input 
                                type="text" 
                                placeholder="Enter your username" 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)}
                                style={{
                                    width: "100%",
                                    padding: "15px 20px",
                                    fontSize: "1rem",
                                    border: "2px solid #e1bee7",
                                    borderRadius: "30px",
                                    outline: "none",
                                    transition: "all 0.3s ease",
                                    boxSizing: "border-box"
                                }}
                                onFocus={(e) => e.target.style.borderColor = "#9c27b0"}
                                onBlur={(e) => e.target.style.borderColor = "#e1bee7"}
                            />
                        </motion.div>
                        
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            disabled={isLoading}
                            style={{
                                width: "100%",
                                padding: "15px 20px",
                                fontSize: "1rem",
                                fontWeight: "bold",
                                color: "white",
                                background: "linear-gradient(135deg, #9c27b0, #673ab7)",
                                border: "none",
                                borderRadius: "30px",
                                cursor: "pointer",
                                boxShadow: "0 4px 10px rgba(156, 39, 176, 0.3)",
                                position: "relative",
                                overflow: "hidden"
                            }}
                        >
                            {isLoading ? (
                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        style={{
                                            width: "20px",
                                            height: "20px",
                                            borderRadius: "50%",
                                            border: "3px solid rgba(255, 255, 255, 0.3)",
                                            borderTopColor: "white",
                                            marginRight: "10px"
                                        }}
                                    />
                                    Loading...
                                </div>
                            ) : (
                                "Login to Pet Paradise"
                            )}
                        </motion.button>
                    </form>
                    
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        style={{ 
                            marginTop: "25px",
                            color: "#666",
                            fontSize: "0.9rem"
                        }}
                    >
                        Enter any username to explore the Pet Machine Maker
                    </motion.p>
                </motion.div>
            </div>
        </div>
    );
}

export default Login;