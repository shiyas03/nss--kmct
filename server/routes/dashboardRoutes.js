const express = require('express');
const router = express.Router()
const User = require('../models/user');
const Event = require('../models/event');
const Feedback = require('../models/feedback');

router.get('/', async function (req, res) {
    try {
        const volunteer = await User.countDocuments({ role: 'volunteer' })
        const programOfficer = await User.countDocuments({ role: 'programOfficer' })
        const event = await Event.countDocuments()
        const feedback = await Feedback.countDocuments()
        return res.json({volunteer, programOfficer, event, feedback})
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
})

module.exports = router;