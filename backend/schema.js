const mongoose = require("mongoose");

const entitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [3, "Name must be at least 3 characters long"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"]
    },
    age: {
        type: Number,
        required: [true, "Age is required"],
        min: [18, "Age must be at least 18"]
    },
    price: {
        type: Number,
        required: false, // Price is optional
        min: [0, "Price must be a non-negative number"]
    }
});

const Entity = mongoose.model("Entity", entitySchema);

module.exports = Entity;
