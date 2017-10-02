const faker = require('faker')

exports.seed = function(knex, Promise) {
  return knex('resources').del()
    .then(function () {
      return Promise.all([
        knex('resources').insert({title: faker.lorem.words(), description: faker.lorem.sentences(), url: faker.internet.domainName(), img_url: faker.image.image()}),
        knex('resources').insert({title: faker.lorem.words(), description: faker.lorem.sentences(), url: faker.internet.domainName(), img_url: faker.image.image()}),
        knex('resources').insert({title: faker.lorem.words(), description: faker.lorem.sentences(), url: faker.internet.domainName(), img_url: faker.image.image()})
      ]);
    });
};
