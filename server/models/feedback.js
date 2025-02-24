const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date:{
    type: Date,
    default: new Date(),
  }
});

module.exports = mongoose.model('Feedback', FeedbackSchema);