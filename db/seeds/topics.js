const faker = require('faker')

exports.seed = function(knex, Promise) {
  return knex('topics').del()
    .then(function () {
      return Promise.all([
        knex('topics').insert({id: 1, topic_name: faker.random.word()}),
        knex('topics').insert({id: 2, topic_name: faker.random.word()}),
        knex('topics').insert({id: 3, topic_name: faker.random.word()})
      ]);
    });
};
