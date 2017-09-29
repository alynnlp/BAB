const faker = require('faker')

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('ratings').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('ratings').insert({rating: faker.random.number(10)}),
        knex('ratings').insert({rating: faker.random.number(10)}),
        knex('ratings').insert({rating: faker.random.number(10)})
      ]);
    });
};
