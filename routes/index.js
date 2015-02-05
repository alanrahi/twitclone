var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  if (!req.cookies["logged-into-twitclone"]) {
    res.redirect('/login');
  } else {
    res.render('index', { title: 'Express' });
  }
});

/* GET login page */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login to TwitClone!' });
});

/* POST login page */
router.post('/login', function(req, res, next) {
  User.exists(req.body.username, function(user){
    if(user) {
      User.passwordIsValid(user, req.body.password, function(valid) {
	if(valid) {
	  res.cookie('logged-into-twitclone', 'true');
	  res.redirect('/');
	} else {
	  res.render('login', { title: 'Invalid Password!' });
	}
      });
    } else {
      res.render('login', { title: 'User does not Exist!' });
    }
  });
});


module.exports = router;
