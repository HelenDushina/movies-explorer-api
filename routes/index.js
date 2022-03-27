const express = require('express');
const routes = express.Router();

const auth = require('../middlewares/auth');
const userRoutes = require('./users');
const moviesRoutes = require('./movies');

routes.use('/', auth, userRoutes);
routes.use('/', auth, moviesRoutes);

module.exports = routes;
