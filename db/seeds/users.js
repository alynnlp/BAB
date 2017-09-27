const faker = require('faker')

exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({id: 1, first_name: faker.name.firstName(), last_name: faker.name.lastName(), username: faker.internet.userName(), password: faker.internet.password()}),
        knex('users').insert({id: 2, first_name: faker.name.firstName(), last_name: faker.name.lastName(), username: faker.internet.userName(), password: faker.internet.password()}),
        knex('users').insert({id: 3, first_name: faker.name.firstName(), last_name: faker.name.lastName(), username: faker.internet.userName(), password: faker.internet.password()})
      ]);
    });
};
