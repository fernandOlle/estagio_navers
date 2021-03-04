exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('navers')
  .del()
  .then(function () {
    // Inserts seed entries 
    return knex('navers').insert([
        {
          name: 'Fernando Olle',
          birthdate: '1996-07-22',
          admission_date: '2021-03-05',
          job_role: 'Desenvolvedor',
        },
      ]);
    });
};
 