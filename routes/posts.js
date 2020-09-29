var express = require('express');
var router = express.Router();

const postsController = require('../Controllers/postsController');
const verify = require('../Controllers/authVerify/verify');

/* GET home page. */
router.get('/', verify, postsController.postsGET);

module.exports = router;