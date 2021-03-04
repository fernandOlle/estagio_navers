const knex = require('../database');

module.exports = {
  // [ OK ]
  async index(req, res) {
    const results = await knex('projects');

    return res.json(results);
  },
  // []
  async show(req, res, next) {
    try {
      const { id } = req.params;

      const [{ name }] = await knex('projects').where({ id });
      const relations = await knex('projects_navers').where({ project_id: id });

      let navers = [];

      for (let i = 0; i < relations.length; i++) {
        let [{ id, name, birthdate, admission_date, job_role }] = await knex(
          'navers'
        ).where({
          id: relations[i].naver_id,
        });
        navers.push({
          id,
          name,
          birthdate,
          admission_date,
          job_role,
        });
      }

      let results = {
        id,
        name,
        navers,
      };

      return res.json(results);
    } catch (error) {
      next(error);
    }
  },

  async store(req, res, next) {
    try {
      const { name, navers } = req.body;

      await knex('projects')
        .insert({ name }, 'id')
        .then(async (currentId) => {
          for (let i = 0; i < navers.length; i++)
            if ((await knex('navers').where({ id: navers[i] })).length === 1) {
              await knex('projects_navers').insert({
                naver_id: navers[i],
                project_id: Number(currentId),
              });
            }
        });

      return res.status(201).send();
    } catch (error) {
      next(error);
    }
  },

  async eb4(req, res, next) {
    try {
      const projects = await knex('projects');

      let allProjects = [];

      for (let i = 0; i < projects.length; i++) {
        const [{ name }] = await knex('projects').where({ id: projects[i].id });

        const relations = await knex('projects_navers').where({
          project_id: projects[i].id,
        });

        let navers = [];

        for (let j = 0; j < relations.length; j++) {
          let [{ id, name, birthdate, admission_date, job_role }] = await knex(
            'navers'
          ).where({
            id: relations[j].naver_id,
          });
          navers.push({
            id,
            name,
            birthdate,
            admission_date,
            job_role,
          });
        }
        allProjects[i] = {
          id: projects[i].id,
          name: projects[i].name,
          navers,
        };
      }
      return res.json(allProjects);
    } catch (error) {
      next(error);
    }
  },

  async eb5(req, res, next) {
    try {
      const projects = await knex('projects');

      let allProjects = [];

      for (let i = 0; i < projects.length; i++) {
        const [{ name }] = await knex('projects').where({ id: projects[i].id });

        const relations = await knex('projects_navers').where({
          project_id: projects[i].id,
        });

        allProjects[i] = {
          id: projects[i].id,
          name: projects[i].name,
          navers: relations.length,
        };
      }
      return res.json(allProjects);
    } catch (error) {
      next(error);
    }
  },
};
 