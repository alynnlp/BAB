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

var userPostResource = function(title, description, URL, user_id, topic_id ) {
  knex('resources').insert({
    title: title,
    description: description,
    URL: URL,
    user_id: user_id,
    topic_id: topic_id
  })
  .then(result => {
    console.log('success')
  })
  .catch(err => {
    throw (err)
  })

  knex.destroy()
}

userPostResource('lorem', 'i might be losing my MIND', 'www.nonono.com', 1, 2)

var createNewUser = function(first_name, last_name, username, password, avatar) {

}








