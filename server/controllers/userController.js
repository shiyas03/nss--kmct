const User = require('../models/user');
const sendEmail = require('../config/mailer');
const bcrypt = require('bcryptjs');
const Feedback = require('../models/feedback');

const getVolunteers = async (req, res) => {
  try {
    const volunteers = await User.find({ role: 'volunteer' }).sort({ date: -1 });
    res.json(volunteers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const getProgramOfficers = async (req, res) => {
  try {
    const programOfficers = await User.find({ role: 'programOfficer' }).sort({ date: -1 });
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
  const verificationLink = `${process.env.SERVER_URL}/api/users/verify/${email}`;
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
      status: 'not verified',
    });
    await user.save();
    res.json({ user });
    await sendEmail(email, name, verificationLink)
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
}

const VerifyVolunteer = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOneAndUpdate({ email: email }, { status: 'verified' });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.redirect(`${process.env.CLIENT_URL}/set-password?email=${encodeURIComponent(user.email)}`);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
}

const NewPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    res.json({ msg: 'Password updated successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
}

const ResetPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const { userId } = req.params;

    let user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    res.json({ msg: 'Password updated successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
}

const EditUser = async (req, res) => {
  try {

    const { name, email, mobile } = req.body
    const userId = req.params.id

    const user = await User.findOneAndUpdate({ _id: userId }, { $set: { name, email, mobile } })
    if (!user) {
      return res.json({ msg: 'User not found' })
    }

    res.json({ msg: 'User updated' })
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
}

const userFeedback = async (req, res) => {
  try {
    const { name, email, message } = req.body
    let feedback = new Feedback({
      name,
      email,
      message
    })
    await feedback.save()
    res.json({ msg: 'feedback uploaded' })

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
}

const getFeedback = async (req, res) => {
  try {
    console.log('working');
    const feedbacks = await Feedback.find().sort({ date: -1 })
    res.json({ feedbacks })
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
}

module.exports = { getVolunteers, getProgramOfficers, updateUserStatus, updateUserRequest, NewVolunteer, VerifyVolunteer, NewPassword, ResetPassword, EditUser, userFeedback, getFeedback };