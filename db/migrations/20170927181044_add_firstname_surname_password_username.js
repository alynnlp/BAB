
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', function (table) {
      table.dropColumn('name')
      table.string('first_name')
      table.string('last_name')
      table.string('username')
      table.string('password')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', function (table) {
      table.dropColumn('first_name')
      table.dropColumn('last_name')
      table.dropColumn('username')
      table.dropColumn('password')
    })
  ])
};
