const jwt = require('jsonwebtoken');

function verify (req, res, next) {
  // check if request has token
  const token = req.header('auth-token');
  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send('Invalid Token');
  }
}

function verifyAdmin (req, res, next) {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    if (verified.admin) {
      next();
    } else {
      res.send('Admin access only')
    }
  } catch (error) {
    res.status(400).send('Invalid Token');
  }
}

module.exports = {
  verify, 
  verifyAdmin
}