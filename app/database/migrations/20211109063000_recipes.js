
exports.up = function(knex) {
    return knex.schema.createTable('recipes', (tbl) => {
        tbl.increments('id').unique().notNullable();
        tbl.text('title').notNullable();
        tbl.text('ingredients').notNullable();
        tbl.text('instruction').notNullable();
        tbl.integer('ready_in_minutes').notNullable();
        tbl.integer('image').notNullable();
        tbl.integer('fat').notNullable();
        tbl.integer('carbs').notNullable();
        tbl.integer('protein').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('recipes');
};
