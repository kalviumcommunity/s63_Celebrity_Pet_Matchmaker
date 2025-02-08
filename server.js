require("dotenv").config();
const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const port = 6000;

const client = new MongoClient(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let dbStatus = "Disconnected";

// Connect to MongoDB
async function connectDB() {
    try {
        await client.connect();
        dbStatus = "Connected to MongoDB";
        console.log(dbStatus);
    } catch (error) {
        dbStatus = "Failed to connect to MongoDB";
        console.error(error);
    }
}

connectDB();

// Route to check database status dynamically
app.get("/", async (req, res) => {
    try {
        await client.db("admin").command({ ping: 1 }); // Pings the DB to check the connection
        res.send("Database Connection Status: Connected to MongoDB");
    } catch (error) {
        res.send("Database Connection Status: Failed to connect to MongoDB");
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});