const routes = require('express').Router();
const contactsRouter = require('./contacts'); // import the contacts routes
const router = require('./swagger');

router.use('/', require('./swagger'));
// Mount the contacts routes under the /contacts path
routes.use('/contacts', contactsRouter);

module.exports = routes;
