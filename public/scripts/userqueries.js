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

module.exports = {
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

    var getUserLikedResources = function(user_id) {
      return knex('resources')
        .join('liked_resources', 'resources.id', '=', 'liked_resources.resource_id')
        .join('users', 'liked_resources.user_id', '=', 'users.id')
        .where('users.id', '=', `${user_id}`)
        .select('resources.id', 'title', 'description', 'url')
        .then (result => {
          if (result.length === 0) {
            console.log('No liked resources!')
          }
          else {
            return result
          }
        })
        .catch(err => {
          console.error(err);
        })
    }

    // getUserLikedResources(3)
    //   .then(function(res) {
    //     console.log(res)
    //     knex.destroy()
    //   })
    //   .catch(function(err) {
    //     console.error(err);
    //     knex.destroy()
    //   });

    var updateUser = function(user_id, field, input) {
      return knex('users')
        .where({
          id: user_id,
        })
        .update(`${field}`, `${input}`)
    }

    // updateUser(2, 'first_name', 'Mr. poopybutthole')
      // .then(function(res) {
      //   console.log(res)
      //   knex.destroy()
      // })
      // .catch(function(err) {
      //   console.error(err);
      //   knex.destroy()
      // });

  //################### RESOURCE FUNCTIONS
  //########## PERMISSIONS REQUIRED
    var updateResource = function(resource_id, field, input) {
      return knex('resources')
        .where('resources.id', '=', `${resource_id}`)
        .update(`${field}`, `${input}`)
    }

    // updateResource(3, 'url', 'www.nowhereman.com')
    //   .then(function(res) {
    //     console.log(res)
    //     knex.destroy()
    //   })
    //   .catch(function(err) {
    //     console.error(err);
    //     knex.destroy()
    //   });

    var deleteResource = function(resource_id) {
      return knex('resources')
        .where('resources.id', '=', `${resource_id}`)
        .del()
    }

    // deleteResource(4)
    //   .then(function(res) {
    //     console.log(res)
    //     knex.destroy()
    //   })
    //   .catch(function(err) {
    //     console.error(err);
    //     knex.destroy()
    //   });

    var postLike = function(resource_id, user_id) {
      return knex.insert([
        {resource_id: `${resource_id}`},
        {user_id: `${user_id}`}], 'id').into('books')
    }

    var postComment = function(resource_id, user_id) {
      return knex.insert([
        {resource_id: `${resource_id}`},
        {user_id: `${user_id}`}], 'id').into('books')
    }




  //########## NO PERMISSIONS
    var getAllResources = function() {
      return knex
        .select('*')
        .from('resources')
    }

    // getAllResources()
    // .then(res => {
    //   console.log(res)
    //   knex.destroy()
    // })
    // .catch(err => {
    //   console.error(err)
    //   knex.destroy()
    // })

    var getResource = function(resource_id) {
      return knex('resources')
        .where('resources.id', '=', `${resource_id}`)
        .select('resources.id', 'title', 'description', 'url')
    }

    var getResourceLikes = function(resource_id) {
      return knex('liked_resources')
        .count('id as likes')
        .where('liked_resources.resource_id', '=', `${resource_id}`)
    }

    var getResourceRating = function(resource_id) {
      return knex('ratings')
        .avg('rating')
        .where('ratings.resource_id', '=', `${resource_id}`)
    }

    var getResourceComments = function(resource_id) {
      return knex('comments')
        .where('ratings.resource_id', '=', `${resource_id}`)
        .select('comment')
    }

}
