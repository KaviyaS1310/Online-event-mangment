const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); 
const authRoutes = require('./routes/authRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/events', require('./routes/eventRoutes'));

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(" MongoDB Connected Successfully"))
  .catch(err => console.log(" DB Connection Error: ", err));

// Test Route
app.get('/', (req, res) => res.send("Event API is running..."));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server ready on port ${PORT}`));