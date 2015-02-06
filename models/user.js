// this is the user model

var env = process.env.NODE_ENV || 'development';
var knexConfig = require('../knexfile.js')[env];
var knex = require('knex')(knexConfig);
var bookshelf = require('bookshelf')(knex);

var User =  bookshelf.Model.extend({
	tableName: 'users'
});





module.exports = {


  passwordIsValid: function(username, password, callBack) {
  	new User({username: username}).fetch().then(function(user) {
  		if (user.get('password') === password) {callBack(true);}
  			else {callBack(false);}
  	});

  },

  create: function(username, password, callBack) { 
    User.forge({username: username, password: password}).save().then(function(user) {
      callBack();
    });
  },
  
  exists: function(username, callBack) {
  	new User({username: username}).fetch().then(function(user) {
  		callBack(user);
  	});
    
  }
  
};
