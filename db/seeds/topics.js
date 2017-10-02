const faker = require('faker')

exports.seed = function(knex, Promise) {
  return knex('topics').del()
    .then(function () {
      return Promise.all([
        knex('topics').insert({id: 1, topic_name: 'art'}),
        knex('topics').insert({id: 2, topic_name: 'geography'}),
        knex('topics').insert({id: 3, topic_name: 'health'}),
        knex('topics').insert({id: 4, topic_name: 'literature'}),
        knex('topics').insert({id: 5, topic_name: 'politics'}),
        knex('topics').insert({id: 6, topic_name: 'music'}),
        knex('topics').insert({id: 7, topic_name: 'history'}),
        knex('topics').insert({id: 8, topic_name: 'math'}),
        knex('topics').insert({id: 9, topic_name: 'science'})
      ]);
    });
};
