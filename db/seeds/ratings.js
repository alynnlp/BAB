const faker = require('faker')

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('ratings').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('ratings').insert({id: 1, rating: faker.random.number(10)}),
        knex('ratings').insert({id: 2, rating: faker.random.number(10)}),
        knex('ratings').insert({id: 3, rating: faker.random.number(10)})
      ]);
    });
};
