const faker = require('faker')

exports.seed = function(knex, Promise) {
  return knex('resources').del()
    .then(function () {
      return Promise.all([
        knex('resources').insert({id: 1, title: faker.lorem.words(), description: faker.lorem.sentences(), URL: faker.internet.domainName()}),
        knex('resources').insert({id: 2, title: faker.lorem.words(), description: faker.lorem.sentences(), URL: faker.internet.domainName()}),
        knex('resources').insert({id: 3, title: faker.lorem.words(), description: faker.lorem.sentences(), URL: faker.internet.domainName()})
      ]);
    });
};
