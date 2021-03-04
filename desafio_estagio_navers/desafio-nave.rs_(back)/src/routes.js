const express = require('express');
const routes = express.Router();
const NaverController = require('./controllers/NaverController');
const ProjectController = require('./controllers/ProjectController');

routes
  // Navers
  .get('/navers', NaverController.index)
  .get('/navers/eb3', NaverController.eb3)
  .get('/navers/show/:id', NaverController.show)
  .post('/navers/store', NaverController.store)
  // Projects
  .get('/projects', ProjectController.index)
  .get('/projects/show/:id', ProjectController.show)
  .post('/projects/store', ProjectController.store)
  .get('/projects/eb4', ProjectController.eb4)
  .get('/projects/eb5', ProjectController.eb5);


module.exports = routes;
 