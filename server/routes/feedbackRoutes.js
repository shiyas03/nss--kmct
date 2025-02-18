const express = require('express');
const { submitFeedback, getFeedback } = require('../controllers/feedbackController');
const auth = require('../middleware/auth');
const router = express.Router();

// Submit feedback for an event
router.post('/', auth, submitFeedback);

// Get feedback for an event
router.get('/:eventId', auth, getFeedback);

module.exports = router;