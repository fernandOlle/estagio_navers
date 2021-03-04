exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('projects_navers')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('projects_navers').insert([{ naver_id: 1, project_id: 1 }]);
    });
};

 