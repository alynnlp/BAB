
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('liked_resources', function(table){
      table.integer('resource_id')
      table.foreign('resource_id').references('resources.id')
      table.integer('user_id')
      table.foreign('user_id').references('users.id')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('liked_resources')
  ])
};
