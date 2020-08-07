import Knex from "knex";

export async function up(knex:Knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('nome').notNullable();
    table.string('avatar').notNullable();
    table.string('whatsapp').notNullable();
    table.string('bio').notNullable();

  });
}

export async function down(knex:Knex) {
  return knex.schema.dropTable('users');
}


// Metodo up: Quais alterações queremos colocar...
// Metodo down: volto alterações no campo, podemos volta atrás.