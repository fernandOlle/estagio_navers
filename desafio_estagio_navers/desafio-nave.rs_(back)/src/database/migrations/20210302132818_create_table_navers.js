exports.up = (knex) =>
  knex.schema.dropTableIfExists('navers').createTable('navers', (table) => {
    table.increments('id').unique();
    table.string('name').notNullable();
    table.string('job_role').notNullable();
    table.date('birthdate').notNullable();
    table.date('admission_date').notNullable();
  });

exports.down = (knex) => knex.schema.dropTable('navers');
 