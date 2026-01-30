const express = require('express');
const router = express.Router();
const { 
    createEvent, 
    getEvents, 
    getEventById, 
    updateEvent, 
    deleteEvent, 
    registerForEvent 
} = require('../controllers/eventController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Public routes (no authentication required)
router.get('/', getEvents); // READ ALL - Public
router.get('/:id', getEventById); // READ ONE - Public

// Protected routes (authentication required)
router.post('/', protect, adminOnly, createEvent); // CREATE - Admin only
router.put('/:id', protect, adminOnly, updateEvent); // UPDATE - Admin only
router.delete('/:id', protect, adminOnly, deleteEvent); // DELETE - Admin only
router.post('/:id/register', protect, registerForEvent); // REGISTER - Authenticated users

module.exports = router;