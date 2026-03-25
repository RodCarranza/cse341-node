
const routes = require('express').Router();
const baseController = require('../controllers');
const contactsRouter = require('./contacts'); // import the contacts routes

routes.get('/', baseController.getName);
routes.get('/pamela', baseController.getSecondName);
routes.get('/layla', baseController.getThirdName);

// new contacts routes
routes.use('/contacts', contactsRouter); // mount under /contacts

module.exports = routes;

//


