const Event = require('../models/event');
const User = require('../models/user');

// Create a new event
const createEvent = async (req, res) => {
  const { title, location, organizer, date, description } = req.body;

  try {
    const event = new Event({
      title,
      description,
      date,
      location,
      organizer
    });

    await event.save();
    const newEvent = await Event.findById(event._id).populate('organizer', 'name');
    res.json({ event: newEvent });
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

// Participate in an event
const participateInEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    if (event.participants.includes(req.user.id)) {
      return res.status(400).json({ msg: 'You are already participating in this event' });
    }

    event.participants.push(req.user.id);
    await event.save();
    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const generateEventReport = async (req, res) => {
  try {
    const events = await Event.find().populate('organizer', 'name').populate('participants', 'name');
    const report = events.map((event) => ({
      title: event.title,
      date: event.date,
      organizer: event.organizer.name,
      participants: event.participants.map((participant) => participant.name),
    }));
    res.json(report);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = { createEvent, getEvents, participateInEvent, generateEventReport };