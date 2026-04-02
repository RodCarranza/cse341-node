const routes = require('express').Router();
const contactsRouter = require('./contacts'); // import the contacts routes

// Mount the contacts routes under the /contacts path
routes.use('/contacts', contactsRouter);

module.exports = routes;
