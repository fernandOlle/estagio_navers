#!/bin/bash

npx knex migrate:rollback --all
npx knex migrate:latest

npx knex seed:run --specific=001_navers.js
npx knex seed:run --specific=002_projects.js
npx knex seed:run --specific=003_projects_navers.js
 