// this is the post model

var env = process.env.NODE_ENV || 'development';
var knexConfig = require('../knexfile.js')[env];
var knex = require('knex')(knexConfig);
var bookshelf = require('bookshelf')(knex);

var Post = bookshelf.Model.extend({ 
  tableName: 'posts'
});


module.exports = {
  
  create: function(userID, postText) {
    Post
  }

};
