var express = require('express');
var router = express.Router();

var userController = require('../Controllers/userController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/new', userController.createUserPOST);

router.post('/signin', userController.signInPOST);

module.exports = router;
