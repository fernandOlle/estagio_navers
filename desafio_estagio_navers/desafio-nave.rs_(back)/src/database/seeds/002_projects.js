exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('projects')
  .del()
  .then(function () {
    // Inserts seed entries
    knex.raw(`
      TRUNCATE TABLE projects
      RESTART IDENTITY;
    `);
      return knex('projects').insert([{ name: 'projeto-back-end' }]);
    });
};
 