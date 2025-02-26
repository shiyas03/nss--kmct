const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: ['volunteer', 'programOfficer'],
  },
  block: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    default: 'requested'
  },
  date: {
    type: Date,
    default: new Date()
  },
  image: {
    type: String,
  },
  dob: {
    type: Date,
  },
  department: {
    type: String,
  },
  adminYear: {
    type: String,
  }
});

module.exports = mongoose.model('User', UserSchema);