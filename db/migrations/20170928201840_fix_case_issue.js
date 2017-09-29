
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('resources', function(table){
      table.dropColumn('URL')
      table.string('url', 500)
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('resources', function(table){
      table.dropColumn('URL')
    })
  ])
};
