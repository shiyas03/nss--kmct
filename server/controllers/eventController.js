const Event = require('../models/event');
const User = require('../models/user');

// Create a new event
const createEvent = async (req, res) => {
  const { title, description, date, location } = req.body;

  try {
    const event = new Event({
      title,
      description,
      date,
      location,
      organizer: req.user.id,
    });

    await event.save();
    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get all events
const getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('organizer', 'name');
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = { createEvent, getEvents };