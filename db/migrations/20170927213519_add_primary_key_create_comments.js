
exports.up = function(knex, Promise) {
  return Promise.all([

    knex.schema.table('liked_resources', function(table){
      table.increments()
    }),

    knex.schema.createTable('comments', function(table){
      table.increments()
      table.integer('resource_id')
      table.foreign('resource_id').references('resources.id')
      table.integer('user_id')
      table.foreign('user_id').references('users.id')
      table.text('comment')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('liked_resources'),
    knex.schema.dropTable('comments')
  ])
};
