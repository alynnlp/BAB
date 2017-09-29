
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('resources', function(table){
      table.dropColumn('rating')
    })
  ])

};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('resources', function(){
      table.text('rating')
    })
  ])
};
