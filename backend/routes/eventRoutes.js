// const express = require('express');
// const router = express.Router();
// const { createEvent, getEvents, registerForEvent } = require('../controllers/eventController');
// const { protect, adminOnly } = require('../middleware/authMiddleware');

// router.get('/', getEvents);
// router.post('/', protect, adminOnly, createEvent);
// router.post('/:id/register', protect, registerForEvent);

// module.exports = router;
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

router.get('/', getEvents); // READ ALL
router.get('/:id', getEventById); // READ ONE
router.post('/', protect, adminOnly, createEvent); // CREATE
router.put('/:id', protect, adminOnly, updateEvent); // UPDATE
router.delete('/:id', protect, adminOnly, deleteEvent); // DELETE
router.post('/:id/register', protect, registerForEvent);

module.exports = router;