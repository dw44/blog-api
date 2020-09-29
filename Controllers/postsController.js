const User = require('../Models/User');
const Post = require('../Models/Post');
const verify = require('../Controllers/authVerify/verify');

exports.postsGET = (req, res, next) => {
  res.json({
    user: req.user,
    posts: [
      {
        title: 'First Post',
        description: 'Random data that should not be accessible without authorization'
      },
      {
        title: 'Second Post',
        description: 'More random data that should not be accessible without authorization'
      },
      {
        title: 'Third Post',
        description: 'Even more random data that should not be accessible without authorization'
      }
    ]
  });
}