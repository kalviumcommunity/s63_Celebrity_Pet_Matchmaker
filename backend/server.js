const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 6000;
const MONGO_URI = "mongodb://localhost:27017/yourDB"; // Update your database name

// Middleware
app.use(express.json());
app.use(cors()); // Allows frontend to communicate with the backend

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Sample API Endpoint (Modify as needed)
app.get("/", (req, res) => {
  res.send("Welcome to the Backend API!");
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
