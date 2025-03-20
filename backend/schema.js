const { Sequelize, DataTypes } = require("sequelize");
const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables

// MySQL Database Connection
const sequelize = new Sequelize(
    process.env.MYSQL_DB,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASS || "@Saksham@790",
    {
        host: process.env.MYSQL_HOST || "127.0.0.1",
        port: process.env.MYSQL_PORT || 3306,
        dialect: "mysql",
        logging: false,
    }
);

// Define User model (MySQL)
const User = sequelize.define("User", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true, 
        validate: { isEmail: true }
    },
    age: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        validate: { min: 18 }
    }
});

// Define Entity model (MySQL) with `created_by`
const Entity = sequelize.define("Entity", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    price: { 
        type: DataTypes.FLOAT, 
        allowNull: true, 
        validate: { min: 0 }
    },
    created_by: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: User, key: "id" }
    }
});

// Define Relationship (MySQL)
User.hasMany(Entity, { foreignKey: "created_by", onDelete: "CASCADE" });
Entity.belongsTo(User, { foreignKey: "created_by" });

// MySQL Connection Function
const connectMySQL = async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ MySQL Database connected successfully!");
        await sequelize.sync({ alter: true });
        console.log("✅ MySQL Database & tables synced!");
    } catch (error) {
        console.error("❌ MySQL Connection Error:", error);
    }
};

// MongoDB Connection Function
const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("✅ Connected to MongoDB");
    } catch (err) {
        console.error("❌ MongoDB Connection Error:", err);
        process.exit(1); // Exit the process if MongoDB connection fails
    }
};

// Export Modules
module.exports = { sequelize, User, Entity, connectMySQL, connectMongoDB };
