// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json()); 
// const authRoutes = require('./routes/authRoutes');

// app.use('/api/auth', authRoutes);
// app.use('/api/events', require('./routes/eventRoutes'));

// // Database Connection
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log(" MongoDB Connected Successfully"))
//   .catch(err => console.log(" DB Connection Error: ", err));

// // Test Route
// app.get('/', (req, res) => res.send("Event API is running..."));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(` Server ready on port ${PORT}`));

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 1. Updated Middleware: Specific CORS configuration
app.use(cors({
  origin: [
    "https://online-event-mangment-lb7k.vercel.app", // Your specific frontend URL
    "http://localhost:5173"                         // For local testing
  ],
  credentials: true
}));

app.use(express.json()); 

// 2. Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);
app.use('/api/events', require('./routes/eventRoutes'));

// 3. Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(" MongoDB Connected Successfully"))
  .catch(err => console.log(" DB Connection Error: ", err));

// 4. Test Routes
app.get('/', (req, res) => res.send("Event API is running..."));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'API is healthy',
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// 5. Port Listening (Still useful for local, but Vercel uses the export)
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(` Server ready on port ${PORT}`));
}

// 6. CRUCIAL for Vercel: Export the app
module.exports = app;