const faker = require('faker')

exports.seed = function(knex, Promise) {
  return knex('resources').del()
    .then(function () {
      return Promise.all([
        knex('resources').insert({title: faker.lorem.words(), description: faker.lorem.sentences(), url: faker.internet.domainName(), img_url: 'http://www.gettyimages.ca/gi-resources/images/Homepage/Hero/UK/CMS_Creative_164657191_Kingfisher.jpg'}),
        knex('resources').insert({title: faker.lorem.words(), description: faker.lorem.sentences(), url: faker.internet.domainName(), img_url: 'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/flip.jpg'}),
        knex('resources').insert({title: faker.lorem.words(), description: faker.lorem.sentences(), url: faker.internet.domainName(), img_url: 'https://tinypng.com/images/social/website.jpg'})
      ]);
    });
};
