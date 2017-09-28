
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('resources', function(table){
      table.integer('user_id')
      table.foreign('user_id').references('users.id')
      table.foreign('topic_id').references('topics.id')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('resources', function(table){
      table.dropColumn('user_id')
      table.dropColumn('topic_id')
    })
  ])
};
