const express = require("express");
const { body, validationResult } = require("express-validator");
const Entity = require("./schema"); // ✅ Corrected based on your folder structure


const router = express.Router();

// ✅ GET: Fetch all entities
router.get("/entities", async (req, res) => {
  try {
    const entities = await Entity.find();
    res.json(entities);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ POST: Create an entity with validation
router.post(
    "/add-entity",
    [
      body("name").notEmpty().withMessage("Name is required"),
      body("email").isEmail().withMessage("Invalid email format"),
      body("age").isInt({ min: 1 }).withMessage("Age must be a positive number"),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
        const { name, email, age } = req.body;
        const newEntity = new Entity({ name, email, age });
        await newEntity.save();
        res.status(201).json({ message: "Entity created successfully", newEntity });
      } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
      }
    }
  );
  
// ✅ PUT: Update an entity by ID
router.put(
  "/update-entity/:id",
  [
    body("name").optional().notEmpty().withMessage("Name cannot be empty"),
    body("email").optional().isEmail().withMessage("Invalid email format"),
    body("age").optional().isInt({ min: 1 }).withMessage("Age must be a positive number"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const updatedEntity = await Entity.findByIdAndUpdate(req.params.id, req.body, { new: true });

      if (!updatedEntity) {
        return res.status(404).json({ message: "Entity not found" });
      }

      res.json({ message: "Entity updated successfully", updatedEntity });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

// ✅ DELETE: Delete an entity by ID
router.delete("/delete-entity/:id", async (req, res) => {
  try {
    const deletedEntity = await Entity.findByIdAndDelete(req.params.id);

    if (!deletedEntity) {
      return res.status(404).json({ message: "Entity not found" });
    }

    res.json({ message: "Entity deleted successfully", deletedEntity });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
