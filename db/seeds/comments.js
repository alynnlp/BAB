const faker = require('faker')

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('comments').insert({comment: faker.lorem.sentences()}),
        knex('comments').insert({comment: faker.lorem.sentences()}),
        knex('comments').insert({comment: faker.lorem.sentences()})
      ]);
    });
};
