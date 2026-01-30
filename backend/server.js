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

// CORS configuration
app.use(cors({
  origin: [
    "https://online-event-mangment-lb7k.vercel.app",
    "http://localhost:5173"
  ],
  credentials: true
}));

app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch(err => {
    console.error("DB Connection Error:", err);
    process.exit(1);
  });

// Routes
try {
  const authRoutes = require('./routes/authRoutes');
  const eventRoutes = require('./routes/eventRoutes');
  
  app.use('/api/auth', authRoutes);
  app.use('/api/events', eventRoutes);
} catch (error) {
  console.error('Route loading error:', error);
}

// Test Routes
app.get('/', (req, res) => res.send("Event API is running..."));

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'API is healthy',
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error:', err);
  res.status(500).json({ 
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`Server ready on port ${PORT}`));
}

module.exports = app;