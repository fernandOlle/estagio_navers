exports.up = async (knex) =>
  knex.schema.dropTableIfExists('projects').createTable('projects', (table) => {
    table.increments('id').unique();
    table.text('name').notNullable();
  });

exports.down = async (knex) => knex.schema.dropTable('projects');
 