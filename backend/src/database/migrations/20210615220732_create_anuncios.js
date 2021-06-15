
exports.up = function(knex) {
    return knex.schema
    .createTable('anuncios', function (table) {
        table.increments('id').primary();
        table.string('categoria', 255).notNullable();
        table.decimal('valor');
        table.string('descricao').notNullable();

        table.integer('anunciante_id').notNullable();

        table.foreign('anunciante_id').references('id').inTable('anunciantes');
     });
};

exports.down = function(knex) {
    return knex.schema
    .dropTable("anuncios");
};
