const knex = require('../database');

module.exports = {
  async index(req, res) {
    const results = await knex('navers');
    return res.json(results);
  },
  async show(req, res, next) {
    try {
      const { id } = req.params;

      const [{ name, birthdate, admission_date, job_role }] = await knex(
        'navers'
      ).where({ id });

      const relations = await knex('projects_navers').where({ naver_id: id });

      let projects = [];

      for (let i = 0; i < relations.length; i++) {
        let [{ id, name }] = await knex('projects').where({
          id: relations[i].project_id,
        });

        projects.push({
          id,
          name,
        });
      }

      // let j = await knex
      //   .select('projects.id as id', 'projects.name as name')
      //   .from(
      //     knex
      //       .select('*')
      //       .from('projects_navers')
      //       .where('naver_id', '=', id)
      //       .innerJoin('projects', function () {
      //         this.on('projects.id', '=', 'projects_navers.project_id');
      //       })
      //       .as('X')
      //   );

      // return res.json(j);

      const results = {
        id,
        name,
        birthdate,
        admission_date,
        job_role,
        projects,
      };

      return res.json(results);
    } catch (error) {
      next(error);
    }
  },

  async store(req, res, next) {
    try {
      const { name, birthdate, admission_date, job_role, projects } = req.body;

      await knex('navers')
        .insert(
          {
            name,
            birthdate,
            admission_date,
            job_role,
          },
          'id'
        )
        .then(async (currentId) => {
          for (let i = 0; i < projects.length; i++)
            if (
              (await knex('projects').where({ id: projects[i] })).length === 1
            ) {
              await knex('projects_navers').insert({
                naver_id: Number(currentId),
                project_id: projects[i],
              });
            }
        });

      return res.status(201).send();
    } catch (error) {
      next(error);
    }
  },
  async eb3(req, res) {
    const results = await knex('navers').orderBy('admission_date');

    return res.json(results);
  },
};
 