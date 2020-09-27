const bcrypt = require('bcryptjs');

const User = require('../Models/User');
const { registerValidation } = require('./Validation/validation');

exports.createUserPost = async (req, res, next) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error);

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