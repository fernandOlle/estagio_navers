#!/bin/bash

npx knex migrate:rollback --all
npx knex migrate:latest
 