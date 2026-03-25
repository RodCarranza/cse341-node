const routes = require('express').Router();

const baseController = require('../controllers');

routes.get('/', baseController.getName);
routes.get('/pamela', baseController.getSecondName);
routes.get('/layla', baseController.getThirdName);

module.exports = routes;

//


