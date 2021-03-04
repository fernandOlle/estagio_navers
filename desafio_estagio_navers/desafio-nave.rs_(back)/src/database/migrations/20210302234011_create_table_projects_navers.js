exports.up = async (knex) =>
  knex.schema
    .dropTableIfExists('projects_navers')
    .createTable('projects_navers', (table) => {
      table.increments('id').unique();

      table
        .integer('naver_id')
        .references('navers.id')
        .notNullable()
    
      table
        .integer('project_id')
        .references('projects.id')
        .notNullable()      
    });

exports.down = async (knex) => knex.schema.dropTable('projects_navers');
 