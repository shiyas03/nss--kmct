const express = require('express');
const { getVolunteers, getProgramOfficers, updateUserStatus, updateUserRequest, NewVolunteer } = require('../controllers/userController');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/volunteers', auth, getVolunteers);

router.get('/program-officers', auth, getProgramOfficers);

router.put('/:userId/status', auth, updateUserStatus);

router.put('/approve', auth, updateUserRequest);

router.post('/new-volunteer', auth, NewVolunteer)

module.exports = router;