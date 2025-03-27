const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");

// Use cookie-parser middleware
router.use(cookieParser());

// Login endpoint - sets username in cookie
router.post("/login", (req, res) => {
    try {
        const { username } = req.body;
        
        if (!username) {
            return res.status(400).json({ error: "Username is required" });
        }
        
        // Set username in cookie
        res.cookie("username", username, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            sameSite: "strict"
        });
        
        return res.status(200).json({ 
            success: true, 
            message: "Login successful", 
            user: username 
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ 
            error: "Login failed", 
            details: error.message 
        });
    }
});

// Logout endpoint - removes cookie
router.post("/logout", (req, res) => {
    try {
        // Clear the username cookie
        res.clearCookie("username");
        
        return res.status(200).json({ 
            success: true, 
            message: "Logout successful" 
        });
    } catch (error) {
        console.error("Logout error:", error);
        return res.status(500).json({ 
            error: "Logout failed", 
            details: error.message 
        });
    }
});

// Get current user from cookie
router.get("/current-user", (req, res) => {
    try {
        const username = req.cookies.username;
        
        if (!username) {
            return res.status(401).json({ 
                error: "Not authenticated" 
            });
        }
        
        return res.status(200).json({ 
            success: true, 
            user: username 
        });
    } catch (error) {
        console.error("Get current user error:", error);
        return res.status(500).json({ 
            error: "Failed to get current user", 
            details: error.message 
        });
    }
});

module.exports = router;