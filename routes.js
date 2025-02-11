// routes.js
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Define a sample schema and model
const petSchema = new mongoose.Schema({
    name: String,
    breed: String,
    owner: String
});

const Pet = mongoose.model("Pet", petSchema);

// Create (POST)
router.post("/pets", async (req, res) => {
    try {
        const newPet = new Pet(req.body);
        await newPet.save();
        res.status(201).json(newPet);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Read (GET)
router.get("/pets", async (req, res) => {
    try {
        const pets = await Pet.find();
        res.json(pets);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update (PUT)
router.put("/pets/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, breed, owner } = req.body;

        // Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid pet ID format" });
        }

        // Ensure required fields are present
        if (!name || !breed || !owner) {
            return res.status(400).json({ error: "Missing required fields: name, breed, owner" });
        }

        const updatedPet = await Pet.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (!updatedPet) {
            return res.status(404).json({ error: "Pet not found" });
        }

        res.json(updatedPet);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Delete (DELETE)
router.delete("/pets/:id", async (req, res) => {
    try {
        await Pet.findByIdAndDelete(req.params.id);
        res.json({ message: "Pet deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
