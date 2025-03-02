const mongoose = require('mongoose');

const ParticipantsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  date: {
    type: Date,
    default: new Date(),
  },
  feedback: {
    type: String
  },
  status: {
    type: String,
    default: 'requested'
  }
})

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  participants: [ParticipantsSchema],
  image: {
    type: String,
  }
});

module.exports = mongoose.model('Event', EventSchema);