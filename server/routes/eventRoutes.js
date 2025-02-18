const express = require('express');
const { createEvent, getEvents } = require('../controllers/eventController');
const auth = require('../middleware/auth');
const router = express.Router();

// Create a new event
router.post('/', auth, createEvent);

// Get all events
router.get('/', auth, getEvents);

module.exports = router;