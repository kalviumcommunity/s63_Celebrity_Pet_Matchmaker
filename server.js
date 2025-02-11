require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { resolve } = require('path');
const menuRoutes = require('./routes'); // Import routes properly

const app = express();
const port = process.env.PORT || 6000;

// Middleware
app.use(express.json());  

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// Serve Static Files
app.use(express.static('static'));

// Routes
app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

// Register Routes
app.use('/api', menuRoutes); // Prefix the API routes with `/api`

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
