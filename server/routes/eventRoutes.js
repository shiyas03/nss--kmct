const express = require('express');
const { createEvent, getEvents, participateInEvent, generateEventReport, eventFeedback } = require('../controllers/eventController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/new-event', auth, createEvent);

router.get('/', auth, getEvents);

router.post('/:eventId/participate', auth, participateInEvent);

router.get('/report', auth, generateEventReport);

router.post('/feedback/:eventId', auth, eventFeedback);

module.exports = router;