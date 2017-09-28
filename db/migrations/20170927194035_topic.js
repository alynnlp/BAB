
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('topics', function(table){
      table.increments()
      table.string('topic_name')
    })
  ])

};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('topics')
  ])
};
