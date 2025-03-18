const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const entityRoutes = require("./routes"); // ✅ Corrected path

const app = express();
const PORT = 6000;
const MONGO_URI = "mongodb://localhost:27017/yourDB"; // Update your database name

// Middleware
app.use(express.json());
app.use(cors());

// Use the Routes
app.use("/api", entityRoutes);

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
