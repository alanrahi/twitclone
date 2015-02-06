var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Post = require('../models/post');

/* GET home page. */
router.get('/', function(req, res, next) {
  if (!req.cookies["logged-into-twitclone"]) {
    res.redirect('/login');
  } else { 
    Post.getAllPosts(function(posts) {
      res.render('index', { title: 'TwitClone', allPosts: posts });
    });
   } 
    
});

/* POST home page. */
router.post('/', function(req, res, next) {
  Post.create(req.cookies["logged-into-twitclone"],req.body.newpost, function() {
    res.redirect('/');
  });
  
});


/* GET login page */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login to TwitClone!' });
});

/* POST login page */
router.post('/login', function(req, res, next) {
  User.exists(req.body.username, function(user) {
    if (user) {
      User.passwordIsValid(user.get('username'), req.body.password, function(valid) {
        if (valid) {
          res.cookie('logged-into-twitclone', user.get('id'));
          res.redirect('/');
        }
        else {
	  res.render ('login', {title: 'Incorrect login information'});
	}
      });
    }
    else { 
      res.render ('login', {title: 'Incorrect login information'});
    }
  });
});

router.get('/signup', function(req,res,next) {
  res.render('signup', { title: 'Signup for twitclone!' });
});

router.post('/signup', function(req,res,next) {
  User.create(req.body.username,req.body.password, function(user) {
    res.cookie('logged-into-twitclone', user.get('id'));
    res.redirect('/');
  });
});

module.exports = router;
