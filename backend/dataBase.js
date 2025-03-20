const mongoose = require("mongoose");
const { Sequelize } = require("sequelize");

// MongoDB Connection
const connectMongoDB = () => {
    mongoose
        .connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then((data) => {
            console.log(`✅ MongoDB connected with server: ${data.connection.host}`);
        })
        .catch((err) => {
            console.error(`❌ MongoDB connection failed: ${err.message}`);
        });
};

// MySQL (Sequelize) Connection
const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
        host: process.env.MYSQL_HOST || 'localhost',
        dialect: 'mysql',
        logging: false, // Set true for debugging
    }
);

const connectMySQL = async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ MySQL connected successfully.");
    } catch (error) {
        console.error("❌ MySQL connection failed:", error.message);
    }
};

module.exports = { connectMongoDB, connectMySQL, sequelize };
