const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const User = require('../models/user')
const Event = require('../models/event');

router.post('/user/:id', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    const userId = req.params.id
    await User.updateOne({ _id: userId }, { $set: { image: req.file.filename } })

    res.json({
        message: 'File uploaded successfully!',
        fileName: `${req.file.filename}`
    });
});

router.post('/event/:id', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    const eventId = req.params.id
    await Event.updateOne({ _id: eventId }, { $set: { image: req.file.filename } })

    res.json({
        message: 'File uploaded successfully!',
        fileName: `${req.file.filename}`
    });
});

router.get('/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = `uploads/${filename}`;
    res.sendFile(filePath, { root: '.' });
});

module.exports = router;