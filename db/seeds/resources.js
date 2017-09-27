const faker = require('faker')

exports.seed = function(knex, Promise) {
  return knex('resources').del()
    .then(function () {
      return Promise.all([
        knex('resources').insert({title: faker.lorem.words(), description: faker.lorem.sentences(), URL: faker.internet.domainName()}),
        knex('resources').insert({title: faker.lorem.words(), description: faker.lorem.sentences(), URL: faker.internet.domainName()}),
        knex('resources').insert({title: faker.lorem.words(), description: faker.lorem.sentences(), URL: faker.internet.domainName()})
      ]);
    });
};
