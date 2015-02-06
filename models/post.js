// this is the post model

var env = process.env.NODE_ENV || 'development';
var knexConfig = require('../knexfile.js')[env];
var knex = require('knex')(knexConfig);
var bookshelf = require('bookshelf')(knex);

var Post = bookshelf.Model.extend({ 
  tableName: 'posts'
});

var Posts = bookshelf.Collection.extend({
	model: Post
});


module.exports = {
  
  create: function(userID, postText, callBack) {
    Post.forge({user_id: userID, post_text: postText}).save().then(function() {
        callBack();
    });
  },

  getAllPosts: function(callBack) {
  	Posts.forge().fetch({columns: ['post_text']}).then(function(posts) {
  		callBack(posts);
  	})

  }

};
