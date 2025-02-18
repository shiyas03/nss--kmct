const User = require('../models/user');

const getVolunteers = async (req, res) => {
  try {
    const volunteers = await User.find({ role: 'volunteer' }).select('-password');
    res.json(volunteers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const getProgramOfficers = async (req, res) => {
  try {
    const programOfficers = await User.find({ role: 'programOfficer' }).select('-password');
    res.json(programOfficers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Approve or block a user
const updateUserStatus = async (req, res) => {
  const { userId } = req.params;
  const { isApproved } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    user.isApproved = isApproved;
    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = { getVolunteers, getProgramOfficers, updateUserStatus };