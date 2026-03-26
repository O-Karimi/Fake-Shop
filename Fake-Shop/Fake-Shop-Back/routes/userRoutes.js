import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// @route   POST /api/users/register
// @desc    Register a new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'A fake account with this email already exists!' });
    }

    const user = await User.create({
      name,
      email,
      password
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        message: 'Fake account successfully created!'
      });
    } else {
      res.status(400).json({ message: 'Invalid user data received.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error creating user', error: error.message });
  }
});

export default router;