const express = require("express");
const router = express.Router();
const { User, Entity } = require("../schema"); // Import models

// ✅ Fetch all users (Fixes "404 Not Found" error)
router.get("/", async (req, res) => {
    try {
        const users = await User.findAll({ attributes: ["id", "name", "email"] });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users.", details: error.message });
    }
});

// ✅ Fetch entities by user ID
router.get("/user/:userId", async (req, res) => {
    try {
        const entities = await Entity.findAll({ where: { created_by: req.params.userId } });
        res.json(entities);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch entities.", details: error.message });
    }
});

module.exports = router;
