
exports.up = function(knex) {
  return knex.schema.createTable('users', (tbl) => {
    tbl.increments('id').unique().notNullable()
    tbl.string('email').notNullable()
    tbl.string('first_name').notNullable()
    tbl.string('last_name').notNullable()
    tbl.text('password')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('users')
}
