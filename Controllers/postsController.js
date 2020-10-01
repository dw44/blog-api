const validator = require('express-validator');

const User = require('../Models/User');
const Post = require('../Models/Post');
const verify = require('../Controllers/authVerify/verify');

exports.getAllPosts = (req, res, next) => {
  const allPosts = [];
  Post.find()
    .populate('postedBy')
    .exec((err, posts) => {
      if (err) return next(err);
      posts.forEach(post => {
        allPosts.push({
          title: post.title,
          text: post.postBody,
          postedOn: post.postedOn,
          postedBy: post.postedBy.name
        });
      });
      res.json({
        user: req.user,
        posts: allPosts
      });
    });
}

exports.getPost = (req, res, next) => {
  Post.findById(req.params.id)
    .exec((err, post) => {
      if (err) return next(err);
      res.json({ post });
    })
}

exports.postsPOST = (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    postBody: req.body.postBody,
    postedBy: req.user
  });

  if (!req.user) {
    res.send('Not logged in or not an admin'); // fix later
  } else {
    post.save(err => {
      if (err) return next(err);
      res.json(post);
    });
  }
}