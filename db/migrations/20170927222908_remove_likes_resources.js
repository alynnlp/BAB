
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('resources', function(table){
      table.dropColumn('likes')
    })
  ])
};

exports.down = function(knex, Promise) {

};
