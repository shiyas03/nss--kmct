const express = require('express');
const { createEvent, getEvents, participateInEvent, generateEventReport } = require('../controllers/eventController');
const auth = require('../middleware/auth');
const router = express.Router();

// Create a new event
router.post('/new-event', auth, createEvent);

// Get all events
router.get('/', auth, getEvents);

// Participate in an event
router.post('/:eventId/participate', auth, participateInEvent);

router.get('/report', auth, generateEventReport);

module.exports = router;