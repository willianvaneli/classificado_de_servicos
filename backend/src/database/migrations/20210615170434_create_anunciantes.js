
exports.up = function(knex) {
    return knex.schema
    .createTable('anunciantes', function (table) {
        table.increments('id').primary();
        table.string('nome', 255).notNullable();
        table.string('razao_social', 255);
        table.string('senha', 255).notNullable();
        table.unique('email', 255).notNullable();
        table.string('telefone', 255).notNullable();
        table.string('cidade', 255).notNullable();
        table.string('estado', 2).notNullable();
     });
};

exports.down = function(knex) {
    return knex.schema
    .dropTable("anunciantes");
};
