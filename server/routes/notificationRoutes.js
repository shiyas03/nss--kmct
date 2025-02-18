const express = require('express');
const { getNotifications, markAsRead } = require('../controllers/notificationController');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all notifications for a user
router.get('/', auth, getNotifications);

// Mark a notification as read
router.put('/:id/read', auth, markAsRead);

module.exports = router;