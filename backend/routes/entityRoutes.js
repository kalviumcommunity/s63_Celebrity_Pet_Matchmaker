const express = require("express");
const router = express.Router();
const { User } = require("../schema");

// Fetch all users
router.get("/", async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users." });
    }
});

module.exports = router;
