
exports.up = function(knex) {
  return knex.schema.createTable('saved_recipes', (tbl) => {
    tbl.increments('id').unique().notNullable()
    tbl.integer('uid').notNullable()
    tbl.integer('sid')
    tbl.integer('rid')
    tbl.boolean('is_creator').notNullable()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('saved_recipes')
}
