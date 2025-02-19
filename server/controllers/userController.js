const User = require('../models/user');

const getVolunteers = async (req, res) => {
  try {
    const volunteers = await User.find({ role: 'volunteer' }).select('-password').sort({ date: 1 });
    res.json(volunteers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const getProgramOfficers = async (req, res) => {
  try {
    const programOfficers = await User.find({ role: 'programOfficer' }).select('-password').sort({ date: 1 });
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

    user.block = isApproved;
    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const updateUserRequest = async (req, res) => {
  const { userId, status } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    user.status = status;
    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


const NewVolunteer = async (req, res) => {
  const { name, email, mobile, role } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      name,
      email,
      mobile,
      role,
      status: 'approved',
    });
    await user.save();

    res.json({ user });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
}

module.exports = { getVolunteers, getProgramOfficers, updateUserStatus, updateUserRequest, NewVolunteer };