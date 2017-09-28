var knex = require('knex')({
    client: 'postgresql',
    connection: {
      host     : 'localhost',
      user     : 'labber',
      password : 'labber',
      database : 'midterm',
      port     : 5432,
      ssl      : true
    }
})

const faker = require('faker')


//############### EXPORT FUNCTIONS

//############### USER FUNCTIONS

var userPostResource = function(title, description, url, user_id, topic_id ) {
  knex('resources').insert({
    title: title,
    description: description,
    url: url,
    user_id: user_id,
    topic_id: topic_id
  })
  .then(result => {
    console.log('Resource posted!')
  })
  .catch(err => {
    throw (err)
  })

  knex.destroy()
}

// userPostResource('lorem', 'i might be losing my MIND', 'www.nonono.com', 2, 2)
// userPostResource('lorem', 'what do u mean', 'www.jbieber.com', 3, 4)

var createNewUser = function(first_name, last_name, email, username, password, avatar) {
  return knex('users').insert({
    first_name: first_name,
    last_name: last_name,
    email: email,
    username: username,
    password: password,
    avatar: avatar
  })
}

// createNewUser('John', 'Smith', 'johnnyappleseed', 'y28736jhdfshgfo87dfi', faker.image.avatar())

var userLogin = function(username, encryptedPassword) {
  let promise = new Promise(function(resolve, reject) {
    knex('users').where({
      username: username,
      password: encryptedPassword
    })
    .then (result => {
      if (result.length === 0) {
        resolve(false);
      }
      else {
        resolve(true);
      }
    })
    .catch(err => {
      reject(err);
    });
  });
  return promise;
}

// userLogin('Tyshawn_Green18', 'IYqw92tcwrKgoVS')
//   .then(function(res) {
//     console.log(res);
//     knex.destroy()
//   }).catch(function(err) {
//     console.error(err);
//     knex.destroy()
//   });

var userCreatedResources = function(user_id) {
  return knex('resources')
      .join('users', 'resources.user_id', '=', `users.id`)
      .where('users.id', '=', `${user_id}`)
      .select('resources.id', 'title', 'description', 'url')
    .then (result => {
      if (result.length === 0) {
        console.log('No resources for this user!')
      }
      else {
        return result
      }
    })
    .catch(err => {
      console.error(err);
    })
}

// userCreatedResources(4)
//   .then(function(res) {
//     console.log(res)
//     knex.destroy()
//   })
//   .catch(function(err) {
//     console.error(err);
//     knex.destroy()
//   });

var getResourcesByTopic = function(topic_id) {
  return knex('resources')
      .join('topics', 'resources.topic_id', '=', `topics.id`)
      .where('topics.id', '=', `${topic_id}`)
      .select('resources.id', 'title', 'description', 'url')
    .then (result => {
      if (result.length === 0) {
        console.log('No resources for this topic!')
      }
      else {
        return result
      }
    })
    .catch(err => {
      console.error(err);
    })
}

// getResourcesByTopic(4)
//   .then(function(res) {
//     console.log(res)
//     knex.destroy()
//   })
//   .catch(function(err) {
//     console.error(err);
//     knex.destroy()
//   });

