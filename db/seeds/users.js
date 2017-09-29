const faker = require('faker')

exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({first_name: faker.name.firstName(), last_name: faker.name.lastName(), email: faker.internet.email(), username: faker.internet.userName(), password: faker.internet.password(), avatar: faker.image.avatar()}),
        knex('users').insert({first_name: faker.name.firstName(), last_name: faker.name.lastName(), email: faker.internet.email(), username: faker.internet.userName(), password: faker.internet.password(), avatar: faker.image.avatar()}),
        knex('users').insert({first_name: faker.name.firstName(), last_name: faker.name.lastName(), email: faker.internet.email(), username: faker.internet.userName(), password: faker.internet.password(), avatar: faker.image.avatar()})
      ]);
    });
};
