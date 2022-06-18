var express = require('express');
var router = express.Router();
var usersController = require('../controller/user');
var passport = require('passport');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/signup', usersController.renderSignup);
router.post('/signup', usersController.signup);

router.get('/signin', usersController.renderSignin);
router.post('/signin', usersController.signin);

router.get('/signout', usersController.signout);
module.exports = router;
