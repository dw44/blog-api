var express = require('express');
var router = express.Router();

const postsController = require('../Controllers/postsController');
const { verify, verifyAdmin } = require('../Controllers/authVerify/verify');

/* GET all posts */
router.get('/', verify, postsController.getAllPosts);

/* Get a specific post by id */
router.get('/:id', postsController.getPost);

/* Make new post */
router.post('/', verifyAdmin, postsController.postsPOST);

module.exports = router;