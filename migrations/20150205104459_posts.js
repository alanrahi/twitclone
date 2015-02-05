'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', function(table) {
    table.increments('id');
    table.integer('user_id').references('id').inTable('users').notNullable();
    table.string('post_text', 140).notNullable();
    table.timestamp('post_time').defaultTo(knex.raw('now()'));
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('posts');
};
