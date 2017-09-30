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
  //############### EXPORT FUNCTIONS

  //############### USER FUNCTIONS

    userPostResource(title, description, url, user_id, topic_id ) {
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
        throw (err);
      })

      knex.destroy()
    },

    // userPostResource('lorem', 'i might be losing my MIND', 'www.nonono.com', 2, 2)
    // userPostResource('lorem', 'what do u mean', 'www.jbieber.com', 3, 4)

    createNewUser(first_name, last_name, email, username, password, avatar) {
      return knex('users').insert({
        first_name: first_name,
        last_name: last_name,
        email: email,
        username: username,
        password: password,
        avatar: avatar
      })
    },

    // createNewUser('John', 'Smith', 'johnnyappleseed', 'y28736jhdfshgfo87dfi', faker.image.avatar())

    userLogin(username, encryptedPassword) {
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
    },

    // userLogin('Tyshawn_Green18', 'IYqw92tcwrKgoVS')
    //   .then(function(res) {
    //     console.log(res);
    //     knex.destroy()
    //   }).catch(function(err) {
    //     console.error(err);
    //     knex.destroy()
    //   });

    userCreatedResources(user_id) {
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
    },

    // userCreatedResources(4)
    //   .then(function(res) {
    //     console.log(res)
    //     knex.destroy()
    //   })
    //   .catch(function(err) {
    //     console.error(err);
    //     knex.destroy()
    //   });

    getResourcesByTopic(topic_id) {
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
    },

    // getResourcesByTopic(4)
    //   .then(function(res) {
    //     console.log(res)
    //     knex.destroy()
    //   })
    //   .catch(function(err) {
    //     console.error(err);
    //     knex.destroy()
    //   });

    getUserLikedResources(user_id) {
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
    },

    // getUserLikedResources(3)
    //   .then(function(res) {
    //     console.log(res)
    //     knex.destroy()
    //   })
    //   .catch(function(err) {
    //     console.error(err);
    //     knex.destroy()
    //   });

    updateUser(user_id, field, input) {
      return knex('users')
        .where({
          id: user_id,
        })
        .update(`${field}`, `${input}`)
    },

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
    updateResource(resource_id, field, input) {
      return knex('resources')
        .where('resources.id', '=', `${resource_id}`)
        .update(`${field}`, `${input}`)
    },

    // updateResource(3, 'url', 'www.nowhereman.com')
    //   .then(function(res) {
    //     console.log(res)
    //     knex.destroy()
    //   })
    //   .catch(function(err) {
    //     console.error(err);
    //     knex.destroy()
    //   });

    deleteResource(resource_id) {
      return knex('resources')
        .where('resources.id', '=', `${resource_id}`)
        .del()
    },

    // deleteResource(4)
    //   .then(function(res) {
    //     console.log(res)
    //     knex.destroy()
    //   })
    //   .catch(function(err) {
    //     console.error(err);
    //     knex.destroy()
    //   });

    postLike(resource_id, user_id) {
      return knex.insert([
        {resource_id: `${resource_id}`},
        {user_id: `${user_id}`}], 'id').into('books')
    },

    postComment(resource_id, user_id) {
      return knex.insert([
        {resource_id: `${resource_id}`},
        {user_id: `${user_id}`}], 'id').into('books')
    },




  //########## NO PERMISSIONS
    getAllResources() {
      return knex
        .select('*')
        .from('resources')
    },

    // getAllResources()
    // .then(res => {
    //   console.log(res)
    //   knex.destroy()
    // })
    // .catch(err => {
    //   console.error(err)
    //   knex.destroy()
    // })

    getResource(resource_id) {
      return knex('resources')
        .where('resources.id', '=', `${resource_id}`)
        .select('resources.id', 'title', 'description', 'url')
    },

    getResourceLikes(resource_id) {
      return knex('liked_resources')
        .count('id as likes')
        .where('liked_resources.resource_id', '=', `${resource_id}`)
    },

    getResourceRating(resource_id) {
      return knex('ratings')
        .avg('rating')
        .where('ratings.resource_id', '=', `${resource_id}`)
    },

    getResourceComments(resource_id) {
      return knex('comments')
        .where('ratings.resource_id', '=', `${resource_id}`)
        .select('comment')
    }
}
