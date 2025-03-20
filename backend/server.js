require("dotenv").config(); // Load environment variables
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const entityRoutes = require("./routes/entityRoutes");
const { connectMongoDB, connectMySQL, sequelize } = require("./schema");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// ✅ Debugging Log (Ensure server is receiving requests)
app.use((req, res, next) => {
    console.log(`📢 [${req.method}] ${req.path}`);
    next();
});

// ✅ Routes
app.use("/api/users", userRoutes);  // Fetch all users for dropdown
app.use("/api/entities", entityRoutes);  // Fetch entities by user ID

// ✅ Connect to Databases
connectMongoDB();
connectMySQL()
    .then(() => {
        console.log("✅ MySQL Connected");

        // ✅ Sync Sequelize Models *only after* MySQL is connected
        return sequelize.sync();
    })
    .then(() => console.log("✅ MySQL Tables Synced"))
    .catch(err => console.error("❌ MySQL Sync Error:", err));

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
