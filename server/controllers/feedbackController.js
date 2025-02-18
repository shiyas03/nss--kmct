const Feedback = require('../models/feedback');
const Event = require('../models/event');

// Submit feedback for an event
const submitFeedback = async (req, res) => {
  const { eventId, message, rating } = req.body;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    const feedback = new Feedback({
      event: eventId,
      user: req.user.id,
      message,
      rating,
    });

    await feedback.save();
    res.json(feedback);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get feedback for an event
const getFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find({ event: req.params.eventId }).populate('user', 'name');
    res.json(feedback);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = { submitFeedback, getFeedback };