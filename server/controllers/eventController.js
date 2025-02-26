const Event = require('../models/event');
const User = require('../models/user');

// Create a new event
const createEvent = async (req, res) => {
  const { _id, title, location, organizer, date, description } = req.body;

  try {

    if (_id) {
      const event = await Event.findOneAndUpdate({ _id: _id },
        {
          $set: {
            title,
            description,
            date,
            location,
            organizer
          }
        }, { new: true }).populate('organizer', 'name').populate('participants.user', 'name email')

      return res.json({ update: event, msg: 'event updated' })
    }

    const event = new Event({
      title,
      description,
      date,
      location,
      organizer
    });

    // await event.save();
    const newEvent = await Event.findById(event._id).populate('organizer', 'name');
    res.json({ event: newEvent, msg: 'Event created successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get all events
const getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('organizer', 'name').populate('participants.user', 'name email').sort({ date: -1 });
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
    const userId = req.user._id;
    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    const alreadyJoined = event.participants.some((participant) =>
      participant.user.equals(userId)
    );

    if (alreadyJoined) {
      return res.json({ msg: "You already joined this event" });
    }

    event.participants.push({ user: userId });
    await event.save();

    res.json({ event });
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

const eventFeedback = async (req, res) => {
  try {
    const { eventId } = req.params
    const data = req.body

    const event = await Event.findOne({ _id: eventId })
    if (!event) {
      res.json({ msg: 'Event not found' })
    }

    const findEventIndex = event.participants.findIndex((participant) => participant.user.toString() === data.userId)
    if (findEventIndex >= 0) {
      event.participants[findEventIndex].feedback = data.feedback
    } else {
      event.participants.push({ user: data.userId, feedback: data.feedback, date: new Date() })
    }

    await event.save()
    res.json({ msg: "Feedback added successfully!" });
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

const participantStatus = async (req, res) => {
  const eventId = req.params.id
  const { status, userId } = req.body
  try {
    const event = await Event.findOne({ _id: eventId }).populate('organizer', 'name').populate('participants', 'name');
    if (!event) {
      res.json({ msg: 'Event not found' })
    }

    const findEventIndex = event.participants.findIndex((participant) => participant.user.toString() === userId)
    console.log(findEventIndex);

    if (findEventIndex >= 0) {
      event.participants[findEventIndex].status = status
    } else {
      event.participants.push({ user: userId, status: status, date: new Date() })
    }
    await event.save()

    res.json({ msg: "Participant status updated!", event });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
}

module.exports = { createEvent, getEvents, participateInEvent, generateEventReport, eventFeedback, participantStatus };