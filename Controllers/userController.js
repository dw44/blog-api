const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../Models/User');
const { registerValidation, loginValidation } = require('./Validation/validation');

exports.createUserPOST = async (req, res, next) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send('An account with this email address already exists.');

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const isAdmin = (req.body.createAdminCode === process.env.CREATE_ADMIN_SECRET ? true : false);
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    admin: isAdmin
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }
}

exports.signInPOST = async (req, res, next) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ authError: 'Incorrect email or password' });

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).json({ authError: 'Incorrect email or password' });

  const token = jwt.sign({ _id: user._id, admin: user.admin, email: user.email, name: user.name }, process.env.TOKEN_SECRET, { expiresIn: '30m' });
  res.header('auth-token', token).send(token);
}