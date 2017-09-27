
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('resources', function(table) {
      table.increments()
      table.string('title')
      table.text('description')
      table.integer('rating')
      table.string('URL', 1000)
      table.integer('likes')
      table.integer('topic_id').unsigned()
    })
  ])

};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('resources')
  ])
};
