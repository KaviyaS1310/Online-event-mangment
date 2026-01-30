const Event = require('../models/Event');

// Create Event (Admin only)
exports.createEvent = async (req, res) => {
    try {
        const event = new Event(req.body);
        await event.save();
        res.status(201).json(event);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all events (Public)
exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find().populate('participants', 'name email');
        res.status(200).json(events);
    } catch (error) {
        console.error('Get events error:', error);
        res.status(500).json({ message: 'Failed to fetch events', error: error.message });
    }
};

// Register for an event
exports.registerForEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event.participants.includes(req.user.id)) {
            event.participants.push(req.user.id);
            await event.save();
            res.json({ message: "Registered successfully" });
        } else {
            res.status(400).json({ message: "Already registered" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    
};

// READ: Get a single event by ID
exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: "Event not found" });
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE: Update event details (Admin Only)
exports.updateEvent = async (req, res) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE: Remove an event (Admin Only)
exports.deleteEvent = async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.json({ message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};