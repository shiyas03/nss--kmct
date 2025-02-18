const express = require('express');
const { getVolunteers, getProgramOfficers, updateUserStatus } = require('../controllers/userController');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/volunteers', auth, getVolunteers);

router.get('/program-officers', auth, getProgramOfficers);

router.put('/:userId/status', auth, updateUserStatus);

module.exports = router;