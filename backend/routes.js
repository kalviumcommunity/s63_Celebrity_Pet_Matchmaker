const express = require("express");
const { check, validationResult } = require("express-validator");
const Entity = require("../models/Entity");

const router = express.Router();

// Create a new entity with validation
router.post(
    "/entities",
    [
        check("name").not().isEmpty().withMessage("Name is required"),
        check("description").not().isEmpty().withMessage("Description is required"),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, description } = req.body;

        try {
            const newEntity = new Entity({ name, description });
            await newEntity.save();
            res.status(201).json(newEntity);
        } catch (error) {
            res.status(500).json({ message: "Server error" });
        }
    }
);

// Get all entities
router.get("/entities", async (req, res) => {
    try {
        const entities = await Entity.find();
        res.json(entities);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
