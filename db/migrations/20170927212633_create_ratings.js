
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('ratings', function(table){
      table.increments()
      table.integer('resource_id')
      table.foreign('resource_id').references('resources.id')
      table.integer('user_id')
      table.foreign('user_id').references('users.id')
      table.integer('rating')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('ratings')
  ])
};
