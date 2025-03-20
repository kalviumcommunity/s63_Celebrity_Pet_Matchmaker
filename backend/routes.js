const express = require("express");
const cors = require("cors");
const { Sequelize } = require("sequelize");
const userRoutes = require("./routes/userRoutes"); // User routes
const entityRoutes = require("./routes/entityRoutes"); // Entity routes

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors()); // Allow frontend requests
app.use(express.json()); // Parse JSON bodies

// ✅ Database Connection
const sequelize = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username: "root",
  password: "@Saksham@790",
  database: "saksham",
});

// ✅ Test Database Connection
sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Database error: ", err));

// ✅ Routes
app.use("/api/users", userRoutes); // User-related routes
app.use("/api", entityRoutes); // Entity-related routes

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
