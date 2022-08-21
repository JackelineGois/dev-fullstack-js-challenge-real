/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("students", (table) => {
    table.biginteger("ra").primary();
    table.string("nome").notNullable();
    table.string("email").notNullable();
    table.integer("cpf").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("students");
};
