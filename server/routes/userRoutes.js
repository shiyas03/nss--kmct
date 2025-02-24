const express = require('express');
const { getVolunteers, getProgramOfficers, updateUserStatus, updateUserRequest, NewVolunteer, VerifyVolunteer, NewPassword, ResetPassword, EditUser } = require('../controllers/userController');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/volunteers', auth, getVolunteers);

router.get('/program-officers', auth, getProgramOfficers);

router.put('/:userId/status', auth, updateUserStatus);

router.put('/approve', auth, updateUserRequest);

router.post('/new-volunteer', auth, NewVolunteer)

router.get('/verify/:email', auth, VerifyVolunteer)

router.post('/set-password', auth, NewPassword)

router.post('/reset-password/:userId', auth, ResetPassword)

router.put('/update/:id', auth, EditUser)

module.exports = router;