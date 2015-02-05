'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.table('users', function(table){
    table.text('password').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(table){
    table.dropColumn('password');
  });
};
