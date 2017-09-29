const faker = require('faker')

exports.seed = function(knex, Promise) {
  return knex('topics').del()
    .then(function () {
      return Promise.all([
        knex('topics').insert({topic_name: 'art'}),
        knex('topics').insert({topic_name: 'geography'}),
        knex('topics').insert({topic_name: 'health'}),
        knex('topics').insert({topic_name: 'literature'}),
        knex('topics').insert({topic_name: 'politics'}),
        knex('topics').insert({topic_name: 'music'}),
        knex('topics').insert({topic_name: 'history'}),
        knex('topics').insert({topic_name: 'math'}),
        knex('topics').insert({topic_name: 'science'})
      ]);
    });
};
